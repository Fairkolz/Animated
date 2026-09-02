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

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <TheBelief />
      <TheRitual />
      <TheFormulation />
      <TheCollection />
      <Proof />
      <ThePhilosophy />
      <Trust />
      <TheInvitation />
      <JournalPreview />
      <Footer />
    </main>
  )
}
