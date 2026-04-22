import { LegalStub } from '@/components/LegalStub';

export const metadata = { title: 'Report a wrong price — PrinterPick IN' };

export default function ReportPrice() {
  return (
    <LegalStub title="Report a wrong price">
      <p>Our live-price scraper occasionally fails (Amazon/Flipkart/Croma change their page layout). If you spot a price that's clearly wrong, here's how to help.</p>
      <ol className="list-decimal list-inside space-y-2 mt-3">
        <li>Note the <strong>printer model</strong> and the <strong>retailer</strong> showing the wrong price</li>
        <li>Include a <strong>screenshot URL</strong> from the retailer's own page showing the real price</li>
        <li>Send via <a href="/help/contact" className="underline decoration-2 underline-offset-2 font-bold">Contact</a> with topic "Report a wrong price"</li>
      </ol>
      <p className="mt-3">Most reports get fixed within a day — the fix usually involves updating a CSS selector in our scraper.</p>
    </LegalStub>
  );
}
