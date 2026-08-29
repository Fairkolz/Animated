'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 120
const FRAME_PATH = '/hero-sequence/frame-'
// Total pinned scroll = SCROLL_MULTIPLIER viewport heights. Reduced from 4 -> 2.5
// so each scroll input travels further through the 120-frame sequence, which is
// what makes chapter advances feel responsive (the frame count itself is untouched).
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
// On narrow canvases (mobile/tablet) the cover-crop window shows only a small
// vertical slice of the 16:9 source. If we center that slice on the product's
// DRIFTING centroid (0.62 -> 0.49 across the sequence) the jar's label — whose
// RIGHT edge measures a stable ~0.70 of frame width in the frames — gets cut by
// the window's right edge near the end of the scroll, hiding the "AUVÉRER
// RENEWAL" text. So instead we pin the crop window's RIGHT edge to a fixed
// anchor just past the label, which keeps the label in frame at every scroll
// position. Desktop (wide canvas) is unaffected: it uses a centered near-full
// width crop.
const LABEL_RIGHT_ANCHOR = 0.74

// The 120 source frames are ~1672x940 JPEGs that read a touch soft when shown
// full-screen. Each frame is sharpened ONCE at decode time (luma unsharp mask
// applied to the decoded pixels) and stored as a canvas, so the per-frame draw
// stays cheap and browser support needs nothing beyond Canvas 2D.
const SHARPEN_STRENGTH = 1.0

type FrameSource = HTMLImageElement | HTMLCanvasElement

