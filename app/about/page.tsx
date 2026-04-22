import Link from 'next/link';

export const metadata = { title: 'About — PrinterPick IN' };

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl md:text-5xl font-black">About PrinterPick IN</h1>
        <p className="mt-3 text-lg" style={{ color: 'var(--muted)' }}>
          We think buying a printer in India shouldn't be this confusing.
        </p>
      </header>

      <section className="brut-card p-6 space-y-4">
        <p>
          Indian printer ads optimise for sticker price. Retailers promote cartridge printers because they make all their margin on ink refills. "Best printer under ₹10,000" lists are dominated by printers that cost ₹16,000+ over the first year once you factor in ink.
        </p>
        <p>
          PrinterPick IN flips that. We rank by <strong>total cost of ownership</strong> — what a printer actually costs you over 1 and 3 years with <em>your</em> volume and colour mix. We fetch live prices from Amazon.in, Flipkart, and Croma at the moment you click, so you see the current deal, not a cached number.
        </p>
        <p>
          We don't take sponsored rankings. We don't get commissions (yet). We do have opinions — we think ink-tank beats cartridge for most people, and we'll tell you which printer we'd personally buy at your budget.
        </p>
      </section>

      <section className="brut-card p-6">
        <h2 className="text-2xl font-black">What makes a good printer recommendation?</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>💸 <strong>Total cost over 3 years</strong>, not sticker price</li>
          <li>🇮🇳 <strong>Locally available</strong> — service centres, ink bottles, warranty</li>
          <li>📦 <strong>Tested against real use cases</strong> — not marketing specs</li>
          <li>🎯 <strong>Honest trade-offs</strong> — every recommendation includes what you\'re giving up</li>
        </ul>
      </section>

      <div className="flex gap-3 flex-wrap">
        <Link href="/quiz" className="brut-btn">Take the quiz →</Link>
        <Link href="/learn" className="brut-btn-ghost">Learn the basics</Link>
      </div>
    </div>
  );
}
