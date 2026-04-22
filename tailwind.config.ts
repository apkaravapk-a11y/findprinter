import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        bg: 'var(--bg)',
        card: 'var(--card)',
        cream: 'var(--bg)',
        sun: 'var(--sun)',
        sky: 'var(--sky)',
        leaf: 'var(--leaf)',
        rose: 'var(--rose)',
        ash: 'var(--ash)',
        danger: 'var(--danger)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      boxShadow: {
        brut: '6px 6px 0 var(--shadow)',
        brutSm: '3px 3px 0 var(--shadow)',
        brutLg: '10px 10px 0 var(--shadow)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
