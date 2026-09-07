-- =============================================
-- AUVERER Seed Data
-- Run this AFTER 002_rls_policies.sql
-- =============================================

-- =============================================
-- PRODUCTS
-- =============================================

insert into public.products (slug, name, price, category, size, tagline, is_new, description, key_ingredients, how_to_use, full_ingredients) values

('auric-collection', 'The Auric Collection', 310.00, 'Rituals', 'Four-piece ritual set', 'The complete Auvérer gesture, from first cleanse to final seal.', false,
  ARRAY[
    'The Auric Collection gathers the four formulations we consider indivisible — Cleansing Nectar, the Neutralizing Elixir, Barrier Cream and Conditioning Lip Oil — composed as a single evening sequence. Each step prepares the skin for the next, so that actives arrive where they are needed rather than where they happen to fall.',
    'It is the ritual we practice ourselves at the end of long days: unhurried, precise, and quietly transformative. Presented in a charcoal keep-case lined in ivory cotton, with each bottle numbered by batch.'
  ],
  '[
    {"name": "White Truffle Extract", "role": "Antioxidant foundation across all four steps"},
    {"name": "Fermented Camellia Oil", "role": "Lipid-mimetic softness without weight"},
    {"name": "Encapsulated Niacinamide", "role": "Even tone, released slowly over hours"},
    {"name": "Alpine Spring Water", "role": "Low-mineral base for ingredient stability"}
  ]'::jsonb,
  ARRAY[
    'Begin with Cleansing Nectar on dry skin, massaging in slow circles before emulsifying with warm water.',
    'Press two drops of the Neutralizing Elixir into damp skin, palms flat, waiting thirty seconds before continuing.',
    'Warm Barrier Cream between the fingers and press upward from the jaw. Finish with a single layer of Conditioning Lip Oil.'
  ],
  'Full ingredient declarations for each piece in the Collection are listed on its individual product page. All formulas share a base of alpine spring water, fermented camellia oleifera and cold-pressed truffle extract, and none contain synthetic fragrance, drying alcohols or occlusive silicones.'
),

('neutralizing-elixir', 'The Neutralizing Elixir', 165.00, 'Face', '30 ml', 'Our most concentrated serum — calm restored to reactive skin.', true,
  ARRAY[
    'Reactive skin does not need more stimulation; it needs a more articulate conversation. The Neutralizing Elixir pairs encapsulated niacinamide with fermented white truffle extract to interrupt the cycle of visible redness and reactivity while reinforcing the barrier that keeps irritants out.',
    'The texture is the lightest we make — a weightless veil that disappears within seconds, leaving only a finish like polished stone. It was formulated to be worn alone on compromised skin, or beneath Barrier Cream when the season turns.',
    'Every batch rests for fourteen days after blending, a quieting period our chemists call the pause, before it is bottled in amber glass and numbered by hand.'
  ],
  '[
    {"name": "Encapsulated Niacinamide 5%", "role": "Time-released tone correction"},
    {"name": "Fermented White Truffle", "role": "Antioxidant defense, softened for sensitivity"},
    {"name": "Beta-Glucan", "role": "Cortisol-soothing film former"},
    {"name": "Squalane (olive-derived)", "role": "Barrier-identical emollience"}
  ]'::jsonb,
  ARRAY[
    'Dispense three drops into clean, damp palms.',
    'Press — do not rub — into the face and neck, beginning where redness concentrates.',
    'Use morning and evening. On nights of retinoid use, apply afterward as a buffer.'
  ],
  'Aqua (Alpine Spring Water), Niacinamide, Squalane, Beta-Glucan, Tuber Magnatum (White Truffle) Ferment Filtrate, Glycerin, Panthenol, Sodium Hyaluronate (LMW), Allantoin, Tocopherol, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate.'
),

