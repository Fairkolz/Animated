const isProd = process.env.NODE_ENV === 'production'

/* Supabase Auth (GoTrue) calls the project API at <ref>.supabase.co. When a
   project is configured, its origin is added to connect-src so the CSP does
   not block member sign-in / OAuth traffic.

   The URL and ANON key below are PUBLIC by design (the anon key ships to every
   browser; RLS is what enforces security). They are committed so builds never
   depend on missing Vercel env vars. Real Vercel env vars still win when set.
   The SERVICE_ROLE key is NOT here — it stays a secret env var. */
const env = {
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://crqonnnsrmjchocxkryd.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycW9ubm5zcm1qY2hvY3hrcnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2Mzk3NDMsImV4cCI6MjEwNDIxNTc0M30.sJflUb-vxyWbduNrSHlySIMy87VFOB9OkpYIIxdhJi8',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://animated-chi.vercel.app',
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : ''

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://challenges.cloudflare.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com https://challenges.cloudflare.com",
  [
    "connect-src 'self'",
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://challenges.cloudflare.com',
    supabaseOrigin,
  ]
    .filter(Boolean)
    .join(' '),
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: isProd
          ? [...securityHeaders, { key: 'Content-Security-Policy', value: ContentSecurityPolicy }]
          : securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
