import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Approach from './components/Approach'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ServiceDetail from './components/ServiceDetail'
import WhatsAppButton from './components/WhatsAppButton'
import { services } from './data/services'

const HOME_TITLE = 'Camilo Quiroga — Portafolio de Arquitectura'

function getRoute() {
  const match = window.location.hash.match(/^#\/servicio\/([\w-]+)/)
  return match ? { name: 'service', id: match[1] } : { name: 'home' }
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const activeService =
    route.name === 'service' ? services.find((service) => service.id === route.id) : null

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (activeService) {
      document.title = `${activeService.title} — Camilo Quiroga`
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    document.title = HOME_TITLE

    const target = window.location.hash.replace(/^#/, '')
    if (target && !target.startsWith('/')) {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [activeService, route])

  if (activeService) {
    return <ServiceDetail key={activeService.id} service={activeService} />
  }

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