('luminous-overnight-mask', 'Luminous Overnight Mask', 145.00, 'Face', '50 ml', 'Eight hours of controlled renewal, timed to the skin''s own clock.', false,
  ARRAY[
    'Skin repairs itself at night; the mask simply refuses to let it work alone. A cushion of fermented camellia oil and slow-release lactic acid holds moisture against the skin until morning, while enzymatic exfoliation proceeds at a pace even sensitive complexions tolerate.',
    'You wake to skin that feels buffed rather than stripped — light reflected evenly, texture softened, the faint residual scent of evening iris. Twice weekly is sufficient; this is a formulation that asks for less and returns more.'
  ],
  '[
    {"name": "Fermented Camellia Oil", "role": "Overnight lipid replenishment"},
    {"name": "Lactic Acid 4%", "role": "Gentle, hydrating chemical renewal"},
    {"name": "Evening Primrose", "role": "Gamma-linolenic repair support"},
    {"name": "Iris Root Extract", "role": "Scent and soothing in one gesture"}
  ]'::jsonb,
  ARRAY[
    'Apply a generous layer as the final step of your evening ritual, twice weekly.',
    'Leave overnight; rinse or tissue off in the morning.',
    'On retinoid evenings, choose one or the other — never both.'
  ],
  'Aqua (Alpine Spring Water), Camellia Oleifera Seed Ferment, Lactic Acid, Glycerin, Oenothera Biennis (Evening Primrose) Oil, Cetearyl Alcohol, Glyceryl Stearate, Iris Germanica Root Extract, Sodium Hyaluronate, Tocopherol, Bisabolol, Xanthan Gum, Sodium Hydroxide, Sodium Benzoate.'
),

('barrier-cream', 'Barrier Cream', 110.00, 'Face', '50 ml', 'The seal — ceramides and lipids in the ratio skin recognizes.', false,
  ARRAY[
    'A barrier is architecture, and architecture is ratios. Barrier Cream delivers ceramides, cholesterol and fatty acids in the approximate 3:1:1 proportion of healthy stratum corneum, which is why it reads not as a cream sitting on the skin but as skin behaving better.',
    'Rich enough for alpine winters, breathable enough under makeup, it is the formulation most customers tell us they repurchase first. The finish is matte-satin — present, then gone.'
  ],
  '[
    {"name": "Ceramide NP, AP, EOP Complex", "role": "Barrier mortar, in physiologic ratio"},
    {"name": "Cholesterol", "role": "Completes the lipid triad"},
    {"name": "Shea Butter (unrefined)", "role": "Occlusion without congestion"},
    {"name": "Oat Lipids", "role": "Anti-itch, anti-sting comfort"}
  ]'::jsonb,
  ARRAY[
    'Warm a pearl-sized amount between fingertips.',
    'Press upward over face and neck as the final morning or evening step.',
    'In harsh weather, add a second thin layer over cheeks and around the nose.'
  ],
  'Aqua (Alpine Spring Water), Butyrospermum Parkii (Shea) Butter, Glycerin, Cetearyl Alcohol, Glyceryl Stearate, Ceramide NP, Ceramide AP, Ceramide EOP, Cholesterol, Avena Sativa (Oat) Kernel Oil, Squalane, Panthenol, Tocopherol, Phytosphingosine, Xanthan Gum, Sodium Lauroyl Lactylate, Ethylhexylglycerin.'
),

('cleansing-nectar', 'Cleansing Nectar', 85.00, 'Face', '150 ml', 'A first cleanse that behaves like a treatment.', false,
  ARRAY[
    'Most cleansers take; this one trades. Nectar dissolves sunscreen, sebum and city residue with fermented rice lipids while leaving the acid mantle intact — no squeak, no tightness, no twelve-step recovery.',
    'Emulsify with water and it becomes a milk; rinse and the skin is left at its natural pH, prepared rather than punished. It is the least dramatic product we make and the one our formulators defend most fiercely.'
  ],
  '[
    {"name": "Fermented Rice Lipids", "role": "Dissolves sebum without stripping"},
    {"name": "Camellia & Jojoba Oils", "role": "Skin-identical cleansing esters"},
    {"name": "Oat Amino Acids", "role": "pH-gentle secondary surfactancy"},
    {"name": "Chamomile Water", "role": "Calms as it cleans"}
  ]'::jsonb,
  ARRAY[
    'Massage three pumps over dry skin, eyes included.',
    'Add warm water to emulsify, then rinse thoroughly.',
    'Follow with the Neutralizing Elixir on damp skin.'
  ],
  'Aqua (Alpine Spring Water), Caprylic/Capric Triglyceride, Glycerin, Simmondsia Chinensis (Jojoba) Seed Oil, Camellia Oleifera Seed Oil, Oryza Sativa (Rice) Ferment Filtrate, Sucrose Laurate, Avena Sativa (Oat) Kernel Amino Acids, Anthemis Nobilis Flower Water, Tocopherol, Citric Acid, Sodium Benzoate, Potassium Sorbate.'
),

