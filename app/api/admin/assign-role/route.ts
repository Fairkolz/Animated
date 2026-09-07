import { NextResponse } from 'next/server'
import { bearerTokenFromRequest } from '@/lib/supabase-server'
import {
  getSupabaseAdmin,
  resolveAdminCaller,
} from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

const ADMIN_TARGETS = new Set(['admin', 'member'])

/**
 * POST /api/admin/assign-role
 *
 * Promotes or demotes a user's role.
 * Only callable by a user whose own profile has role=admin. Authentication is
 * via `Authorization: Bearer <access token>` (PKCE session stored in the
 * browser). The actual role change runs on the service-role key via the
 * set_role RPC, which is unexposed to anon/authenticated keys.
 *
 * Body: { userId: string, role: 'admin' | 'member' }
 */
export async function POST(request: Request) {
  try {
    // 1. Verify the caller and their admin role (bearer token + profiles table).
    const caller = await resolveAdminCaller(bearerTokenFromRequest(request))
    if (!caller) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (!caller.isAdmin) {
      return NextResponse.json({ error: 'Forbidden — admin access required' }, { status: 403 })
    }

    // 2. Validate the request body.
    const body = await request.json()
    const { userId, role } = body as { userId?: string; role?: string }
    if (!userId || typeof userId !== 'string' || !userIsUuid(userId)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 })
    }
    if (!role || typeof role !== 'string' || !ADMIN_TARGETS.has(role)) {
      return NextResponse.json({ error: 'Role must be "admin" or "member"' }, { status: 400 })
    }

    // Guard: you cannot change your own role (prevents accidental self-lockout
    // and makes privilege changes auditable by a second admin).
    if (userId === caller.user.id) {
      return NextResponse.json(
        { error: 'You cannot change your own role from this endpoint.' },
        { status: 409 }
      )
    }

    getSupabaseAdmin() // assert service-role key is configured before proceeding

    // 3. Execute the role change via the set_role RPC (service-role only).
    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin.rpc('set_role', {
      target_user: userId,
      new_role: role,
    })
    if (error) {
      console.error('set_role error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, userId, role })
  } catch (err) {
    console.error('assign-role error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function userIsUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}