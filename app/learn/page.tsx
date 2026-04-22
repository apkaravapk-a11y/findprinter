import Link from 'next/link';
import { learnTopics } from '@/components/LearnSidebar';

export const metadata = { title: 'Learn — PrinterPick IN' };

const levels = {
  'start here': { label: '🚀 Start here', bg: 'var(--sun)' },
  intermediate: { label: '📐 Intermediate', bg: 'var(--sky)' },
  'after-buying': { label: '🛠️ After you buy', bg: 'var(--leaf)' },
  reference: { label: '📖 Reference', bg: 'var(--rose)' },
} as const;

export default function LearnHub() {
  const byLevel = {
    'start here': learnTopics.filter((t) => t.level === 'start here'),
    intermediate: learnTopics.filter((t) => t.level === 'intermediate'),
    'after-buying': learnTopics.filter((t) => t.level === 'after-buying'),
    reference: learnTopics.filter((t) => t.level === 'reference'),
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <header className="brut-card p-8 md:p-10">
        <span className="brut-chip" style={{ background: 'var(--leaf)' }}>
          🎓 For first-time buyers
        </span>
        <h1 className="text-3xl md:text-5xl font-black mt-3 leading-[1.05]">
          Never bought a printer before?<br />Start here.
        </h1>
        <p className="text-lg mt-3 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Plain-English explainers, no jargon, no sales pitch. In 20 minutes you'll understand every printer type, every spec, and how to avoid the traps retailers set for newcomers.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/learn/printer-types" className="brut-btn !px-4 !py-2">
            🖨️ Start: All printer types
          </Link>
          <Link href="/help/faq" className="brut-btn-ghost !px-4 !py-2">
            💬 Read FAQ instead
          </Link>
        </div>
      </header>

      {/* Absolute-beginner path */}
      <section className="brut-card p-6 md:p-8" style={{ background: 'var(--ash)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          The 5-minute tour for absolute beginners
        </div>
        <h2 className="text-2xl md:text-3xl font-black mt-1">The 3 things that actually matter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            {
              n: 1,
              t: 'The type of ink',
              d: 'Cartridge printers = cheap sticker, expensive ink. Ink-tank = ~20× cheaper ink per page. For most people, ink-tank wins.',
              href: '/learn/inktank-vs-cartridge',
              bg: 'var(--sun)',
            },
            {
              n: 2,
              t: 'Colour vs B&W',
              d: 'Inkjet does colour well. Laser is fast and sharp but B&W at your budget. If you want kids\' photos, inkjet.',
              href: '/learn/printer-types',
              bg: 'var(--sky)',
            },
            {
              n: 3,
              t: 'How much you print',
              d: 'Under 20 pages/month? Cartridge is fine. Over 100? Ink-tank will save you thousands over 3 years.',
              href: '/learn/tco',
              bg: 'var(--leaf)',
            },
          ].map((s) => (
            <Link
              key={s.n}
              href={s.href}
              className="block brut-card p-5 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutLg transition-all"
            >
              <div
                className="w-10 h-10 rounded-lg border-[2px] shadow-brutSm flex items-center justify-center font-black text-lg mb-3"
                style={{ background: s.bg, borderColor: 'var(--ink)' }}
              >
                {s.n}
              </div>
              <h3 className="font-extrabold text-lg">{s.t}</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{s.d}</p>
              <div className="mt-3 text-xs font-bold underline decoration-2 underline-offset-2">
                Read more →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All topics by level */}
      {(['start here', 'intermediate', 'after-buying', 'reference'] as const).map((lvl) => (
        <section key={lvl}>
          <div className="flex items-baseline gap-3 mb-3">
            <span
              className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-[2px] rounded-md"
              style={{ background: levels[lvl].bg, borderColor: 'var(--ink)' }}
            >
              {levels[lvl].label}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {byLevel[lvl].map((t) => (
              <Link
                key={t.slug}
                href={`/learn/${t.slug}`}
                className="brut-card p-4 flex items-center gap-4 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutLg transition-all"
              >
                <div
                  className="w-12 h-12 rounded-lg border-[2px] shadow-brutSm flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: levels[lvl].bg, borderColor: 'var(--ink)' }}
                >
                  {t.emoji}
                </div>
                <div>
                  <div className="font-extrabold">{t.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                    Read →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ shortcut */}
      <section className="brut-card p-6 md:p-8" style={{ background: 'var(--sun)' }}>
        <h2 className="text-2xl md:text-3xl font-black">Have a specific question?</h2>
        <p className="mt-2" style={{ opacity: 0.85 }}>
          Our FAQ covers 20+ common newcomer questions — buying, setup, ink, troubleshooting, warranty.
        </p>
        <Link href="/help/faq" className="brut-btn-ghost !px-4 !py-2 mt-4" style={{ background: 'var(--card)' }}>
          💬 See all FAQ →
        </Link>
      </section>
    </div>
  );
}
