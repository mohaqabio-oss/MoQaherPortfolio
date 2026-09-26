import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/navbar/navbar';
import { HeroSection } from '@/components/hero/hero-section';
import { SectionsView, SectionItem } from '@/components/sections/sections-view';
import { SocialMediaItem } from '@/components/hero/social-icons';
import { logoutAction } from '@/app/login/actions';
import { Terminal, Shield, Plus, LogOut, ExternalLink } from 'lucide-react';

const FALLBACK_SOCIALS: SocialMediaItem[] = [
  { id: '1', platformName: 'GitHub', url: 'https://github.com', iconName: 'github', isVisible: true },
  { id: '2', platformName: 'LinkedIn', url: 'https://linkedin.com', iconName: 'linkedin', isVisible: true },
  { id: '3', platformName: 'X / Twitter', url: 'https://x.com', iconName: 'x', isVisible: true },
  { id: '4', platformName: 'Telegram', url: 'https://t.me', iconName: 'telegram', isVisible: true },
  { id: '5', platformName: 'Discord', url: 'https://discord.com', iconName: 'discord', isVisible: true },
];

const FALLBACK_SECTIONS: SectionItem[] = [
  {
    id: 'sec-1',
    name: 'Programming & Distributed Systems',
    slug: 'programming',
    order: 0,
    projects: [
      {
        id: 'p-1',
        title: 'Distributed Log Consensus Engine',
        slug: 'distributed-consensus-engine',
        type: 'ARTICLE_PROJECT',
        coverImage: null,
        screenshots: [],
        isDraft: false,
        categoryId: 'sec-1',
      },
      {
        id: 'p-2',
        title: 'Zero-Copy Network Packet Multiplexer',
        slug: 'zero-copy-multiplexer',
        type: 'ARTICLE_PROJECT',
        coverImage: null,
        screenshots: [],
        isDraft: false,
        categoryId: 'sec-1',
      },
    ],
  },
  {
    id: 'sec-2',
    name: 'Academic & Formal Accreditations',
    slug: 'academic',
    order: 1,
    projects: [
      {
        id: 'p-3',
        title: 'Certified Kubernetes Security Specialist (CKS)',
        slug: 'certified-k8s-security',
        type: 'CERTIFICATE',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        coverImage: null,
        screenshots: [],
        isDraft: false,
        categoryId: 'sec-2',
      },
    ],
  },
  {
    id: 'sec-3',
    name: 'Leadership & Architecture Advisory',
    slug: 'leadership',
    order: 2,
    projects: [],
  },
];

export const dynamic = 'force-dynamic';

export default async function AdminLiveInlinePage() {
  let socials: SocialMediaItem[] = FALLBACK_SOCIALS;
  let sections: SectionItem[] = FALLBACK_SECTIONS;

  try {
    const [dbSocials, dbSections] = await Promise.all([
      prisma.socialMedia.findMany({
        orderBy: { order: 'asc' },
      }),
      prisma.section.findMany({
        orderBy: { order: 'asc' },
        include: {
          projects: {
            orderBy: { order: 'asc' },
          },
        },
      }),
    ]);

    if (dbSocials.length > 0) socials = dbSocials;
    if (dbSections.length > 0) sections = dbSections as SectionItem[];
  } catch {
    // If DB is offline
  }

  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-200">
      
      {/* 1. Global Floating Admin Telemetry HUD Strip */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 bg-navy-900/95 border border-orange-500/50 shadow-2xl backdrop-blur-xl font-mono text-xs">
        <div className="flex items-center gap-2 pr-3 border-r border-navy-800">
          <span className="w-2 h-2 bg-orange-500 rounded-none animate-pulse" />
          <span className="font-bold text-orange-400">INLINE CMS ACTIVE</span>
          <span className="text-[10px] text-slate-500 hidden sm:inline">[HOVER ELEMENTS TO EDIT]</span>
        </div>

        <Link
          href="/admin/projects"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500 hover:bg-orange-400 text-black font-bold uppercase text-[10px] tracking-wider transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Case Study</span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-200 text-[10px] uppercase transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <form action={logoutAction} className="pl-2 border-l border-navy-800">
          <button
            type="submit"
            title="Terminate privileged session"
            className="flex items-center gap-1 text-rose-400 hover:text-rose-300 text-[10px] uppercase font-bold transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">EXIT</span>
          </button>
        </form>
      </div>

      {/* 2. Live Navbar in Admin Mode (shows ADMIN status tag) */}
      <Navbar isAdmin={true} />

      {/* 3. Live Hero Section in Admin Mode (all fields are wrapped in EditableField) */}
      <HeroSection
        name="ALEXANDER LEVI"
        role="Staff Systems Architect // Distributed Engines"
        bio="Architecting high-concurrency event streams and low-latency storage engines. Rigorous focus on algorithmic efficiency, memory layout, and raw typographic clarity."
        avatarUrl="/avatar-placeholder.png"
        socials={socials}
        isAdmin={true}
      />

      {/* 4. Live Sections View in Admin Mode (all section titles & projects have inline edit tags) */}
      <SectionsView sections={sections} isAdmin={true} />
    </div>
  );
}
