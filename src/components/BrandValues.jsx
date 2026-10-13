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
      {/* gap-px on a tinted background draws thin dividers between the cells */}
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ossa-blue/10 shadow-sm ring-1 ring-ossa-blue/10 lg:grid-cols-4">
        {values.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex flex-col items-start gap-3 bg-white p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ossa-blue text-ossa-lime sm:h-12 sm:w-12 sm:rounded-2xl">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold leading-snug text-ossa-ink sm:text-base">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}