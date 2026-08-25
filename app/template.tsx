'use client'

import { motion, useReducedMotion } from 'motion/react'

/* Route-level fade — a single quiet crossfade on navigation.
   template.tsx remounts per route, so this plays once per page.
   Skipped entirely under prefers-reduced-motion. */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
