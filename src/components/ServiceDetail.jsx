import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Layers,
  Mail,
  MapPin,
  Send,
  User,
  Wallet,
} from 'lucide-react'
import { profile } from '../data/profile'
import { services } from '../data/services'
import { imageForIndex } from '../data/serviceImages'
import Footer from './Footer'
import Navbar from './Navbar'
import Reveal from './Reveal'
import WhatsAppButton from './WhatsAppButton'
import WhatsAppIcon from './WhatsAppIcon'

const scopeByCategory = {
  'Obras dirigidas': [
    'Dirección integral de la ejecución',
    'Control de presupuesto y cronograma',
    'Selección y coordinación de contratistas',
    'Seguimiento técnico hasta la entrega',
  ],
  'Obras contratadas': [
    'Ejecución de obra civil',
    'Adecuaciones y obra correctiva',
    'Control de calidad en campo',
    'Entrega con acta y garantías',
  ],
  'Obras diseñadas': [
    'Estudios técnicos y de diagnóstico',
    'Diseño arquitectónico y de detalle',
    'Documentación para licenciamiento',
    'Acompañamiento en la formulación',
  ],
  Residencias: [
    'Residencia de obra en campo',
    'Interventoría técnica y administrativa',
    'Control de calidad, plazos y costos',
    'Coordinación con la interventoría',
  ],
}

