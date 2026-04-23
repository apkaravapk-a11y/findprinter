import { NextResponse } from 'next/server';
import { askPrinterAgent, type AgentMessage } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Very simple per-IP rate limit. In-memory (resets on cold-start) — fine for a
// free-tier personal app. Prevents a single client from exhausting the 1,500/day
// Gemini free quota.
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit: 20 messages / hour. Try the 10-question quiz instead.' },
        { status: 429 }
      );
    }

    const body = (await req.json()) as { messages?: AgentMessage[] };
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array required' }, { status: 400 });
    }
    // Hard cap so a runaway client can't send a novel.
    if (messages.length > 20) {
      return NextResponse.json(
        { error: 'Too many turns. Refresh to start a new conversation.' },
        { status: 400 }
      );
    }

    const result = await askPrinterAgent(messages);
    return NextResponse.json(result);
  } catch (e: any) {
    const msg = e?.message ?? 'Agent error.';
    // Friendly fallback so the UI can show a sensible message.
    const userFriendly = /GEMINI_API_KEY/.test(msg)
      ? 'Assistant is not configured yet. Use the 10-question quiz instead.'
      : 'Assistant is resting. Try the 10-question quiz instead.';
    return NextResponse.json({ error: userFriendly, detail: msg }, { status: 500 });
  }
}
