'use client'

import { useId, useRef, useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export type AccordionItem = {
  title: string
  content: React.ReactNode
}

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

function AccordionPanel({
  isOpen,
  panelId,
  buttonId,
  children,
  prefersReduced,
}: {
  isOpen: boolean
  panelId: string
  buttonId: string
  children: React.ReactNode
  prefersReduced: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  const measure = useCallback(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (contentRef.current) ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [measure])

  if (prefersReduced) {
    return (
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        style={{ paddingBottom: isOpen ? '2rem' : 0 }}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={buttonId}
      style={{ overflow: 'hidden' }}
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: height || 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div ref={contentRef} style={{ paddingBottom: '2rem' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Sharp-cornered expandable sections with hairline dividers.
   One panel open at a time; fully keyboard accessible. */
export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)
  const baseId = useId()
  const prefersReduced = useReducedMotion()

  return (
    <div style={{ borderTop: '1px solid var(--color-border-default)' }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const buttonId = `${baseId}-button-${i}`
        const panelId = `${baseId}-panel-${i}`
        return (
          <div key={item.title} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
            <h3 style={{ margin: 0 }}>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '1.5rem 0',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: isOpen ? 'var(--color-accent-gold)' : 'var(--color-text-primary)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'relative',
                    width: '0.75rem',
                    height: '0.75rem',
                    flexShrink: 0,
                    color: 'var(--color-accent-gold)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'currentColor',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      backgroundColor: 'currentColor',
                      transform: 'rotate(90deg)',
                      opacity: isOpen ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </span>
              </button>
            </h3>
            <AccordionPanel
              isOpen={isOpen}
              panelId={panelId}
              buttonId={buttonId}
              prefersReduced={!!prefersReduced}
            >
              {item.content}
            </AccordionPanel>
          </div>
        )
      })}
    </div>
  )
}
