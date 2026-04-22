import { LegalStub } from '@/components/LegalStub';

export const metadata = { title: 'Accessibility — PrinterPick IN' };

export default function Accessibility() {
  return (
    <LegalStub title="Accessibility Statement" date="2026-04-22">
      <p>We aim to make PrinterPick IN usable by everyone, regardless of ability.</p>
      <h3 className="font-black mt-4">What we do</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>Semantic HTML so screen readers parse our content correctly</li>
        <li>Keyboard navigation on all interactive elements (tab / enter / space)</li>
        <li>Colour contrast verified at WCAG AA level on default theme</li>
        <li>Multiple colour themes including dark mode and high-contrast palettes</li>
        <li>Text-based chart alternatives for all data visualisations</li>
        <li>No motion-triggering auto-play animations</li>
      </ul>
      <h3 className="font-black mt-4">Known limitations</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>The dual-handle price-range slider can be awkward on keyboard — we're working on a number-input fallback</li>
        <li>Some theme palettes (Vibrant Pop) may have lower contrast in places</li>
      </ul>
      <h3 className="font-black mt-4">Report an issue</h3>
      <p>If you hit an accessibility blocker, please <a href="/help/contact" className="underline decoration-2 underline-offset-2 font-bold">contact us</a>. We take these seriously.</p>
    </LegalStub>
  );
}
