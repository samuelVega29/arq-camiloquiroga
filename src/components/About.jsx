import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="sobre-mi" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 border border-line" aria-hidden="true" />
              <figure className="relative border border-ink/15 bg-paper-2">
                <img
                  src="retrato.svg"
                  alt="Retrato abstracto tipo plano arquitectónico de Camilo Quiroga"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="flex items-center justify-between border-t border-ink/15 px-4 py-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                    Retrato / 01
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                    CQ
                  </span>
                </figcaption>
              </figure>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-7">
            <SectionHeading
              index="04"
              label="Sobre mí"
              title={
                <>
                  Pensar con las <span className="italic text-blueprint">manos</span>
                </>
              }
            />

            <div className="mt-7 space-y-5">
              {profile.bio.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="eyebrow border-b border-line pb-3">Herramientas</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.tools.map((tool) => (
                  <li
                    key={tool}
                    className="border border-line px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contacto"
              className="group mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-copper hover:text-copper"
            >
              Hablemos
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
