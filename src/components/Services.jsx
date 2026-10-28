import { useMemo, useState } from 'react'
import { services, serviceCategories } from '../data/services'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Services() {
  const [filter, setFilter] = useState('Todos')

  const filtered = useMemo(() => {
    if (filter === 'Todos') return services
    return services.filter((service) => service.category === filter)
  }, [filter])

  return (
    <section id="servicios" className="py-24 sm:py-36">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-6 bg-white" aria-hidden="true" />
                01 / Servicios
              </p>
              <h2 className="mt-6 display-title text-[clamp(3rem,9vw,7rem)]">
                Experiencia <span className="italic">profesional</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                Dirección, residencia, interventoría, contratación y formulación de proyectos para sector privado y público.
              </p>
            </div>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--color-fg-muted)]">
              {String(filtered.length).padStart(2, '0')} servicios
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <nav
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
            role="tablist"
            aria-label="Filtrar servicios por tipo"
          >
            {serviceCategories.map((category) => {
              const isActive = filter === category
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(category)}
                  className={`group relative pb-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-[color:var(--color-fg)]' : 'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]'
                  }`}
                >
                  {category}
                  <span
                    className={`absolute left-0 bottom-0 h-px w-full bg-[color:var(--color-fg)] transition-transform duration-500 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </Reveal>

        <div className="mt-12 divide-y divide-[color:var(--color-line)] border-t border-[color:var(--color-line)]">
          {filtered.map((service, index) => (
            <Reveal key={service.id} delay={(index % 4) * 50}>
              <article className="grid gap-6 py-8 sm:grid-cols-12 sm:items-start">
                <div className="sm:col-span-5 lg:col-span-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
                    {service.category}
                  </p>
                  <h3 className="mt-3 text-xl leading-snug tracking-[-0.01em] sm:text-2xl">{service.title}</h3>
                </div>
                <div className="sm:col-span-4 lg:col-span-4">
                  <p className="text-sm leading-relaxed text-[color:var(--color-fg-soft)]">{service.description}</p>
                </div>
                <div className="sm:col-span-3 lg:col-span-4 sm:text-right">
                  <p className="text-sm text-[color:var(--color-fg)]">{service.client}</p>
                  {service.location ? <p className="mt-1 text-sm text-[color:var(--color-fg-soft)]">{service.location}</p> : null}
                  {service.year ? <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">{service.year}</p> : null}
                  {service.value && service.value !== '-' ? <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">{service.value}</p> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
            Servicios prestados a empresas privadas, entidades públicas y clientes particulares.
          </p>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
          >
            Solicitar cotización
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
