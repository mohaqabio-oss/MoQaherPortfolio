import React from 'react';
import { prisma } from '@/lib/prisma';
import { Share2 } from 'lucide-react';

export default async function AdminSocialsPage() {
  let socials: Array<{ id: string; platformName: string; url: string; iconName: string; isVisible: boolean }> = [];

  try {
    socials = await prisma.socialMedia.findMany({
      orderBy: { order: 'asc' },
    });
  } catch {
    // DB offline
  }

  const defaultSocials = [
    { id: '1', platformName: 'GitHub', url: 'https://github.com', iconName: 'github', isVisible: true },
    { id: '2', platformName: 'LinkedIn', url: 'https://linkedin.com', iconName: 'linkedin', isVisible: true },
    { id: '3', platformName: 'X / Twitter', url: 'https://x.com', iconName: 'x', isVisible: true },
    { id: '4', platformName: 'Telegram', url: 'https://t.me', iconName: 'telegram', isVisible: true },
    { id: '5', platformName: 'Discord', url: 'https://discord.com', iconName: 'discord', isVisible: true },
  ];

  const displaySocials = socials.length > 0 ? socials : defaultSocials;

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-900">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
          Hero Connectivity & Channels
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1">
          MANAGE DYNAMIC HERO SECTION SOCIAL ICONS
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displaySocials.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80"
          >
            <div>
              <span className="font-semibold text-sm text-neutral-200">{item.platformName}</span>
              <span className="block font-mono text-[11px] text-neutral-500 truncate max-w-[200px]">
                {item.url}
              </span>
            </div>
            <span
              className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-md ${
                item.isVisible
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}
            >
              {item.isVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
