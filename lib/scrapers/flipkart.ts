import * as cheerio from 'cheerio';
import { fetchWithTimeout, INDIA_HEADERS, parseInrNumber, type PriceResult } from './common';

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

    // Flipkart price selectors (multiple fallbacks — they change often)
    const priceRaw =
      $('div.Nx9bqj.CxhGGd').first().text() ||
      $('div._30jeq3._16Jk6d').first().text() ||
      $('div._30jeq3').first().text() ||
      $('[class*="price"]').first().text();

    const mrpRaw =
      $('div.yRaY8j').first().text() ||
      $('div._3I9_wc._2p6lqe').first().text();

    const price = parseInrNumber(priceRaw);
    const mrp = parseInrNumber(mrpRaw);

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
