import { useState } from 'react'
import { Building2, MapPin, MessageCircle, Phone } from 'lucide-react'
import Picture from './Picture'
import { IMAGES } from '../data/images'
import { products } from '../data/products'
import { buildWhatsAppUrl, isWhatsAppConfigured } from '../utils/whatsapp'

const COMPANY = {
  name: 'Ossa Projects Pvt. Ltd.',
  phone: '+91 93112 44132',
  phoneHref: 'tel:+919311244132',
  address: 'Roja-Jalapur, Noida Extension',
}

const inputClass =
  'mt-1.5 block w-full rounded-xl border border-ossa-ink/20 bg-white px-4 py-3 text-base text-ossa-ink placeholder:text-ossa-muted/70 focus:border-ossa-blue focus:outline-2 focus:outline-offset-1 focus:outline-ossa-blue'
const labelClass = 'block text-sm font-semibold text-ossa-ink'

function Detail({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-ossa-lime">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm text-white/70">{label}</p>
        <div className="mt-0.5 text-lg font-semibold text-white">{children}</div>
      </div>
    </li>
  )
}

export default function FinalCTA() {
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Please enter a 10-digit phone number.'
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('')
      return
    }
    if (!isWhatsAppConfigured()) {
      setStatus('Ordering is not set up yet. Please call us on ' + COMPANY.phone + '.')
      return
    }
    const lines = [
      'Hello, I would like to place an enquiry.',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.product ? `Product: ${form.product}` : null,
      form.message.trim() ? `Message: ${form.message.trim()}` : null,
    ].filter(Boolean)
    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
    setStatus('Opening WhatsApp with your details. Just press send there.')
  }

  return (
    <section id="contact" aria-labelledby="cta-title" className="px-3 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
        <Picture src={IMAGES.cta} alt="" scene={3} className="absolute inset-0" />
        <div className="absolute inset-0 bg-ossa-deep/85" />

        <div className="relative grid gap-10 px-5 py-14 sm:px-10 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-14 lg:py-20">
          {/* Left: details */}
          <div>
            <h2 id="cta-title" className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Your dairy essentials, just a message away
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Fill in the form and we will continue the conversation on WhatsApp, or call us directly.
            </p>

            <ul className="mt-9 space-y-6">
              <Detail icon={Building2} label="Business name">{COMPANY.name}</Detail>
              <Detail icon={Phone} label="Phone">
                <a href={COMPANY.phoneHref} className="rounded hover:text-ossa-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-lime">
                  {COMPANY.phone}
                </a>
              </Detail>
              <Detail icon={MapPin} label="Address">{COMPANY.address}</Detail>
            </ul>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8" aria-label="Order enquiry form">
            <h3 className="font-heading text-2xl font-extrabold text-ossa-blue">Send an enquiry</h3>
            <p className="mt-1 text-sm text-ossa-muted">Takes less than a minute.</p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="cta-name" className={labelClass}>Your name</label>
                <input
                  id="cta-name" type="text" autoComplete="name" value={form.name} onChange={update('name')}
                  placeholder="e.g. Priya Sharma" className={inputClass}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cta-name-err' : undefined}
                />
                {errors.name && <p id="cta-name-err" className="mt-1.5 text-sm font-medium text-red-700">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="cta-phone" className={labelClass}>Phone number</label>
                <input
                  id="cta-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update('phone')}
                  placeholder="10-digit mobile number" className={inputClass}
                  aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'cta-phone-err' : undefined}
                />
                {errors.phone && <p id="cta-phone-err" className="mt-1.5 text-sm font-medium text-red-700">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="cta-product" className={labelClass}>Product <span className="font-normal text-ossa-muted">(optional)</span></label>
                <select id="cta-product" value={form.product} onChange={update('product')} className={inputClass}>
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ossa-blue px-7 py-2.5 text-base font-bold text-white transition-colors hover:bg-ossa-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Send on WhatsApp
            </button>
            <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-ossa-muted">{status}</p>
          </form>
        </div>
      </div>
    </section>
  )
}