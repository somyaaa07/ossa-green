# OSSA Greens landing page

    npm install
    npm run dev

## 1. WhatsApp number
Set `WHATSAPP_NUMBER` in `src/config.js` (digits only, with country code, e.g. `919876543210`).
Until it is set, every order button is disabled and no link is generated.

## 2. Photos
Saari photo URLs `src/data/images.js` mein hain. Wahan apne URL paste karein (full https link ya `/images/...` local path).
Khali ('') URL par built-in illustration dikhta hai. Logo: `public/images/ossa-logo.png`.

## Fonts
Headings: Bricolage Grotesque. Body: Figtree. Loaded in `index.html`, set in `src/index.css`.

## Tailwind version
Built for Tailwind v4 (`@tailwindcss/vite`). On v3, replace the first line of `src/index.css` with the three
`@tailwind` directives and move the `@theme` tokens into `tailwind.config.js`.
