import * as cheerio from 'cheerio';
import { fetchWithTimeout, INDIA_HEADERS, parseInrNumber, type PriceResult } from './common';

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

    // Primary selectors
    const priceRaw =
      $('#priceblock_ourprice').first().text() ||
      $('#priceblock_dealprice').first().text() ||
      $('.a-price .a-offscreen').first().text() ||
      $('span.a-price-whole').first().text();

    const mrpRaw =
      $('.a-price.a-text-price .a-offscreen').first().text() ||
      $('.basisPrice .a-offscreen').first().text();

    const price = parseInrNumber(priceRaw);
    const mrp = parseInrNumber(mrpRaw);

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
