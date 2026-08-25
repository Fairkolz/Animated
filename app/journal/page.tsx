import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/shared/Breadcrumb'
import PageHeader from '../../components/shared/PageHeader'
import ClosingCta from '../../components/shared/ClosingCta'
import JournalIndex from '../../components/pages/JournalIndex'
import { articleCategories, type ArticleCategory } from '../../lib/articles'

export const metadata: Metadata = {
  title: 'The Journal — Auvérer',
  description:
    'Essays on living well: ritual, ingredients, skin science and the quiet discipline of doing less, better.',
}

export default function JournalPage({
  searchParams,
}: {
  searchParams?: { category?: string }
}) {
  const raw = searchParams?.category
  const initialCategory: 'All' | ArticleCategory =
    raw && (articleCategories as readonly string[]).includes(raw) ? (raw as ArticleCategory) : 'All'

  return (
    <main>
      <Navigation />
      <PageHeader
        eyebrow="The Journal"
        title="Essays on Living Well"
        lede="Notes from the laboratory and the dressing table: on ritual, ingredients, skin science, and the quiet discipline of doing less, better."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />

      <JournalIndex initialCategory={initialCategory} />

      <ClosingCta
        title="Reading is research. So is touching your own skin."
        primaryLabel="Explore the Collection"
        primaryHref="/collections"
      />
      <Footer />
    </main>
  )
}
