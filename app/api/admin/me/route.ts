import { NextResponse } from 'next/server'
import { bearerTokenFromRequest } from '@/lib/supabase-server'
import { resolveAdminCaller } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/me
 * Resolves the caller's role from their bearer token.
 * Returns `{ isAdmin, email }` — the minimal info the UI needs to show or
 * hide admin controls. No sensitive data exposed.
 */
export async function GET(request: Request) {
  try {
    const caller = await resolveAdminCaller(bearerTokenFromRequest(request))
    if (!caller) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    return NextResponse.json({
      isAdmin: caller.isAdmin,
      role: caller.role,
      email: caller.user.email ?? null,
    })
  } catch (err) {
    console.error('admin/me error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}