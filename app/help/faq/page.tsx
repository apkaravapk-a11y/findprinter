'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type QA = { q: string; a: string; cat: string };

const faqs: QA[] = [
  // Buying
  { cat: 'Buying', q: 'What\'s the best printer under ₹10,000 in India?', a: 'Realistically, Brother DCP-T226 (~₹8,500) is the only genuine ink-tank under ₹10k — but it\'s USB-only, no Wi-Fi. If you need Wi-Fi, stretch ₹1,100 to get Canon PIXMA G3020 at ~₹11,099. The ₹1,100 pays back in 4 months of ink savings.' },
  { cat: 'Buying', q: 'Ink-tank or cartridge — which is better for me?', a: 'If you print >20 pages a month: ink-tank, always. Cartridge printers look cheaper but cost 20× more per page in ink. By month 6 of normal use, a "cheap" cartridge printer costs more than a "pricier" ink-tank. See /learn/inktank-vs-cartridge for the full math.' },
  { cat: 'Buying', q: 'Do I need a scanner/copier?', a: 'Only if you regularly scan ID proofs, tax forms, or multi-page documents. If you just print, skip it — print-only printers are ~₹1,500 cheaper and simpler. Your phone\'s camera is a great stand-in scanner for occasional use (Google Drive, Microsoft Lens apps).' },
  { cat: 'Buying', q: 'Is Wi-Fi worth paying extra for?', a: 'Yes, if you\'ll ever print from a phone or multiple computers. The premium is ~₹1,000-2,000. Wi-Fi + Wi-Fi Direct + AirPrint/Mopria lets you print from anywhere in the house with zero cables.' },
  { cat: 'Buying', q: 'Should I buy from Amazon, Flipkart, or a physical store?', a: 'Amazon.in is usually cheapest and has the fastest delivery in metros. Flipkart matches during big sales (Big Billion Days, Republic Day). Physical stores (Croma, Reliance Digital, Vijay Sales) are good for try-before-buy and exchange offers. All three honour the manufacturer\'s India warranty.' },
  { cat: 'Buying', q: 'What about Amazon Renewed / refurbished?', a: 'Amazon Renewed printers come with a 1-year Amazon Renewed warranty and 30-day return. Often 20-35% cheaper than new. Low risk for printers specifically — either the printhead works or it doesn\'t, and Amazon\'s return window catches duds.' },
  { cat: 'Buying', q: 'When do printer prices drop?', a: 'Amazon Summer Sale (May), Prime Day (July), Great Indian Festival (October), Republic Day Sale (January). Use a price-tracker like pricehistory.app or buyhatke to watch for historical lows.' },

  // Setup
  { cat: 'Setup', q: 'What comes in the box?', a: 'Printer, a set of starter ink bottles (for ink-tanks), a power cable, setup instructions. NOT included: USB cable (₹150 separate), paper, surge protector.' },
  { cat: 'Setup', q: 'How long does initial setup take?', a: '~30 minutes for an ink-tank printer. You fill four ink bottles into four tanks, run the "initial charging" cycle (pulls ink through the system), install drivers via the app (Canon PRINT / Epson Smart Panel / HP Smart), connect to Wi-Fi, print a test page.' },
  { cat: 'Setup', q: 'Do I need to install drivers on my laptop?', a: 'Yes, but do it through the manufacturer\'s app/website, not Windows auto-install. The brand\'s app (Canon PRINT, Epson Smart Panel, HP Smart) is the right install path — gives you the full feature set. On iOS/macOS with AirPrint, no driver needed.' },
  { cat: 'Setup', q: 'My Wi-Fi setup failed. What now?', a: 'Most common fixes: (1) make sure your phone and printer are on the 2.4 GHz network, not 5 GHz — older printers don\'t support 5 GHz. (2) Temporarily disable mobile data on your phone during setup. (3) Keep the printer within 3 metres of the router during setup. (4) Use the Wi-Fi Direct fallback — printer creates its own hotspot.' },

  // Ink
  { cat: 'Ink', q: 'How often do I refill ink?', a: 'On an ink-tank, a set of bottles lasts 6-12 months at 100 pages/month. The printer will alert you when a tank is getting low.' },
  { cat: 'Ink', q: 'Can I use 3rd-party refill ink?', a: 'Technically yes, practically no. Cheap refills (₹150) often contain particles that permanently clog the printhead. Canon and Epson void warranty on non-genuine ink. The ₹300 savings per bottle isn\'t worth a ₹3,500 printhead replacement.' },
  { cat: 'Ink', q: 'Where do I buy genuine ink in India?', a: 'Amazon.in "Sold by Canon/Epson/HP" listings, manufacturer online stores (canon.co.in, epson.co.in, hp.com/in), or authorised offline dealers. In Bangalore: SP Road near Majestic has all three brands. Avoid random e-commerce sellers with cheap prices.' },
  { cat: 'Ink', q: 'What\'s the difference between GI-71 and GI-70?', a: 'Canon ink compatibility varies by printer. GI-71 fits G3770/G3020/G3010. GI-70 is older. Always check your specific model\'s manual — using the wrong ink model will clog the printhead.' },

  // Troubleshooting
  { cat: 'Troubleshooting', q: 'My prints have streaks/missing colours.', a: 'Partial printhead clog. Run a nozzle check from the app, then a standard cleaning cycle. If streaks persist, try a deep cleaning. If still there, wait 2-3 hours and try again (sometimes ink has to settle). See /learn/maintenance for the full rescue sequence.' },
  { cat: 'Troubleshooting', q: 'I haven\'t printed in 2 months — now nothing prints.', a: 'Classic dried printhead. Try 2-3 deep cleaning cycles with a few hours between each. If that fails, the printhead is dead — either replace it (₹3,000-4,500 at service centre) or budget for a new printer.' },
  { cat: 'Troubleshooting', q: 'My printer is offline but connected to Wi-Fi.', a: 'Restart printer → restart router → restart phone/laptop in that order. 90% fixes it. If not, go to the printer\'s settings screen, check the IP address, and check your router for a DHCP lease conflict.' },
  { cat: 'Troubleshooting', q: 'Paper keeps jamming.', a: 'Cheap paper (under ₹200/ream) has inconsistent thickness. Use JK Easy Copier or Double-A 80 GSM. Also: don\'t overfill the tray (max 100 sheets), and don\'t use paper that\'s been sitting in humidity.' },

  // Warranty
  { cat: 'Warranty', q: 'How long is the warranty?', a: 'Standard 1 year. Canon and Epson extend to 2 years if you register the product on their website within 30 days of purchase. HP varies by model. Brother is typically 1 year only.' },
  { cat: 'Warranty', q: 'What voids the warranty?', a: 'Using 3rd-party (non-genuine) ink is the #1 voider. Physical damage, liquid damage, unauthorised repair also void it. Normal wear (including printhead clogs from legitimate ink) is covered.' },
  { cat: 'Warranty', q: 'How do I claim warranty in Bangalore?', a: 'Canon: Koramangala, HSR, Electronic City service centres. Epson: Indiranagar, Jayanagar, BTM. HP: Koramangala, Indiranagar. Bring the printer, purchase invoice, and the box if you still have it. Most cleanings are same-day.' },
];

