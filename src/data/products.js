import { PRODUCT_IMAGES } from './images'

// Single source of truth for catalogue prices.
// Only the two ghee products carry an `offerPercent`; final price and savings are calculated.
// `art` + `tint` drive the illustrated fallback shown until a real photo is added at `image`.

export const products = [
  { id: 'cow-milk', name: 'Cow Milk', category: 'milk', price: 80, unit: null, alt: 'Cow milk', art: 'milk', tint: '#E4EFD3' },
  { id: 'buffalo-milk', name: 'Buffalo Milk', category: 'milk', price: 100, unit: null, alt: 'Buffalo milk', art: 'milk', tint: '#DCE9F3' },
  { id: 'gir-cow-milk', name: 'Gir Cow Milk', category: 'milk', price: 120, unit: null, alt: 'Gir cow milk', art: 'milk', tint: '#F3EBD2' },
  { id: 'paneer', name: 'Paneer', category: 'paneer', price: 500, unit: 'per kg', alt: 'Block of paneer', art: 'paneer', tint: '#EAF3DC' },
  { id: 'a2-bilona-ghee', name: 'A2 Bilona Ghee', category: 'ghee', price: 2000, unit: 'per kg', offerPercent: 20, alt: 'Jar of A2 Bilona ghee', art: 'ghee', tint: '#F6EDC8' },
  { id: 'a2-malai-ghee', name: 'A2 Malai Ghee', category: 'ghee', price: 1600, unit: 'per kg', offerPercent: 10, alt: 'Jar of A2 Malai ghee', art: 'ghee', tint: '#F9F0D6' },
  { id: 'badam-milk', name: 'Badam Milk', category: 'badam', price: 50, unit: 'per bottle', alt: 'Bottle of badam milk', art: 'badam', tint: '#F2E6D8' },
]

products.forEach((p) => { p.image = PRODUCT_IMAGES[p.id] || '' })

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'milk', label: 'Milk' },
  { id: 'paneer', label: 'Paneer' },
  { id: 'ghee', label: 'Ghee' },
  { id: 'badam', label: 'Badam Milk' },
]

export const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`

export function getOffer(product) {
  if (!product.offerPercent) return null
  const savings = Math.round((product.price * product.offerPercent) / 100)
  return { percent: product.offerPercent, savings, finalPrice: product.price - savings }
}

export const gheeProducts = products.filter((p) => p.offerPercent)