('eye-concentrate', 'Ethereal Eye Concentrate', 95.00, 'Eyes', '15 ml', 'For the ten millimetres of skin that age first and forgive last.', false,
  ARRAY[
    'The eye contour has almost no oil glands and the thinnest dermis on the face, which is why it keeps records. Ethereal Eye Concentrate answers with caffeine from green coffee to de-congest morning puffiness, and peptide-9, a signal complex that reminds dormant collagen to resume work.',
    'The applicator is a chilled ceramic tip; the gesture — three taps outward along the orbital bone — takes eleven seconds. Results accumulate quietly: concealer creases less, fine lines catch less light, the gaze looks rested regardless of the night it followed.'
  ],
  '[
    {"name": "Peptide-9 Complex", "role": "Collagen-signalling for firmness"},
    {"name": "Green Coffee Caffeine", "role": "Vasoconstrictive de-puffing"},
    {"name": "Albizia Julibrissin Bark", "role": "Protects periorbital microvasculature"},
    {"name": "Ceramide NP", "role": "Seals the fragile contour barrier"}
  ]'::jsonb,
  ARRAY[
    'Morning and evening, using the ceramic tip, trace along the orbital bone from inner to outer corner.',
    'Tap — never drag — remaining concentrate with the ring finger.',
    'Allow thirty seconds to absorb before makeup.'
  ],
  'Aqua (Alpine Spring Water), Glycerin, Caffeine, Albizia Julibrissin Bark Extract, Palmitoyl Tripeptide-9, Ceramide NP, Squalane, Sodium Hyaluronate, Panthenol, Tocopherol, Hydroxyethylcellulose, Citric Acid, Sodium Benzoate, Potassium Sorbate.'
),

('lip-oil', 'Conditioning Lip Oil', 45.00, 'Lips', '8 ml', 'The finishing gesture — gloss depth with treatment intent.', false,
  ARRAY[
    'Lips have no sebaceous glands at all, which makes them guests at everyone else''s table. This oil feeds them directly: camellia and murumuru butters suspended in a non-sticky ester base, with a whisper of vanilla and warm amber.',
    'Worn alone it gives a low, elegant sheen; worn over pigment it keeps colour comfortable for hours. One customer called it "the period at the end of the sentence." We have not improved on that.'
  ],
  '[
    {"name": "Camellia Oleifera Oil", "role": "Fast-absorbing foundational softness"},
    {"name": "Murumuru Butter", "role": "Long-wear flexible film"},
    {"name": "Hyaluronic Filler", "role": "Plumping low-weight hyaluronic spheres"},
    {"name": "Vanilla & Amber Accord", "role": "Natural aroma, no synthetic fragrance"}
  ]'::jsonb,
  ARRAY[
    'Apply a single layer as needed throughout the day.',
    'At night, apply a heavier coat as an overnight lip mask.',
    'Trace the outer line first, then fill — the applicator does the precision work.'
  ],
  'Camellia Oleifera Seed Oil, Hydrogenated Polyisobutene, Astrocaryum Murumuru Seed Butter, Squalane, Sodium Hyaluronate, Tocopherol, Vanilla Planifolia Fruit Extract, Natural Amber Aroma, Limnanthes Alba (Meadowfoam) Seed Oil.'
),

('illuminating-essence', 'Illuminating Essence', 125.00, 'Face', '100 ml', 'The preparatory water that makes everything after it work harder.', false,
  ARRAY[
    'An essence is not a toner; it is the first active of the ritual, applied to damp skin so that everything layered above travels further. Illuminating Essence carries fermented galactomyces and licorice-root at functional concentrations into the deeper layers while the skin is still thirsty.',
    'Pressed in with the palms — the traditional gesture — it leaves a faint luminosity that users describe as lit-from-within, a word we resisted until we saw it happen.'
  ],
  '[
    {"name": "Galactomyces Ferment 78%", "role": "Brightening amino-rich filtrate"},
    {"name": "Licorice Root (Glabridin)", "role": "Disperses pigmentation gently"},
    {"name": "Rice Water Ferment", "role": "Softens keratin build-up"},
    {"name": "Low-weight Hyaluronic Acid", "role": "Carries actives deeper"}
  ]'::jsonb,
  ARRAY[
    'After cleansing, pour into damp palms and press into the face and neck.',
    'Apply while skin is still damp — this is the whole point.',
    'Follow with serum while the surface remains tacky.'
  ],
  'Galactomyces Ferment Filtrate, Aqua (Alpine Spring Water), Oryza Sativa (Rice) Ferment Filtrate, Glycerin, Dipotassium Glycyrrhizinate, Sodium Hyaluronate, Panthenol, Beta-Glucan, Tocopherol, Citric Acid, Sodium Benzoate.'
),

