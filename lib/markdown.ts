// Minimal printer-writeup markdown renderer.
// Handles only what we use: **bold**, paragraph breaks (blank lines), line breaks.
// We intentionally do NOT use a library — content is authored (not user-submitted),
// so we control the input and don't need a full CommonMark parser.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Render a printer-writeup subset of markdown to safe HTML. */
export function renderWriteup(md: string): string {
  const escaped = escapeHtml(md);
  // Paragraphs on blank line; **bold** → <strong>.
  const paragraphs = escaped
    .trim()
    .split(/\n{2,}/)
    .map((p) => {
      const inner = p
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>');
      return `<p>${inner}</p>`;
    });
  return paragraphs.join('\n');
}
