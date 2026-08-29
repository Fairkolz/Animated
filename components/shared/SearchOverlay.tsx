'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { products } from '../../lib/products'
import { articles } from '../../lib/articles'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

type SearchResult = {
  title: string
  meta: string
  href: string
}

const INDEX: SearchResult[] = [
  ...products.map((p) => ({
    title: p.name,
    meta: 'Product — The Collection',
    href: `/collections/${p.slug}`,
  })),
  ...articles.map((a) => ({
    title: a.title,
    meta: 'Essay — The Journal',
    href: `/journal/${a.slug}`,
  })),
]

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const prefersReduced = useReducedMotion()
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    lastFocusedRef.current = document.activeElement as HTMLElement | null
    setQuery('')
    const raf = requestAnimationFrame(() => inputRef.current?.focus())

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      lastFocusedRef.current?.focus()
    }
  }, [isOpen, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return INDEX.filter(
      (entry) => entry.title.toLowerCase().includes(q) || entry.meta.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])

  /* Deduplicate by href (the explicit Auric entry overrides the slugified one). */
  const uniqueResults = useMemo(() => {
    const seen = new Set<string>()
    return results.filter((r) => !seen.has(r.href) && seen.add(r.href))
  }, [results])

  return (
    <>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(6, 6, 6, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'clamp(5rem, 12vh, 8rem) clamp(1.5rem, 4vw, 4rem) 2rem',
            overflowY: 'auto',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            style={{
              position: 'absolute',
              top: '2rem',
              right: 'clamp(1.5rem, 4vw, 4rem)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.625rem',
              color: 'var(--color-text-secondary)',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-accent-gold)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
            </svg>
          </button>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            style={{ width: 'min(40rem, 100%)' }}
          >
            <label
              htmlFor="site-search"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'var(--color-accent-gold)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Search Auvérer
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Formulations, essays, rituals…"
              autoComplete="off"
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--color-border-strong)',
                borderRadius: 0,
                padding: '1.25rem 0',
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                color: 'var(--color-text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = 'var(--color-accent-gold)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'var(--color-border-strong)'
              }}
            />

            <div aria-live="polite" style={{ marginTop: '2.5rem' }}>
              {query.trim() === '' ? (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                  }}
                >
                  Type to search all formulations and journal essays.
                </p>
              ) : uniqueResults.length === 0 ? (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  Nothing found for &ldquo;{query.trim()}&rdquo;. Try &ldquo;camellia&rdquo;,
                  &ldquo;ritual&rdquo; or &ldquo;barrier&rdquo;.
                </p>
              ) : (
                <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {uniqueResults.map((result) => (
                    <li key={result.href} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                      <Link
                        href={result.href}
                        onClick={onClose}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          gap: '1.5rem',
                          padding: '1.25rem 0',
                          textDecoration: 'none',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: '1.25rem',
                            color: 'var(--color-text-primary)',
                            transition: 'color 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-accent-gold)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-primary)'
                          }}
                        >
                          {result.title}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-muted)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {result.meta}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
          )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
