'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { products, categories, type ProductCategory } from '../../lib/products'
import ProductCard from '../shared/ProductCard'
import FilterPillBar from '../shared/FilterPillBar'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]
const PAGE_SIZE = 6

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'New'] as const
type SortOption = (typeof sortOptions)[number]

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="square" />
    </svg>
  )
}

export default function CollectionsBrowser({
  initialCategory,
  initialSort,
}: {
  initialCategory: 'All' | ProductCategory
  initialSort: SortOption
}) {
  const prefersReduced = useReducedMotion()
  const [category, setCategory] = useState<'All' | ProductCategory>(initialCategory)
  const [sort, setSort] = useState<SortOption>(initialSort)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let list =
      category === 'All' ? [...products] : products.filter((p) => p.category === category)
    switch (sort) {
      case 'Price: Low to High':
        list.sort((a, b) => a.price - b.price)
        break
      case 'Price: High to Low':
        list.sort((a, b) => b.price - a.price)
        break
      case 'New':
        list.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
        break
      default:
        break
    }
    return list
  }, [category, sort])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <section
      aria-label="All products"
      style={{
        backgroundColor: 'var(--color-surface-container-low)',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Filter / sort bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <FilterPillBar
            options={categories}
            value={category}
            onChange={(c) => {
              setCategory(c)
              setVisibleCount(PAGE_SIZE)
            }}
            ariaLabel="Filter products by category"
          />

          <label
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortOption)
                setVisibleCount(PAGE_SIZE)
              }}
              aria-label="Sort products"
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.625rem 2.75rem 0.625rem 1.5rem',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
              }}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option} style={{ backgroundColor: '#131211', color: '#EFE9DD' }}>
                  {option}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: '1.25rem',
                pointerEvents: 'none',
                color: 'var(--color-text-secondary)',
                display: 'flex',
              }}
            >
              <ChevronIcon />
            </span>
          </label>
        </div>

        {/* Result count */}
        <p
          aria-live="polite"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {filtered.length} {filtered.length === 1 ? 'formulation' : 'formulations'}
          {category !== 'All' ? ` — ${category}` : ''}
        </p>

        {/* Grid */}
        <div
          key={`${category}-${sort}`}
          className="rise-in grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(3rem, 6vw, 5rem)' }}
          >
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
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
                  cursor: 'pointer',
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
                Load More ({filtered.length - visibleCount} remaining)
              </button>
          </div>
        )}
      </div>
    </section>
  )
}
