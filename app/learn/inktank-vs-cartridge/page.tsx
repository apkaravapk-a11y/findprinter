import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';

export const metadata = { title: 'Ink-tank vs Cartridge — PrinterPick IN' };

export default function InktankVsCartridge() {
  return (
    <LearnLayout
      title="Ink-tank vs Cartridge — the only comparison that matters"
      subtitle="If you only read one Learn page, make it this one. This single decision will save or cost you thousands of rupees."
      current="inktank-vs-cartridge"
    >
      <div className="brut-card p-5" style={{ background: 'var(--sun)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest">🎯 One-line answer</div>
        <p className="font-bold mt-1 text-lg leading-snug">
          If you print more than 20 pages a month: <strong>buy ink-tank</strong>. The higher sticker price pays itself back in ink savings within 3–6 months.
        </p>
      </div>

      {/* Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="brut-card p-5" style={{ background: 'var(--danger)' }}>
          <div className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Cartridge
          </div>
          <h3 className="text-xl font-black mt-1">Sealed ink cartridges</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>💸 Printer: <strong>₹3,500 – ₹10,500</strong></li>
            <li>🖨️ Colour ₹/page: <strong>~₹4.50</strong></li>
            <li>⚫ B&W ₹/page: <strong>~₹1.80</strong></li>
            <li>📦 Cartridge yield: 180–400 pages</li>
            <li>🔄 Replace: every 1–3 months at normal use</li>
          </ul>
        </div>
        <div className="brut-card p-5" style={{ background: 'var(--leaf)' }}>
          <div className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Ink-Tank ⭐
          </div>
          <h3 className="text-xl font-black mt-1">Refillable bottles</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>💸 Printer: <strong>₹8,500 – ₹17,000</strong></li>
            <li>🖨️ Colour ₹/page: <strong>~₹0.21 – ₹0.33</strong></li>
            <li>⚫ B&W ₹/page: <strong>~₹0.08 – ₹0.15</strong></li>
            <li>📦 Bottle yield: 6,000–7,700 pages</li>
            <li>🔄 Refill: every 6–12 months</li>
          </ul>
        </div>
      </div>

      {/* The math */}
      <div className="brut-card p-6">
        <h2 className="text-2xl font-black">The math: 100 pages a month, 70% colour</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Typical Indian household. 840 colour pages + 360 B&W pages in a year.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--ash)' }}>
                <th className="p-3 text-left font-extrabold border-b-[3px]" style={{ borderColor: 'var(--ink)' }}>
                  Expense
                </th>
                <th className="p-3 text-right font-extrabold border-b-[3px]" style={{ borderColor: 'var(--ink)' }}>
                  Cartridge (Canon E4570)
                </th>
                <th className="p-3 text-right font-extrabold border-b-[3px]" style={{ borderColor: 'var(--ink)' }}>
                  Ink-Tank (Canon G3770)
                </th>
              </tr>
            </thead>
            <tbody>
              <Row label="Printer MRP" cart="₹10,495" tank="₹15,990" />
              <Row label="Colour ink / year (840 × ₹/pg)" cart="₹3,780" tank="₹210" />
              <Row label="B&W ink / year (360 × ₹/pg)" cart="₹648" tank="₹47" />
              <Row label="Paper / year" cart="₹840" tank="₹840" />
              <Row label="Misc (power, maintenance)" cart="₹300" tank="₹300" />
              <tr style={{ background: 'var(--sun)' }}>
                <td className="p-3 font-extrabold border-t-[3px]" style={{ borderColor: 'var(--ink)' }}>
                  Year 1 total
                </td>
                <td className="p-3 text-right font-extrabold border-t-[3px]" style={{ borderColor: 'var(--ink)' }}>
                  ₹16,063
                </td>
                <td className="p-3 text-right font-black border-t-[3px]" style={{ borderColor: 'var(--ink)' }}>
                  ₹17,387
                </td>
              </tr>
              <tr style={{ background: 'var(--leaf)' }}>
                <td className="p-3 font-extrabold">3-year total</td>
                <td className="p-3 text-right font-extrabold">₹27,159</td>
                <td className="p-3 text-right font-black">₹19,781</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="brut-card-sm p-3 mt-4" style={{ background: 'var(--leaf)' }}>
          <div className="font-extrabold">💰 3-year savings with ink-tank: ₹7,378</div>
          <div className="text-sm mt-0.5">
            That's despite the ink-tank printer costing ₹5,495 more upfront. By year 5, savings exceed ₹15,000.
          </div>
        </div>
      </div>

      {/* Crossover visualization */}
      <div className="brut-card p-6">
        <h2 className="text-2xl font-black">When does the math flip?</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          "Cartridge is cheaper upfront" — true for exactly how long?
        </p>

        <div className="mt-5 space-y-2">
          {[
            { m: 'Month 1', cart: 10495 + 370, tank: 15990 + 21, w: 'cart' },
            { m: 'Month 3', cart: 10495 + 1110, tank: 15990 + 64, w: 'cart' },
            { m: 'Month 6', cart: 10495 + 2220, tank: 15990 + 128, w: 'cart' },
            { m: 'Month 12', cart: 16063, tank: 16181, w: 'cross' },
            { m: 'Month 18', cart: 19603, tank: 16272, w: 'tank' },
            { m: 'Month 24', cart: 23200, tank: 16363, w: 'tank' },
            { m: 'Month 36', cart: 27159, tank: 19781, w: 'tank' },
          ].map((p) => (
            <div key={p.m} className="grid grid-cols-[80px_1fr_100px] gap-2 items-center text-sm">
              <div className="font-bold">{p.m}</div>
              <div className="flex gap-1 items-center">
                <div
                  className="h-6 border-2 rounded-md flex items-center px-2 text-xs font-bold"
                  style={{
                    width: `${(p.cart / 30000) * 100}%`,
                    background: 'var(--rose)',
                    borderColor: 'var(--ink)',
                    minWidth: '60px',
                  }}
                >
                  Cart ₹{p.cart.toLocaleString('en-IN')}
                </div>
              </div>
              <div></div>
              <div></div>
              <div className="flex gap-1 items-center">
                <div
                  className="h-6 border-2 rounded-md flex items-center px-2 text-xs font-bold"
                  style={{
                    width: `${(p.tank / 30000) * 100}%`,
                    background: p.w === 'tank' ? 'var(--leaf)' : 'var(--sky)',
                    borderColor: 'var(--ink)',
                    minWidth: '60px',
                  }}
                >
                  Tank ₹{p.tank.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-xs font-bold text-right">
                {p.w === 'cart' && '💸 Cart ahead'}
                {p.w === 'cross' && '🔀 Crossover!'}
                {p.w === 'tank' && '✅ Tank wins'}
              </div>
            </div>
          ))}
        </div>

        <div className="brut-card-sm p-3 mt-5" style={{ background: 'var(--sun)' }}>
          <div className="font-extrabold">🔀 The crossover happens at month 12.</div>
          <div className="text-sm mt-0.5">
            Your cartridge printer "saved" you ₹5,500 for the first year. It costs you ₹5,500 in the second. Everything after that is pure ink-tank savings.
          </div>
        </div>
      </div>

      {/* When cartridge actually wins */}
      <div className="brut-card p-5" style={{ background: 'var(--danger)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest">⚠️ When cartridge actually wins</div>
        <p className="mt-2 text-sm">
          Cartridge only beats ink-tank if you <strong>genuinely print less than 20 pages a month</strong> AND use the printer regularly enough that cartridges don't dry out. For most Indian households with kids, school documents, or any office-from-home work, you're above 20 pages/month whether you realise it or not.
        </p>
      </div>

      {/* Common misconceptions */}
      <div className="brut-card p-6">
        <h2 className="text-2xl font-black mb-3">Myths to ignore</h2>
        <div className="space-y-3">
          <Myth
            m="Ink-tank prints are lower quality."
            r="False. Same print mechanism (piezoelectric or thermal inkjet). Colour output is identical to cartridge. Epson EcoTank uses the same printheads as their photo-graphic series."
          />
          <Myth
            m="Third-party refill ink is just as good."
            r="Very risky. Genuine ink bottles cost ₹450-550. Cheap refills (₹150) often contain particles that permanently clog the printhead. Canon and Epson explicitly void warranty on 3rd-party ink."
          />
          <Myth
            m="You have to be a tech person to fill the tanks."
            r="It takes 30 minutes, once. Each bottle has a nozzle that matches exactly one tank colour (they're keyed so you can't mix them up). Watch the manufacturer's setup video."
          />
          <Myth
            m="Ink-tank printers are only for office use."
            r="Invented for Indian home use specifically. Compact models like the Epson L3250 (35 × 34 × 18 cm) fit on any desk."
          />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link href="/learn/ink-types" className="brut-btn">
          Next: How ink actually works →
        </Link>
        <Link href="/browse?category=ink-tank" className="brut-btn-ghost">
          Browse ink-tank printers →
        </Link>
      </div>
    </LearnLayout>
  );
}

function Row({ label, cart, tank }: { label: string; cart: string; tank: string }) {
  return (
    <tr className="border-b-2" style={{ borderColor: 'var(--ash)' }}>
      <td className="p-3">{label}</td>
      <td className="p-3 text-right font-bold">{cart}</td>
      <td className="p-3 text-right font-bold">{tank}</td>
    </tr>
  );
}

function Myth({ m, r }: { m: string; r: string }) {
  return (
    <div className="brut-card-sm p-3">
      <div className="font-extrabold text-sm text-red-700">❌ "{m}"</div>
      <div className="text-sm mt-1">✓ <strong>Reality:</strong> {r}</div>
    </div>
  );
}
