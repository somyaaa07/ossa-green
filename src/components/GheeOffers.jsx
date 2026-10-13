import { useState } from 'react'
import Picture from './Picture'
import WhatsAppButton from './WhatsAppButton'
import { gheeProducts, formatINR, getOffer } from '../data/products'
import { productMessage } from '../utils/whatsapp'

const QUANTITIES = [1, 2, 3, 5]

// Offer section ki apni alag images (products section se alag).
// Apni image files /public/images/offers/ mein rakho aur naam yahan badlo.
const OFFER_IMAGES = {
  'a2-bilona-ghee': '/images/products/ghee2.png',
  'a2-malai-ghee': '/images/products/ghee.png',
}

const steps = [
  'Pick your ghee and quantity',
  'Tap Order on WhatsApp',
  'We confirm the details with you',
]

function OfferCard({ product }) {
  const offer = getOffer(product)
  const [qty, setQty] = useState(1)

  return (
    <article className="grid gap-4 rounded-3xl bg-white p-3 ring-1 ring-ossa-blue/10 sm:grid-cols-[220px_1fr] sm:p-4">
      <div className="relative">
        <Picture
          src={OFFER_IMAGES[product.id]}
          alt={product.alt}
          product={product}
          className="aspect-[16/10] w-full overflow-hidden rounded-2xl sm:aspect-auto sm:h-full sm:min-h-[240px]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ossa-lime px-3 py-1 text-sm font-bold text-ossa-blue">
          Save {offer.percent}%
        </span>
      </div>

      <div className="flex flex-col gap-5 px-1 pb-1 sm:py-2 sm:pr-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-heading text-2xl font-bold text-ossa-blue">{product.name}</h3>
          <p className="flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-ossa-blue">
              <span className="sr-only">Offer price: </span>
              {formatINR(offer.finalPrice)}
              <span className="text-sm font-medium text-ossa-muted">/kg</span>
            </span>
            <span className="text-sm text-ossa-muted line-through">
              <span className="sr-only">Original price: </span>
              {formatINR(product.price)}
            </span>
          </p>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-ossa-blue">Quantity</legend>
          <div className="mt-2 grid max-w-sm grid-cols-4 gap-2">
            {QUANTITIES.map((q) => (
              <label key={q} className="cursor-pointer">
                <input
                  type="radio"
                  name={`qty-${product.id}`}
                  value={q}
                  checked={qty === q}
                  onChange={() => setQty(q)}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center rounded-xl border border-ossa-blue/20 text-sm font-semibold text-ossa-blue transition-colors hover:border-ossa-blue peer-checked:border-ossa-blue peer-checked:bg-ossa-blue peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ossa-blue">
                  {q} kg
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-auto flex flex-col gap-4 border-t border-ossa-blue/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite">
            <p className="text-sm text-ossa-muted">
              Total for {qty} kg · you save {formatINR(offer.savings * qty)}
            </p>
            <p className="font-heading text-3xl font-bold text-ossa-blue">{formatINR(offer.finalPrice * qty)}</p>
          </div>
          <WhatsAppButton
            message={`${productMessage(product)} Quantity: ${qty} kg.`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            ariaLabel={`Order ${qty} kg of ${product.name} at the offer price on WhatsApp`}
          >
            Order on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

export default function GheeOffers() {
  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-ossa-natural py-15 sm:py-15 lg:py-15">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Intro column */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="offers-title"
              className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ossa-blue sm:text-5xl lg:text-7xl"
            >
              Special offers on our ghee
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ossa-blue/70 sm:text-lg">
              Save on A2 ghee, priced per kg.
            </p>

            <ol className="mt-8 space-y-4">
              {steps.map((text, i) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ossa-blue font-heading text-sm font-bold text-ossa-lime">
                    {i + 1}
                  </span>
                  <span className="font-medium text-ossa-blue">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Offers column */}
        <div className="flex flex-col gap-5 lg:col-span-8">
          {gheeProducts.map((p) => (
            <OfferCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}