import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Approach from './components/Approach'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-black"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
