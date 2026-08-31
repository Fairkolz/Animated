'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

const easeStandard: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

export default function ThePhilosophy() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-labelledby="philosophy-title"
      style={{
        backgroundColor: 'var(--color-surface-background)',
        padding: 'clamp(7rem, 12vw, 12rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <motion.div
        className="mx-auto w-full max-w-[44rem] text-center"
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: easeStandard }}
      >
        <h2
          id="philosophy-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-primary)',
          }}
        >
          <em>The</em> Philosophy
        </h2>
        <p
          className="mt-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
            lineHeight: 1.6,
            color: 'var(--color-text-primary)',
          }}
        >
          Skincare is not about changing how you look, but revealing the timeless elegance that was always there.
        </p>
        <p
          className="mt-6"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
          }}
        >
          We practice restraint — fewer acts, deeper intention — composing each formula to restore skin slowly,
          quietly, and lastingly.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/philosophy"
            className="group inline-flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-accent-gold)',
              paddingBottom: '0.75rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent-gold)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
          >
            Discover the Full Philosophy
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 12h16" strokeLinecap="square" />
              <path d="M13 5l7 7-7 7" strokeLinecap="square" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
