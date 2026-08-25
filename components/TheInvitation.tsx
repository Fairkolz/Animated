'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function TheInvitation() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const prefersReduced = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section
      aria-label="The Invitation"
      style={{
        backgroundColor: 'var(--color-surface-dim)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '44rem', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.3,
            color: 'var(--color-text-primary)',
            fontWeight: 300,
            marginBottom: '3.5rem',
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Secure early access to our next limited formulation.
        </motion.h2>

        {submitted ? (
          <motion.div
            aria-live="polite"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-accent-gold)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '1.5rem 0',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Thank you. Your early access is registered.
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                aria-label="Your email address for early access"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border-strong)',
                  padding: '1rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                  borderRadius: 0, // Sharp corners
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderBottomColor = 'var(--color-accent-gold)' }}
                onBlur={(e) => { e.currentTarget.style.borderBottomColor = 'var(--color-border-strong)' }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--color-accent-gold)',
                color: 'var(--color-brand-primary)',
                border: 'none',
                padding: '1.25rem 3.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                cursor: 'pointer',
                borderRadius: 0, // Sharp corners
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              JOIN THE LIST
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
