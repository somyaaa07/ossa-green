import { Milk, LayoutGrid, BadgeIndianRupee, MessageCircle } from 'lucide-react'

const values = [
  { icon: Milk, text: 'Everyday Dairy Essentials' },
  { icon: LayoutGrid, text: 'A Range for Every Preference' },
  { icon: BadgeIndianRupee, text: 'Clear, Transparent Pricing' },
  { icon: MessageCircle, text: 'Easy WhatsApp Ordering' },
]

export default function BrandValues() {
  return (
    <section aria-label="What we offer" className="px-3 pt-5 sm:px-6">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-2 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-ossa-blue/10 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 rounded-2xl px-4 py-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ossa-blue text-ossa-lime">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="font-semibold leading-snug text-ossa-ink">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
