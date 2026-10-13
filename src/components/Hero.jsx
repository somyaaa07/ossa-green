import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Picture from './Picture'
import WhatsAppButton from './WhatsAppButton'
import { IMAGES } from '../data/images'
import { products, getOffer, formatINR } from '../data/products'
import { generalMessage } from '../utils/whatsapp'

const byId = (id) => products.find((p) => p.id === id)
const unitShort = (p) => (p.unit ? `/${p.unit.replace('per ', '')}` : '')
const offerChip = (id) => {
  const p = byId(id)
  return `${p.name.replace('A2 ', '')} ${formatINR(getOffer(p).finalPrice)}${unitShort(p)}`
}
const priceChip = (id, label) => {
  const p = byId(id)
  return `${label || p.name} ${formatINR(p.price)}${unitShort(p)}`
}
// Phone offer cards (slide 2): name, big % off, offer price
const offerCard = (id) => {
  const p = byId(id)
  const final = getOffer(p).finalPrice
  return {
    id,
    name: p.name,
    unit: unitShort(p),
    now: formatINR(final),
    pct: Math.round((1 - final / p.price) * 100),
  }
}

// Phone price board cell (slide 3)
const boardCell = (id, label) => {
  const p = byId(id)
  return { id, label: label || p.name, price: formatINR(p.price), unit: unitShort(p) }
}

const slides = [
  {
    tag: 'Milk, paneer and ghee',
    title: 'Pure Goodness. Every Single Day.',
    text: 'Discover our range of milk, fresh paneer, and traditional ghee, crafted for your everyday dairy needs.',
    chips: [],
    primary: { label: 'Explore Our Products', href: '#products' },
    secondary: { label: 'View Ghee Offers', href: '#offers' },
    
  },
  {
    tag: 'A2 ghee offers',
    title: 'Special Savings on A2 Ghee',
    titleLines: ['Special Savings on', 'A2 Ghee'], // two-tier heading on phones
    text: 'A2 Bilona Ghee at 20% off and A2 Malai Ghee at 10% off, with the offer price shown up front.',
    chips: [offerChip('a2-bilona-ghee'), offerChip('a2-malai-ghee')],
    offerCards: [offerCard('a2-bilona-ghee'), offerCard('a2-malai-ghee')],
    primary: { label: 'View Ghee Offers', href: '#offers' },
    whatsapp: true,
  },
  {
    tag: 'Everyday range',
    title: 'Milk for Every Preference',
    text: 'Cow, buffalo and Gir cow milk, paneer and badam milk, with clear prices on every product.',
 
    chips: [priceChip('cow-milk', 'Cow'), priceChip('buffalo-milk', 'Buffalo'), priceChip('gir-cow-milk', 'Gir Cow'), priceChip('paneer'), priceChip('badam-milk', 'Badam Milk')],
    primary: { label: 'Explore Our Products', href: '#products' },
    secondary: { label: 'View Ghee Offers', href: '#offers' },
  },
]

// Phone: light poster, dark text. sm and up: dark photo, white text (unchanged).
const ctaPrimary =
  'inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ossa-lime px-7 py-3 text-base font-bold text-ossa-blue transition-colors hover:bg-[#a8dc4f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue sm:w-auto sm:focus-visible:outline-white'
const ctaSecondary =
  'inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-ossa-blue px-7 py-3 text-base font-bold text-ossa-blue transition-colors hover:bg-ossa-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue sm:w-auto sm:border-white/80 sm:text-white sm:hover:bg-white sm:hover:text-ossa-blue sm:focus-visible:outline-white'

