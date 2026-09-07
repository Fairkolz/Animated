import { createServerClient } from './supabase-server'

export type ProductCategory = 'Face' | 'Eyes' | 'Lips' | 'Rituals'

export type Product = {
  id: number
  slug: string
  name: string
  price: number
  category: ProductCategory
  size: string
  tagline: string
  isNew: boolean
  description: string[]
  keyIngredients: { name: string; role: string }[]
  howToUse: string[]
  fullIngredients: string
  createdAt: string
  updatedAt: string
}

export type ArticleCategory = 'Ritual' | 'Ingredients' | 'Science' | 'Living'

export type ArticleBlock = { type: 'p' | 'quote'; text: string }

export type Article = {
  id: number
  slug: string
  title: string
  category: ArticleCategory
  excerpt: string
  author: string
  role: string
  date: string
  readTime: string
  body: ArticleBlock[]
  createdAt: string
  updatedAt: string
}

export type StockistRegion = 'Europe' | 'North America' | 'Asia-Pacific'

export type Stockist = {
  id: number
  name: string
  city: string
  region: StockistRegion
  address: string
  createdAt: string
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    slug: row.slug as string,
    name: row.name as string,
    price: row.price as number,
    category: row.category as ProductCategory,
    size: row.size as string,
    tagline: row.tagline as string,
    isNew: row.is_new as boolean,
    description: row.description as string[],
    keyIngredients: row.key_ingredients as { name: string; role: string }[],
    howToUse: row.how_to_use as string[],
    fullIngredients: row.full_ingredients as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

function mapArticle(row: Record<string, unknown>): Article {
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    category: row.category as ArticleCategory,
    excerpt: row.excerpt as string,
    author: row.author as string,
    role: row.role as string,
    date: row.date as string,
    readTime: row.read_time as string,
    body: row.body as ArticleBlock[],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

function mapStockist(row: Record<string, unknown>): Stockist {
  return {
    id: row.id as number,
    name: row.name as string,
    city: row.city as string,
    region: row.region as StockistRegion,
    address: row.address as string,
    createdAt: row.created_at as string,
  }
}

export const categories: ('All' | ProductCategory)[] = ['All', 'Face', 'Eyes', 'Lips', 'Rituals']
export const articleCategories: ('All' | ArticleCategory)[] = ['All', 'Ritual', 'Ingredients', 'Science', 'Living']
export const stockistRegions: ('All' | StockistRegion)[] = ['All', 'Europe', 'North America', 'Asia-Pacific']

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export async function getProducts(category?: string): Promise<Product[]> {
  const supabase = createServerClient()

  let query = supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return (data || []).map(mapProduct)
}

export async function getProduct(slug: string): Promise<Product | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('Error fetching product:', error)
    return null
  }

  return mapProduct(data)
}

export async function getRelatedProducts(current: Product, count = 3): Promise<Product[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .neq('slug', current.slug)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  const products = (data || []).map(mapProduct)
  const sameCategory = products.filter(p => p.category === current.category)
  const others = products.filter(p => p.category !== current.category)

  return [...sameCategory, ...others].slice(0, count)
}

export async function getArticles(category?: string): Promise<Article[]> {
  const supabase = createServerClient()

  let query = supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return (data || []).map(mapArticle)
}

export async function getArticle(slug: string): Promise<Article | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('Error fetching article:', error)
    return null
  }

  return mapArticle(data)
}

export async function getStockists(region?: string): Promise<Stockist[]> {
  const supabase = createServerClient()

  let query = supabase
    .from('stockists')
    .select('*')
    .order('name', { ascending: true })

  if (region && region !== 'All') {
    query = query.eq('region', region)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching stockists:', error)
    return []
  }

  return (data || []).map(mapStockist)
}

export async function subscribe(email: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' }
  }

  const { error } = await supabase
    .from('subscribers')
    .upsert(
      { email: email.toLowerCase().trim(), is_active: true, unsubscribed_at: null },
      { onConflict: 'email' }
    )

  if (error) {
    console.error('Error subscribing:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
