import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl, isWhatsAppConfigured } from '../utils/whatsapp'

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-bold shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2'

// Left padding is smaller than right because the icon sits in a circle.
const sizes = {
  sm: 'min-h-10 pl-1.5 pr-4 text-sm',
  md: 'min-h-11 pl-2 pr-5 text-[15px]',
  lg: 'min-h-12 pl-2 pr-6 text-base',
  xl: 'min-h-14 pl-2.5 pr-8 text-lg',
}

const iconSizes = {
  sm: 'h-7 w-7',
  md: 'h-7 w-7',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
}

const variants = {
  primary: 'bg-ossa-blue text-white hover:bg-ossa-deep focus-visible:outline-ossa-blue',
  lime: 'bg-ossa-lime text-ossa-blue hover:bg-[#a8dc4f] focus-visible:outline-ossa-lime',
  soft: 'bg-ossa-natural text-ossa-blue hover:bg-ossa-blue hover:text-white focus-visible:outline-ossa-blue',
  outline: 'border-2 border-ossa-blue text-ossa-blue shadow-none hover:bg-ossa-blue hover:text-white focus-visible:outline-ossa-blue',
  light: 'border-2 border-white/80 text-white shadow-none hover:bg-white hover:text-ossa-blue focus-visible:outline-white',
}

const iconStyles = {
  primary: 'bg-ossa-lime text-ossa-blue',
  lime: 'bg-ossa-blue text-ossa-lime',
  soft: 'bg-white text-ossa-blue',
  outline: 'bg-ossa-blue/10 text-ossa-blue group-hover/btn:bg-white/20 group-hover/btn:text-white',
  light: 'bg-white/20 text-white group-hover/btn:bg-ossa-blue/10 group-hover/btn:text-ossa-blue',
}

function Icon({ size, variant, muted = false }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover/btn:scale-110 motion-reduce:group-hover/btn:scale-100 ${iconSizes[size]} ${
        muted ? 'bg-ossa-muted/15 text-ossa-muted' : iconStyles[variant]
      }`}
    >
      <MessageCircle className="h-4 w-4" />
    </span>
  )
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
        className={`${base} ${sizes[size]} cursor-not-allowed border border-dashed border-ossa-muted/60 bg-white/80 text-ossa-muted shadow-none hover:shadow-none active:scale-100 ${className}`}
      >
        <Icon size={size} variant={variant} muted />
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
      <Icon size={size} variant={variant} />
      {children}
    </a>
  )
}