('resilience-neck-cream', 'Resilience Neck & Décolleté Cream', 135.00, 'Face', '60 ml', 'Formulated for the horizontal truth between chin and collarbone.', false,
  ARRAY[
    'The neck bends twenty thousand times a day and is remembered by skincare last. Resilience is built specifically for its anatomy: a firmer molecular structure than face cream, peptides that address the platysma''s downward drift, and enough lipid to survive being slept on.',
    'Applied in upward sweeps from the clavicle, it gradually improves the look of horizontal lines and the creping that betrays décolleté skin in low necklines. Patience rewarded, visibly.'
  ],
  '[
    {"name": "Matrixyl 3000", "role": "Peptide pair for dermal density"},
    {"name": "Ceramide & Cholesterol Blend", "role": "Thicker-barrier reinforcement"},
    {"name": "Edelweiss Stem Cells", "role": "Photodamage defence for chest skin"},
    {"name": "Bisabolol", "role": "Comfort for often-irritated textile friction zones"}
  ]'::jsonb,
  ARRAY[
    'Morning and evening, sweep upward from clavicle to jaw with flat palms.',
    'Include the sides of the neck and the décolleté triangle.',
    'Expect first changes in texture at four weeks, line softening at eight.'
  ],
  'Aqua (Alpine Spring Water), Glycerin, Squalane, Cetearyl Alcohol, Glyceryl Stearate, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Ceramide NP, Cholesterol, Leontopodium Alpinum (Edelweiss) Meristem Cell Culture, Bisabolol, Tocopherol, Xanthan Gum, Sodium Benzoate, Potassium Sorbate.'
),

('evening-ritual-set', 'The Evening Ritual Set', 240.00, 'Rituals', 'Three-piece night sequence', 'Everything the hours of ten to midnight were made for.', true,
  ARRAY[
    'Night is when skin performs its deepest work, and this set choreographs it. Cleansing Nectar opens, the Luminous Overnight Mask carries renewal across the small hours, and Conditioning Lip Oil seals the edges of the conversation.',
    'Presented together because they behave differently as a company than alone — the mask spreads further over essence-damp skin, and the oil''s butters hold the mask''s humectants where they belong. A shorter ritual for people who mean it.'
  ],
  '[
    {"name": "Fermented Rice Lipids", "role": "Cleanse without compromise"},
    {"name": "Lactic Acid 4%", "role": "Overnight measured renewal"},
    {"name": "Murumuru Butter", "role": "Edge-sealing occlusion"},
    {"name": "Iris & Chamomile Waters", "role": "A closing note of calm"}
  ]'::jsonb,
  ARRAY[
    'Cleanse with Nectar on dry skin; rinse warm.',
    'On twice-weekly evenings, layer the Overnight Mask generously instead of your usual cream.',
    'All other evenings: press Elixir (sold separately) or simply seal with Lip Oil.'
  ],
  'See individual product pages within the set for complete INCI declarations. The set contains Cleansing Nectar 150 ml, Luminous Overnight Mask 50 ml and Conditioning Lip Oil 8 ml.'
),

('morning-ritual-set', 'The Morning Ritual Set', 210.00, 'Rituals', 'Three-piece day sequence', 'A quiet start — hydration, protection, and nothing wasted.', false,
  ARRAY[
    'Morning skin needs less than the industry insists. This set provides exactly three gestures: Illuminating Essence to wake the surface, Ethereal Eye Concentrate for the contour that shows the night, and Barrier Cream as the day''s armour beneath SPF or city air.',
    'Together they take ninety seconds and leave a finish that makeup artists describe as "already wearing primer." The set exists because these three, in this order, are the routine we give friends who ask where to begin.'
  ],
  '[
    {"name": "Galactomyces Ferment", "role": "Morning luminosity, pressed not wiped"},
    {"name": "Peptide-9 & Caffeine", "role": "Contour de-puff and firm"},
    {"name": "Ceramide Triad", "role": "Daylong barrier integrity"},
    {"name": "Alpine Spring Water", "role": "Stability across every formula"}
  ]'::jsonb,
  ARRAY[
    'Press Illuminating Essence into damp skin after cleansing.',
    'Trace Eye Concentrate along the orbital bone; tap with the ring finger.',
    'Finish with a pearl of Barrier Cream, pressing upward.'
  ],
  'See individual product pages within the set for complete INCI declarations. The set contains Illuminating Essence 100 ml, Ethereal Eye Concentrate 15 ml and Barrier Cream 50 ml.'
),

