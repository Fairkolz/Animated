import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')

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
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