const categories = ['All', 'Buying', 'Setup', 'Ink', 'Troubleshooting', 'Warranty'];

export default function FAQ() {
  const [cat, setCat] = useState('All');
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      if (cat !== 'All' && f.cat !== cat) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [cat, query]);

  return (
    <div className="space-y-5">
      <header>
        <Link href="/learn" className="text-xs font-bold underline decoration-2 underline-offset-2" style={{ color: 'var(--muted)' }}>
          ← All learn topics
        </Link>
        <h1 className="text-3xl md:text-5xl font-black mt-2">Frequently Asked Questions</h1>
        <p className="mt-2" style={{ color: 'var(--muted)' }}>
          {faqs.length} common questions, grouped by topic. Click to expand.
        </p>
      </header>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-3 py-1.5 text-sm font-bold border-[2px] rounded-md transition-all"
            style={{
              background: cat === c ? 'var(--sun)' : 'var(--card)',
              borderColor: 'var(--ink)',
              boxShadow: cat === c ? '3px 3px 0 var(--shadow)' : 'none',
            }}
          >
            {c} {c !== 'All' && `(${faqs.filter((f) => f.cat === c).length})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="🔍 Search questions…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="brut-input"
      />

      {/* FAQ list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="brut-card p-8 text-center">
            <div className="text-5xl mb-2">🤷</div>
            <div className="font-extrabold">No questions match "{query}"</div>
          </div>
        )}
        {filtered.map((f, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className="brut-card">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full p-4 text-left flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    {f.cat}
                  </div>
                  <div className="font-extrabold mt-0.5">{f.q}</div>
                </div>
                <div className="text-xl font-black flex-shrink-0">{open ? '−' : '+'}</div>
              </button>
              {open && (
                <div
                  className="px-4 pb-4 text-sm leading-relaxed border-t-2"
                  style={{ borderColor: 'var(--ash)' }}
                >
                  <p className="mt-3">{f.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Can't find it */}
      <div className="brut-card p-5" style={{ background: 'var(--sun)' }}>
        <div className="font-extrabold">Didn't find your question?</div>
        <p className="text-sm mt-1">
          Explore the <Link href="/learn" className="underline decoration-2 underline-offset-2"><strong>Learn hub</strong></Link> for deeper explanations, or <Link href="/help/contact" className="underline decoration-2 underline-offset-2"><strong>contact us</strong></Link> directly.
        </p>
      </div>
    </div>
  );
}
