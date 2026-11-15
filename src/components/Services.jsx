import { useMemo, useState } from 'react'
import { ArrowUpRight, Plus, Search, X } from 'lucide-react'
import PublicationCard from './PublicationCard'
import PublicationModal from './PublicationModal'
import Reveal from './Reveal'

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
  const [query, setQuery] = useState('')
  const [activePublication, setActivePublication] = useState(null)
  const [actionError, setActionError] = useState('')

  const categories = useMemo(() => {
    const values = new Set(publications.map((publication) => publication.category).filter(Boolean))
    return ['Todos', ...values]
  }, [publications])

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

  const activeFilter = categories.includes(filter) ? filter : 'Todos'

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    return publications.filter((publication) => {
      const matchesCategory =
        activeFilter === 'Todos' || publication.category === activeFilter
      if (!matchesCategory) return false
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
  }, [publications, activeFilter, query])

  const hasFilters = activeFilter !== 'Todos' || query.trim() !== ''

  const resetFilters = () => {
    setFilter('Todos')
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
      if (activePublication?.id === publication.id) setActivePublication(null)
      return true
    } catch {
      setActionError('No pudimos eliminar la publicación. Inténtalo de nuevo.')
      return false
    }
  }

  const handleEdit = (publication) => {
    setActivePublication(null)
    onEditPublication(publication.id)
  }

  return (
    <section id="servicios" className="border-t border-[color:var(--color-line)] py-24 sm:py-32">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--color-fg-muted)]">
                <span className="h-px w-8 bg-white" aria-hidden="true" />
                02 / Servicios
              </p>
              <h2 className="mt-6 font-display text-[clamp(3rem,9vw,7rem)] font-light leading-[0.9] tracking-[-0.06em]">
                Servicios
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                Dirección, residencia, interventoría, contratación y formulación de proyectos para
                clientes privados y entidades públicas.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              {isAdmin ? (
                <span className="border border-white/25 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-white/80">
                  Modo admin
                </span>
              ) : null}
              <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--color-fg-muted)]">
                {String(filtered.length).padStart(2, '0')} publicaciones
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 flex flex-col gap-5 border-y border-[color:var(--color-line)] py-5 lg:flex-row lg:items-center lg:justify-between">
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
              aria-label="Filtrar servicios por categoría"
            >
              {categories.map((category) => {
                const isActive = activeFilter === category
                const count = category === 'Todos' ? publications.length : counts[category]
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    aria-pressed={isActive}
                    className={`group relative pb-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-[color:var(--color-fg-muted)] hover:text-white'
                    }`}
                  >
                    {category}
                    <span
                      className={`ml-2 text-[8px] ${
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
            </nav>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-64">
                <label htmlFor="services-search" className="sr-only">
                  Buscar publicaciones
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

              {isAdmin ? (
                <button
                  type="button"
                  onClick={onNewPublication}
                  className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Agregar publicación
                </button>
              ) : null}
            </div>
          </div>
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
            className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[230px]"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const layout = getLayout(index, 6)
              return (
                <div
                  key={index}
                  className={`${layout.span} min-h-[320px] animate-pulse border border-[color:var(--color-line)] bg-[color:var(--color-surface)] lg:min-h-0`}
                />
              )
            })}
          </div>
        ) : error && publications.length === 0 ? null : filtered.length === 0 ? (
          <Reveal>
            <div className="mt-10 border border-dashed border-[color:var(--color-line)] px-6 py-16 text-center sm:py-24">
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
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[230px]">
            {filtered.map((publication, index) => {
              const layout = getLayout(index, filtered.length)
              return (
                <Reveal
                  key={publication.id}
                  delay={(index % 4) * 60}
                  className={`${layout.span} h-full ${
                    filtered.length === 1 ? 'md:col-span-2' : ''
                  }`}
                >
                  <PublicationCard
                    publication={publication}
                    index={index}
                    featured={layout.tall}
                    isAdmin={isAdmin}
                    onOpen={setActivePublication}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Reveal>
              )
            })}
          </div>
        )}

        <div className="mt-12 flex flex-col gap-4 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
            Servicios prestados a empresas privadas, entidades públicas y clientes particulares.
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white sm:self-auto"
            >
              Limpiar filtros
            </button>
          ) : (
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)] transition-colors hover:text-white"
            >
              Hablemos de un proyecto
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>

      <PublicationModal
        publication={activePublication}
        isAdmin={isAdmin}
        onClose={() => setActivePublication(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  )
}
