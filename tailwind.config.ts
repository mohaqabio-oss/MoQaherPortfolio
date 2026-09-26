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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        // Arabic & Bilingual
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        'ibm-arabic': ['var(--font-ibm-arabic)', 'sans-serif'],
        rubik: ['var(--font-rubik)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],

        // English & Latin
        inter: ['var(--font-inter)', 'sans-serif'],
        'plus-jakarta': ['var(--font-plus-jakarta)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'monospace'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
