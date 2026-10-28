import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, index, wide = false, onOpen }) {
  return (
    <article className="group relative">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="absolute inset-0 z-10"
        aria-label={`Ver proyecto ${project.title}`}
      />

      <div className="relative overflow-hidden bg-[color:var(--color-surface)]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full object-cover transition duration-[2000ms] ease-out group-hover:scale-[1.08] ${
            wide ? 'aspect-[16/10] lg:aspect-[21/9]' : 'aspect-[4/3]'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" aria-hidden="true" />
        <span className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
          {project.code}
        </span>
        <span className="absolute right-6 top-6 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
          {project.year}
        </span>
        <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-700 group-hover:-translate-y-1 group-hover:opacity-100">
          Ver proyecto
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4 border-b border-[color:var(--color-line)] pb-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
            {project.category}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
            {project.location}
          </span>
        </div>
        <h3 className="mt-4 font-display text-3xl leading-tight tracking-[-0.02em] transition-colors group-hover:text-white sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Herramientas de ${project.title}`}>
          {project.tools.map((tool) => (
            <li
              key={tool}
              className="border border-[color:var(--color-line)] px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
