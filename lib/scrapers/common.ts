export type PriceResult = {
  retailer: 'amazon' | 'flipkart' | 'croma';
  price: number | null;
  mrp?: number | null;
  url: string;
  inStock?: boolean;
  error?: string;
};

export const INDIA_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept':
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-IN,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  'Upgrade-Insecure-Requests': '1',
};

export function parseInrNumber(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const m = raw.replace(/\s+/g, '').match(/[\d,]+(?:\.\d+)?/);
  if (!m) return null;
  const n = parseFloat(m[0].replace(/,/g, ''));
  return Number.isFinite(n) ? Math.round(n) : null;
}

export async function fetchWithTimeout(
  url: string,
  opts: RequestInit = {},
  timeoutMs = 7000
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}
