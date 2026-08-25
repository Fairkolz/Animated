import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import Breadcrumb from '../../../components/shared/Breadcrumb'
import JournalCard from '../../../components/shared/JournalCard'
import ParallaxImage from '../../../components/shared/ParallaxImage'
import ScrollReveal from '../../../components/ScrollReveal'
import ClosingCta from '../../../components/shared/ClosingCta'
import { articles, getArticle } from '../../../lib/articles'
import { articleImage } from '../../../lib/images'

export function generateStaticParams() {
  return articles.map((a) => ({ article: a.slug }))
}

export function generateMetadata({ params }: { params: { article: string } }): Metadata {
  const article = getArticle(params.article)
  if (!article) return { title: 'Not Found — Auvérer' }
  return { title: `${article.title} — The Journal — Auvérer`, description: article.excerpt }
}

function RelatedReading({ currentSlug }: { currentSlug: string }) {
  const related = articles.filter((a) => a.slug !== currentSlug).slice(0, 3)
  return (
    <section
      aria-labelledby="related-reading-title"
      style={{
        backgroundColor: 'var(--color-surface-container)',
        borderTop: '1px solid var(--color-border-default)',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <h2
          id="related-reading-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            color: 'var(--color-text-primary)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <em>Related</em> Reading
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((article) => (
            <JournalCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ArticlePage({ params }: { params: { article: string } }) {
  const article = getArticle(params.article)
  if (!article) notFound()

  return (
    <main>
      <Navigation />

      {/* Article header */}
      <header
        style={{
          backgroundColor: 'var(--color-surface-dim)',
          padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 4vw, 4rem) clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Journal', href: '/journal' },
              { label: article.title },
            ]}
          />
          <p
            style={{
              marginTop: '2.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-accent-gold)',
            }}
          >
            {article.category}
          </p>
          <h1
            style={{
              marginTop: '1.25rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
            }}
          >
            {article.title}
          </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.625rem',
                color: 'var(--color-text-primary)',
              }}
            >
              {article.author}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.1em',
              }}
            >
              {article.role}
            </span>
            <span aria-hidden="true" style={{ color: 'var(--color-border-strong)' }}>
              ·
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.1em',
              }}
            >
              {article.date}
            </span>
            <span aria-hidden="true" style={{ color: 'var(--color-border-strong)' }}>
              ·
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.1em',
              }}
            >
              {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <figure
        style={{
          margin: 0,
          backgroundColor: 'var(--color-surface-background)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ aspectRatio: '21/9' }}>
            <ParallaxImage
              src={articleImage(article.slug)}
              alt={`Editorial photography for ${article.title}`}
              sizes="(max-width: 1280px) 100vw, 80rem"
              priority
              amplitude={32}
            />
          </div>
        </div>
      </figure>

      {/* Article body */}
      <article
        style={{
          backgroundColor: 'var(--color-surface-background)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          {article.body.map((block, i) =>
            block.type === 'quote' ? (
              <ScrollReveal key={i}>
                <blockquote
                  style={{
                    margin: '3rem auto',
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)',
                    lineHeight: 1.5,
                    color: 'var(--color-text-primary)',
                    borderTop: '1px solid var(--color-border-default)',
                    borderBottom: '1px solid var(--color-border-default)',
                    padding: '2.5rem 1rem',
                  }}
                >
                  &ldquo;{block.text}&rdquo;
                </blockquote>
              </ScrollReveal>
            ) : (
              <ScrollReveal key={i}>
                <p
                  className={i === 0 ? 'drop-cap' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: 'clamp(1rem, 1.35vw, 1.0625rem)',
                    lineHeight: 1.9,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {block.text}
                </p>
              </ScrollReveal>
            )
          )}

          <footer
            style={{
              marginTop: '4rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--color-border-default)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Filed under {article.category}
            </span>
            <Link
              href="/journal"
              className="group inline-flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--color-text-primary)',
                borderBottom: '1px solid var(--color-accent-gold)',
                paddingBottom: '0.5rem',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
            >
              All Essays
            </Link>
          </footer>
        </div>
      </article>

      <RelatedReading currentSlug={article.slug} />

      <ClosingCta
        title="Formulated in the same spirit."
        primaryLabel="Explore the Collection"
        primaryHref="/collections"
      />
      <Footer />
    </main>
  )
}
