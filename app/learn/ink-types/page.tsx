import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';

export const metadata = { title: 'Dye, pigment & ink basics — PrinterPick IN' };

export default function InkTypes() {
  return (
    <LearnLayout
      title="Dye, pigment, and what ink actually is"
      subtitle="Two types of ink. Different strengths. Knowing the difference picks the right printer for your photos vs your documents."
      current="ink-types"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="brut-card p-5" style={{ background: 'var(--rose)' }}>
          <div className="text-3xl mb-2">💧</div>
          <h2 className="text-2xl font-black">Dye Ink</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Colour <em>dissolved</em> in water, like food colouring.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>🌈 <strong>Vibrant, saturated colours</strong> — best for photos</li>
            <li>⚡ Dries fast</li>
            <li>💦 Water-soluble — a spill will smear the print</li>
            <li>☀️ Fades over years if exposed to sunlight</li>
          </ul>
          <div className="mt-3 text-xs font-bold">
            Used by: All Canon G-series, all Epson EcoTank L-series, HP Smart Tank colour inks
          </div>
        </div>
        <div className="brut-card p-5" style={{ background: 'var(--sky)' }}>
          <div className="text-3xl mb-2">🧪</div>
          <h2 className="text-2xl font-black">Pigment Ink</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Tiny solid particles <em>suspended</em> in liquid, like paint.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>🔤 <strong>Sharper text edges</strong> — best for documents</li>
            <li>💧 Water-resistant when dry</li>
            <li>☀️ Fade-resistant (archival grade)</li>
            <li>🎨 Less vibrant than dye on photo paper</li>
          </ul>
          <div className="mt-3 text-xs font-bold">
            Used by: HP Smart Tank black, all laser toners, archival photo printers
          </div>
        </div>
      </section>

      <div className="brut-card p-5" style={{ background: 'var(--sun)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest">🎯 For your use case</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li><strong>Kids' photos / colour-heavy printing:</strong> Pick dye-based Canon or Epson ink-tank.</li>
          <li><strong>Office documents / legal / resumes:</strong> HP Smart Tank (pigment black + dye colour = best of both) or laser.</li>
          <li><strong>Archival scrapbook / certificates:</strong> Pigment-based photo printer (expensive, niche).</li>
        </ul>
      </div>

      {/* 4-ink vs 6-ink */}
      <section className="brut-card p-6">
        <h2 className="text-2xl font-black">4-ink vs 6-ink printers</h2>
        <p className="mt-2">
          Every inkjet printer uses at least 4 inks: <strong>Cyan, Magenta, Yellow, Black</strong> (CMYK). They mix to produce every colour.
        </p>
        <p className="mt-2">
          Photo-specialist printers add 2 extra inks — <strong>Light Cyan + Light Magenta</strong>. These make skin tones and sky gradients smoother (less "grainy"). Found in Canon PIXMA TS series and Epson L1800. Not worth the extra cost unless you're printing A3 wedding albums.
        </p>
        <div className="brut-card-sm p-3 mt-3" style={{ background: 'var(--ash)' }}>
          <strong>Verdict:</strong> 4-ink is fine for 99% of people. Don't pay extra for 6-ink unless photography is your profession.
        </div>
      </section>

      {/* ISO page yield */}
      <section className="brut-card p-6">
        <h2 className="text-2xl font-black">"ISO Page Yield" — the one honest number</h2>
        <p className="mt-2">
          When a printer says "up to 7,500 colour pages per bottle", that's the <strong>ISO page yield</strong> — a standard measured against a specific test page with ~5% ink coverage.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="brut-card-sm p-3">
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>At 5% coverage (text doc)</div>
            <div className="font-black text-lg">~7,500 pages</div>
            <div className="text-xs">= ~₹0.06/page</div>
          </div>
          <div className="brut-card-sm p-3" style={{ background: 'var(--sun)' }}>
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>At 30% coverage (mixed)</div>
            <div className="font-black text-lg">~1,250 pages</div>
            <div className="text-xs">= ~₹0.36/page</div>
          </div>
          <div className="brut-card-sm p-3">
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>At 70% coverage (photo)</div>
            <div className="font-black text-lg">~540 pages</div>
            <div className="text-xs">= ~₹0.83/page</div>
          </div>
        </div>
        <p className="text-sm mt-3" style={{ color: 'var(--muted)' }}>
          Kids' full-page colour photos eat ink 10-15× faster than text documents. A "7,500 page" bottle may only last 540 real photos. Still spectacularly cheap vs cartridge (~₹4.50/page).
        </p>
      </section>

      <div className="flex gap-3 flex-wrap">
        <Link href="/learn/specs-decoded" className="brut-btn">
          Next: Every spec decoded →
        </Link>
      </div>
    </LearnLayout>
  );
}
