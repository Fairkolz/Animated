export type ArticleCategory = 'Ritual' | 'Ingredients' | 'Science' | 'Living'

export type ArticleBlock = { type: 'p' | 'quote'; text: string }

export type Article = {
  slug: string
  title: string
  category: ArticleCategory
  excerpt: string
  author: string
  role: string
  date: string
  readTime: string
  body: ArticleBlock[]
}

export const articles: Article[] = [
  {
    slug: 'the-case-for-a-slower-evening-ritual',
    title: 'The Case for a Slower Evening Ritual',
    category: 'Ritual',
    excerpt:
      'Ninety seconds is a marketing figure. The skin does not keep time; it keeps attention.',
    author: 'Margaux Delacroix',
    role: 'Editor-at-Large',
    date: 'March 2025',
    readTime: '6 min read',
    body: [
      { type: 'p', text: 'There is a version of the evening skincare routine that has been optimized to death: cleanser in one hand, serum in the other, thirty seconds flat, lights off, sleep. It is efficient. It is also, we would argue, missing the entire point of why the ritual exists at all.' },
      { type: 'p', text: 'Skin does not know clocks. What it responds to is consistency and contact: warmth, pressure, the parasympathetic shift that happens when you slow your hands down long enough for your breath to follow. The clinical literature on massage-assisted absorption is thin; the literature on stress and barrier function is not. Cortisol compromises the barrier. An evening ritual that lowers cortisol is, by extension, a treatment.' },
      { type: 'quote', text: 'The ritual is not preparation for rest. It is the first hour of it.' },
      { type: 'p', text: 'We design our formulations for unhurried hands. The Neutralizing Elixir asks to be pressed, not rubbed, with a full thirty seconds of palm contact before the next step begins. The Overnight Mask spreads further over damp skin, which means waiting a moment after cleansing instead of rushing through it. These are not aesthetic preferences. They are instructions the products only work if you follow.' },
      { type: 'p', text: 'So this is the case, plainly made: give the last ritual of the day ninety seconds more than you think it deserves. Warm the cream between your fingers before it meets your face. Work upward from the jaw as though the evening mattered. The skin will take what it needs either way, but you will take something too, and it is not nothing.' },
    ],
  },
  {
    slug: 'understanding-retinol-alternatives',
    title: 'Understanding Retinol Alternatives',
    category: 'Science',
    excerpt:
      'Bakuchiol, peptides and fermentation: what the evidence actually says about gentler renewal.',
    author: 'Dr. Amara Osei',
    role: 'Formulation Director',
    date: 'February 2025',
    readTime: '8 min read',
    body: [
      { type: 'p', text: 'Retinol remains the most studied molecule in cosmetic science, and nothing in this essay should be read as a case against it. But a significant number of people cannot tolerate it: pregnancy, rosacea, eczema, or simply the unremitting peeling that some skins never acclimate past. For them, the alternatives deserve an honest accounting rather than marketing shorthand.' },
      { type: 'p', text: 'Bakuchiol is the most credible. Derived from the seeds of Psoralea corylifolia, it was shown in a 2019 comparative study to deliver statistically similar improvements in pigmentation and line depth after twelve weeks, with meaningfully less peeling and stinging. Its mechanism differs, modulating gene expression rather than binding retinoic receptors, which may explain its gentler profile. We consider it fully earned.' },
      { type: 'quote', text: 'Gentle does not mean weak. It means the formulation was engineered to be finished.' },
      { type: 'p', text: 'Peptides work differently still: rather than accelerating turnover, they signal. Matrixyl 3000, the palmitoyl tripeptide pair we use in Resilience, nudges fibroblasts toward collagen synthesis without ever asking the surface to shed. Results arrive later than retinol, closer to eight weeks than four, and they arrive without incident. For reactive complexions, later and calm usually wins.' },
      { type: 'p', text: 'Fermented actives are the third path, and the least understood. Fermentation reduces the molecular weight of botanical extracts and pre-digests their sugars, improving penetration while lowering the immune system\u2019s inclination to object. Our galactomyces essence carries a high ferment concentration precisely because the ferment does work that raw ingredients cannot.' },
      { type: 'p', text: 'The honest conclusion: none of these is simply as good as retinol. They are good in ways retinol is not: usable every night, compatible with compromised barriers, silent on the pillow. The best routine is the one your skin can sustain for years, not the one that impresses a molecule counter.' },
    ],
  },
  {
    slug: 'why-we-formulate-at-night',
    title: 'Why We Formulate at Night',
    category: 'Ingredients',
    excerpt:
      'Every Auvérer formula is blended after dark. This is chemistry\u2019s reason, not romance\u2019s.',
    author: 'Margaux Delacroix',
    role: 'Editor-at-Large',
    date: 'January 2025',
    readTime: '5 min read',
    body: [
      { type: 'p', text: 'Visitors to our laboratory in Grasse are often surprised by the hours kept there. Blending begins at dusk and ends, at the latest, by ten in the evening. The reason is thermal, not theatrical: emulsions are sensitive to temperature swings, and Provençal afternoons push the workshop several degrees warmer than the band within which our stabilizers behave predictably.' },
      { type: 'p', text: 'There is a second, less measurable reason. Formulation is a series of judgments made in fifteen-second windows: when to cut the homogenizer, when the phase inversion has completed, whether the sheen of the base is right. Those judgments degrade with fatigue and distraction the way any fine craft does. Night in a quiet building is simply where our chemists make fewer errors.' },
      { type: 'quote', text: 'A formula blended calmly carries the calm forward into the skin. We have never proved this. We believe it anyway.' },
      { type: 'p', text: 'The practical upshot for the person holding the bottle: each batch was made in conditions chosen for precision, rested for fourteen days, and released only when its profile matched the memory of the first. Consistency at this level is not an accident of scale. It is a schedule.' },
    ],
  },
  {
    slug: 'the-quiet-chemistry-of-camellia',
    title: 'The Quiet Chemistry of Camellia',
    category: 'Ingredients',
    excerpt:
      'The winter-flowering blossom behind nearly every formula we make, and why we ferment it.',
    author: 'Dr. Amara Osei',
    role: 'Formulation Director',
    date: 'December 2024',
    readTime: '6 min read',
    body: [
      { type: 'p', text: 'Camellia oleifera blooms in winter, which is the first clue to its character. A plant that flowers in the cold is a plant engineered by centuries of selection to protect its own lipids from damage. Cold-pressed from its seeds, camellia oil is unusually rich in oleic acid and natural tocopherols, and it oxidizes more slowly than almost any cosmetic oil we have worked with.' },
      { type: 'p', text: 'That stability matters more than poetry. An oil that resists oxidation carries its antioxidant payload intact to the skin instead of spending it defending the bottle. Geishas of Kyoto historically used camellia for exactly this reason, cleaning and conditioning hair and skin through bitter winters with a single amber vial. We inherited the ingredient; we did not invent its credentials.' },
      { type: 'quote', text: 'We do not ask plants to be miracles. We ask them to be themselves, thoroughly.' },
      { type: 'p', text: 'Our contribution is fermentation. In collaboration with a laboratory in Kyoto, we ferment the pressed oil with a lactobacillus strain for eleven days. The ferment shortens the triglyceride chains into smaller, skin-friendlier esters and multiplies the free fatty acid content, which is why fermented camellia absorbs in seconds where the raw oil can sit heavily for an hour.' },
      { type: 'p', text: 'You will find it across the collection: in the Nectar as a cleansing ester, in the Overnight Mask as the renewal vehicle, in the Lip Oil as the foundation. One plant, one process, many gestures. This is what we mean when we say restraint is a formulation strategy and not only an aesthetic one.' },
    ],
  },
  {
    slug: 'sourcing-the-extraordinary',
    title: 'Sourcing the Extraordinary',
    category: 'Ingredients',
    excerpt:
      'White truffle, alpine water and the long conversations behind every raw material we accept.',
    author: 'Margaux Delacroix',
    role: 'Editor-at-Large',
    date: 'November 2024',
    readTime: '7 min read',
    body: [
      { type: 'p', text: 'The white truffle in our Elixir arrives from a single family of truffle hunters in Piedmont, with whom our formulation director has negotiated every November for six years. There are no contracts worth the paper at that altitude; there is only whether the season was honest and whether we paid fairly for it. The extract that reaches Grasse costs more per kilo than most finished creams. We use it anyway, at a functional concentration, because diluting it would make the story false.' },
      { type: 'p', text: 'Water is the least glamorous ingredient and the most abundant one, occupying most of any emulsion. Ours is drawn from an alpine source whose mineral profile is low enough that it never interferes with actives. Most brands treat water as a filler. We treat it as a solvent whose purity decides how much of everything else survives.' },
      { type: 'quote', text: 'A supply chain you cannot visit is a supply chain you cannot vouch for.' },
      { type: 'p', text: 'Every material enters the laboratory with a dossier: harvest region, extraction method, contaminant screening, and the name of a person we have met who is accountable for all three. Roughly one material in nine is rejected after trial, usually for instability rather than efficacy. What remains is short enough to memorize, which is the point.' },
      { type: 'p', text: 'This is unglamorous work described without glamour. But luxury, as we understand it, is mostly traceability wearing beautiful clothes: knowing precisely what touched your skin, who grew it, and why it was chosen over something cheaper. Everything else is packaging.' },
    ],
  },
  {
    slug: 'what-we-mean-by-restraint',
    title: 'What We Mean by Restraint',
    category: 'Living',
    excerpt:
      'Fewer products, deeper formulas, longer relationships: a philosophy measured in subtraction.',
    author: 'Elena Vance',
    role: 'Creative Director',
    date: 'November 2024',
    readTime: '5 min read',
    body: [
      { type: 'p', text: 'Restraint has become a marketing word, which is a pity, because the thing itself is difficult. Real restraint in skincare looks like refusing to launch a category everyone is asking for. It looks like a shelf of twelve formulations rather than forty, each one revised for years before release. It looks like telling a customer, occasionally, to buy less than they intended.' },
      { type: 'p', text: 'The industry default is addition: another step, another hero molecule, another limited edition. Addition is easy to sell and exhausting to live with. Skin does not experience routines as marketing narratives; it experiences them as cumulative chemical exposure. A routine of fifteen products asks the barrier to negotiate fifteen surfactant systems, fifteen preservative panels, fifteen chances for interaction. A routine of four asks four times well.' },
      { type: 'quote', text: 'We would rather be someone\u2019s second year than their first month.' },
      { type: 'p', text: 'Subtraction is harder to market but kinder to keep. When we designed the Evening Ritual Set, the internal argument was not what to include but what we could responsibly remove. Three pieces survived. The set sells steadily and returns quietly, which is the only metric we have come to trust.' },
      { type: 'p', text: 'Practice this anywhere: in the bathroom cabinet, certainly, but also the calendar, the wardrobe, the feed. Fewer acts, deeper intention. It is the whole philosophy, and it fits in one sentence because it had to.' },
    ],
  },
  {
    slug: 'minimalism-as-a-skincare-philosophy',
    title: 'Minimalism as a Skincare Philosophy',
    category: 'Living',
    excerpt:
      'Why your vanity, and your complexion, thrive on less but better.',
    author: 'Elena Vance',
    role: 'Creative Director',
    date: 'October 2024',
    readTime: '4 min read',
    body: [
      { type: 'p', text: 'A crowded vanity is rarely a sign of abundance. Look closely and it is usually a museum of disappointments: the serum that stung, the cream that pilled under makeup, the mask bought on a Tuesday night that promised Wednesday morning. Minimalism begins when you admit the museum has no curatorial standard.' },
      { type: 'p', text: 'The discipline we recommend is simple and unforgiving. Keep what your skin would notice missing within a week. Retire everything else without ceremony. Most people discover they need a cleanser, one treatment, one barrier cream and one eye gesture. The rest was habit wearing aspiration.' },
      { type: 'quote', text: 'Edit the shelf and the shelf edits you back.' },
      { type: 'p', text: 'What remains after a real edit behaves differently. Products are used to completion rather than abandonment, which means actives reach their clinical horizon instead of stalling at week three when the novelty dies. Consistency, the least exciting variable, turns out to be the load-bearing one.' },
      { type: 'p', text: 'We build every Auvérer formulation to deserve a place in that shortened list. If a product cannot justify its position within a disciplined ritual, it does not ship, whatever its margin. That rule has cost us launches. It has saved the collection.' },
    ],
  },
  {
    slug: 'the-architecture-of-a-barrier',
    title: 'The Architecture of a Barrier',
    category: 'Science',
    excerpt:
      'Bricks, mortar and the 3:1:1 ratio that decides whether your skin holds or leaks.',
    author: 'Dr. Amara Osei',
    role: 'Formulation Director',
    date: 'October 2024',
    readTime: '7 min read',
    body: [
      { type: 'p', text: 'Picture the stratum corneum as a wall: corneocyte cells are the bricks, and the lipid matrix between them is the mortar. When the mortar is intact, water stays in and irritants stay out, and the skin performs its thousand silent duties unnoticed. When the mortar thins, everything announces itself: tightness, sting, redness that arrives for reasons no one can name.' },
      { type: 'p', text: 'The mortar has a composition, and the composition has a ratio. Physiologically healthy barrier lipid is roughly three parts ceramides to one part cholesterol to one part fatty acids. Formulate far from that ratio and you may moisturize the surface while starving the structure beneath. Barrier Cream exists because we could not find a commercial cream that respected the arithmetic.' },
      { type: 'quote', text: 'Moisture is a feeling. Barrier integrity is a fact. Luxury should deliver both and confuse neither.' },
      { type: 'p', text: 'Damage repair follows rules too. The barrier regenerates its lipid matrix fastest during sleep, which is why evening application of ceramide-dense formulas outperforms identical morning use in controlled comparison. Occlusion helps, but only modestly: sealing water in matters less than supplying the materials the overnight rebuild actually requires.' },
      { type: 'p', text: 'Practical translation: if your skin stings when you apply products that used to feel neutral, your mortar is thin. Simplify immediately, add a physiologic-ratio lipid complex, and give the architecture three quiet weeks. Walls rebuilt in haste fall in haste. Skin is no different, only faster.' },
    ],
  },
  {
    slug: 'in-praise-of-the-unhurried-morning',
    title: 'In Praise of the Unhurried Morning',
    category: 'Ritual',
    excerpt:
      'A defence of the ninety seconds nobody can take from you, practiced before the world wakes.',
    author: 'Margaux Delacroix',
    role: 'Editor-at-Large',
    date: 'September 2024',
    readTime: '4 min read',
    body: [
      { type: 'p', text: 'There is a moment, somewhere between the kettle and the first obligation, that belongs to no one else. The unhurried morning ritual claims it deliberately: three minutes of warm water, clean scent and small precise movements before any screen, any voice, any demand. Practiced daily it becomes an anchor so reliable that bad mornings bend around it rather than erase it.' },
      { type: 'p', text: 'The skin benefits are real but secondary. Pressing essence into damp skin while the light is still grey is absorption done properly. But the primary product of those minutes is orientation: a reminder, issued to yourself before anyone else can issue theirs, that the day belongs to you first.' },
      { type: 'quote', text: 'Luxury is not abundance. Luxury is one hour, perfectly kept.' },
      { type: 'p', text: 'Begin smaller than feels meaningful. One minute of silence before the phone. Cleansing done standing upright rather than leaning, as though the face were worth attending to. Cream warmed between the palms until it disappears. The ritual will grow on its own once it has proven it belongs.' },
      { type: 'p', text: 'We make skincare for this hour specifically. Every texture is tested against half-awake hands; every scent is calibrated to rise rather than shock. If the products help you keep the hour, they have done their full work. The complexion improvements are, genuinely, a bonus.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export const articleCategories: ('All' | ArticleCategory)[] = ['All', 'Ritual', 'Ingredients', 'Science', 'Living']
