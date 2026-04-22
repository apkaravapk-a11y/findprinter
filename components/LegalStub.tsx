export function LegalStub({
  title,
  date,
  children,
}: {
  title: string;
  date?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <header>
        <h1 className="text-3xl md:text-4xl font-black">{title}</h1>
        {date && (
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Last updated: {date}
          </p>
        )}
      </header>
      <div className="brut-card p-6 space-y-4 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
