import { useCallback, useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { socials, whatsappHref } from '../data/socials'
import InstagramIcon from './InstagramIcon'
import WhatsAppIcon from './WhatsAppIcon'

const instagram = socials.find((social) => social.label === 'Instagram')

const slides = [
  {
    id: 1,
    src: 'construccion/construccion-01.jpg',
    alt: 'Proyecto de construcción - estructura metálica',
  },
  {
    id: 2,
    src: 'construccion/construccion-02.jpg',
    alt: 'Proyecto de construcción - renovación',
  },
  {
    id: 3,
    src: 'construccion/construccion-03.webp',
    alt: 'Proyecto de construcción - obra',
  },
  {
    id: 4,
    src: 'construccion/construccion-04.webp',
    alt: 'Proyecto de construcción - avance de obra',
  },
  {
    id: 5,
    src: 'construccion/construccion-05.webp',
    alt: 'Proyecto de construcción - detalle',
  },
  {
    id: 6,
    src: 'construccion/construccion-06.webp',
    alt: 'Proyecto de construcción - proceso',
  },
  {
    id: 7,
    src: 'construccion/construccion-07.jpeg',
    alt: 'Proyecto de construcción - obra en ejecución',
  },
  {
    id: 8,
    src: 'construccion/construccion-08.jpg',
    alt: 'Proyecto de construcción - remodelación de interiores',
  },
  {
    id: 9,
    src: 'construccion/construccion-09.jpg',
    alt: 'Proyecto de construcción - remodelación',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const goToSlide = useCallback((index) => {
    setCurrentSlide((index + slides.length) % slides.length)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') nextSlide()
      if (event.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <div className="section-shell flex h-full items-end pb-20 sm:pb-28">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 animate-fade-in">
                <a
                  href="#servicios"
                  className="group inline-flex items-center gap-3 bg-white px-8 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-black transition-all duration-500 hover:bg-[color:var(--color-fg-soft)]"
                >
                  Ver servicios
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

        <div className="section-shell pb-10">
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                  aria-label="Siguiente slide"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-px transition-all duration-700 ${
                      index === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white/30'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                    aria-current={index === currentSlide}
                  />
                ))}
              </div>
            </div>
            <a
              href="#servicios"
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

