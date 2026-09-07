import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import AdminPanel from '../../components/admin/AdminPanel'

export const metadata: Metadata = {
  title: 'Atelier Admin — Auvérer',
  description: 'Member and role management for the Auvérer atelier.',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <main>
      <Navigation />
      <AdminPanel />
    </main>
  )
}