('amber-lip-balm', 'Amber Lip Balm', 38.00, 'Lips', '10 g', 'The pocket edition of care — unperfumed, unshiny, uncompromising.', false,
  ARRAY[
    'Where the Lip Oil performs, Amber Balm endures. A dense, nearly tasteless balm of candelilla wax and shea for wind, altitude, air conditioning and all the flat, forgettable hours between rituals.',
    'It carries the merest warmth of amber — noticeable at application, invisible after — and sits matte, so it can precede lipstick without argument. Formulated for people whose lips chap in September and stay chapped till April.'
  ],
  '[
    {"name": "Unrefined Shea Butter", "role": "Deep, slow-release emollience"},
    {"name": "Candelilla Wax", "role": "Flexible, vegan occlusive structure"},
    {"name": "Meadowfoam Seed Oil", "role": "Stays put, absorbs fully"},
    {"name": "Vitamin E (sunflower)", "role": "Antioxidant + healing support"}
  ]'::jsonb,
  ARRAY[
    'Apply as often as lips ask; there is no overuse.',
    'Layer under lipstick to prevent feathering.',
    'At bedtime, combine with Lip Oil for intensive repair.'
  ],
  'Butyrospermum Parkii (Shea) Butter, Euphorbia Cerifera (Candelilla) Wax, Limnanthes Alba (Meadowfoam) Seed Oil, Squalane, Tocopherol, Helianthus Annuus (Sunflower) Seed Oil, Natural Amber Aroma.'
);

-- =============================================
-- ARTICLES
-- =============================================

insert into public.articles (slug, title, category, excerpt, author, role, date, read_time, body) values

('the-case-for-a-slower-evening-ritual', 'The Case for a Slower Evening Ritual', 'Ritual', 'Ninety seconds is a marketing figure. The skin does not keep time; it keeps attention.', 'Margaux Delacroix', 'Editor-at-Large', 'March 2025', '6 min read',
  '[
    {"type": "p", "text": "There is a version of the evening skincare routine that has been optimized to death: cleanser in one hand, serum in the other, thirty seconds flat, lights off, sleep. It is efficient. It is also, we would argue, missing the entire point of why the ritual exists at all."},
    {"type": "p", "text": "Skin does not know clocks. What it responds to is consistency and contact: warmth, pressure, the parasympathetic shift that happens when you slow your hands down long enough for your breath to follow. The clinical literature on massage-assisted absorption is thin; the literature on stress and barrier function is not. Cortisol compromises the barrier. An evening ritual that lowers cortisol is, by extension, a treatment."},
    {"type": "quote", "text": "The ritual is not preparation for rest. It is the first hour of it."},
    {"type": "p", "text": "We design our formulations for unhurried hands. The Neutralizing Elixir asks to be pressed, not rubbed, with a full thirty seconds of palm contact before the next step begins. The Overnight Mask spreads further over damp skin, which means waiting a moment after cleansing instead of rushing through it. These are not aesthetic preferences. They are instructions the products only work if you follow."},
    {"type": "p", "text": "So this is the case, plainly made: give the last ritual of the day ninety seconds more than you think it deserves. Warm the cream between your fingers before it meets your face. Work upward from the jaw as though the evening mattered. The skin will take what it needs either way, but you will take something too, and it is not nothing."}
  ]'::jsonb),

