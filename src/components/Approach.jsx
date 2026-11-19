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
    <section
      id="enfoque"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(255,255,255,0.06),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-white/50" aria-hidden="true" />
              Enfoque
            </p>
            <h2 className="display-title mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl">
              Del lugar a la <span className="italic text-[color:var(--color-fg-soft)]">experiencia</span>
            </h2>
            <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
              Un proceso riguroso y sensible, donde cada decisión responde al contexto, al
              programa y a la forma en que las personas habitan el espacio.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Reveal key={pillar.number} delay={index * 90} className="h-full min-w-0">
                <article className="group flex h-full min-w-0 flex-col rounded-sm border border-white/10 bg-white/[0.02] p-5 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 font-mono text-xs text-white/80 transition-colors duration-500 group-hover:border-white/50 group-hover:text-white">
                      {pillar.number}
                    </span>
                    <Icon
                      className="h-5 w-5 shrink-0 text-white/70 transition-transform duration-500 group-hover:-translate-y-0.5"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-7 font-display text-2xl leading-snug tracking-[-0.03em] text-balance">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                    {pillar.description}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="border border-white/10 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-[color:var(--color-fg-muted)] transition-colors duration-500 group-hover:text-[color:var(--color-fg-soft)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={140}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {trajectory.map((item) => (
              <div key={item.label} className="group flex min-w-0 flex-col-reverse gap-3">
                <dt className="font-mono text-xs leading-relaxed text-pretty text-[color:var(--color-fg-muted)]">
                  {item.label}
                </dt>
                <dd className="font-display text-2xl leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-[color:var(--color-fg-soft)] sm:text-3xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={180}>
          <blockquote className="relative mt-16 overflow-hidden pt-10 sm:mt-20">
            <span
              className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[10rem] leading-none text-white/[0.04]"
              aria-hidden="true"
            >
              “
            </span>
            <p className="max-w-3xl font-display text-2xl font-light italic leading-snug tracking-[-0.03em] text-balance text-white sm:text-4xl">
              “El buen diseño no tiene fecha de caducidad.”
            </p>
            <footer className="mt-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              Harry Seidler
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
