import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/shared/Breadcrumb'
import PageHeader from '../../components/shared/PageHeader'
import ClosingCta from '../../components/shared/ClosingCta'
import CollectionsBrowser from '../../components/pages/CollectionsBrowser'
import { categories, type ProductCategory } from '../../lib/products'

export const metadata: Metadata = {
  title: 'The Collection — Auvérer',
  description:
    'Every Auvérer formulation in one place: cleansers, elixirs, creams, eye and lip care, composed as rituals rather than routines.',
}

type SortOption = 'Featured' | 'Price: Low to High' | 'Price: High to Low' | 'New'

const validSorts: SortOption[] = ['Featured', 'Price: Low to High', 'Price: High to Low', 'New']

export default function CollectionsPage({
  searchParams,
}: {
  searchParams?: { category?: string; sort?: string }
}) {
  const rawCategory = searchParams?.category
  const category =
    rawCategory && (categories as readonly string[]).includes(rawCategory)
      ? (rawCategory as 'All' | ProductCategory)
      : 'All'
  const rawSort = searchParams?.sort
  const sort: SortOption =
    rawSort === 'new' ? 'New' : validSorts.includes(rawSort as SortOption) ? (rawSort as SortOption) : 'Featured'

  return (
    <main>
      <Navigation />
      <PageHeader
        eyebrow="The Collection"
        title="Everything We Make"
        lede="Twelve formulations, no more than the shelf requires. Each one earns its place by surviving years of revision — and each is designed to work as part of a ritual, not instead of one."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Collections' }]}
      />

      <CollectionsBrowser initialCategory={category} initialSort={sort} />

      <ClosingCta
        title="Unsure where to begin?"
        body="Begin with the ritual you already keep, and let the collection meet you there."
        primaryLabel="Discover the Rituals"
        primaryHref="/collections?category=Rituals"
        secondaryLabel="Read the Philosophy"
        secondaryHref="/philosophy"
      />
      <Footer />
    </main>
  )
}