function sharpenFrame(img: HTMLImageElement): FrameSource {
  const w = img.naturalWidth
  const h = img.naturalHeight
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const c2d = cv.getContext('2d', { willReadFrequently: true })
  if (!c2d) return img
  c2d.drawImage(img, 0, 0)
  const imageData = c2d.getImageData(0, 0, w, h)
  const d = imageData.data
  const n = w * h

  const lum = new Float32Array(n)
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    lum[i] = 0.299 * d[p] + 0.587 * d[p + 1] + 0.114 * d[p + 2]
  }

  // Two-pass [1,2,1] blur for a soft ~1px luma base.
  const tmp = new Float32Array(n)
  for (let y = 0; y < h; y++) {
    const row = y * w
    tmp[row] = lum[row]
    for (let x = 1; x < w - 1; x++) {
      const i = row + x
      tmp[i] = (lum[i - 1] + 2 * lum[i] + lum[i + 1]) * 0.25
    }
    tmp[row + w - 1] = lum[row + w - 1]
  }
  const blur = new Float32Array(n)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      blur[i] =
        (tmp[i - w] + 2 * tmp[i] + tmp[i + w]) * 0.25
    }
  }

  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const delta = SHARPEN_STRENGTH * (lum[i] - blur[i])
    d[p] = clamp(Math.round(d[p] + delta), 0, 255)
    d[p + 1] = clamp(Math.round(d[p + 1] + delta), 0, 255)
    d[p + 2] = clamp(Math.round(d[p + 2] + delta), 0, 255)
  }
  c2d.putImageData(imageData, 0, 0)
  return cv
}

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
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<Map<number, FrameSource>>(new Map())
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef(0)
  const progressRef = useRef(0)

  const ch1EyebrowRef = useRef<HTMLParagraphElement>(null)
  const ch1HeadlineRef = useRef<HTMLHeadingElement>(null)
  const ch1SubtextRef = useRef<HTMLParagraphElement>(null)
  const ch1CtaRef = useRef<HTMLButtonElement>(null)

  const ch2LabelRef = useRef<HTMLParagraphElement>(null)
  const ch2HeadlineRef = useRef<HTMLHeadingElement>(null)
  const ch2BodyRef = useRef<HTMLParagraphElement>(null)
  const ch2CtaRef = useRef<HTMLButtonElement>(null)

  const ch3HeadlineRef = useRef<HTMLHeadingElement>(null)
  const ch3BodyRef = useRef<HTMLParagraphElement>(null)
  const ch3CtaRef = useRef<HTMLButtonElement>(null)

  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const loadedCountRef = useRef(0)

  const motionProgress = useMotionValue(0)
  const springProgress = useSpring(motionProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  const imageScale = useTransform(springProgress, [0, 0.5, 0.85, 1], [1.15, 1.0, 1.0, 1.0])
  const imageY = useTransform(springProgress, [0, 0.85, 1], ['0%', '-8%', '-8%'])

  const applyChapter = useCallback((el: HTMLElement | null, v: { opacity: number; y: number }) => {
    if (!el) return
    el.style.opacity = String(v.opacity)
    el.style.transform = `translateY(${v.y}px)`
  }, [])

  const updateOverlays = useCallback((p: number) => {
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
  }, [applyChapter, motionProgress])

  const drawInterpolated = useCallback((progress: number) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const exactFrame = progress * (TOTAL_FRAMES - 1)
    const frameA = Math.floor(exactFrame)
    const frameB = Math.min(frameA + 1, TOTAL_FRAMES - 1)
    const blend = exactFrame - frameA

    const imgA = imagesRef.current.get(frameA)
    const imgB = imagesRef.current.get(frameB)
    if (!imgA) return

    const dpr = window.devicePixelRatio || 1
    const dw = canvas.width / (dpr * RENDER_SCALE)
    const dh = canvas.height / (dpr * RENDER_SCALE)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const cropWindow = (img: FrameSource) => {
      const ia = img.width / img.height
      const ca = dw / dh
      if (ia > ca) {
        const sh = img.height
        const sw = img.height * ca
        // Wide canvas — crop window is near full width, keep it centered.
        if (sw / img.width >= 0.85) {
          return { sx: (img.width - sw) / 2, sy: 0, sw, sh }
        }
        // Narrow canvas — pin the window's RIGHT edge to the label anchor so
        // the jar's "AUVÉRER RENEWAL" label stays in frame instead of being
        // cut when the product's centroid drifts left over the sequence.
        const sx = clamp(LABEL_RIGHT_ANCHOR * img.width - sw, 0, img.width - sw)
        return { sx, sy: 0, sw, sh }
      }
      const sw = img.width
      const sh = img.width / ca
      return { sx: 0, sy: (img.height - sh) / 2, sw, sh }
    }

    const windowA = cropWindow(imgA)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const drawImg = (img: FrameSource, win: { sx: number; sy: number; sw: number; sh: number }) => {
      ctx.drawImage(img, win.sx, win.sy, win.sw, win.sh, 0, 0, dw, dh)
    }

    drawImg(imgA, windowA)
    if (imgB && blend > 0.01) {
      // Smootherstep the blend so the cross-dissolve spends less time at the
      // washed-out mid point (blend 0.5), reducing ghosting/judder while scrubbing.
      const b = blend * blend * (3 - 2 * blend)
      ctx.globalAlpha = b
      drawImg(imgB, windowA)
      ctx.globalAlpha = 1
    }
  }, [])

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
    drawInterpolated(progressRef.current)
  }, [drawInterpolated])

  useEffect(() => {
    resizeCanvas()
    const ro = new ResizeObserver(() => resizeCanvas())
    if (stageRef.current) ro.observe(stageRef.current)

    let firstLoaded = false

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const idx = i
      const img = new Image()
      img.onload = () => {
        imagesRef.current.set(idx, sharpenFrame(img))
        loadedCountRef.current++
        if (!firstLoaded && idx === 0) {
          firstLoaded = true
          setIsLoading(false)
          drawInterpolated(0)
        }
      }
      img.onerror = () => {
        loadedCountRef.current++
        if (!firstLoaded && loadedCountRef.current >= 2) {
          firstLoaded = true
          setIsLoading(false)
        }
      }
      img.src = `${FRAME_PATH}${String(idx).padStart(3, '0')}.jpg`
    }
    return () => ro.disconnect()
  }, [resizeCanvas, drawInterpolated])

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
      // Reduced motion: show everything immediately at final state
      drawInterpolated(0.85)
      updateOverlays(0.85)
      return
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
            drawInterpolated(p)
            updateOverlays(p)
          })
        }
      },
    })

    return () => { st.kill(); cancelAnimationFrame(rafRef.current) }
  }, [isLoading, drawInterpolated, updateOverlays])

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

        {/* Readability overlays */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 25% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)' }}
        />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 55%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
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
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[65%] flex items-center z-20 pointer-events-none">
          <div className="w-full px-8 md:px-16 lg:px-24 pointer-events-auto">
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
                  lineHeight: 1.05,
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
                onClick={() => router.push('/collections')}
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
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[65%] flex items-center z-20 pointer-events-none">
          <div className="w-full px-8 md:px-16 lg:px-24 pointer-events-auto">
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
                  lineHeight: 1.1,
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
                aria-label="Discover our philosophy"
                onClick={() => router.push('/philosophy')}
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
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[65%] flex items-center z-20 pointer-events-none">
          <div className="w-full px-8 md:px-16 lg:px-24 pointer-events-auto">
            <div style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)' }}>
              <h2
                ref={ch3HeadlineRef}
                style={{
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                  letterSpacing: '-0.01em',
                  fontWeight: 300,
                  lineHeight: 1.05,
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
                onClick={() => router.push('/collections')}
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
