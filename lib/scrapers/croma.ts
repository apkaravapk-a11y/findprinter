import * as cheerio from 'cheerio';
import { fetchWithTimeout, INDIA_HEADERS, parseInrNumber, type PriceResult } from './common';

export async function scrapeCroma(productUrl: string | undefined): Promise<PriceResult> {
  const url = productUrl ?? '';
  if (!url) {
    return { retailer: 'croma', price: null, url, error: 'No Croma URL' };
  }
  try {
    const res = await fetchWithTimeout(url, { headers: INDIA_HEADERS });
    if (!res.ok) {
      return { retailer: 'croma', price: null, url, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    const $ = cheerio.load(html);

    const priceRaw =
      $('span.pdp-price').first().text() ||
      $('span[data-testid="new-price"]').first().text() ||
      $('.amount').first().text();

    const mrpRaw =
      $('span.pdpMrp').first().text() ||
      $('span.mrpPrice').first().text();

    const price = parseInrNumber(priceRaw);
    const mrp = parseInrNumber(mrpRaw);

    return {
      retailer: 'croma',
      price,
      mrp,
      url,
      error: price === null ? 'Price selector no match' : undefined,
    };
  } catch (e: any) {
    return {
      retailer: 'croma',
      price: null,
      url,
      error: e?.message ?? 'fetch failed',
    };
  }
}
