/* Illustrated stand-ins in the brand palette. A real photo, when present, is drawn on top. */

const B = '#034C77'
const L = '#97CC40'

function Bottle({ x = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`}>
      <rect x="82" y="34" width="36" height="16" rx="4" fill={L} />
      <path d="M86 50h28v16c10 8 18 16 18 34v62a12 12 0 0 1-12 12H80a12 12 0 0 1-12-12v-62c0-18 8-26 18-34z" fill="#fff" stroke={B} strokeWidth="3" />
      <rect x="68" y="104" width="64" height="44" fill={B} />
      <path d="M100 113c-6 8-9 12-9 17a9 9 0 0 0 18 0c0-5-3-9-9-17z" fill={L} />
    </g>
  )
}

const productArt = {
  milk: () => (
    <>
      <Bottle />
      <ellipse cx="100" cy="176" rx="46" ry="5" fill={B} opacity=".12" />
    </>
  ),
  badam: () => (
    <>
      <rect x="84" y="30" width="32" height="18" rx="4" fill={B} />
      <path d="M88 48h24v14c10 8 20 14 20 32v68a12 12 0 0 1-12 12H80a12 12 0 0 1-12-12V94c0-18 10-24 20-32z" fill="#F6E7D0" stroke={B} strokeWidth="3" />
      <rect x="68" y="100" width="64" height="48" fill={B} />
      <path d="M100 110c-9 5-12 14-8 22 3 6 13 6 16 0 4-8 1-17-8-22z" fill={L} />
      <ellipse cx="100" cy="176" rx="46" ry="5" fill={B} opacity=".12" />
    </>
  ),
  paneer: () => (
    <>
      <path d="M44 112l56-30 56 30-56 30z" fill="#fff" stroke={B} strokeWidth="3" strokeLinejoin="round" />
      <path d="M44 112v32l56 30v-32z" fill="#F3F7EA" stroke={B} strokeWidth="3" strokeLinejoin="round" />
      <path d="M156 112v32l-56 30v-32z" fill="#E4EED2" stroke={B} strokeWidth="3" strokeLinejoin="round" />
      <path d="M72 97l56 30M100 82v30" stroke={B} strokeWidth="2" opacity=".35" />
      <ellipse cx="100" cy="184" rx="52" ry="5" fill={B} opacity=".12" />
    </>
  ),
  ghee: () => (
    <>
      <rect x="62" y="46" width="76" height="26" rx="7" fill={B} />
      <path d="M68 72h64a10 10 0 0 1 10 10v70a16 16 0 0 1-16 16H74a16 16 0 0 1-16-16V82a10 10 0 0 1 10-10z" fill="#EDB93A" stroke={B} strokeWidth="3" />
      <rect x="58" y="100" width="84" height="40" fill="#fff" opacity=".92" />
      <path d="M100 106c-7 9-10 13-10 18a10 10 0 0 0 20 0c0-5-3-9-10-18z" fill={L} />
      <ellipse cx="100" cy="176" rx="50" ry="5" fill={B} opacity=".12" />
    </>
  ),
}

export function ProductArt({ kind = 'milk', tint = '#E4EFD3' }) {
  const draw = productArt[kind] || productArt.milk
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="200" height="200" fill={tint} />
      <circle cx="160" cy="40" r="46" fill="#fff" opacity=".55" />
      <circle cx="30" cy="170" r="34" fill={L} opacity=".22" />
      {draw()}
    </svg>
  )
}

/* Landscape scene used behind banners and large photo slots. variant 1-3 shifts the hills. */
export function SceneArt({ variant = 1 }) {
  const v = ((variant - 1) % 3) + 1
  const sun = [ [980, 150], [260, 170], [720, 130] ][v - 1]
  const dy = [0, 30, -20][v - 1]
  return (
    <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`sky${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A6BA3" />
          <stop offset="1" stopColor="#CFE6F2" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill={`url(#sky${v})`} />
      <circle cx={sun[0]} cy={sun[1]} r="90" fill="#F6F3C9" opacity=".9" />
      <ellipse cx="300" cy="170" rx="120" ry="26" fill="#fff" opacity=".55" />
      <ellipse cx="880" cy="250" rx="150" ry="30" fill="#fff" opacity=".45" />
      <path d={`M0 ${430 + dy}C220 ${360 + dy} 420 ${380 + dy} 640 ${420 + dy}S1020 ${470 + dy} 1200 ${400 + dy}V700H0z`} fill="#B5DA6A" />
      <path d={`M0 ${520 + dy}C260 ${450 + dy} 520 ${500 + dy} 760 ${510 + dy}S1060 ${470 + dy} 1200 ${500 + dy}V700H0z`} fill="#97CC40" />
      <path d={`M0 ${610 + dy}C300 ${560 + dy} 600 ${620 + dy} 900 ${600 + dy}S1120 ${590 + dy} 1200 ${600 + dy}V700H0z`} fill="#6FA52B" />
    </svg>
  )
}
