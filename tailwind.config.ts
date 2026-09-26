import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050810',
        foreground: '#e2e8f0',
        navy: {
          800: '#11182c',
          900: '#0a0f1d',
          950: '#050810',
        },
        orange: {
          400: '#ff8c33',
          500: '#ff6a00',
          600: '#e05300',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
        arabic: ['var(--font-ibm-arabic)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
      boxShadow: {
        'cyber-orange': '0 0 20px -3px rgba(255, 106, 0, 0.35)',
        'cyber-subtle': '0 0 15px -2px rgba(10, 15, 29, 0.8)',
      },
    },
  },
  plugins: [],
};

export default config;
