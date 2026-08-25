'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Accordion from '../shared/Accordion'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

type Errors = { name?: string; email?: string; message?: string }

const faqs = [
  {
    title: 'How long does an order take to arrive?',
    content: (
      <p style={{ margin: 0 }}>
        Orders leave our atelier within two business days. European delivery typically takes two to four
        business days; North America and Asia-Pacific five to eight. Every parcel ships carbon-balanced and
        tracking is sent the moment it leaves us.
      </p>
    ),
  },
  {
    title: 'Can I sample a formula before committing?',
    content: (
      <p style={{ margin: 0 }}>
        Yes — every order includes two complimentary samples of your choosing, noted in the message field
        above or at checkout. If a full size proves wrong for your skin, unopened items may be returned
        within thirty days.
      </p>
    ),
  },
  {
    title: 'Are the formulas suitable for sensitive skin?',
    content: (
      <p style={{ margin: 0 }}>
        The collection was formulated with reactive skin as the default, not the exception: no synthetic
        fragrance, no drying alcohols, no essential-oil cocktails. The Neutralizing Elixir and Barrier Cream
        are our calmest entry points. As ever, patch-test first — even restraint deserves a trial.
      </p>
    ),
  },
  {
    title: 'Do you offer professional or spa accounts?',
    content: (
      <p style={{ margin: 0 }}>
        Selectively, and by conversation rather than application form. Write to wholesale@auverer.example
        with a note about your space and city, and one of the founders will reply personally.
      </p>
    ),
  },
]

export default function ContactSection() {
  const prefersReduced = useReducedMotion()
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!values.email.trim()) {
      next.email = 'An email address is required so we can reply.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'That email address does not look complete.'
    }
    if (values.message.trim().length < 10) {
      next.message = 'A sentence or two helps us help you.'
    }
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
    }
  }

  const inputStyle = (invalid: boolean): React.CSSProperties => ({
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${invalid ? 'var(--color-status-error)' : 'var(--color-border-strong)'}`,
    padding: '1rem 0',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: 'var(--color-text-primary)',
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
  })

  return (
    <>
      {/* Contact form + care info */}
      <section
        aria-label="Contact"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12" style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Form */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                marginBottom: '2.5rem',
              }}
            >
              Write to Us
            </h2>

            {submitted ? (
              <motion.div
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                role="status"
                style={{
                  borderTop: '1px solid var(--color-accent-gold)',
                  borderBottom: '1px solid var(--color-accent-gold)',
                  padding: '3rem 0',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                  }}
                >
                  Thank you, {values.name.trim()}.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Your message has been received. Our care team replies within one business day — usually
                  sooner, never later.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '2.5rem' }}>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.25em',
                      color: 'var(--color-text-secondary)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    style={inputStyle(Boolean(errors.name))}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      style={{
                        marginTop: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'var(--color-status-error)',
                      }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.25em',
                      color: 'var(--color-text-secondary)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    style={inputStyle(Boolean(errors.email))}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      style={{
                        marginTop: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'var(--color-status-error)',
                      }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.25em',
                      color: 'var(--color-text-secondary)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="How can we help?"
                    style={inputStyle(Boolean(errors.message))}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      style={{
                        marginTop: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'var(--color-status-error)',
                      }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-accent-gold)',
                    color: 'var(--color-brand-primary)',
                    border: 'none',
                    borderRadius: 0,
                    padding: '1.25rem 3.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Customer care */}
          <motion.aside
            className="lg:col-span-5"
            aria-label="Customer care"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--color-text-primary)',
                marginBottom: '2.5rem',
              }}
            >
              Customer Care
            </h2>
            <dl style={{ display: 'grid', gap: '2rem', margin: 0 }}>
              <div>
                <dt
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--color-accent-gold)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  care@auverer.example — read by a person, answered by one.
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--color-accent-gold)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Response Time
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Within one business day, Monday to Friday. During collection launches, allow two.
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--color-accent-gold)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Atelier
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Grasse, France. Visits by appointment, arranged through this page.
                </dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-title"
        style={{
          backgroundColor: 'var(--color-surface-surface)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <h2
            id="faq-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              marginBottom: '2.5rem',
            }}
          >
            Asked Often
          </h2>
          <Accordion items={faqs} defaultOpen={null} />
        </div>
      </section>
    </>
  )
}
