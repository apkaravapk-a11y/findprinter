'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export function ThemeSwitcher() {
  const { themeId, setThemeId, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="brut-btn-ghost !px-3 !py-1.5 text-sm"
        aria-label="Change theme"
        title="Change colour theme"
      >
        🎨 Theme
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 brut-card p-3 z-50 space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted px-1 pb-1">
              Pick a palette
            </div>
            {themes.map((t) => {
              const active = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setThemeId(t.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2 border-2 rounded-lg transition-all text-left ${
                    active
                      ? 'shadow-brutSm'
                      : 'hover:shadow-brutSm hover:-translate-x-[1px] hover:-translate-y-[1px]'
                  }`}
                  style={{
                    borderColor: t.vars['--ink'],
                    background: active ? t.vars['--sun'] : t.vars['--card'],
                    color: t.vars['--text'],
                  }}
                >
                  <div className="flex gap-0.5">
                    <span
                      className="w-4 h-8 border-2 rounded-sm"
                      style={{
                        background: t.vars['--sun'],
                        borderColor: t.vars['--ink'],
                      }}
                    />
                    <span
                      className="w-4 h-8 border-2 rounded-sm"
                      style={{
                        background: t.vars['--sky'],
                        borderColor: t.vars['--ink'],
                      }}
                    />
                    <span
                      className="w-4 h-8 border-2 rounded-sm"
                      style={{
                        background: t.vars['--leaf'],
                        borderColor: t.vars['--ink'],
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-sm flex items-center gap-1.5">
                      {t.emoji} {t.name}
                      {active && <span className="text-[10px]">✓</span>}
                    </div>
                    <div className="text-[11px] opacity-70">{t.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
