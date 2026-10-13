import { WHATSAPP_NUMBER } from '../config'
import { formatINR, getOffer } from '../data/products'

const cleanNumber = () => String(WHATSAPP_NUMBER || '').replace(/\D/g, '')

export const isWhatsAppConfigured = () => cleanNumber().length >= 10

/** Returns a wa.me URL, or null when the business number has not been set. */
export function buildWhatsAppUrl(message) {
  if (!isWhatsAppConfigured()) return null
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${cleanNumber()}${text}`
}

/** Prefilled message for one product, using the offer price when it has one. */
export function productMessage(product) {
  const offer = getOffer(product)
  const unit = product.unit ? ` ${product.unit}` : ''
  if (offer) {
    return `Hello, I would like to order ${product.name} at the offer price of ${formatINR(offer.finalPrice)}${unit} (${offer.percent}% off the regular ${formatINR(product.price)}). Please share the ordering details.`
  }
  return `Hello, I would like to order ${product.name} at ${formatINR(product.price)}${unit}. Please share the ordering details.`
}

export const generalMessage =
  'Hello, I would like to know more about your dairy products and place an order. Please share the ordering details.'
