import Picture from './Picture'
import WhatsAppButton from './WhatsAppButton'
import { IMAGES } from '../data/images'
import { generalMessage } from '../utils/whatsapp'

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="relative mx-auto w-full max-w-lg pb-8 pr-6 lg:max-w-none">
          <Picture src={IMAGES.aboutMain} alt="Dairy products from OSSA Greens" scene={1} className="aspect-[4/5] rounded-[2rem] sm:aspect-[5/5]" />
          <Picture
            src={IMAGES.aboutSmall}
            alt="Ghee and milk from OSSA Greens"
            scene={3}
            className="absolute -bottom-0 right-0 aspect-square w-2/5 rounded-3xl border-8 border-ossa-natural shadow-xl"
          />
        </div>

        <div>
          <span className="block h-1.5 w-16 rounded bg-ossa-lime" aria-hidden="true" />
          <h2 id="about-title" className="mt-6 font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-ossa-blue sm:text-5xl lg:text-6xl">
            Dairy Choices for Everyday Living
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ossa-ink/80">
            Explore a thoughtfully presented range of milk, paneer, ghee, and badam milk, with transparent pricing and a
            convenient way to place your order.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ossa-blue px-7 py-3 text-base font-bold text-white transition-colors hover:bg-ossa-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue"
            >
              Explore Our Products
            </a>
            <WhatsAppButton message={generalMessage} variant="outline" size="lg">Order on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  )
}
