import { NextResponse } from 'next/server'
import { readdirSync } from 'node:fs'
import path from 'node:path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export function GET() {
  const dir = path.join(process.cwd(), 'public', '0831_frames')
  let count = 0
  try {
    const files = readdirSync(dir)
      .filter((f) => /^frame_\d{4}\.jpg$/i.test(f))
      .sort()
    count = files.length
  } catch {
    count = 0
  }
  return NextResponse.json({ count })
}