function buildInquiry(service, form) {
  return [
    `Hola Camilo, me interesa el servicio "${service.title}".`,
    `Ubicación: ${service.location}.`,
    form.message.trim(),
    form.name.trim() ? `Mi nombre: ${form.name.trim()}.` : '',
    form.contact.trim() ? `Contacto: ${form.contact.trim()}.` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export default function ServiceDetail({ service }) {
  const index = services.findIndex((item) => item.id === service.id)
  const image = imageForIndex(index < 0 ? 0 : index)
  const prev = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]
  const related = services
    .filter((item) => item.category === service.category && item.id !== service.id)
    .slice(0, 3)

  const scope = scopeByCategory[service.category] ?? []
  const meta = [
    { icon: User, label: 'Cliente', value: service.client },
    { icon: MapPin, label: 'Ubicación', value: service.location },
    { icon: Calendar, label: 'Periodo', value: service.year },
    { icon: Wallet, label: 'Valor', value: service.value },
  ].filter((item) => item.value && item.value !== '—')

  const [form, setForm] = useState({
    name: '',
    contact: '',
    message: `Hola Camilo, me interesa el servicio "${service.title}" (${service.location}). Me gustaría recibir más información.`,
  })

  useEffect(() => {
    setForm((current) => ({
      ...current,
      message: `Hola Camilo, me interesa el servicio "${service.title}" (${service.location}). Me gustaría recibir más información.`,
    }))
  }, [service.id, service.title, service.location])

  const inquiry = buildInquiry(service, form)
  const waHref = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(inquiry)}`
  const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Consulta: ${service.title}`,
  )}&body=${encodeURIComponent(inquiry)}`

  const handleSubmit = (event) => {
    event.preventDefault()
    window.open(waHref, '_blank', 'noopener,noreferrer')
  }

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-[color:var(--color-line)]">
          <div className="relative min-h-[62vh] sm:min-h-[70vh]">
            <img
              key={service.id}
              src={image}
              alt={service.title}
              className="detail-zoom absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />

            <div className="section-shell relative flex min-h-[62vh] flex-col justify-between pb-10 pt-8 sm:min-h-[70vh] sm:pb-14">
              <a
                href="#servicios"
                className="group inline-flex w-fit items-center gap-2 border border-white/30 bg-black/40 px-4 py-2.5 font-sans text-sm text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                Volver al catálogo
              </a>

              <div className="max-w-4xl">
                <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/75 animate-slide-up">
                  <span>Servicios</span>
                  <span className="h-px w-5 bg-white/40" aria-hidden="true" />
                  <span>S.{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-5 bg-white/40" aria-hidden="true" />
                  <span>{service.category}</span>
                </p>

                <h1
                  className="mt-5 display-title max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] animate-slide-up"
                  style={{ animationDelay: '120ms' }}
                >
                  {service.title}
                </h1>

                <p
                  className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg animate-slide-up"
                  style={{ animationDelay: '220ms' }}
                >
                  {service.description}
                </p>

                <div
                  className="mt-8 flex flex-wrap gap-2 animate-slide-up"
                  style={{ animationDelay: '320ms' }}
                >
                  {meta.map((item) => {
                    const Icon = item.icon
                    return (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-2 border border-white/25 bg-black/40 px-3 py-2 font-sans text-xs text-white/90 backdrop-blur-sm"
                      >
                        <Icon className="h-4 w-4 text-white/70" aria-hidden="true" />
                        {item.value}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-12 lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-white/40" aria-hidden="true" />
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                    Sobre el servicio
                  </h2>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-fg-soft)] sm:text-xl">
                  {service.description}
                </p>
              </Reveal>

              {scope.length > 0 ? (
                <Reveal delay={80}>
                  <h2 className="flex items-center gap-3 border-b border-[color:var(--color-line)] pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                    <Layers className="h-4 w-4" aria-hidden="true" />
                    Alcance
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {scope.map((item) => (
                      <li
                        key={item}
                        className="group flex items-start gap-3 border border-white/10 px-4 py-3.5 transition-colors duration-300 hover:border-white/40"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-white/40 text-white/80 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-base leading-relaxed text-[color:var(--color-fg-soft)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              <Reveal delay={120}>
                <h2 className="border-b border-[color:var(--color-line)] pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                  Ficha técnica
                </h2>
                <dl className="mt-2 divide-y divide-[color:var(--color-line)]">
                  {[
                    { label: 'Línea de servicio', value: service.category },
                    { label: 'Cliente', value: service.client },
                    { label: 'Ubicación', value: service.location },
                    { label: 'Periodo', value: service.year },
                    { label: 'Valor', value: service.value },
                  ]
                    .filter((row) => row.value && row.value !== '—')
                    .map((row) => (
                      <div
                        key={row.label}
                        className="flex items-start justify-between gap-6 py-4 transition-colors duration-300 hover:text-white"
                      >
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
                          {row.label}
                        </dt>
                        <dd className="max-w-[60%] text-right text-base text-[color:var(--color-fg-soft)]">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={100} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <form
                  onSubmit={handleSubmit}
                  className="border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 sm:p-8"
                >
                  <p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-white/60">
                    Consulta directa
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight tracking-[-0.03em]">
                    Hablemos de este servicio
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[color:var(--color-fg-soft)]">
                    Cuéntame qué tienes en mente y te respondo con una propuesta clara.
                  </p>

                  <div className="mt-6 space-y-5">
                    <label className="block">
                      <span className="block font-sans text-sm font-medium text-white/85">
                        Nombre
                      </span>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={updateField('name')}
                        placeholder="Tu nombre"
                        className="mt-2 h-12 w-full border border-[color:var(--color-line)] bg-transparent px-3.5 text-base text-white placeholder:text-[color:var(--color-fg-muted)] transition-colors focus:border-white/60 focus:outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="block font-sans text-sm font-medium text-white/85">
                        Correo o teléfono
                      </span>
                      <input
                        type="text"
                        name="contact"
                        autoComplete="email"
                        value={form.contact}
                        onChange={updateField('contact')}
                        placeholder="Cómo te contacto"
                        className="mt-2 h-12 w-full border border-[color:var(--color-line)] bg-transparent px-3.5 text-base text-white placeholder:text-[color:var(--color-fg-muted)] transition-colors focus:border-white/60 focus:outline-none"
                      />
                    </label>

                    <label className="block">
                      <span className="block font-sans text-sm font-medium text-white/85">
                        Mensaje
                      </span>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={updateField('message')}
                        rows={5}
                        className="mt-2 w-full resize-none border border-[color:var(--color-line)] bg-transparent px-3.5 py-3 text-base leading-relaxed text-white transition-colors focus:border-white/60 focus:outline-none"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-white px-6 py-4 font-sans text-sm font-semibold text-black transition-colors hover:bg-[color:var(--color-fg-soft)]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Enviar consulta por WhatsApp
                    <Send
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>

                  <a
                    href={mailHref}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-[color:var(--color-line)] px-4 py-3.5 font-sans text-sm text-[color:var(--color-fg-soft)] transition-colors hover:border-white/50 hover:text-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Escribir por correo
                  </a>

                  <p className="mt-4 text-center text-xs text-[color:var(--color-fg-muted)]">
                    Se abrirá WhatsApp con tu consulta lista para enviar.
                  </p>
                </form>
              </div>
            </Reveal>
          </div>

          {related.length > 0 ? (
            <Reveal delay={80}>
              <div className="mt-16 border-t border-[color:var(--color-line)] pt-10">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                    Más en {service.category}
                  </h2>
                  <a
                    href="#servicios"
                    className="group inline-flex items-center gap-2 font-sans text-sm text-[color:var(--color-fg-soft)] transition-colors hover:text-white"
                  >
                    Ver todo
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {related.map((item) => {
                    const relatedIndex = services.findIndex((entry) => entry.id === item.id)
                    return (
                      <a
                        key={item.id}
                        href={`#/servicio/${item.id}`}
                        className="group relative overflow-hidden border border-[color:var(--color-line)]"
                      >
                        <img
                          src={imageForIndex(relatedIndex)}
                          alt={item.title}
                          loading="lazy"
                          className="h-40 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="text-xs text-white/75">
                            {item.location}
                          </p>
                          <p className="mt-1 font-display text-xl leading-tight text-white">
                            {item.title}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`#/servicio/${prev.id}`}
              className="group inline-flex items-center gap-3 text-left"
            >
              <ArrowLeft
                className="h-4 w-4 text-[color:var(--color-fg-muted)] transition-transform duration-500 group-hover:-translate-x-1 group-hover:text-white"
                aria-hidden="true"
              />
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
                  Anterior
                </span>
                <span className="mt-1 block max-w-xs text-base text-[color:var(--color-fg-soft)] transition-colors group-hover:text-white">
                  {prev.title}
                </span>
              </span>
            </a>

            <a
              href={`#/servicio/${next.id}`}
              className="group inline-flex items-center justify-end gap-3 text-right"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
                  Siguiente
                </span>
                <span className="mt-1 block max-w-xs text-base text-[color:var(--color-fg-soft)] transition-colors group-hover:text-white">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 text-[color:var(--color-fg-muted)] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white"
                aria-hidden="true"
              />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
