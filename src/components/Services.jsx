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
    <section id="servicios" className="border-t border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              index="02"
              label="Servicios"
              title={
                <>
                  Experiencia <span className="italic text-blueprint">profesional</span>
                </>
              }
              intro="Dirección, residencia, interventoría, contratación y formulación de proyectos para sector privado y público."
            />
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {String(filtered.length).padStart(2, '0')} servicios
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <nav className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" role="tablist" aria-label="Filtrar servicios por tipo">
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
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {category}
                  <span
                    className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ease-out origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-t border-line">
          {filtered.map((service, index) => (
            <Reveal key={service.id} delay={(index % 4) * 50}>
              <article className="grid gap-4 py-7 sm:grid-cols-12 sm:gap-6">
                <div className="sm:col-span-5 lg:col-span-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper">
                    {service.category}
                  </p>
                  <h3 className="mt-2 text-lg leading-snug sm:text-xl">{service.title}</h3>
                </div>
                <div className="sm:col-span-4 lg:col-span-4">
                  <p className="text-sm leading-relaxed text-ink-soft">{service.description}</p>
                </div>
                <div className="sm:col-span-3 lg:col-span-4 sm:text-right">
                  <p className="text-sm text-ink-soft">{service.client}</p>
                  {service.location ? <p className="mt-1 text-sm text-ink-soft">{service.location}</p> : null}
                  {service.year ? <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">{service.year}</p> : null}
                  {service.value && service.value !== '—' ? <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">{service.value}</p> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
            Servicios prestados a empresas privadas, entidades públicas y clientes particulares.
          </p>
          <a
            href="#contacto"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-blueprint underline decoration-line underline-offset-4 transition-colors hover:text-copper"
          >
            Solicitar cotización
          </a>
        </div>
      </div>
    </section>
  )
}
