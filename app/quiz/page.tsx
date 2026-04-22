'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rankPrinters, type QuizAnswers } from '@/lib/quiz-engine';

type QStep = {
  key: keyof QuizAnswers;
  q: string;
  subtitle?: string;
  kind: 'choice' | 'slider';
  options?: { value: string | number; label: string; sub?: string; emoji?: string }[];
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderDefault?: number;
  sliderFormat?: (v: number) => string;
};

const steps: QStep[] = [
  {
    key: 'monthlyPages',
    q: 'How many pages do you print a month?',
    subtitle: 'Ballpark is fine — we\'re setting expectations, not tracking you.',
    kind: 'choice',
    options: [
      { value: 'under20', label: 'Under 20', sub: 'Occasional prints', emoji: '📝' },
      { value: '20to100', label: '20 – 100', sub: 'Light regular use', emoji: '📄' },
      { value: '100to300', label: '100 – 300', sub: 'Heavy family use', emoji: '📚' },
      { value: '300plus', label: '300+', sub: 'Small office', emoji: '🏢' },
    ],
  },
  {
    key: 'colour',
    q: 'How much colour do you need?',
    kind: 'choice',
    options: [
      { value: 'none', label: 'Just B&W', sub: 'Text documents only', emoji: '⚫' },
      { value: 'occasional', label: 'Occasional', sub: 'Mostly B&W, rare colour', emoji: '🔵' },
      { value: 'half', label: 'About half', sub: 'Balanced mix', emoji: '🟣' },
      { value: 'mostly', label: 'Mostly colour', sub: 'Photos, flyers, kids stuff', emoji: '🌈' },
    ],
  },
  {
    key: 'duplexNeed',
    q: 'How often do you print 5+ page stacks?',
    subtitle: 'Decides whether auto-duplex is worth the extra spend.',
    kind: 'choice',
    options: [
      { value: 'never', label: 'Rarely', sub: 'Mostly 1-2 page prints', emoji: '🌱' },
      { value: 'sometimes', label: 'A few times a month', emoji: '📅' },
      { value: 'weekly', label: 'Weekly 20+ page stacks', sub: 'Auto-duplex matters', emoji: '📦' },
    ],
  },
  {
    key: 'budget',
    q: 'What\'s your budget for the printer?',
    subtitle: 'Drag the slider. Your TCO includes ink + paper separately.',
    kind: 'slider',
    sliderMin: 5000,
    sliderMax: 25000,
    sliderStep: 500,
    sliderDefault: 12000,
    sliderFormat: (v) => `₹${v.toLocaleString('en-IN')}`,
  },
  {
    key: 'connectivity',
    q: 'Do you need Wi-Fi?',
    kind: 'choice',
    options: [
      { value: 'wifi-required', label: 'Yes, must have Wi-Fi', sub: 'Print from phone, laptop anywhere', emoji: '📶' },
      { value: 'wifi-nice', label: 'Nice to have', sub: 'USB is OK, but Wi-Fi preferred', emoji: '👍' },
      { value: 'usb-ok', label: 'USB is fine', sub: 'One desktop/laptop, always connected', emoji: '🔌' },
    ],
  },
  {
    key: 'scanner',
    q: 'Do you need a scanner / copier?',
    kind: 'choice',
    options: [
      { value: 'required', label: 'Yes — with auto document feeder', sub: 'For ID proofs, multi-page scans', emoji: '📠' },
      { value: 'nice-to-have', label: 'Flatbed is enough', sub: 'Occasional scans only', emoji: '📋' },
      { value: 'not-needed', label: 'Don\'t need scanning', sub: 'Print-only is fine', emoji: '🖨️' },
    ],
  },
  {
    key: 'mainDevice',
    q: 'What will you print FROM most?',
    kind: 'choice',
    options: [
      { value: 'phone', label: 'Phone mainly', sub: 'Photos and docs from mobile', emoji: '📱' },
      { value: 'laptop', label: 'Laptop / desktop', sub: 'Cable or Wi-Fi — PC first', emoji: '💻' },
      { value: 'mix', label: 'Mix — both equal', sub: 'Needs solid Wi-Fi', emoji: '🔀' },
    ],
  },
  {
    key: 'photoSize',
    q: 'What photo sizes do you print?',
    kind: 'choice',
    options: [
      { value: 'a4-only', label: 'A4 documents only', sub: 'Not really a photo printer', emoji: '📄' },
      { value: 'a4-plus-4x6', label: 'A4 + 4×6 photos', sub: 'Occasional kids\' pictures', emoji: '🖼️' },
      { value: 'photos-priority', label: 'Photo quality is top priority', sub: 'Borderless + dye ink', emoji: '📸' },
    ],
  },
  {
    key: 'priority',
    q: 'Which matters most?',
    kind: 'choice',
    options: [
      { value: 'photo', label: 'Photo punch', sub: 'Vivid colour prints', emoji: '🎨' },
      { value: 'text', label: 'Text sharpness', sub: 'Crisp documents', emoji: '🔡' },
      { value: 'balanced', label: 'Balanced', sub: 'Both matter equally', emoji: '⚖️' },
    ],
  },
  {
    key: 'brandPref',
    q: 'Any brand preference?',
    subtitle: 'Not binding — just nudges the ranking.',
    kind: 'choice',
    options: [
      { value: 'no-preference', label: 'No preference', sub: 'Recommend whatever fits best', emoji: '🤷' },
      { value: 'canon', label: 'Canon', emoji: '🔴' },
      { value: 'epson', label: 'Epson', emoji: '🔵' },
      { value: 'hp', label: 'HP', emoji: '🔷' },
      { value: 'brother', label: 'Brother', emoji: '⚪' },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    budget: 12000,
  });
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const current = steps[step];
  const progress = ((step + 1) / (steps.length + 1)) * 100; // +1 for review step

  function setAnswer<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function nextStep() {
    if (step < steps.length) {
      setStep(step + 1);
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function submit() {
    setSubmitting(true);
    const ranked = rankPrinters(answers as QuizAnswers);
    const slugs = ranked.map((r) => r.printer.slug).join(',');
    router.push(`/browse?matches=${slugs}`);
  }

  // Review step (after all questions)
  if (step === steps.length) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <ProgressBar progress={100} step={steps.length + 1} total={steps.length + 1} back={back} />
        <div className="brut-card p-6">
          <h2 className="text-2xl md:text-3xl font-black">Review your answers</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Edit anything that looks off, then see your matches.
          </p>

          <div className="mt-5 space-y-2">
            {steps.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setStep(i)}
                className="w-full flex items-center justify-between gap-3 p-3 brut-card-sm hover:shadow-brutSm transition-all text-left"
              >
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    {i + 1}. {s.q.replace(/\?$/, '')}
                  </div>
                  <div className="font-extrabold text-sm mt-0.5">
                    {s.kind === 'slider'
                      ? s.sliderFormat!(answers[s.key] as number)
                      : s.options?.find((o) => o.value === answers[s.key])?.label ?? '—'}
                  </div>
                </div>
                <span className="text-xs font-bold underline decoration-2 underline-offset-2">
                  edit
                </span>
              </button>
            ))}
          </div>

          <button
            disabled={submitting}
            onClick={submit}
            className="brut-btn !px-6 !py-3 !text-base w-full mt-6"
          >
            {submitting ? 'Matching…' : '🎯 See my 3 matches →'}
          </button>
        </div>
      </div>
    );
  }

  const answered = answers[current.key] !== undefined;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <ProgressBar progress={progress} step={step + 1} total={steps.length + 1} back={back} />

      <div className="brut-card p-6">
        <h2 className="text-2xl md:text-3xl font-black leading-tight">{current.q}</h2>
        {current.subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {current.subtitle}
          </p>
        )}

        {current.kind === 'choice' && (
          <div className="mt-5 space-y-2.5">
            {current.options!.map((opt, i) => {
              const selected = answers[current.key] === opt.value;
              return (
                <button
                  key={String(opt.value)}
                  onClick={() => {
                    setAnswer(current.key, opt.value as any);
                    setTimeout(() => nextStep(), 180);
                  }}
                  className="w-full text-left brut-card-sm p-3.5 hover:shadow-brutSm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-start gap-3"
                  style={selected ? { background: 'var(--sun)' } : {}}
                >
                  <div
                    className="w-9 h-9 flex-shrink-0 border-[2px] rounded-md font-black text-base flex items-center justify-center"
                    style={{
                      background: selected ? 'var(--card)' : 'var(--ash)',
                      borderColor: 'var(--ink)',
                    }}
                  >
                    {opt.emoji ?? String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <div className="font-extrabold">{opt.label}</div>
                    {opt.sub && (
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                        {opt.sub}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {current.kind === 'slider' && (
          <SliderInput
            min={current.sliderMin!}
            max={current.sliderMax!}
            step={current.sliderStep!}
            value={(answers[current.key] as number) ?? current.sliderDefault!}
            onChange={(v) => setAnswer(current.key, v as any)}
            format={current.sliderFormat!}
          />
        )}

        {current.kind === 'slider' && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={nextStep}
              disabled={!answered}
              className="brut-btn flex-1 !py-3"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ progress, step, total, back }: { progress: number; step: number; total: number; back: () => void }) {
  return (
    <div>
      <div className="flex justify-between items-center text-xs font-extrabold mb-1.5">
        <span style={{ color: 'var(--muted)' }}>Step {step} of {total}</span>
        <button
          onClick={back}
          disabled={step === 1}
          className="underline decoration-[2px] underline-offset-2 disabled:opacity-30 disabled:no-underline"
        >
          ← Back
        </button>
      </div>
      <div className="h-3 border-[2px] rounded-full overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--ink)' }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'var(--sun)' }}
        />
      </div>
    </div>
  );
}

function SliderInput({
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <div className="text-5xl font-black">{format(value)}</div>
        <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
          Drag to change
        </div>
      </div>

      <div className="relative py-4">
        <div className="range-track">
          <div className="range-fill" style={{ width: `${percent}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="range-input"
        />
      </div>

      <div className="flex justify-between text-xs font-bold mt-2" style={{ color: 'var(--muted)' }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {[8000, 12000, 15000, 20000].map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="text-xs font-bold px-2 py-1.5 border-[2px] rounded-md transition-all"
            style={{
              background: value === v ? 'var(--sun)' : 'var(--card)',
              borderColor: 'var(--ink)',
              boxShadow: value === v ? '3px 3px 0 var(--shadow)' : 'none',
            }}
          >
            ₹{(v / 1000).toFixed(0)}k
          </button>
        ))}
      </div>
    </div>
  );
}
