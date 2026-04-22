export type Theme = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  vars: {
    '--ink': string;
    '--bg': string;
    '--card': string;
    '--sun': string;
    '--sky': string;
    '--leaf': string;
    '--rose': string;
    '--ash': string;
    '--danger': string;
    '--text': string;
    '--muted': string;
    '--shadow': string;
  };
};

export const themes: Theme[] = [
  {
    id: 'sun',
    name: 'Sun Cream',
    emoji: '☀️',
    description: 'Warm yellow neobrutalist — the default',
    vars: {
      '--ink': '#0f172a',
      '--bg': '#fef3c7',
      '--card': '#ffffff',
      '--sun': '#facc15',
      '--sky': '#dbeafe',
      '--leaf': '#dcfce7',
      '--rose': '#fce7f3',
      '--ash': '#f1f5f9',
      '--danger': '#fef2f2',
      '--text': '#0f172a',
      '--muted': '#64748b',
      '--shadow': '#0f172a',
    },
  },
  {
    id: 'amazon',
    name: 'Commerce Blue',
    emoji: '🛒',
    description: 'Amazon-inspired navy + orange',
    vars: {
      '--ink': '#0f1111',
      '--bg': '#eaeded',
      '--card': '#ffffff',
      '--sun': '#ff9900',
      '--sky': '#232f3e',
      '--leaf': '#067d62',
      '--rose': '#c45500',
      '--ash': '#f3f3f3',
      '--danger': '#fff0ee',
      '--text': '#0f1111',
      '--muted': '#565959',
      '--shadow': '#232f3e',
    },
  },
  {
    id: 'flipkart',
    name: 'Sky Pop',
    emoji: '🌤️',
    description: 'Bright sky blue + marketplace yellow',
    vars: {
      '--ink': '#172337',
      '--bg': '#eaf4ff',
      '--card': '#ffffff',
      '--sun': '#ffe500',
      '--sky': '#2874f0',
      '--leaf': '#388e3c',
      '--rose': '#ff6161',
      '--ash': '#e5eaf0',
      '--danger': '#fff3f3',
      '--text': '#172337',
      '--muted': '#878787',
      '--shadow': '#172337',
    },
  },
  {
    id: 'dark',
    name: 'Dark Pro',
    emoji: '🌙',
    description: 'Linear / Raycast style with lime accent',
    vars: {
      '--ink': '#fafafa',
      '--bg': '#0a0a0a',
      '--card': '#171717',
      '--sun': '#a3e635',
      '--sky': '#1e3a8a',
      '--leaf': '#14532d',
      '--rose': '#7f1d1d',
      '--ash': '#262626',
      '--danger': '#450a0a',
      '--text': '#fafafa',
      '--muted': '#a3a3a3',
      '--shadow': '#000000',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Slate',
    emoji: '⚪',
    description: 'Calm, quiet, Linear-inspired',
    vars: {
      '--ink': '#0f172a',
      '--bg': '#fafafa',
      '--card': '#ffffff',
      '--sun': '#6366f1',
      '--sky': '#e0e7ff',
      '--leaf': '#d1fae5',
      '--rose': '#fce7f3',
      '--ash': '#f1f5f9',
      '--danger': '#fee2e2',
      '--text': '#0f172a',
      '--muted': '#64748b',
      '--shadow': '#cbd5e1',
    },
  },
  {
    id: 'vibrant',
    name: 'Vibrant Pop',
    emoji: '🌈',
    description: 'Hot pink + teal — Gumroad energy',
    vars: {
      '--ink': '#18181b',
      '--bg': '#fdf2f8',
      '--card': '#ffffff',
      '--sun': '#ec4899',
      '--sky': '#ccfbf1',
      '--leaf': '#bbf7d0',
      '--rose': '#fef3c7',
      '--ash': '#f4f4f5',
      '--danger': '#fecaca',
      '--text': '#18181b',
      '--muted': '#71717a',
      '--shadow': '#18181b',
    },
  },
];

export const defaultThemeId = 'sun';

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
