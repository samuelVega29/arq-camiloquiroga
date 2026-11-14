import { useMemo, useState } from 'react'
import { services, serviceCategories } from '../data/services'
import Reveal from './Reveal'
import ServiceCard from './ServiceCard'

function getLayout(index, total) {
  if (total === 1) return 'lg:col-span-12'
  if (index === 0) return 'lg:col-span-7'
  if (index === 1) return 'lg:col-span-5'
  if (total === 3 && index === 2) return 'lg:col-span-12'
  if (total === 4) return 'lg:col-span-6'
  if (total === 5 && index === 4) return 'lg:col-span-12'
  if (total === 6 && index === 5) return 'lg:col-span-12'
  return 'lg:col-span-6'
}

export default function Services() {
  const [filter, setFilter] = useState('Todos')

  const filtered = useMemo(() => {
    if (filter === 'Todos') return services
    return services.filter((service) => service.category === filter)
  }, [filter])

  return (
    <section id="servicios" className="border-t border-[color:var(--color-line)] py-24 sm:py-36">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-6 bg-white" aria-hidden="true" />
                Servicios
              </p>
              <h2 className="mt-6 display-title text-[clamp(3rem,9vw,7rem)]">Servicios</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                Obras dirigidas, contratadas y diseñadas, además de residencias de obra para
                sector privado y público.
              </p>
            </div>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--color-fg-muted)]">
              {String(filtered.length).padStart(2, '0')} servicios
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <nav
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
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
                  className={`group relative pb-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[color:var(--color-fg-muted)] hover:text-white'
                  }`}
                >
                  {category}
                  <span
                    className={`absolute left-0 bottom-0 h-px w-full bg-white transition-transform duration-500 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {filtered.map((service, index) => {
            const layout = getLayout(index, filtered.length)
            return (
              <Reveal
                key={service.id}
                delay={(index % 3) * 70}
                className={`${layout} ${filtered.length === 1 ? 'md:col-span-2' : ''}`}
              >
                <ServiceCard
                  service={service}
                  index={index}
                  wide={layout === 'lg:col-span-12'}
                />
              </Reveal>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
            Obras y servicios prestados a empresas privadas, entidades públicas y clientes
            particulares.
          </p>
          <a
            href="#contacto"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-soft)] underline decoration-[color:var(--color-line)] underline-offset-4 transition-colors hover:text-white"
          >
            Solicitar cotización
          </a>
        </div>
      </div>
    </section>
  )
}
