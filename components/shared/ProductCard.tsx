'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import type { Product } from '../../lib/products'
import { formatPrice } from '../../lib/products'
import { productImage } from '../../lib/images'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12h16" strokeLinecap="square" />
      <path d="M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  )
}

/* Product card in the homepage-Bestsellers idiom: full-bleed image block,
   charcoal gradient, serif title + price, boxed gold arrow. */
export default function ProductCard({ product }: { product: Product }) {
  const prefersReduced = useReducedMotion()

  return (
    <article>
      <Link
        href={`/collections/${product.slug}`}
        aria-label={`${product.name} — ${formatPrice(product.price)}`}
        style={{
          position: 'relative',
          display: 'block',
          overflow: 'hidden',
          textDecoration: 'none',
        }}
      >
        <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: 'var(--color-surface-surface)' }}>
          <motion.div
            style={{ width: '100%', height: '100%' }}
            whileHover={prefersReduced ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Image
              src={productImage(product.slug)}
              alt={`${product.name} — ${product.tagline}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--color-brand-primary) 82%, transparent) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />
        {product.isNew && (
          <span
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.5625rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-gold)',
            }}
          >
            New
          </span>
        )}
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
                fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: 'var(--color-text-inverse)',
                marginBottom: '0.25rem',
              }}
            >
              {product.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                letterSpacing: '0.05em',
                color: 'var(--color-text-secondary)',
              }}
            >
              {formatPrice(product.price)}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="card-arrow"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-border-strong)',
              color: 'var(--color-text-inverse)',
            }}
          >
            <ArrowIcon />
          </span>
        </div>
        </motion.div>
      </Link>
      <motion.p
        initial={prefersReduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          lineHeight: 1.7,
          fontWeight: 300,
          color: 'var(--color-text-secondary)',
          padding: '1rem 0.25rem 0',
        }}
      >
        {product.tagline}
      </motion.p>
    </article>
  )
}
