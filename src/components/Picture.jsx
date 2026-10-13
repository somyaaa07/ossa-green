import { useState } from 'react'
import { ProductArt, SceneArt } from './Art'

/**
 * Photo slot. The illustration sits underneath, the real photo is drawn over it.
 * If the file is missing the photo is dropped and the illustration stays, so nothing looks broken.
 * Pass `product` for product art, or `scene` (1-3) for a landscape backdrop.
 */
export default function Picture({ src, alt, product, scene, eager = false, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false)
  const pos = /\babsolute\b/.test(className) ? '' : 'relative'
  return (
    <div className={`${pos} overflow-hidden bg-ossa-natural ${className}`}>
      {product ? <ProductArt kind={product.art} tint={product.tint} /> : <SceneArt variant={scene || 1} />}
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
      {failed && <span className="sr-only">{alt}</span>}
    </div>
  )
}
