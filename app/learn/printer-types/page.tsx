import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';

export const metadata = { title: 'All printer types explained — PrinterPick IN' };

export default function PrinterTypes() {
  return (
    <LearnLayout
      title="Every printer type, explained simply"
      subtitle="Seven technologies exist. You probably only care about two. Here's each one in plain English, with a real-life analogy."
      current="printer-types"
    >
      {/* Quick verdict */}
      <div className="brut-card p-5" style={{ background: 'var(--sun)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest">🎯 Quick verdict</div>
        <p className="font-bold mt-1">
          If you print at home in India in 2026: get an <strong>inkjet ink-tank</strong> printer. Everything else is a niche choice. Keep reading for the why.
        </p>
      </div>

      {/* Type 1 */}
      <Type
        n="1"
        emoji="💧"
        title="Inkjet Cartridge"
        examples="Canon PIXMA E4570, HP DeskJet 2331, Epson L130"
        price="₹3,500 – ₹10,500"
        analogy="Buying a coffee machine that only works with expensive branded pods."
      >
        <p>
          Tiny sealed ink cartridges (one black, one colour) that you swap every 100-300 pages. Cheap printer, <strong>shockingly expensive ink</strong>. A single colour cartridge costs ₹800-1,500 and prints maybe 180 pages. That's ₹4.50 per colour page.
        </p>
        <CalloutBox variant="bad">
          <strong>Why it's a trap:</strong> Retailers heavily discount the printer because they make all their money on ink refills. By month 6 of regular use, your cartridge printer has cost more than a "pricier" ink-tank alternative.
        </CalloutBox>
        <Pros
          good={['Cheap upfront (under ₹10k)', 'Compact, lightweight', 'Fine for <20 pages/month']}
          bad={['Ruinous per-page cost at any real volume', 'Cartridges dry out if unused for months', 'Low page yield per cartridge']}
        />
      </Type>

      {/* Type 2 */}
      <Type
        n="2"
        emoji="🫙"
        title="Inkjet Ink-Tank (EcoTank, MegaTank, Smart Tank)"
        examples="Canon PIXMA G3020, Epson EcoTank L3250, HP Smart Tank 585"
        price="₹8,500 – ₹17,000"
        analogy="A coffee machine where you just pour ground coffee in, refill for ₹400/year."
        recommended
      >
        <p>
          Same spray-ink technology as cartridge printers, but instead of sealed plastic cartridges you get <strong>four refillable tanks</strong> that you pour ink bottles into. One ₹450 bottle lasts ~6,000-7,500 pages. That's ~₹0.06-0.30 per page — <strong>20× cheaper than cartridge</strong>.
        </p>
        <CalloutBox variant="good">
          <strong>Why it won India:</strong> Epson invented this category specifically for Indian buyers (the "EcoTank" launch was in India in 2011) because heavy printing + hot humid climate meant cartridge printers were being thrown out after 2 years. Ink-tank printers last 5-7 years easily.
        </CalloutBox>
        <Pros
          good={[
            'Cheapest per-page cost of any technology',
            'Higher up-front printer price pays back in 4-6 months',
            'Excellent for colour photos (dye inks)',
            'Most models include Wi-Fi, many have auto-duplex',
          ]}
          bad={[
            'Must be used at least weekly — printheads clog if idle (Indian humidity is a factor)',
            'Slightly larger/heavier than cartridge models',
            'Initial setup takes ~30 minutes (fill tanks, initial charging)',
          ]}
        />
      </Type>

      {/* Type 3 */}
      <Type
        n="3"
        emoji="⚫"
        title="Laser Monochrome"
        examples="Brother HL-L2321D, HP LaserJet M1005, Canon LBP2900"
        price="₹9,000 – ₹18,000 (for home models)"
        analogy="A photocopier at the corner shop, at home."
      >
        <p>
          Uses <strong>toner powder + heat</strong> (not liquid ink) to fuse black onto paper. Lightning fast (30+ pages/minute), razor-sharp text, zero smudging. Toner cartridges last 1,500-3,000 pages. Great if you print a lot of text documents.
        </p>
        <p>
          <strong>But:</strong> no colour at this budget (colour laser starts at ₹20,000+). No photo printing. Heavy machines. Toner cartridges cost ₹2,500-4,000 each.
        </p>
        <Pros
          good={['Fastest text printing', 'Sharpest text of any technology', 'Cheapest per-page for B&W only', 'Toner never dries out (can sit idle)']}
          bad={['No colour under ₹20k', 'Bulky and heavy', 'Toner dust health concerns in poorly ventilated rooms']}
        />
      </Type>

      {/* Type 4 */}
      <Type
        n="4"
        emoji="🎨"
        title="Laser Colour"
        examples="Canon LBP660Cdw, Brother HL-L3270CDW, HP M283fdw"
        price="₹20,000 – ₹45,000+"
        analogy="An office photocopier at home. Serious business."
      >
        <p>
          Four separate toner cartridges (cyan, magenta, yellow, black). Fast and sharp for documents with a bit of colour (charts, logos). Poor for photos — laser colour never matches inkjet vibrance.
        </p>
        <CalloutBox variant="info">
          <strong>Skip at under ₹20k budget.</strong> The cheap colour lasers you'll see at discount stores are B-stock or refurbished. Not worth considering for home use.
        </CalloutBox>
      </Type>

      {/* Type 5 */}
      <Type
        n="5"
        emoji="📸"
        title="Dye-Sublimation / Photo-Dedicated"
        examples="Canon SELPHY CP1500, Epson L1800 (A3), Canon PIXMA TS series"
        price="₹8,000 – ₹25,000"
        analogy="A Polaroid, but nicer."
      >
        <p>
          Specialty printers optimized for <strong>photo quality only</strong>. Dye-sub uses a ribbon that transfers dye through heat. 6-ink PIXMA models add light cyan + light magenta for smoother skin tones. Output is gallery-grade.
        </p>
        <CalloutBox variant="bad">
          <strong>Terrible for documents.</strong> Per-photo cost is ₹15-30. They can't print text documents at any reasonable cost. Only buy if photos are 95%+ of your printing.
        </CalloutBox>
      </Type>

      {/* Type 6 */}
      <Type
        n="6"
        emoji="🧾"
        title="Thermal"
        examples="Receipt printers, shipping-label printers"
        price="₹1,500 – ₹8,000"
        analogy="A cash-register receipt machine."
      >
        <p>
          Burns dots onto heat-sensitive paper. No ink at all. Used for receipts, shipping labels, Amazon-seller / Meesho / Shopify stickers. Not A4 — typically 57mm or 80mm roll paper.
        </p>
        <p>
          <strong>Not relevant for a home printer buyer.</strong> Listed only so you know what these are when you see them online.
        </p>
      </Type>

      {/* Type 7 */}
      <Type
        n="7"
        emoji="📰"
        title="A3 / Wide-Format"
        examples="Epson L1300, Canon iX6770, HP Officejet 7740"
        price="₹19,000 – ₹60,000+"
        analogy="A normal printer that ate a bigger paper."
      >
        <p>
          Any of the above technologies, just scaled up to 11.7" × 16.5" (A3) paper instead of 8.3" × 11.7" (A4). For posters, college project charts, architectural drawings. <strong>Almost nothing worth buying under ₹19k</strong>, and they're heavy and bulky.
        </p>
      </Type>

      {/* Decision matrix */}
      <div className="brut-card p-6" style={{ background: 'var(--card)' }}>
        <h2 className="text-2xl font-black mb-3">So which do I buy?</h2>
        <div className="space-y-2">
          {[
            { q: 'Print <20 pages/month, mostly B&W', a: 'Any cheap inkjet cartridge printer is fine. Just don\'t expect it to last forever.' },
            { q: 'Print 20-500 pages/month, want colour', a: 'Inkjet ink-tank. Canon G-series, Epson EcoTank, HP Smart Tank.', recommended: true },
            { q: 'Print 50+ pages/month, B&W ONLY', a: 'Laser monochrome. Brother HL-L2321D is the usual pick.' },
            { q: 'I\'m a photographer', a: 'Dedicated 6-ink photo printer (Canon PIXMA TS series) OR an Epson L-series ink-tank with "Photo" in the name.' },
            { q: 'Office of 10+ people', a: 'Colour laser. Over ₹25k budget.' },
          ].map((row) => (
            <div key={row.q} className="brut-card-sm p-3 flex gap-3" style={row.recommended ? { background: 'var(--sun)' } : {}}>
              <div className="text-xl">{row.recommended ? '⭐' : '→'}</div>
              <div>
                <div className="font-extrabold text-sm">{row.q}</div>
                <div className="text-sm mt-0.5">{row.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next */}
      <div className="flex gap-3 flex-wrap">
        <Link href="/learn/inktank-vs-cartridge" className="brut-btn">
          Next: Ink-tank vs cartridge →
        </Link>
        <Link href="/quiz" className="brut-btn-ghost">
          Skip to: Take the quiz
        </Link>
      </div>
    </LearnLayout>
  );
}

function Type({
  n,
  emoji,
  title,
  examples,
  price,
  analogy,
  recommended,
  children,
}: {
  n: string;
  emoji: string;
  title: string;
  examples: string;
  price: string;
  analogy: string;
  recommended?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className="brut-card p-5 md:p-6 space-y-4"
      style={recommended ? { background: 'var(--leaf)' } : {}}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 flex-shrink-0 border-[2px] rounded-lg shadow-brutSm flex items-center justify-center text-2xl"
          style={{ background: 'var(--sun)', borderColor: 'var(--ink)' }}
        >
          {emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="text-xl md:text-2xl font-black">
              {n}. {title}
            </h2>
            {recommended && <span className="brut-chip" style={{ background: 'var(--sun)' }}>👈 BEST FOR MOST PEOPLE</span>}
          </div>
          <div className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            Examples: {examples} · Typical price: {price}
          </div>
        </div>
      </div>
      <div className="text-sm italic" style={{ color: 'var(--muted)' }}>
        🎬 Think of it as: {analogy}
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}

function Pros({ good, bad }: { good: string[]; bad: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="brut-card-sm p-3" style={{ background: 'var(--leaf)' }}>
        <div className="text-xs font-extrabold mb-1">✓ PROS</div>
        <ul className="space-y-1 text-sm">
          {good.map((g) => <li key={g}>• {g}</li>)}
        </ul>
      </div>
      <div className="brut-card-sm p-3" style={{ background: 'var(--danger)' }}>
        <div className="text-xs font-extrabold mb-1">✗ CONS</div>
        <ul className="space-y-1 text-sm">
          {bad.map((b) => <li key={b}>• {b}</li>)}
        </ul>
      </div>
    </div>
  );
}

function CalloutBox({ variant, children }: { variant: 'good' | 'bad' | 'info'; children: React.ReactNode }) {
  const bg = variant === 'good' ? 'var(--leaf)' : variant === 'bad' ? 'var(--danger)' : 'var(--sky)';
  return (
    <div className="brut-card-sm p-3 text-sm" style={{ background: bg }}>
      {children}
    </div>
  );
}
