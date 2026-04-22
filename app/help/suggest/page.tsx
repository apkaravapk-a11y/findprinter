import { LegalStub } from '@/components/LegalStub';

export const metadata = { title: 'Suggest a printer — PrinterPick IN' };

export default function Suggest() {
  return (
    <LegalStub title="Suggest a printer to add">
      <p>We currently list 12 India-available printers. If you want to see a model we don't cover, let us know.</p>
      <p className="mt-3"><strong>Please include:</strong></p>
      <ul className="list-disc list-inside space-y-1">
        <li>Brand + model name</li>
        <li>Amazon.in or Flipkart URL</li>
        <li>Why you think it belongs (price point, feature, specific use case)</li>
      </ul>
      <p className="mt-3">Adding a new printer takes ~30 minutes of data entry and price-fetcher configuration. Send via <a href="/help/contact" className="underline decoration-2 underline-offset-2 font-bold">Contact</a> with topic "Suggest a printer".</p>
    </LegalStub>
  );
}
