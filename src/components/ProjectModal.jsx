import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { projects } from '../data/projects'
import { whatsappHref } from '../data/socials'
import WhatsAppIcon from './WhatsAppIcon'

export default function ProjectModal({ project, onClose, onNavigate }) {
  const dialogRef = useRef(null)

  const index = project ? projects.findIndex((item) => item.id === project.id) : -1
  const previous = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : null
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project) {
      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = 'hidden'
      dialog.scrollTop = 0
    } else if (dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[90vh] w-[min(64rem,92vw)] overflow-y-auto border border-ink bg-paper p-0 text-ink shadow-2xl"
    >
      {project ? (
        <article>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/95 px-5 py-4 backdrop-blur-sm sm:px-8">
            <div className="min-w-0">
              <p className="eyebrow">
                {project.code} · {project.category} / {project.year}
              </p>
              <h2
                id="project-modal-title"
                className="mt-1 truncate font-display text-xl leading-tight tracking-[-0.02em] sm:text-3xl"
              >
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              aria-label="Cerrar proyecto"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <img
            src={project.image}
            alt={project.imageAlt}
            className="aspect-[16/9] w-full border-b border-line object-cover"
          />

          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper">
                  Idea arquitectónica
                </p>
                <p className="mt-3 font-display text-xl italic leading-snug text-blueprint sm:text-2xl">
                  {project.concept}
                </p>
                <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {project.longDescription}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Herramientas del proyecto">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div>
                  <dt className="eyebrow">Año</dt>
                  <dd className="mt-1 text-sm">{project.year}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Área</dt>
                  <dd className="mt-1 text-sm">{project.area}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Ubicación</dt>
                  <dd className="mt-1 text-sm">{project.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Tipología</dt>
                  <dd className="mt-1 text-sm">{project.category}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Estado</dt>
                  <dd className="mt-1 text-sm">{project.status}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Código</dt>
                  <dd className="mt-1 text-sm">{project.code}</dd>
                </div>
                <div className="col-span-2 border-t border-line pt-4">
                  <dt className="eyebrow">Rol</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{project.role}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                ¿Te interesa un proyecto con un enfoque similar?
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-copper"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar por WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav
            aria-label="Navegación entre proyectos"
            className="grid grid-cols-2 divide-x divide-line border-t border-line bg-paper-2/60"
          >
            <button
              type="button"
              onClick={() => onNavigate(previous)}
              className="group flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-paper sm:px-8 sm:py-5"
            >
              <ArrowLeft
                className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-ink-soft">
                  Anterior
                </span>
                <span className="mt-1 block truncate font-display text-sm leading-tight sm:text-base">
                  {previous?.title}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group flex items-center justify-end gap-3 px-5 py-4 text-right transition-colors hover:bg-paper sm:px-8 sm:py-5"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-ink-soft">
                  Siguiente
                </span>
                <span className="mt-1 block truncate font-display text-sm leading-tight sm:text-base">
                  {next?.title}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </nav>
        </article>
      ) : null}
    </dialog>
  )
}
