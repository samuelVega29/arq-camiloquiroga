import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import { socials, whatsappHref } from '../data/socials'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#proyectos' },
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="border-t border-paper/15 bg-ink text-paper">
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium tracking-tight">
                CQ<span className="text-copper">.</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/50">
                {profile.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Portafolio de arquitectura. Espacio, materia y luz.
            </p>
            <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">
              © {new Date().getFullYear()} Camilo Quiroga
            </p>
          </div>

          <nav aria-label="Navegación del pie de página" className="md:col-span-4">
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">
              Navegación
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-copper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">
              Redes
            </h2>
            <ul className="mt-4 space-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-copper"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-copper"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-paper/15 pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/40">
            Hecho con intención / 2026
          </p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/60 transition-colors hover:text-copper"
          >
            Volver arriba
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
