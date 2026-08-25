'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '../../lib/articles'
import { articleImage } from '../../lib/images'

/* Journal card — editorial text card with a 16:9 image placement block.
   Static markup: its entrance is handled by the parent grid's CSS
   animation (plays from first paint — nothing can blink on hydration). */
export default function JournalCard({ article }: { article: Article }) {
  return (
    <article>
      <Link
        href={`/journal/${article.slug}`}
        aria-label={`${article.title} — ${article.readTime}`}
        className="group card-float"
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          height: '100%',
        }}
      >
        <div
          className="card-zoom"
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            overflow: 'hidden',
            marginBottom: '1.5rem',
          }}
        >
          <Image
            src={articleImage(article.slug)}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.625rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-accent-gold)',
          }}
        >
          {article.category}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.375rem, 2vw, 1.5rem)',
            fontWeight: 300,
            marginTop: '0.75rem',
            marginBottom: '1rem',
            color: 'var(--color-text-primary)',
            lineHeight: 1.25,
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            marginBottom: '1rem',
          }}
        >
          {article.excerpt}
        </p>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          {article.readTime} · {article.date}
        </span>
      </Link>
    </article>
  )
}
