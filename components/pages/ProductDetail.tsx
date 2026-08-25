'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import type { Product } from '../../lib/products'
import { formatPrice } from '../../lib/products'
import { productImage, galleryImage } from '../../lib/images'
import Accordion from '../shared/Accordion'
import ProductCard from '../shared/ProductCard'
import { useBag } from '../shared/BagProvider'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

const galleryViews = ['Bottle, front', 'Texture detail', 'In ritual', 'Packaging'] as const

export default function ProductDetail({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const prefersReduced = useReducedMotion()
  const [view, setView] = useState(0)
  const [bagState, setBagState] = useState<'idle' | 'added'>('idle')
  const { addItem } = useBag()

  useEffect(() => {
    if (bagState !== 'added') return
    const t = setTimeout(() => setBagState('idle'), 3200)
    return () => clearTimeout(t)
  }, [bagState])

  const viewSrcs = [
    productImage(product.slug),
    galleryImage('texture'),
    galleryImage('ritual'),
    galleryImage('packaging'),
  ]
  const viewAlts = [
    `${product.name} — ${galleryViews[0].toLowerCase()}, ${product.size}`,
    `${galleryViews[1]} — the texture of ${product.name}`,
    `${galleryViews[2]} — ${product.name} in use`,
    `${galleryViews[3]} — the ${product.name} packaging`,
  ]

  return (
    <article>
      {/* Gallery + purchase panel */}
      <section
        aria-label={`${product.name} details`}
        style={{
          backgroundColor: 'var(--color-surface-background)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Gallery */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <figure style={{ margin: 0 }}>
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }} aria-live="polite">
                <motion.div
                  key={view}
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={viewSrcs[view]}
                    alt={viewAlts[view]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
              </div>
              <figcaption
                style={{
                  marginTop: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                {galleryViews[view]} — {product.size}
              </figcaption>
            </figure>
            <div role="group" aria-label="Gallery views" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {galleryViews.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setView(i)}
                  aria-pressed={view === i}
                  aria-label={`Show view: ${label}`}
                  className="gallery-thumb"
                  style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    padding: 0,
                    cursor: 'pointer',
                    border: `1px solid ${view === i ? 'var(--color-accent-gold)' : 'var(--color-border-default)'}`,
                    backgroundColor: 'var(--color-surface-container-low)',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.5rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: view === i ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Purchase panel */}
          <motion.div
            className="lg:col-span-5 product-panel"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >

            <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-gold)',
                marginBottom: '1rem',
              }}
            >
              {product.category}
              {product.isNew ? ' · New' : ''}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                lineHeight: 1.5,
                color: 'var(--color-text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              {product.tagline}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.5rem',
                borderTop: '1px solid var(--color-border-default)',
                borderBottom: '1px solid var(--color-border-default)',
                padding: '1.5rem 0',
                marginBottom: '2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-primary)',
                }}
              >
                {formatPrice(product.price)}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-muted)',
                }}
              >
                {product.size} · Free shipping over $150
              </span>
            </div>

            <motion.button
              type="button"
              onClick={() => {
                addItem(product)
                setBagState('added')
              }}
              aria-live="polite"
              className="add-to-bag btn-sheen"
              animate={bagState === 'added' && !prefersReduced ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                width: '100%',
                backgroundColor: bagState === 'added' ? 'transparent' : 'var(--color-accent-gold)',
                color: bagState === 'added' ? 'var(--color-accent-gold)' : 'var(--color-brand-primary)',
                border: '1px solid var(--color-accent-gold)',
                padding: '1.25rem 2rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                cursor: 'pointer',
                transition: 'background-color 0.4s ease, color 0.4s ease',
              }}
            >
              {bagState === 'added' ? 'Added to Bag ✓' : `Add to Bag — ${formatPrice(product.price)}`}
            </motion.button>
            <p
              style={{
                marginTop: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}
            >
              {bagState === 'added'
                ? 'Added to your bag — it awaits in the top right.'
                : 'Complimentary samples with every order'}
            </p>

            {/* Description */}
            <div style={{ marginTop: '2.5rem' }}>
              {product.description.map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? 'drop-cap' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.9375rem',
                    lineHeight: 1.85,
                    color: 'var(--color-text-secondary)',
                    marginBottom: i === product.description.length - 1 ? 0 : '1.5rem',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ingredients / ritual accordion */}
      <section
        aria-label="Ingredients and ritual"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              marginBottom: '2.5rem',
            }}
          >
            Inside the Formulation
          </h2>
          <Accordion
            items={[
              {
                title: 'Key Ingredients',
                content: (
                  <dl style={{ display: 'grid', gap: '1.5rem' }}>
                    {product.keyIngredients.map((ing) => (
                      <div key={ing.name}>
                        <dt
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontStyle: 'italic',
                            fontSize: '1.125rem',
                            fontWeight: 400,
                            color: 'var(--color-accent-gold)',
                          }}
                        >
                          {ing.name}
                        </dt>
                        <dd
                          style={{
                            margin: 0,
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {ing.role}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
              {
                title: 'How to Use',
                content: (
                  <ol style={{ listStyle: 'none', display: 'grid', gap: '1.25rem', padding: 0, margin: 0 }}>
                    {product.howToUse.map((step, i) => (
                      <li key={step} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                        <span
                          aria-hidden="true"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontStyle: 'italic',
                            color: 'var(--color-accent-gold)',
                            flexShrink: 0,
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            fontSize: '0.9375rem',
                            lineHeight: 1.75,
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                title: 'Full Ingredient List',
                content: (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '0.8125rem',
                      lineHeight: 1.9,
                      letterSpacing: '0.02em',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {product.fullIngredients}
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* You May Also Like */}
      <section
        aria-labelledby="related-title"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h2
            id="related-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              color: 'var(--color-text-primary)',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            <em>You</em> May Also Like
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
