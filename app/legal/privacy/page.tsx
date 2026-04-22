export const metadata = { title: 'Privacy Policy — PrinterPick IN' };

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <header>
        <h1 className="text-3xl md:text-4xl font-black">Privacy Policy</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Last updated: 2026-04-22</p>
      </header>

      <div className="brut-card p-6 prose prose-sm max-w-none space-y-4">
        <p>This is a plain-English summary. We do our best to keep this honest and short.</p>

        <h2 className="text-xl font-black">What we collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Your location pincode</strong>, if you set one, is stored in your browser's localStorage. We don't send it anywhere.</li>
          <li><strong>Your theme preference</strong>, also in localStorage. Also never leaves your browser.</li>
          <li><strong>Basic web analytics</strong> (Vercel Analytics) — page views, referrer, country. Anonymous, aggregated.</li>
        </ul>

        <h2 className="text-xl font-black">What we don't collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Your name, email, phone number (unless you type them into the Contact form voluntarily)</li>
          <li>Any purchase history — we never see what you buy</li>
          <li>Cookies for advertising or cross-site tracking</li>
        </ul>

        <h2 className="text-xl font-black">Third-party links</h2>
        <p>
          When you click a "Buy on Amazon/Flipkart/Croma" link, those retailers will track you according to their own policies. That's outside our control.
        </p>

        <h2 className="text-xl font-black">Price fetching</h2>
        <p>
          We fetch prices from Amazon.in, Flipkart, and Croma on your behalf when you view a printer page. This happens server-side — no personal data is shared with those retailers.
        </p>

        <h2 className="text-xl font-black">Contact</h2>
        <p>
          Questions about your data? <a href="/help/contact" className="underline decoration-2 underline-offset-2 font-bold">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
