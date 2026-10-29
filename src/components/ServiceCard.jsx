export default function ServiceCard({ service, index, wide = false }) {
  return (
    <article className="group relative h-full">
      <div className="relative overflow-hidden border border-ink/15 bg-paper-2">
        <img
          src="proyectos/p01.svg"
          alt={service.title}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025] ${
            wide ? 'aspect-[16/10] lg:aspect-[21/8]' : 'aspect-[4/3]'
          }`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/80">
                {service.category}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.02em] text-paper sm:text-3xl">
                {service.title}
              </h3>
            </div>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/70">
              S.0{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="mt-4 grid max-h-0 overflow-hidden gap-2 transition-all duration-500 ease-out group-hover:max-h-40">
            <p className="text-sm leading-relaxed text-paper/90">{service.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/70">
              {service.client ? <span>{service.client}</span> : null}
              {service.location ? <span>{service.location}</span> : null}
              {service.year ? <span>{service.year}</span> : null}
              {service.value && service.value !== '—' ? <span>{service.value}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
