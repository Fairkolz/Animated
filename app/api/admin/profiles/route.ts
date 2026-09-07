import { NextResponse } from 'next/server'
import { bearerTokenFromRequest } from '@/lib/supabase-server'
import { getSupabaseAdmin, resolveAdminCaller } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/profiles
 * Lists all member profiles. Admin-only — the caller must present a valid
 * user bearer token whose profile role is 'admin'.
 *
 * Returns a flattened, serialisable array of { id, email, fullName, role,
 * createdAt } so the admin panel never has to guess at column shapes.
 */
export async function GET(request: Request) {
  try {
    const caller = await resolveAdminCaller(bearerTokenFromRequest(request))
    if (!caller) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (!caller.isAdmin) {
      return NextResponse.json({ error: 'Forbidden — admin access required' }, { status: 403 })
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('profiles list error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const profiles = (data ?? []).map((row) => ({
      id: row.id,
      email: row.email ?? null,
      fullName: row.full_name ?? null,
      role: row.role,
      createdAt: row.created_at,
    }))

    return NextResponse.json({ profiles })
  } catch (err) {
    console.error('admin/profiles error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}