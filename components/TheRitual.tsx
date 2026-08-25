'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

export default function TheRitual() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="The Ritual"
      style={{
        backgroundColor: 'var(--color-surface-background)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header Block */}
        <div
          style={{ marginBottom: 'clamp(4rem, 6vw, 6rem)' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-12"
        >
          <div className="md:col-span-6">
            <motion.h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                fontWeight: 300,
              }}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              The Ritual
            </motion.h2>
          </div>
          <div className="md:col-span-6" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <motion.p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                fontWeight: 300,
              }}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            >
              A sequence designed to isolate the senses, drawing profound efficacy from quiet darkness.
            </motion.p>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left Column (Tall) */}
          <motion.div
            className="md:col-span-7"
            initial={prefersReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div
              style={{
                aspectRatio: '4/5',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'var(--color-surface-container)',
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbdH7SbQKf9225iBoztpBBjrgMEyvjx8ePvxEIsg8YaRvElqwxO5x42N8vZRkNBCEhqrVAbWexsw7d32JcPyMGvY_C-mfCcEEWYlI7CcJisBE8fWasoNjlOQVpta8dqOkEXjtGYl95sYZOwjCafsDsV3R8r0SBcX6MXCXE9OJtI8YD6woIDApiLJ7nJkrPQp1pwyAs97cka6IRyLaQWkwy6L7xrcI3rNEeNDManv4p4ake7hoP7bL7"
                  alt="Cleansing the face at a dimly lit basin, preparation step of the ritual"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-accent-gold)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}>01</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, color: 'var(--color-text-primary)' }}>Preparation</h3>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '28rem' }}>
                Cleanse the canvas, removing the &apos;noise&apos; of the day to reveal truth.
              </p>
            </div>
          </motion.div>

          {/* Right Column (Stacked) */}
          <div className="md:col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Top Block */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div
                style={{
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'var(--color-surface-container)',
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvh6LIAOSY3oJZvU3TMr7C60WP3jYlq4rBbnMaxj2I2_pRQExBHj_ZZR6-8DmrXEpTxCfjYDxuTDQ4To5prUWaim9Rg6YY1Us16mjuGCynqKY93V7tyqyEB31FDY4WMPlQYN6yfTtYQQkL5wfnpHDdu22S0C313vrA3hsukQKDfOqxrnLazfR9RwzkoOeD-taSiuP9GSc8pKNAOD6PURx0LObszVlblWDduKC_Tz5T6kyOSiqAXXhF"
                  alt="Auvérer serum concentrate bottle dispensing the infusion step of the ritual"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--color-accent-gold)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}>02</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, color: 'var(--color-text-primary)' }}>Infusion</h3>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '28rem' }}>
                  Introduce the concentrate slowly, letting skin absorb what it needs.
                </p>
              </div>
            </motion.div>

            {/* Bottom Block */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div
                style={{
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'var(--color-surface-container)',
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdPCmX-MgBiDLtrKP0bH65rJRUbsEtbCeOyN0JMGMSDk8CZxdou65kznH5wfBrvlF3ewBVrUubMOFDnCSCDt0rRlHmUFBkIxiqRm448DRwKm_59o8TKeXrKL1HqET5JXuDqvjpfCNFZNa4w0_YzcFLQ39bL46L1wqBpXh-0LNZE8t7r3_xka5ulk6SHl0kPfvytKRVXs7b75Uo4r6vpsyX0OJF3B_i47cTy-pb1qNdbIY5Sj8XcksE"
                  alt="Hands applying the final balm, culmination of the ritual"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--color-accent-gold)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}>03</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, color: 'var(--color-text-primary)' }}>Culmination</h3>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '28rem' }}>
                  Seal the essence. The final layer creates a barrier between profound nourishment and the harsh reality of the exterior world.
                </p>
                <Link
                  href="/philosophy"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--color-accent-gold)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  DISCOVER THE SEQUENCE →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
