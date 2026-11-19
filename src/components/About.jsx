import { ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { services, serviceCategories } from '../data/services'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const areas = serviceCategories.slice(1).map((category) => ({
  label: category,
  count: services.filter((service) => service.category === category).length,
}))

const stats = [
  { value: String(services.length).padStart(2, '0'), label: 'Obras y servicios' },
  { value: String(areas.length).padStart(2, '0'), label: 'Líneas de trabajo' },
  { value: '2018—2026', label: 'Trayectoria' },
  { value: 'Boyacá', label: 'Base de trabajo' },
]

export default function About() {
  return (
    <section id="sobre-mi" className="py-16 sm:py-24">
      <div className="section-shell">
        <div>
          <Reveal delay={100}>
            <SectionHeading
              label="Perfil"
              title={
                <>
                  Pensar con las <span className="italic text-[color:var(--color-fg-soft)]">manos</span>
                </>
              }
            />

            <p className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
              {profile.role}
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-8">
              {profile.bio.map((paragraph) => (
                <p key={paragraph} className="max-w-prose text-pretty text-base leading-relaxed text-[color:var(--color-fg-soft)]">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-sm border border-white/10 bg-white/[0.02] p-4 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.04]"
                >
                  <dd className="font-display text-2xl leading-none tracking-[-0.03em]">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 font-mono text-xs leading-relaxed text-[color:var(--color-fg-muted)]">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div>
                <h3 className="eyebrow flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span>Áreas de trabajo</span>
                  <span className="flex items-center gap-2 normal-case tracking-normal">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {profile.location}
                  </span>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {areas.map((area) => (
                    <li
                      key={area.label}
                      className="flex items-center gap-2 text-sm text-[color:var(--color-fg-soft)]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                      {area.label}
                      <span className="font-mono text-xs text-[color:var(--color-fg-muted)]">
                        {String(area.count).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="eyebrow border-b border-white/10 pb-3">Herramientas</h3>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {profile.tools.map((tool) => (
                    <li
                      key={tool}
                      className="flex items-center gap-2 text-sm text-[color:var(--color-fg-muted)]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-white/25" aria-hidden="true" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="#contacto"
              className="group mt-10 inline-flex items-center gap-2 border-b border-white/40 pb-1 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-white hover:text-white"
            >
              Hablemos
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
