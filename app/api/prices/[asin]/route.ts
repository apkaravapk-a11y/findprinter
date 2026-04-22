import { NextResponse } from 'next/server';
import { getPrinterByAsin } from '@/lib/printers';
import { scrapeAmazon } from '@/lib/scrapers/amazon';
import { scrapeFlipkart } from '@/lib/scrapers/flipkart';
import { scrapeCroma } from '@/lib/scrapers/croma';
import { cache } from '@/lib/cache';

export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ asin: string }> }
) {
  const { asin } = await params;
  const printer = getPrinterByAsin(asin);
  if (!printer) {
    return NextResponse.json({ error: 'Unknown ASIN' }, { status: 404 });
  }

  const cacheKey = `price:${asin}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached, fromCache: true });
  }

  const [amazon, flipkart, croma] = await Promise.allSettled([
    scrapeAmazon(asin),
    scrapeFlipkart(printer.retailers.flipkart?.url),
    scrapeCroma(printer.retailers.croma?.url),
  ]);

  const result = {
    asin,
    slug: printer.slug,
    updatedAt: Date.now(),
    fromCache: false,
    prices: {
      amazon: amazon.status === 'fulfilled' ? amazon.value : null,
      flipkart: flipkart.status === 'fulfilled' ? flipkart.value : null,
      croma: croma.status === 'fulfilled' ? croma.value : null,
    },
  };

  cache.set(cacheKey, result, 300);
  return NextResponse.json(result);
}
