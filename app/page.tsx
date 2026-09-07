import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import TheBelief from '../components/TheBelief'
import TheRitual from '../components/TheRitual'
import TheCollection from '../components/TheCollection'
import TheFormulation from '../components/TheFormulation'
import Proof from '../components/Proof'
import ThePhilosophy from '../components/ThePhilosophy'
import Trust from '../components/Trust'
import JournalPreview from '../components/JournalPreview'
import TheInvitation from '../components/TheInvitation'
import Footer from '../components/Footer'
import { getProducts } from '../lib/api'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      <Navigation />
      <Hero />
      <TheBelief />
      <TheRitual />
      <TheFormulation />
      <TheCollection products={products} />
      <Proof />
      <ThePhilosophy />
      <Trust />
      <TheInvitation />
      <JournalPreview />
      <Footer />
    </main>
  )
}
