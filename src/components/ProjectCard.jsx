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
          className={`w-full object-cover transition duration-[1600ms] ease-out group-hover:scale-[1.04] ${
            wide ? 'aspect-[16/10] lg:aspect-[21/9]' : 'aspect-[4/3]'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" aria-hidden="true" />
        <span className="absolute left-5 top-5 font-mono text-[8px] uppercase tracking-[0.24em] text-white/60">
          {project.code}
        </span>
        <span className="absolute right-5 top-5 font-mono text-[8px] uppercase tracking-[0.24em] text-white/60">
          {project.year}
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/60">
                {project.category} · {project.location}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.01em] sm:text-3xl">
                {project.title}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-white/70 opacity-0 transition-all duration-700 group-hover:translate-x-1 group-hover:opacity-100">
              Ver
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-4 grid max-h-0 overflow-hidden gap-3 transition-all duration-700 ease-out group-hover:max-h-40">
            <p className="max-w-xl text-sm leading-relaxed text-white/80">{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={`Herramientas de ${project.title}`}>
              {project.tools.map((tool) => (
                <li
                  key={tool}
                  className="border border-white/30 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.2em] text-white/70"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}