('understanding-retinol-alternatives', 'Understanding Retinol Alternatives', 'Science', 'Bakuchiol, peptides and fermentation: what the evidence actually says about gentler renewal.', 'Dr. Amara Osei', 'Formulation Director', 'February 2025', '8 min read',
  '[
    {"type": "p", "text": "Retinol remains the most studied molecule in cosmetic science, and nothing in this essay should be read as a case against it. But a significant number of people cannot tolerate it: pregnancy, rosacea, eczema, or simply the unremitting peeling that some skins never acclimate past. For them, the alternatives deserve an honest accounting rather than marketing shorthand."},
    {"type": "p", "text": "Bakuchiol is the most credible. Derived from the seeds of Psoralea corylifolia, it was shown in a 2019 comparative study to deliver statistically similar improvements in pigmentation and line depth after twelve weeks, with meaningfully less peeling and stinging. Its mechanism differs, modulating gene expression rather than binding retinoic receptors, which may explain its gentler profile. We consider it fully earned."},
    {"type": "quote", "text": "Gentle does not mean weak. It means the formulation was engineered to be finished."},
    {"type": "p", "text": "Peptides work differently still: rather than accelerating turnover, they signal. Matrixyl 3000, the palmitoyl tripeptide pair we use in Resilience, nudges fibroblasts toward collagen synthesis without ever asking the surface to shed. Results arrive later than retinol, closer to eight weeks than four, and they arrive without incident. For reactive complexions, later and calm usually wins."},
    {"type": "p", "text": "Fermented actives are the third path, and the least understood. Fermentation reduces the molecular weight of botanical extracts and pre-digests their sugars, improving penetration while lowering the immune system''s inclination to object. Our galactomyces essence carries a high ferment concentration precisely because the ferment does work that raw ingredients cannot."},
    {"type": "p", "text": "The honest conclusion: none of these is simply as good as retinol. They are good in ways retinol is not: usable every night, compatible with compromised barriers, silent on the pillow. The best routine is the one your skin can sustain for years, not the one that impresses a molecule counter."}
  ]'::jsonb),

('why-we-formulate-at-night', 'Why We Formulate at Night', 'Ingredients', 'Every Auvérer formula is blended after dark. This is chemistry''s reason, not romance''s.', 'Margaux Delacroix', 'Editor-at-Large', 'January 2025', '5 min read',
  '[
    {"type": "p", "text": "Visitors to our laboratory in Grasse are often surprised by the hours kept there. Blending begins at dusk and ends, at the latest, by ten in the evening. The reason is thermal, not theatrical: emulsions are sensitive to temperature swings, and Provençal afternoons push the workshop several degrees warmer than the band within which our stabilizers behave predictably."},
    {"type": "p", "text": "There is a second, less measurable reason. Formulation is a series of judgments made in fifteen-second windows: when to cut the homogenizer, when the phase inversion has completed, whether the sheen of the base is right. Those judgments degrade with fatigue and distraction the way any fine craft does. Night in a quiet building is simply where our chemists make fewer errors."},
    {"type": "quote", "text": "A formula blended calmly carries the calm forward into the skin. We have never proved this. We believe it anyway."},
    {"type": "p", "text": "The practical upshot for the person holding the bottle: each batch was made in conditions chosen for precision, rested for fourteen days, and released only when its profile matched the memory of the first. Consistency at this level is not an accident of scale. It is a schedule."}
  ]'::jsonb),

('the-quiet-chemistry-of-camellia', 'The Quiet Chemistry of Camellia', 'Ingredients', 'The winter-flowering blossom behind nearly every formula we make, and why we ferment it.', 'Dr. Amara Osei', 'Formulation Director', 'December 2024', '6 min read',
  '[
    {"type": "p", "text": "Camellia oleifera blooms in winter, which is the first clue to its character. A plant that flowers in the cold is a plant engineered by centuries of selection to protect its own lipids from damage. Cold-pressed from its seeds, camellia oil is unusually rich in oleic acid and natural tocopherols, and it oxidizes more slowly than almost any cosmetic oil we have worked with."},
    {"type": "p", "text": "That stability matters more than poetry. An oil that resists oxidation carries its antioxidant payload intact to the skin instead of spending it defending the bottle. Geishas of Kyoto historically used camellia for exactly this reason, cleaning and conditioning hair and skin through bitter winters with a single amber vial. We inherited the ingredient; we did not invent its credentials."},
    {"type": "quote", "text": "We do not ask plants to be miracles. We ask them to be themselves, thoroughly."},
    {"type": "p", "text": "Our contribution is fermentation. In collaboration with a laboratory in Kyoto, we ferment the pressed oil with a lactobacillus strain for eleven days. The ferment shortens the triglyceride chains into smaller, skin-friendlier esters and multiplies the free fatty acid content, which is why fermented camellia absorbs in seconds where the raw oil can sit heavily for an hour."},
    {"type": "p", "text": "You will find it across the collection: in the Nectar as a cleansing ester, in the Overnight Mask as the renewal vehicle, in the Lip Oil as the foundation. One plant, one process, many gestures. This is what we mean when we say restraint is a formulation strategy and not only an aesthetic one."}
  ]'::jsonb),

