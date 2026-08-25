'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 120
const FRAME_PATH = '/hero-sequence/frame-'
const SCROLL_MULTIPLIER = 4

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
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
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
    // Ch1 — visible at start, exits 0.12 → 0.22
    applyChapter(ch1EyebrowRef.current, resolveChapter(p, -0.01, 0, 0.12, 0.22))
    applyChapter(ch1HeadlineRef.current, resolveChapter(p, -0.01, 0, 0.12, 0.22))
    applyChapter(ch1SubtextRef.current, resolveChapter(p, -0.01, 0, 0.12, 0.22))
    applyChapter(ch1CtaRef.current, resolveChapter(p, -0.01, 0, 0.12, 0.22))

    // Ch2 — enters 0.18, exits 0.48 → 0.58
    applyChapter(ch2LabelRef.current, resolveChapter(p, 0.18, 0.26, 0.48, 0.58))
    applyChapter(ch2HeadlineRef.current, resolveChapter(p, 0.20, 0.28, 0.48, 0.58))
    applyChapter(ch2BodyRef.current, resolveChapter(p, 0.22, 0.30, 0.48, 0.58))
    applyChapter(ch2CtaRef.current, resolveChapter(p, 0.24, 0.32, 0.48, 0.58))

    // Ch3 — enters 0.52, holds through end (no exit)
    applyChapter(ch3HeadlineRef.current, resolveChapter(p, 0.52, 0.62, 1.01, 1.01))
    applyChapter(ch3BodyRef.current, resolveChapter(p, 0.55, 0.65, 1.01, 1.01))
    applyChapter(ch3CtaRef.current, resolveChapter(p, 0.58, 0.68, 1.01, 1.01))

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
    const dw = canvas.width / dpr
    const dh = canvas.height / dpr

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const drawImg = (img: HTMLImageElement) => {
      const ia = img.width / img.height
      const ca = dw / dh
      let sw: number, sh: number, sx = 0, sy = 0
      if (ia > ca) {
        sh = img.height; sw = img.height * ca; sx = (img.width - sw) / 2
      } else {
        sw = img.width; sh = img.width / ca; sy = (img.height - sh) / 2
      }
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh)
    }

    drawImg(imgA)
    if (imgB && blend > 0.01) {
      ctx.globalAlpha = blend
      drawImg(imgB)
      ctx.globalAlpha = 1
    }
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const dpr = window.devicePixelRatio || 1
    const rect = stage.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
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
        imagesRef.current.set(idx, img)
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
      end: () => `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
      scrub: 0.3,
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
