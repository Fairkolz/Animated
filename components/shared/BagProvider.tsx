'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Product } from '../../lib/products'

export type BagItem = {
  slug: string
  name: string
  price: number
  size: string
  qty: number
}

type BagContextValue = {
  items: BagItem[]
  itemCount: number
  subtotal: number
  addItem: (product: Product) => void
  removeItem: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  isDrawerOpen: boolean
  openBag: () => void
  closeBag: () => void
}

const BagContext = createContext<BagContextValue | null>(null)

export function useBag(): BagContextValue {
  const ctx = useContext(BagContext)
  if (!ctx) throw new Error('useBag must be used within BagProvider')
  return ctx
}

export default function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug)
      if (existing) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + 1 } : i))
      }
      return [
        ...prev,
        { slug: product.slug, name: product.name, price: product.price, size: product.size, qty: 1 },
      ]
    })
    setIsDrawerOpen(true)
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    )
  }, [])

  const openBag = useCallback(() => setIsDrawerOpen(true), [])
  const closeBag = useCallback(() => setIsDrawerOpen(false), [])

  const value = useMemo<BagContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0)
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)
    return { items, itemCount, subtotal, addItem, removeItem, setQty, isDrawerOpen, openBag, closeBag }
  }, [items, addItem, removeItem, setQty, isDrawerOpen, openBag, closeBag])

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}
