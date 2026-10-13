import { useState } from 'react'

/** The round badge works on light and dark backgrounds, so no recolouring is needed. */
export default function Logo({ className = 'h-12 w-12' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span className={`flex items-center justify-center rounded-full bg-ossa-blue font-heading font-bold text-white ring-4 ring-ossa-lime ${className}`}>
        OSSA
      </span>
    )
  }
  return <img src="/images/ossa-logo.png" alt="OSSA Greens" onError={() => setFailed(true)} className={`rounded-full ${className}`} />
}
