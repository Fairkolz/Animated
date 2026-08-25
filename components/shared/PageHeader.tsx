import Breadcrumb, { type Crumb } from './Breadcrumb'

type PageHeaderProps = {
  eyebrow: string
  title: string
  em?: string
  lede: string
  crumbs?: Crumb[]
}

/* Shared page intro — eyebrow, display headline and one-line lede,
   matching the landing page's section-header treatment.
   Reveals run through the CSS data-reveal engine (SSR-safe: elements are
   visible on first paint and animate only when the observer runs). The
   headline uses the masked variant — it rises out of an overflow mask. */
export default function PageHeader({ eyebrow, title, em, lede, crumbs }: PageHeaderProps) {
  return (
    <header
      style={{
        padding: 'clamp(8rem, 14vw, 12rem) clamp(1.5rem, 4vw, 4rem) clamp(4rem, 7vw, 6rem)',
        backgroundColor: 'var(--color-surface-dim)',
        position: 'relative',
      }}
    >
      {crumbs && (
        <div
          style={{
            position: 'absolute',
            top: '5rem',
            left: 'clamp(1.5rem, 4vw, 4rem)',
            right: 'clamp(1.5rem, 4vw, 4rem)',
            maxWidth: '80rem',
            margin: '0 auto',
          }}
        >
          <Breadcrumb items={crumbs} />
        </div>
      )}
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <p
          data-reveal
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
          {eyebrow}
        </p>
        <h1
          data-reveal="mask"
          data-reveal-delay="120"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
          }}
        >
          <span>
            {em ? <em>{em} </em> : null}
            {title}
          </span>
        </h1>
        <p
          data-reveal
          data-reveal-delay="240"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
            marginTop: '2rem',
            maxWidth: '40rem',
          }}
        >
          {lede}
        </p>
      </div>
    </header>
  )
}
