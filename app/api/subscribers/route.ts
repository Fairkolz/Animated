import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { checkRateLimit, getClientIp, rateLimitHeaders } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

/* 10 subscribe attempts per IP per 15 minutes — stops newsletter spam/abuse. */
const subscribeLimit = { max: 10, windowMs: 15 * 60 * 1000 }

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const rate = checkRateLimit(`subscribe:${ip}`, subscribeLimit)
  if (!rate.ok) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again in a few minutes.' },
      {
        status: 429,
        headers: rateLimitHeaders(rate, subscribeLimit),
      }
    )
  }

  try {
    const supabase = createServerClient()
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('subscribers')
      .upsert(
        { email: email.toLowerCase().trim(), is_active: true, unsubscribed_at: null },
        { onConflict: 'email' }
      )
      .select('id, email, created_at')
      .single()

    if (error) {
      console.error('Error subscribing:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { message: 'Successfully subscribed', subscriber: data },
      { headers: rateLimitHeaders(rate, subscribeLimit) }
    )
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
