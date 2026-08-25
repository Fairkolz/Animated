'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  /* Scroll-reveal engine for [data-reveal] elements. Elements are hidden
     via CSS only under html.js (set inline before first paint) — so there
     is no server-paint/hydration flash. A MutationObserver catches nodes
     added later (filter changes, "load more", route transitions). */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = el.dataset.revealDelay
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.add('revealed')
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -60px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => {
        io.observe(el)
      })
    }
    observeAll()

    const mo = new MutationObserver(() => observeAll())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    /* Bridge Lenis -> ScrollTrigger, but reap orphaned triggers while we're
       here. Under heavy CPU load a route transition's cleanup can lose the
       race: a stale trigger outlives its DOM and every scroll event would
       feed it an update, letting it refresh itself and force native scrolls
       (GSAP Observer caching writes scrollTo(0,0)) — visible yank-and-restore
       flicker seconds after navigation. Sweeping at most once per second is
       negligible next to per-frame updates and bounds any straggler's life
       to ~1s of scrolling. */
    let lastSweep = 0
    const onScroll = () => {
      const now = performance.now()
      if (now - lastSweep > 1000) {
        lastSweep = now
        let killed = false
        ScrollTrigger.getAll().forEach((t) => {
          const el = (t.trigger ?? t.vars?.trigger) as HTMLElement | undefined
          if (el && !el.isConnected) {
            t.kill()
            killed = true
          }
        })
        if (killed) return
      }
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /* Route change: reset scroll exactly once, synchronously with the route
     commit. Lenis's internal target is updated in the same call, so nothing
     fights the reset afterwards.

     The previous implementation re-asserted scrollTo(0,0) across two extra
     animation frames and called ScrollTrigger.refresh() unconditionally.
     Under real-world timing (slow machine, throttled hydration), those late
     re-assertions landed AFTER the user had already scrolled: the forced
     jump to top alternated with Lenis restoring the scroll position every
     frame — a full-page flicker between "scrolled" and "top". refresh() was
     also measured writing window.scrollTo(0,0) five times via GSAP Observer
     caching, even on pages with no ScrollTriggers. */
  useIsomorphicLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true })
    }
    window.scrollTo(0, 0)
    // Recalibrate ScrollTrigger only when the incoming page actually uses
    // it, and off the current tick so its measurement passes can't yank
    // native scroll underneath the user.
    const raf = requestAnimationFrame(() => {
      // Kill triggers orphaned by route transitions whose cleanup lost the
      // race (possible under heavy CPU load): Lenis's scroll->update binding
      // would otherwise keep refreshing them mid-viewport, and each internal
      // refresh forces native scrolls via GSAP Observer caching.
      ScrollTrigger.getAll().forEach((t) => {
        const el = (t.trigger ?? t.vars?.trigger) as HTMLElement | undefined
        if (el && !el.isConnected) t.kill()
      })
      // Never recalibrate underneath a user who has already scrolled
      // (late-commit race on slow machines).
      if (window.scrollY !== 0) return
      if (ScrollTrigger.getAll().length === 0) return
      const y = window.scrollY
      ScrollTrigger.refresh()
      // refresh()'s measurement passes can force native scrolls via GSAP
      // Observer caching — undo immediately if it moved anything.
      if (Math.round(window.scrollY) !== Math.round(y)) {
        lenisRef.current?.scrollTo(y, { immediate: true, force: true })
        window.scrollTo(0, y)
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return <>{children}</>
}
