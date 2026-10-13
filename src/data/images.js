// Every photo on the page, as a URL. Replace any value with your own image URL (or a /images/... file in /public).
// Leave '' to show the built-in illustration instead.
// Unsplash links use the photo-ID download form; if one ever fails to load, the illustration shows automatically.
const unsplash = (id, w = 1400) => `https://unsplash.com/photos/${id}/download?force=true&w=${w}`

const MILK_BOTTLE = "/public/images/products/image.png" // bottle of milk next to a glass
const MILK_GLASS = unsplash('MHVheSetqEE')  // clear glass bottle with milk
const MILK_POUR = unsplash('5SN5N5-JM3c')   // milk in a glass
const GHEE = '/public/images/products/image (2).png'       // ghee / clarified butter

export const IMAGES = {
  banners: ["/public/images/banners/banner2.png", "/public/images/banners/banner1.png", "/public/images/banners/banner3.png"],
  why: MILK_GLASS,
  aboutMain: MILK_BOTTLE,
  aboutSmall: GHEE,
  cta: '', // add a wide green pasture / cows photo URL here
}

export const PRODUCT_IMAGES = {
  'cow-milk': MILK_BOTTLE,
  'buffalo-milk': "/public/images/products/buffalo.png",
  'gir-cow-milk': "/public/images/products/image (2).png",
  paneer: '/public/images/products/image (3).png', // add paneer photo URL
  'a2-bilona-ghee': '/public/images/products/image (4).png',
  'a2-malai-ghee': '/public/images/products/image (6).png',
  'badam-milk': '/public/images/products/image (5).png', // add badam milk photo URL
}
