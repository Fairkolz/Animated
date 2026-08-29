'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'

/* Section-scoped aliases mapped onto the global dark token system
   (hero world: deep charcoal / champagne gold / amber). */
const vars = {
  '--paper': 'var(--color-surface-background)',
  '--ink': 'var(--color-text-primary)',
  '--ink-soft': 'var(--color-text-secondary)',
  '--ink-muted': 'var(--color-text-muted)',
  '--gold': 'var(--color-brand-secondary)',
  '--gold-deep': 'var(--color-accent-gold)',
  '--hairline': 'color-mix(in srgb, var(--color-text-primary) 12%, transparent)',
  '--hairline-strong': 'color-mix(in srgb, var(--color-text-primary) 30%, transparent)',
} as CSSProperties

const easeStandard: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

/* Fixed-composition stage: the desktop diagram keeps its designed geometry
   (1520x880) and scales down proportionally, so callout text can never
   cross the rings at any viewport width. */
const STAGE_WIDTH = 1520
const STAGE_HEIGHT = 880
const STAGE_CIRCLE_WIDTH = 900

const principles = [
  {
    index: '01',
    title: 'Cellular Repair',
    body: 'Focused on bio-active restoration and strengthening the skin’s fundamental architectural matrix.',
    corner: 'top-left' as const,
  },
  {
    index: '02',
    title: 'Botanical Vitality',
    body: 'Harnessing the potent essence of Japanese Camellia and White Truffle for unparalleled antioxidant defense.',
    corner: 'top-right' as const,
  },
  {
    index: '03',
    title: 'Hydration Recovery',
    body: 'Engineered for deep moisture retention, creating a continuous reservoir of cellular hydration.',
    corner: 'bottom-left' as const,
  },
  {
    index: '04',
    title: 'Mineral Rich',
    body: 'Infused with raw earth elements to magnetize impurities while reinforcing natural lipid barriers.',
    corner: 'bottom-right' as const,
  },
]

const leadPlacement: Record<string, CSSProperties & { angle: number }> = {
  'top-left': { top: '44px', right: '-112px', transformOrigin: 'left center', angle: 14 },
  'top-right': { top: '44px', left: '-112px', transformOrigin: 'right center', angle: -14 },
  'bottom-left': { top: '28px', right: '-104px', transformOrigin: 'left center', angle: -12 },
  'bottom-right': { top: '28px', left: '-104px', transformOrigin: 'right center', angle: 12 },
}

/* Fixed pixel offsets inside the stage — verified against the 900px ring
   geometry so no block intrudes into either circle. */
