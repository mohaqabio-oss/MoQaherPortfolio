import {
  Cairo,
  Tajawal,
  IBM_Plex_Sans_Arabic,
  Rubik,
  Amiri,
  Inter,
  Plus_Jakarta_Sans,
  Outfit,
  Space_Grotesk,
  Playfair_Display,
} from 'next/font/google';

/**
 * Arabic & Multilingual Fonts (Full Arabic + Latin subsets)
 */
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});

export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-ibm-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const rubik = Rubik({
  subsets: ['arabic', 'latin'],
  variable: '--font-rubik',
  display: 'swap',
  weight: ['400', '500', '700', '800'],
});

export const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  display: 'swap',
  weight: ['400', '700'],
});

/**
 * English & Latin Primary Fonts (Modern, Editorial, & Tech)
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});

/**
 * Combined class string to attach to <html> or <body>
 */
export const fontVariables = [
  cairo.variable,
  tajawal.variable,
  ibmPlexSansArabic.variable,
  rubik.variable,
  amiri.variable,
  inter.variable,
  plusJakartaSans.variable,
  outfit.variable,
  spaceGrotesk.variable,
  playfairDisplay.variable,
].join(' ');

/**
 * TipTap Editor Font Registry
 * Used inside TipTap Font Family dropdown to allow dynamic switching
 */
export interface TipTapFontOption {
  label: string;
  name: string; // Used in font-family CSS declaration
  variable: string;
  category: 'arabic' | 'latin' | 'editorial';
  direction?: 'rtl' | 'ltr';
}

export const TIPTAP_FONT_OPTIONS: TipTapFontOption[] = [
  { label: 'Cairo (كايرو)', name: 'Cairo, sans-serif', variable: 'var(--font-cairo)', category: 'arabic' },
  { label: 'Tajawal (تجوّل)', name: 'Tajawal, sans-serif', variable: 'var(--font-tajawal)', category: 'arabic' },
  { label: 'IBM Plex Arabic (آي بي إم)', name: 'IBM Plex Sans Arabic, sans-serif', variable: 'var(--font-ibm-arabic)', category: 'arabic' },
  { label: 'Rubik (روبيك)', name: 'Rubik, sans-serif', variable: 'var(--font-rubik)', category: 'arabic' },
  { label: 'Amiri (أميري - كلاسيكي)', name: 'Amiri, serif', variable: 'var(--font-amiri)', category: 'arabic' },
  { label: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans, sans-serif', variable: 'var(--font-plus-jakarta)', category: 'latin' },
  { label: 'Inter', name: 'Inter, sans-serif', variable: 'var(--font-inter)', category: 'latin' },
  { label: 'Outfit', name: 'Outfit, sans-serif', variable: 'var(--font-outfit)', category: 'latin' },
  { label: 'Space Grotesk (Tech)', name: 'Space Grotesk, monospace', variable: 'var(--font-space-grotesk)', category: 'latin' },
  { label: 'Playfair Display (Editorial)', name: 'Playfair Display, serif', variable: 'var(--font-playfair)', category: 'editorial' },
];
