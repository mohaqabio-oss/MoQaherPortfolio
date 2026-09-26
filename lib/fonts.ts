import {
  Space_Grotesk,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  IBM_Plex_Sans_Arabic,
  Cairo,
} from 'next/font/google';

/**
 * TECHNICAL / CYBER / MINIMAL FONT SUITE
 */

// 1. Headings: Space Grotesk (Sharp, technical, brutalist geometric)
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '600', '700'],
});

// 2. Metadata / Code / Tags / Technical Accents: JetBrains Mono
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '700'],
});

// 3. Body: Plus Jakarta Sans (Clean, high-legibility contemporary sans)
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// 4. Arabic Technical: IBM Plex Sans Arabic (Engineering & editorial clarity)
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-ibm-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// 5. Arabic Cyber Display: Cairo (High-contrast, geometric)
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['600', '700', '900'],
});

export const fontVariables = [
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  plusJakarta.variable,
  ibmPlexSansArabic.variable,
  cairo.variable,
].join(' ');

/**
 * TipTap Editor Font Registry (Updated for Cyber/Minimal Suite)
 */
export interface TipTapFontOption {
  label: string;
  name: string;
  variable: string;
  category: 'arabic' | 'latin';
}

export const TIPTAP_FONT_OPTIONS: TipTapFontOption[] = [
  { label: 'Space Grotesk (Tech Heading)', name: 'Space Grotesk, sans-serif', variable: 'var(--font-space-grotesk)', category: 'latin' },
  { label: 'JetBrains Mono (Console/Code)', name: 'JetBrains Mono, monospace', variable: 'var(--font-jetbrains)', category: 'latin' },
  { label: 'Plus Jakarta (Clean Body)', name: 'Plus Jakarta Sans, sans-serif', variable: 'var(--font-jakarta)', category: 'latin' },
  { label: 'IBM Plex Arabic (آي بي إم تقني)', name: 'IBM Plex Sans Arabic, sans-serif', variable: 'var(--font-ibm-arabic)', category: 'arabic' },
  { label: 'Cairo (كايرو هندسي)', name: 'Cairo, sans-serif', variable: 'var(--font-cairo)', category: 'arabic' },
];
