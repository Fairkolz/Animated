'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  /** Pixel drift across the full viewport traversal. Kept small — depth, not spectacle. */
  amplitude?: number
}

/* Editorial parallax frame: the image drifts a few pixels against scroll.
   The inner layer is oversized (112% height, offset -6%) so the drift can
   never expose an edge. Disabled under prefers-reduced-motion. */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  amplitude = 24,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [amplitude, -amplitude])

  return (
    <div
      ref={ref}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      <motion.div
        style={
          prefersReduced
            ? { position: 'absolute', inset: 0 }
            : { position: 'absolute', insetInline: 0, top: '-6%', height: '112%', y }
        }
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </motion.div>
    </div>
  )
}
