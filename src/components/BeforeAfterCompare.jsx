import { useEffect, useState } from 'react'
import { ArrowLeftRight, Image as ImageIcon } from 'lucide-react'
import { resolveImageUrl } from '../lib/images'
import Reveal from './Reveal'

const DEFAULT_BEFORE = 'proyectos/p01.svg'
const DEFAULT_AFTER = 'proyectos/p07.jpg'

export default function BeforeAfterCompare({ service }) {
  const [showAfter, setShowAfter] = useState(false)
  const images = (service.images ?? []).map(resolveImageUrl).filter(Boolean)
  const hasPair = images.length >= 2
  const before = hasPair ? images[0] : resolveImageUrl(DEFAULT_BEFORE)
  const after = hasPair ? images[1] : resolveImageUrl(DEFAULT_AFTER)

  useEffect(() => {
    setShowAfter(false)
  }, [service.id])

  return (
    <Reveal delay={180}>
      <div className="mt-16 border-t border-[color:var(--color-line)] pt-10">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
              Antes y después
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[color:var(--color-fg-soft)]">
              Compara el estado inicial con el resultado final de la remodelación. En escritorio
              pasa el cursor sobre la imagen; en móvil usa los botones.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--color-fg-muted)]">
            <ImageIcon className="h-3 w-3" aria-hidden="true" />
            {hasPair ? 'Comparativa' : 'Referencia'}
          </span>
        </div>

        <div className="group relative mt-6 aspect-[16/10] overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
          <img
            src={before}
            alt={`${service.title} — antes`}
            className="h-full w-full object-cover"
          />
          <img
            src={after}
            alt={`${service.title} — después`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              showAfter ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
            }`}
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <span className="border border-white/25 bg-black/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
              Antes
            </span>
            <span className="border border-white/45 bg-white px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-black">
              Después
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-16">
            <p className="text-xs leading-relaxed text-white/80">
              {hasPair
                ? 'Desliza el cursor o alterna los botones para ver el cambio.'
                : 'Imágenes de referencia. Se reemplazarán con el antes y después reales.'}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:mx-auto sm:max-w-sm">
          <button
            type="button"
            onClick={() => setShowAfter(false)}
            aria-pressed={!showAfter}
            className={`inline-flex items-center justify-center border px-5 py-3.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
              !showAfter
                ? 'border-white bg-white text-black'
                : 'border-[color:var(--color-line)] text-[color:var(--color-fg-soft)] hover:border-white/50 hover:text-white'
            }`}
          >
            Ver antes
          </button>
          <button
            type="button"
            onClick={() => setShowAfter(true)}
            aria-pressed={showAfter}
            className={`inline-flex items-center justify-center border px-5 py-3.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
              showAfter
                ? 'border-white bg-white text-black'
                : 'border-[color:var(--color-line)] text-[color:var(--color-fg-soft)] hover:border-white/50 hover:text-white'
            }`}
          >
            Ver después
          </button>
        </div>
      </div>
    </Reveal>
  )
}
