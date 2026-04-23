export type RetailerLink = { id: string; url: string };

export type Printer = {
  slug: string;
  brand: 'Canon' | 'Epson' | 'HP' | 'Brother';
  model: string;
  category: 'ink-tank' | 'cartridge' | 'laser-mono' | 'laser-colour';
  image: string;
  mrp: number;
  retailers: {
    amazon?: RetailerLink;
    flipkart?: RetailerLink;
    croma?: RetailerLink;
  };
  features: {
    wifi: boolean;
    autoDuplex: boolean;
    colour: boolean;
    adf: boolean;
    borderless: boolean;
    lcd: boolean;
  };
  ink: {
    blackPerPage: number;
    colourPerPage: number;
    bottleMrp: number;
  };
  specs: {
    ppmBlack: number;
    ppmColour: number;
    maxMonthly: number;
    warrantyYears: number;
  };
  pros: string[];
  cons: string[];
  bestFor: string;
  /** Full expert write-up (markdown). Multi-paragraph, specs-backed, persona-driven. */
  writeup?: string;
  verdict?: 'top-pick' | 'value-pick' | 'premium' | 'avoid' | 'budget';
};

export const printers: Printer[] = [
  {
    slug: 'canon-pixma-g3770',
    brand: 'Canon',
    model: 'PIXMA G3770',
    category: 'ink-tank',
    image: '/printers/canon-g3770.svg',
    mrp: 15990,
    retailers: {
      amazon: { id: 'B0BY92Z97S', url: 'https://www.amazon.in/dp/B0BY92Z97S' },
      flipkart: { id: 'PRNGNKWWJQXYATUH', url: 'https://www.flipkart.com/canon-pixma-megatank-g3770-black-multi-function-wifi-color-ink-tank-printer/p/itm6117edec81924' },
      croma: { id: 'canon-g3770', url: 'https://www.croma.com/searchB?q=canon+pixma+g3770' },
    },
    features: { wifi: true, autoDuplex: true, colour: true, adf: false, borderless: true, lcd: true },
    ink: { blackPerPage: 0.13, colourPerPage: 0.25, bottleMrp: 499 },
    specs: { ppmBlack: 11, ppmColour: 6, maxMonthly: 800, warrantyYears: 2 },
    pros: [
      'Auto-duplex + Wi-Fi + colour LCD — the full feature set',
      'Dye ink, punchy colour for kids\' photos',
      'Slightly faster than G3020 (~11 IPM)',
      '2-year standard warranty (register for free extension)',
    ],
    cons: [
      'Priced above the ₹11k sweet spot (historical low ₹10,699)',
      'No ADF (auto document feeder)',
    ],
    bestFor: 'Weekly 20+ page stacks, kids\' colour photos, phone+laptop Wi-Fi printing.',
    writeup: `**Canon PIXMA G3770** — the full-featured ink-tank for households that print a lot and want every box ticked.

**What it is.** An ink-tank all-in-one (print + scan + copy) from Canon's MegaTank line. Released in India 2023, it's the first G-series model to bundle auto-duplex + a 1.35" colour LCD + Wi-Fi at one price, which is why it's our top pick for a 100+ pages/month household.

**Key specs at a glance.** 11 IPM black / 6 IPM colour. 4800×1200 dpi print. 4-ink dye system, ~7,500 colour pages per ₹499 bottle (~₹0.25/colour page). Wi-Fi + Wi-Fi Direct + AirPrint + Mopria. Borderless 4×6 / A5 / A4. Recommended monthly volume: up to 800 pages. 2-year standard warranty (extendable free via canon.co.in registration).

**Who should buy this.** Families with kids who print colour photos + school projects + policy documents. Anyone printing 20+ page stacks weekly who doesn't want to flip paper by hand. Phone-first households who need Wi-Fi Direct as a fallback when the home router is misbehaving.

**Who should skip.** If your budget is a hard ₹11,000 cap, the G3020 below saves ₹4,891 and keeps Wi-Fi (you just flip paper yourself). If you only print text, the Brother HL-L2321D laser is ~3× faster for B&W.

**What you give up.** No ADF (auto document feeder), so multi-page scanning is flatbed-only — one page at a time. Colour speed is modest at 6 IPM; photo-prints are fine, not fast.

**Bangalore-specific note.** Canon's largest service network in India. Authorised centres at Koramangala, HSR Layout, Electronic City — all within 10 km of 560076. Genuine GI-71 ink bottles are stocked at SP Road and most Amazon.in "Sold by Canon" listings. Historical Amazon low: ₹10,699 (check during Summer Sale / Diwali).`,
    verdict: 'top-pick',
  },
  {
    slug: 'canon-pixma-g3020',
    brand: 'Canon',
    model: 'PIXMA G3020',
    category: 'ink-tank',
    image: '/printers/canon-g3020.svg',
    mrp: 11099,
    retailers: {
      amazon: { id: 'B08VT9NYG3', url: 'https://www.amazon.in/dp/B08VT9NYG3' },
      flipkart: { id: 'canon-g3020', url: 'https://www.flipkart.com/search?q=canon+pixma+g3020' },
      croma: { id: 'canon-g3020', url: 'https://www.croma.com/searchB?q=canon+pixma+g3020' },
    },
    features: { wifi: true, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: false },
    ink: { blackPerPage: 0.08, colourPerPage: 0.21, bottleMrp: 499 },
    specs: { ppmBlack: 9, ppmColour: 5, maxMonthly: 700, warrantyYears: 2 },
    pros: [
      'Lowest colour-per-page in its class (₹0.21)',
      'Wi-Fi + Wi-Fi Direct',
      'Dye ink, photo-grade output',
      'Widely available in Bangalore — strong Canon service network',
    ],
    cons: [
      'No auto-duplex (manual flip for 2-sided prints)',
      'No LCD screen — button indicators only',
    ],
    bestFor: 'Budget-conscious, OK flipping paper for the rare 2-sided print.',
    writeup: `**Canon PIXMA G3020** — the ₹11k value pick that wins on total cost of ownership.

**What it is.** Canon's 2021 ink-tank all-in-one, still in active production. Same dye-ink 4-colour system as the G3770 but in a simpler chassis: no LCD, no auto-duplex, no LAN. The trade-off buys you the **lowest colour-per-page of any printer in our catalog at ₹0.21** — and Wi-Fi + Wi-Fi Direct are kept.

**Key specs at a glance.** 9.1 IPM black / 5 IPM colour. 4800×1200 dpi. 4-ink dye (GI-71 bottles, ~₹499 each). ~7,700 colour pages / ~6,000 black pages per set. Borderless 4×6 and A4 photo. USB + Wi-Fi + Wi-Fi Direct + AirPrint. Monthly recommended: up to 700 pages. 2-year warranty with free registration.

**Who should buy this.** Anyone with a ₹11k ceiling who prints 50-300 pages/month, wants colour, and is OK flipping the paper stack once in a while. Students, young families, freelancers working from home. If you're printing mostly singles (1-2 pages at a time), the lack of auto-duplex literally doesn't matter.

**Who should skip.** Weekly 20-page document stacks — you'll get tired of flipping. HP Smart Tank fans (see 585). Anyone who needs the LCD for "on-device" Wi-Fi setup (you'll use the app instead).

**What you give up.** No LCD (small button lights tell you tank/ink status). No auto-duplex (flip by hand). No ADF. Power cable only — USB-B cable is sold separately (~₹150).

**Bangalore-specific note.** Same Canon service network as G3770 (Koramangala, HSR, Electronic City). GI-71 bottles everywhere. **Best overall value pick for Bangalore 560076 buyers** — ships next-day from Amazon India's Bengaluru warehouse, installs in under 30 minutes.`,
    verdict: 'value-pick',
  },
  {
    slug: 'epson-ecotank-l3250',
    brand: 'Epson',
    model: 'EcoTank L3250',
    category: 'ink-tank',
    image: '/printers/epson-l3250.svg',
    mrp: 13619,
    retailers: {
      amazon: { id: 'B09N3LHV2X', url: 'https://www.amazon.in/dp/B09N3LHV2X' },
      flipkart: { id: 'epson-l3250', url: 'https://www.flipkart.com/search?q=epson+l3250' },
      croma: { id: 'epson-l3250', url: 'https://www.croma.com/searchB?q=epson+l3250' },
    },
    features: { wifi: true, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: false },
    ink: { blackPerPage: 0.09, colourPerPage: 0.33, bottleMrp: 529 },
    specs: { ppmBlack: 10, ppmColour: 5, maxMonthly: 700, warrantyYears: 2 },
    pros: [
      'Legendary Epson reliability',
      'Wi-Fi + Wi-Fi Direct + AirPrint',
      'Widest ink-bottle availability across India',
      'Slightly better photo output than Canon at A4',
    ],
    cons: [
      'No auto-duplex at this price',
      'Higher colour ₹/page than Canon G3020',
      'Pricier than equivalent Canon',
    ],
    bestFor: 'Epson-ecosystem loyalists + easy local bottle refills.',
    writeup: `**Epson EcoTank L3250** — Epson's mid-tier ink-tank all-in-one for photo-heavy households.

**What it is.** A 3-in-1 (print/scan/copy) from Epson's L-series, the original "ink tank" category Epson invented in 2011. Uses Epson's Micro Piezo print head with 4-colour dye ink. Widely considered the **photo-output leader** under ₹15k — skin tones and gradients look visibly better than Canon G-series side by side.

**Key specs at a glance.** 10 IPM black / 5 IPM colour. 5760×1440 dpi (interpolated). 4-ink dye (003-series bottles, ~₹529 each). ~7,500 colour pages / ~4,500 black pages per set. Borderless 4×6 / 5×7 / A4. Wi-Fi + Wi-Fi Direct + Epson Smart Panel app + AirPrint + Mopria. Recommended volume: up to 700 pages/month. 2-year warranty with free registration.

**Who should buy this.** Photo-priority households. Grandparents printing grandkids' pictures. Scrap-bookers, school-project parents, anyone whose printer's main job is photos, not documents. Epson loyalists who've used L130/L360/L3150 before.

**Who should skip.** Tight budgets — ₹13,619 is noticeably above the G3020's ₹11,099 for similar features (plus the Epson colour ₹/page is higher at ₹0.33 vs Canon's ₹0.21). If you print 20+ page doc stacks weekly, the lack of auto-duplex is a daily annoyance.

**What you give up.** No LCD. No auto-duplex (the L3260, ₹5k more, adds it). Epson bottles cost slightly more per page than Canon.

**Bangalore-specific note.** Epson authorised service at Indiranagar and Jayanagar. 003 ink bottles are **the most widely stocked refill** in India — any small stationery store near a college stocks them, so emergency refills aren't a problem.`,
  },
  {
    slug: 'epson-ecotank-l3210',
    brand: 'Epson',
    model: 'EcoTank L3210',
    category: 'ink-tank',
    image: '/printers/epson-l3210.svg',
    mrp: 11099,
    retailers: {
      amazon: { id: 'B09L5YPF4Y', url: 'https://www.amazon.in/dp/B09L5YPF4Y' },
      flipkart: { id: 'epson-l3210', url: 'https://www.flipkart.com/search?q=epson+l3210' },
    },
    features: { wifi: false, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: false },
    ink: { blackPerPage: 0.09, colourPerPage: 0.33, bottleMrp: 529 },
    specs: { ppmBlack: 10, ppmColour: 5, maxMonthly: 700, warrantyYears: 2 },
    pros: [
      'Cheapest Epson EcoTank in India',
      'Same cost-per-page as L3250',
      'Rock-solid, no-frills design',
    ],
    cons: [
      'USB-only — NO Wi-Fi',
      'No auto-duplex',
      'No LCD',
    ],
    bestFor: 'Single desktop printing, no wireless needed.',
    writeup: `**Epson EcoTank L3210** — the cheapest genuine Epson ink-tank, at the cost of every wireless feature.

**What it is.** A bare-bones 3-in-1 ink-tank. Same Micro Piezo printhead + 4-colour dye ink as the L3250 — but **USB-only**. No Wi-Fi, no LCD, no auto-duplex. Designed for buyers whose only requirement is "cheapest Epson that still prints colour photos well."

**Key specs at a glance.** Identical to L3250 for speed (10/5 IPM) and ink yield (~7,500 colour pages / 003 bottles at ~₹529). The difference is connectivity: USB-B to your laptop, that's it. Borderless 4×6 / A4 still supported.

**Who should buy this.** One household member, one always-on laptop/desktop, willing to plug in a USB cable. Students with a single study-desk setup. Low-tech households where Wi-Fi setup would be intimidating.

**Who should skip.** Anyone with a phone printing workflow (no Wi-Fi = no AirPrint = can't print from iPhone). Households with multiple devices. Anyone who might ever want to move the printer to a different room.

**What you give up.** Wi-Fi, Wi-Fi Direct, AirPrint, Mopria, LCD, auto-duplex. Buy USB-B cable separately (~₹150).

**Bangalore-specific note.** Same service network as L3250 (Indiranagar, Jayanagar). 003 bottles stocked everywhere. At ₹11,099 it's ~₹2,500 cheaper than L3250 — if you don't need Wi-Fi, you save real money. **But for ₹0 more you could pick Canon G3020 which keeps Wi-Fi** — worth the trade-off for most buyers.`,
    verdict: 'budget',
  },
  {
    slug: 'hp-smart-tank-585',
    brand: 'HP',
    model: 'Smart Tank 585',
    category: 'ink-tank',
    image: '/printers/hp-st585.svg',
    mrp: 14499,
    retailers: {
      amazon: { id: 'B0DB8VDWKQ', url: 'https://www.amazon.in/dp/B0DB8VDWKQ' },
      flipkart: { id: 'hp-st585', url: 'https://www.flipkart.com/search?q=hp+smart+tank+585' },
      croma: { id: 'hp-st585', url: 'https://www.croma.com/searchB?q=hp+smart+tank+585' },
    },
    features: { wifi: true, autoDuplex: true, colour: true, adf: false, borderless: true, lcd: true },
    ink: { blackPerPage: 0.10, colourPerPage: 0.30, bottleMrp: 599 },
    specs: { ppmBlack: 12, ppmColour: 5, maxMonthly: 800, warrantyYears: 1 },
    pros: [
      'Best mobile app experience (HP Smart)',
      'Pigment black + dye colour = sharper text',
      '6,000 pages of colour ink in the box',
      'Auto-duplex + Wi-Fi + AirPrint + Alexa',
    ],
    cons: [
      'Pricier than equivalent Canon',
      'Thinner service network in tier-2 cities',
    ],
    bestFor: 'Users who value the app and print lots of text documents.',
    writeup: `**HP Smart Tank 585** — the app-first ink-tank with the best text sharpness in its class.

**What it is.** HP's answer to Canon G3770 and Epson L3250. Key differentiator: **pigment black ink + dye colour**. Pigment black is water-resistant, fade-resistant, and produces visibly sharper edges on text than dye-only competitors. Auto-duplex is included.

**Key specs at a glance.** 12 IPM black / 5 IPM colour. 1200×1200 dpi effective. Hybrid ink (pigment black GT53 + dye CMY GT52, ~₹599/bottle). **6,000 colour pages + 8,000 black pages in the box** (Canon ships much less). Auto-duplex, Wi-Fi + Wi-Fi Direct + AirPrint + Mopria + Alexa voice print. 1-year warranty (extension varies by model).

**Who should buy this.** Home-offices and freelancers who print lots of documents + occasional photos. Anyone who wants their printouts to survive coffee spills (pigment black is coffee-resistant). iOS / Alexa households. Users who want the slickest mobile-app experience — HP Smart is genuinely better than Canon PRINT and Epson Smart Panel.

**Who should skip.** Pure photo-printing use cases — dye-only Canon and Epson produce punchier saturated colour. Tight budgets — ₹14,499 is ~₹3,400 above G3020. Tier-2/3 city buyers with thinner HP service networks.

**What you give up.** Colour ₹/page at ₹0.30 is higher than Canon's ₹0.25. Warranty is 1 year standard (Canon + Epson give 2 with registration).

**Bangalore-specific note.** HP authorised service at Koramangala and Indiranagar — fewer locations than Canon but all metro-accessible. GT52/GT53 bottles are stocked at Croma and on Amazon "Sold by HP." Good fit if you already have an HP laptop and want single-brand support.`,
  },
  {
    slug: 'brother-dcp-t226',
    brand: 'Brother',
    model: 'DCP-T226',
    category: 'ink-tank',
    image: '/printers/brother-t226.svg',
    mrp: 8499,
    retailers: {
      amazon: { id: 'B0B38N9YZS', url: 'https://www.amazon.in/dp/B0B38N9YZS' },
      flipkart: { id: 'brother-t226', url: 'https://www.flipkart.com/search?q=brother+dcp-t226' },
    },
    features: { wifi: false, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: false },
    ink: { blackPerPage: 0.15, colourPerPage: 0.30, bottleMrp: 349 },
    specs: { ppmBlack: 16, ppmColour: 9, maxMonthly: 500, warrantyYears: 1 },
    pros: [
      'Cheapest ink-tank in India',
      'Highest page yield per bottle',
      'Reliable Brother build quality',
    ],
    cons: [
      'USB-only — NO Wi-Fi',
      'No auto-duplex',
      'Weaker colour output than Canon/Epson',
    ],
    bestFor: 'Hard ₹9k budget, single laptop/PC, no wireless needed.',
    writeup: `**Brother DCP-T226** — the cheapest ink-tank in India that isn't a bargain-bin trap.

**What it is.** Brother's entry-level InkBenefit ink-tank 3-in-1. At ₹8,499 it's ~₹2,600 cheaper than the closest Canon/Epson ink-tank. Trade-off: **USB-only (no Wi-Fi)**, no LCD, no auto-duplex. But the page yields are remarkable for the price.

**Key specs at a glance.** 16 IPM black / 9 IPM colour (fastest in its price band). 1200×6000 dpi. 4-ink dye (BT-D60BK black, BT-5000 CMY, ~₹349 each — cheaper per bottle than anyone else). Claimed yield: **7,500 black pages / 5,000 colour pages per bottle set**. USB only. 1-year warranty.

**Who should buy this.** Students on a tight budget. One-computer homes where the printer can live next to the laptop permanently. Small shops that print receipts + occasional colour. Anyone with a hard ₹9k ceiling who still wants ink-tank economics.

**Who should skip.** Anyone who prints from phone (no Wi-Fi = no AirPrint). Households with multiple computers. Anyone who wants modern features (the design is visibly old).

**What you give up.** Wi-Fi, Wi-Fi Direct, AirPrint, auto-duplex, LCD. Colour output is competent but not as saturated as Canon/Epson dye.

**Bangalore-specific note.** Brother has only **one authorised service centre** in Bangalore (near MG Road) — much thinner than Canon/Epson/HP. For ₹8,499 that's acceptable, but budget for a possible courier service if there's a warranty issue. Brother ink bottles are available on Amazon and at specialty stores; less ubiquitous than Canon/Epson.`,
    verdict: 'budget',
  },
  {
    slug: 'canon-pixma-e4570',
    brand: 'Canon',
    model: 'PIXMA E4570',
    category: 'cartridge',
    image: '/printers/canon-e4570.svg',
    mrp: 10495,
    retailers: {
      amazon: { id: 'B09F5Z694W', url: 'https://www.amazon.in/dp/B09F5Z694W' },
      flipkart: { id: 'canon-e4570', url: 'https://www.flipkart.com/search?q=canon+pixma+e4570' },
    },
    features: { wifi: true, autoDuplex: true, colour: true, adf: true, borderless: true, lcd: false },
    ink: { blackPerPage: 1.80, colourPerPage: 4.50, bottleMrp: 899 },
    specs: { ppmBlack: 9, ppmColour: 4, maxMonthly: 300, warrantyYears: 1 },
    pros: [
      'Auto-duplex + ADF at low sticker',
      'Fax + voice-activated printing',
      'Wi-Fi + AirPrint',
    ],
    cons: [
      'Cartridge ink — ruinous at 100+ colour pages/month',
      'By month 6 it costs more than an ink-tank printer',
      'Low page yield per cartridge',
    ],
    bestFor: 'Very low volume (<20 pages/month) households only.',
    writeup: `**Canon PIXMA E4570** — the cartridge trap that looks cheap and costs the most.

**What it is.** A cartridge-based 4-in-1 (print/scan/copy/fax) with a tempting "under ₹11k" sticker, Wi-Fi, auto-duplex, and ADF. On paper it ticks every feature box. In practice, **cartridge ink ruins the economics** for anyone who prints more than ~20 pages/month.

**Key specs at a glance.** 9 IPM black / 4 IPM colour. Cartridges: PG-47 / PG-47XL (black, ~₹899) and CL-57 / CL-57S (colour, ~₹1,400). Claimed yield: 400 black / 180 colour per XL cartridge. Real cost: **₹1.80 per B&W page / ₹4.50 per colour page** — that's 20× the ink-tank cost. Wi-Fi + AirPrint + ADF + auto-duplex. 1-year warranty.

**Who should buy this.** Households printing genuinely **under 20 pages per month** who want ADF and fax. Home offices with occasional legal forms. That's it — a niche case.

**Who should skip.** Everyone else. At 100 pages/month, Year 1 costs **~₹16,000** (printer + ink + paper) — more than Canon G3770's ~₹17,400, and you get a feature-superior printer. By Year 2 the G3770 wins by ~₹7,000. By Year 3, ~₹14,000. This is the single worst printer purchase decision Indian buyers make.

**What you give up — vs an ink-tank — over 3 years.** Roughly **₹12,000 in excess ink spend** at 100 pages/mo. Plus cartridge printers tend to die at year 2-3 from dried-out heads if idle.

**Bangalore-specific note.** Canon service is fine here, but that doesn't fix the underlying economics. The ADF + fax features are the only genuine reasons to buy; if you don't need those specific things, any ink-tank above will save you money.`,
    verdict: 'avoid',
  },
  {
    slug: 'canon-pixma-g3010',
    brand: 'Canon',
    model: 'PIXMA G3010',
    category: 'ink-tank',
    image: '/printers/canon-g3010.svg',
    mrp: 13199,
    retailers: {
      amazon: { id: 'B07B4KDTHP', url: 'https://www.amazon.in/dp/B07B4KDTHP' },
      flipkart: { id: 'canon-g3010', url: 'https://www.flipkart.com/search?q=canon+pixma+g3010' },
    },
    features: { wifi: true, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: false },
    ink: { blackPerPage: 0.08, colourPerPage: 0.21, bottleMrp: 499 },
    specs: { ppmBlack: 9, ppmColour: 5, maxMonthly: 700, warrantyYears: 2 },
    pros: [
      'Same ink economy as G3020',
      'Long-proven reliability (older model)',
      'Wi-Fi + Wi-Fi Direct',
    ],
    cons: [
      'Older model — G3020 is the newer equivalent',
      'No auto-duplex',
    ],
    bestFor: 'Availability fallback if G3020 is out of stock.',
    writeup: `**Canon PIXMA G3010** — the older G-series model, still sold, mostly as a stock fallback.

**What it is.** 2018 predecessor to the G3020, still in production. Same ink system (GI-71), same Wi-Fi, almost identical everyday behaviour. The differences are subtle: slightly older UI, slightly older wireless chip, slightly different chassis plastics.

**Key specs at a glance.** Effectively matches G3020: 9 IPM black / 5 IPM colour, same dye ink, same ~₹0.21 colour/page, Wi-Fi + Wi-Fi Direct. No LCD, no auto-duplex. 2-year warranty with registration.

**Who should buy this.** Only if the G3020 is out of stock and you need a printer today. Otherwise the G3020 is strictly better for ~the same money.

**Who should skip.** Everyone else — pick G3020.

**What you give up.** Same feature gaps as G3020 (no LCD, no auto-duplex) plus you're buying a 2018-generation product in 2026.

**Bangalore-specific note.** Canon service network handles both G-series the same. If your local Croma or Reliance Digital only has G3010, it's fine to buy — you're not getting scammed. But on Amazon/Flipkart the G3020 is usually in stock, so default to that.`,
  },
  {
    slug: 'epson-ecotank-l3260',
    brand: 'Epson',
    model: 'EcoTank L3260',
    category: 'ink-tank',
    image: '/printers/epson-l3260.svg',
    mrp: 18999,
    retailers: {
      flipkart: { id: 'epson-l3260', url: 'https://www.flipkart.com/search?q=epson+l3260' },
    },
    features: { wifi: true, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: true },
    ink: { blackPerPage: 0.09, colourPerPage: 0.33, bottleMrp: 529 },
    specs: { ppmBlack: 10, ppmColour: 5, maxMonthly: 800, warrantyYears: 2 },
    pros: [
      'Adds 1.44" LCD to the L3250 formula',
      'Better setup UX than L3250',
    ],
    cons: [
      'No auto-duplex at ₹19k — poor value',
      'Pricier than feature-equivalent Canon G3770',
    ],
    bestFor: 'Epson fans who need LCD but not auto-duplex.',
    writeup: `**Epson EcoTank L3260** — the L3250 plus a small LCD, for ₹5,000 more. Hard to justify.

**What it is.** A 3-in-1 ink-tank that adds a 1.44" colour LCD + slightly more polished on-device setup UX to the L3250 formula. Same printhead, same dye ink, same 003 bottles, same speeds, same no-auto-duplex.

**Key specs at a glance.** Same as L3250: 10 IPM black / 5 IPM colour, ~7,500 colour pages per 003 bottle set, Wi-Fi + Wi-Fi Direct + AirPrint. Extra: small colour LCD for menu navigation. Monthly volume: 800 pages.

**Who should buy this.** Epson loyalists with a weak home Wi-Fi who want to type the router password on the printer's LCD instead of via the Smart Panel app. Grandparent-friendly installs where app-based setup would be intimidating.

**Who should skip.** Almost everyone. At ₹18,999 it's ₹3,000 more than the **Canon G3770 which has LCD + auto-duplex + Wi-Fi** — strictly better value. The only reason to pick L3260 is ecosystem attachment.

**What you give up.** No auto-duplex at ₹19k is the deal-breaker — every competitor in this price bracket includes it.

**Bangalore-specific note.** Limited retail availability in Bangalore — you'll find it on Flipkart / direct Epson store more easily than Croma. Service network identical to L3250.`,
  },
  {
    slug: 'hp-smart-tank-580',
    brand: 'HP',
    model: 'Smart Tank 580',
    category: 'ink-tank',
    image: '/printers/hp-st580.svg',
    mrp: 14599,
    retailers: {
      amazon: { id: 'B0BNV9QP8J', url: 'https://www.amazon.in/dp/B0BNV9QP8J' },
      flipkart: { id: 'hp-st580', url: 'https://www.flipkart.com/search?q=hp+smart+tank+580' },
    },
    features: { wifi: true, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: false },
    ink: { blackPerPage: 0.10, colourPerPage: 0.30, bottleMrp: 599 },
    specs: { ppmBlack: 11, ppmColour: 5, maxMonthly: 700, warrantyYears: 1 },
    pros: [
      'Voice-activated printing (Alexa)',
      'HP Smart app',
      '8,000 pages of black ink in the box',
    ],
    cons: [
      'No auto-duplex',
      'Priced similarly to 585 but with fewer features',
    ],
    bestFor: 'HP ecosystem fans who want Alexa printing.',
    writeup: `**HP Smart Tank 580** — the 585 minus auto-duplex, for ₹100 more. Counter-intuitive pricing.

**What it is.** Ink-tank 3-in-1, same pigment-black + dye-colour formula as the 585. Key difference: **no auto-duplex** on the 580. Why it exists at all is an HP SKU mystery — the 585 is ₹100 cheaper at MRP and has more features.

**Key specs at a glance.** 11 IPM black / 5 IPM colour (slightly slower than 585). Same GT53/GT52 bottles. **8,000 pages of black ink in the box** — slightly more than 585. HP Smart app, Wi-Fi, AirPrint, Alexa voice-print. 1-year warranty.

**Who should buy this.** Basically nobody — the 585 is ₹100 cheaper with more features. The only scenario: if the 580 has a steeper discount than 585 during a specific sale.

**Who should skip.** Everyone else. Pick 585 by default.

**What you give up vs 585.** Auto-duplex (the main reason people buy Smart Tank over Canon G3020).

**Bangalore-specific note.** Same HP service network as 585. Ink availability identical. Just watch Amazon/Flipkart pricing — if 585 is cheaper (usually is), skip this one.`,
  },
  {
    slug: 'hp-smart-tank-589',
    brand: 'HP',
    model: 'Smart Tank 589',
    category: 'ink-tank',
    image: '/printers/hp-st589.svg',
    mrp: 16937,
    retailers: {
      amazon: { id: 'B0BN1XT6TF', url: 'https://www.amazon.in/dp/B0BN1XT6TF' },
      flipkart: { id: 'hp-st589', url: 'https://www.flipkart.com/search?q=hp+smart+tank+589' },
    },
    features: { wifi: true, autoDuplex: false, colour: true, adf: false, borderless: true, lcd: true },
    ink: { blackPerPage: 0.10, colourPerPage: 0.30, bottleMrp: 599 },
    specs: { ppmBlack: 12, ppmColour: 5, maxMonthly: 800, warrantyYears: 1 },
    pros: [
      'Has LCD',
      'Slightly faster than 585',
    ],
    cons: [
      'No auto-duplex despite the price',
      'Poor value vs Canon G3770',
    ],
    bestFor: 'HP loyalists who want LCD but can skip duplex.',
    writeup: `**HP Smart Tank 589** — the LCD-equipped Smart Tank, at a price that doesn't make sense.

**What it is.** Same pigment-black + dye-colour Smart Tank formula as 585/580. Adds a 1.44" LCD. But **still no auto-duplex at ₹16,937**.

**Key specs at a glance.** 12 IPM black / 5 IPM colour. LCD for setup UX. GT53/GT52 ink, ~₹0.30 colour/page. Wi-Fi + AirPrint + Alexa + HP Smart app. 1-year warranty.

**Who should buy this.** HP loyalists who genuinely hate using apps for printer setup — the LCD lets you enter Wi-Fi credentials on the printer itself. A very narrow persona.

**Who should skip.** Almost everyone. At ₹16,937 the **Canon G3770 at ~₹13,500 has auto-duplex + LCD + Wi-Fi and uses cheaper ink**. You pay ₹3,500 more for HP branding and one nice-to-have.

**What you give up.** Auto-duplex. The value comparison at this price is brutal.

**Bangalore-specific note.** Same HP service coverage as 580/585. If you must pick an HP Smart Tank, pick 585 (auto-duplex) and live without the LCD — the app setup is fine.`,
  },
  {
    slug: 'brother-hl-l2321d',
    brand: 'Brother',
    model: 'HL-L2321D',
    category: 'laser-mono',
    image: '/printers/brother-l2321d.svg',
    mrp: 11999,
    retailers: {
      amazon: { id: 'B07PWRS5ZG', url: 'https://www.amazon.in/dp/B07PWRS5ZG' },
      flipkart: { id: 'brother-l2321d', url: 'https://www.flipkart.com/search?q=brother+hl-l2321d' },
    },
    features: { wifi: false, autoDuplex: true, colour: false, adf: false, borderless: false, lcd: false },
    ink: { blackPerPage: 0.75, colourPerPage: 0, bottleMrp: 2999 },
    specs: { ppmBlack: 30, ppmColour: 0, maxMonthly: 10000, warrantyYears: 1 },
    pros: [
      'Fastest text printing (30 PPM)',
      'Auto-duplex included',
      'Very cheap per page if only B&W',
    ],
    cons: [
      'No colour — kills the "kids\' photos" use case',
      'No Wi-Fi',
      'Toner cartridges pricier upfront',
    ],
    bestFor: 'Pure text document users, no colour needs.',
    writeup: `**Brother HL-L2321D** — the fast, sharp, B&W-only laser that crushes text but can't do photos.

**What it is.** A single-function mono laser printer (prints only — no scan, no copy). Uses toner cartridges instead of liquid ink, so it fuses powder onto paper with heat. Output is razor-sharp, fast, and water-resistant. **Auto-duplex is included** — rare at this price.

**Key specs at a glance.** 30 pages per minute B&W (3-4× faster than any ink-tank). 2400×600 dpi effective. Toner: TN-2365 (standard, ~2,600 pages, ~₹2,999) or TN-2345 (smaller). Monthly volume: up to 10,000 pages. Auto-duplex. **No Wi-Fi**, no colour, no scanner. 1-year warranty.

**Who should buy this.** Home offices printing 100+ B&W document pages a month. Students handing in printed assignments. Anyone whose printer's entire job is "documents, sharp, fast, cheap." Tax season warriors. Academics.

**Who should skip.** Anyone who wants colour (this does literally nothing in colour). Anyone who wants photo printing. Anyone who prints from phone (no Wi-Fi). Households with kids who'll want to print drawings.

**What you give up.** Colour. Photos. Wi-Fi. A scanner. Toner cartridges are pricier upfront than ink bottles (₹2,999 vs ₹499), though per-page it still works out to ~₹0.75/page for B&W — competitive but not ink-tank-cheap.

**Bangalore-specific note.** Brother's single service centre in Bangalore (near MG Road) is adequate for warranty claims but slower than Canon/HP. Toner cartridges widely available on Amazon and at computer shops on SP Road. **Excellent fit for a second printer** — pair it with a Canon G3020 for colour/photos and use this for fast document stacks.`,
  },
];

export function getPrinterBySlug(slug: string): Printer | undefined {
  return printers.find((p) => p.slug === slug);
}

export function getPrinterByAsin(asin: string): Printer | undefined {
  return printers.find((p) => p.retailers.amazon?.id === asin);
}
