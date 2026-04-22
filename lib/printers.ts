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
  },
];

export function getPrinterBySlug(slug: string): Printer | undefined {
  return printers.find((p) => p.slug === slug);
}

export function getPrinterByAsin(asin: string): Printer | undefined {
  return printers.find((p) => p.retailers.amazon?.id === asin);
}
