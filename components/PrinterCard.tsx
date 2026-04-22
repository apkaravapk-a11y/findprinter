import Link from 'next/link';
import type { Printer } from '@/lib/printers';
import { formatInr } from '@/lib/tco';

export function PrinterCard({ printer, highlighted }: { printer: Printer; highlighted?: boolean }) {
  const verdictBadge = (() => {
    switch (printer.verdict) {
      case 'top-pick':
        return { label: '🔥 TOP PICK', bg: 'bg-sun' };
      case 'value-pick':
        return { label: '⭐ VALUE', bg: 'bg-leaf' };
      case 'budget':
        return { label: '💰 BUDGET', bg: 'bg-sky' };
      case 'avoid':
        return { label: '⚠️ AVOID', bg: 'bg-danger' };
      default:
        return null;
    }
  })();

  return (
    <Link
      href={`/printer/${printer.slug}`}
      className={`block brut-card p-4 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutLg transition-all ${
        highlighted ? 'ring-[6px] ring-sun/60 ring-offset-2 ring-offset-cream' : ''
      }`}
    >
      {verdictBadge && (
        <div
          className={`inline-block ${verdictBadge.bg} text-ink font-extrabold text-[10px] px-2 py-[2px] border-[2px] border-ink rounded-md mb-2`}
        >
          {verdictBadge.label}
        </div>
      )}
      <div className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
        {printer.brand} · {printer.category.replace('-', ' ')}
      </div>
      <h3 className="font-extrabold text-lg mt-1 mb-2 leading-tight">
        {printer.model}
      </h3>
      <div className="text-2xl font-black mb-2">{formatInr(printer.mrp)}</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {printer.features.wifi && <span className="brut-chip bg-sky">Wi-Fi</span>}
        {printer.features.autoDuplex && (
          <span className="brut-chip bg-leaf">Auto-Duplex</span>
        )}
        {printer.features.colour && <span className="brut-chip bg-rose">Colour</span>}
        {printer.features.lcd && <span className="brut-chip bg-ash">LCD</span>}
      </div>
      <div className="text-xs text-ink/70 mt-2 line-clamp-2">
        {printer.bestFor}
      </div>
    </Link>
  );
}
