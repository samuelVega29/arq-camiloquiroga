import { ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { socials, whatsappHref } from '../data/socials'
import InstagramIcon from './InstagramIcon'
import WhatsAppIcon from './WhatsAppIcon'

const instagram = socials.find((social) => social.label === 'Instagram')

function HeroPlan() {
  return (
    <svg
      viewBox="0 0 520 620"
      className="h-auto w-full text-ink/65"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        </pattern>
        <pattern id="hero-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#hero-grid)" />
          <path d="M100 0H0V100" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="520" height="620" fill="url(#hero-grid-large)" opacity="0.55" />

      <g stroke="currentColor" strokeLinecap="square">
        <rect x="72" y="105" width="376" height="326" strokeWidth="2.5" />
        <rect x="72" y="105" width="376" height="326" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
        <path d="M72 268h376" strokeWidth="1.4" />
        <path d="M250 105v163M250 268v163" strokeWidth="1.4" />
        <path d="M250 341h198" strokeWidth="1.4" />
        <path d="M72 431h376" strokeWidth="1.4" />
        <path d="M330 105v163M330 341v90" strokeWidth="1.4" />

        <rect x="102" y="135" width="118" height="103" strokeWidth="1" />
        <rect x="280" y="135" width="138" height="103" strokeWidth="1" />
        <rect x="102" y="298" width="118" height="103" strokeWidth="1" />
        <rect x="280" y="371" width="138" height="30" strokeWidth="1" />

        <path d="M220 188a30 30 0 0 1-30 30" strokeWidth="1" />
        <path d="M280 188a30 30 0 0 0 30 30" strokeWidth="1" />
        <path d="M220 386a30 30 0 0 0-30-30" strokeWidth="1" />

        <circle cx="250" cy="268" r="14" strokeWidth="1.4" />
        <circle cx="250" cy="268" r="4" fill="currentColor" stroke="none" opacity="0.75" />

        <path d="M72 470h376" strokeWidth="1" />
        <path d="M72 463v14M448 463v14M72 470h376" strokeWidth="1" />
        <path d="M150 457v26M250 457v26M350 457v26" strokeWidth="0.75" opacity="0.6" />

        <path d="M60 105v326M52 105h16M52 431h16" strokeWidth="1" />
        <path d="M72 92h376M72 84v16M448 84v16" strokeWidth="1" />

        <path d="M448 560v-40M448 560l-8-18M448 560l8-18" strokeWidth="1.4" />

        <path d="M64 560h140M64 552v16M204 552v16" strokeWidth="1" />
      </g>

      <g
        fill="currentColor"
        fontFamily="'Space Mono', monospace"
        fontSize="9"
        letterSpacing="2"
        opacity="0.8"
      >
        <text x="64" y="76">PLANTA / NIVEL 01</text>
        <text x="448" y="76" textAnchor="end">ESC. 1:100</text>
        <text x="92" y="190">01</text>
        <text x="428" y="190" textAnchor="end">02</text>
        <text x="92" y="356">03</text>
        <text x="428" y="356" textAnchor="end">04</text>
        <text x="250" y="292" textAnchor="middle" fontSize="8">PATIO</text>
        <text x="64" y="490">0</text>
        <text x="204" y="490" textAnchor="end">12.40 m</text>
        <text x="256" y="600" textAnchor="middle">N</text>
        <text x="464" y="554" textAnchor="start" fontSize="8">N.P. +0.00</text>
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-60 blueprint-grid [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-copper" aria-hidden="true" />
              Portafolio de arquitectura — 2026
            </p>

            <h1 className="mt-7 font-display text-[clamp(3.4rem,10vw,7.2rem)] font-light leading-[0.86] tracking-[-0.045em]">
              <span className="block">Camilo</span>
              <span className="block italic text-blueprint">Quiroga.</span>
            </h1>

            <p className="mt-8 max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink-soft sm:text-[11px]">
              {profile.role}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#proyectos"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-blueprint"
              >
                Ver proyectos
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-ink px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              {instagram ? (
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-copper"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {instagram.handle}
                </a>
              ) : null}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blueprint opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blueprint" />
                </span>
                {profile.availability}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {profile.location}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 border border-line" aria-hidden="true" />
              <div className="relative border border-ink/15 bg-paper-2 p-4 sm:p-6">
                <div className="flex items-center justify-between border-b border-ink/15 pb-3">
                  <span className="eyebrow">Planta / Nivel 01</span>
                  <span className="eyebrow">Esc. 1:100</span>
                </div>
                <div className="mt-4">
                  <HeroPlan />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                    CQ / 2026
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
                    Lámina 01
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden border border-ink bg-paper px-4 py-3 sm:block">
                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-ink-soft">
                  Enfoque
                </span>
                <span className="mt-1 block font-display text-lg italic text-blueprint">
                  {profile.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
