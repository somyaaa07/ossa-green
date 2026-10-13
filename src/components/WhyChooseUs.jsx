import { Milk, Layers, ShoppingBasket, MessageCircle, Check } from 'lucide-react'
import Picture from './Picture'
import { IMAGES } from '../data/images'

const milkTypes = ['Cow milk', 'Buffalo milk', 'Gir cow milk']

const perKg = [
  { name: 'Paneer' },
  { name: 'A2 Bilona Ghee' },
  { name: 'A2 Malai Ghee' },
]

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="py-15 sm:py-15 lg:py-15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="why-title"
            className="max-w-2xl font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-ossa-blue sm:text-5xl lg:text-6xl"
          >
            Why choose our range?
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ossa-blue/70 sm:text-lg">
            Fresh dairy for every kitchen, from daily milk to pure A2 ghee, ordered in a single WhatsApp message.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Image panel */}
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] lg:col-span-5 lg:min-h-full">
            <Picture
              src="/images/products/bulkbottle.png"
              alt="Fresh dairy from OSSA Greens"
              scene={2}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ossa-deep/80 via-transparent to-transparent" />

            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="font-heading text-lg font-bold text-ossa-blue">Fresh, simple, local</p>
              <p className="mt-1 text-sm leading-relaxed text-ossa-blue/70">
                Three kinds of milk, two kinds of ghee, and paneer, all in one place.
              </p>
            </div>
          </div>

          {/* Bento grid */}
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {/* Milk varieties */}
            <li className="flex flex-col justify-between gap-8 rounded-[2rem] bg-ossa-lime/40 p-6 sm:col-span-2 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ossa-blue text-ossa-lime">
                  <Milk className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-ossa-blue sm:text-3xl">
                    Different milk varieties
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-ossa-blue/75">
                    Pick the milk that suits your household.
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {milkTypes.map((type) => (
                  <li
                    key={type}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ossa-blue shadow-sm"
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {type}
                  </li>
                ))}
              </ul>
            </li>

            {/* Paneer and ghee */}
            <li className="rounded-[2rem] bg-white p-6 ring-1 ring-ossa-blue/10 sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ossa-natural text-ossa-blue">
                <Layers className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-ossa-blue">
                Paneer and ghee options
              </h3>
              <dl className="mt-5 divide-y divide-ossa-blue/10 text-sm">
                {perKg.map(({ name }) => (
                  <div key={name} className="flex items-center justify-between py-2.5">
                    <dt className="font-semibold text-ossa-blue">{name}</dt>
                    <dd className="rounded-full bg-ossa-natural px-2.5 py-0.5 text-xs font-medium text-ossa-blue/80">
                      per kg
                    </dd>
                  </div>
                ))}
              </dl>
            </li>

            {/* Everyday essentials */}
            <li className="rounded-[2rem] bg-ossa-natural p-6 sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ossa-blue">
                <ShoppingBasket className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight text-ossa-blue">
                Everyday dairy essentials
              </h3>
              <p className="mt-2 leading-relaxed text-ossa-blue/75">
                From daily milk to a bottle of badam milk, the range covers regular needs.
              </p>
            </li>

            {/* WhatsApp ordering */}
            <li className="grid gap-6 rounded-[2rem] bg-ossa-blue p-6 text-white sm:col-span-2 sm:grid-cols-2 sm:items-center sm:p-8">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ossa-lime text-ossa-blue">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Convenient WhatsApp ordering
                </h3>
                <p className="mt-2 max-w-sm leading-relaxed text-white/80">
                  Tap a button and a message with your product and price is ready to send.
                </p>
              </div>

              {/* Message preview */}
              <div aria-hidden="true" className="rounded-2xl bg-white/10 p-4">
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ossa-lime px-4 py-3 text-sm font-medium text-ossa-blue">
                  Hi, I'd like to order Gir cow milk.
                </div>
                <p className="mt-2 text-right text-xs text-white/60">Ready to send</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}