> **Prompt basis:** User asked Claude to design and build a printer-selector web app for India with live prices. Neobrutalist Next.js 15 app with quiz, filter-browse, dashboard detail pages, and on-demand price scraping from Amazon.in / Flipkart / Croma.

# PrinterPick IN

Find the right printer for India in 60 seconds. Live prices, honest TCO math, no affiliate pressure.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 3.4** with neobrutalist design tokens
- **cheerio** for HTML parsing in price scrapers
- In-memory LRU cache for prices (5-min TTL)
- Deployable to Vercel with one command

## Local dev

```bash
cd C:\work\printer-selector-app
npm install
npm run dev
# → http://localhost:3000
```

## Build + production

```bash
npm run build
npm start
```

## Pages

| Route | What it is |
|---|---|
| `/` | Hybrid landing — quiz CTA + browse CTA + top 3 picks |
| `/quiz` | 5-step wizard → redirects to /browse?matches=... |
| `/browse` | Filter sidebar (brand, type, features, max price) + printer card grid |
| `/printer/[slug]` | Dashboard detail — live prices, TCO, ink cost, pros/cons, specs, buy buttons |
| `/compare?p=a,b,c` | Side-by-side feature table for up to 3 printers |
| `/api/prices/[asin]` | On-demand fetch Amazon.in/Flipkart/Croma, 5-min cache |

## Deploy to Vercel

```bash
vercel login       # one-time
vercel --prod      # deploys to <project>.vercel.app
```

## Extending

- **Add a printer:** append a new object to `lib/printers.ts`, follow the `Printer` type.
- **Update a scraper selector:** edit `lib/scrapers/{amazon,flipkart,croma}.ts`. Retailers change markup ~quarterly; fallback to `null` keeps UI resilient.
- **Change quiz weights:** edit scoring block in `lib/quiz-engine.ts`.

## Files

- `lib/printers.ts` — 12 seed printers (Canon G3770, G3020, G3010, E4570; Epson L3250, L3210, L3260; HP ST 585, 580, 589; Brother T226, HL-L2321D)
- `lib/tco.ts` — pure `calculateTCO(printer, { monthlyPages, colourPercent })`
- `lib/quiz-engine.ts` — `rankPrinters(answers)` → top 3 with reasons
- `lib/scrapers/` — one module per retailer, all return `PriceResult`
- `lib/cache.ts` — 5-minute TTL in-memory LRU
- `app/globals.css` + `tailwind.config.ts` — neobrutalist tokens (`ink`, `cream`, `sun`, `sky`, `leaf`, `rose`, `ash`)

## Notes on scraping

Web scraping Amazon.in / Flipkart / Croma is grey-area legally — tolerated for personal use, violates some ToS clauses at commercial scale. For a personal / portfolio tool at low traffic this is fine. For commercial scale, switch to Amazon Associates API (requires registration + approval).
