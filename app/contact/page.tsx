import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/shared/Breadcrumb'
import PageHeader from '../../components/shared/PageHeader'
import ContactSection from '../../components/pages/ContactSection'

export const metadata: Metadata = {
  title: 'Contact — Auvérer',
  description:
    'Write to the Auvérer care team: orders, rituals, samples, professional accounts, or a simple question. Answered within one business day.',
}

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <PageHeader
        eyebrow="Contact"
        title="We Are Easy to Reach"
        lede="Questions about a formulation, an order, or where to begin — our care team answers personally, within one business day."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <ContactSection />
      <Footer />
    </main>
  )
}
