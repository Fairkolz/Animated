import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/shared/Breadcrumb'
import PageHeader from '../../components/shared/PageHeader'
import ClosingCta from '../../components/shared/ClosingCta'
import ScrollReveal from '../../components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Philosophy — Auvérer',
  description:
    'The Auvérer philosophy in full: restraint as a formulation strategy, four pillars of practice, and why we believe luxury is traceability wearing beautiful clothes.',
}

const pillars = [
  {
    index: '01',
    title: 'Clinical Excellence',
    body: 'Every claim we make is tested at concentrations you can verify on the label. We publish our methodology line beneath every statistic because a number without its conditions is decoration, not evidence. Where the science is early, we say so; where it is settled, we formulate to it.',
  },
  {
    index: '02',
    title: 'Active Ingredients',
    body: 'Actives earn their place by mechanism, not fashion. Encapsulated niacinamide, fermented camellia, peptide signal complexes — each is chosen for what it does at a molecular level and held at the percentage where trials showed effect. We do not chase hero ingredients. We keep them when they work.',
  },
  {
    index: '03',
    title: 'Skin Barriers',
    body: 'The barrier is the organ we actually treat. Everything else — radiance, texture, tone — is downstream of whether the mortar between your skin cells is intact. Our formulas are built around ceramide ratios and pH ranges the barrier recognizes, and our rituals are paced to let repair finish before renewal begins again.',
  },
  {
    index: '04',
    title: 'Luxury Experience',
    body: 'Luxury is precision experienced through the senses: a cream that warms exactly at body temperature, a ceramic applicator chilled by design, typography given room to breathe. None of it compensates for performance; all of it respects the person performing the ritual. Beauty and rigour are not opposites. They are the same discipline, seen from different distances.',
  },
]

export default function PhilosophyPage() {
  return (
    <main>
      <Navigation />

      <PageHeader
        eyebrow="Our Philosophy"
        title="What We Believe"
        lede="Skincare is not about changing how you look, but revealing what was always there. This page is where that conviction gets to unfold without interruption."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Philosophy' }]}
      />

      {/* Manifesto */}
      <section
        aria-labelledby="manifesto-title"
        style={{
          backgroundColor: 'var(--color-surface-background)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <ScrollReveal>
            <h2
              id="manifesto-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                lineHeight: 1.35,
                color: 'var(--color-text-primary)',
                marginBottom: '3rem',
              }}
            >
              True luxury is born in the shadows, where time slows and essence is refined.
            </h2>
          </ScrollReveal>
          {[
            'We began with an unfashionable observation: the modern bathroom shelf had become a museum of anxieties, each product a small monument to a flaw someone once convinced us we had. The industry called this innovation. We suspected it was noise wearing a white coat.',
            'Auvérer exists as a counter-argument. We make few things and revise them for years. We would rather be someone\u2019s second year than their first month. Every formulation we ship could have been diluted further, marketed louder, or launched sooner — and every one of those temptations was declined.',
            'Restraint is not minimalism\u2019s aesthetic. It is a belief about attention: that skin responds to consistency rather than novelty, that rituals deepen when they are few, and that the most radical act available to a skincare house is to ask less of you, more precisely.',
          ].map((para, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <p
                className={i === 0 ? 'drop-cap' : undefined}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
                  lineHeight: 1.9,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.5rem',
                }}
              >
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Formulation philosophy */}
      <section
        aria-labelledby="formulation-philosophy-title"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }} className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'var(--color-accent-gold)',
                marginBottom: '1.5rem',
              }}
            >
              On Formulation
            </p>
            <h2
              id="formulation-philosophy-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.15,
                color: 'var(--color-text-primary)',
              }}
            >
              Nature asks only to be taken seriously.
            </h2>
          </ScrollReveal>
          <div className="lg:col-span-7">
            {[
              'We do not ask plants to be miracles; we ask them to be themselves, thoroughly. Camellia oleifera blooms in winter, which means its lipids evolved to survive damage — cold-pressed and fermented, it becomes an ingredient with a mechanism, not a story. White truffle, alpine water, galactomyces ferment: each raw material arrives in Grasse with a dossier, a harvest region, and the name of a person accountable for all three.',
              'Then the laboratory does what laboratories do. Fermentation shortens triglyceride chains until oils absorb in seconds. Encapsulation releases niacinamide over hours instead of dumping it in minutes. Ratios are tuned to the physiology of the barrier rather than the poetry of the brochure. The botanical gives the formula its character; the chemistry gives it consequences.',
              'Every batch rests fourteen days after blending — what our chemists call the pause — and ships only when its profile matches the memory of the first. If a material cannot be traced, it cannot be trusted, and if it cannot be trusted, however fashionable, it does not enter.',
            ].map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '1rem',
                    lineHeight: 1.9,
                    color: 'var(--color-text-secondary)',
                    marginBottom: i === 2 ? 0 : '1.5rem',
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section
        aria-labelledby="pillars-title"
        style={{
          backgroundColor: 'var(--color-surface-surface)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <ScrollReveal>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'var(--color-accent-gold)',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Four Pillars
            </p>
            <h2
              id="pillars-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.15,
                color: 'var(--color-text-primary)',
                textAlign: 'center',
                marginBottom: 'clamp(3rem, 6vw, 5rem)',
              }}
            >
              The practice behind the promise
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2" style={{ maxWidth: '64rem', margin: '0 auto' }}>
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.index} delay={i * 0.1}>
                <article style={{ borderTop: '1px solid var(--color-border-default)', paddingTop: '2rem' }}>
                  <p
                    aria-hidden="true"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '1.125rem',
                      color: 'var(--color-accent-gold)',
                      marginBottom: '1rem',
                    }}
                  >
                    {pillar.index}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 400,
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      color: 'var(--color-text-primary)',
                      marginBottom: '1rem',
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      fontSize: '0.9375rem',
                      lineHeight: 1.85,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {pillar.body}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote pause */}
      <section
        aria-label="Closing thought"
        style={{
          backgroundColor: 'var(--color-surface-dim)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <ScrollReveal>
          <blockquote
            style={{
              maxWidth: '44rem',
              margin: '0 auto',
              textAlign: 'center',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              lineHeight: 1.5,
              color: 'var(--color-text-primary)',
            }}
          >
            &ldquo;Fewer acts, deeper intention.&rdquo;
          </blockquote>
        </ScrollReveal>
      </section>

      <ClosingCta
        title="The philosophy is easier to feel than to read."
        body="Twelve formulations carry everything written above."
        primaryLabel="Explore the Collection"
        primaryHref="/collections"
        secondaryLabel="Read the Journal"
        secondaryHref="/journal"
      />
      <Footer />
    </main>
  )
}
