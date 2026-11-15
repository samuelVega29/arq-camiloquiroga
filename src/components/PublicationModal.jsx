import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Pencil, Trash2, X } from 'lucide-react'
import { resolveImageUrl } from '../lib/images'

export default function PublicationModal({ publication, isAdmin, onClose, onEdit, onDelete }) {
  const dialogRef = useRef(null)
  const [activeImage, setActiveImage] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    setActiveImage(0)
    setDeleting(false)
    setDeleteError('')
  }, [publication?.id])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (publication && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    }

    if (!publication && dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [publication])

  useEffect(() => {
    if (!publication) return

    const handleKeyDown = (event) => {
      const total = publication.images?.length ?? 0
      if (total < 2) return
      if (event.key === 'ArrowRight') {
        setActiveImage((current) => (current + 1) % total)
      }
      if (event.key === 'ArrowLeft') {
        setActiveImage((current) => (current - 1 + total) % total)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [publication])

  const handleBackdrop = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  const handleDelete = async () => {
    if (!publication || deleting) return
    setDeleting(true)
    setDeleteError('')
    try {
      const removed = await onDelete(publication)
      if (removed) {
        onClose()
      } else {
        setDeleting(false)
      }
    } catch {
      setDeleteError('No pudimos eliminar la publicación.')
      setDeleting(false)
    }
  }

  const images = publication?.images ?? []
  const image = resolveImageUrl(images[activeImage] ?? images[0])
  const meta = publication
    ? [
        { label: 'Categoría', value: publication.category },
        { label: 'Ubicación', value: publication.location },
        { label: 'Cliente', value: publication.client },
        { label: 'Año', value: publication.year },
        { label: 'Valor', value: publication.value },
      ].filter((item) => item.value && item.value !== '—')
    : []

  const moveImage = (delta) => {
    if (images.length < 2) return
    setActiveImage((current) => (current + delta + images.length) % images.length)
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdrop}
      aria-labelledby="publication-modal-title"
      className="m-auto max-h-[90vh] w-[min(66rem,94vw)] overflow-y-auto border border-[color:var(--color-line)] bg-[color:var(--color-bg)] p-0 text-[color:var(--color-fg)] shadow-2xl"
    >
      {publication ? (
        <article>
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[color:var(--color-line)] bg-black/95 px-5 py-4 backdrop-blur-md sm:px-8">
            <div className="min-w-0">
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[color:var(--color-fg-muted)]">
                {publication.category}
                {publication.year ? ` / ${publication.year}` : ''}
              </p>
              <h2
                id="publication-modal-title"
                className="mt-1 truncate font-display text-xl leading-tight tracking-[-0.02em] sm:text-3xl"
              >
                {publication.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--color-line)] text-[color:var(--color-fg-soft)] transition-colors hover:border-white hover:bg-white hover:text-black"
              aria-label="Cerrar publicación"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative bg-black">
            {image ? (
              <img
                src={image}
                alt={publication.title}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center">
                <span className="font-display text-6xl text-[color:var(--color-fg-muted)]">CQ</span>
              </div>
            )}

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => moveImage(-1)}
                  className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(1)}
                  className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="absolute bottom-4 right-4 border border-white/30 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                  {String(activeImage + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto border-b border-[color:var(--color-line)] bg-black px-5 py-3 sm:px-8">
              {images.map((thumbnail, index) => (
                <button
                  key={`${thumbnail.slice(0, 32)}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-20 shrink-0 overflow-hidden border transition-colors ${
                    index === activeImage
                      ? 'border-white'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={resolveImageUrl(thumbnail)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}

          <div className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {publication.location}
                </p>
                <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
                  {publication.description}
                </p>
              </div>

              {meta.length > 0 ? (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[color:var(--color-line)] pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="font-mono text-[8px] uppercase tracking-[0.2em] text-[color:var(--color-fg-muted)]">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-[color:var(--color-fg)]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            {deleteError ? (
              <p role="alert" className="mt-6 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {deleteError}
              </p>
            ) : null}

            {isAdmin ? (
              <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)]">
                  Gestión de publicación
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(publication)}
                    className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center justify-center gap-2 border border-red-300/40 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-red-200 transition-colors hover:border-red-200 hover:bg-red-400/15 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {deleting ? 'Eliminando' : 'Eliminar'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </article>
      ) : null}
    </dialog>
  )
}
