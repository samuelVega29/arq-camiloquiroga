import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Plus,
  Search,
  X,
} from 'lucide-react'
import PublicationCard from './PublicationCard'
import Reveal from './Reveal'

const FILTERS = [
  { label: 'Todas', value: 'Todos' },
  { label: 'Dirigidas', value: 'Obras dirigidas' },
  { label: 'Diseñadas', value: 'Obras diseñadas' },
  { label: 'Contratadas', value: 'Obras contratadas' },
]

const MAIN_LOCATIONS = ['villa de leyva', 'sogamoso', 'tunja']

const LOCATION_FILTERS = [
  { label: 'Todas', value: 'todas' },
  { label: 'Villa de Leyva', value: 'villa de leyva' },
  { label: 'Sogamoso', value: 'sogamoso' },
  { label: 'Tunja', value: 'tunja' },
  { label: 'Otras', value: 'otras' },
]

function matchesLocation(publication, locationFilter) {
  const location = (publication.location ?? '').toLowerCase()

  if (locationFilter === 'todas') return true
  if (locationFilter === 'otras') {
    return !MAIN_LOCATIONS.some((city) => location.includes(city))
  }

  return location.includes(locationFilter)
}

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

export default function Services({
  publications,
  loading,
  error,
  isAdmin,
  onNewPublication,
  onEditPublication,
  onDeletePublication,
  onRetry,
}) {
  const [filter, setFilter] = useState('Todos')
  const [locationFilter, setLocationFilter] = useState('todas')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recientes')
  const [actionError, setActionError] = useState('')

  const counts = useMemo(
    () =>
      publications.reduce((accumulator, publication) => {
        if (publication.category) {
          accumulator[publication.category] = (accumulator[publication.category] ?? 0) + 1
        }
        return accumulator
      }, {}),
    [publications],
  )

  const activeFilter = FILTERS.some((item) => item.value === filter) ? filter : 'Todos'

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    const list = publications.filter((publication) => {
      const matchesCategory =
        activeFilter === 'Todos' || publication.category === activeFilter
      if (!matchesCategory) return false
      if (!matchesLocation(publication, locationFilter)) return false
      if (!term) return true

      return [
        publication.title,
        publication.category,
        publication.location,
        publication.description,
        publication.client,
        publication.year,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term)
    })

    const sorted = [...list]

    if (sort === 'recientes') {
      sorted.sort((a, b) => latestYear(b.year) - latestYear(a.year))
    } else if (sort === 'antiguos') {
      sorted.sort((a, b) => latestYear(a.year) - latestYear(b.year))
    } else if (sort === 'titulo') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'es'))
    }

    return sorted
  }, [publications, activeFilter, locationFilter, query, sort])

  const hasFilters =
    activeFilter !== 'Todos' || locationFilter !== 'todas' || query.trim() !== ''

  const resetFilters = () => {
    setFilter('Todos')
    setLocationFilter('todas')
    setQuery('')
  }

  const handleDelete = async (publication) => {
    const confirmed = window.confirm(
      `¿Eliminar "${publication.title}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return false

    setActionError('')
    try {
      await onDeletePublication(publication.id)
      return true
    } catch {
      setActionError('No pudimos eliminar la publicación. Inténtalo de nuevo.')
      return false
    }
  }

  const handleEdit = (publication) => {
    onEditPublication(publication.id)
  }

  return (
    <section id="servicios" className="border-t border-white/10 py-12 sm:py-16">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <h2 className="display-title text-[clamp(2.5rem,1.5rem+4vw,5rem)]">Servicios</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-fg-soft)] sm:text-base">
                Obras dirigidas, contratadas y diseñadas, además de residencias de obra y
                remodelaciones para sector privado y público. Cada trabajo reúne planos, imágenes
                y la memoria del proceso.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              {isAdmin ? (
                <span className="border border-white/25 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-white/80">
                  Modo admin
                </span>
              ) : null}
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
                {String(filtered.length).padStart(2, '0')} servicios
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <search className="mt-6 flex flex-col gap-3 border-y border-white/10 py-3 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-3 xl:gap-5">
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:flex-nowrap lg:gap-x-3 xl:gap-x-5"
              role="group"
              aria-label="Filtrar servicios por categoría"
            >
              {FILTERS.map((item) => {
                const isActive = activeFilter === item.value
                const count =
                  item.value === 'Todos' ? publications.length : counts[item.value] ?? 0
                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(item.value)}
                    className={`group relative pb-1 font-mono text-[8px] uppercase tracking-[0.18em] transition-colors xl:text-[9px] ${
                      isActive
                        ? 'text-white'
                        : 'text-[color:var(--color-fg-muted)] hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`ml-1.5 text-[7px] xl:ml-2 xl:text-[8px] ${
                        isActive ? 'text-white/70' : 'text-[color:var(--color-fg-muted)]'
                      }`}
                      aria-hidden="true"
                    >
                      {count}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-px w-full origin-left bg-white transition-transform duration-500 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-nowrap sm:items-center lg:gap-2 xl:gap-3">
              <div className="relative w-full sm:w-40 xl:w-48">
                <label htmlFor="services-search" className="sr-only">
                  Buscar servicios
                </label>
                <Search
                  className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="services-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar servicio..."
                  className="w-full border-b border-[color:var(--color-line)] bg-transparent py-2.5 pl-6 pr-8 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-muted)] focus:border-white focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-0 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>

              <div className="relative w-full sm:w-36 xl:w-40">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                  aria-hidden="true"
                />
                <label htmlFor="services-location" className="sr-only">
                  Filtrar por ubicación
                </label>
                <select
                  id="services-location"
                  value={locationFilter}
                  onChange={(event) => setLocationFilter(event.target.value)}
                  className="h-10 w-full cursor-pointer appearance-none border border-[color:var(--color-line)] bg-[color:var(--color-surface)] pl-9 pr-8 font-mono text-[8px] uppercase tracking-[0.14em] text-[color:var(--color-fg)] transition-colors hover:border-white/40 focus:border-white focus:outline-none xl:h-11 xl:pl-10 xl:pr-9 xl:text-[9px] [&>option]:bg-[color:var(--color-surface)] [&>option]:font-sans [&>option]:text-[color:var(--color-fg)]"
                >
                  {LOCATION_FILTERS.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-fg-muted)] xl:right-3"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-nowrap sm:items-center lg:gap-2 xl:gap-3">
                <div className="relative w-full sm:w-auto">
                  <ArrowUpDown
                    className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                    aria-hidden="true"
                  />
                  <label htmlFor="services-sort" className="sr-only">
                    Ordenar servicios
                  </label>
                  <select
                    id="services-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="h-10 w-full cursor-pointer appearance-none border border-[color:var(--color-line)] bg-[color:var(--color-surface)] pl-9 pr-8 font-display text-sm leading-none tracking-[-0.01em] text-[color:var(--color-fg)] transition-colors hover:border-white/40 focus:border-white focus:outline-none sm:w-auto xl:h-11 xl:pl-10 xl:pr-9 xl:text-base [&>option]:bg-[color:var(--color-surface)] [&>option]:font-sans [&>option]:text-[color:var(--color-fg)]"
                  >
                    <option value="recientes">Recientes</option>
                    <option value="antiguos">Antiguos</option>
                    <option value="titulo">Título A–Z</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-fg-muted)] xl:right-3"
                    aria-hidden="true"
                  />
                </div>

                {isAdmin ? (
                  <button
                    type="button"
                    onClick={onNewPublication}
                    className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-white px-3 font-mono text-[8px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)] xl:h-11 xl:px-5 xl:text-[9px]"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="xl:hidden">Agregar</span>
                    <span className="hidden xl:inline">Agregar publicación</span>
                  </button>
                ) : null}

                {hasFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 self-start font-mono text-[8px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white sm:self-auto xl:text-[9px]"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                    Limpiar
                  </button>
                ) : null}
              </div>
            </div>
          </search>
        </Reveal>

        {actionError || error ? (
          <div
            role="alert"
            className="mt-6 flex flex-col gap-3 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{actionError || error}</p>
            {!actionError && error && onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                disabled={loading}
                className="self-start border border-red-200/50 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.16em] text-red-100 transition-colors hover:border-red-100 hover:bg-red-400/15 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                Reintentar
              </button>
            ) : null}
          </div>
        ) : null}

        {loading ? (
          <div
            className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[170px]"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const layout = getLayout(index, 6)
              return (
                <div
                  key={index}
                  className={`${layout.span} aspect-[4/3] animate-pulse border border-[color:var(--color-line)] bg-[color:var(--color-surface)] lg:aspect-auto lg:min-h-0`}
                />
              )
            })}
          </div>
        ) : error && publications.length === 0 ? null : filtered.length === 0 ? (
          <Reveal>
            <div className="mt-6 border border-dashed border-[color:var(--color-line)] px-6 py-12 text-center sm:py-16">
              <p className="font-display text-2xl tracking-[-0.02em] sm:text-3xl">
                {publications.length === 0 ? 'Aún no hay publicaciones' : 'Sin resultados'}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                {publications.length === 0
                  ? 'Cuando se publique un servicio aparecerá aquí, dentro del mosaico.'
                  : 'No encontramos servicios con esos criterios. Prueba otra palabra o vuelve al mosaico completo.'}
              </p>
              {publications.length === 0 && isAdmin ? (
                <button
                  type="button"
                  onClick={onNewPublication}
                  className="mt-6 inline-flex items-center gap-2 bg-white px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Crear la primera publicación
                </button>
              ) : publications.length > 0 ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 border border-white/40 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Ver todo el mosaico
                </button>
              ) : null}
            </div>
          </Reveal>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[170px]">
            {filtered.map((publication, index) => {
              const layout = getLayout(index, filtered.length)
              return (
                <Reveal
                  key={publication.id}
                  delay={(index % 4) * 60}
                  rangeEnd={100}
                  className={`mosaic-reveal ${layout.span} h-full ${
                    filtered.length === 1 ? 'md:col-span-2' : ''
                  }`}
                >
                  <PublicationCard
                    publication={publication}
                    index={index}
                    featured={layout.tall}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Reveal>
              )
            })}
          </div>
        )}

        <Reveal delay={120}>
          <div className="group/cta relative mt-8 overflow-hidden border border-white/10 bg-[color:var(--color-surface)]">
            <div className="cta-pulse pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_100%_0%,rgba(255,255,255,0.08),transparent_55%)]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8">
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-fg-soft)] sm:text-base">
                Cada proyecto se acompaña de planos, imágenes y una descripción del proceso.
              </p>

              <a href="#contacto" className="group/link inline-flex items-center gap-4">
                <span className="relative font-display text-xl leading-none tracking-[-0.02em] text-white sm:text-2xl">
                  Hablemos de un proyecto
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover/link:scale-x-100" />
                </span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover/link:border-white group-hover/link:bg-white group-hover/link:text-black">
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
