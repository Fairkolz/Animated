'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Frame sequence source. The 0831_frames set is a 1920x1080 (16:9) 217-frame
// sequence extracted from one continuous video; the exact count is resolved at
// runtime via /api/hero-frames so it is never hardcoded. Frames are named
// frame_0001.jpg .. frame_XXXX.jpg and must stay in exact numerical order.
const FRAME_BASE = '/0831_frames/frame_'
// Total pinned scroll = SCROLL_MULTIPLIER viewport heights. Kept at 2.5 so the
// user travels far enough to scrub the full sequence smoothly.
const SCROLL_MULTIPLIER = 2.5
// On touch phones the hero still felt like it needed "twice the scroll"; shrink the
// pinned distance and scrub latency there so one flick advances roughly a chapter.
const MOBILE_SCROLL_MULTIPLIER = 1.8
const MOBILE_SCRUB = 0.1
// The canvas buffer is sized at RENDER_SCALE * CSS size * devicePixelRatio so the
// Ken Burns CSS transform (scale 1.15 -> 1.0) never upscales a smaller buffer.
// Without this, the canvas was re-rasterized ~1.15x larger than its pixels on
// every high-DPI display, adding avoidable softness on top of source limits.
const RENDER_SCALE = 1.15
// Preload window. Only frames near the scrub position are fetched and kept; the
// working set is bounded so we never hold the whole sequence's decodes in memory.
// BEHIND is kept larger (with a wider evict cushion) so reverse scrubbing can
// fall back onto recently-viewed frames instead of jumping to far-ahead ones.
const PRELOAD_AHEAD = 24
const PRELOAD_BEHIND = 16
const EVICT_AHEAD_MARGIN = 20
const EVICT_BEHIND_MARGIN = 28
// Progress at which a reduced-motion user gets a static frame.
const REDUCED_MOTION_PROGRESS = 0.85

