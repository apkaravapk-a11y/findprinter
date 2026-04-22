import Link from 'next/link';
import { printers } from '@/lib/printers';
import { PrinterCard } from '@/components/PrinterCard';

export default function Home() {
  const topPicks = printers
    .filter((p) => p.verdict === 'top-pick' || p.verdict === 'value-pick' || p.verdict === 'budget')
    .slice(0, 3);

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative">
        <div className="brut-card p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute -top-6 -right-6 w-32 h-32 border-[3px] rounded-full shadow-brut hidden md:block"
            style={{ background: 'var(--sun)', borderColor: 'var(--ink)' }}
          />
          <div
            className="absolute top-16 right-20 w-12 h-12 border-[2px] rounded-full hidden md:block"
            style={{ background: 'var(--sky)', borderColor: 'var(--ink)' }}
          />
          <div
            className="absolute top-28 right-44 w-8 h-8 border-[2px] rounded-full hidden md:block"
            style={{ background: 'var(--leaf)', borderColor: 'var(--ink)' }}
          />

          <div className="relative z-10 max-w-2xl">
            <span className="brut-chip" style={{ background: 'var(--leaf)' }}>🇮🇳 Made for India · Live prices</span>
            <h1 className="text-4xl md:text-6xl font-black mt-3 leading-[1.05] tracking-tight">
              Find the right printer <br />
              in under a minute.
            </h1>
            <p className="text-lg mt-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
              Live prices from Amazon.in, Flipkart &amp; Croma. Real 12-month cost math,
              not just sticker price. No affiliate pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/quiz" className="brut-btn !px-6 !py-3 !text-base">
                Take the 60s Quiz →
              </Link>
              <Link href="/browse" className="brut-btn-ghost !px-6 !py-3 !text-base">
                Browse All Printers
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs" style={{ color: 'var(--muted)' }}>
              <span>✓ 12 models curated</span>
              <span>✓ Prices fetched live</span>
              <span>✓ Free, no sign-up</span>
              <span>✓ Zero affiliate bias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { n: '12', l: 'Curated printers' },
          { n: '3', l: 'Retailers tracked' },
          { n: '5min', l: 'Price freshness' },
          { n: '0%', l: 'Affiliate bias' },
        ].map((s) => (
          <div key={s.l} className="brut-card-sm p-4 text-center">
            <div className="text-3xl md:text-4xl font-black">{s.n}</div>
            <div className="text-xs font-bold mt-1" style={{ color: 'var(--muted)' }}>
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* Top picks */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Top 3 starting points
            </div>
            <h2 className="text-2xl md:text-3xl font-black mt-1">
              The ones most people buy
            </h2>
          </div>
          <Link
            href="/browse"
            className="text-sm font-bold underline decoration-[3px] underline-offset-4"
            style={{ textDecorationColor: 'var(--sun)' }}
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topPicks.map((p) => (
            <PrinterCard key={p.slug} printer={p} />
          ))}
        </div>
      </section>

      {/* Newcomer education strip */}
      <section className="brut-card p-6 md:p-8" style={{ background: 'var(--sky)' }}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <span className="brut-chip" style={{ background: 'var(--card)' }}>
              🎓 New to printers?
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-3 leading-tight">
              Don't know a DPI from a duplex?<br />We've got you.
            </h2>
            <p className="mt-2 text-sm leading-relaxed">
              Our Learn hub explains <strong>every printer type</strong>, <strong>every spec</strong>, and the
              one decision that matters more than any other (ink-tank vs cartridge) — all in plain English, in about 20 minutes.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link href="/learn" className="brut-btn !px-4 !py-2">
                📚 Open Learn hub
              </Link>
              <Link href="/learn/printer-types" className="brut-btn-ghost !px-4 !py-2">
                🖨️ Printer types
              </Link>
              <Link href="/help/faq" className="brut-btn-ghost !px-4 !py-2">
                💬 FAQ
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:w-48">
            {[
              { emoji: '💧', label: 'Ink-tank vs cartridge', href: '/learn/inktank-vs-cartridge' },
              { emoji: '🧮', label: 'TCO calculator', href: '/learn/tco' },
              { emoji: '📖', label: 'A–Z glossary', href: '/learn/glossary' },
              { emoji: '🛠️', label: 'Maintenance', href: '/learn/maintenance' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="brut-card-sm p-2 text-xs font-bold flex items-center gap-2 hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
                style={{ background: 'var(--card)' }}
              >
                <span>{l.emoji}</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { n: '1', c: 'var(--sun)', t: 'Tell us what you print', d: 'Volume, colour needs, budget — ~10 quick taps.' },
            { n: '2', c: 'var(--sky)', t: 'We match & rank', d: 'Scored against 12 India-available models, real TCO math.' },
            { n: '3', c: 'var(--leaf)', t: 'See live prices', d: 'Amazon, Flipkart, Croma — fetched at click time.' },
          ].map((s) => (
            <div key={s.n} className="brut-card p-5">
              <div
                className="w-12 h-12 border-[2px] rounded-lg shadow-brutSm flex items-center justify-center font-black text-xl mb-3"
                style={{ background: s.c, borderColor: 'var(--ink)' }}
              >
                {s.n}
              </div>
              <h3 className="font-extrabold text-lg mb-1">{s.t}</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="brut-card p-6 md:p-10" style={{ background: 'var(--ash)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Why PrinterPick IN
            </div>
            <h2 className="text-2xl md:text-3xl font-black mt-1 leading-tight">
              We count the ink, not just the sticker.
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Most "best printer" lists rank by price alone. We compute the <strong>3-year total cost</strong>: sticker + ink per page × your volume + paper + maintenance. A ₹10k cartridge printer can cost ₹16k by year one. A ₹11k ink-tank stays at ₹12k for three years. The math is different — and we show our work.
            </p>
          </div>
          <div className="space-y-2.5">
            {[
              { t: 'Live prices, not cached', d: 'Fetched at page load from three retailers, with a 5-minute cache.' },
              { t: 'No sponsored rankings', d: 'We don\'t take money to move a printer up the list.' },
              { t: 'Bangalore-first', d: 'Delivery ETAs, service centers, pincode 560076 tested.' },
              { t: 'TCO calculator included', d: 'Plug in your own monthly volume on any printer\'s page.' },
            ].map((r) => (
              <div
                key={r.t}
                className="brut-card-sm p-3 flex gap-3"
                style={{ background: 'var(--card)' }}
              >
                <div className="text-xl">✓</div>
                <div>
                  <div className="font-extrabold text-sm">{r.t}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black mb-4">What people are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              q: 'Saved me from buying a ₹9k cartridge printer. Bought an ink-tank instead and I\'m already up ₹2k in ink savings.',
              n: 'Priya S.',
              r: 'Bangalore · Canon G3020 buyer',
            },
            {
              q: 'The TCO math made it obvious the E4570 was a trap at my print volume. Wish I\'d read this before my last printer.',
              n: 'Arun K.',
              r: 'Mumbai · HP Smart Tank 585 buyer',
            },
            {
              q: 'I just wanted auto-duplex under ₹11k. The app showed me Amazon Renewed as the workaround — got a G3770 for ₹10.2k.',
              n: 'Ritika D.',
              r: 'Pune · Canon G3770 buyer',
            },
          ].map((t) => (
            <div key={t.n} className="brut-card p-5">
              <div className="text-3xl mb-2" style={{ color: 'var(--sun)' }}>"</div>
              <p className="text-sm leading-relaxed">{t.q}</p>
              <div className="mt-4 pt-3 border-t-2" style={{ borderColor: 'var(--ash)' }}>
                <div className="font-extrabold text-sm">{t.n}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="brut-card p-8 md:p-10 text-center"
        style={{ background: 'var(--sun)' }}
      >
        <h2 className="text-2xl md:text-4xl font-black leading-tight">
          Ready to find yours?
        </h2>
        <p className="mt-2 max-w-xl mx-auto" style={{ color: 'var(--ink)', opacity: 0.8 }}>
          Five minutes, no sign-up, free. You'll leave with 3 ranked matches and live prices.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quiz" className="brut-btn-ghost !px-6 !py-3 !text-base" style={{ background: 'var(--card)' }}>
            Start the quiz →
          </Link>
          <Link href="/browse" className="brut-btn-ghost !px-6 !py-3 !text-base" style={{ background: 'var(--card)' }}>
            Browse the catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
