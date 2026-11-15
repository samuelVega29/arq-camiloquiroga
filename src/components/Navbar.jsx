import { useEffect, useState } from 'react'
import { LogIn, LogOut, Menu, Plus, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar({
  isAdmin = false,
  authLoading = false,
  onLogin,
  onLogout,
  onNewPublication,
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#inicio')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeAnd = (action) => {
    setOpen(false)
    if (action) action()
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ${
        scrolled
          ? 'border-white/10 bg-black/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between gap-5">
        <a href="#inicio" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center border border-white/40 transition-colors duration-300 group-hover:border-white group-hover:bg-white/10">
            <span className="font-display text-lg leading-none">CQ</span>
          </div>
          <div className="hidden sm:block">
            <span className="block text-sm tracking-[-0.01em]">{profile.name}</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
              Arquitecto
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <div className="flex items-center gap-5 xl:gap-7">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-white' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-white transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </div>

          {isAdmin || !authLoading ? (
            <>
              <span className="h-4 w-px bg-white/15" aria-hidden="true" />

              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onNewPublication}
                    className="inline-flex items-center gap-2 border border-white/40 px-3 py-2.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Nueva publicación
                  </button>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-[color:var(--color-fg-soft)] transition-colors hover:border-white hover:text-white"
                    aria-label="Cerrar sesión de administrador"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onLogin}
                  className="inline-flex items-center gap-2 border border-white/25 px-3 py-2.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/85 transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                  ¿Eres administrador?
                </button>
              )}
            </>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition-colors duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
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
          className={`fixed inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-black transition-transform duration-700 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
              Menú
            </span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition-colors duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-6">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`border-b border-[color:var(--color-line)] py-5 text-4xl tracking-[-0.02em] transition-colors ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="mt-auto px-6 py-8">
            {isAdmin ? (
              <div className="flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                  Sesión de administrador
                </span>
                <button
                  type="button"
                  onClick={() => closeAnd(onNewPublication)}
                  className="inline-flex items-center justify-center gap-2 bg-white px-5 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-black"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Nueva publicación
                </button>
                <button
                  type="button"
                  onClick={() => closeAnd(onLogout)}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/80"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                  Cerrar sesión
                </button>
              </div>
            ) : authLoading ? null : (
              <div className="border-t border-[color:var(--color-line)] pt-6">
                <button
                  type="button"
                  onClick={() => closeAnd(onLogin)}
                  className="inline-flex w-full items-center justify-center gap-2 border border-white/25 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85"
                >
                  <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                  ¿Eres administrador?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
