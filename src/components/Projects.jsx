import { useMemo, useState } from 'react'
import { ArrowUpDown, ArrowUpRight, LayoutGrid, List, Search, X } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const categories = ['Todos', ...Array.from(new Set(projects.map((project) => project.category)))]

const categoryCounts = projects.reduce((counts, project) => {
  counts[project.category] = (counts[project.category] ?? 0) + 1
  return counts
}, {})

function getSpan(index, total) {
  if (total === 1) return 'lg:col-span-12'
  if (total === 2) return 'lg:col-span-6'
  if (index === 0) return 'lg:col-span-8'
  if (index === 1) return 'lg:col-span-4'
  if (index === total - 1 && total % 2 === 1) return 'lg:col-span-12'
  return 'lg:col-span-6'
}

function sortProjects(list, sort) {
  const sorted = [...list]
  if (sort === 'oldest') return sorted.sort((a, b) => Number(a.year) - Number(b.year))
  if (sort === 'title') return sorted.sort((a, b) => a.title.localeCompare(b.title, 'es'))
  return sorted.sort((a, b) => Number(b.year) - Number(a.year))
}

export default function Projects({ onOpenProject }) {
  const [filter, setFilter] = useState('Todos')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recent')
  const [view, setView] = useState('grid')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    let list = projects.filter((project) => filter === 'Todos' || project.category === filter)

    if (term) {
      list = list.filter((project) =>
        [project.title, project.category, project.location, project.concept, project.description, project.tools.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
    }

    return sortProjects(list, sort)
  }, [filter, query, sort])

  const hasFilters = filter !== 'Todos' || query.trim() !== ''

  const resetFilters = () => {
    setFilter('Todos')
    setQuery('')
  }

  return (
    <section id="proyectos" className="py-24 sm:py-36">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-6 bg-white" aria-hidden="true" />
                02 / Catálogo
              </p>
              <h2 className="mt-6 display-title text-[clamp(3rem,9vw,7rem)]">
                Obra <span className="italic">seleccionada</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                Un catálogo de proyectos que explora la relación entre el lugar, la materialidad y la experiencia del espacio.
              </p>
            </div>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.26em] text-[color:var(--color-fg-muted)]">
              {String(filtered.length).padStart(2, '0')} proyectos
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <label htmlFor="catalog-search" className="sr-only">
                  Buscar proyectos
                </label>
                <Search
                  className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-fg-muted)]"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar proyecto..."
                  className="w-full border-b border-[color:var(--color-line)] bg-transparent py-2.5 pl-6 pr-8 font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg)] placeholder:text-[color:var(--color-fg-muted)] focus:border-white focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-0 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-[color:var(--color-fg-muted)] transition-colors hover:text-[color:var(--color-fg)]"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3.5 w-3.5 text-[color:var(--color-fg-muted)]" aria-hidden="true" />
                  <label htmlFor="catalog-sort" className="sr-only">
                    Ordenar proyectos
                  </label>
                  <select
                    id="catalog-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="bg-transparent font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] transition-colors hover:text-[color:var(--color-fg)] focus:text-[color:var(--color-fg)] focus:outline-none"
                  >
                    <option value="recent">Recientes</option>
                    <option value="oldest">Antiguos</option>
                    <option value="title">Título A–Z</option>
                  </select>
                </div>

                <div className="flex items-center gap-1" role="group" aria-label="Vista del catálogo">
                  <button
                    type="button"
                    onClick={() => setView('grid')}
                    aria-pressed={view === 'grid'}
                    className={`inline-flex h-9 w-9 items-center justify-center transition-colors ${
                      view === 'grid' ? 'text-[color:var(--color-fg)]' : 'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]'
                    }`}
                    aria-label="Vista de cuadrícula"
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('index')}
                    aria-pressed={view === 'index'}
                    className={`inline-flex h-9 w-9 items-center justify-center transition-colors ${
                      view === 'index' ? 'text-[color:var(--color-fg)]' : 'text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]'
                    }`}
                    aria-label="Vista de índice"
                  >
                    <List className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <nav
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
              role="tablist"
              aria-label="Filtrar proyectos por categoría"
            >
              {categories.map((category) => {
                const isActive = filter === category
                const count = category === 'Todos' ? projects.length : categoryCounts[category]
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
                      className={`ml-2 text-[8px] ${isActive ? 'text-[color:var(--color-fg-soft)]' : 'text-[color:var(--color-fg-muted)]'}`}
                      aria-hidden="true"
                    >
                      {count}
                    </span>
                    <span
                      className={`absolute left-0 bottom-0 h-px w-full bg-[color:var(--color-fg)] transition-transform duration-500 ease-out origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                )
              })}
            </nav>

            <div className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft" aria-live="polite">
                {String(filtered.length).padStart(2, '0')}{' '}
                {filtered.length === 1 ? 'proyecto' : 'proyectos'} / 2023—2026
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-blueprint underline decoration-line underline-offset-4 transition-colors hover:text-copper"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  Limpiar filtros
                </button>
              ) : (
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                  Índice de obra
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <Reveal>
            <div className="mt-10 border border-dashed border-line px-6 py-16 text-center sm:py-24">
              <p className="font-display text-2xl tracking-[-0.02em] sm:text-3xl">Sin resultados</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                No encontramos proyectos con esos criterios. Prueba otra palabra o vuelve al
                catálogo completo.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 border border-ink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
              >
                Ver todo el catálogo
              </button>
            </div>
          </Reveal>
        ) : view === 'grid' ? (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
            {filtered.map((project, index) => {
              const span = getSpan(index, filtered.length)
              const wide = span === 'lg:col-span-12'
              return (
                <Reveal
                  key={project.id}
                  delay={(index % 3) * 70}
                  className={`${span} ${wide ? 'md:col-span-2' : ''} ${filtered.length === 1 ? 'md:col-span-2' : ''}`}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    wide={wide}
                    onOpen={onOpenProject}
                  />
                </Reveal>
              )
            })}
          </div>
        ) : (
          <Reveal>
            <div className="mt-10">
              <div className="hidden grid-cols-12 gap-x-4 border-b border-ink/25 pb-2 sm:grid">
                <span className="eyebrow col-span-1">Nº</span>
                <span className="eyebrow col-span-4">Proyecto</span>
                <span className="eyebrow col-span-2">Tipología</span>
                <span className="eyebrow col-span-1">Año</span>
                <span className="eyebrow col-span-2">Área</span>
                <span className="eyebrow col-span-1">Lugar</span>
                <span className="eyebrow col-span-1 text-right">Ver</span>
              </div>

              <ul>
                {filtered.map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => onOpenProject(project)}
                      className="group grid w-full grid-cols-12 items-center gap-x-4 gap-y-1 border-b border-line py-5 text-left transition-colors hover:bg-paper-2/60"
                      aria-label={`Ver proyecto ${project.title}`}
                    >
                      <span className="col-span-2 font-mono text-[9px] uppercase tracking-[0.16em] text-copper sm:col-span-1">
                        {project.code}
                      </span>
                      <span className="col-span-10 sm:col-span-4">
                        <span className="block font-display text-xl leading-tight tracking-[-0.02em] transition-colors group-hover:text-blueprint sm:text-2xl">
                          {project.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-soft sm:line-clamp-1">
                          {project.concept}
                        </span>
                      </span>
                      <span className="col-span-6 col-start-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft sm:col-span-2 sm:col-start-auto">
                        {project.category}
                      </span>
                      <span className="col-span-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft sm:col-span-1">
                        {project.year}
                      </span>
                      <span className="col-span-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft sm:col-span-2">
                        {project.area}
                      </span>
                      <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft sm:col-span-1 sm:block">
                        {project.location}
                      </span>
                      <span className="hidden justify-end sm:col-span-1 sm:flex">
                        <span className="inline-flex h-8 w-8 items-center justify-center border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
            Cada proyecto se acompaña de planos, imágenes y una descripción del proceso.
          </p>
          <a
            href="#contacto"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-blueprint underline decoration-line underline-offset-4 transition-colors hover:text-copper"
          >
            Hablemos de un proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
