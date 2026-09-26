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
      <body className="min-h-screen bg-[#080808] text-neutral-100 antialiased selection:bg-neutral-800 selection:text-white overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
