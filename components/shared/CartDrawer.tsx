'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useBag } from './BagProvider'
import { formatPrice } from '../../lib/products'
import { productImage } from '../../lib/images'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

export default function CartDrawer() {
  const { items, itemCount, subtotal, removeItem, setQty, isDrawerOpen, closeBag } = useBag()
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isDrawerOpen) return
    lastFocusedRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBag()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      lastFocusedRef.current?.focus()
    }
  }, [isDrawerOpen, closeBag])

  return (
    <>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isDrawerOpen && (
        <>
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeBag}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 70,
              background: 'rgba(6, 6, 6, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={prefersReduced ? { x: 0, opacity: 1 } : { x: '100%' }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReduced ? { x: 0, opacity: 1 } : { x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(28rem, 100vw)',
              zIndex: 71,
              backgroundColor: 'var(--color-surface-elevated)',
              borderLeft: '1px solid var(--color-border-default)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 2rem 1.5rem',
                borderBottom: '1px solid var(--color-border-default)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: '1.75rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                Your Bag {itemCount > 0 && <span style={{ color: 'var(--color-accent-gold)' }}>({itemCount})</span>}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeBag}
                aria-label="Close bag"
                style={{
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            {/* Contents */}
            {items.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 48 48" fill="var(--color-border-strong)" aria-hidden="true">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" />
                </svg>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '1.25rem',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  Your bag is empty.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    maxWidth: '18rem',
                  }}
                >
                  Every ritual begins with a single formulation. Choose yours.
                </p>
                <Link
                  href="/collections"
                  onClick={closeBag}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-accent-gold)',
                    padding: '1rem 2rem',
                    textDecoration: 'none',
                    marginTop: '0.5rem',
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
                  Explore the Collection
                </Link>
              </div>
            ) : (
              <>
                <ul
                  role="list"
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: '0 2rem',
                    flex: 1,
                    overflowY: 'auto',
                  }}
                >
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                    <motion.li
                      key={item.slug}
                      layout
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        padding: '1.5rem 0',
                        borderBottom: '1px solid var(--color-border-default)',
                      }}
                    >
                      <div style={{ width: '4.5rem', height: '6rem', flexShrink: 0, position: 'relative' }}>
                        <Image
                          src={productImage(item.slug)}
                          alt=""
                          fill
                          sizes="72px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                          <div>
                            <p
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 400,
                                fontSize: '1.125rem',
                                color: 'var(--color-text-primary)',
                                margin: 0,
                                lineHeight: 1.3,
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.6875rem',
                                letterSpacing: '0.1em',
                                color: 'var(--color-text-muted)',
                                margin: '0.25rem 0 0',
                              }}
                            >
                              {item.size}
                            </p>
                          </div>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.875rem',
                              color: 'var(--color-text-primary)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formatPrice(item.price * item.qty)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 'auto',
                          }}
                        >
                          <div
                            role="group"
                            aria-label={`Quantity for ${item.name}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                          >
                            <button
                              type="button"
                              onClick={() => setQty(item.slug, item.qty - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              style={{
                                width: '2.75rem',
                                height: '2.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: '1px solid var(--color-border-strong)',
                                color: 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                transition: 'border-color 0.3s ease, color 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
                                e.currentTarget.style.color = 'var(--color-accent-gold)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                                e.currentTarget.style.color = 'var(--color-text-secondary)'
                              }}
                            >
                              −
                            </button>
                            <motion.span
                              key={item.qty}
                              aria-live="polite"
                              initial={prefersReduced ? false : { scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.875rem',
                                color: 'var(--color-text-primary)',
                                minWidth: '1rem',
                                textAlign: 'center',
                              }}
                            >
                              {item.qty}
                            </motion.span>
                            <button
                              type="button"
                              onClick={() => setQty(item.slug, item.qty + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              style={{
                                width: '2.75rem',
                                height: '2.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: '1px solid var(--color-border-strong)',
                                color: 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                transition: 'border-color 0.3s ease, color 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
                                e.currentTarget.style.color = 'var(--color-accent-gold)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                                e.currentTarget.style.color = 'var(--color-text-secondary)'
                              }}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0.375rem 0',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.625rem',
                              fontWeight: 600,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: 'var(--color-text-muted)',
                              borderBottom: '1px solid transparent',
                              transition: 'color 0.3s ease, border-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--color-status-error)'
                              e.currentTarget.style.borderBottomColor = 'var(--color-status-error)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--color-text-muted)'
                              e.currentTarget.style.borderBottomColor = 'transparent'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div
                  style={{
                    padding: '2rem',
                    borderTop: '1px solid var(--color-border-default)',
                    backgroundColor: 'var(--color-surface-dim)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.125rem',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p
                    aria-live="polite"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.1em',
                      color: subtotal >= 150 ? 'var(--color-accent-gold)' : 'var(--color-text-muted)',
                      margin: '0 0 1.25rem',
                      textAlign: 'center',
                    }}
                  >
                    {subtotal >= 150
                      ? 'Complimentary shipping unlocked.'
                      : `${formatPrice(150 - subtotal)} away from complimentary shipping.`}
                  </p>
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="Checkout coming soon"
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-muted)',
                      border: '1px solid var(--color-border-strong)',
                      borderRadius: 0,
                      padding: '1.25rem 2rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.25em',
                      cursor: 'not-allowed',
                    }}
                  >
                    Checkout — Coming Soon
                  </button>
                  <p
                    style={{
                      marginTop: '1rem',
                      textAlign: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.1em',
                      color: 'var(--color-text-muted)',
                      margin: '1rem 0 0',
                    }}
                  >
                    Complimentary samples included with every order.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
          )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
