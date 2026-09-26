'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LanguageToggle } from './language-toggle';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Works', href: '#works' },
  { label: 'Journey', href: '#journey' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/70 border border-neutral-800/80 shadow-[0_16px_36px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl'
            : 'bg-neutral-950/40 border border-neutral-800/40 backdrop-blur-md'
        }`}
      >
        {/* Brand Monogram */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-lg"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group-hover:border-neutral-500 transition-colors">
            <span className="font-mono text-sm font-black tracking-widest text-neutral-100 group-hover:scale-105 transition-transform">
              AL
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 group-hover:text-neutral-200 transition-colors">
            Engineering / Design
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-900/40 border border-neutral-800/50">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-1 text-xs uppercase tracking-wider font-mono text-neutral-400 hover:text-neutral-100 transition-colors rounded-full hover:bg-neutral-800/60"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section: Language Toggle & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageToggle />

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 hover:border-neutral-500 rounded-xl transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] active:scale-95"
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
