import { LegalStub } from '@/components/LegalStub';

export const metadata = { title: 'Terms of Use — PrinterPick IN' };

export default function Terms() {
  return (
    <LegalStub title="Terms of Use" date="2026-04-22">
      <p><strong>1. Informational use only.</strong> PrinterPick IN provides printer recommendations, price comparisons, and educational content for informational purposes. Nothing on this site is a guarantee of price, availability, or fitness for a particular purpose.</p>
      <p><strong>2. Price accuracy.</strong> We fetch prices from Amazon.in, Flipkart, and Croma in good faith. Prices change minute-by-minute. Always verify on the retailer's own page before purchasing.</p>
      <p><strong>3. No warranty.</strong> The service is provided "as is". We make no warranties about accuracy, reliability, or availability.</p>
      <p><strong>4. Limitation of liability.</strong> We are not liable for any purchasing decisions you make based on information on this site. You are responsible for verifying all information before buying.</p>
      <p><strong>5. Third-party links.</strong> We link to retailer websites (Amazon.in, Flipkart, Croma, manufacturer stores). Their terms and privacy policies apply when you visit them.</p>
      <p><strong>6. Trademark notice.</strong> All product names, brands, and trademarks belong to their respective owners. Their mention here does not imply endorsement.</p>
      <p><strong>7. Changes.</strong> We may update these terms. Continued use after changes = acceptance.</p>
    </LegalStub>
  );
}