type FrameSource = HTMLImageElement

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function resolveChapter(
  p: number,
  enterStart: number,
  enterEnd: number,
  holdEnd: number,
  exitEnd: number,
): { opacity: number; y: number } {
  if (p < enterStart) return { opacity: 0, y: 40 }
  if (p <= enterEnd) {
    const t = clamp((p - enterStart) / (enterEnd - enterStart), 0, 1)
    return { opacity: ease(t), y: 40 * (1 - ease(t)) }
  }
  if (p <= holdEnd) return { opacity: 1, y: 0 }
  if (p <= exitEnd) {
    const t = clamp((p - holdEnd) / (exitEnd - holdEnd), 0, 1)
    return { opacity: 1 - ease(t), y: -30 * ease(t) }
  }
  return { opacity: 0, y: -30 }
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<Map<number, FrameSource>>(new Map())
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef(0)
  const progressRef = useRef(0)
  const countRef = useRef(0)
  const loadingRef = useRef(true)
  const initialFailuresRef = useRef(0)

  const ch1ContainerRef = useRef<HTMLDivElement>(null)
  const ch1EyebrowRef = useRef<HTMLParagraphElement>(null)
  const ch1HeadlineRef = useRef<HTMLHeadingElement>(null)
  const ch1SubtextRef = useRef<HTMLParagraphElement>(null)
  const ch1CtaRef = useRef<HTMLButtonElement>(null)

  const ch2ContainerRef = useRef<HTMLDivElement>(null)
  const ch2LabelRef = useRef<HTMLParagraphElement>(null)
  const ch2HeadlineRef = useRef<HTMLHeadingElement>(null)
  const ch2BodyRef = useRef<HTMLParagraphElement>(null)
  const ch2CtaRef = useRef<HTMLButtonElement>(null)

  const ch3ContainerRef = useRef<HTMLDivElement>(null)
  const ch3HeadlineRef = useRef<HTMLHeadingElement>(null)
  const ch3BodyRef = useRef<HTMLParagraphElement>(null)
  const ch3CtaRef = useRef<HTMLButtonElement>(null)

  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(true)

  const motionProgress = useMotionValue(0)
  const springProgress = useSpring(motionProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  const imageScale = useTransform(springProgress, [0, 0.5, 0.85, 1], [1.15, 1.0, 1.0, 1.0])
  const imageY = useTransform(springProgress, [0, 0.85, 1], ['0%', '-8%', '-8%'])

  const applyChapter = useCallback((el: HTMLElement | null, v: { opacity: number; y: number }) => {
    if (!el) return
    el.style.opacity = String(v.opacity)
    el.style.transform = `translateY(${v.y}px)`
  }, [])

  // Each chapter is also a full-height absolute overlay stacked at the same
  // z-index. Even when a chapter's content is invisible (opacity 0), its wide
  // `pointer-events-auto` wrapper would sit on top of the chapters below it and
  // swallow their hover/click events. Toggling `pointer-events` on each
  // chapter container by scroll progress ensures only the visible chapter is
  // interactive — this is what makes the chapter CTA hover and click work.
  const setChapterInteractive = useCallback((
    ref: { current: HTMLDivElement | null },
    active: boolean,
  ) => {
    if (ref.current) ref.current.style.pointerEvents = active ? 'auto' : 'none'
  }, [])

  const updateOverlays = useCallback((p: number) => {
    // Toggle interactivity per chapter based on its scroll window:
    // Ch1 visible from load (p=0) through its exit 0.18
    // Ch2 enters 0.14, exits 0.38 → 0.50
    // Ch3 enters 0.48, holds to the end
    setChapterInteractive(ch1ContainerRef, p < 0.19)
    setChapterInteractive(ch2ContainerRef, p >= 0.12 && p <= 0.51)
    setChapterInteractive(ch3ContainerRef, p >= 0.46)

    // Ch1 — visible at start, exits 0.10 → 0.18
    applyChapter(ch1EyebrowRef.current, resolveChapter(p, -0.01, 0, 0.10, 0.18))
    applyChapter(ch1HeadlineRef.current, resolveChapter(p, -0.01, 0, 0.10, 0.18))
    applyChapter(ch1SubtextRef.current, resolveChapter(p, -0.01, 0, 0.10, 0.18))
    applyChapter(ch1CtaRef.current, resolveChapter(p, -0.01, 0, 0.10, 0.18))

    // Ch2 — enters 0.14, exits 0.38 → 0.50
    applyChapter(ch2LabelRef.current, resolveChapter(p, 0.14, 0.22, 0.38, 0.50))
    applyChapter(ch2HeadlineRef.current, resolveChapter(p, 0.16, 0.24, 0.38, 0.50))
    applyChapter(ch2BodyRef.current, resolveChapter(p, 0.18, 0.26, 0.38, 0.50))
    applyChapter(ch2CtaRef.current, resolveChapter(p, 0.20, 0.28, 0.38, 0.50))

    // Ch3 — enters 0.48, holds through end (no exit)
    applyChapter(ch3HeadlineRef.current, resolveChapter(p, 0.48, 0.56, 1.01, 1.01))
    applyChapter(ch3BodyRef.current, resolveChapter(p, 0.51, 0.59, 1.01, 1.01))
    applyChapter(ch3CtaRef.current, resolveChapter(p, 0.54, 0.62, 1.01, 1.01))

    if (scrollIndicatorRef.current) {
      const ind = clamp(1 - p * 5, 0, 1)
      scrollIndicatorRef.current.style.opacity = String(ind)
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${p})`
    }

    motionProgress.set(p)
  }, [applyChapter, motionProgress, setChapterInteractive])

  const frameSrc = useCallback((index: number) => {
    return `${FRAME_BASE}${String(index + 1).padStart(4, '0')}.jpg`
  }, [])

  // Pick the frame closest to `desired` that is actually decodable. When the
  // exact frame isn't ready yet, prefer the most recent frames BEHIND it (the
  // frames the user is coming from), so reverse scrubbing steps back through
  // just-seen frames instead of leaping to a far-ahead one. Forward scrubbing
  // can fill gaps from a short reach ahead. This keeps the canvas from ever
  // drawing a stale frame far out of sequence.
  const resolveFrame = useCallback((desired: number): { src: FrameSource; index: number } | null => {
    const map = imagesRef.current
    const inPlace = map.get(desired)
    if (inPlace && inPlace.complete && inPlace.naturalWidth > 0) {
      return { src: inPlace, index: desired }
    }
    // Backward reach is generous: reversing should land on recently-viewed frames.
    const backLimit = PRELOAD_BEHIND + EVICT_BEHIND_MARGIN + 4
    for (let r = 1; r <= backLimit; r++) {
      const back = map.get(desired - r)
      if (back && back.complete && back.naturalWidth > 0) return { src: back, index: desired - r }
    }
    // Forward reach is short, only to smooth out fast forward gaps.
    const aheadLimit = PRELOAD_AHEAD
    for (let r = 1; r <= aheadLimit; r++) {
      const ahead = map.get(desired + r)
      if (ahead && ahead.complete && ahead.naturalWidth > 0) return { src: ahead, index: desired + r }
    }
    return null
  }, [])

  // Draw ONE exact frame (no crossfade, no interpolation) — the sequence must
  // feel like a single video whose playback is driven by scroll.
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    const total = countRef.current
    if (total <= 0) return

    const desired = Math.round(progress * (total - 1))
    const resolved = resolveFrame(desired)
    if (!resolved) return

    const dpr = window.devicePixelRatio || 1
    const dw = canvas.width / (dpr * RENDER_SCALE)
    const dh = canvas.height / (dpr * RENDER_SCALE)

    // Cover-fit the 16:9 source to the canvas while preserving aspect ratio.
    const src = resolved.src
    const ia = src.width / src.height
    const ca = dw / dh
    let sx = 0
    let sy = 0
    let sw = src.width
    let sh = src.height
    if (ia > ca) {
      sw = src.height * ca
      sx = (src.width - sw) / 2
    } else {
      sh = src.width / ca
      sy = (src.height - sh) / 2
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, dw, dh)
  }, [resolveFrame])

  // Progressively preload frames around the scrub position. The outside of the
  // window is dropped from the working set to bound memory on long sessions.
  const ensureWindow = useCallback((center: number) => {
    const total = countRef.current
    if (total <= 0) return
    const start = Math.max(0, center - PRELOAD_BEHIND)
    const end = Math.min(total - 1, center + PRELOAD_AHEAD)
    for (let i = start; i <= end; i++) {
      if (imagesRef.current.has(i)) continue
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (imagesRef.current.get(i) !== img) return
        if (loadingRef.current) {
          loadingRef.current = false
          setIsLoading(false)
          drawFrame(0)
        }
      }
      img.onerror = () => {
        if (imagesRef.current.get(i) === img) imagesRef.current.delete(i)
        if (!loadingRef.current) return
        // Only the early frames gate the loading screen; if they all fail we
        // still release the page rather than hanging on the splash.
        if (i <= Math.min(4, total - 1)) {
          initialFailuresRef.current++
          if (initialFailuresRef.current >= Math.min(5, total)) {
            loadingRef.current = false
            setIsLoading(false)
          }
        }
      }
      imagesRef.current.set(i, img)
      img.src = frameSrc(i)
    }
    const evictBefore = center - (PRELOAD_BEHIND + EVICT_BEHIND_MARGIN)
    const evictAfter = center + (PRELOAD_AHEAD + EVICT_AHEAD_MARGIN)
    imagesRef.current.forEach((_img, key) => {
      if (key < evictBefore || key > evictAfter) imagesRef.current.delete(key)
    })
  }, [drawFrame, frameSrc])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const dpr = window.devicePixelRatio || 1
    const rect = stage.getBoundingClientRect()
    canvas.width = Math.max(1, Math.round(rect.width * dpr * RENDER_SCALE))
    canvas.height = Math.max(1, Math.round(rect.height * dpr * RENDER_SCALE))
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr * RENDER_SCALE, dpr * RENDER_SCALE)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctxRef.current = ctx
    }
    drawFrame(progressRef.current)
  }, [drawFrame])

  useEffect(() => {
    resizeCanvas()
    const ro = new ResizeObserver(() => resizeCanvas())
    if (stageRef.current) ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [resizeCanvas])

  // Resolve the frame count at runtime (never hardcoded), then start loading
  // the early frames so the hero opens on frame 1.
  useEffect(() => {
    let cancelled = false
    const init = async () => {
      try {
        const res = await fetch('/api/hero-frames')
        if (!res.ok) throw new Error('hero-frames unavailable')
        const data = await res.json()
        if (cancelled) return
        const count = Math.max(0, parseInt(data?.count, 10) || 0)
        countRef.current = count
        if (count > 0) {
          ensureWindow(0)
        } else {
          loadingRef.current = false
          setIsLoading(false)
        }
      } catch {
        if (!cancelled) {
          loadingRef.current = false
          setIsLoading(false)
        }
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [ensureWindow])

  useEffect(() => {
    if (isLoading || !sectionRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches && navigator.maxTouchPoints > 0
    const scrollMult = isMobile ? MOBILE_SCROLL_MULTIPLIER : SCROLL_MULTIPLIER

    // Chapter 1 entrance — staggered fade-in on load
    if (!prefersReduced) {
      const ch1Elements = [
        { el: ch1EyebrowRef.current, delay: 200 },
        { el: ch1HeadlineRef.current, delay: 400 },
        { el: ch1SubtextRef.current, delay: 600 },
        { el: ch1CtaRef.current, delay: 800 },
      ]
      ch1Elements.forEach(({ el, delay }) => {
        if (el) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
        }
      })
      if (scrollIndicatorRef.current) {
        setTimeout(() => {
          scrollIndicatorRef.current!.style.opacity = '1'
        }, 1200)
      }
    } else {
      // Reduced motion: show a static frame (no scroll scrubbing) at the
      // final chapter state, waiting only until that frame has decoded.
      const total = countRef.current
      if (total <= 0) {
        updateOverlays(REDUCED_MOTION_PROGRESS)
        return
      }
      const targetIndex = Math.round(REDUCED_MOTION_PROGRESS * (total - 1))
      ensureWindow(targetIndex)
      let attempts = 0
      const paint = () => {
        attempts++
        if (!resolveFrame(targetIndex)) {
          // Failsafe: if the frames never decode, release the page anyway.
          if (attempts < 120) {
            rafRef.current = requestAnimationFrame(paint)
          } else {
            updateOverlays(REDUCED_MOTION_PROGRESS)
          }
          return
        }
        drawFrame(REDUCED_MOTION_PROGRESS)
        updateOverlays(REDUCED_MOTION_PROGRESS)
      }
      rafRef.current = requestAnimationFrame(paint)
      return () => { cancelAnimationFrame(rafRef.current) }
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * scrollMult}`,
      scrub: isMobile ? MOBILE_SCRUB : 0.15,
      pin: wrapperRef.current,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0
            const p = progressRef.current
            drawFrame(p)
            ensureWindow(Math.round(p * (countRef.current - 1)))
            updateOverlays(p)
          })
        }
      },
    })

    return () => { st.kill(); cancelAnimationFrame(rafRef.current) }
  }, [isLoading, drawFrame, ensureWindow, resolveFrame, updateOverlays])

  return (
    <div ref={wrapperRef} className="relative">
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
        aria-label="Hero — AUVERER cinematic sequence"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        {/* Cinematic canvas */}
        <div
          ref={stageRef}
          style={{
            position: 'absolute',
            top: '-5%',
            left: 0,
            right: 0,
            bottom: '-5%',
            height: '110%',
            width: '100%',
          }}
        >
          <motion.canvas
            ref={canvasRef}
            className="block w-full h-full"
            aria-hidden="true"
            style={{ scale: imageScale, y: imageY, willChange: 'transform' }}
          />
        </div>

        {/* Single continuous cinematic overlay — covers the full hero edge to
            edge at every breakpoint so no boundary is ever visible. The left
            stays darker for the chapter copy while the right stays lighter to
            keep the cream/product imagery visible. One layer scales with the
            hero height; there is no per-chapter or fixed-height overlay. */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `radial-gradient(ellipse at 22% 45%, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 62%),
              linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.38) 45%, rgba(10,10,10,0.16) 100%),
              linear-gradient(to top, rgba(10,10,10,0.22) 0%, rgba(10,10,10,0) 20%)`,
          }}
        />

        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: '#0a0a0a' }}>
            <p aria-label="Loading AUVERER" style={{ color: 'var(--color-text-inverse)', fontFamily: 'var(--font-display)', fontSize: '1.25rem', letterSpacing: '0.3em', fontWeight: 300 }}>
              AUVERER
            </p>
          </div>
        )}

        {/* Screen reader text */}
        <div className="sr-only">
          <h1>AUVERER — The Art of Timeless Radiance</h1>
          <p>Where clinical precision meets uncompromising luxury. Formulated for truth, designed for eternity.</p>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-30 pointer-events-none" aria-hidden="true">
          <div
            ref={progressBarRef}
            className="h-full origin-left"
            style={{ background: 'var(--color-brand-secondary)', transform: 'scaleX(0)' }}
          />
        </div>

        {/* ===== CHAPTER 1 — THE ART ===== */}
        <div
          ref={ch1ContainerRef}
          className="hero-chapter absolute left-0 top-0 bottom-0 w-full md:w-[50%] flex items-center z-20 pointer-events-none"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="w-full px-8 md:px-16 lg:px-24">
            <div style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)' }}>
              <p
                ref={ch1EyebrowRef}
                style={{
                  color: 'var(--color-brand-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)',
                  letterSpacing: '0.3em',
                  fontWeight: 400,
                  textTransform: 'uppercase' as const,
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
              >
                Skincare Maison
              </p>
              <h1
                ref={ch1HeadlineRef}
                style={{
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  letterSpacing: '-0.01em',
                  fontWeight: 300,
                  lineHeight: 1.18,
                  marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
              >
                The Art of
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-brand-secondary)' }}>
                  Timeless
                </span>
                <br />
                Radiance
              </h1>
              <p
                ref={ch1SubtextRef}
                style={{
                  color: 'var(--color-brand-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  letterSpacing: '0.04em',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  maxWidth: '32rem',
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s, transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s',
                }}
              >
                Where clinical precision meets uncompromising luxury.
                Formulated for truth, designed for eternity.
              </p>
              <motion.button
                ref={ch1CtaRef}
                aria-label="Explore the collection"
                onClick={() => { window.location.href = '/collections' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 2rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-brand-secondary)',
                  color: 'var(--color-brand-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s, transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s, background-color 0.4s ease, color 0.4s ease',
                  opacity: 0,
                  transform: 'translateY(30px)',
                  marginTop: 'clamp(1rem, 2vw, 1.5rem)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-brand-secondary)'; e.currentTarget.style.color = 'var(--color-brand-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-brand-secondary)' }}
              >
                Explore
              </motion.button>
            </div>
          </div>
        </div>

        {/* ===== CHAPTER 2 — PHILOSOPHY ===== */}
        <div ref={ch2ContainerRef} className="hero-chapter absolute left-0 top-0 bottom-0 w-full md:w-[65%] flex items-center z-20 pointer-events-none">
          <div className="w-full px-8 md:px-16 lg:px-24">
            <div style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)' }}>
              <p
                ref={ch2LabelRef}
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  letterSpacing: '0.25em',
                  fontWeight: 400,
                  textTransform: 'uppercase' as const,
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
              >
                02 — Our Philosophy
              </p>
              <h2
                ref={ch2HeadlineRef}
                style={{
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  letterSpacing: '-0.01em',
                  fontWeight: 300,
                  lineHeight: 1.18,
                  marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
              >
                Science Meets
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-brand-secondary)' }}>
                  Elegance
                </span>
              </h2>
              <p
                ref={ch2BodyRef}
                style={{
                  color: 'var(--color-brand-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  letterSpacing: '0.04em',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  maxWidth: '32rem',
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
              >
                Every formula is a convergence of clinical research and artisan craftsmanship.
                We believe skincare is not routine — it is ritual.
              </p>
              <motion.button
                ref={ch2CtaRef}
                aria-label="Read our story"
                onClick={() => { window.location.href = '/about' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 2rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-brand-secondary)',
                  color: 'var(--color-brand-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.4s ease, color 0.4s ease',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  marginTop: 'clamp(1rem, 2vw, 1.5rem)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-brand-secondary)'; e.currentTarget.style.color = 'var(--color-brand-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-brand-secondary)' }}
              >
                Our Story
              </motion.button>
            </div>
          </div>
        </div>

        {/* ===== CHAPTER 3 — FINAL STATE ===== */}
        <div ref={ch3ContainerRef} className="hero-chapter absolute left-0 top-0 bottom-0 w-full md:w-[65%] flex items-center z-20 pointer-events-none">
          <div className="w-full px-8 md:px-16 lg:px-24">
            <div style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)' }}>
              <h2
                ref={ch3HeadlineRef}
                style={{
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                  letterSpacing: '-0.01em',
                  fontWeight: 300,
                  lineHeight: 1.18,
                  marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
              >
                Formulated
                <br />
                for{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--color-brand-secondary)' }}>
                  Truth
                </span>
              </h2>
              <p
                ref={ch3BodyRef}
                style={{
                  color: 'var(--color-brand-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  letterSpacing: '0.04em',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  marginBottom: 'clamp(2rem, 4vw, 3rem)',
                  maxWidth: '32rem',
                  opacity: 0,
                  transform: 'translateY(40px)',
                }}
              >
                No compromise. No concession. Only what earns its place
                through results and reverence for the craft.
              </p>
              <motion.button
                ref={ch3CtaRef}
                aria-label="Explore AUVERER"
                onClick={() => { window.location.href = '/collections' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '1rem 2.5rem',
                  backgroundColor: 'var(--color-text-inverse)',
                  border: 'none',
                  color: 'var(--color-brand-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.4s ease, color 0.4s ease',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  marginTop: 'clamp(1rem, 2vw, 1.5rem)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-brand-secondary)'; e.currentTarget.style.color = 'var(--color-brand-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-text-inverse)'; e.currentTarget.style.color = 'var(--color-brand-primary)' }}
              >
                Discover the Collection
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-20 pointer-events-none flex flex-col items-center gap-2"
          aria-hidden="true"
          style={{ opacity: 0 }}
          ref={scrollIndicatorRef}
        >
          <span style={{ color: 'var(--color-brand-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>
            Scroll
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: '2px' }}>
            <path d="M1 3.5L6 8.5L11 3.5" stroke="var(--color-brand-secondary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>
    </div>
  )
}
