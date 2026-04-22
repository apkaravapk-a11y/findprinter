import Link from 'next/link';

export const learnTopics = [
  { slug: 'printer-types', title: 'All printer types explained', emoji: '🖨️', level: 'start here' },
  { slug: 'inktank-vs-cartridge', title: 'Ink-tank vs cartridge', emoji: '⚔️', level: 'start here' },
  { slug: 'ink-types', title: 'Dye, pigment & ink basics', emoji: '💧', level: 'start here' },
  { slug: 'specs-decoded', title: 'Every spec in plain English', emoji: '📋', level: 'intermediate' },
  { slug: 'tco', title: 'Total Cost of Ownership (TCO)', emoji: '🧮', level: 'intermediate' },
  { slug: 'maintenance', title: 'Keep your printer alive', emoji: '🛠️', level: 'after-buying' },
  { slug: 'glossary', title: 'A–Z glossary', emoji: '📖', level: 'reference' },
];

export function LearnSidebar({ current }: { current?: string }) {
  return (
    <aside className="brut-card p-4 md:sticky md:top-20 space-y-3">
      <div>
        <h3 className="font-black text-sm">📚 Learn</h3>
        <p className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>
          No printer knowledge needed. Start anywhere.
        </p>
      </div>
      <div className="space-y-1">
        {learnTopics.map((t) => {
          const active = current === t.slug;
          return (
            <Link
              key={t.slug}
              href={`/learn/${t.slug}`}
              className="block p-2 rounded-lg text-sm transition-all border-2"
              style={{
                background: active ? 'var(--sun)' : 'transparent',
                borderColor: active ? 'var(--ink)' : 'transparent',
                boxShadow: active ? '3px 3px 0 var(--shadow)' : 'none',
              }}
            >
              <div className="flex items-center gap-2">
                <span>{t.emoji}</span>
                <span className="font-bold flex-1">{t.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="pt-3 border-t-2" style={{ borderColor: 'var(--ash)' }}>
        <Link
          href="/help/faq"
          className="block p-2 rounded-lg text-sm font-bold border-2 hover:shadow-brutSm transition-all"
          style={{ background: 'var(--leaf)', borderColor: 'var(--ink)' }}
        >
          💬 FAQ — 20+ common questions
        </Link>
      </div>
    </aside>
  );
}

export function LearnLayout({
  title,
  subtitle,
  current,
  children,
}: {
  title: string;
  subtitle?: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-5">
      <LearnSidebar current={current} />
      <article className="space-y-6 min-w-0">
        <header>
          <Link
            href="/learn"
            className="text-xs font-bold underline decoration-[2px] underline-offset-2"
            style={{ color: 'var(--muted)' }}
          >
            ← All topics
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mt-2 leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-base mt-2" style={{ color: 'var(--muted)' }}>
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </article>
    </div>
  );
}
