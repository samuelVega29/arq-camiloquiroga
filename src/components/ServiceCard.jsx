import { ArrowUpRight } from 'lucide-react'
import { imageForIndex } from '../data/serviceImages'

export default function ServiceCard({ service, index, featured = false }) {
  const image = imageForIndex(index)

  return (
    <article className="group relative h-full">
      <div className="relative h-full min-h-[320px] overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)] sm:min-h-[380px] lg:min-h-0">
        <img
          src={image}
          alt={service.title}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span className="absolute left-5 top-5 border border-white/25 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm transition-colors duration-500 group-hover:border-white/60 group-hover:text-white">
          S.{String(index + 1).padStart(2, '0')}
        </span>

        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/0 transition-all duration-500 group-hover:text-white/80">
          Ver ficha
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/75">
            {service.category}
          </p>
          <h3
            className={`mt-2 font-display leading-tight tracking-[-0.02em] text-white ${
              featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {service.title}
          </h3>

          <div
            className={`mt-4 grid gap-2 overflow-hidden transition-all duration-500 ease-out ${
              featured ? 'max-h-52' : 'max-h-0 group-hover:max-h-52'
            }`}
          >
            <p className="text-sm leading-relaxed text-white/85">{service.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
              {service.client ? <span>{service.client}</span> : null}
              {service.location ? <span>{service.location}</span> : null}
              {service.year && service.year !== '—' ? <span>{service.year}</span> : null}
              {service.value && service.value !== '—' ? <span>{service.value}</span> : null}
            </div>
          </div>
        </div>

        <a
          href={`#/servicio/${service.id}`}
          aria-label={`Ver ficha de ${service.title}`}
          className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
        />
      </div>
    </article>
  )
}
