import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import Breadcrumb from '../../../components/shared/Breadcrumb'
import ProductDetail from '../../../components/pages/ProductDetail'
import { getProducts, getProduct, getRelatedProducts, formatPrice } from '../../../lib/api'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product: slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Not Found — Auvérer' }
  return {
    title: `${product.name} — Auvérer`,
    description: `${product.tagline} ${product.size} · ${formatPrice(product.price)}.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
  const { product: slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  const related = await getRelatedProducts(product, 3)

  return (
    <main>
      <Navigation />
      <div
        style={{
          backgroundColor: 'var(--color-surface-background)',
          padding: '5rem clamp(1.5rem, 4vw, 4rem) 1rem',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              { label: product.name },
            ]}
          />
        </div>
      </div>
      <ProductDetail product={product} related={related} />
      <Footer />
    </main>
  )
}
