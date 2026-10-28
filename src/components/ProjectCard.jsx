import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, index, wide = false, onOpen }) {
  return (
    <article className="group relative flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        aria-label={`Ver proyecto ${project.title}`}
      />

      <div className="relative overflow-hidden border border-ink/15 bg-paper-2">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025] ${
            wide ? 'aspect-[16/10] lg:aspect-[21/8]' : 'aspect-[4/3]'
          }`}
        />
        <div
          className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 border border-ink/20 bg-paper/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft backdrop-blur-sm">
          {project.code}
        </span>
        <span className="absolute right-4 top-4 bg-paper/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft backdrop-blur-sm">
          {project.year}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper opacity-0 transition-all duration-300 group-hover:opacity-100">
          Ver proyecto
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper">
            {project.category}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
            {project.area} · {project.location}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl leading-tight tracking-[-0.02em] transition-colors group-hover:text-blueprint sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 font-display text-base italic leading-snug text-blueprint">
          {project.concept}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`Herramientas de ${project.title}`}>
          <li className="border border-ink/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
            {project.status}
          </li>
          {project.tools.map((tool) => (
            <li
              key={tool}
              className="border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
