import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { socials, whatsappHref } from '../data/socials'
import InstagramIcon from './InstagramIcon'
import WhatsAppIcon from './WhatsAppIcon'

const instagram = socials.find((social) => social.label === 'Instagram')

const slides = [
  {
    id: 1,
    type: 'image',
    src: '/proyectos/p01.svg',
    alt: 'Proyecto arquitectónico',
  },
  {
    id: 2,
    type: 'image',
    src: '/proyectos/p02.svg',
    alt: 'Proyecto arquitectónico',
  },
  {
    id: 3,
    type: 'image',
    src: '/proyectos/p03.svg',
    alt: 'Proyecto arquitectónico',
  },
  {
    id: 4,
    type: 'image',
    src: '/proyectos/p04.svg',
    alt: 'Proyecto arquitectónico',
  },
  {
    id: 5,
    type: 'image',
    src: '/proyectos/p05.svg',
    alt: 'Proyecto arquitectónico',
  },
  {
    id: 6,
    type: 'image',
    src: '/proyectos/p06.svg',
    alt: 'Proyecto arquitectónico',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallax = Math.min(scrollY * 0.3, 400)

  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
              style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1">
          <div className="section-shell flex h-full items-center">
            <div className="max-w-4xl">
              <div className="mt-10 h-20" />
              <div className="mt-12 flex flex-wrap items-center gap-4 animate-fade-in">
                <a
                  href="#proyectos"
                  className="group inline-flex items-center gap-3 bg-white px-8 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-black transition-all duration-500 hover:bg-[color:var(--color-fg-soft)]"
                >
                  Ver catálogo
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-[color:var(--color-fg-soft)]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Contactar
                </a>
                {instagram ? (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)] transition-colors duration-500 hover:text-white"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    {instagram.handle}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="section-shell pb-12">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-px transition-all duration-700 ${
                    index === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
            <a
              href="#proyectos"
              className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
            >
              Scroll
              <ArrowDown className="h-3 w-3 transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