('sourcing-the-extraordinary', 'Sourcing the Extraordinary', 'Ingredients', 'White truffle, alpine water and the long conversations behind every raw material we accept.', 'Margaux Delacroix', 'Editor-at-Large', 'November 2024', '7 min read',
  '[
    {"type": "p", "text": "The white truffle in our Elixir arrives from a single family of truffle hunters in Piedmont, with whom our formulation director has negotiated every November for six years. There are no contracts worth the paper at that altitude; there is only whether the season was honest and whether we paid fairly for it. The extract that reaches Grasse costs more per kilo than most finished creams. We use it anyway, at a functional concentration, because diluting it would make the story false."},
    {"type": "p", "text": "Water is the least glamorous ingredient and the most abundant one, occupying most of any emulsion. Ours is drawn from an alpine source whose mineral profile is low enough that it never interferes with actives. Most brands treat water as a filler. We treat it as a solvent whose purity decides how much of everything else survives."},
    {"type": "quote", "text": "A supply chain you cannot visit is a supply chain you cannot vouch for."},
    {"type": "p", "text": "Every material enters the laboratory with a dossier: harvest region, extraction method, contaminant screening, and the name of a person we have met who is accountable for all three. Roughly one material in nine is rejected after trial, usually for instability rather than efficacy. What remains is short enough to memorize, which is the point."},
    {"type": "p", "text": "This is unglamorous work described without glamour. But luxury, as we understand it, is mostly traceability wearing beautiful clothes: knowing precisely what touched your skin, who grew it, and why it was chosen over something cheaper. Everything else is packaging."}
  ]'::jsonb),

('what-we-mean-by-restraint', 'What We Mean by Restraint', 'Living', 'Fewer products, deeper formulas, longer relationships: a philosophy measured in subtraction.', 'Elena Vance', 'Creative Director', 'November 2024', '5 min read',
  '[
    {"type": "p", "text": "Restraint has become a marketing word, which is a pity, because the thing itself is difficult. Real restraint in skincare looks like refusing to launch a category everyone is asking for. It looks like a shelf of twelve formulations rather than forty, each one revised for years before release. It looks like telling a customer, occasionally, to buy less than they intended."},
    {"type": "p", "text": "The industry default is addition: another step, another hero molecule, another limited edition. Addition is easy to sell and exhausting to live with. Skin does not experience routines as marketing narratives; it experiences them as cumulative chemical exposure. A routine of fifteen products asks the barrier to negotiate fifteen surfactant systems, fifteen preservative panels, fifteen chances for interaction. A routine of four asks four times well."},
    {"type": "quote", "text": "We would rather be someone''s second year than their first month."},
    {"type": "p", "text": "Subtraction is harder to market but kinder to keep. When we designed the Evening Ritual Set, the internal argument was not what to include but what we could responsibly remove. Three pieces survived. The set sells steadily and returns quietly, which is the only metric we have come to trust."},
    {"type": "p", "text": "Practice this anywhere: in the bathroom cabinet, certainly, but also the calendar, the wardrobe, the feed. Fewer acts, deeper intention. It is the whole philosophy, and it fits in one sentence because it had to."}
  ]'::jsonb),

('minimalism-as-a-skincare-philosophy', 'Minimalism as a Skincare Philosophy', 'Living', 'Why your vanity, and your complexion, thrive on less but better.', 'Elena Vance', 'Creative Director', 'October 2024', '4 min read',
  '[
    {"type": "p", "text": "A crowded vanity is rarely a sign of abundance. Look closely and it is usually a museum of disappointments: the serum that stung, the cream that pilled under makeup, the mask bought on a Tuesday night that promised Wednesday morning. Minimalism begins when you admit the museum has no curatorial standard."},
    {"type": "p", "text": "The discipline we recommend is simple and unforgiving. Keep what your skin would notice missing within a week. Retire everything else without ceremony. Most people discover they need a cleanser, one treatment, one barrier cream and one eye gesture. The rest was habit wearing aspiration."},
    {"type": "quote", "text": "Edit the shelf and the shelf edits you back."},
    {"type": "p", "text": "What remains after a real edit behaves differently. Products are used to completion rather than abandonment, which means actives reach their clinical horizon instead of stalling at week three when the novelty dies. Consistency, the least exciting variable, turns out to be the load-bearing one."},
    {"type": "p", "text": "We build every Auvérer formulation to deserve a place in that shortened list. If a product cannot justify its position within a disciplined ritual, it does not ship, whatever its margin. That rule has cost us launches. It has saved the collection."}
  ]'::jsonb),

