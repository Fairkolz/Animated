/* Convention-based asset paths for local photography.
   Images live in public/images/<group>/<slug>.jpg and are named
   after product slugs, article slugs, or fixed view names. */

export const productImage = (slug: string) => `/images/products/${slug}.jpg`

export const articleImage = (slug: string) => `/images/journal/${slug}.jpg`

export const aboutImage = (
  name: 'founding' | 'craft-blending' | 'craft-ledgers' | 'craft-camellia',
) => `/images/about/${name}.jpg`

export const galleryImage = (view: 'texture' | 'ritual' | 'packaging') =>
  `/images/gallery/${view}.jpg`

export const homeImage = (name: string) => `/images/home/${name}.jpg`
