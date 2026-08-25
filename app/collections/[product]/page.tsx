import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import Breadcrumb from '../../../components/shared/Breadcrumb'
import ProductDetail from '../../../components/pages/ProductDetail'
import { products, getProduct, getRelatedProducts } from '../../../lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ product: p.slug }))
}

export function generateMetadata({ params }: { params: { product: string } }): Metadata {
  const product = getProduct(params.product)
  if (!product) return { title: 'Not Found — Auvérer' }
  return {
    title: `${product.name} — Auvérer`,
    description: `${product.tagline} ${product.size} · $${product.price.toFixed(2)}.`,
  }
}

export default function ProductPage({ params }: { params: { product: string } }) {
  const product = getProduct(params.product)
  if (!product) notFound()
  const related = getRelatedProducts(product, 3)

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
