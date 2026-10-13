import { useState } from 'react'
import { ProductArt, SceneArt } from './Art'

/**
 * Photo slot. The illustration sits underneath, the real photo is drawn over it.
 * If the file is missing the photo is dropped and the illustration stays, so nothing looks broken.
 * Pass `product` for product art, or `scene` (1-3) for a landscape backdrop.
 *
 * New props (existing usage works unchanged):
 *  - fit="contain"  shows the whole photo instead of cropping it (use for product shots).
 *  - bare           hides the illustration under the photo and uses the product tint as the
 *                   background. The illustration still appears if the photo fails to load.
 */
export default function Picture({
  src,
  alt,
  product,
  scene,
  eager = false,
  bare = false,
  fit = 'cover',
  className = '',
  imgClassName = '',
}) {
  const [failed, setFailed] = useState(false)
  const pos = /\babsolute\b/.test(className) ? '' : 'relative'
  const showArt = !bare || failed || !src
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'
  const style = bare && product?.tint ? { backgroundColor: product.tint } : undefined

  return (
    <div className={`${pos} overflow-hidden bg-ossa-natural ${className}`} style={style}>
      {showArt && (product ? <ProductArt kind={product.art} tint={product.tint} /> : <SceneArt variant={scene || 1} />)}
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full ${fitClass} ${imgClassName}`}
        />
      )}
      {failed && <span className="sr-only">{alt}</span>}
    </div>
  )
}