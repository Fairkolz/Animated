'use client'

import { useMemo, useState } from 'react'
import { articles, articleCategories, type ArticleCategory } from '../../lib/articles'
import JournalCard from '../shared/JournalCard'
import FilterPillBar from '../shared/FilterPillBar'

export default function JournalIndex({
  initialCategory,
}: {
  initialCategory: 'All' | ArticleCategory
}) {
  const [category, setCategory] = useState<'All' | ArticleCategory>(initialCategory)

  const filtered = useMemo(
    () => (category === 'All' ? articles : articles.filter((a) => a.category === category)),
    [category]
  )

  /* Grid entrance is a pure CSS stagger (.rise-in) — it plays from first
     paint and cannot blink on hydration. key={category} remounts the grid
     on filter change so the stagger replays as filter feedback. */
  return (
    <section
      aria-label="Journal entries"
      style={{
        backgroundColor: 'var(--color-surface-background)',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--color-border-default)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <FilterPillBar
          options={articleCategories}
          value={category}
          onChange={setCategory}
          ariaLabel="Filter essays by category"
        />

        <p
          aria-live="polite"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            margin: 'clamp(2rem, 4vw, 3rem) 0',
          }}
        >
          {filtered.length} {filtered.length === 1 ? 'essay' : 'essays'}
          {category !== 'All' ? ` — ${category}` : ''}
        </p>

        <div
          key={category}
          className="rise-in grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((article) => (
            <JournalCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
