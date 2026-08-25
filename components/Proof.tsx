'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { homeImage } from '../lib/images'

type StatItem = {
  value: number
  suffix: string
  suffixItalic?: boolean
  label: string
}

const statsData: StatItem[] = [
  {
    value: 94,
    suffix: '%',
    label: 'Reported significantly smoother skin texture.',
  },
  {
    value: 12,
    suffix: 'h',
    suffixItalic: true,
    label: 'Sustained, deep hydration measured clinically.',
  },
  {
    value: 88,
    suffix: '%',
    label: 'Noticed a visible reduction in fine lines.',
  },
  {
    value: 3,
    suffix: 'w',
    suffixItalic: true,
    label: 'To achieve optimal, restorative results.',
  },
]

const easeStandard: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

function useCountUp(target: number, isActive: boolean, duration = 2000): number {
  const [current, setCurrent] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isActive) return
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isActive, target, duration])

  return current
}

function StatCell({
  stat,
  index,
  isVisible,
  prefersReduced,
}: {
  stat: StatItem
  index: number
  isVisible: boolean
  prefersReduced: boolean | null
}) {
  const animatedValue = useCountUp(stat.value, isVisible, 2200)
  const displayValue = prefersReduced ? stat.value : isVisible ? animatedValue : 0

  return (
    <motion.li
      className="relative pt-6"
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay: index * 0.12, ease: easeStandard }}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 w-12 h-px"
        style={{ backgroundColor: 'var(--color-accent-gold)', opacity: 0.4 }}
      />
      <p
        className="flex items-baseline mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        <span className="font-light leading-none" style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}>
          {displayValue}
        </span>
        <span
          className={`font-light ml-1 ${stat.suffixItalic ? 'italic' : ''}`}
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
        >
          {stat.suffix}
        </span>
      </p>
      <p
        className="text-xs md:text-sm font-light tracking-wide leading-relaxed uppercase"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-secondary)',
        }}
      >
        {stat.label}
      </p>
    </motion.li>
  )
}

export default function Proof() {
  const prefersReduced = useReducedMotion()
  const statsRef = useRef<HTMLUListElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.25 })
    const el = statsRef.current
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [prefersReduced, handleIntersection])

  return (
    <section
      aria-labelledby="proof-title"
      className="flex flex-col md:flex-row overflow-hidden md:min-h-screen"
      style={{ backgroundColor: 'var(--color-surface-surface)' }}
    >
      {/* Left column - cinematic portrait */}
      <figure className="relative w-full md:w-1/2 h-[512px] md:h-auto overflow-hidden m-0">
        <motion.div
          className="absolute inset-0"
          initial={prefersReduced ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: easeStandard }}
        >
          <Image
            src={homeImage('clinical-proof')}
            alt="Close-up portrait of a woman with smooth, radiant skin"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '62% 50%', filter: 'grayscale(0.15)' }}
          />
        </motion.div>
      </figure>

      {/* Right column - clinical stats panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-24 md:px-16">
        <div className="max-w-xl w-full mx-auto">
          <motion.header
            className="mb-16"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeStandard }}
          >
            <span
              className="block mb-4 text-xs font-semibold uppercase"
              style={{
                color: 'var(--color-accent-gold)',
                letterSpacing: '0.35em',
                fontFamily: 'var(--font-body)',
              }}
            >
              Clinical Proof
            </span>
            <h2
              id="proof-title"
              className="italic font-light leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              }}
            >
              Quantifiable Radiance.
            </h2>
          </motion.header>

          <ul ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 list-none p-0">
            {statsData.map((stat, i) => (
              <StatCell
                key={`${stat.value}${stat.suffix}`}
                stat={stat}
                index={i}
                isVisible={isVisible}
                prefersReduced={prefersReduced}
              />
            ))}
          </ul>

          <footer
            className="mt-20 pt-10"
            style={{ borderTop: '1px solid var(--color-border-default)' }}
          >
            <p
              className="text-[10px] font-medium uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-muted)',
              }}
            >
              Based on a 4-week clinical study of 30 participants
            </p>
          </footer>
        </div>
      </div>
    </section>
  )
}
