import { useMemo, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const categories = ['Todos', ...Array.from(new Set(projects.map((project) => project.category)))]

function getLayout(index, total) {
  if (total === 1) return 'lg:col-span-12'
  if (index === 0) return 'lg:col-span-7'
  if (index === 1) return 'lg:col-span-5'
  if (total === 3 && index === 2) return 'lg:col-span-12'
  if (total === 4) return 'lg:col-span-6'
  if (total === 5 && index === 4) return 'lg:col-span-12'
  if (total === 6 && index === 5) return 'lg:col-span-12'
  return 'lg:col-span-4'
}

export default function Projects({ onOpenProject }) {
  const [filter, setFilter] = useState('Todos')

  const filtered = useMemo(() => {
    if (filter === 'Todos') return projects
    return projects.filter((project) => project.category === filter)
  }, [filter])

  return (
    <section id="proyectos" className="border-t border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              index="02"
              label="Proyectos"
              title={
                <>
                  Obra <span className="italic text-blueprint">seleccionada</span>
                </>
              }
              intro="Una selección de proyectos que explora la relación entre el lugar, la materialidad y la experiencia del espacio."
            />
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
              {String(filtered.length).padStart(2, '0')} proyectos
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <nav className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" role="tablist" aria-label="Filtrar proyectos por categoría">
            {categories.map((category) => {
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

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {filtered.map((project, index) => {
            const layout = getLayout(index, filtered.length)
            return (
              <Reveal
                key={project.id}
                delay={(index % 3) * 70}
                className={`${layout} ${filtered.length === 1 ? 'md:col-span-2' : ''}`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  wide={layout === 'lg:col-span-12'}
                  onOpen={onOpenProject}
                />
              </Reveal>
            )
          })}
        </div>

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
