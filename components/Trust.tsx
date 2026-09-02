'use client'

import { motion, useReducedMotion } from 'motion/react'

export default function Trust() {
  const prefersReduced = useReducedMotion()

  const pressLogos = ['VOGUE', 'FORBES', "HARPER'S BAZAAR", 'GQ', 'WWD']

  return (
    <section
      aria-label="Trust and Press"
      style={{
        backgroundColor: 'var(--color-surface-container)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Testimonial Quote */}
        <motion.blockquote
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
            fontWeight: 300,
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          &ldquo;The Neutralizing Elixir has transformed my evening ritual into a moment of profound restoration. My skin has never felt more resilient.&rdquo;
        </motion.blockquote>

        {/* Testimonial Author */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '6rem',
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%', // Circle portrait allowed
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-surface)',
              border: '1px solid var(--color-border-strong)',
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGiEaHkfvvn7-r37gs_W2q-sRytPUQMjqBEcttPgxoEwFHp3hTOsLt4aZzO5kV9p1SrLTTP8eJ8Gk11hbeMfDNtX-wChlkwVjWYZL5VNoo4Fb7vgA1qf0X48pwIQe6CuEnDXCUE7-QGljwZv1R7Cd8EvhNo00Zcp7a3-7dnnicl1wvtoEI0DK2k7qtJ7MXarJNqDrIYfY8BawKBaKAnGTPW3PYqnxok49eXjBG2frZ7-6OSQfnVdSb"
              alt="Elena Vance portrait"
              loading="lazy"
              decoding="async"
              width={56}
              height={56}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.675rem',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              Elena Vance
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                color: 'var(--color-text-secondary)',
                marginTop: '0.25rem',
                margin: 0,
              }}
            >
              Creative Director
            </p>
          </div>
        </motion.div>

        {/* Press Strip divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border-default)', width: '100%', marginBottom: '4rem' }} />

        {/* Press Strip Header */}
        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--color-accent-gold)',
            marginBottom: '2.5rem',
          }}
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          AS FEATURED IN
        </motion.p>

        {/* Press Logos row */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(2rem, 5vw, 4rem)',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {pressLogos.map((logo) => (
            <motion.span
              key={logo}
              variants={{
                hidden: prefersReduced ? { opacity: 0.4 } : { opacity: 0, y: 15 },
                visible: { opacity: 0.4, y: 0, transition: { duration: 0.6 } },
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4' }}
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Decorative watermark */}
      <div style={{ position: 'absolute', bottom: '-8rem', right: '-8rem', opacity: 0.02, pointerEvents: 'none' }}>
        <svg width="480" height="480" viewBox="0 0 48 48" fill="none">
          <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
