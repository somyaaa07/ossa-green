const unsplash = (id, w = 1400) => `https://unsplash.com/photos/${id}/download?force=true&w=${w}`

const MILK_BOTTLE = '/images/products/image-1.png'
const MILK_GLASS = unsplash('MHVheSetqEE')
const GHEE = '/images/products/image-2.png'

export const IMAGES = {
  banners: ['/images/banners/banner2.png', '/images/banners/banner1.png', '/images/banners/banner3.png'],
  why: MILK_GLASS,
  aboutMain: MILK_BOTTLE,
  aboutSmall: GHEE,
  cta: '',
}

export const PRODUCT_IMAGES = {
  'cow-milk': MILK_BOTTLE,
  'buffalo-milk': '/images/products/buffalo.png',
  'gir-cow-milk': '/images/products/image-2.png',
  paneer: '/images/products/image-3.png',
  'a2-bilona-ghee': '/images/products/image-4.png',
  'a2-malai-ghee': '/images/products/image-6.png',
  'badam-milk': '/images/products/image-5.png',
}