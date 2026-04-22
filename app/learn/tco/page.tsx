'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';
import { printers } from '@/lib/printers';
import { calculateTCO, formatInr } from '@/lib/tco';

export default function TCOExplainer() {
  const [printerSlug, setPrinterSlug] = useState('canon-pixma-g3770');
  const [pages, setPages] = useState(100);
  const [colour, setColour] = useState(70);

  const printer = printers.find((p) => p.slug === printerSlug)!;
  const tco1 = calculateTCO(printer, { monthlyPages: pages, colourPercent: colour, years: 1 });
  const tco3 = calculateTCO(printer, { monthlyPages: pages, colourPercent: colour, years: 3 });

  return (
    <LearnLayout
      title="Total Cost of Ownership (TCO) — the real math"
      subtitle="Sticker price is just the down payment. TCO shows what the printer actually costs you over 1 and 3 years."
      current="tco"
    >
      {/* Formula */}
      <section className="brut-card p-6">
        <h2 className="text-2xl font-black">The formula</h2>
        <div className="brut-card-sm p-4 mt-3 font-mono text-sm" style={{ background: 'var(--ash)' }}>
          <div>TCO = <strong>Printer MRP</strong></div>
          <div>&nbsp; + <strong>Ink cost per year</strong> × years</div>
          <div>&nbsp; + <strong>Paper cost per year</strong> × years</div>
          <div>&nbsp; + <strong>Misc</strong> (power, maintenance) × years</div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div><strong>Ink cost per year</strong> = (B&W pages × ₹/B&W page) + (Colour pages × ₹/Colour page)</div>
          <div><strong>Paper cost per year</strong> = ceil(pages ÷ 500) × ₹280 per ream</div>
          <div><strong>Misc</strong> = ₹300/year (power, cleaning sheets, surge protector amortisation)</div>
        </div>
      </section>

      {/* Live calculator */}
      <section className="brut-card p-6">
        <h2 className="text-2xl font-black">Live calculator — try your own numbers</h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="block">
            <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
              Printer
            </div>
            <select
              value={printerSlug}
              onChange={(e) => setPrinterSlug(e.target.value)}
              className="brut-input text-sm"
            >
              {printers.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.brand} {p.model}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
              Pages per month: <strong>{pages}</strong>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full"
            />
          </label>

          <label className="block">
            <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
              Colour %: <strong>{colour}%</strong>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={colour}
              onChange={(e) => setColour(parseInt(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="brut-card-sm p-4" style={{ background: 'var(--sky)' }}>
            <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Year 1 total
            </div>
            <div className="text-3xl font-black mt-1">{formatInr(tco1.yearOneTotal)}</div>
            <div className="text-xs mt-1">
              Ink: {formatInr(tco1.inkCostPerYear)} · Paper: {formatInr(tco1.paperCostPerYear)}
            </div>
          </div>
          <div className="brut-card-sm p-4" style={{ background: 'var(--leaf)' }}>
            <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              3-Year total
            </div>
            <div className="text-3xl font-black mt-1">{formatInr(tco3.threeYearTotal)}</div>
            <div className="text-xs mt-1">
              Effective cost per page: ₹{tco3.costPerPageEffective}
            </div>
          </div>
        </div>
      </section>

      <section className="brut-card p-5" style={{ background: 'var(--sun)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest">💡 Why TCO matters more than sticker</div>
        <p className="mt-1 text-sm">
          A ₹10,495 cartridge printer has a 3-year TCO of ~₹27,000. A ₹15,990 ink-tank printer has a 3-year TCO of ~₹20,000. The "expensive" printer costs ₹7,000 less over 3 years. That's the trap TCO math protects you from.
        </p>
      </section>

      <div className="flex gap-3 flex-wrap">
        <Link href="/learn/maintenance" className="brut-btn">
          Next: Maintenance →
        </Link>
      </div>
    </LearnLayout>
  );
}
