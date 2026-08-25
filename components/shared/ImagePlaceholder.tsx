type ImagePlaceholderProps = {
  label?: string
  caption?: string
  aspectRatio?: string
  fill?: boolean
}

/* Solid-color placeholder for photography that is not yet available.
   Deliberately contains NO rendered text baked into an image asset —
   the label is live DOM text on a flat token-colored block.
   Static by design: layout scaffolding, not a content reveal. */
export default function ImagePlaceholder({
  label = 'Image pending',
  caption,
  aspectRatio = '4/5',
  fill = false,
}: ImagePlaceholderProps) {
  return (
    <figure
      aria-hidden="true"
      style={{
        position: fill ? 'absolute' : 'relative',
        inset: fill ? 0 : undefined,
        width: '100%',
        height: fill ? '100%' : undefined,
        aspectRatio: fill ? undefined : aspectRatio,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1.5rem',
        backgroundColor: 'var(--color-surface-container-low)',
        border: '1px solid var(--color-border-default)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 48 48" fill="var(--color-border-strong)" aria-hidden="true">
        <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
      </svg>
      <figcaption
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.5625rem',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
        }}
      >
        {label}
      </figcaption>
      {caption ? (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5625rem',
            letterSpacing: '0.15em',
            color: 'var(--color-text-muted)',
            opacity: 0.7,
            textAlign: 'center',
            maxWidth: '24rem',
          }}
        >
          {caption}
        </span>
      ) : null}
    </figure>
  )
}
