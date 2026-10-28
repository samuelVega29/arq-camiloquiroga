import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { socials, whatsappHref } from '../data/socials'
import Reveal from './Reveal'
import WhatsAppIcon from './WhatsAppIcon'

export default function Contact() {
  return (
    <section id="contacto" className="border-t border-ink bg-ink py-20 text-paper sm:py-28">
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
              <span className="h-px w-8 bg-copper" aria-hidden="true" />
              05 / Contacto
            </p>

            <h2 className="mt-7 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.94] tracking-[-0.04em]">
              ¿Hablamos de tu próximo <span className="italic text-copper">proyecto</span>?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
              Estoy abierto a proyectos de diseño, colaboraciones y oportunidades para seguir
              construyendo experiencias desde la arquitectura.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-copper px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink"
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
                className="group inline-flex items-center gap-3 border border-paper/30 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Correo
              </a>
            </div>

            <p className="mt-8 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {profile.location} · Respuesta en 24–48 h
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border border-paper/20 p-6 sm:p-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/50">
                Canales directos
              </p>

              <ul className="mt-6 divide-y divide-paper/15 border-t border-paper/15">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">
                        Correo
                      </span>
                      <span className="mt-1 block text-sm text-paper">{profile.email}</span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-paper/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">
                          {social.label}
                        </span>
                        <span className="mt-1 block text-sm text-paper">{social.handle}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-paper/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">
                        WhatsApp
                      </span>
                      <span className="mt-1 block text-sm text-paper">Mensaje directo</span>
                    </span>
                    <WhatsAppIcon className="h-4 w-4 text-paper/60" />
                  </a>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-2 border-t border-paper/15 pt-5">
                <span className="h-2 w-2 rounded-full bg-copper" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/60">
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
