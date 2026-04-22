import { printers } from '@/lib/printers';
import { PrinterCard } from '@/components/PrinterCard';
import { FilterSidebar } from '@/components/FilterSidebar';

type SP = {
  brand?: string;
  wifi?: string;
  duplex?: string;
  colour?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  matches?: string;
};

export default async function Browse({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  const highlightSlugs = sp.matches ? sp.matches.split(',') : [];

  let list = printers.slice();

  if (sp.brand) list = list.filter((p) => p.brand === sp.brand);
  if (sp.wifi === '1') list = list.filter((p) => p.features.wifi);
  if (sp.duplex === '1') list = list.filter((p) => p.features.autoDuplex);
  if (sp.colour === '1') list = list.filter((p) => p.features.colour);
  if (sp.category) list = list.filter((p) => p.category === sp.category);
  if (sp.minPrice) {
    const min = parseInt(sp.minPrice);
    if (!Number.isNaN(min)) list = list.filter((p) => p.mrp >= min);
  }
  if (sp.maxPrice) {
    const max = parseInt(sp.maxPrice);
    if (!Number.isNaN(max)) list = list.filter((p) => p.mrp <= max);
  }

  // If matches from quiz, reorder so matches appear first
  if (highlightSlugs.length > 0) {
    list = [
      ...highlightSlugs
        .map((s) => printers.find((p) => p.slug === s))
        .filter(Boolean) as typeof printers,
      ...list.filter((p) => !highlightSlugs.includes(p.slug)),
    ];
  }

  return (
    <div className="space-y-5">
      <header>
        {highlightSlugs.length > 0 ? (
          <div className="brut-card p-4 bg-sun mb-4">
            <div className="font-extrabold">🎯 Your top matches from the quiz</div>
            <div className="text-sm text-ink/70 mt-0.5">
              Highlighted below. Scroll for the full catalog.
            </div>
          </div>
        ) : null}
        <h1 className="text-3xl md:text-4xl font-black">
          {list.length === printers.length
            ? 'All printers'
            : `${list.length} of ${printers.length} printers`}
        </h1>
        <p className="text-ink/70 mt-1">
          Tap any card to see live prices, TCO and pros/cons.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5">
        <FilterSidebar filters={sp} />

        <div>
          {list.length === 0 ? (
            <div className="brut-card p-10 text-center">
              <div className="text-5xl mb-2">🤷</div>
              <div className="font-extrabold">No matches</div>
              <div className="text-sm text-ink/60 mt-1">
                Loosen your filters or clear them and start over.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((p) => (
                <PrinterCard
                  key={p.slug}
                  printer={p}
                  highlighted={highlightSlugs.includes(p.slug)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
