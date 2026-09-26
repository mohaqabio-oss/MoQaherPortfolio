import type { Metadata } from 'next';
import './globals.css';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Alexander Levi — Staff Systems Architect & Creative Technologist',
  description:
    'Engineering high-concurrency distributed engines and bespoke web interfaces. Dossier, verified credentials, and software artifacts.',
  keywords: ['Software Engineer', 'Systems Architect', 'Next.js', 'Distributed Systems', 'Portfolio'],
  authors: [{ name: 'Alexander Levi' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="min-h-screen bg-navy-950 text-slate-200 antialiased selection:bg-orange-500/20 selection:text-orange-400 overflow-x-hidden font-sans">
        {children}
      </body>
    </html>

  );
}
