import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';

export const metadata = { title: 'Printer maintenance — PrinterPick IN' };

export default function Maintenance() {
  return (
    <LearnLayout
      title="Keep your printer alive for 5+ years"
      subtitle="Ink-tank printers die from neglect, not overuse. Eight rules will keep yours running."
      current="maintenance"
    >
      <div className="brut-card p-5" style={{ background: 'var(--danger)' }}>
        <div className="text-[11px] font-extrabold uppercase tracking-widest">⚠️ The #1 killer</div>
        <p className="mt-1">
          <strong>Dried ink in the printhead.</strong> If you don't print for 2-3 weeks in humid Indian weather, ink in the nozzles dries into a crust. Deep cleaning cycles often can't fix it. Professional printhead replacement = ₹3,000-4,500.
        </p>
      </div>

      <div className="space-y-3">
        {rules.map((r, i) => (
          <div key={i} className="brut-card p-5 flex gap-4">
            <div
              className="w-12 h-12 flex-shrink-0 border-[2px] rounded-lg shadow-brutSm flex items-center justify-center font-black text-xl"
              style={{ background: r.bg, borderColor: 'var(--ink)' }}
            >
              {i + 1}
            </div>
            <div>
              <h3 className="font-black text-lg">{r.title}</h3>
              <p className="mt-1 text-sm">{r.body}</p>
              {r.extra && (
                <div className="brut-card-sm p-2 mt-2 text-xs" style={{ background: 'var(--ash)' }}>
                  💡 {r.extra}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Clog rescue */}
      <div className="brut-card p-6">
        <h2 className="text-2xl font-black">If your prints start streaking</h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
          Streaks or missing colours = partial clog. Try these in order.
        </p>
        <ol className="mt-3 space-y-2 text-sm">
          <li>
            <strong>1. Nozzle check</strong> — in the Canon PRINT / Epson Smart Panel / HP Smart app, run "Nozzle Check". Prints a test pattern. Gaps in any colour = that colour's nozzle is clogged.
          </li>
          <li>
            <strong>2. Standard cleaning</strong> — one cleaning cycle uses a few mL of ink. Takes ~1 minute.
          </li>
          <li>
            <strong>3. Deep cleaning</strong> — stronger, uses more ink. Run once, re-test. Don't run 5 deep cleans in a row; wait 2-3 hours between.
          </li>
          <li>
            <strong>4. Head alignment</strong> — different from cleaning; fixes misalignment, not clogs. Run if lines look "shifted" rather than missing.
          </li>
          <li>
            <strong>5. Soak the printhead</strong> (advanced, voids warranty) — remove printhead, soak in distilled water + 1 drop of dish soap for 30 min. Dry, reinstall.
          </li>
          <li>
            <strong>6. Service center</strong> — Canon Koramangala / Epson Indiranagar / HP Marathahalli for Bangalore. ₹500-1,500 for cleaning, ₹3,000+ for replacement.
          </li>
        </ol>
      </div>

      {/* Genuine vs 3rd-party ink */}
      <div className="brut-card p-5" style={{ background: 'var(--danger)' }}>
        <h2 className="text-xl font-black">❌ Never use 3rd-party refill ink</h2>
        <p className="mt-2 text-sm">
          Third-party bottles (₹150-200) often contain cheap dyes with solid particles that permanently clog the printhead. Canon and Epson explicitly void your 2-year warranty if non-genuine ink is detected (they can tell). The ₹300 you save per bottle isn't worth a ₹3,500 printhead replacement.
        </p>
        <div className="mt-3 text-sm">
          <strong>Genuine bottles:</strong> Canon GI-71 series · Epson 003 · HP GT53/GT52. Buy from Amazon "Sold by Canon/Epson/HP" listings or offline from an authorised dealer.
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link href="/learn/glossary" className="brut-btn">
          Next: A–Z Glossary →
        </Link>
      </div>
    </LearnLayout>
  );
}

const rules = [
  {
    title: 'Print at least once a week',
    body: 'Even a single blank page or a test print keeps the nozzles wet. In Bangalore\'s moderate humidity, 10+ days idle is risky. In Mumbai/Chennai (coastal), 7+ days is risky.',
    extra: 'Set a weekly calendar reminder. Seriously. This alone prevents 80% of printer deaths.',
    bg: 'var(--sun)',
  },
  {
    title: 'Keep the printer covered when not in use',
    body: 'Dust landing on the printhead mixes with residual ink to form a paste. Buy a ₹150 cotton cover or use a cardboard box flap.',
    bg: 'var(--sky)',
  },
  {
    title: 'Refill ink BEFORE the tank empties',
    body: 'When the indicator hits ~10%, top it up. If air gets pulled into the ink line, you\'ll get stubborn clogs that require service-center cleaning.',
    bg: 'var(--leaf)',
  },
  {
    title: 'Only use genuine ink bottles',
    body: 'Canon GI-71 series for G-series, Epson 003 for L-series, HP GT53/GT52 for Smart Tank. Cheap refills will kill the printhead.',
    bg: 'var(--rose)',
  },
  {
    title: 'Use a surge protector',
    body: 'Indian power grids have voltage spikes during thunderstorms and load-shedding returns. Printheads die from surges. A ₹350 MX/Belkin 4-outlet surge protector pays for itself forever.',
    bg: 'var(--sun)',
  },
  {
    title: 'Place on a hard flat surface, not carpet',
    body: 'Carpet blocks ventilation and absorbs dropped ink. Printers need airflow underneath to cool the printhead.',
    bg: 'var(--sky)',
  },
  {
    title: 'Store ink bottles upright, away from sunlight',
    body: 'Heat + UV degrade dye inks. Keep bottles in a cupboard away from windows.',
    bg: 'var(--leaf)',
  },
  {
    title: 'Update the firmware via app',
    body: 'Canon PRINT, Epson Smart Panel, and HP Smart all push firmware updates. Install them — they often fix memory leaks and improve print accuracy.',
    bg: 'var(--rose)',
  },
];
