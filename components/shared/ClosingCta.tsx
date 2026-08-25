'use client'

import Link from 'next/link'

type ClosingCtaProps = {
  title: string
  body?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

/* Shared closing CTA band — the same gold-bordered button treatment as the
   landing page's "Shop Collection" gesture.
   Static by design — no entrance animation (it replayed as a blink
   on every hydration). */
export default function ClosingCta({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ClosingCtaProps) {
  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    padding: '1rem 2.5rem',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
  }

  return (
    <section
      aria-label="Call to action"
      style={{
        backgroundColor: 'var(--color-surface-dim)',
        borderTop: '1px solid var(--color-border-default)',
        padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 4vw, 4rem)',
        textAlign: 'center',
      }}
    >
      <div
        data-reveal
        style={{ maxWidth: '44rem', margin: '0 auto' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(1.875rem, 4vw, 3rem)',
            lineHeight: 1.25,
            color: 'var(--color-text-primary)',
            marginBottom: body ? '1.5rem' : '3rem',
          }}
        >
          {title}
        </h2>
        {body && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: '3rem',
            }}
          >
            {body}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <Link
            href={primaryHref}
            className="btn-sheen"
            {...(primaryHref.startsWith('http')
              ? {}
              : {
                  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-gold)'
                    e.currentTarget.style.color = 'var(--color-brand-primary)'
                  },
                  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                  },
                })}
            style={{
              ...linkStyle,
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-accent-gold)',
            }}
          >
            {primaryLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 12h16" strokeLinecap="square" />
              <path d="M13 5l7 7-7 7" strokeLinecap="square" />
            </svg>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent-gold)'
                e.currentTarget.style.borderBottomColor = 'var(--color-accent-gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)'
                e.currentTarget.style.borderBottomColor = 'var(--color-border-strong)'
              }}
              style={{
                ...linkStyle,
                color: 'var(--color-text-secondary)',
                border: 'none',
                borderBottom: '1px solid var(--color-border-strong)',
                fontWeight: 600,
                fontSize: '0.6875rem',
              }}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
