import * as cheerio from 'cheerio';
import { fetchWithTimeout, INDIA_HEADERS, parseInrNumber, type PriceResult } from './common';

// Minimum plausible one-time printer price in INR. Any scraped value below this
// is almost certainly an EMI per-month figure, an ink bottle price, or a
// "save ₹X" discount tag — reject it and fall through to the next selector.
const MIN_PLAUSIBLE_INR = 1500;

type CheerioApi = ReturnType<typeof cheerio.load>;
// Use `any` for element refs — cheerio's type export moved between versions and
// we only read attrs/walk parents, which is duck-typed.
type CheerioEl = any;

/** Walk parents looking for an EMI/subscription/discount container. */
function isInsideEmiOrDiscount($: CheerioApi, el: CheerioEl): boolean {
  let cur: CheerioEl = el;
  for (let i = 0; cur && i < 8; i++) {
    const $cur = $(cur);
    const id = ($cur.attr('id') || '').toLowerCase();
    const cls = ($cur.attr('class') || '').toLowerCase();
    const label = ($cur.attr('aria-label') || '').toLowerCase();

    if (id.includes('emi') || id.includes('einstein') || cls.includes('emi') || label.includes('emi')) {
      return true;
    }
    // a-text-price = struck-through list / MRP, not the offer price we want
    if (cls.includes('a-text-price') && !cls.includes('apex-price-to-pay')) {
      return true;
    }
    // saving-percentage pill that sometimes wraps a ₹ string
    if (cls.includes('savingsprice') || cls.includes('savings')) {
      return true;
    }
    cur = (cur.parent ?? null) as CheerioEl;
  }
  return false;
}

function extractPriceFromScope($: CheerioApi, scope: any): number | null {
  const candidates = scope.find('.a-price .a-offscreen, span.a-price-whole').toArray();
  for (const el of candidates) {
    if (isInsideEmiOrDiscount($, el)) continue;
    const txt = $(el).text();
    const n = parseInrNumber(txt);
    if (n !== null && n >= MIN_PLAUSIBLE_INR) return n;
  }
  return null;
}

export async function scrapeAmazon(asin: string): Promise<PriceResult> {
  const url = `https://www.amazon.in/dp/${asin}`;
  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        ...INDIA_HEADERS,
        Cookie: 'i18n-prefs=INR; lc-acbin=en_IN',
      },
    });

    if (!res.ok) {
      return { retailer: 'amazon', price: null, url, error: `HTTP ${res.status}` };
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Scoped selector chain: look inside Amazon's "real" price containers first,
    // and only those. We intentionally avoid `.a-price .a-offscreen` site-wide
    // because it matches the EMI-per-month widget + list-price strikethrough.
    const scopedSelectors = [
      '#corePrice_feature_div',
      '#corePriceDisplay_desktop_feature_div',
      '#apex_desktop',
      '#apex_desktop_newAccordionRow',
      '.priceToPay',
      '.apexPriceToPay',
    ];

    let price: number | null = null;
    for (const sel of scopedSelectors) {
      const scope = $(sel).first();
      if (scope.length === 0) continue;
      price = extractPriceFromScope($, scope);
      if (price !== null) break;
    }

    // Absolute last-resort fallback: scan all .a-price.a-offscreen with guard.
    if (price === null) {
      const all = $('.a-price .a-offscreen, #priceblock_ourprice, #priceblock_dealprice').toArray();
      for (const el of all) {
        if (isInsideEmiOrDiscount($, el)) continue;
        const n = parseInrNumber($(el).text());
        if (n !== null && n >= MIN_PLAUSIBLE_INR) {
          price = n;
          break;
        }
      }
    }

    // Struck-through list price (MRP) — useful to show as "was ₹X"
    let mrp: number | null = null;
    const mrpEls = $('.a-price.a-text-price .a-offscreen, .basisPrice .a-offscreen').toArray();
    for (const el of mrpEls) {
      const n = parseInrNumber($(el).text());
      if (n !== null && n >= MIN_PLAUSIBLE_INR) {
        mrp = n;
        break;
      }
    }

    const inStock = !/currently unavailable/i.test(html);

    return {
      retailer: 'amazon',
      price,
      mrp,
      url,
      inStock,
      error: price === null ? 'Price selector no match' : undefined,
    };
  } catch (e: any) {
    return {
      retailer: 'amazon',
      price: null,
      url,
      error: e?.message ?? 'fetch failed',
    };
  }
}
