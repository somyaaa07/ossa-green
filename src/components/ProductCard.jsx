import { Minus, Plus } from 'lucide-react'
import Picture from './Picture'
import { formatINR, getOffer } from '../data/products'
import { PRODUCT_IMAGES } from '../data/images'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue'

export default function ProductCard({ product, qty, onChange }) {
  const offer = getOffer(product)
  const price = offer ? offer.finalPrice : product.price

  return (
    <article className="flex w-full flex-col">
      {/* Photo with the Add / stepper control sitting on it */}
      <div className="relative">
        <Picture
          src={PRODUCT_IMAGES[product.id] ?? product.image}
          alt={product.alt}
          product={product}
          bare
          fit="contain"
          imgClassName="p-3 pb-10 sm:p-2 sm:pb-12"
          className="aspect-[4/5] rounded-3xl"
        />

        {offer && (
          <span className="absolute left-3 top-3 rounded-full bg-ossa-lime px-3 py-1 text-xs font-bold text-ossa-blue sm:text-sm">
            {offer.percent}% off
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3 flex justify-end">
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => onChange(1)}
              aria-label={`Add ${product.name} to your order`}
              className={`inline-flex h-11 items-center gap-1.5 rounded-full bg-white pl-4 pr-5 text-[15px] font-bold text-ossa-blue shadow-md ring-1 ring-ossa-blue/15 transition-colors hover:bg-ossa-blue hover:text-white active:scale-95 motion-reduce:active:scale-100 ${focus}`}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add
            </button>
          ) : (
            <div
              role="group"
              aria-label={`${product.name} quantity`}
              className="flex h-11 items-center rounded-full bg-ossa-blue text-white shadow-md"
            >
              <button
                type="button"
                onClick={() => onChange(qty - 1)}
                aria-label={qty === 1 ? `Remove ${product.name}` : `Decrease ${product.name} quantity`}
                className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="min-w-5 text-center text-base font-bold" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onChange(qty + 1)}
                disabled={qty >= 20}
                aria-label={`Increase ${product.name} quantity`}
                className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/15 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-white"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-1 pt-3.5">
        <h3 className="font-heading text-base font-bold leading-snug text-ossa-blue sm:text-lg">{product.name}</h3>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="text-base font-extrabold text-ossa-ink sm:text-lg">
            <span className="sr-only">Price: </span>
            {formatINR(price)}
          </span>
          {product.unit && <span className="text-sm text-ossa-muted">{product.unit}</span>}
          {offer && (
            <span className="text-sm text-ossa-muted line-through">
              <span className="sr-only">Regular price </span>
              {formatINR(product.price)}
            </span>
          )}
        </p>
      </div>
    </article>
  )
}