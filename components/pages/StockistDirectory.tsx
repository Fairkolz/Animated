'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { stockists, stockistRegions, type StockistRegion } from '../../lib/stockists'
import FilterPillBar from '../shared/FilterPillBar'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

export default function StockistDirectory() {
  const prefersReduced = useReducedMotion()
  const [region, setRegion] = useState<'All' | StockistRegion>('All')

  const filtered = useMemo(
    () => (region === 'All' ? stockists : stockists.filter((s) => s.region === region)),
    [region]
  )

  return (
    <section
      aria-label="Stockists directory"
      style={{
        backgroundColor: 'var(--color-surface-container-low)',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
          }}
        >
          <FilterPillBar options={stockistRegions} value={region} onChange={setRegion} ariaLabel="Filter stockists by region" />
          <p
            aria-live="polite"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'boutique' : 'boutiques'}
            {region !== 'All' ? ` — ${region}` : ''}
          </p>
        </div>

        <p
          style={{
            marginTop: '2rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: 'var(--color-text-muted)',
          }}
        >
          Illustrative placeholder entries — the confirmed boutique list is being finalized.
        </p>

        {/* Table-style directory */}
        <motion.ul
          key={region}
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          role="list"
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 'clamp(2.5rem, 5vw, 4rem) 0 0',
            borderTop: '1px solid var(--color-border-default)',
          }}
        >
          {filtered.map((s) => (
            <motion.li
              key={`${s.name}-${s.city}`}
              className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-12"
              style={{ borderBottom: '1px solid var(--color-border-default)', alignItems: 'baseline' }}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h3
                className="sm:col-span-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.3,
                }}
              >
                {s.name}
              </h3>
              <span
                className="sm:col-span-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-gold)',
                }}
              >
                {s.city}
              </span>
              <address
                className="sm:col-span-4"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'normal',
                  fontWeight: 300,
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {s.address}
              </address>
            </motion.li>
          ))}
        </motion.ul>

        <p
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
            maxWidth: '40rem',
          }}
        >
          Auvérer is stocked selectively and by invitation. If you keep a boutique and believe it belongs on
          this list, write to us through the contact page.
        </p>
      </div>
    </section>
  )
}
