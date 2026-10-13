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
    text: 'A2 Bilona Ghee at 20% off and A2 Malai Ghee at 10% off, with the offer price shown up front.',
    chips: [offerChip('a2-bilona-ghee'), offerChip('a2-malai-ghee')],
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

const ctaPrimary =
  'inline-flex min-h-12 items-center justify-center rounded-full bg-ossa-lime px-7 py-3 text-base font-bold text-ossa-blue transition-colors hover:bg-[#a8dc4f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
const ctaSecondary =
  'inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/80 px-7 py-3 text-base font-bold text-white transition-colors hover:bg-white hover:text-ossa-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

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

  // Autoplay: pauses on hover, focus or touch, and never runs for reduced-motion users
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => goTo(index + 1), 6500)
    return () => clearInterval(id)
  }, [paused, index, goTo])

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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={() => holdFor(10000)}
      >
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto sm:h-[640px] lg:h-[680px]"
        >
          {slides.map((s, i) => (
            <div
              key={s.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              data-active={index === i}
              className="relative flex min-w-full snap-center flex-col sm:h-full sm:flex-row sm:items-center"
            >
              {/* Image: mobile par upar alag block, desktop par full background */}
              <div className="relative h-56 w-full shrink-0 overflow-hidden min-[420px]:h-64 sm:absolute sm:inset-0 sm:h-full">
                <Picture
                  src={IMAGES.banners[i]}
                  alt=""
                  scene={i + 1}
                  eager={i === 0}
                  className="absolute inset-0"
                />
                {/* Mobile: image neeche content me smoothly fade ho jaye */}
                <div className="absolute inset-0 bg-gradient-to-t from-ossa-deep via-ossa-deep/10 to-transparent sm:hidden" />
              </div>
              {/* Desktop/tablet overlay */}
              <div className="absolute inset-0 hidden bg-gradient-to-r from-ossa-deep/95 via-ossa-deep/70 to-ossa-deep/10 sm:block" />

              <div className="relative z-10 -mt-6 w-full max-w-3xl px-5 pb-16 text-white sm:mt-0 sm:px-8 sm:pb-28">
                <span className="rise inline-block rounded-full bg-ossa-lime px-3.5 py-1 text-xs font-bold text-ossa-blue sm:px-4 sm:py-1.5 sm:text-sm">
                  {s.tag}
                </span>
                {i === 0 ? (
                  <h1 className="rise rise-2 mt-3 font-heading text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:mt-5 sm:text-[clamp(2.5rem,6vw,4.75rem)] sm:leading-[0.98]">{s.title}</h1>
                ) : (
                  <h2 className="rise rise-2 mt-3 font-heading text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:mt-5 sm:text-[clamp(2.5rem,6vw,4.75rem)] sm:leading-[0.98]">{s.title}</h2>
                )}
                <p className="rise rise-3 mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/90 sm:mt-5 sm:text-lg">{s.text}</p>

                {s.chips.length > 0 && (
                  <ul className="rise rise-3 mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                    {s.chips.map((c) => (
                      <li key={c} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold sm:px-3.5 sm:py-1.5 sm:text-sm">{c}</li>
                    ))}
                  </ul>
                )}

                <div className="rise rise-3 mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
                  <a href={s.primary.href} className={`${ctaPrimary} max-sm:w-full max-sm:!min-h-11 max-sm:!py-2.5 max-sm:!text-[0.95rem]`}>{s.primary.label}</a>
                  {s.secondary && (
                    <a href={s.secondary.href} className={`${ctaSecondary} max-sm:w-full max-sm:!min-h-11 max-sm:!py-2.5 max-sm:!text-[0.95rem]`}>{s.secondary.label}</a>
                  )}
                  {s.whatsapp && (
                    <div className="max-sm:[&>*]:w-full">
                      <WhatsAppButton message={generalMessage} variant="light" size="lg">Order on WhatsApp</WhatsAppButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls: mobile par sirf dots (center), arrows sm se upar */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center px-5 pb-5 sm:justify-between sm:px-12 sm:pb-6 lg:px-20">
          <div className="flex items-center gap-2" role="group" aria-label="Choose banner">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show banner ${i + 1}`}
                aria-current={index === i}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${index === i ? 'w-10 bg-ossa-lime' : 'w-2.5 bg-white/60 hover:bg-white'}`}
              />
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