import { Boxes, HardHat, Ruler, SunMedium } from 'lucide-react'
import Reveal from './Reveal'

const pillars = [
  {
    number: '01',
    icon: Ruler,
    title: 'Diseño arquitectónico',
    description:
      'Del análisis del lugar al proyecto construido. Trabajo la planta, la sección y la materialidad como herramientas para tomar decisiones coherentes.',
    items: ['Estudio del lugar', 'Anteproyecto', 'Desarrollo de detalle'],
    tools: 'Planta · Sección · Materialidad',
  },
  {
    number: '02',
    icon: Boxes,
    title: 'Modelado BIM / 3D',
    description:
      'Construyo modelos coordinados que permiten verificar el proyecto, coordinar disciplinas y anticipar soluciones antes de la obra.',
    items: ['Modelado Revit', 'Documentación técnica', 'Coordinación'],
    tools: 'Revit · AutoCAD · Coordinación',
  },
  {
    number: '03',
    icon: SunMedium,
    title: 'Visualización',
    description:
      'Imágenes y recorridos que comunican la atmósfera del espacio: luz, textura y escala al servicio de la idea arquitectónica.',
    items: ['Renders', 'Recorridos', 'Láminas de presentación'],
    tools: 'Lumion · V-Ray · Photoshop',
  },
  {
    number: '04',
    icon: HardHat,
    title: 'Dirección de obra',
    description:
      'Residencia, interventoría y control de la ejecución: presupuesto, cronograma, contratistas y calidad en obra privada y pública.',
    items: ['Residencia e interventoría', 'Control de costos y plazos', 'Gestión de contratistas'],
    tools: 'Obra privada · Sector público',
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
      className="relative overflow-hidden border-y border-[color:var(--color-line)] py-20 sm:py-28"
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
              03 / Enfoque
            </p>
            <h2 className="display-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Del lugar a la <span className="italic text-[color:var(--color-fg-soft)]">experiencia</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-fg-soft)] sm:text-lg">
              Un proceso riguroso y sensible, donde cada decisión responde al contexto, al
              programa y a la forma en que las personas habitan el espacio.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Reveal key={pillar.number} delay={index * 90} className="h-full">
                <article className="group relative flex h-full flex-col border-t border-white/15 pt-6 transition-colors duration-500 hover:border-white/50">
                  <span
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-700 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fg-muted)] transition-colors duration-500 group-hover:text-white">
                      {pillar.number}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/75 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:border-white/50 group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl leading-tight tracking-[-0.02em] transition-transform duration-500 group-hover:-translate-y-0.5">
                    {pillar.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-fg-soft)]">
                    {pillar.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-4">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)] transition-colors duration-500 group-hover:text-[color:var(--color-fg-soft)]"
                      >
                        <span
                          className="h-1 w-1 bg-white/40 transition-colors duration-500 group-hover:bg-white"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]/70">
                    {pillar.tools}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={140}>
          <dl className="mt-12 grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {trajectory.map((item, index) => (
              <div
                key={item.label}
                className={`group flex items-baseline justify-between gap-4 px-1 py-5 sm:px-6 ${
                  index === 0 ? 'sm:pl-0' : ''
                }`}
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
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
          <blockquote className="relative mt-16 overflow-hidden border-t border-white/15 pt-10 sm:mt-20">
            <span
              className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[10rem] leading-none text-white/[0.04]"
              aria-hidden="true"
            >
              “
            </span>
            <p className="max-w-3xl font-display text-3xl font-light italic leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              “La arquitectura empieza por mirar con atención.”
            </p>
            <footer className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              Nota de proceso / CQ
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
