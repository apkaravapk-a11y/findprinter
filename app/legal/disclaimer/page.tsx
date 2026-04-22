import { LegalStub } from '@/components/LegalStub';

export const metadata = { title: 'Disclaimer — PrinterPick IN' };

export default function Disclaimer() {
  return (
    <LegalStub title="Disclaimer" date="2026-04-22">
      <p><strong>Not affiliated.</strong> PrinterPick IN is an independent site. We are not affiliated with, endorsed by, or sponsored by:</p>
      <ul className="list-disc list-inside space-y-1 my-2">
        <li>Amazon.com Inc. (Amazon.in)</li>
        <li>Flipkart Internet Pvt. Ltd.</li>
        <li>Infiniti Retail Ltd. (Croma)</li>
        <li>Canon India Pvt. Ltd.</li>
        <li>Seiko Epson Corporation / Epson India</li>
        <li>HP India Sales Pvt. Ltd.</li>
        <li>Brother International</li>
      </ul>
      <p><strong>All trademarks</strong> are property of their respective owners. Their mention on this site is for informational purposes only and does not imply endorsement.</p>
      <p><strong>Price/spec data</strong> is gathered from publicly visible retailer pages and manufacturer spec sheets. Data may be outdated or inaccurate. Always verify on the source page before purchasing.</p>
      <p><strong>Recommendations</strong> are our editorial opinion based on public data. Your needs may differ. Consult the full retailer page, user reviews, and your own judgement before buying.</p>
      <p><strong>Affiliate disclosure</strong> — we may in future earn a small commission on qualifying purchases made through retailer links, at no additional cost to you. This will be disclosed if and when it applies. It does not influence our rankings.</p>
    </LegalStub>
  );
}
