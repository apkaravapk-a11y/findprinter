'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultThemeId, getTheme, themes, type Theme } from '@/lib/themes';

type Ctx = {
  themeId: string;
  setThemeId: (id: string) => void;
  themes: Theme[];
};

const ThemeContext = createContext<Ctx>({
  themeId: defaultThemeId,
  setThemeId: () => {},
  themes,
});

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(theme.vars)) {
    root.style.setProperty(k, v);
  }
  root.setAttribute('data-theme', theme.id);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(defaultThemeId);

  useEffect(() => {
    const saved = localStorage.getItem('pp-theme') ?? defaultThemeId;
    setThemeIdState(saved);
    applyTheme(getTheme(saved));
  }, []);

  function setThemeId(id: string) {
    setThemeIdState(id);
    localStorage.setItem('pp-theme', id);
    applyTheme(getTheme(id));
  }

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
