# Auvérer Full Site Redesign Brief
Target: 10/10 — "$10,000 website" bar. Hero and current dark/amber mood stay. Everything else is
redesigned from scratch to this spec, then extended into a full multi-page site.

---

## 1. The 10/10 Quality Bar (non-negotiable rules)

These apply to every page, every section, no exceptions:

1. **Zero placeholder residue.** No lorem ipsum, no duplicate labels, no misspelled ingredient names,
   no repeated identical callout boxes. Every word on the page is final-intent copy.
2. **One visual world.** Every photo/render shares the same color grade — deep charcoal, champagne
   gold, warm amber highlights. No bright-daylight stock photography, no clashing color temperatures.
3. **One corner system.** Sharp corners (0px border-radius) everywhere, with exactly one deliberate
   exception: filter/tag pills may be rounded, since that's a functional UI convention, not a brand
   statement. No other exceptions without explicit sign-off.
4. **Motion has a reason.** Every animation is chosen for what it communicates (arrival, revelation,
   transformation), not decoration. If a section's motion can't be explained in one sentence, cut it.
5. **Copy has a voice.** No generic skincare-marketing phrasing ("clinical-grade formulas," "beautiful
   results"). Every headline should sound like it could only belong to Auvérer.
6. **Sections build a narrative arc.** The landing page is read top to bottom like a story: arrival →
   belief → proof → ritual → invitation. Not a list of disconnected modules.
7. **Consistency holds across pages**, not just within the homepage. Product pages, About, Journal all
   meet the same bar — a $10k site doesn't have a beautiful homepage and a generic everything-else.

---

## 2. Full Sitemap

Based on the nav structure (Shop / Collections / Philosophy / Journal / About), the full site is:

```
/                       Home (landing page — full spec below)
/collections            All products, filterable grid
/collections/[product]  Individual product detail page
/philosophy             Brand story, formulation philosophy, standards
/journal                Editorial content index
/journal/[article]      Individual journal article
/about                  Company story, founder note, values
/stockists              Where to buy (if applicable)
/contact                Contact / customer care
```

Each of these gets its own brief once the landing page is locked — flagged as Phase 2 below.

---

## 3. Landing Page — Section-by-Section Spec

Hero stays as-is. Everything below is new, ordered to build a narrative arc rather than list features.

### Section 1: Hero — UNCHANGED
Keep current build. This is already working.

### Section 2: The Belief (replaces generic "Our Collections" intro)
- **Purpose:** State the brand's point of view before selling anything. This is where voice gets
  established — the reader should feel like they've met a person, not a catalog.
- **Content:** Short manifesto-style statement (2-3 sentences max), oversized serif typography,
  generous negative space. No product imagery — just conviction.
- **Motion style:** #1 Independent reveal (fade + slight upward translate), single trigger, no scrub.
- **Reference:** Similar restraint to your current "Manifesto" section, but must actually contain
  the copy this time (that section was empty in the last build).

### Section 3: The Ritual (editorial triptych)
- **Purpose:** Show the product in use, editorially — not as a product shot, as a mood.
- **Content:** 3-image asymmetric grid (like the Framer reference's "Edit" section), each image a
  different moment in a skincare ritual. Short caption per image, numbered (01/02/03).
- **Motion style:** #1 Independent reveal, staggered — each image enters ~150ms after the previous.
- **Image direction:** Must match hero's color grade — warm, low-key lighting, amber/charcoal tones.
  No bright studio-white backgrounds.

### Section 4: The Formulation (nature meets science, rebuilt)
- **Purpose:** Build credibility — why the product works, not just that it's luxurious.
- **Content:** Product bottle on stone pedestal (keep this visual device, it's strong), paired with
  3-4 real formulation facts (not generic "clinically proven" — actual specifics: percentages,
  named actives, mechanism).
- **Motion style:** #6 Sticky/pinned text with changing visual — text stays fixed, ingredient callouts
  crossfade as user scrolls through 3-4 facts.
- **Fix from reference:** the "Niacinamade" triple-duplicate callout bug — each callout must be a
  distinct, real ingredient claim.

### Section 5: The Collection (bestsellers, filterable)
- **Purpose:** First real product-browsing moment.
- **Content:** Filter pills (Skincare/Lips/Eyes/Face — these may be rounded, per the one exception),
  asymmetric product grid matching the reference's layout logic (one large + stacked smaller shots).
- **Motion style:** #1 Independent reveal on scroll-in; filter switching uses a quick crossfade,
  not a jarring reflow.

### Section 6: Proof (clinical stats + photo)
- **Purpose:** Credibility through numbers, without sounding like a pharma ad.
- **Content:** Keep the 4-stat format from the current build (95%/86%/92%/90%-style), paired with
  one large portrait. Add one line of methodology ("Based on a 4-week clinical study of 30
  participants") — this single detail is what makes stats feel earned instead of invented.
- **Motion style:** #8 Number/counter-driven reveal — numbers count up from 0 as the section enters view.

### Section 7: The Philosophy (short-form, links to full /philosophy page)
- **Purpose:** Emotional anchor before the ask.
- **Content:** Short philosophy statement + link to the full philosophy page (don't try to tell the
  whole brand story here — tease it, let the dedicated page do the full version).
- **Motion style:** #1 Independent reveal, generous pacing, this section should feel like a pause.

### Section 8: Trust (testimonial + press)
- **Purpose:** Third-party validation.
- **Content:** Keep the italic serif testimonial format (this already works well) + press logo bar.
  Real testimonials only — remove any generic 5-star placeholder review copy.
- **Motion style:** #1 Independent reveal.

### Section 9: The Invitation (newsletter/community, rebuilt)
- **Purpose:** Convert a browser into a subscriber — last chance to capture the visitor.
- **Content:** Single clear headline + email input. Cut the generic "Join the Circle" community-photo
  concept from the reference (it was off-brand and vague) — replace with something concrete: "Get
  first access to new formulations" is more compelling than an abstract community pitch.
- **Motion style:** #1 Independent reveal, minimal — this section shouldn't compete for attention.

### Footer
- Standard: wordmark, nav groups (Shop/Collections/About), social links, legal links.
- **Fix from reference:** duplicate "Signature Collection" link, "Sustainablity" typo.

---

## 4. What NOT to carry over from the Framer reference
- Rounded corners/pill buttons as a system-wide language (see quality bar #3)
- The bright daylight/corporate-lifestyle photography direction
- Generic marketing copy ("Clinical-grade formulas wrapped in luxury") — needs a real copywriting pass
- The "Born from a..." Brand Story section as built (broken layout, headline unreadable)

## 5. What TO carry over, upgraded
- The asymmetric editorial photo grid concept (Section 3 above)
- The filter-pill bestsellers layout (Section 5)
- The 4-stat clinical proof format (Section 6, already partially built — needs the methodology line added)
- The overall page rhythm: story section → product section → credibility section → emotional section →
  conversion ask. This pacing logic is sound, just needs premium execution.

---

## 6. Phasing

**Phase 1 (now):** Lock this landing page spec, generate Stitch references section-by-section,
build in Antigravity, get it to a genuine 10/10 before moving on.

**Phase 2 (after):** Extend the same design system to /collections, /philosophy, /journal, /about
using this brief's quality bar as the standard for each.

---

*Next step: generate Stitch prompts for Sections 2-9 above, styled to the sharp-corner system and
matching the hero's color grade. Recommend doing 2-3 sections at a time rather than all at once, so
each can be reviewed before moving to the next.*
