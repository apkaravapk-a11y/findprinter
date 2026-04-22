export const metadata = { title: 'Contact — PrinterPick IN' };

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <header>
        <h1 className="text-3xl md:text-5xl font-black">Contact us</h1>
        <p className="mt-2" style={{ color: 'var(--muted)' }}>
          Found a wrong price? Spotted a missing printer? Want to suggest a feature?
        </p>
      </header>

      <div className="brut-card p-6">
        <form className="space-y-4">
          <label className="block">
            <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
              Topic
            </div>
            <select className="brut-input" defaultValue="general">
              <option value="price-report">Report a wrong price</option>
              <option value="suggest-printer">Suggest a printer to add</option>
              <option value="bug">Report a bug</option>
              <option value="feature">Suggest a feature</option>
              <option value="general">General feedback</option>
            </select>
          </label>

          <label className="block">
            <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
              Email (optional — only if you want a reply)
            </div>
            <input type="email" className="brut-input" placeholder="you@example.com" />
          </label>

          <label className="block">
            <div className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
              Message
            </div>
            <textarea className="brut-input min-h-[140px] font-sans" placeholder="Tell us what's up…" />
          </label>

          <button type="button" className="brut-btn" disabled>
            📨 Send (demo — not wired yet)
          </button>
        </form>
      </div>

      <div className="brut-card p-5" style={{ background: 'var(--sky)' }}>
        <div className="text-xs font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          For immediate help
        </div>
        <ul className="mt-2 space-y-1 text-sm">
          <li>📖 <a href="/help/faq" className="underline decoration-2 underline-offset-2 font-bold">Read the FAQ</a></li>
          <li>🎓 <a href="/learn" className="underline decoration-2 underline-offset-2 font-bold">Browse the Learn hub</a></li>
          <li>🔧 For printer-specific troubleshooting, contact the brand directly (Canon / Epson / HP / Brother have India support lines)</li>
        </ul>
      </div>
    </div>
  );
}
