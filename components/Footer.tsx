import Link from 'next/link';

const year = new Date().getFullYear();

const columns = [
  {
    title: 'Discover',
    links: [
      { label: 'Take the 60s Quiz', href: '/quiz' },
      { label: 'Browse all printers', href: '/browse' },
      { label: 'Top picks', href: '/browse?matches=canon-pixma-g3770,canon-pixma-g3020,hp-smart-tank-585' },
      { label: 'Compare (coming soon)', href: '/compare' },
    ],
  },
  {
    title: 'Shop by brand',
    links: [
      { label: 'Canon', href: '/browse?brand=Canon' },
      { label: 'Epson', href: '/browse?brand=Epson' },
      { label: 'HP', href: '/browse?brand=HP' },
      { label: 'Brother', href: '/browse?brand=Brother' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'How we pick', href: '/about' },
      { label: 'TCO calculator explained', href: '/learn/tco' },
      { label: 'Ink-tank vs cartridge', href: '/learn/inktank-vs-cartridge' },
      { label: 'Printer maintenance tips', href: '/learn/maintenance' },
      { label: 'Buyer\'s glossary', href: '/learn/glossary' },
    ],
  },
  {
    title: 'Help & support',
    links: [
      { label: 'FAQ', href: '/help/faq' },
      { label: 'Contact us', href: '/help/contact' },
      { label: 'Report a wrong price', href: '/help/report-price' },
      { label: 'Suggest a printer', href: '/help/suggest' },
    ],
  },
];

const legal = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Use', href: '/legal/terms' },
  { label: 'Cookie Policy', href: '/legal/cookies' },
  { label: 'Disclaimer', href: '/legal/disclaimer' },
  { label: 'Accessibility', href: '/legal/accessibility' },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t-4" style={{ borderColor: 'var(--ink)' }}>
      {/* Back to top bar */}
      <a
        href="#top"
        className="block text-center py-3 font-extrabold text-sm hover:opacity-80 border-b-2"
        style={{ background: 'var(--sky)', color: 'var(--ink)', borderColor: 'var(--ink)' }}
      >
        ↑ Back to top
      </a>

      {/* Main footer */}
      <div style={{ background: 'var(--card)', borderBottom: '2px solid var(--ink)' }}>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--ink)' }}>
                  {col.title}
                </div>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-xs hover:underline decoration-2 underline-offset-2"
                        style={{ color: 'var(--muted)' }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Country + language + currency bar */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t-2" style={{ borderColor: 'var(--ash)' }}>
            <div className="brut-chip">🇮🇳 India</div>
            <div className="brut-chip">English</div>
            <div className="brut-chip">₹ INR</div>
            <span className="text-[11px]" style={{ color: 'var(--muted)' }}>
              Prices shown are from Amazon.in, Flipkart and Croma, fetched at page load. Delivery address defaults to Bangalore 560076.
            </span>
          </div>
        </div>
      </div>

      {/* Legal / trademark bar */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            {legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[11px] font-bold hover:underline decoration-2 underline-offset-2"
                style={{ color: 'var(--muted)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="text-[11px] leading-relaxed" style={{ color: 'var(--muted)' }}>
            © {year} PrinterPick IN™. All rights reserved. PrinterPick IN is an independent price-comparison and recommendation service, not affiliated with, endorsed by, or sponsored by Amazon.com Inc., Flipkart Internet Pvt. Ltd., Infiniti Retail Ltd. (Croma), Canon India Pvt. Ltd., Seiko Epson Corporation, HP India Sales Pvt. Ltd., or Brother International. All product names, logos, brands, trademarks and registered trademarks are property of their respective owners. Use of these names, logos and brands does not imply endorsement.
          </div>
          <div className="text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
            Prices, specifications and availability are subject to change without notice. We strive for accuracy but cannot guarantee price information is current at the time of purchase — always verify on the retailer's page before buying. We may earn a small commission from qualifying purchases made through affiliate links where disclosed, at no additional cost to you. This does not influence our rankings.
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px]" style={{ color: 'var(--muted)' }}>
            <span>🔒 Secured by HTTPS</span>
            <span>•</span>
            <span>♻ Carbon-aware hosting on Vercel</span>
            <span>•</span>
            <span>🇮🇳 Built in Bangalore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
