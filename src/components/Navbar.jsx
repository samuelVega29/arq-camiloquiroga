import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Sobre m├¡', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between gap-6">
        <a href="#inicio" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo-cq.jpeg" alt="Camilo Quiroga" className="h-10 w-10 object-contain" />
          <div className="hidden sm:block">
            <span className="block text-sm tracking-[-0.01em]">{profile.name}</span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
              Arquitecto
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar men├║' : 'Abrir men├║'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`fixed inset-0 bg-black/95 transition-opacity duration-700 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-black transition-transform duration-700 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">Men├║</span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center"
              onClick={() => setOpen(false)}
              aria-label="Cerrar men├║"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[color:var(--color-line)] py-6 text-4xl tracking-[-0.02em] transition-colors hover:text-[color:var(--color-fg-soft)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
