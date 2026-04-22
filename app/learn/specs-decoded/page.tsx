import Link from 'next/link';
import { LearnLayout } from '@/components/LearnSidebar';

export const metadata = { title: 'Every spec decoded — PrinterPick IN' };

const specs = [
  {
    spec: 'DPI (resolution)',
    what: 'Dots per inch. How fine the ink droplets are. Bigger number = sharper.',
    realworld: '1200×1200 is fine for documents. 4800×1200 or higher for photos. Marketing often lists the max interpolated number; look at the native DPI.',
    care: '⭐ Matters for photos. Ignore for text.',
  },
  {
    spec: 'PPM / IPM (speed)',
    what: 'PPM = Pages Per Minute (old, inflated). IPM = Images Per Minute (ISO standard, honest).',
    realworld: 'Typical ₹10-14k ink-tank: ~9-10 IPM black, ~5-6 IPM colour. A 10-page colour stack takes ~2 minutes.',
    care: 'Matters if you regularly print 20+ pages in one go. Otherwise ignore.',
  },
  {
    spec: 'Auto-duplex vs manual duplex',
    what: 'Duplex = two-sided printing. Auto-duplex means the printer flips the paper for you. Manual duplex means you flip.',
    realworld: 'At 100 pages/month with 20-page stacks, auto-duplex saves ~5-10 minutes a month and half your paper. Adds ~₹2,500 to printer price.',
    care: '⭐ Worth the extra ₹2,500 if you print 20+ page stacks weekly.',
  },
  {
    spec: 'Borderless printing',
    what: 'Prints all the way to the paper edge (no white border around a photo).',
    realworld: 'Needed for 4×6 photos — otherwise the photo has a white frame. Every current ink-tank supports this.',
    care: 'Matters for photos. Skip for documents.',
  },
  {
    spec: 'Wi-Fi / Wi-Fi Direct / AirPrint',
    what: 'Wi-Fi = joins your home network. Wi-Fi Direct = printer makes its own hotspot, phone connects directly. AirPrint = iOS can print without any driver. Mopria = Android equivalent.',
    realworld: '2024+ ink-tank printers usually have all four. Some cheap models (Epson L3210, Brother T226) skip Wi-Fi entirely — USB only.',
    care: '⭐ Essential if you want to print from phone. Confirm Wi-Fi is in the spec sheet, not a separate upgrade.',
  },
  {
    spec: 'ADF (Auto Document Feeder)',
    what: 'A tray on top that feeds a stack of pages into the scanner automatically.',
    realworld: 'Rare under ₹15k. Useful if you scan multi-page documents often (ID proofs, tax forms). Flatbed scanner without ADF = you scan one page at a time.',
    care: 'Skip unless you explicitly scan stacks.',
  },
  {
    spec: 'Monthly duty cycle vs recommended volume',
    what: 'Duty cycle = absolute maximum the printer can handle in a month before breaking. Recommended volume = what it\'s designed for.',
    realworld: 'Home printers: ~500-800/month recommended. Small office: ~2,000. Use the recommended number, not the inflated duty cycle.',
    care: '⭐ Don\'t print 2× over recommended volume — printer lifespan drops sharply.',
  },
  {
    spec: 'ISO page yield',
    what: 'Standardised claim of how many pages one ink bottle/cartridge prints at ~5% coverage (simple text).',
    realworld: 'A "7,500 page" claim at 30% coverage = ~1,250 real pages. At 70% (full photos) = ~540 pages.',
    care: '⭐ The only honest ink-longevity number. Mentally divide by 3-5 for real usage.',
  },
  {
    spec: 'LCD screen',
    what: 'A small display on the printer for setup and status.',
    realworld: 'Adds ₹1,000-2,000 to price. Makes Wi-Fi setup easier (you can type the password on the printer). Not essential — app-based setup works too.',
    care: 'Nice-to-have. Helpful if you\'re not tech-confident.',
  },
  {
    spec: 'Paper handling',
    what: 'Rear tray = paper loads standing up, visible from the back. Front cassette = hidden paper tray inside the body.',
    realworld: 'Most sub-₹15k printers use rear tray. Works fine, just looks less clean. Front cassette starts around ₹16k.',
    care: 'Aesthetic preference.',
  },
  {
    spec: 'Fax',
    what: 'Send/receive faxes over a phone line (RJ11).',
    realworld: 'Almost nobody needs fax in 2026. A few government/legal workflows still use it.',
    care: 'Ignore unless your job requires fax.',
  },
  {
    spec: 'Connectivity types',
    what: 'USB (Type-B to Type-A cable), Ethernet (RJ45, wired network), Wi-Fi, Wi-Fi Direct.',
    realworld: 'USB cable is never included in the box (budget ₹150 extra). Ethernet is rare under ₹15k. Wi-Fi is the home norm.',
    care: 'Verify Wi-Fi is present. Buy USB cable separately as backup.',
  },
];

export default function SpecsDecoded() {
  return (
    <LearnLayout
      title="Every spec decoded in plain English"
      subtitle="Marketing copy is dense. Here's what each spec actually means for your buying decision, with real numbers."
      current="specs-decoded"
    >
      <div className="space-y-3">
        {specs.map((s) => (
          <div key={s.spec} className="brut-card p-4 md:p-5">
            <h3 className="font-black text-lg">{s.spec}</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="brut-card-sm p-3" style={{ background: 'var(--ash)' }}>
                <div className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                  What it means
                </div>
                <div>{s.what}</div>
              </div>
              <div className="brut-card-sm p-3" style={{ background: 'var(--sky)' }}>
                <div className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                  Real-world context
                </div>
                <div>{s.realworld}</div>
              </div>
            </div>
            <div className="brut-card-sm p-2 mt-3 text-sm" style={{ background: 'var(--sun)' }}>
              <strong>Should you care:</strong> {s.care}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link href="/learn/tco" className="brut-btn">
          Next: TCO math →
        </Link>
      </div>
    </LearnLayout>
  );
}
