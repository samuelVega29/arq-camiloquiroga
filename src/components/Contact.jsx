import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { socials, whatsappHref } from '../data/socials'
import Reveal from './Reveal'
import WhatsAppIcon from './WhatsAppIcon'

export default function Contact() {
  return (
    <section id="contacto" className="py-20 text-white sm:py-28">
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-white/60">
              <span className="h-px w-8 bg-white" aria-hidden="true" />
              Contacto
            </p>

            <h2 className="mt-7 font-display text-[clamp(2.25rem,1.5rem+4vw,5.5rem)] font-light leading-[0.94] tracking-[-0.04em] text-balance">
              ¿Hablamos de tu próximo <span className="italic text-white">proyecto</span>?
            </h2>

            <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Estoy abierto a proyectos de diseño, colaboraciones y oportunidades para seguir
              construyendo experiencias desde la arquitectura.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-white px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Escríbeme por WhatsApp
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 border border-white/30 px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Correo
              </a>
            </div>

            <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-white/50">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location} · Respuesta en 24–48 h
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border border-white/20 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                Canales directos
              </p>

              <ul className="mt-6 divide-y divide-white/15 border-t border-white/15">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                        Correo
                      </span>
                      <span className="mt-1 block text-sm text-white">{profile.email}</span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>

                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                          {social.label}
                        </span>
                        <span className="mt-1 block text-sm text-white">{social.handle}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                        WhatsApp
                      </span>
                      <span className="mt-1 block text-sm text-white">Mensaje directo</span>
                    </span>
                    <WhatsAppIcon className="h-4 w-4 text-white/60" />
                  </a>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-2 border-t border-white/15 pt-5">
                <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">
                  {profile.availability}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
