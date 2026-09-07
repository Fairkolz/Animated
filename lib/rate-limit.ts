/**
 * Simple in-memory sliding-window rate limiter.
 * Suitable for single-instance deployments (Vercel, single-node).
 * For distributed rate limiting, swap this for Redis-backed logic.
 */

type RateLimitConfig = {
  /** Max requests per window */
  max: number
  /** Window duration in ms */
  windowMs: number
}

const buckets = new Map<string, { count: number; resetAt: number }>()

// Periodic cleanup: evict expired buckets every 60 s (max 10k entries before
// a forced full sweep to prevent memory growth on abuse).
setInterval(() => {
  const now = Date.now()
  buckets.forEach((entry, key) => {
    if (entry.resetAt <= now) buckets.delete(key)
  })
  if (buckets.size > 10_000) buckets.clear()
}, 60_000)

/**
 * Check whether a request from `identifier` is allowed under `config`.
 * Returns `{ ok: true, remaining }` or `{ ok: false, retryAfterMs }`.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): { ok: true; remaining: number } | { ok: false; retryAfterMs: number } {
  const now = Date.now()
  const entry = buckets.get(identifier)

  if (!entry || entry.resetAt <= now) {
    // Fresh window
    buckets.set(identifier, { count: 1, resetAt: now + config.windowMs })
    return { ok: true, remaining: config.max - 1 }
  }

  entry.count += 1
  if (entry.count > config.max) {
    return { ok: false, retryAfterMs: entry.resetAt - now }
  }

  return { ok: true, remaining: config.max - entry.count }
}

/**
 * Helper: extract the client IP from request headers.
 * Works with Vercel, Cloudflare, and common reverse-proxy headers.
 */
export function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}

/** Standard rate-limit headers for the response */
export function rateLimitHeaders(
  result: { ok: true; remaining: number } | { ok: false; retryAfterMs: number },
  config: RateLimitConfig,
): Record<string, string> {
  if (!result.ok) {
    return {
      'Retry-After': String(Math.ceil(result.retryAfterMs / 1000)),
      'X-RateLimit-Limit': String(config.max),
      'X-RateLimit-Remaining': '0',
    }
  }
  return {
    'X-RateLimit-Limit': String(config.max),
    'X-RateLimit-Remaining': String(result.remaining),
  }
}
