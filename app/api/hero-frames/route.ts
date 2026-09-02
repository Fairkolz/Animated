import { NextResponse } from 'next/server'
import { readdirSync } from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

/* Frame count is stable per deployment (WebP/JPG set ships with the site), so
   this is effectively static data. Allowing Next to cache it and setting a
   long cache lifetime keeps the count from being recomputed with a blocking
   readdirSync on every hero mount. force-dynamic made the request uncacheable
   and put synchronous disk I/O on the event loop per visit. */
export const revalidate = 3600

export function GET() {
  const dir = path.join(process.cwd(), 'public', '0831_frames')
  let count = 0
  try {
    const files = readdirSync(dir)
      .filter((f) => /^frame_\d{4}\.webp$/i.test(f))
      .sort()
    count = files.length
  } catch {
    count = 0
  }
  return NextResponse.json({ count }, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}