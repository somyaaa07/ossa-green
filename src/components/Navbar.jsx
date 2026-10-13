import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import WhatsAppButton from './WhatsAppButton'
import { generalMessage } from '../utils/whatsapp'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Products', href: '#products' },
  { label: 'Ghee Offers', href: '#offers' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Highlight the link of the section currently in view
  useEffect(() => {
    const els = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/95 py-2 pl-2.5 pr-2.5 shadow-[0_10px_30px_-14px_rgba(3,76,119,0.45)] ring-1 ring-ossa-blue/10 backdrop-blur sm:pr-3"
      >
        <a href="#home" aria-label="OSSA Greens, back to top" className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue">
          <Logo className="h-14 w-14" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ossa-blue ${
                  active === l.href ? 'bg-ossa-blue text-white' : 'text-ossa-ink hover:bg-ossa-natural'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WhatsAppButton message={generalMessage}>Order on WhatsApp</WhatsAppButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ossa-natural text-ossa-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ossa-blue lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-7xl rounded-3xl bg-white p-3 shadow-xl ring-1 ring-ossa-blue/10 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3.5 text-base font-semibold text-ossa-ink hover:bg-ossa-natural focus-visible:outline-2 focus-visible:outline-ossa-blue"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="p-1 pt-3 sm:hidden">
              <WhatsAppButton message={generalMessage} className="w-full">Order on WhatsApp</WhatsAppButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
