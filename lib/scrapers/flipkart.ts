import * as cheerio from 'cheerio';
import { fetchWithTimeout, INDIA_HEADERS, parseInrNumber, type PriceResult } from './common';

const MIN_PLAUSIBLE_INR = 1500;

function firstPlausible($: cheerio.CheerioAPI, selectors: string[]): number | null {
  for (const sel of selectors) {
    const nodes = $(sel).toArray();
    for (const el of nodes) {
      const n = parseInrNumber($(el).text());
      if (n !== null && n >= MIN_PLAUSIBLE_INR) return n;
    }
  }
  return null;
}

export async function scrapeFlipkart(productUrl: string | undefined): Promise<PriceResult> {
  const url = productUrl ?? '';
  if (!url) {
    return { retailer: 'flipkart', price: null, url, error: 'No Flipkart URL' };
  }
  try {
    const res = await fetchWithTimeout(url, { headers: INDIA_HEADERS });
    if (!res.ok) {
      return { retailer: 'flipkart', price: null, url, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    // Flipkart price selectors (change frequently). Plausibility guard at ₹1,500
    // prevents "No Cost EMI from ₹X/month" widgets from being picked up.
    const price = firstPlausible($, [
      'div.Nx9bqj.CxhGGd',
      'div._30jeq3._16Jk6d',
      'div._30jeq3',
      'div[class*="price"]',
    ]);

    const mrp = firstPlausible($, [
      'div.yRaY8j',
      'div._3I9_wc._2p6lqe',
    ]);

    return {
      retailer: 'flipkart',
      price,
      mrp,
      url,
      error: price === null ? 'Price selector no match' : undefined,
    };
  } catch (e: any) {
    return {
      retailer: 'flipkart',
      price: null,
      url,
      error: e?.message ?? 'fetch failed',
    };
  }
}
