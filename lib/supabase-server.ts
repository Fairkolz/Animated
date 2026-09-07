import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

/**
 * Server-side client for reading PUBLIC data.
 *
 * RLS already grants public read on all content tables (products, articles,
 * stockists), so this lazy singleton works for the whole storefront without
 * any per-request session wiring.
 */
export function createServerClient(): SupabaseClient {
  if (client) return client
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured for the server.')
  }
  client = createClient(supabaseUrl, supabaseAnonKey)
  return client
}

/**
 * Read the caller's user id from a Bearer access token. Verifies the JWT
 * against Supabase Auth and returns the user (null if invalid/expired).
 *
 * The browser session is PKCE + localStorage, so server code receives auth via
 * an `Authorization: Bearer <access token>` header rather than via cookies.
 */
export async function authUserFromToken(accessToken: string | null) {
  if (!supabaseUrl || !supabaseAnonKey) return null
  if (!accessToken) return null
  const client = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await client.auth.getUser(accessToken)
  if (error) return null
  return data.user
}

/**
 * Extract the Bearer token from a request's Authorization header.
 */
export function bearerTokenFromRequest(request: Request): string | null {
  const header = request.headers.get('authorization')
  if (!header) return null
  const [scheme, token] = header.split(' ')
  return scheme?.toLowerCase() === 'bearer' && token ? token : null
}