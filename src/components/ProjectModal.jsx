import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { whatsappHref } from '../data/socials'
import WhatsAppIcon from './WhatsAppIcon'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    if (!project && dialog.open) {
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
      className="m-auto max-h-[90vh] w-[min(64rem,92vw)] overflow-y-auto border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-0 text-[color:var(--color-fg)] shadow-2xl"
    >
      {project ? (
        <article>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[color:var(--color-line)] bg-black/95 px-5 py-4 backdrop-blur-sm sm:px-8">
            <div>
              <p className="eyebrow">
                {project.category} / {project.year}
              </p>
              <h2
                id="project-modal-title"
                className="mt-1 font-display text-xl leading-tight tracking-[-0.02em] sm:text-3xl"
              >
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-line)] transition-colors hover:border-white hover:bg-white hover:text-black"
              aria-label="Cerrar proyecto"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <img
            src={project.image}
            alt={project.imageAlt}
            className="aspect-[16/9] w-full border-b border-[color:var(--color-line)] object-cover"
          />

          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                  {project.longDescription}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Herramientas del proyecto">
                  {project.tools.map((tool) => (
                    <li
                      key={tool}
                      className="border border-[color:var(--color-line)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-soft)]"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[color:var(--color-line)] pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div>
                  <dt className="eyebrow">Año</dt>
                  <dd className="mt-1 text-sm">{project.year}</dd>
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
                  <dd className="mt-1 text-sm">Proyecto académico</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                ¿Te interesa un proyecto con un enfoque similar?
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar por WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      ) : null}
    </dialog>
  )
}
