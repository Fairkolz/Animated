const isProd = process.env.NODE_ENV === 'production'

/* Supabase Auth (GoTrue) calls the project API at <ref>.supabase.co. When a
   project is configured, its origin is added to connect-src so the CSP does
   not block member sign-in / OAuth traffic. */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : ''

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com",
  [
    "connect-src 'self'",
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    supabaseOrigin,
  ]
    .filter(Boolean)
    .join(' '),
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-src 'none'",
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
