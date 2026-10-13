import { useState } from 'react'
import ProductCard from './ProductCard'
import WhatsAppButton from './WhatsAppButton'
import { products, categories, formatINR, getOffer } from '../data/products'
import { generalMessage } from '../utils/whatsapp'

const unitPrice = (p) => {
  const offer = getOffer(p)
  return offer ? offer.finalPrice : p.price
}

export default function ProductSection() {
  const [cat, setCat] = useState('all')
  const [cart, setCart] = useState({}) // { [productId]: quantity }

  const shown = cat === 'all' ? products : products.filter((p) => p.category === cat)
  const items = products.filter((p) => cart[p.id] > 0)
  const count = items.reduce((n, p) => n + cart[p.id], 0)
  const total = items.reduce((sum, p) => sum + unitPrice(p) * cart[p.id], 0)

  const setQty = (id, q) =>
    setCart((c) => {
      const next = { ...c }
      if (q <= 0) delete next[id]
      else next[id] = Math.min(q, 20)
      return next
    })

  const orderMessage = [
    "Hi, I'd like to order:",
    ...items.map((p) => `- ${p.name} x ${cart[p.id]}${p.unit ? ` (${p.unit})` : ''}: ${formatINR(unitPrice(p) * cart[p.id])}`),
    `Total: ${formatINR(total)}`,
  ].join('\n')

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className={`pt-16 sm:pt-20 lg:pt-24 ${count > 0 ? 'pb-36' : 'pb-16 sm:pb-20 lg:pb-24'}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="products-title"
          className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-ossa-blue sm:text-5xl lg:text-6xl"
        >
          Goodness for your everyday
        </h2>
        <p className="mt-4 max-w-md text-base text-ossa-blue/70 sm:text-lg">
          Add what you need, then send your whole order on WhatsApp in one message.
        </p>

        <div className="-mx-4 mt-8 overflow-x-auto border-b border-ossa-blue/15 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div role="group" aria-label="Filter products" className="flex w-max gap-6 sm:w-auto sm:gap-8">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`-mb-px min-h-11 whitespace-nowrap border-b-2 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue ${
                  cat === c.id ? 'border-ossa-blue text-ossa-blue' : 'border-transparent text-ossa-blue/55 hover:text-ossa-blue'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} products
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-10">
          {shown.map((p) => (
            <li key={p.id} className="flex">
              <ProductCard product={p} qty={cart[p.id] || 0} onChange={(q) => setQty(p.id, q)} />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-5 rounded-3xl bg-ossa-lime/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-heading text-2xl font-extrabold text-ossa-blue">Not sure what to pick?</h3>
            <p className="mt-1 text-ossa-blue/75">Message us on WhatsApp and we will help you choose.</p>
          </div>
          <WhatsAppButton message={generalMessage} variant="primary" size="lg" className="w-full sm:w-auto sm:shrink-0">
            Ask on WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      {/* Order bar: appears once something is added */}
      {count > 0 && (
        <div
          role="region"
          aria-label="Your order"
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl bg-ossa-blue p-3 pl-5 text-white shadow-2xl">
            <div className="min-w-0">
              <p className="text-sm text-white/75">
                {count} {count === 1 ? 'item' : 'items'}
                <button
                  type="button"
                  onClick={() => setCart({})}
                  className="ml-3 underline underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                >
                  Clear
                </button>
              </p>
              <p className="font-heading text-xl font-bold leading-tight">{formatINR(total)}</p>
            </div>
            <WhatsAppButton message={orderMessage} variant="lime" size="lg" ariaLabel={`Send order of ${count} items on WhatsApp`}>
              Order on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      )}
    </section>
  )
}