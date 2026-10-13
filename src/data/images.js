const unsplash = (id, w = 1400) => `https://unsplash.com/photos/${id}/download?force=true&w=${w}`

const MILK_BOTTLE = '/images/products/bottle.png'
const MILK_GLASS = unsplash('MHVheSetqEE')
const GHEE = '/images/products/image-2.png'

export const IMAGES = {
  banners: ['/images/banners/banner5.png', '/images/banners/banner1.png', '/images/banners/banner3.png'],
    bannersMobile: [
    '/images/banners/mobilebanner4.png', // slide 1: Pure Goodness
    '/images/banners/mobilebanner.jpeg', // slide 2: A2 ghee offers
    '/images/banners/mobbilebanner2.png', // slide 3: Milk for every preference
  ],
  why: MILK_GLASS,
  aboutMain: MILK_BOTTLE,
  aboutSmall: GHEE,
  cta: '',
}

export const PRODUCT_IMAGES = {
  'cow-milk': MILK_BOTTLE,
  'buffalo-milk': '/images/products/bootle1.png',
  'gir-cow-milk': '/images/products/bottle2.png',
  paneer: '/images/products/panner.png',
  'a2-bilona-ghee': '/images/products/ghee1.png',
  'a2-malai-ghee': '/images/products/ghee3.png',
  'badam-milk': '/images/products/badammilk.png',
}
