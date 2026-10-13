import Picture from './Picture'
import WhatsAppButton from './WhatsAppButton'
import { formatINR, getOffer } from '../data/products'
import { productMessage } from '../utils/whatsapp'

export default function ProductCard({ product }) {
  const offer = getOffer(product)

  return (
    <article className="group flex w-full flex-col rounded-3xl bg-white p-2.5 shadow-sm ring-1 ring-ossa-blue/10 transition-all duration-300 hover:shadow-xl motion-safe:hover:-translate-y-1">
      <div className="relative">
        <Picture
          src={product.image}
          alt={product.alt}
          product={product}
          className="aspect-[4/5] rounded-2xl"
          imgClassName="transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
        {offer && (
          <span className="absolute left-3 top-3 rounded-full bg-ossa-lime px-3 py-1 text-sm font-extrabold text-ossa-blue shadow">
            {offer.percent}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 pb-2 pt-4">
        <h3 className="font-heading text-xl font-bold leading-tight text-ossa-blue">{product.name}</h3>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
          {offer ? (
            <>
              <span className="text-2xl font-extrabold text-ossa-ink">{formatINR(offer.finalPrice)}</span>
              {product.unit && <span className="text-sm text-ossa-muted">{product.unit}</span>}
              <span className="text-sm text-ossa-muted line-through">
                <span className="sr-only">Regular price </span>
                {formatINR(product.price)}
              </span>
            </>
          ) : (
            <>
              <span className="text-2xl font-extrabold text-ossa-ink">{formatINR(product.price)}</span>
              {product.unit && <span className="text-sm text-ossa-muted">{product.unit}</span>}
            </>
          )}
        </p>
        <div className="mt-auto pt-4">
          <WhatsAppButton message={productMessage(product)} variant="soft" className="w-full" ariaLabel={`Order ${product.name} on WhatsApp`}>
            Order Now
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}
