'use client';

import { useEffect, useState } from 'react';
import { formatInr } from '@/lib/tco';

type PriceEntry = {
  retailer: 'amazon' | 'flipkart' | 'croma';
  price: number | null;
  mrp?: number | null;
  url: string;
  inStock?: boolean;
  error?: string;
} | null;

type PriceResponse = {
  asin: string;
  updatedAt: number;
  fromCache: boolean;
  prices: {
    amazon: PriceEntry;
    flipkart: PriceEntry;
    croma: PriceEntry;
  };
};

const labels = {
  amazon: { name: 'Amazon.in', emoji: '📦', accent: 'bg-sun' },
  flipkart: { name: 'Flipkart', emoji: '🛒', accent: 'bg-sky' },
  croma: { name: 'Croma', emoji: '🏬', accent: 'bg-rose' },
} as const;

export function LivePriceBlock({ asin }: { asin: string }) {
  const [data, setData] = useState<PriceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  async function load() {
    setError(null);
    setData(null);
    try {
      const res = await fetch(`/api/prices/${asin}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as PriceResponse;
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to fetch prices');
    }
  }

  useEffect(() => {
    load();
  }, [asin, tick]);

  const entries = data
    ? (['amazon', 'flipkart', 'croma'] as const).map((r) => ({
        retailer: r,
        entry: data.prices[r],
      }))
    : null;

  const cheapest =
    entries
      ?.filter((e) => e.entry?.price != null)
      .sort((a, b) => (a.entry!.price! - b.entry!.price!))[0] ?? null;

  return (
    <div className="brut-card p-4 bg-sky">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70">
            Live prices
          </div>
          <div className="text-xs text-ink/60 mt-0.5">
            {data
              ? `Fetched ${formatAgo(data.updatedAt)}${data.fromCache ? ' · cached' : ''}`
              : 'Fetching Amazon, Flipkart &amp; Croma…'}
          </div>
        </div>
        <button
          onClick={() => setTick((t) => t + 1)}
          className="text-xs font-bold underline decoration-[2px] decoration-ink underline-offset-2"
          title="Refetch now"
        >
          ↻ Refresh
        </button>
      </div>

      {!data && !error && <PriceSkeleton />}
      {error && (
        <div className="text-sm text-ink/70">
          Couldn't fetch live prices. <button className="underline font-bold" onClick={() => setTick((t) => t + 1)}>Try again</button>.
        </div>
      )}

      {entries && (
        <div className="space-y-2">
          {entries.map(({ retailer, entry }) => {
            const meta = labels[retailer];
            const isCheapest =
              cheapest?.retailer === retailer && entry?.price != null;
            return (
              <a
                key={retailer}
                href={entry?.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between gap-3 p-2.5 border-[2px] border-ink rounded-lg transition-all ${
                  isCheapest ? 'bg-leaf shadow-brutSm' : 'bg-white'
                } hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-brutSm`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 ${meta.accent} border-[2px] border-ink rounded-md flex items-center justify-center text-sm`}
                  >
                    {meta.emoji}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm">{meta.name}</div>
                    {entry?.error ? (
                      <div className="text-[11px] text-ink/50">Unavailable</div>
                    ) : isCheapest ? (
                      <div className="text-[11px] text-ink/70 font-bold">💰 Cheapest right now</div>
                    ) : (
                      <div className="text-[11px] text-ink/50">View deal →</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {entry?.price != null ? (
                    <>
                      <div className="font-black text-lg">{formatInr(entry.price)}</div>
                      {entry.mrp && entry.mrp > entry.price ? (
                        <div className="text-[11px] text-ink/50 line-through">
                          {formatInr(entry.mrp)}
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="text-xs text-ink/50">—</div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PriceSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-14 border-[2px] border-ink rounded-lg bg-white/60 animate-pulse"
        />
      ))}
    </div>
  );
}

function formatAgo(ts: number): string {
  const secs = Math.floor((Date.now() - ts) / 1000);
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}
