import { ArrowUpRight, MapPin, Pencil, Trash2 } from 'lucide-react'
import { resolveImageUrl } from '../lib/images'

export default function PublicationCard({
  publication,
  index,
  featured = false,
  isAdmin,
  onOpen,
  onEdit,
  onDelete,
}) {
  const cover = resolveImageUrl(publication.images?.[0])

  return (
    <article className="group relative h-full overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
      <button
        type="button"
        onClick={() => onOpen(publication)}
        className="absolute inset-0 z-10"
        aria-label={`Ver publicación ${publication.title}`}
      />

      <div className="relative h-full min-h-[320px] w-full sm:min-h-[380px] lg:min-h-0">
        {cover ? (
          <img
            src={cover}
            alt={publication.title}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-surface)]">
            <span className="font-display text-5xl text-[color:var(--color-fg-muted)]">CQ</span>
          </div>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10"
          aria-hidden="true"
        />

        <span className="absolute left-5 top-5 font-mono text-[8px] uppercase tracking-[0.24em] text-white/65">
          S.{String(index + 1).padStart(2, '0')}
        </span>

        {isAdmin ? (
          <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onEdit(publication)}
              className="inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-black/65 text-white/80 backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
              aria-label={`Editar ${publication.title}`}
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(publication)}
              className="inline-flex h-9 w-9 items-center justify-center border border-white/30 bg-black/65 text-white/80 backdrop-blur-sm transition-colors hover:border-red-300 hover:bg-red-400/20 hover:text-red-200"
              aria-label={`Eliminar ${publication.title}`}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : publication.year ? (
          <span className="absolute right-5 top-5 font-mono text-[8px] uppercase tracking-[0.24em] text-white/65">
            {publication.year}
          </span>
        ) : null}

        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/65">
                <span>{publication.category}</span>
                {publication.location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {publication.location}
                  </span>
                ) : null}
              </p>
              <h3
                className={`mt-2 font-display leading-tight tracking-[-0.01em] text-white ${
                  featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
                }`}
              >
                {publication.title}
              </h3>
            </div>
            <span className="mb-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-white/70 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
              Ver
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              featured ? 'max-h-52' : 'max-h-52 lg:max-h-0 lg:group-hover:max-h-52'
            }`}
          >
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/75 transition-colors duration-500 group-hover:text-white/90">
              {publication.description}
            </p>

            {publication.client ? (
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/50">
                {publication.client}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
