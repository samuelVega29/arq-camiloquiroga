import { whatsappHref } from '../data/socials'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton({ hidden = false }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className={`group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_12px_32px_rgb(0_0_0_/_0.35)] transition duration-300 hover:bg-[color:var(--color-fg-soft)] sm:bottom-7 sm:right-7 ${
        hidden ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-black opacity-0 transition duration-200 group-hover:opacity-100 md:block">
        WhatsApp
      </span>
    </a>
  )
}
