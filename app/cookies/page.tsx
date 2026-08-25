import type { Metadata } from 'next'
import LegalPage from '../../components/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Notice — Auvérer',
  description: 'Which cookies this site uses, why, and how to decline the optional ones.',
}

export default function CookiesPage() {
  return (
    <LegalPage
      crumbLabel="Cookies"
      title="Cookie Notice"
      lede="Cookies are small files a site stores on your device. Ours are few, and each has a job. This notice lists them honestly and explains your choices."
      updated="August 2026"
      sections={[
        {
          heading: 'Essential Cookies',
          paragraphs: [
            'These keep the site working: remembering what is in your bag as you move between pages and keeping forms secure while you use them. They cannot be switched off without breaking the site.',
          ],
        },
        {
          heading: 'Preference Cookies',
          paragraphs: [
            'These remember small conveniences — whether you have dismissed a notice, for instance. They store no personal information beyond a random identifier.',
          ],
        },
        {
          heading: 'Analytics Cookies',
          paragraphs: [
            'We measure aggregate page views and referral sources so we know which essays and formulations deserve further work. The analytics configuration we use does not build advertising profiles and does not cross-reference with other sites.',
          ],
        },
        {
          heading: 'Managing Cookies',
          paragraphs: [
            'Your browser settings allow you to block or delete cookies at any time; the site will continue to work, though the bag may forget its contents between visits. Where required by law, a consent banner lets you accept or decline optional cookies before any of them load.',
          ],
        },
        {
          heading: 'Questions',
          paragraphs: [
            'If anything here is unclear, write to care@auverer.example. We would rather answer a question than hide behind a clause.',
          ],
        },
      ]}
    />
  )
}
