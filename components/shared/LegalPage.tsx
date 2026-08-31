'use client'

import { motion, useReducedMotion } from 'motion/react'
import Navigation from '../Navigation'
import Footer from '../Footer'
import Breadcrumb from './Breadcrumb'
import ScrollReveal from '../ScrollReveal'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

export type LegalSection = { heading: string; paragraphs: string[] }

/* Shared structure for the legal pages: consistent header, breadcrumb,
   placeholder notice and prose styling. */
export default function LegalPage({
  title,
  lede,
  crumbLabel,
  updated,
  sections,
}: {
  title: string
  lede: string
  crumbLabel: string
  updated: string
  sections: LegalSection[]
}) {
  const prefersReduced = useReducedMotion()

  return (
    <main>
      <Navigation />

      <header
        style={{
          backgroundColor: 'var(--color-surface-dim)',
          padding: 'clamp(8rem, 14vw, 12rem) clamp(1.5rem, 4vw, 4rem) clamp(3rem, 6vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: crumbLabel }]} />
          </motion.p>
          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginTop: '2.5rem',
            }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{
              marginTop: '1.5rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
            }}
          >
            {lede}
          </motion.p>
        </div>
      </header>

      {/* Placeholder notice */}
      <aside
        role="note"
        aria-label="Placeholder content notice"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderTop: '1px solid var(--color-border-default)',
          padding: '1.5rem clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <p
          style={{
            maxWidth: '48rem',
            margin: '0 auto',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-status-warning)',
          }}
        >
          Placeholder legal text — to be finalized by counsel before launch.
        </p>
      </aside>

      {/* Body */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-background)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          {sections.map((section, i) => (
            <ScrollReveal key={section.heading} delay={Math.min(i * 0.05, 0.2)}>
              <section aria-labelledby={`legal-${i}`} style={{ marginBottom: i === sections.length - 1 ? 0 : '3.5rem' }}>
                <h2
                  id={`legal-${i}`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {i + 1}. {section.heading}
                </h2>
                {section.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '0.9375rem',
                      lineHeight: 1.9,
                      color: 'var(--color-text-secondary)',
                      marginBottom: j === section.paragraphs.length - 1 ? 0 : '1.25rem',
                    }}
                  >
                    {para}
                  </p>
                ))}
              </section>
            </ScrollReveal>
          ))}
          <footer
            style={{
              marginTop: '4rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--color-border-default)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Last updated: {updated} · Questions? Visit{' '}
              <a href="/contact" style={{ color: 'var(--color-accent-gold)', textDecoration: 'none' }}>
                Contact
              </a>
            </p>
          </footer>
        </div>
      </div>

      <Footer />
    </main>
  )
}
