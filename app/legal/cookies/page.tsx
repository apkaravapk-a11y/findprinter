import { LegalStub } from '@/components/LegalStub';

export const metadata = { title: 'Cookie Policy — PrinterPick IN' };

export default function Cookies() {
  return (
    <LegalStub title="Cookie Policy" date="2026-04-22">
      <p>PrinterPick IN uses minimal browser storage. Here's exactly what and why:</p>
      <h3 className="font-black mt-4">localStorage (not cookies)</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><code>pp-theme</code> — your colour palette preference (e.g., "dark", "sun")</li>
        <li><code>pp-location</code> — your pincode/city, if you set one</li>
        <li><code>pp-compare</code> — printers you've added to compare</li>
      </ul>
      <p>All localStorage stays in your browser. It's never sent to our server or any third party.</p>
      <h3 className="font-black mt-4">Analytics cookies</h3>
      <p>We may use Vercel Analytics for anonymous aggregate page-view data. No personal identifiers, no cross-site tracking.</p>
      <h3 className="font-black mt-4">Third-party sites</h3>
      <p>When you click a retailer link (Amazon, Flipkart, Croma), their cookies apply on their site.</p>
      <h3 className="font-black mt-4">Managing</h3>
      <p>Clear your browser's localStorage and cookies at any time to remove all our stored data.</p>
    </LegalStub>
  );
}
