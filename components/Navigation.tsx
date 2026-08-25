'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Menu, X, Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useBag } from './shared/BagProvider'
import SearchOverlay from './shared/SearchOverlay'
import CartDrawer from './shared/CartDrawer'

const navLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount, openBag } = useBag()
  const prefersReduced = useReducedMotion()
  const navRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 80)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  // Focus close button when mobile menu opens
  useEffect(() => {
    if (mobileOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [mobileOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isScrolled ? '0.875rem 0' : '1.25rem 0',
          background: isScrolled
            ? 'rgba(10, 10, 10, 0.6)'
            : 'rgba(10, 10, 10, 0.35)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled
            ? '1px solid rgba(246, 243, 237, 0.12)'
            : '1px solid rgba(246, 243, 237, 0.08)',
          transition: 'padding 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), background 0.5s cubic-bezier(0.22, 0.61, 0.36, 1), border-color 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
      >
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 3vw, 3rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Brand */}
          <Link
            href="/"
            aria-label="AUVERER — Home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'var(--color-text-inverse)',
            }}
          >
            <Image
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              width={204}
              height={38.875}
              priority
              style={{
                height: 'clamp(16px, 1.6vw, 20px)',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>

          {/* Desktop links */}
          <div
            className="nav-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.675rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  color: 'var(--color-text-inverse)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div
            className="nav-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <button
              type="button"
              aria-label="Search"
              aria-haspopup="dialog"
              onClick={() => setSearchOpen(true)}
              className="nav-icon-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'var(--color-text-inverse)',
                transition: 'color 0.3s ease',
              }}
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label={`Shopping bag${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? '' : 's'}` : ', empty'}`}
              aria-haspopup="dialog"
              onClick={openBag}
              className="nav-icon-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'var(--color-text-inverse)',
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {itemCount > 0 && prefersReduced && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    minWidth: '14px',
                    height: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-accent-gold)',
                    color: 'var(--color-brand-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                  }}
                >
                  {itemCount}
                </span>
              )}
              {itemCount > 0 && !prefersReduced && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 520, damping: 24 }}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    minWidth: '14px',
                    height: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-accent-gold)',
                    color: 'var(--color-brand-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                  }}
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={closeButtonRef}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--color-text-inverse)',
              transition: 'color 0.3s ease',
            }}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 49,
              background: 'rgba(10, 10, 10, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                    letterSpacing: '0.12em',
                    fontWeight: 300,
                    color: 'var(--color-text-inverse)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-inverse)' }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '1.5rem',
            }}>
              <button
                type="button"
                aria-label="Search"
                aria-haspopup="dialog"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchOpen(true)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  color: 'var(--color-text-inverse)',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-inverse)' }}
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label={`Shopping bag${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? '' : 's'}` : ', empty'}`}
                aria-haspopup="dialog"
                onClick={() => {
                  setMobileOpen(false)
                  openBag()
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  color: 'var(--color-text-inverse)',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-inverse)' }}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      minWidth: '14px',
                      height: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 3px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'var(--color-accent-gold)',
                      color: 'var(--color-brand-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.5625rem',
                      fontWeight: 700,
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  )
}
