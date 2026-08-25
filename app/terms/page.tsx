import type { Metadata } from 'next'
import LegalPage from '../../components/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — Auvérer',
  description: 'The terms on which Auvérer sells its formulations and operates this website.',
}

export default function TermsPage() {
  return (
    <LegalPage
      crumbLabel="Terms"
      title="Terms of Service"
      lede="The plain-language terms that govern your use of this site and any purchase you make through it. We have tried to write them the way we would want to read them."
      updated="August 2026"
      sections={[
        {
          heading: 'Using This Site',
          paragraphs: [
            'You may browse, purchase and share from this site freely for personal, non-commercial purposes. You may not misuse it — no attempts to breach security, scrape at scale, or misrepresent your identity.',
          ],
        },
        {
          heading: 'Products and Descriptions',
          paragraphs: [
            'We describe our formulations as accurately as language allows. Cosmetic products affect different skin differently; nothing on this site constitutes medical advice, and you should patch-test before first use. If a product causes irritation, stop using it and consult a professional.',
          ],
        },
        {
          heading: 'Orders, Pricing and Payment',
          paragraphs: [
            'Prices are shown in the currency selected at checkout and include VAT where applicable. An order is accepted when we confirm dispatch. If we discover a pricing error after you order, we will contact you before charging anything.',
          ],
        },
        {
          heading: 'Returns',
          paragraphs: [
            'Unopened products may be returned within thirty days of delivery for a full refund. If an item arrives damaged, tell us within fourteen days and we will replace it or refund it — your choice — without requiring you to return the damaged goods.',
          ],
        },
        {
          heading: 'Intellectual Property',
          paragraphs: [
            'The Auvérer name, wordmark, formulations and editorial content belong to Auvérer. You may quote us with attribution; you may not pass our words or images off as your own.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'To the extent permitted by law, our liability arising from any order is limited to the amount you paid for it. Nothing in these terms excludes liability that cannot lawfully be excluded.',
          ],
        },
      ]}
    />
  )
}
