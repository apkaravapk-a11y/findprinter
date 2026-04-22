'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';

const glossary = [
  { term: 'ADF', def: 'Auto Document Feeder. Tray that feeds pages into the scanner one at a time automatically. Useful for scanning multi-page documents.' },
  { term: 'AirPrint', def: 'Apple\'s driverless printing protocol. iPhone/iPad/Mac can print to any AirPrint-compatible printer without installing software.' },
  { term: 'Borderless printing', def: 'Prints edge-to-edge with no white margin. Required for 4×6 photo prints to look professional.' },
  { term: 'Cartridge', def: 'A sealed plastic case with ink inside. Swapped every 100-300 pages. Cheap printer, expensive ink.' },
  { term: 'CMYK', def: 'The four base ink colours: Cyan, Magenta, Yellow, and Key (Black). Every printed colour is a mix of these.' },
  { term: 'Deep cleaning', def: 'An intensive printhead cleaning cycle that uses more ink than standard cleaning. Run if streaks persist after 2-3 regular cleans.' },
  { term: 'DPI', def: 'Dots Per Inch. Print resolution. 1200×1200 is fine for documents; 4800×1200 is better for photos.' },
  { term: 'Duplex', def: 'Two-sided printing. "Auto-duplex" = printer flips the paper for you. "Manual duplex" = you flip.' },
  { term: 'Duty cycle', def: 'The absolute maximum pages a printer can handle in a month before components wear out. Use "recommended monthly volume" instead — it\'s the honest number.' },
  { term: 'Dye ink', def: 'Ink with colour dissolved in water. Vibrant, fast-drying, water-soluble. Used for photos.' },
  { term: 'EcoTank', def: 'Epson\'s ink-tank printer brand. Refillable bottles instead of cartridges. ~20× cheaper per page.' },
  { term: 'Ethernet', def: 'Wired network cable connection (RJ45). Rare under ₹15k. Used for office printers.' },
  { term: 'Firmware', def: 'Software built into the printer hardware. Update via the brand\'s mobile app (Canon PRINT, Epson Smart Panel, HP Smart).' },
  { term: 'Fuser', def: 'The heated roller in a laser printer that melts toner onto paper. Laser-specific term.' },
  { term: 'GSM', def: 'Grams per Square Metre. Paper thickness. 80 GSM is standard A4 office paper; 200 GSM+ is photo paper / cardstock.' },
  { term: 'Inkjet', def: 'Printing technology that sprays tiny ink droplets onto paper. Opposite of laser.' },
  { term: 'Ink-tank', def: 'Inkjet printer with refillable ink tanks instead of cartridges. 20× cheaper per page. Dominant category in India ₹10-17k.' },
  { term: 'IPM', def: 'Images Per Minute. ISO-standardised print speed. Honest metric. Prefer this over PPM.' },
  { term: 'ISO page yield', def: 'Standardised claim of how many pages an ink bottle prints at 5% coverage. Real-world yields are usually 1/3 to 1/5 of this.' },
  { term: 'LCD', def: 'Small screen on the printer for setup and status. Optional feature that adds ~₹1,500 to price.' },
  { term: 'Laser', def: 'Printing technology using toner powder + heat. Fast, sharp text, but expensive for colour.' },
  { term: 'MegaTank', def: 'Canon\'s brand name for ink-tank printers (equivalent to Epson\'s EcoTank).' },
  { term: 'Mopria', def: 'Android\'s driverless printing protocol. Equivalent to AirPrint for iOS.' },
  { term: 'MRP', def: 'Maximum Retail Price. In India, it\'s the price on the box — but street/online prices are often 20-40% lower.' },
  { term: 'Nozzle check', def: 'Test print that reveals which printhead nozzles are clogged. Run from the printer app.' },
  { term: 'Pigment ink', def: 'Ink with tiny solid particles suspended in liquid. Water-resistant, fade-resistant, sharper text. Used for black in HP Smart Tank.' },
  { term: 'PPM', def: 'Pages Per Minute. Old inflated speed metric. Use IPM instead.' },
  { term: 'Printhead', def: 'The part of an inkjet printer that sprays ink. The most failure-prone component. Use weekly or it dries out.' },
  { term: 'Rear tray', def: 'Paper loading tray that sits at the back of the printer, visible. Most sub-₹15k printers use this.' },
  { term: 'Ream', def: 'A standard pack of 500 sheets of paper. Costs ~₹280 for 80 GSM A4.' },
  { term: 'Smart Tank', def: 'HP\'s brand name for ink-tank printers.' },
  { term: 'TCO', def: 'Total Cost of Ownership. Printer MRP + ink + paper + maintenance over 1/3/5 years. The honest way to compare printers.' },
  { term: 'Toner', def: 'The dry coloured powder used by laser printers instead of liquid ink.' },
  { term: 'Wi-Fi Direct', def: 'Printer creates its own Wi-Fi hotspot; your phone connects to it directly, no home router needed.' },
];

export default function Glossary() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return glossary;
    const q = query.toLowerCase();
    return glossary.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.def.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const item of filtered) {
      const letter = item.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <LearnLayout
      title="A–Z Printer Glossary"
      subtitle={`${glossary.length} terms, demystified. Search or scroll.`}
      current="glossary"
    >
      <div className="brut-card p-4 sticky top-20 z-10 backdrop-blur" style={{ background: 'var(--card)' }}>
        <input
          type="search"
          placeholder="🔍 Search terms (e.g., DPI, printhead, IPM)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="brut-input"
        />
        <div className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
          {filtered.length} of {glossary.length} terms {query && `matching "${query}"`}
        </div>
      </div>

      {grouped.length === 0 && (
        <div className="brut-card p-8 text-center">
          <div className="text-5xl mb-2">🤷</div>
          <div className="font-extrabold">No match for "{query}"</div>
        </div>
      )}

      {grouped.map(([letter, items]) => (
        <section key={letter}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--muted)' }}>
            {letter}
          </h2>
          <div className="space-y-2 mt-2">
            {items.map((item) => (
              <div key={item.term} className="brut-card p-3.5">
                <div className="font-black">{item.term}</div>
                <div className="text-sm mt-1">{item.def}</div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex gap-3 flex-wrap">
        <Link href="/help/faq" className="brut-btn">
          FAQ →
        </Link>
        <Link href="/learn" className="brut-btn-ghost">
          Back to Learn hub
        </Link>
      </div>
    </LearnLayout>
  );
}
