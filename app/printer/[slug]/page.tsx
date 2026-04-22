import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPrinterBySlug, printers } from '@/lib/printers';
import { calculateTCO, formatInr } from '@/lib/tco';
import { LivePriceBlock } from '@/components/LivePriceBlock';
import { LocationDeliveryBlock } from '@/components/LocationDeliveryBlock';

export function generateStaticParams() {
  return printers.map((p) => ({ slug: p.slug }));
}

export default async function PrinterDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const printer = getPrinterBySlug(slug);
  if (!printer) notFound();

  // Default TCO assumption: 100 pages/month, 70% colour
  const tco = calculateTCO(printer, {
    monthlyPages: 100,
    colourPercent: 70,
    years: 3,
  });

  return (
    <div className="space-y-5">
      <Link
        href="/browse"
        className="inline-block text-sm font-bold underline decoration-[3px] decoration-sun underline-offset-4"
      >
        ← Back to all printers
      </Link>

      {/* Header */}
      <header className="brut-card p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-ink/60">
              {printer.brand} · {printer.category.replace('-', ' ')}
            </div>
            <h1 className="text-3xl md:text-4xl font-black mt-1">
              {printer.model}
            </h1>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {printer.features.wifi && <span className="brut-chip bg-sky">Wi-Fi</span>}
              {printer.features.autoDuplex && (
                <span className="brut-chip bg-leaf">Auto-Duplex</span>
              )}
              {printer.features.colour && <span className="brut-chip bg-rose">Colour</span>}
              {printer.features.lcd && <span className="brut-chip bg-ash">LCD</span>}
              {printer.features.adf && <span className="brut-chip bg-ash">ADF</span>}
              {printer.features.borderless && (
                <span className="brut-chip bg-ash">Borderless</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-ink/60 font-bold">MRP</div>
            <div className="text-3xl md:text-4xl font-black">
              {formatInr(printer.mrp)}
            </div>
          </div>
        </div>
        <div className="mt-4 text-ink/80 leading-relaxed">
          <strong>Best for:</strong> {printer.bestFor}
        </div>
      </header>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Live prices */}
        {printer.retailers.amazon?.id ? (
          <LivePriceBlock asin={printer.retailers.amazon.id} />
        ) : (
          <div className="brut-card p-4 bg-sky">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70">
              Live prices
            </div>
            <div className="text-sm text-ink/70 mt-2">
              Not indexed on Amazon.in. Check Flipkart / Croma directly.
            </div>
          </div>
        )}

        {/* TCO */}
        <div className="brut-card p-4 bg-leaf">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70">
            3-year total cost
          </div>
          <div className="text-[10px] text-ink/60 mt-0.5">
            Assumes 100 pages/mo, 70% colour
          </div>
          <div className="text-3xl font-black mt-2">{formatInr(tco.threeYearTotal)}</div>
          <div className="mt-3 space-y-1 text-sm">
            <Row l="Year 1 total" r={formatInr(tco.yearOneTotal)} />
            <Row l="Ink per year" r={formatInr(tco.inkCostPerYear)} />
            <Row l="Effective ₹/page" r={`₹${tco.costPerPageEffective}`} />
          </div>
        </div>

        {/* Ink cost */}
        <div className="brut-card p-4 bg-rose">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70">
            Ink economics
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <Row l="Colour ₹/page" r={`₹${printer.ink.colourPerPage}`} highlight />
            <Row l="B&W ₹/page" r={`₹${printer.ink.blackPerPage}`} />
            <Row l="Bottle MRP" r={formatInr(printer.ink.bottleMrp)} />
          </div>
        </div>

        {/* Specs */}
        <div className="brut-card p-4 bg-ash">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70">
            Specs
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <Row l="Black speed" r={`${printer.specs.ppmBlack} IPM`} />
            {printer.features.colour && (
              <Row l="Colour speed" r={`${printer.specs.ppmColour} IPM`} />
            )}
            <Row l="Monthly duty" r={`${printer.specs.maxMonthly} pg`} />
            <Row l="Warranty" r={`${printer.specs.warrantyYears} yr`} />
          </div>
        </div>
      </div>

      {/* Location + delivery */}
      <LocationDeliveryBlock />

      {/* Pros / Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="brut-card p-4 bg-leaf">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70 mb-2">
            ✓ Pros
          </div>
          <ul className="space-y-1.5 text-sm">
            {printer.pros.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-ink/60">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="brut-card p-4 bg-danger">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70 mb-2">
            ✗ Cons
          </div>
          <ul className="space-y-1.5 text-sm">
            {printer.cons.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-ink/60">✗</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buy buttons */}
      <div className="brut-card p-4">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink/70 mb-3">
          Go to store
        </div>
        <div className="flex flex-wrap gap-3">
          {printer.retailers.amazon && (
            <a
              href={printer.retailers.amazon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn"
            >
              📦 Amazon.in →
            </a>
          )}
          {printer.retailers.flipkart && (
            <a
              href={printer.retailers.flipkart.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn-ghost"
            >
              🛒 Flipkart →
            </a>
          )}
          {printer.retailers.croma && (
            <a
              href={printer.retailers.croma.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn-ghost"
            >
              🏬 Croma →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ l, r, highlight }: { l: string; r: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-ink/70">{l}</span>
      <span className={`font-extrabold ${highlight ? 'text-lg' : ''}`}>{r}</span>
    </div>
  );
}
