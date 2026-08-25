import type { Metadata } from 'next'
import LegalPage from '../../components/shared/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — Auvérer',
  description: 'How Auvérer collects, uses and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      crumbLabel="Privacy Policy"
      title="Privacy Policy"
      lede="We ask for little and protect all of it. This policy describes what we collect when you use this site, why we collect it, and the control you keep over it."
      updated="August 2026"
      sections={[
        {
          heading: 'Information We Collect',
          paragraphs: [
            'When you place an order or write to our care team, we collect the information needed to serve you: your name, email address, shipping address, and the contents of your message. When you join the early-access list we collect only your email address.',
            'We do not collect more than the purpose requires, and we do not sell personal information to anyone, ever.',
          ],
        },
        {
          heading: 'How We Use It',
          paragraphs: [
            'Your information is used to fulfil orders, answer correspondence, and — only if you asked us to — tell you about new formulations. We keep order records for the period required by tax law and delete correspondence once it is no longer needed.',
          ],
        },
        {
          heading: 'Cookies and Analytics',
          paragraphs: [
            'This site uses a minimal set of cookies: those required for the bag and checkout to function, and privacy-respecting analytics that tell us which pages are read without telling us who read them. Details are set out in our Cookies notice.',
          ],
        },
        {
          heading: 'Your Rights',
          paragraphs: [
            'You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. Write to care@auverer.example and a person — not a form — will handle your request within thirty days.',
          ],
        },
        {
          heading: 'Data Security',
          paragraphs: [
            'Personal data is stored encrypted in transit and at rest, with access limited to team members who need it to do their work. If a breach ever affects your data, we will tell you promptly and plainly.',
          ],
        },
      ]}
    />
  )
}
