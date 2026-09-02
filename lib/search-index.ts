/* Lightweight search index for the global search overlay.
   Only the fields needed to match and link results are shipped to the browser,
   so the full product descriptions and journal essay bodies (used on their own
   page routes) never enter the shared client bundle via Navigation. */

export type SearchEntry = {
  title: string
  meta: string
  href: string
  keywords?: string
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Products
  { title: 'The Auric Collection', meta: 'Product — Rituals', href: '/collections/auric-collection', keywords: 'ritual set four-piece collection' },
  { title: 'The Neutralizing Elixir', meta: 'Product — Face', href: '/collections/neutralizing-elixir', keywords: 'serum niacinamide reactive calm' },
  { title: 'Luminous Overnight Mask', meta: 'Product — Face', href: '/collections/luminous-overnight-mask', keywords: 'mask overnight lactic renewal' },
  { title: 'Barrier Cream', meta: 'Product — Face', href: '/collections/barrier-cream', keywords: 'ceramide lipids seal barrier' },
  { title: 'Cleansing Nectar', meta: 'Product — Face', href: '/collections/cleansing-nectar', keywords: 'cleanser nectar rice lipids' },
  { title: 'Ethereal Eye Concentrate', meta: 'Product — Eyes', href: '/collections/eye-concentrate', keywords: 'eye contour peptide caffeine' },
  { title: 'Conditioning Lip Oil', meta: 'Product — Lips', href: '/collections/lip-oil', keywords: 'lip oil camellia murumuru' },
  { title: 'Illuminating Essence', meta: 'Product — Face', href: '/collections/illuminating-essence', keywords: 'essence galactomyces brightening' },
  { title: 'Resilience Neck & Décolleté Cream', meta: 'Product — Face', href: '/collections/resilience-neck-cream', keywords: 'neck decollete matrixyl peptide' },
  { title: 'The Evening Ritual Set', meta: 'Product — Rituals', href: '/collections/evening-ritual-set', keywords: 'ritual set night three-piece' },
  { title: 'The Morning Ritual Set', meta: 'Product — Rituals', href: '/collections/morning-ritual-set', keywords: 'ritual set day three-piece' },
  { title: 'Amber Lip Balm', meta: 'Product — Lips', href: '/collections/amber-lip-balm', keywords: 'lip balm shea candelilla' },

  // Journal essays
  { title: 'The Case for a Slower Evening Ritual', meta: 'Essay — Ritual', href: '/journal/the-case-for-a-slower-evening-ritual', keywords: 'evening ritual slow massage' },
  { title: 'Understanding Retinol Alternatives', meta: 'Essay — Science', href: '/journal/understanding-retinol-alternatives', keywords: 'retinol bakuchiol peptides fermentation' },
  { title: 'Why We Formulate at Night', meta: 'Essay — Ingredients', href: '/journal/why-we-formulate-at-night', keywords: 'evening chemistry emulsion grasse' },
  { title: 'The Quiet Chemistry of Camellia', meta: 'Essay — Ingredients', href: '/journal/the-quiet-chemistry-of-camellia', keywords: 'camellia oil fermentation kyoto' },
  { title: 'Sourcing the Extraordinary', meta: 'Essay — Ingredients', href: '/journal/sourcing-the-extraordinary', keywords: 'white truffle alpine water sourcing' },
  { title: 'What We Mean by Restraint', meta: 'Essay — Living', href: '/journal/what-we-mean-by-restraint', keywords: 'restraint fewer products philosophy' },
  { title: 'Minimalism as a Skincare Philosophy', meta: 'Essay — Living', href: '/journal/minimalism-as-a-skincare-philosophy', keywords: 'minimalism shelf edit routine' },
  { title: 'The Architecture of a Barrier', meta: 'Essay — Science', href: '/journal/the-architecture-of-a-barrier', keywords: 'barrier ceramide ratio lipids' },
  { title: 'In Praise of the Unhurried Morning', meta: 'Essay — Ritual', href: '/journal/in-praise-of-the-unhurried-morning', keywords: 'morning ritual calm ninety seconds' },
]
