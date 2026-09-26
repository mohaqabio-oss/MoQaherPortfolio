'use client';

import React from 'react';
import Link from 'next/link';
import { LanguageToggle } from './language-toggle';
import { Terminal, LogOut, Radio } from 'lucide-react';
import { logoutAction } from '@/app/login/actions';

interface NavbarProps {
  isAdmin?: boolean;
}

const NAV_ITEMS = [
  { label: 'WORKS', href: '#works' },
  { label: 'SECTIONS', href: '#sections' },
  { label: 'DOSSIER', href: '#about' },
  { label: 'CONNECT', href: '#contact' },
];

export function Navbar({ isAdmin = false }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-navy-950/90 border-b border-navy-800/80 backdrop-blur-md">
      {/* Top Cyber Telemetry Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500/80 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Brand / Call-sign */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-navy-900 border border-orange-500/40 text-orange-500 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold tracking-wider text-slate-100 uppercase group-hover:text-orange-400 transition-colors">
              ALEXANDER LEVI
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
              SYS_ARCH // 084
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs tracking-wider">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-400 hover:text-orange-400 transition-colors py-1 relative group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-200" />
            </Link>
          ))}
        </nav>

        {/* Right Section: Language Toggle & Admin State */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isAdmin && (
            <div className="flex items-center gap-2 px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[10px] uppercase tracking-wider">
              <Radio className="w-3 h-3 text-orange-500 animate-pulse" />
              <span className="hidden sm:inline">INLINE EDIT MODE</span>
            </div>
          )}

          <LanguageToggle />

          {isAdmin ? (
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-3 py-1 bg-navy-900 hover:bg-rose-950/40 border border-navy-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 font-mono text-[11px] uppercase tracking-wider transition-all"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">EXIT</span>
              </button>
            </form>
          ) : (
            <Link
              href="/admin"
              className="px-3 py-1 border border-navy-800 hover:border-orange-500/40 text-slate-400 hover:text-orange-400 font-mono text-[11px] uppercase tracking-wider transition-all"
            >
              [LOGIN]
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
