import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon, Play } from 'lucide-react'
import { resolveImageUrl } from '../lib/images'
import Reveal from './Reveal'

const FALLBACK_IMAGES = [
  'construccion/construccion-01.jpg',
  'construccion/construccion-02.jpg',
  'construccion/construccion-03.webp',
  'construccion/construccion-04.webp',
  'proyectos/p07.jpg',
]

const FALLBACK_VIDEO = 'construccion/construccion-06.webp'

function buildMedia(service) {
  const provided = (service.images ?? []).map(resolveImageUrl).filter(Boolean)
  const media = provided.map((src, index) => ({
    type: 'image',
    src,
    label: `Foto ${String(index + 1).padStart(2, '0')}`,
  }))
  const used = new Set(provided)

  for (const fallback of FALLBACK_IMAGES) {
    if (media.length >= 5) break
    const src = resolveImageUrl(fallback)
    if (used.has(src)) continue
    media.push({
      type: 'image',
      src,
      label: `Referencia ${String(media.length + 1).padStart(2, '0')}`,
    })
    used.add(src)
  }

  media.push({
    type: 'video',
    poster: resolveImageUrl(FALLBACK_VIDEO),
    label: 'Video del proceso',
  })

  return media
}

export default function ServiceGallery({ service }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const media = buildMedia(service)
  const active = media[activeIndex] ?? media[0]
  const hasMultiple = media.length > 1

  useEffect(() => {
    setActiveIndex(0)
  }, [service.id])

  const move = (delta) => {
    if (!hasMultiple) return
    setActiveIndex((current) => (current + delta + media.length) % media.length)
  }

  return (
    <Reveal delay={140}>
      <div className="mt-16 border-t border-[color:var(--color-line)] pt-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
              Catálogo visual
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-fg-muted)]">
            {String(media.length).padStart(2, '0')} archivos
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="relative aspect-[16/10] overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)] lg:col-span-8">
            {active.type === 'video' ? (
              <>
                <img
                  src={active.poster}
                  alt=""
                  className="h-full w-full object-cover opacity-55"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 px-6 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/40 text-white backdrop-blur-sm">
                    <Play className="ml-1 h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="font-display text-2xl leading-tight text-white sm:text-3xl">
                    Video próximamente
                  </p>
                  <p className="max-w-sm text-sm leading-relaxed text-white/75">
                    Aquí se mostrará el recorrido audiovisual del servicio cuando esté disponible.
                  </p>
                </div>
              </>
            ) : (
              <img
                src={active.src}
                alt={`${service.title} — ${active.label}`}
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
              <span className="inline-flex items-center gap-2 border border-white/25 bg-black/55 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                {active.type === 'video' ? (
                  <Play className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <ImageIcon className="h-3 w-3" aria-hidden="true" />
                )}
                {active.type === 'video' ? 'Video' : active.label}
              </span>
              <span className="border border-white/25 bg-black/55 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(media.length).padStart(2, '0')}
              </span>
            </div>

            {hasMultiple ? (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black sm:left-4 sm:h-11 sm:w-11"
                  aria-label="Archivo anterior"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black sm:right-4 sm:h-11 sm:w-11"
                  aria-label="Archivo siguiente"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-2">
            {media.map((item, index) => {
              const isActive = index === activeIndex
              const preview = item.type === 'video' ? item.poster : item.src
              return (
                <button
                  key={`${item.type}-${preview}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative aspect-[4/3] overflow-hidden border transition-colors ${
                    isActive
                      ? 'border-white'
                      : 'border-[color:var(--color-line)] hover:border-white/60'
                  }`}
                  aria-label={`Ver ${item.label}`}
                  aria-pressed={isActive}
                >
                  <img
                    src={preview}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover transition duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-65 group-hover:opacity-100'
                    }`}
                  />
                  {item.type === 'video' ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-black/50 text-white">
                        <Play className="ml-0.5 h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </span>
                  ) : null}
                  <span className="absolute inset-x-0 bottom-0 truncate bg-black/65 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/80">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
