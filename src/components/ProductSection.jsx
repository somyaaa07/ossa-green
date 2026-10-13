import { useState } from 'react'
import ProductCard from './ProductCard'
import WhatsAppButton from './WhatsAppButton'
import { products, categories } from '../data/products'
import { generalMessage } from '../utils/whatsapp'

export default function ProductSection() {
  const [cat, setCat] = useState('all')
  const shown = cat === 'all' ? products : products.filter((p) => p.category === cat)

  return (
    <section id="products" aria-labelledby="products-title" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="products-title" className="max-w-xl font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-ossa-blue sm:text-5xl lg:text-6xl">
            Goodness for Your Everyday
          </h2>
          <div role="group" aria-label="Filter products" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue ${
                  cat === c.id ? 'bg-ossa-blue text-white' : 'bg-white text-ossa-ink ring-1 ring-ossa-blue/15 hover:bg-ossa-lime/30'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {shown.map((p) => (
            <li key={p.id} className="flex">
              <ProductCard product={p} />
            </li>
          ))}
          {cat === 'all' && (
            <li className="flex">
              <div className="flex w-full flex-col justify-between rounded-3xl bg-ossa-lime p-7 min-h-64">
                <h3 className="font-heading text-3xl font-extrabold leading-tight text-ossa-blue">Ready to order? Tell us what you need.</h3>
                <div>
                  <p className="mb-5 text-ossa-blue/80">Message us on WhatsApp and we will share the ordering details.</p>
                  <WhatsAppButton message={generalMessage} variant="primary" className="w-full">Order on WhatsApp</WhatsAppButton>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
