'use client'

// Homepage journal teaser — cards route into the full /journal index
// (AUVERER-FULL-SITE-BRIEF.md §3 Section 9 narrative).

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '../lib/articles'
import { articleImage } from '../lib/images'

type FeaturedArticle = Pick<Article, 'slug' | 'title' | 'category' | 'excerpt'>

/* Homepage teaser cards only need slugs, titles and brief metadata — the full
   essay bodies live on their route pages. Hardcoding the three picks here (with
   a runtime guard against drift) keeps the 9 full essay bodies out of the home
   page bundle, which previously imported the entire articles module. */
const FEATURED: { slug: string; title: string; category: FeaturedArticle['category']; excerpt: string }[] = [
  {
    slug: 'in-praise-of-the-unhurried-morning',
    title: 'In Praise of the Unhurried Morning',
    category: 'Ritual',
    excerpt: 'A defence of the ninety seconds nobody can take from you, practiced before the world wakes.',
  },
  {
    slug: 'sourcing-the-extraordinary',
    title: 'Sourcing the Extraordinary',
    category: 'Ingredients',
    excerpt: 'White truffle, alpine water and the long conversations behind every raw material we accept.',
  },
  {
    slug: 'minimalism-as-a-skincare-philosophy',
    title: 'Minimalism as a Skincare Philosophy',
    category: 'Living',
    excerpt: 'Why your vanity, and your complexion, thrive on less but better.',
  },
]

const articles: FeaturedArticle[] = FEATURED

export default function JournalPreview() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="Journal"
      style={{ backgroundColor: 'var(--color-surface-background)', padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 3vw, 3rem)' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(3rem, 4vw, 4rem)',
            gap: '1.5rem',
          }}
        >
          <div>
            <motion.span
              style={{
                color: 'var(--color-accent-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'block',
              }}
              initial={prefersReduced ? false : { opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The Journal
            </motion.span>
            <motion.h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                marginTop: '1rem',
                color: 'var(--color-text-primary)',
                fontWeight: 300,
              }}
              initial={prefersReduced ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Essays on Living Well
            </motion.h2>
          </div>
          <Link
            href="/journal"
            style={{
              borderBottom: '1px solid var(--color-text-primary)',
              paddingBottom: '0.25rem',
              fontSize: '0.625rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
            }}
          >
            Read All Entries
          </Link>
        </div>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 3vw, 3rem)',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {articles.map((a) => (
            <motion.article
              key={a.title}
              variants={{
                hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
              }}
              whileHover={prefersReduced ? undefined : { y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/journal/${a.slug}`}
                aria-label={`${a.title} — read the essay`}
                style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <motion.div
                    whileHover={prefersReduced ? undefined : { scale: 1.1 }}
                    transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Image
                      src={articleImage(a.slug)}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </motion.div>
                </div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                  {a.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    marginTop: '0.75rem',
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 300,
                  }}
                >
                  {a.title}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  {a.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
