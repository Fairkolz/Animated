'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

export default function TheBelief() {
  const prefersReduced = useReducedMotion()

  const reveal = (delay: number) => ({
    initial: prefersReduced ? false : ({ opacity: 0, y: 24 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, delay, ease: EASE },
  })

  return (
    <section
      aria-label="The Belief"
      style={{
        backgroundColor: 'var(--color-surface-dim)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...reveal(0)} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 48 48" fill="var(--color-accent-gold)" aria-hidden="true">
            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
          </svg>
        </motion.div>

        <motion.p
          {...reveal(0.15)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--color-accent-gold)',
            marginBottom: '1.5rem',
          }}
        >
          Our Conviction
        </motion.p>

        <motion.h2
          {...reveal(0.3)}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
            lineHeight: 1.3,
            color: 'var(--color-text-primary)',
            fontWeight: 300,
            marginBottom: '2.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          True luxury is born in the shadows, where time slows and essence is refined.
        </motion.h2>

        <motion.p
          {...reveal(0.5)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.25vw, 1.125rem)',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
            maxWidth: '36rem',
            margin: '0 auto',
            fontWeight: 300,
          }}
        >
          We believe skincare is not a routine, but a deliberate act of reverence. Every drop is distilled,
          unapologetically intense, designed for those who seek depth over visibility.
        </motion.p>
      </div>
    </section>
  )
}
