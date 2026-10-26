import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { socials } from '../data/socials'
import InstagramIcon from './InstagramIcon'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

const instagram = socials.find((social) => social.label === 'Instagram')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-line/80 bg-paper/95 backdrop-blur-md'
          : 'border-transparent bg-paper/70 backdrop-blur-sm'
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-6 sm:h-20">
        <a
          href="#inicio"
          className="group flex items-baseline gap-2"
          aria-label="Camilo Quiroga — Inicio"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-2xl font-medium tracking-tight sm:text-[28px]">
            CQ<span className="text-copper">.</span>
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft sm:inline">
            Camilo Quiroga
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? 'page' : undefined}
              className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-copper ${
                active === link.href ? 'text-copper' : 'text-ink-soft'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {instagram ? (
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de Camilo Quiroga (${instagram.handle})`}
              className="text-ink-soft transition-colors hover:text-copper"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
          ) : null}
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
          >
            Hablemos
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-line/70 bg-paper transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Navegación móvil" className="section-shell flex flex-col py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active === link.href ? 'page' : undefined}
              className={`flex items-center justify-between border-b border-line/60 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] ${
                active === link.href ? 'text-copper' : 'text-ink'
              }`}
            >
              {link.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
          <a
            href={instagram?.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft"
          >
            Instagram {instagram?.handle}
            <InstagramIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
