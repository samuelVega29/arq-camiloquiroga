import { Boxes, HardHat, Ruler, SunMedium } from 'lucide-react'
import Reveal from './Reveal'

const pillars = [
  {
    number: '01',
    icon: Ruler,
    title: 'Diseño arquitectónico',
    description:
      'Definimos la forma, la estructura y los detalles constructivos antes de llegar a obra.',
    items: ['Estudio del lugar', 'Anteproyecto', 'Detalle constructivo'],
  },
  {
    number: '02',
    icon: Boxes,
    title: 'Modelado BIM / 3D',
    description:
      'Coordinamos disciplinas en un modelo compartido para anticipar decisiones y reducir reprocesos.',
    items: ['Modelo Revit', 'Documentación técnica', 'Coordinación'],
  },
  {
    number: '03',
    icon: SunMedium,
    title: 'Visualización',
    description:
      'Traducimos el proyecto en imágenes y recorridos que revelan escala, luz y materiales.',
    items: ['Renders', 'Recorridos', 'Láminas'],
  },
  {
    number: '04',
    icon: HardHat,
    title: 'Dirección de obra',
    description:
      'Acompañamos la ejecución para que cada decisión en obra conserve la intención del diseño.',
    items: ['Residencia', 'Costos y plazos', 'Contratistas'],
  },
]

const timelineColumns = [pillars.slice(0, 2), pillars.slice(2)]

export default function Approach() {
  return (
    <section id="enfoque" className="relative pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_80%_0%,rgba(255,255,255,0.05),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-end lg:gap-10">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
                Enfoque
              </p>
              <h2 className="display-title mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl">
                Del lugar a la{' '}
                <span className="italic text-[color:var(--color-fg-soft)]">experiencia</span>
              </h2>
            </div>
            <p className="max-w-prose text-pretty text-sm leading-relaxed text-[color:var(--color-fg-soft)] sm:text-base">
              Cuatro etapas claras, una sola intención: convertir el contexto en un espacio que se
              entiende, se habita y se sostiene.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid max-w-5xl gap-x-8 gap-y-4 md:grid-cols-2 md:gap-x-10">
          {timelineColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="relative">
              <span
                className="absolute bottom-2 left-[15px] top-2 w-[2px] rounded-full bg-white/25 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                aria-hidden="true"
              />

              <ol>
                {column.map((pillar, itemIndex) => {
                  const Icon = pillar.icon
                  const step = columnIndex * 2 + itemIndex

                  return (
                    <li key={pillar.number} className="relative pb-4 pl-12 last:pb-0 sm:pl-14">
                      <span className="absolute left-0 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#050505] font-mono text-[10px] text-white/80 shadow-[0_0_0_5px_rgba(0,0,0,0.35)]">
                        {pillar.number}
                      </span>

                      <Reveal delay={step * 60}>
                        <article className="group rounded-sm border border-white/10 bg-white/[0.02] p-4 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.04] sm:p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                                Etapa {pillar.number}
                              </p>
                              <h3 className="mt-1 font-display text-xl leading-snug tracking-[-0.03em] text-balance sm:text-2xl">
                                {pillar.title}
                              </h3>
                            </div>
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                              <Icon className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                            </span>
                          </div>

                          <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                            {pillar.description}
                          </p>

                          <ul className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                            {pillar.items.map((item, itemIndex) => (
                              <li
                                key={item}
                                className="font-mono text-[11px] text-[color:var(--color-fg-muted)] transition-colors duration-500 group-hover:text-[color:var(--color-fg-soft)]"
                              >
                                {item}
                                {itemIndex < pillar.items.length - 1 ? (
                                  <span className="ml-2 text-white/25" aria-hidden="true">
                                    /
                                  </span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </article>
                      </Reveal>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
