export type ProductCategory = 'Face' | 'Eyes' | 'Lips' | 'Rituals'

export type Product = {
  slug: string
  name: string
  price: number
  category: ProductCategory
  size: string
  tagline: string
  isNew?: boolean
  description: string[]
  keyIngredients: { name: string; role: string }[]
  howToUse: string[]
  fullIngredients: string
}

export const products: Product[] = [
  {
    slug: 'auric-collection',
    name: 'The Auric Collection',
    price: 310,
    category: 'Rituals',
    size: 'Four-piece ritual set',
    tagline: 'The complete Auvérer gesture, from first cleanse to final seal.',
    description: [
      'The Auric Collection gathers the four formulations we consider indivisible — Cleansing Nectar, the Neutralizing Elixir, Barrier Cream and Conditioning Lip Oil — composed as a single evening sequence. Each step prepares the skin for the next, so that actives arrive where they are needed rather than where they happen to fall.',
      'It is the ritual we practice ourselves at the end of long days: unhurried, precise, and quietly transformative. Presented in a charcoal keep-case lined in ivory cotton, with each bottle numbered by batch.',
    ],
    keyIngredients: [
      { name: 'White Truffle Extract', role: 'Antioxidant foundation across all four steps' },
      { name: 'Fermented Camellia Oil', role: 'Lipid-mimetic softness without weight' },
      { name: 'Encapsulated Niacinamide', role: 'Even tone, released slowly over hours' },
      { name: 'Alpine Spring Water', role: 'Low-mineral base for ingredient stability' },
    ],
    howToUse: [
      'Begin with Cleansing Nectar on dry skin, massaging in slow circles before emulsifying with warm water.',
      'Press two drops of the Neutralizing Elixir into damp skin, palms flat, waiting thirty seconds before continuing.',
      'Warm Barrier Cream between the fingers and press upward from the jaw. Finish with a single layer of Conditioning Lip Oil.',
    ],
    fullIngredients:
      'Full ingredient declarations for each piece in the Collection are listed on its individual product page. All formulas share a base of alpine spring water, fermented camellia oleifera and cold-pressed truffle extract, and none contain synthetic fragrance, drying alcohols or occlusive silicones.',
  },
  {
    slug: 'neutralizing-elixir',
    name: 'The Neutralizing Elixir',
    price: 165,
    category: 'Face',
    size: '30 ml',
    tagline: 'Our most concentrated serum — calm restored to reactive skin.',
    isNew: true,
    description: [
      'Reactive skin does not need more stimulation; it needs a more articulate conversation. The Neutralizing Elixir pairs encapsulated niacinamide with fermented white truffle extract to interrupt the cycle of visible redness and reactivity while reinforcing the barrier that keeps irritants out.',
      'The texture is the lightest we make — a weightless veil that disappears within seconds, leaving only a finish like polished stone. It was formulated to be worn alone on compromised skin, or beneath Barrier Cream when the season turns.',
      'Every batch rests for fourteen days after blending, a quieting period our chemists call the pause, before it is bottled in amber glass and numbered by hand.',
    ],
    keyIngredients: [
      { name: 'Encapsulated Niacinamide 5%', role: 'Time-released tone correction' },
      { name: 'Fermented White Truffle', role: 'Antioxidant defense, softened for sensitivity' },
      { name: 'Beta-Glucan', role: 'Cortisol-soothing film former' },
      { name: 'Squalane (olive-derived)', role: 'Barrier-identical emollience' },
    ],
    howToUse: [
      'Dispense three drops into clean, damp palms.',
      'Press — do not rub — into the face and neck, beginning where redness concentrates.',
      'Use morning and evening. On nights of retinoid use, apply afterward as a buffer.',
    ],
    fullIngredients:
      'Aqua (Alpine Spring Water), Niacinamide, Squalane, Beta-Glucan, Tuber Magnatum (White Truffle) Ferment Filtrate, Glycerin, Panthenol, Sodium Hyaluronate (LMW), Allantoin, Tocopherol, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate.',
  },
  {
    slug: 'luminous-overnight-mask',
    name: 'Luminous Overnight Mask',
    price: 145,
    category: 'Face',
    size: '50 ml',
    tagline: 'Eight hours of controlled renewal, timed to the skin’s own clock.',
    description: [
      'Skin repairs itself at night; the mask simply refuses to let it work alone. A cushion of fermented camellia oil and slow-release lactic acid holds moisture against the skin until morning, while enzymatic exfoliation proceeds at a pace even sensitive complexions tolerate.',
      'You wake to skin that feels buffed rather than stripped — light reflected evenly, texture softened, the faint residual scent of evening iris. Twice weekly is sufficient; this is a formulation that asks for less and returns more.',
    ],
    keyIngredients: [
      { name: 'Fermented Camellia Oil', role: 'Overnight lipid replenishment' },
      { name: 'Lactic Acid 4%', role: 'Gentle, hydrating chemical renewal' },
      { name: 'Evening Primrose', role: 'Gamma-linolenic repair support' },
      { name: 'Iris Root Extract', role: 'Scent and soothing in one gesture' },
    ],
    howToUse: [
      'Apply a generous layer as the final step of your evening ritual, twice weekly.',
      'Leave overnight; rinse or tissue off in the morning.',
      'On retinoid evenings, choose one or the other — never both.',
    ],
    fullIngredients:
      'Aqua (Alpine Spring Water), Camellia Oleifera Seed Ferment, Lactic Acid, Glycerin, Oenothera Biennis (Evening Primrose) Oil, Cetearyl Alcohol, Glyceryl Stearate, Iris Germanica Root Extract, Sodium Hyaluronate, Tocopherol, Bisabolol, Xanthan Gum, Sodium Hydroxide, Sodium Benzoate.',
  },
  {
    slug: 'barrier-cream',
    name: 'Barrier Cream',
    price: 110,
    category: 'Face',
    size: '50 ml',
    tagline: 'The seal — ceramides and lipids in the ratio skin recognizes.',
    description: [
      'A barrier is architecture, and architecture is ratios. Barrier Cream delivers ceramides, cholesterol and fatty acids in the approximate 3:1:1 proportion of healthy stratum corneum, which is why it reads not as a cream sitting on the skin but as skin behaving better.',
      'Rich enough for alpine winters, breathable enough under makeup, it is the formulation most customers tell us they repurchase first. The finish is matte-satin — present, then gone.',
    ],
    keyIngredients: [
      { name: 'Ceramide NP, AP, EOP Complex', role: 'Barrier mortar, in physiologic ratio' },
      { name: 'Cholesterol', role: 'Completes the lipid triad' },
      { name: 'Shea Butter (unrefined)', role: 'Occulsion without congestion' },
      { name: 'Oat Lipids', role: 'Anti-itch, anti-sting comfort' },
    ],
    howToUse: [
      'Warm a pearl-sized amount between fingertips.',
      'Press upward over face and neck as the final morning or evening step.',
      'In harsh weather, add a second thin layer over cheeks and around the nose.',
    ],
    fullIngredients:
      'Aqua (Alpine Spring Water), Butyrospermum Parkii (Shea) Butter, Glycerin, Cetearyl Alcohol, Glyceryl Stearate, Ceramide NP, Ceramide AP, Ceramide EOP, Cholesterol, Avena Sativa (Oat) Kernel Oil, Squalane, Panthenol, Tocopherol, Phytosphingosine, Xanthan Gum, Sodium Lauroyl Lactylate, Ethylhexylglycerin.',
  },
  {
    slug: 'cleansing-nectar',
    name: 'Cleansing Nectar',
    price: 85,
    category: 'Face',
    size: '150 ml',
    tagline: 'A first cleanse that behaves like a treatment.',
    description: [
      'Most cleansers take; this one trades. Nectar dissolves sunscreen, sebum and city residue with fermented rice lipids while leaving the acid mantle intact — no squeak, no tightness, no twelve-step recovery.',
      'Emulsify with water and it becomes a milk; rinse and the skin is left at its natural pH, prepared rather than punished. It is the least dramatic product we make and the one our formulators defend most fiercely.',
    ],
    keyIngredients: [
      { name: 'Fermented Rice Lipids', role: 'Dissolves sebum without stripping' },
      { name: 'Camellia & Jojoba Oils', role: 'Skin-identical cleansing esters' },
      { name: 'Oat Amino Acids', role: 'pH-gentle secondary surfactancy' },
      { name: 'Chamomile Water', role: 'Calms as it cleans' },
    ],
    howToUse: [
      'Massage three pumps over dry skin, eyes included.',
      'Add warm water to emulsify, then rinse thoroughly.',
      'Follow with the Neutralizing Elixir on damp skin.',
    ],
    fullIngredients:
      'Aqua (Alpine Spring Water), Caprylic/Capric Triglyceride, Glycerin, Simmondsia Chinensis (Jojoba) Seed Oil, Camellia Oleifera Seed Oil, Oryza Sativa (Rice) Ferment Filtrate, Sucrose Laurate, Avena Sativa (Oat) Kernel Amino Acids, Anthemis Nobilis Flower Water, Tocopherol, Citric Acid, Sodium Benzoate, Potassium Sorbate.',
  },
  {
    slug: 'eye-concentrate',
    name: 'Ethereal Eye Concentrate',
    price: 95,
    category: 'Eyes',
    size: '15 ml',
    tagline: 'For the ten millimetres of skin that age first and forgive last.',
    description: [
      'The eye contour has almost no oil glands and the thinnest dermis on the face, which is why it keeps records. Ethereal Eye Concentrate answers with caffeine from green coffee to de-congest morning puffiness, and peptide-9, a signal complex that reminds dormant collagen to resume work.',
      'The applicator is a chilled ceramic tip; the gesture — three taps outward along the orbital bone — takes eleven seconds. Results accumulate quietly: concealer creases less, fine lines catch less light, the gaze looks rested regardless of the night it followed.',
    ],
    keyIngredients: [
      { name: 'Peptide-9 Complex', role: 'Collagen-signalling for firmness' },
      { name: 'Green Coffee Caffeine', role: 'Vasoconstrictive de-puffing' },
      { name: 'Albizia Julibrissin Bark', role: 'Protects periorbital microvasculature' },
      { name: 'Ceramide NP', role: 'Seals the fragile contour barrier' },
    ],
    howToUse: [
      'Morning and evening, using the ceramic tip, trace along the orbital bone from inner to outer corner.',
      'Tap — never drag — remaining concentrate with the ring finger.',
      'Allow thirty seconds to absorb before makeup.',
    ],
    fullIngredients:
      'Aqua (Alpine Spring Water), Glycerin, Caffeine, Albizia Julibrissin Bark Extract, Palmitoyl Tripeptide-9, Ceramide NP, Squalane, Sodium Hyaluronate, Panthenol, Tocopherol, Hydroxyethylcellulose, Citric Acid, Sodium Benzoate, Potassium Sorbate.',
  },
  {
    slug: 'lip-oil',
    name: 'Conditioning Lip Oil',
    price: 45,
    category: 'Lips',
    size: '8 ml',
    tagline: 'The finishing gesture — gloss depth with treatment intent.',
    description: [
      'Lips have no sebaceous glands at all, which makes them guests at everyone else’s table. This oil feeds them directly: camellia and murumuru butters suspended in a non-sticky ester base, with a whisper of vanilla and warm amber.',
      'Worn alone it gives a low, elegant sheen; worn over pigment it keeps colour comfortable for hours. One customer called it “the period at the end of the sentence.” We have not improved on that.',
    ],
    keyIngredients: [
      { name: 'Camellia Oleifera Oil', role: 'Fast-absorbing foundational softness' },
      { name: 'Murumuru Butter', role: 'Long-wear flexible film' },
      { name: 'Hyaluristic™ Filler', role: 'Plumping low-weight hyaluronic spheres' },
      { name: 'Vanilla & Amber Accord', role: 'Natural aroma, no synthetic fragrance' },
    ],
    howToUse: [
      'Apply a single layer as needed throughout the day.',
      'At night, apply a heavier coat as an overnight lip mask.',
      'Trace the outer line first, then fill — the applicator does the precision work.',
    ],
    fullIngredients:
      'Camellia Oleifera Seed Oil, Hydrogenated Polyisobutene, Astrocaryum Murumuru Seed Butter, Squalane, Sodium Hyaluronate, Tocopherol, Vanilla Planifolia Fruit Extract, Natural Amber Aroma, Limnanthes Alba (Meadowfoam) Seed Oil.',
  },
  {
    slug: 'illuminating-essence',
    name: 'Illuminating Essence',
    price: 125,
    category: 'Face',
    size: '100 ml',
    tagline: 'The preparatory water that makes everything after it work harder.',
    description: [
      'An essence is not a toner; it is the first active of the ritual, applied to damp skin so that everything layered above travels further. Illuminating Essence carries fermented galactomyces and licorice-root at functional concentrations into the deeper layers while the skin is still thirsty.',
      'Pressed in with the palms — the traditional gesture — it leaves a faint luminosity that users describe as lit-from-within, a word we resisted until we saw it happen.',
    ],
    keyIngredients: [
      { name: 'Galactomyces Ferment 78%', role: 'Brightening amino-rich filtrate' },
      { name: 'Licorice Root (Glabridin)', role: 'Disperses pigmentation gently' },
      { name: 'Rice Water Ferment', role: 'Softens keratin build-up' },
      { name: 'Low-weight Hyaluronic Acid', role: 'Carries actives deeper' },
    ],
    howToUse: [
      'After cleansing, pour into damp palms and press into the face and neck.',
      'Apply while skin is still damp — this is the whole point.',
      'Follow with serum while the surface remains tacky.',
    ],
    fullIngredients:
      'Galactomyces Ferment Filtrate, Aqua (Alpine Spring Water), Oryza Sativa (Rice) Ferment Filtrate, Glycerin, Dipotassium Glycyrrhizinate, Sodium Hyaluronate, Panthenol, Beta-Glucan, Tocopherol, Citric Acid, Sodium Benzoate.',
  },
  {
    slug: 'resilience-neck-cream',
    name: 'Resilience Neck & Décolleté Cream',
    price: 135,
    category: 'Face',
    size: '60 ml',
    tagline: 'Formulated for the horizontal truth between chin and collarbone.',
    description: [
      'The neck bends twenty thousand times a day and is remembered by skincare last. Resilience is built specifically for its anatomy: a firmer molecular structure than face cream, peptides that address the platysma’s downward drift, and enough lipid to survive being slept on.',
      'Applied in upward sweeps from the clavicle, it gradually improves the look of horizontal lines and the creping that betrays décolleté skin in low necklines. Patience rewarded, visibly.',
    ],
    keyIngredients: [
      { name: 'Matrixyl® 3000', role: 'Peptide pair for dermal density' },
      { name: 'Ceramide & Cholesterol Blend', role: 'Thicker-barrier reinforcement' },
      { name: 'Edelweiss Stem Cells', role: 'Photodamage defence for chest skin' },
      { name: 'Bisabolol', role: 'Comfort for often-irritated textile friction zones' },
    ],
    howToUse: [
      'Morning and evening, sweep upward from clavicle to jaw with flat palms.',
      'Include the sides of the neck and the décolleté triangle.',
      'Expect first changes in texture at four weeks, line softening at eight.',
    ],
    fullIngredients:
      'Aqua (Alpine Spring Water), Glycerin, Squalane, Cetearyl Alcohol, Glyceryl Stearate, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Ceramide NP, Cholesterol, Leontopodium Alpinum (Edelweiss) Meristem Cell Culture, Bisabolol, Tocopherol, Xanthan Gum, Sodium Benzoate, Potassium Sorbate.',
  },
  {
    slug: 'evening-ritual-set',
    name: 'The Evening Ritual Set',
    price: 240,
    category: 'Rituals',
    size: 'Three-piece night sequence',
    tagline: 'Everything the hours of ten to midnight were made for.',
    isNew: true,
    description: [
      'Night is when skin performs its deepest work, and this set choreographs it. Cleansing Nectar opens, the Luminous Overnight Mask carries renewal across the small hours, and Conditioning Lip Oil seals the edges of the conversation.',
      'Presented together because they behave differently as a company than alone — the mask spreads further over essence-damp skin, and the oil’s butters hold the mask’s humectants where they belong. A shorter ritual for people who mean it.',
    ],
    keyIngredients: [
      { name: 'Fermented Rice Lipids', role: 'Cleanse without compromise' },
      { name: 'Lactic Acid 4%', role: 'Overnight measured renewal' },
      { name: 'Murumuru Butter', role: 'Edge-sealing occlusion' },
      { name: 'Iris & Chamomile Waters', role: 'A closing note of calm' },
    ],
    howToUse: [
      'Cleanse with Nectar on dry skin; rinse warm.',
      'On twice-weekly evenings, layer the Overnight Mask generously instead of your usual cream.',
      'All other evenings: press Elixir (sold separately) or simply seal with Lip Oil.',
    ],
    fullIngredients:
      'See individual product pages within the set for complete INCI declarations. The set contains Cleansing Nectar 150 ml, Luminous Overnight Mask 50 ml and Conditioning Lip Oil 8 ml.',
  },
  {
    slug: 'morning-ritual-set',
    name: 'The Morning Ritual Set',
    price: 210,
    category: 'Rituals',
    size: 'Three-piece day sequence',
    tagline: 'A quiet start — hydration, protection, and nothing wasted.',
    description: [
      'Morning skin needs less than the industry insists. This set provides exactly three gestures: Illuminating Essence to wake the surface, Ethereal Eye Concentrate for the contour that shows the night, and Barrier Cream as the day’s armour beneath SPF or city air.',
      'Together they take ninety seconds and leave a finish that makeup artists describe as “already wearing primer.” The set exists because these three, in this order, are the routine we give friends who ask where to begin.',
    ],
    keyIngredients: [
      { name: 'Galactomyces Ferment', role: 'Morning luminosity, pressed not wiped' },
      { name: 'Peptide-9 & Caffeine', role: 'Contour de-puff and firm' },
      { name: 'Ceramide Triad', role: 'Daylong barrier integrity' },
      { name: 'Alpine Spring Water', role: 'Stability across every formula' },
    ],
    howToUse: [
      'Press Illuminating Essence into damp skin after cleansing.',
      'Trace Eye Concentrate along the orbital bone; tap with the ring finger.',
      'Finish with a pearl of Barrier Cream, pressing upward.',
    ],
    fullIngredients:
      'See individual product pages within the set for complete INCI declarations. The set contains Illuminating Essence 100 ml, Ethereal Eye Concentrate 15 ml and Barrier Cream 50 ml.',
  },
  {
    slug: 'amber-lip-balm',
    name: 'Amber Lip Balm',
    price: 38,
    category: 'Lips',
    size: '10 g',
    tagline: 'The pocket edition of care — unperfumed, unshiny, uncompromising.',
    description: [
      'Where the Lip Oil performs, Amber Balm endures. A dense, nearly tasteless balm of candelilla wax and shea for wind, altitude, air conditioning and all the flat, forgettable hours between rituals.',
      'It carries the merest warmth of amber — noticeable at application, invisible after — and sits matte, so it can precede lipstick without argument. Formulated for people whose lips chap in September and stay chapped till April.',
    ],
    keyIngredients: [
      { name: 'Unrefined Shea Butter', role: 'Deep, slow-release emollience' },
      { name: 'Candelilla Wax', role: 'Flexible, vegan occlusive structure' },
      { name: 'Meadowfoam Seed Oil', role: 'Stays put, absorbs fully' },
      { name: 'Vitamin E (sunflower)', role: 'Antioxidant + healing support' },
    ],
    howToUse: [
      'Apply as often as lips ask; there is no overuse.',
      'Layer under lipstick to prevent feathering.',
      'At bedtime, combine with Lip Oil for intensive repair.',
    ],
    fullIngredients:
      'Butyrospermum Parkii (Shea) Butter, Euphorbia Cerifera (Candelilla) Wax, Limnanthes Alba (Meadowfoam) Seed Oil, Squalane, Tocopherol, Helianthus Annuus (Sunflower) Seed Oil, Natural Amber Aroma.',
  },
]

export const categories: ('All' | ProductCategory)[] = ['All', 'Face', 'Eyes', 'Lips', 'Rituals']

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function getRelatedProducts(current: Product, count = 3): Product[] {
  const sameCategory = products.filter((p) => p.slug !== current.slug && p.category === current.category)
  const others = products.filter((p) => p.slug !== current.slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, count)
}