('the-architecture-of-a-barrier', 'The Architecture of a Barrier', 'Science', 'Bricks, mortar and the 3:1:1 ratio that decides whether your skin holds or leaks.', 'Dr. Amara Osei', 'Formulation Director', 'October 2024', '7 min read',
  '[
    {"type": "p", "text": "Picture the stratum corneum as a wall: corneocyte cells are the bricks, and the lipid matrix between them is the mortar. When the mortar is intact, water stays in and irritants stay out, and the skin performs its thousand silent duties unnoticed. When the mortar thins, everything announces itself: tightness, sting, redness that arrives for reasons no one can name."},
    {"type": "p", "text": "The mortar has a composition, and the composition has a ratio. Physiologically healthy barrier lipid is roughly three parts ceramides to one part cholesterol to one part fatty acids. Formulate far from that ratio and you may moisturize the surface while starving the structure beneath. Barrier Cream exists because we could not find a commercial cream that respected the arithmetic."},
    {"type": "quote", "text": "Moisture is a feeling. Barrier integrity is a fact. Luxury should deliver both and confuse neither."},
    {"type": "p", "text": "Damage repair follows rules too. The barrier regenerates its lipid matrix fastest during sleep, which is why evening application of ceramide-dense formulas outperforms identical morning use in controlled comparison. Occlusion helps, but only modestly: sealing water in matters less than supplying the materials the overnight rebuild actually requires."},
    {"type": "p", "text": "Practical translation: if your skin stings when you apply products that used to feel neutral, your mortar is thin. Simplify immediately, add a physiologic-ratio lipid complex, and give the architecture three quiet weeks. Walls rebuilt in haste fall in haste. Skin is no different, only faster."}
  ]'::jsonb),

('in-praise-of-the-unhurried-morning', 'In Praise of the Unhurried Morning', 'Ritual', 'A defence of the ninety seconds nobody can take from you, practiced before the world wakes.', 'Margaux Delacroix', 'Editor-at-Large', 'September 2024', '4 min read',
  '[
    {"type": "p", "text": "There is a moment, somewhere between the kettle and the first obligation, that belongs to no one else. The unhurried morning ritual claims it deliberately: three minutes of warm water, clean scent and small precise movements before any screen, any voice, any demand. Practiced daily it becomes an anchor so reliable that bad mornings bend around it rather than erase it."},
    {"type": "p", "text": "The skin benefits are real but secondary. Pressing essence into damp skin while the light is still grey is absorption done properly. But the primary product of those minutes is orientation: a reminder, issued to yourself before anyone else can issue theirs, that the day belongs to you first."},
    {"type": "quote", "text": "Luxury is not abundance. Luxury is one hour, perfectly kept."},
    {"type": "p", "text": "Begin smaller than feels meaningful. One minute of silence before the phone. Cleansing done standing upright rather than leaning, as though the face were worth attending to. Cream warmed between the palms until it disappears. The ritual will grow on its own once it has proven it belongs."},
    {"type": "p", "text": "We make skincare for this hour specifically. Every texture is tested against half-awake hands; every scent is calibrated to rise rather than shock. If the products help you keep the hour, they have done their full work. The complexion improvements are, genuinely, a bonus."}
  ]'::jsonb);

-- =============================================
-- STOCKISTS
-- =============================================

insert into public.stockists (name, city, region, address) values
('Maison Verte Apothecary', 'Paris, France', 'Europe', '18 Rue de Sévigné, 75004 Paris'),
('Apothek am Lindenbaum', 'Berlin, Germany', 'Europe', 'Kastanienallee 42, 10435 Berlin'),
('The Still Room', 'London, United Kingdom', 'Europe', '7 Chiltern Street, Marylebone, London W1U'),
('Salone di Bellezza Novecento', 'Milan, Italy', 'Europe', 'Via Solferino 11, 20121 Milano'),
('Meridian Beauty Hall', 'New York, USA', 'North America', '412 Bleecker Street, New York, NY 10014'),
('Atelier Cinq Rues', 'Montréal, Canada', 'North America', '215 Rue Bernard O, Montréal QC H2T'),
('Juniper & Fern', 'San Francisco, USA', 'North America', '1846 Union Street, San Francisco, CA 94123'),
('Kōyō Select Shop', 'Tokyo, Japan', 'Asia-Pacific', '2-7-5 Jingūmae, Shibuya City, Tokyo 150-0001'),
('The Hourglass Boutique', 'Sydney, Australia', 'Asia-Pacific', '44A Glenmore Road, Paddington NSW 2021'),
('Verre & Sel', 'Copenhagen, Denmark', 'Europe', 'Store Kongensgade 62, 1264 København K');