const calloutPlacement: Record<string, CSSProperties> = {
  'top-left': { top: 32, left: 96, textAlign: 'right' },
  'top-right': { top: 32, right: 96, textAlign: 'left' },
  'bottom-left': { bottom: 48, left: 96, textAlign: 'right' },
  'bottom-right': { bottom: 48, right: 96, textAlign: 'left' },
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function DiagramFigure({
  prefersReduced,
  circleWidth,
  imageClassName,
}: {
  prefersReduced: boolean | null
  circleWidth: number | string
  imageClassName: string
}) {
  return (
    <figure className="relative z-10 m-0 flex flex-col items-center">
      <div
        className="absolute pointer-events-none"
        style={{
          width: circleWidth,
          aspectRatio: '1 / 1',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
        }}
      >
        <svg viewBox="0 0 800 800" fill="none" className="absolute inset-0" aria-hidden="true">
          <circle cx="400" cy="400" r="298" stroke="var(--hairline)" strokeWidth="1" />
          <circle cx="400" cy="400" r="250" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="1 7" />
          <path d="M400 86v28M400 686v28M86 400h28M686 400h28" stroke="var(--hairline-strong)" strokeWidth="1" />
          <text x="400" y="30" textAnchor="middle" fill="var(--ink-muted)" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="0.3em">
            N°01
          </text>
        </svg>
        <motion.svg
          viewBox="0 0 800 800"
          fill="none"
          className="absolute inset-0"
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
          aria-hidden="true"
        >
          <circle cx="400" cy="400" r="340" stroke="var(--hairline-strong)" strokeWidth="1" strokeDasharray="2 10" />
          <rect x="397" y="52" width="6" height="6" fill="var(--gold-deep)" />
          <rect x="397" y="742" width="6" height="6" fill="var(--gold-deep)" />
          <rect x="52" y="397" width="6" height="6" fill="var(--gold-deep)" />
          <rect x="742" y="397" width="6" height="6" fill="var(--gold-deep)" />
        </motion.svg>
      </div>
      <motion.div
        animate={prefersReduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvh6LIAOSY3oJZvU3TMr7C60WP3jYlq4rBbnMaxj2I2_pRQExBHj_ZZR6-8DmrXEpTxCfjYDxuTDQ4To5prUWaim9Rg6YY1Us16mjuGCynqKY93V7tyqyEB31FDY4WMPlQYN6yfTtYQQkL5wfnpHDdu22S0C313vrA3hsukQKDfOqxrnLazfR9RwzkoOeD-taSiuP9GSc8pKNAOD6PURx0LObszVlblWDduKC_Tz5T6kyOSiqAXXhF"
          alt="Auvérer serum in a dark glass bottle with a minimalist white label"
          width={480}
          height={600}
          loading="lazy"
          decoding="async"
          className={`relative z-10 object-contain mix-blend-screen h-auto ${imageClassName}`}
          style={{ filter: 'drop-shadow(0 48px 64px rgba(0, 0, 0, 0.55))' }}
        />
      </motion.div>
      <figcaption
        className="mt-10 text-xs font-semibold uppercase"
        style={{
          color: 'var(--ink-muted)',
          letterSpacing: '0.35em',
          fontFamily: 'var(--font-body)',
        }}
      >
        Fig. 01 — Serum Concentré
      </figcaption>
    </figure>
  )
}

export default function TheFormulation() {
  const prefersReduced = useReducedMotion()
  const stageWrapperRef = useRef<HTMLDivElement>(null)
  const [stageScale, setStageScale] = useState(1)

  useIsomorphicLayoutEffect(() => {
    const el = stageWrapperRef.current
    if (!el) return
    const updateScale = () => {
      setStageScale(Math.min(1, el.clientWidth / STAGE_WIDTH))
    }
    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      aria-labelledby="formulation-title"
      style={{
        ...vars,
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--hairline)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '100rem', margin: '0 auto' }}>
        <header className="text-center mb-24 md:mb-32">
          <motion.p
            className="text-xs font-semibold uppercase mb-8"
            style={{
              color: 'var(--gold-deep)',
              letterSpacing: '0.35em',
              fontFamily: 'var(--font-body)',
            }}
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeStandard }}
          >
            Maison Auvérer — Clinical Botanicals
          </motion.p>
          <motion.h2
            id="formulation-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
            initial={prefersReduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeStandard }}
          >
            <em>The</em> Formulation
          </motion.h2>
          <motion.div
            className="flex items-center justify-center gap-6 mt-10"
            aria-hidden="true"
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: easeStandard }}
          >
            <span className="block h-px w-16" style={{ backgroundColor: 'var(--hairline-strong)' }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--gold)' }} />
            <span className="block h-px w-16" style={{ backgroundColor: 'var(--hairline-strong)' }} />
          </motion.div>
          <motion.p
            className="mx-auto mt-10 max-w-[52ch] text-lg md:text-xl"
            style={{
              lineHeight: 1.8,
              color: 'var(--ink-muted)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
            }}
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeStandard }}
          >
            A clinical approach to botanical science, meticulously engineered for ultimate cellular resonance.
          </motion.p>
        </header>

        {/* Desktop (lg+): fixed 1520x880 composition, uniformly scaled to fit */}
        <div
          ref={stageWrapperRef}
          aria-label="Formulation principles diagram"
          className="relative hidden lg:block w-full"
          style={{ height: `${STAGE_HEIGHT * stageScale}px` }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left flex items-center justify-center"
            style={{
              width: STAGE_WIDTH,
              height: STAGE_HEIGHT,
              transform: `scale(${stageScale})`,
            }}
          >
            <DiagramFigure
              prefersReduced={prefersReduced}
              circleWidth={STAGE_CIRCLE_WIDTH}
              imageClassName="w-[480px]"
            />

            {principles.map((p, i) => {
              const lead = leadPlacement[p.corner]
              return (
                <motion.article
                  key={p.index}
                  className="group absolute w-80"
                  style={calloutPlacement[p.corner]}
                  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: easeStandard }}
                >
                  <p
                    className="italic text-lg mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-deep)' }}
                  >
                    {p.index}
                  </p>
                  <h3
                    className="text-[28px] leading-tight transition-colors duration-500 group-hover:text-[color:var(--gold-deep)]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--ink)' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-3 text-sm"
                    style={{
                      lineHeight: 1.75,
                      color: 'var(--ink-muted)',
                      fontFamily: 'var(--font-body)',
                      textAlign: 'left',
                    }}
                  >
                    {p.body}
                  </p>
                  <motion.span
                    className="absolute w-24 h-px transition-colors duration-500 group-hover:bg-[color:var(--gold-deep)]"
                    style={{
                      top: lead.top,
                      left: lead.left,
                      right: lead.right,
                      backgroundColor: 'var(--hairline-strong)',
                      transformOrigin: lead.transformOrigin,
                    }}
                    initial={prefersReduced ? false : { scaleX: 0, rotate: lead.angle }}
                    whileInView={{ scaleX: 1, rotate: lead.angle }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: easeStandard }}
                    aria-hidden="true"
                  >
                    <span
                      className="absolute w-2 h-2 rounded-full border transition-all duration-500 group-hover:bg-[color:var(--gold-deep)] group-hover:scale-150"
                      style={{
                        top: '-3.5px',
                        ...(lead.left != null ? { left: '-4px' } : { right: '-4px' }),
                        borderColor: 'var(--gold-deep)',
                        backgroundColor: 'var(--paper)',
                      }}
                    />
                  </motion.span>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* Tablet/mobile: the circular diagram is desktop-only. On smaller
            screens the four principles read as a clean linear list below —
            showing both would overlap illegibly and add noise. */}
        <ol className="lg:hidden w-full max-w-xl mx-auto mt-16 list-none border-t" style={{ borderColor: 'var(--hairline)' }}>
          {principles.map((p, i) => (
            <motion.li
              key={p.index}
              className="py-8 border-b"
              style={{ borderColor: 'var(--hairline)' }}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeStandard }}
            >
              <p className="italic text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-deep)' }}>
                {p.index}
              </p>
              <h3 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--ink)' }}>
                {p.title}
              </h3>
              <p
                className="mt-2 text-sm"
                style={{ lineHeight: 1.75, color: 'var(--ink-muted)', fontFamily: 'var(--font-body)' }}
              >
                {p.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
