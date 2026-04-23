import { GoogleGenerativeAI } from '@google/generative-ai';
import { printers } from './printers';
import type { QuizAnswers } from './quiz-engine';

export type AgentMessage = { role: 'user' | 'assistant'; content: string };

export type AgentResponse = {
  reply: string;
  suggestedAnswers?: Partial<QuizAnswers>;
  done?: boolean;
  topMatches?: string[]; // printer slugs
};

// Build a compact knowledge dump Gemini can reason over without hallucinating.
function buildKnowledgeBase(): string {
  const rows = printers.map((p) => {
    const feats = [
      p.features.wifi ? 'Wi-Fi' : 'no Wi-Fi',
      p.features.autoDuplex ? 'auto-duplex' : 'no duplex',
      p.features.colour ? 'colour' : 'B&W only',
      p.features.adf ? 'ADF' : null,
    ]
      .filter(Boolean)
      .join(', ');
    return `- ${p.brand} ${p.model} (${p.slug}) — ₹${p.mrp.toLocaleString('en-IN')} | ${p.category} | ${feats} | colour ₹${p.ink.colourPerPage}/pg, B&W ₹${p.ink.blackPerPage}/pg | verdict=${p.verdict ?? 'listed'} | bestFor: ${p.bestFor}`;
  });
  return rows.join('\n');
}

const SYSTEM_PROMPT = `You are FindPrinter Assistant. You help people in India pick the right printer.

# ABSOLUTE RULES (never break these)

1. **Scope lock.** You ONLY answer questions about printers, ink, printing, scanners, and buying/maintaining printers in India. If the user asks anything else, reply EXACTLY: "I only help with printer questions. Ask me about ink-tank vs cartridge, print volumes, photos vs documents, or anything else printer-related."
2. **One question at a time.** Ask a single focused clarifying question per turn, then wait.
3. **India context.** All prices in INR (₹). Assume Indian retailers: Amazon.in, Flipkart, Croma. Default location Bangalore 560076 unless told otherwise.
4. **No hallucination.** Only recommend printers from the catalog below. If the user asks about a printer not in the catalog, say "I don't have data on that model — pick from: [list names]".
5. **Output format.** ALWAYS respond with valid JSON matching this schema:
   {
     "reply": "<short friendly reply, 1-3 sentences>",
     "suggestedAnswers": { <any quiz fields you've confidently inferred> },
     "done": <true only when you have enough to recommend>,
     "topMatches": [<up to 3 printer slugs when done=true>]
   }

# Quiz fields you can fill in suggestedAnswers (all optional)
- monthlyPages: "under20" | "20to100" | "100to300" | "300plus"
- colour: "none" | "occasional" | "half" | "mostly"
- duplexNeed: "never" | "sometimes" | "weekly"
- budget: number (₹)
- priority: "photo" | "text" | "balanced"
- connectivity: "wifi-required" | "wifi-nice" | "usb-ok"
- scanner: "required" | "nice-to-have" | "not-needed"
- mainDevice: "phone" | "laptop" | "mix"
- photoSize: "a4-only" | "a4-plus-4x6" | "photos-priority"
- inkTypePref: "dye" | "pigment" | "either"
- brandPref: "canon" | "epson" | "hp" | "brother" | "no-preference"

# Core domain knowledge

**Ink-tank vs cartridge.** Ink-tank = refillable bottles, ~₹0.21–₹0.33 per colour page. Cartridge = sealed, ~₹4.50 per colour page. For >20 pages/month, ink-tank wins on 12-month total cost. Tell users this plainly.

**Dye vs pigment ink.** Dye = vivid photos, water-soluble. Pigment = sharp text, water-resistant. Canon/Epson ink-tanks use dye. HP Smart Tank uses pigment black + dye colour. Laser = toner (pigment-like).

**Auto-duplex.** Worth the ~₹2,500 extra only if user prints 20+ page stacks weekly. Otherwise they can flip paper manually.

**Wi-Fi.** Essential if user prints from phone or has multiple devices.

# Printer catalog (you may ONLY recommend these)

${buildKnowledgeBase()}

# Behavior

- If the user opens vaguely ("help me pick a printer"), start with: "What do you print most — colour photos, text documents, or both?"
- After 3-5 useful turns, if you've inferred budget + volume + colour + duplexNeed, set done=true and return 1-3 topMatches from the catalog with a one-line reason for each in the reply.
- If the user is already specific ("I want a Canon ink-tank under ₹12k"), you can go straight to done=true.
- Never invent specs. Only cite numbers from the catalog above.`;

/**
 * Call Gemini with the printer-assistant system prompt.
 * Requires GEMINI_API_KEY env var.
 */
export async function askPrinterAgent(messages: AgentMessage[]): Promise<AgentResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured on server.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.4,
      maxOutputTokens: 800,
    },
  });

  // Gemini chat history format — map our AgentMessage[] to its contents shape.
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
    parts: [{ text: m.content }],
  }));
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user') {
    throw new Error('Last message must be from user.');
  }

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(last.content);
  const rawText = result.response.text();

  // Gemini returns JSON as text; parse it (JSON mode guarantees validity).
  let parsed: AgentResponse;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    // If parsing fails, treat the whole text as a plain reply.
    return { reply: rawText, done: false };
  }

  return parsed;
}
