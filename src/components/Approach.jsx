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

const trajectory = [
  { value: '21', label: 'Obras y servicios' },
  { value: '04', label: 'Líneas de trabajo' },
  { value: '2018—2026', label: 'Trayectoria documentada' },
]

export default function Approach() {
  return (
    <section id="enfoque" className="relative py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_80%_0%,rgba(255,255,255,0.05),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-white/50" aria-hidden="true" />
                Enfoque
              </p>
              <h2 className="display-title mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl">
                Del lugar a la{' '}
                <span className="italic text-[color:var(--color-fg-soft)]">experiencia</span>
              </h2>
            </div>
            <p className="max-w-prose text-pretty text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
              Cuatro etapas claras, una sola intención: convertir el contexto en un espacio que se
              entiende, se habita y se sostiene.
            </p>
          </div>
        </Reveal>

        <ol className="relative mt-16 max-w-4xl">
          <span
            className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
            aria-hidden="true"
          />

          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <li key={pillar.number} className="relative pb-8 pl-14 last:pb-0 sm:pl-16">
                <span className="absolute left-0 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#050505] font-mono text-xs text-white/80 shadow-[0_0_0_6px_rgba(0,0,0,0.35)]">
                  {pillar.number}
                </span>

                <Reveal delay={index * 60}>
                  <article className="group rounded-sm border border-white/10 bg-white/[0.02] p-5 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.04] sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/45">
                          Etapa {pillar.number}
                        </p>
                        <h3 className="mt-2 font-display text-2xl leading-snug tracking-[-0.03em] text-balance sm:text-3xl">
                          {pillar.title}
                        </h3>
                      </div>
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                      </span>
                    </div>

                    <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-[color:var(--color-fg-soft)] sm:text-base">
                      {pillar.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {pillar.items.map((item, itemIndex) => (
                        <li
                          key={item}
                          className="font-mono text-xs text-[color:var(--color-fg-muted)] transition-colors duration-500 group-hover:text-[color:var(--color-fg-soft)]"
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

        <Reveal delay={160}>
          <div className="mt-16 grid gap-8 rounded-sm border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
            <p className="max-w-prose font-display text-xl font-light italic leading-snug tracking-[-0.02em] text-balance text-white sm:text-2xl">
              “El buen diseño no tiene fecha de caducidad.”
              <span className="mt-3 block font-mono text-xs not-italic uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
                Harry Seidler
              </span>
            </p>

            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {trajectory.map((item) => (
                <div key={item.label} className="group flex min-w-0 flex-col-reverse gap-2">
                  <dt className="font-mono text-xs leading-relaxed text-pretty text-[color:var(--color-fg-muted)]">
                    {item.label}
                  </dt>
                  <dd className="font-display text-2xl leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-white sm:text-3xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
