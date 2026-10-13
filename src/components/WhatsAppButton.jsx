import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl, isWhatsAppConfigured } from '../utils/whatsapp'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full py-2.5 font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2'

const sizes = {
  md: 'min-h-11 px-6 text-[15px]',
  lg: 'min-h-12 px-7 text-base',
  xl: 'min-h-14 px-10 text-lg',
}

const variants = {
  primary: 'bg-ossa-blue text-white hover:bg-ossa-deep focus-visible:outline-ossa-blue',
  lime: 'bg-ossa-lime text-ossa-blue hover:bg-[#a8dc4f] focus-visible:outline-ossa-lime',
  soft: 'bg-ossa-natural text-ossa-blue hover:bg-ossa-blue hover:text-white focus-visible:outline-ossa-blue',
  outline: 'border-2 border-ossa-blue text-ossa-blue hover:bg-ossa-blue hover:text-white focus-visible:outline-ossa-blue',
  light: 'border-2 border-white/80 text-white hover:bg-white hover:text-ossa-blue focus-visible:outline-white',
}

export default function WhatsAppButton({ message, children = 'Order on WhatsApp', variant = 'primary', size = 'md', className = '', ariaLabel }) {
  const url = buildWhatsAppUrl(message)

  if (!isWhatsAppConfigured()) {
    return (
      <button
        type="button"
        disabled
        title="Setup needed: add the business WhatsApp number in src/config.js"
        aria-label={`${ariaLabel || children} (WhatsApp number not set up yet)`}
        className={`${base} ${sizes[size]} cursor-not-allowed border border-dashed border-ossa-muted/60 bg-white/80 text-ossa-muted ${className}`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {children}
      </button>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || undefined}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  )
}
