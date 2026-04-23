'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Msg = { role: 'user' | 'assistant'; content: string };

type ServerResponse = {
  reply?: string;
  suggestedAnswers?: Record<string, unknown>;
  done?: boolean;
  topMatches?: string[];
  error?: string;
};

const INITIAL_GREETING =
  'Hi! I can help you pick the right printer for India. Tell me roughly what you print most — colour photos, text documents, or both?';

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: INITIAL_GREETING },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setError(null);
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as ServerResponse;

      if (!res.ok) {
        setError(data.error || 'Assistant error.');
        setBusy(false);
        return;
      }

      if (data.reply) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply! }]);
      }
      if (data.done) {
        setDone(true);
        if (Array.isArray(data.topMatches)) setMatches(data.topMatches);
      }
    } catch (e: any) {
      setError('Network error — try again or use the quiz instead.');
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([{ role: 'assistant', content: INITIAL_GREETING }]);
    setInput('');
    setDone(false);
    setMatches([]);
    setError(null);
  }

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-3 border-[3px] border-ink rounded-full shadow-brut font-extrabold text-sm hover:translate-y-[-2px] transition-transform"
          style={{ background: 'var(--sun)', color: 'var(--ink)' }}
          aria-label="Open printer assistant"
        >
          <span className="text-lg">🤖</span>
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      )}

      {/* Slide-up panel */}
      {open && (
        <div
          className="fixed z-50 flex flex-col border-[3px] border-ink shadow-brut rounded-2xl"
          style={{
            background: 'var(--card)',
            bottom: '1rem',
            right: '1rem',
            width: 'min(380px, calc(100vw - 2rem))',
            height: 'min(560px, calc(100vh - 2rem))',
          }}
          role="dialog"
          aria-label="AI printer assistant"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-3 border-b-[3px] border-ink rounded-t-2xl"
            style={{ background: 'var(--sun)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <div className="font-extrabold text-sm">FindPrinter Assistant</div>
                <div className="text-[10px] text-ink/70">Printer questions only · Gemini 2.0</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                className="text-xs font-bold underline decoration-2 underline-offset-2"
                title="New conversation"
              >
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="ml-2 text-xl font-black leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 border-2 border-ink rounded-xl leading-snug ${
                  m.role === 'user' ? 'ml-auto' : ''
                }`}
                style={{
                  background: m.role === 'user' ? 'var(--sky)' : 'var(--ash)',
                }}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="px-3 py-2 border-2 border-ink rounded-xl text-xs italic text-ink/70">
                thinking…
              </div>
            )}
            {error && (
              <div
                className="px-3 py-2 border-2 border-ink rounded-xl text-xs"
                style={{ background: 'var(--danger)' }}
              >
                ⚠ {error}
              </div>
            )}
            {done && matches.length > 0 && (
              <Link
                href={`/browse?matches=${matches.join(',')}`}
                className="block text-center font-extrabold px-4 py-2 border-[2px] border-ink rounded-xl shadow-brutSm mt-2"
                style={{ background: 'var(--leaf)' }}
                onClick={() => setOpen(false)}
              >
                See my {matches.length} match{matches.length > 1 ? 'es' : ''} →
              </Link>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 border-t-[3px] border-ink flex gap-2"
            style={{ background: 'var(--bg)' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about printers only…"
              disabled={busy}
              className="brut-input flex-1 !py-1.5 text-sm"
              autoFocus
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="brut-btn !py-1.5 text-sm disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
