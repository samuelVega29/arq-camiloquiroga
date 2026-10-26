import { Boxes, Ruler, SunMedium } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const pillars = [
  {
    number: '01',
    icon: Ruler,
    title: 'Diseño arquitectónico',
    description:
      'Del análisis del lugar al proyecto construido. Trabajo la planta, la sección y la materialidad como herramientas para tomar decisiones coherentes.',
    items: ['Estudio del lugar', 'Anteproyecto', 'Desarrollo de detalle'],
  },
  {
    number: '02',
    icon: Boxes,
    title: 'Modelado BIM / 3D',
    description:
      'Construyo modelos coordinados que permiten verificar el proyecto, coordinar disciplinas y anticipar soluciones antes de la obra.',
    items: ['Modelado Revit', 'Documentación técnica', 'Coordinación'],
  },
  {
    number: '03',
    icon: SunMedium,
    title: 'Visualización',
    description:
      'Imágenes y recorridos que comunican la atmósfera del espacio: luz, textura y escala al servicio de la idea arquitectónica.',
    items: ['Renders', 'Recorridos', 'Láminas de presentación'],
  },
]

export default function Approach() {
  return (
    <section id="enfoque" className="border-y border-line bg-paper-2 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            index="03"
            label="Enfoque"
            title={
              <>
                Del lugar a la <span className="italic text-blueprint">experiencia</span>
              </>
            }
            intro="Un proceso riguroso y sensible, donde cada decisión responde al contexto, al programa y a la forma en que las personas habitan el espacio."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Reveal key={pillar.number} delay={index * 90}>
                <article className="flex h-full flex-col border-t border-ink/25 pt-6">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-copper">
                      {pillar.number}
                    </span>
                    <Icon className="h-5 w-5 text-blueprint" strokeWidth={1.4} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl leading-tight tracking-[-0.02em]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-4">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft"
                      >
                        <span className="h-1 w-1 bg-copper" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={120}>
          <blockquote className="mt-16 border-t border-line pt-10 sm:mt-20">
            <p className="max-w-3xl font-display text-3xl font-light italic leading-tight tracking-[-0.03em] text-blueprint sm:text-4xl lg:text-5xl">
              “La arquitectura empieza por mirar con atención.”
            </p>
            <footer className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
              Nota de proceso / CQ
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
