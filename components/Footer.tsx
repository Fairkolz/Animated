'use client'

import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  Shop: [
    { label: 'The Collection', href: '/collections' },
    { label: 'Ritual Sets', href: '/collections?category=Rituals' },
    { label: 'New Formulations', href: '/collections?sort=new' },
  ],
  Collections: [
    { label: 'Face', href: '/collections?category=Face' },
    { label: 'Eyes', href: '/collections?category=Eyes' },
    { label: 'Lips', href: '/collections?category=Lips' },
  ],
  About: [
    { label: 'Our Belief', href: '/about' },
    { label: 'Formulation Alchemy', href: '/philosophy' },
    { label: 'Stockists', href: '/stockists' },
  ],
  Connect: [
    { label: 'The Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer
      data-reveal
      style={{
        backgroundColor: 'var(--color-surface-dim)',
        color: 'var(--color-text-primary)',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div
          style={{
            gap: '4rem',
            marginBottom: '6rem',
          }}
          className="grid grid-cols-1 md:grid-cols-12"
        >
          {/* Logo Brand Block */}
          <div className="md:col-span-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Image
                  src="/logo.svg"
                  alt="Auvérer"
                  width={204}
                  height={38.875}
                  style={{
                    height: 'clamp(22px, 2.2vw, 28px)',
                    width: 'auto',
                    display: 'block',
                  }}
                />
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: '20rem', fontWeight: 300 }}>
                Elevated skincare for the discerning individual. Formulated with clinical precision and botanical wisdom.
              </p>
            </div>
          </div>

          {/* Nav Links Grid */}
          <div
            className="md:col-span-7 grid grid-cols-2 gap-10 sm:grid-cols-4"
          >
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--color-accent-gold)',
                  }}
                >
                  {title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'var(--color-text-secondary)',
                          textDecoration: 'none',
                          fontWeight: 300,
                          transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-default)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              opacity: 0.6,
              margin: 0,
            }}
          >
            &copy; 2024 AUVÉRER. ALL RIGHTS RESERVED.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '2rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <Link
              href="/privacy"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)' }}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
