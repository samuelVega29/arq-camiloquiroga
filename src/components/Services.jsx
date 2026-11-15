import { useMemo, useState } from 'react'
import { ArrowUpDown, ArrowUpRight, ChevronDown, Search, X } from 'lucide-react'
import { services, serviceCategories } from '../data/services'
import Reveal from './Reveal'
import ServiceCard from './ServiceCard'

const MOSAIC = [
  { span: 'lg:col-span-8 lg:row-span-2', tall: true },
  { span: 'lg:col-span-4 lg:row-span-1', tall: false },
  { span: 'lg:col-span-4 lg:row-span-1', tall: false },
  { span: 'lg:col-span-6 lg:row-span-1', tall: false },
  { span: 'lg:col-span-6 lg:row-span-1', tall: false },
]

function getLayout(index, total) {
  if (total === 1) return { span: 'lg:col-span-12 lg:row-span-2', tall: true }

  if (index === total - 1) {
    const remainder = total % 5
    if (remainder === 1) return { span: 'lg:col-span-12 lg:row-span-1', tall: false }
    if (remainder === 2) return { span: 'lg:col-span-4 lg:row-span-2', tall: true }
    if (remainder === 4) return { span: 'lg:col-span-12 lg:row-span-1', tall: false }
  }

  return MOSAIC[index % 5]
}

function latestYear(year) {
  const matches = String(year ?? '').match(/\d{4}/g)
  return matches ? Number(matches[matches.length - 1]) : 0
}

export default function Services() {
  const [filter, setFilter] = useState('Todos')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recientes')

  const counts = useMemo(() => {
    const base = { Todos: services.length }
    serviceCategories.slice(1).forEach((category) => {
      base[category] = services.filter((service) => service.category === category).length
    })
    return base
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    let list = services.filter(
      (service) => filter === 'Todos' || service.category === filter,
    )

    if (term) {
      list = list.filter((service) =>
        `${service.title} ${service.category} ${service.client} ${service.location} ${service.year} ${service.description}`
          .toLowerCase()
          .includes(term),
      )
    }

    const sorted = [...list]

    if (sort === 'recientes') {
      sorted.sort((a, b) => latestYear(b.year) - latestYear(a.year))
    } else if (sort === 'antiguos') {
      sorted.sort((a, b) => latestYear(a.year) - latestYear(b.year))
    } else if (sort === 'titulo') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'es'))
    }

    return sorted
  }, [filter, query, sort])

  const hasFilters = filter !== 'Todos' || query.trim() !== ''

  const resetFilters = () => {
    setFilter('Todos')
    setQuery('')
  }

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
                sector privado y público. Cada trabajo reúne planos, imágenes y la memoria del
                proceso.
              </p>
            </div>
            <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
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
                  className={`group relative flex items-baseline gap-1.5 pb-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[color:var(--color-fg-muted)] hover:text-white'
                  }`}
                >
                  {category}
                  <sup className="text-[10px] tracking-normal opacity-60">
                    {String(counts[category] ?? 0).padStart(2, '0')}
                  </sup>
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

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar servicio, cliente o lugar"
                aria-label="Buscar servicios"
                className="h-11 w-full appearance-none border border-[color:var(--color-line)] bg-[color:var(--color-surface)] pl-11 pr-10 font-sans text-sm text-white placeholder:text-[color:var(--color-fg-muted)] transition-colors focus:border-white/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Borrar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-4">
              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)] underline decoration-[color:var(--color-line)] underline-offset-4 transition-colors hover:text-white"
                >
                  Limpiar
                </button>
              ) : null}

              <div className="relative">
                <ArrowUpDown
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                  aria-hidden="true"
                />
                <select
                  id="services-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-11 appearance-none border border-[color:var(--color-line)] bg-[color:var(--color-surface)] pl-10 pr-10 font-display text-base text-white transition-colors hover:border-white/40 focus:border-white/60 focus:outline-none sm:text-lg"
                >
                  <option value="recientes">Recientes</option>
                  <option value="antiguos">Antiguos</option>
                  <option value="titulo">Título A–Z</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[230px]">
          {filtered.map((service, index) => {
            const layout = getLayout(index, filtered.length)
            return (
              <Reveal
                key={service.id}
                delay={(index % 3) * 70}
                className={`${layout.span} h-full ${
                  filtered.length === 1 ? 'md:col-span-2' : ''
                }`}
              >
                <ServiceCard service={service} index={index} featured={layout.tall} />
              </Reveal>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 border border-dashed border-[color:var(--color-line)] px-6 py-14 text-center font-sans text-sm text-[color:var(--color-fg-muted)]">
            Sin resultados. Prueba con otro término.
          </p>
        ) : null}

        <Reveal delay={120}>
          <div className="group/cta relative mt-14 overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
            <div className="cta-pulse pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_100%_0%,rgba(255,255,255,0.08),transparent_55%)]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-12">
              <p className="max-w-xl text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                Cada proyecto se acompaña de planos, imágenes y una descripción del proceso.
              </p>

              <a href="#contacto" className="group/link inline-flex items-center gap-4">
                <span className="relative font-display text-2xl leading-none tracking-[-0.02em] text-white sm:text-3xl">
                  Hablemos de un proyecto
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/link:scale-x-100" />
                </span>
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover/link:border-white group-hover/link:bg-white group-hover/link:text-black">
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
              <span className="cta-shine block h-px w-1/2 bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
