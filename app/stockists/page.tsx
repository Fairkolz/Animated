import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/shared/Breadcrumb'
import PageHeader from '../../components/shared/PageHeader'
import ClosingCta from '../../components/shared/ClosingCta'
import StockistDirectory from '../../components/pages/StockistDirectory'

export const metadata: Metadata = {
  title: 'Stockists — Auvérer',
  description:
    'A small, considered network of boutiques in Europe, North America and Asia-Pacific that keep Auvérer on their shelves.',
}

export default function StockistsPage() {
  return (
    <main>
      <Navigation />
      <PageHeader
        eyebrow="Stockists"
        title="Where to Find Us"
        lede="We would rather be sold well than sold widely. Each boutique below was chosen because its people understand what ritual means — visit if you can."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Stockists' }]}
      />

      <StockistDirectory />

      <ClosingCta
        title="Prefer to begin at home?"
        primaryLabel="Shop the Collection"
        primaryHref="/collections"
        secondaryLabel="Contact Customer Care"
        secondaryHref="/contact"
      />
      <Footer />
    </main>
  )
}
