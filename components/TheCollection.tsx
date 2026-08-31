'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { products as allProducts, formatPrice, type Product } from '../lib/products'
import { productImage } from '../lib/images'

const BESTSELLER_SLUGS = [
  'auric-collection',
  'luminous-overnight-mask',
  'barrier-cream',
  'cleansing-nectar',
  'eye-concentrate',
  'lip-oil',
]

const products = BESTSELLER_SLUGS.map(
  (slug) => allProducts.find((p) => p.slug === slug),
).filter((p): p is Product => Boolean(p))

const easeStandard: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h16" strokeLinecap="square" />
      <path d="M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  )
}

function ChevronIcon({ direction, size = 16 }: { direction: 'left' | 'right'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {direction === 'left' ? <path d="M15 5l-7 7 7 7" strokeLinecap="square" /> : <path d="M9 5l7 7-7 7" strokeLinecap="square" />}
    </svg>
  )
}

function CarouselControl({
  direction,
  onClick,
  label,
  size = 'md',
  disabled = false,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  label: string
  size?: 'sm' | 'md'
  disabled?: boolean
}) {
  const right = direction === 'right'
  const dim = size === 'sm' ? '2rem' : '2.5rem'
  const chevron = size === 'sm' ? 14 : 16
  return (
    <button
      onClick={() => !disabled && onClick()}
      aria-label={label}
      disabled={disabled}
      aria-disabled={disabled}
      style={{
        width: dim,
        height: dim,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        border: right ? '1px solid var(--color-accent-gold)' : '1px solid var(--color-border-strong)',
        backgroundColor: 'color-mix(in srgb, var(--color-brand-primary) 55%, transparent)',
        color: right ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (disabled) return
        e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
        e.currentTarget.style.color = 'var(--color-accent-gold)'
        e.currentTarget.style.backgroundColor = 'var(--color-accent-gold)'
      }}
      onMouseLeave={(e) => {
        if (disabled) return
        e.currentTarget.style.borderColor = right ? 'var(--color-accent-gold)' : 'var(--color-border-strong)'
        e.currentTarget.style.color = right ? 'var(--color-accent-gold)' : 'var(--color-text-secondary)'
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <ChevronIcon direction={direction} size={chevron} />
    </button>
  )
}

export default function TheCollection() {
  const [offset, setOffset] = useState(0)
  const prefersReduced = useReducedMotion()

  const n = products.length
  const maxOffset = Math.max(0, n - 3)
  const clamped = Math.min(Math.max(offset, 0), maxOffset)
  const canPrev = clamped > 0
  const canNext = clamped < maxOffset

  const featured = products[clamped]
  const medium = products[clamped + 1]
  const small = products[clamped + 2]

  const prev = () => setOffset((o) => Math.max(0, o - 1))
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1))

  return (
    <section
      aria-label="The Collection"
      style={{
        backgroundColor: 'var(--color-surface-container-low)',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header row */}
        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: 'clamp(3rem, 5vw, 4rem)',
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeStandard }}
        >
          <div>
            <span
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              The Collection
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.05,
                color: 'var(--color-text-primary)',
                fontWeight: 300,
              }}
            >
              Bestsellers
            </h2>
          </div>
          <div style={{ maxWidth: '28rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.6875rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              New Formulations
            </span>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  fontWeight: 300,
                  color: 'var(--color-text-secondary)',
                  flex: '1 1 16rem',
                  margin: 0,
                }}
              >
                From transformative serums to protective creams, each formulation is composed to restore clarity and radiance — the quiet artifacts of care.
              </p>
              {/* Mobile prev/next — sit right-aligned next to the descriptive
                  text rather than overlapping the product image; md:hidden keeps
                  the larger header controls for desktop. */}
              <div
                className="flex md:hidden"
                style={{ gap: '0.625rem', flexShrink: 0 }}
              >
                <CarouselControl
                  direction="left"
                  onClick={prev}
                  label="Previous products"
                  size="sm"
                  disabled={!canPrev}
                />
                <CarouselControl
                  direction="right"
                  onClick={next}
                  label="Next products"
                  size="sm"
                  disabled={!canNext}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Staggered product grid — remounts on page change for a quick crossfade */}
        <motion.div
          key={clamped}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeStandard }}
          className="grid grid-cols-1 gap-6 md:grid-cols-12"
          style={{ alignItems: 'stretch' }}
        >
          {/* Featured card */}
          <article className="md:col-span-5" style={{ position: 'relative' }}>
            <Link
              href={`/collections/${featured.slug}`}
              aria-label={`${featured.name} — ${formatPrice(featured.price)}`}
              style={{
                position: 'relative',
                display: 'block',
                overflow: 'hidden',
                aspectRatio: '4/5',
                backgroundColor: 'var(--color-surface-surface)',
                textDecoration: 'none',
              }}
            >
              <motion.div
                style={{ width: '100%', height: '100%' }}
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                transition={{ duration: 0.9, ease: easeStandard }}
              >
                <Image
                  src={productImage(featured.slug)}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, color-mix(in srgb, var(--color-brand-primary) 88%, transparent) 0%, color-mix(in srgb, var(--color-brand-primary) 30%, transparent) 45%, transparent 72%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', pointerEvents: 'none' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-gold)',
                  }}
                >
                  Bestsellers
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  gap: '1.5rem',
                  pointerEvents: 'none',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
                      fontWeight: 300,
                      lineHeight: 1.2,
                      color: 'var(--color-text-inverse)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {featured.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {formatPrice(featured.price)}
                  </span>
                </div>
                <span
                  style={{
                    width: '3rem',
                    height: '3rem',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-accent-gold)',
                    color: 'var(--color-accent-gold)',
                    backgroundColor: 'var(--color-surface-dim)',
                  }}
                >
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </article>

          {/* Right cluster */}
          <div className="md:col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Carousel controls — desktop: header row above the cards */}
            <div className="hidden md:flex" style={{ justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <CarouselControl
                  direction="left"
                  onClick={prev}
                  label="Previous products"
                  disabled={!canPrev}
                />
                <CarouselControl
                  direction="right"
                  onClick={next}
                  label="Next products"
                  disabled={!canNext}
                />
              </div>
            </div>

            {/* Two staggered cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-start" style={{ flexGrow: 1 }}>
              {[medium, small].map((p, i) => (
                <motion.article
                  key={p.slug}
                  className={i === 1 ? 'sm:self-end md:mt-12' : ''}
                  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: easeStandard }}
                >
                  <Link
                    href={`/collections/${p.slug}`}
                    aria-label={`${p.name} — ${formatPrice(p.price)}`}
                    style={{
                      position: 'relative',
                      display: 'block',
                      overflow: 'hidden',
                      aspectRatio: i === 0 ? '3/4' : '1/1',
                      backgroundColor: 'var(--color-surface-surface)',
                      textDecoration: 'none',
                    }}
                  >
                    <motion.div
                      style={{ width: '100%', height: '100%' }}
                      whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                      transition={{ duration: 0.9, ease: easeStandard }}
                    >
                      <Image
                        src={productImage(p.slug)}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </motion.div>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, color-mix(in srgb, var(--color-brand-primary) 82%, transparent) 0%, transparent 55%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        left: '1.5rem',
                        right: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        gap: '1rem',
                        pointerEvents: 'none',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.35rem',
                            fontWeight: 300,
                            lineHeight: 1.25,
                            color: 'var(--color-text-inverse)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {p.name}
                        </h3>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8125rem',
                            letterSpacing: '0.05em',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {formatPrice(p.price)}
                        </span>
                      </div>
                      <span
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--color-border-strong)',
                          color: 'var(--color-text-inverse)',
                          backgroundColor: 'transparent',
                        }}
                      >
                        <ArrowIcon size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            marginTop: 'clamp(4rem, 7vw, 6rem)',
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeStandard }}
        >
          <Link
            href="/collections"
            className="btn-sheen"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-text-primary)',
              backgroundColor: 'transparent',
              border: '1px solid var(--color-accent-gold)',
              padding: '1rem 2.5rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent-gold)'
              e.currentTarget.style.color = 'var(--color-brand-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-text-primary)'
            }}
          >
            Shop Collection
            <ArrowIcon size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
