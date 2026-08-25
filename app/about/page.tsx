import type { Metadata } from 'next'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/shared/Breadcrumb'
import PageHeader from '../../components/shared/PageHeader'
import ClosingCta from '../../components/shared/ClosingCta'
import ParallaxImage from '../../components/shared/ParallaxImage'
import ScrollReveal from '../../components/ScrollReveal'
import { aboutImage } from '../../lib/images'

export const metadata: Metadata = {
  title: 'About — Auvérer',
  description:
    'The story of Auvérer: a small laboratory in Grasse, a founding friendship, and a company built on the belief that fewer things, better kept, are worth more.',
}

export default function AboutPage() {
  return (
    <main>
      <Navigation />

      <PageHeader
        eyebrow="About Auvérer"
        title="A Small House, Kept Deliberately"
        lede="Auvérer is a company of eleven people, one laboratory and twelve formulations. This is how it began — and the terms on which we intend to keep it."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Origin story */}
      <section
        aria-labelledby="origin-title"
        style={{
          backgroundColor: 'var(--color-surface-background)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <ScrollReveal className="lg:col-span-5">
            <figure style={{ position: 'sticky', top: '8rem', margin: 0 }}>
              <div style={{ aspectRatio: '4/5' }}>
                <ParallaxImage
                  src={aboutImage('founding')}
                  alt="The Grasse workshop at dusk"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  amplitude={20}
                />
              </div>
              <figcaption
                style={{
                  marginTop: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Founding photograph — the Grasse workshop at dusk
              </figcaption>
            </figure>
          </ScrollReveal>
          <div className="lg:col-span-7">
            <p
              id="origin-title"
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
              Where It Began
            </p>
            {[
              'Auvérer was founded in 2019 by two people who agreed about almost nothing except the problem. Margaux Delacroix had spent a decade as a beauty editor watching claims inflate while formulas converged on sameness. Dr. Amara Osei was a cosmetic chemist who had watched her best work get diluted to meet price points she was never consulted on. Over a long dinner in Grasse they sketched, on the back of a menu, the shape of a company that would not require either of them to lie.',
            ].map((para, i) => (
              <ScrollReveal key={`origin-${i}`}>
                <p
                  className="drop-cap"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '1rem',
                    lineHeight: 1.9,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
            {[
              'The first two years produced nothing for sale. They produced, instead, the rules the company still runs on: no ingredient without a dossier, no claim without its methodology line, no launch until the batch matches the memory of the first. Friends asked when the products would arrive. The honest answer was that most of what got made in those years did not deserve to.',
              'The name came last. Auvérer — to have come through winter, in the old sense of the verb — felt right for formulations built around camellia, a flower that blooms precisely when everything else has stopped. It also described the founders\u2019 decade: arriving somewhere quieter after years of noise.',
            ].map((para, i) => (
              <ScrollReveal key={`origin2-${i}`} delay={0.08}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '1rem',
                    lineHeight: 1.9,
                    color: 'var(--color-text-secondary)',
                    marginBottom: i === 1 ? 0 : '1.5rem',
                  }}
                >
                  {para}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        aria-labelledby="mission-title"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 4vw, 4rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <ScrollReveal>
            <h2
              id="mission-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                lineHeight: 1.35,
                color: 'var(--color-text-primary)',
                marginBottom: '2.5rem',
              }}
            >
              Our mission is subtraction performed beautifully.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.9,
                color: 'var(--color-text-secondary)',
              }}
            >
              Fewer products, revised longer. Fewer claims, each tested. Fewer ingredients, each traceable.
              We measure success in second purchases, in rituals kept for years rather than tried for weeks,
              and in the number of customers we talk out of buying more than their skin requires.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder's note */}
      <section
        aria-labelledby="founder-title"
        style={{
          backgroundColor: 'var(--color-surface-surface)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
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
              }}
            >
              A Note From the Founders
            </p>
            <h2
              id="founder-title"
              className="italic"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                lineHeight: 1.35,
                color: 'var(--color-text-primary)',
                marginBottom: '3rem',
              }}
            >
              &ldquo;We built the company we wanted to buy from.&rdquo;
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.9,
                color: 'var(--color-text-secondary)',
              }}
            >
              <p style={{ marginBottom: '1.5rem' }}>
                People ask why we blend at night, why batches rest fourteen days, why a collection that could
                be forty products stays at twelve. The answers are all the same answer: because the moment a
                house starts explaining less than it does, it begins selling more than it makes. Craftsmanship,
                to us, is simply the refusal to let that happen — practiced daily, at whatever cost.
              </p>
              <p style={{ marginBottom: '3rem' }}>
                If you use one of our formulations for a year, you will know whether we kept our side of it.
                We hope you will write and tell us either way.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span
                aria-hidden="true"
                style={{
                  width: '3.5rem',
                  height: '1px',
                  backgroundColor: 'var(--color-accent-gold)',
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontSize: '0.6875rem',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  Margaux Delacroix &amp; Dr. Amara Osei
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-text-muted)',
                    marginTop: '0.25rem',
                    margin: '0.25rem 0 0',
                  }}
                >
                  Founders, Auvérer — Grasse &amp; London
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Craft figure strip */}
      <section
        aria-label="The workshop"
        style={{
          backgroundColor: 'var(--color-surface-background)',
          borderTop: '1px solid var(--color-border-default)',
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3" style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {[
            {
              src: aboutImage('craft-blending'),
              alt: 'A formulation jar resting on cool dark marble in the blending room',
              caption: 'The blending room, kept below nineteen degrees',
            },
            {
              src: aboutImage('craft-ledgers'),
              alt: 'A hand writing entries in a numbered batch ledger',
              caption: 'Batch ledgers, numbered and kept by hand',
            },
            {
              src: aboutImage('craft-camellia'),
              alt: 'Dark green camellia leaves photographed at night',
              caption: 'The camellia harvest, pressed within days',
            },
          ].map(({ src, alt, caption }, i) => (
            <ScrollReveal key={caption} delay={i * 0.1}>
              <figure style={{ margin: 0 }}>
                <div style={{ aspectRatio: '3/4' }}>
                  <ParallaxImage
                    src={src}
                    alt={alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    amplitude={20}
                  />
                </div>
                <figcaption
                  style={{
                    marginTop: '1rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {caption}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ClosingCta
        title="See what eleven people and one laboratory made."
        primaryLabel="Explore the Collection"
        primaryHref="/collections"
        secondaryLabel="Read Our Philosophy"
        secondaryHref="/philosophy"
      />
      <Footer />
    </main>
  )
}
