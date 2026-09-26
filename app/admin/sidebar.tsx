'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Layers,
  Link as LinkIcon,
  Globe,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { logoutAction } from '../login/actions';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard Home', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Projects / Articles', href: '/admin/projects', icon: FileText },
  { label: 'Sections', href: '/admin/sections', icon: Layers },
  { label: 'Social Links', href: '/admin/socials', icon: LinkIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-200">
            Dossier CMS
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 border border-neutral-800"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-neutral-950/95 border-r border-neutral-800/80 backdrop-blur-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 p-5 overflow-y-auto">
          
          {/* Logo / Identity */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-neutral-900">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <span className="font-mono text-sm font-black text-neutral-100">AL</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Admin Console
              </span>
              <span className="font-mono text-xs font-bold text-neutral-200 tracking-wider">
                DOSSIER // PROD
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block">
              Core Management
            </span>

            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? 'bg-neutral-900 text-white font-bold border border-neutral-700/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      active ? 'text-neutral-100' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Secondary External Navigation */}
          <div className="mt-8 space-y-1">
            <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block">
              Live Gateway
            </span>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/50 transition-all border border-transparent hover:border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                <span>Return to Live Site</span>
              </div>
              <span className="text-[10px] text-neutral-600 font-mono">↗</span>
            </Link>
          </div>

        </div>

        {/* Bottom Profile / Session Footer */}
        <div className="p-4 border-t border-neutral-900 bg-neutral-950/80">
          
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-neutral-300 font-bold tracking-wider">
                  Admin Privileges
                </span>
                <span className="font-mono text-[9px] text-neutral-500">
                  AES-256 Validated
                </span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/90 hover:bg-rose-950/30 border border-neutral-800 hover:border-rose-800/50 text-neutral-400 hover:text-rose-300 font-mono text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Terminate Session</span>
            </button>
          </form>

        </div>
      </aside>
    </>
  );
}
