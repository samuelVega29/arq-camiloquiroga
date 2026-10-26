import { profile } from './profile'

export const socials = [
  {
    label: 'Instagram',
    handle: '@candresqm',
    href: 'https://instagram.com/candresqm',
  },
  {
    label: 'LinkedIn',
    handle: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tu-usuario',
  },
  {
    label: 'Behance',
    handle: 'Behance',
    href: 'https://www.behance.net/tu-usuario',
  },
]

export const whatsappHref = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(
  profile.whatsapp.message,
)}`
