import { Milk, Layers, ShoppingBasket, MessageCircle } from 'lucide-react'
import Picture from './Picture'
import { IMAGES } from '../data/images'

const points = [
  { icon: Milk, title: 'Different milk varieties', text: 'Cow, buffalo and Gir cow milk, so you can pick what suits your household.', style: 'bg-ossa-lime/40 sm:col-span-2', iconStyle: 'bg-ossa-blue text-ossa-lime' },
  { icon: Layers, title: 'Paneer and ghee options', text: 'Paneer, A2 Bilona Ghee and A2 Malai Ghee, each priced per kg.', style: 'bg-white ring-1 ring-ossa-blue/10', iconStyle: 'bg-ossa-natural text-ossa-blue' },
  { icon: ShoppingBasket, title: 'Everyday dairy essentials', text: 'From daily milk to a bottle of badam milk, the range covers regular needs.', style: 'bg-white ring-1 ring-ossa-blue/10', iconStyle: 'bg-ossa-natural text-ossa-blue' },
  { icon: MessageCircle, title: 'Convenient WhatsApp ordering', text: 'Tap a button and a message with your product and price is ready to send.', style: 'bg-ossa-blue text-white sm:col-span-2', iconStyle: 'bg-ossa-lime text-ossa-blue' },
]

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] lg:col-span-5 lg:min-h-full">
          <Picture src={IMAGES.why} alt="Fresh dairy from OSSA Greens" scene={2} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-ossa-deep/90 via-ossa-deep/30 to-transparent" />
          <h2 id="why-title" className="absolute inset-x-0 bottom-0 p-7 font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:p-9 sm:text-5xl">
            Why Choose Our Range?
          </h2>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {points.map(({ icon: Icon, title, text, style, iconStyle }) => (
            <li key={title} className={`rounded-3xl p-6 sm:p-8 ${style}`}>
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconStyle}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 max-w-md leading-relaxed opacity-85">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