export default function Hero() {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef(null)

  const goTo = useCallback((i) => {
    const el = track.current
    if (!el) return
    const next = (i + slides.length) % slides.length
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }, [])

  const onScroll = () => {
    const el = track.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  // Autoplay: pauses on hover, focus or touch, never runs for reduced-motion users
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => goTo(index + 1), 6500)
    return () => clearInterval(id)
  }, [paused, index, goTo])

  // Keep the current slide aligned after rotation / resize
  useEffect(() => {
    const onResize = () => {
      const el = track.current
      if (el) el.scrollTo({ left: index * el.clientWidth, behavior: 'auto' })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [index])

  // Off-screen slides: not focusable, not tappable, hidden from screen readers
  useEffect(() => {
    const el = track.current
    if (!el) return
    Array.from(el.children).forEach((child, i) => { child.inert = i !== index })
  }, [index])

  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  const holdFor = (ms) => {
    setPaused(true)
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), ms)
  }

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="OSSA Greens highlights"
      className="px-3 pt-3 sm:px-6"
    >
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-ossa-deep sm:rounded-[2rem]"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={() => holdFor(10000)}
      >
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain sm:h-[640px]"
        >
          {slides.map((s, i) => {
            const Heading = i === 0 ? 'h1' : 'h2'
            return (
              <div
                key={s.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                data-active={index === i}
                className="relative flex aspect-[2/3] min-w-full snap-center flex-col sm:aspect-auto sm:h-full sm:flex-row sm:items-center"
              >
                {/* Background. Phones use a portrait poster image (IMAGES.bannersMobile), sm and up use the wide banner. */}
                <div className="absolute inset-0 overflow-hidden sm:hidden">
                  <Picture
                    src={IMAGES.bannersMobile?.[i] ?? IMAGES.banners[i]}
                    alt=""
                    scene={i + 1}
                    eager={i === 0}
                    className="absolute inset-0"
                  />
                </div>
                <div className="absolute inset-0 hidden overflow-hidden sm:block">
                  <Picture
                    src={IMAGES.banners[i]}
                    alt=""
                    scene={i + 1}
                    eager={i === 0}
                    className="absolute inset-0"
                  />
                </div>
                <div className="absolute inset-0 hidden bg-gradient-to-r from-ossa-deep/65 via-ossa-deep/20 to-ossa-deep/10 sm:block" />

                {/* Content: top group, then (phones) the jar shows through, then bottom group */}
                <div className="relative z-10 flex flex-1 flex-col px-4 pb-9 pt-9 text-center text-ossa-blue sm:w-full sm:max-w-3xl sm:flex-none sm:px-8 sm:pb-28 sm:pt-0 sm:text-left sm:text-white">
                  {/* Top group */}
                  <div className="flex flex-col">
                    <span className="rise inline-block self-end rounded-full bg-ossa-lime px-3.5 py-1 text-[0.8rem] font-bold text-ossa-blue sm:self-start sm:px-4 sm:py-1.5 sm:text-sm">
                      {s.tag}
                    </span>

                    <Heading
                      className={`rise rise-2 mt-2 font-heading font-extrabold tracking-tight sm:mt-5 sm:text-[clamp(2.5rem,6vw,4.75rem)] sm:leading-[0.98] ${
                        s.titleLines ? 'text-[2.9rem] leading-none' : 'mt-3 text-[2.4rem] leading-[1.08]'
                      }`}
                    >
                      {s.titleLines ? (
                        <>
                          <span className="block text-[0.9em] sm:inline sm:text-[1em]">{s.titleLines[0]}</span>{' '}
                          <span className="block sm:inline">{s.titleLines[1]}</span>
                        </>
                      ) : (
                        s.title
                      )}
                    </Heading>

                <p className="rise rise-3 hidden text-lg leading-relaxed sm:mt-5 sm:block sm:max-w-lg sm:text-white/90">
  {s.text}
</p>
                  </div>

                  {/* Bottom group */}
                  <div className="mt-auto pt-4 sm:mt-0 sm:pt-0">
                    {/* Phones only, slide 2: one offer strip with two halves */}
                    {s.offerCards && (
                      <ul className="grid grid-cols-2 divide-x divide-ossa-blue/10 overflow-hidden rounded-2xl bg-white/95 shadow-md ring-1 ring-ossa-lime/70 sm:hidden">
                        {s.offerCards.map((o) => (
                          <li key={o.id} className="px-2 py-3">
                            <p className="font-heading text-sm font-bold leading-tight text-ossa-blue">{o.name}</p>
                            <p className="mt-1 font-heading text-[1.6rem] font-extrabold leading-none text-[#4c9a1f]">
                              {o.pct}% OFF
                            </p>
                            <p className="mt-1.5 text-[0.95rem] font-bold text-ossa-blue">
                              {o.now}
                              <span className="text-xs font-semibold text-ossa-blue/70">{o.unit}</span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Phones only, slide 3: neat price board */}
                    {s.priceBoard && (
                      <div className="divide-y divide-ossa-blue/10 overflow-hidden rounded-2xl bg-white/95 shadow-md ring-1 ring-ossa-lime/70 sm:hidden">
                        {s.priceBoard.map((row, r) => (
                          <ul
                            key={r}
                            className="grid divide-x divide-ossa-blue/10"
                            style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
                          >
                            {row.map((c) => (
                              <li key={c.id} className="px-2 py-2.5">
                                <p className="text-xs font-semibold text-ossa-blue/70">{c.label}</p>
                                <p className="mt-0.5 text-base font-bold text-ossa-blue">
                                  {c.price}
                                  <span className="text-xs font-semibold text-ossa-blue/70">{c.unit}</span>
                                </p>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    )}

                    {/* Price chips: sm and up only */}
                    {s.chips.length > 0 && (
                      <ul className="rise rise-3 mt-5 hidden flex-wrap gap-2 sm:flex">
                        {s.chips.map((c) => (
                          <li key={c} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white">
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="rise rise-3 mt-4 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                      <a href={s.primary.href} className={ctaPrimary}>
                        {s.primary.label}
                        <ArrowRight className="ml-2 h-5 w-5 sm:hidden" aria-hidden="true" />
                      </a>
                      {s.secondary && (
                        <a href={s.secondary.href} className={ctaSecondary}>{s.secondary.label}</a>
                      )}
                      {s.whatsapp && (
                        <>
                          <div className="sm:hidden">
                            <WhatsAppButton message={generalMessage} variant="primary" size="lg" className="w-full">
                              Order on WhatsApp
                            </WhatsAppButton>
                          </div>
                          <div className="hidden sm:block">
                            <WhatsAppButton message={generalMessage} variant="light" size="lg">
                              Order on WhatsApp
                            </WhatsAppButton>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Controls: hidden on phones (swipe instead), dots + arrows from sm up */}
        <div className="hidden sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-20 sm:flex sm:items-center sm:justify-between sm:px-12 sm:pb-6 lg:px-20">
          <div className="flex items-center" role="group" aria-label="Choose banner">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show banner ${i + 1}`}
                aria-current={index === i}
                className="group flex h-9 items-center justify-center px-1.5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white sm:h-6"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 sm:h-2.5 ${index === i ? 'w-8 bg-ossa-lime sm:w-10' : 'w-2 bg-white/60 group-hover:bg-white sm:w-2.5'}`}
                />
              </button>
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            {[
              { label: 'Previous banner', Icon: ArrowLeft, to: index - 1 },
              { label: 'Next banner', Icon: ArrowRight, to: index + 1 },
            ].map(({ label, Icon, to }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => { goTo(to); holdFor(10000) }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ossa-blue transition-colors hover:bg-ossa-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}