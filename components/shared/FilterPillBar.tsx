'use client'

type FilterPillBarProps<T extends string> = {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
}

/* The one deliberate exception to the sharp-corner system: rounded
   filter/tag pills (AUVERER-FULL-SITE-BRIEF.md §1.3).
   Static by design — no entrance animation (it replayed as a blink
   on every hydration). */
export default function FilterPillBar<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: FilterPillBarProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      data-reveal
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}
    >
      {options.map((option) => {
        const isActive = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-pill)',
              padding: '0.625rem 1.5rem',
              cursor: 'pointer',
              backgroundColor: isActive ? 'var(--color-accent-gold)' : 'transparent',
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
              border: `1px solid ${isActive ? 'var(--color-accent-gold)' : 'var(--color-border-strong)'}`,
              transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }
            }}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
