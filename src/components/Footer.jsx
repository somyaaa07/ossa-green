import Logo from './Logo'
import WhatsAppButton from './WhatsAppButton'
import { isWhatsAppConfigured, generalMessage } from '../utils/whatsapp'
import { navLinks } from './Navbar'
import { products } from '../data/products'
import { COMPANY } from '../config'

const YEAR = new Date().getFullYear()

const linkClass =
  'rounded text-white/80 hover:text-ossa-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-lime'

export default function Footer() {
  return (
    <footer className="mt-16 rounded-t-[2rem] bg-ossa-blue text-white sm:mt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo className="h-24 w-24" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            Milk, paneer, ghee and badam milk, with clear pricing and easy ordering on WhatsApp.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-heading text-xl font-bold">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products">
          <h2 className="font-heading text-xl font-bold">Products</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.id}><a href="#products" className={linkClass}>{p.name}</a></li>
            ))}
            <li><a href="#offers" className={`${linkClass} font-bold text-ossa-lime`}>Ghee Offers</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-xl font-bold">Order on WhatsApp</h2>
          <p className="mt-4 text-sm text-white/80">Send us a message to ask about the range or place an order.</p>
          <div className="mt-4">
            <WhatsAppButton message={generalMessage} variant="lime">Message us</WhatsAppButton>
          </div>
          <div className="mt-6 text-sm text-white/80">
            <p className="font-semibold text-white">{COMPANY.legalName}</p>
                        <p className="font-semibold text-white">Roja-Jalapur, Noida Extension</p>

            <p className="mt-1">
              Phone:{' '}
              <a href={`tel:+${COMPANY.phoneRaw}`} className={linkClass}>{COMPANY.phone}</a>
            </p>
            {COMPANY.address && <p className="mt-1">{COMPANY.address}</p>}
          </div>
          {!isWhatsAppConfigured() && (
            <p className="mt-3 text-xs text-white/60">Setup needed: set WHATSAPP_NUMBER in src/config.js.</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-5 text-center text-sm text-white/70">
        © {YEAR} {COMPANY.legalName} All rights reserved.
      </div>
    </footer>
  )
}
