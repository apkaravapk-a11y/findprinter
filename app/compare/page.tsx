import Link from 'next/link';
import { getPrinterBySlug } from '@/lib/printers';
import { calculateTCO, formatInr } from '@/lib/tco';

export default async function Compare({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const sp = await searchParams;
  const slugs = sp.p ? sp.p.split(',').slice(0, 3) : [];
  const models = slugs.map((s) => getPrinterBySlug(s)).filter(Boolean) as NonNullable<
    ReturnType<typeof getPrinterBySlug>
  >[];

  if (models.length === 0) {
    return (
      <div className="brut-card p-8 text-center max-w-xl mx-auto">
        <div className="text-5xl mb-3">⚖️</div>
        <h1 className="text-2xl font-black mb-2">Nothing to compare yet</h1>
        <p className="text-ink/70 mb-5">
          Go to Browse, then add 2–3 printers to compare side-by-side.
        </p>
        <Link href="/browse" className="brut-btn">
          Browse printers →
        </Link>
      </div>
    );
  }

  const rows: { label: string; get: (p: (typeof models)[0]) => string }[] = [
    { label: 'Brand', get: (p) => p.brand },
    { label: 'MRP', get: (p) => formatInr(p.mrp) },
    { label: 'Wi-Fi', get: (p) => (p.features.wifi ? '✓' : '—') },
    { label: 'Auto-Duplex', get: (p) => (p.features.autoDuplex ? '✓' : '—') },
    { label: 'Colour', get: (p) => (p.features.colour ? '✓' : '—') },
    { label: 'LCD', get: (p) => (p.features.lcd ? '✓' : '—') },
    {
      label: 'Colour ₹/page',
      get: (p) => `₹${p.ink.colourPerPage}`,
    },
    {
      label: 'B&W ₹/page',
      get: (p) => `₹${p.ink.blackPerPage}`,
    },
    { label: 'Black IPM', get: (p) => `${p.specs.ppmBlack}` },
    { label: 'Warranty', get: (p) => `${p.specs.warrantyYears} yr` },
    {
      label: '3-yr TCO (100pg/mo, 70% colour)',
      get: (p) =>
        formatInr(
          calculateTCO(p, { monthlyPages: 100, colourPercent: 70, years: 3 })
            .threeYearTotal
        ),
    },
  ];

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl md:text-4xl font-black">
          Compare {models.length} printers
        </h1>
        <p className="text-ink/70 mt-1">
          Side-by-side specs and 3-year cost at standard volume.
        </p>
      </header>

      <div className="brut-card p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[3px] border-ink">
              <th className="text-left p-3 font-extrabold bg-ash">Feature</th>
              {models.map((m) => (
                <th key={m.slug} className="text-left p-3 font-extrabold bg-white">
                  <div className="text-[10px] uppercase tracking-widest text-ink/60">
                    {m.brand}
                  </div>
                  <Link
                    href={`/printer/${m.slug}`}
                    className="underline decoration-[3px] decoration-sun underline-offset-4"
                  >
                    {m.model}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.label}
                className={`border-b-[2px] border-ink/10 ${i % 2 ? 'bg-white' : 'bg-cream/60'}`}
              >
                <td className="p-3 font-bold text-ink/80">{r.label}</td>
                {models.map((m) => (
                  <td key={m.slug} className="p-3 font-extrabold">
                    {r.get(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Link href="/browse" className="brut-btn-ghost">
          Browse more →
        </Link>
      </div>
    </div>
  );
}
