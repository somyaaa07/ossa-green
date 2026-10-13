import Picture from './Picture'
import WhatsAppButton from './WhatsAppButton'
import { gheeProducts, formatINR, getOffer } from '../data/products'
import { productMessage } from '../utils/whatsapp'

function OfferCard({ product }) {
  const offer = getOffer(product)

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:flex-row">
      <Picture
        src={product.image}
        alt={product.alt}
        product={product}
        className="aspect-[16/10] w-full md:aspect-auto md:min-h-[280px] md:w-[38%] md:shrink-0"
      />

      <div className="flex flex-1 flex-col justify-center gap-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-heading text-2xl font-extrabold text-ossa-blue sm:text-3xl">{product.name}</h3>
          <span className="rounded-full bg-ossa-lime px-3 py-1 text-sm font-extrabold text-ossa-blue">
            {offer.percent}% OFF
          </span>
        </div>

        <div>
          <p className="text-sm font-medium text-ossa-muted">Offer price</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-heading text-5xl font-extrabold leading-none text-ossa-blue sm:text-6xl">
              <span className="sr-only">Offer price: </span>
              {formatINR(offer.finalPrice)}
              <span className="ml-1 text-lg font-semibold text-ossa-muted">/kg</span>
            </span>
            <span className="text-lg text-ossa-muted line-through">
              <span className="sr-only">Original price: </span>
              {formatINR(product.price)}/kg
            </span>
          </p>
          <p className="mt-3 inline-block rounded-lg bg-ossa-lime/25 px-3 py-1.5 text-sm font-bold text-ossa-blue">
            You save {formatINR(offer.savings)} on every kg
          </p>
        </div>

        <WhatsAppButton
          message={productMessage(product)}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto sm:self-start sm:px-10"
          ariaLabel={`Order ${product.name} at the offer price on WhatsApp`}
        >
          Order on WhatsApp
        </WhatsAppButton>
      </div>
    </article>
  )
}

export default function GheeOffers() {
  return (
    <section id="offers" aria-labelledby="offers-title" className="px-3 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ossa-blue px-4 py-12 sm:px-10 sm:py-16 lg:px-14">
        <h2 id="offers-title" className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Special offers on our ghee
        </h2>
        <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
          Save on A2 ghee. Tap order and we will confirm the details on WhatsApp.
        </p>

        <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6">
          {gheeProducts.map((p) => (
            <OfferCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}