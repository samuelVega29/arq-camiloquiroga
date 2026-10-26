import { whatsappHref } from '../data/socials'
import WhatsAppIcon from './WhatsAppIcon'

export default function WhatsAppButton({ hidden = false }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className={`group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-[0_12px_32px_rgb(23_26_28_/_0.28)] transition duration-300 hover:bg-copper sm:bottom-7 sm:right-7 ${
        hidden ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper opacity-0 transition duration-200 group-hover:opacity-100 md:block">
        WhatsApp
      </span>
    </a>
  )
}
