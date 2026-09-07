import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let adminClient: SupabaseClient | null = null

/**
 * Admin client — uses the service_role key and bypasses ALL RLS.
 *
 * ⚠️  This client MUST only be used on the server side and only for operations
 * that genuinely need RLS bypass (e.g. calling set_role). Never expose the
 * service-role key to the client bundle and never use it for routine reads.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Supabase admin is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local'
    )
  }
  adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  return adminClient
}

/**
 * Promote a user to admin. Must be called server-side with the service-role key.
 */
export async function grantAdmin(userId: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.rpc('set_role', {
    target_user: userId,
    new_role: 'admin',
  })
  if (error) {
    console.error('grantAdmin error:', error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

/**
 * Demote a user from admin. Must be called server-side with the service-role key.
 */
export async function revokeAdmin(userId: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.rpc('set_role', {
    target_user: userId,
    new_role: 'member',
  })
  if (error) {
    console.error('revokeAdmin error:', error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

/**
 * Fetch any user's profile (bypasses RLS — admin only).
 */
export async function getProfileAsAdmin(userId: string) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error: error?.message }
}

/**
 * Shared admin-gate for route handlers. Reads the caller's access token from
 * the `Authorization: Bearer` header, verifies the JWT against Supabase Auth,
 * and resolves their role from the profiles table via the service-role key
 * (the single source of truth, not affected by RLS policy nuance).
 *
 * Returns the caller's `{ user, role }`, or `null` when the token is invalid.
 */
export type AdminCaller = {
  user: { id: string; email?: string | null }
  role: 'admin' | 'member'
  isAdmin: boolean
}

export async function resolveAdminCaller(
  accessToken: string | null
): Promise<AdminCaller | null> {
  if (!accessToken) return null
  const supabase = getSupabaseAdmin()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken)
  if (userError || !user) return null
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()
  const role = data?.role === 'admin' ? 'admin' : 'member'
  return {
    user: { id: user.id, email: user.email ?? undefined },
    role,
    isAdmin: role === 'admin',
  }
}
