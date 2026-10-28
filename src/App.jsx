import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Approach from './components/Approach'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  const [activeProject, setActiveProject] = useState(null)

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
        <Projects onOpenProject={setActiveProject} />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton hidden={Boolean(activeProject)} />
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onNavigate={setActiveProject}
      />
    </>
  )
}
