const images = [
  'proyectos/p01.svg',
  'proyectos/p02.svg',
  'proyectos/p03.svg',
  'proyectos/p04.svg',
  'proyectos/p05.svg',
  'proyectos/p06.svg',
  'proyectos/p07.jpg',
]

export default function ServiceCard({ service, index, wide = false }) {
  const image = images[index % images.length]

  return (
    <article className="group relative h-full">
      <div className="relative overflow-hidden border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <img
          src={image}
          alt={service.title}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025] ${
            wide ? 'aspect-[16/10] lg:aspect-[21/8]' : 'aspect-[4/3]'
          }`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/75">
                {service.category}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                {service.title}
              </h3>
            </div>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
              S.{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="mt-4 grid max-h-0 overflow-hidden gap-2 transition-all duration-500 ease-out group-hover:max-h-48">
            <p className="text-sm leading-relaxed text-white/85">{service.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
              {service.client ? <span>{service.client}</span> : null}
              {service.location ? <span>{service.location}</span> : null}
              {service.year && service.year !== '—' ? <span>{service.year}</span> : null}
              {service.value && service.value !== '—' ? <span>{service.value}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
