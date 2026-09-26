import React from 'react';
import { Layers } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AdminSectionsPage() {
  let sections: Array<{ id: string; name: string; slug: string; order: number }> = [];

  try {
    sections = await prisma.section.findMany({
      orderBy: { order: 'asc' },
    });
  } catch {
    // DB offline fallback
  }

  const defaultSections = [
    { id: '1', name: 'Programming', slug: 'programming', order: 0 },
    { id: '2', name: 'Academic', slug: 'academic', order: 1 },
    { id: '3', name: 'Creative', slug: 'creative', order: 2 },
    { id: '4', name: 'Voluntary', slug: 'voluntary', order: 3 },
    { id: '5', name: 'Leadership', slug: 'leadership', order: 4 },
  ];

  const displaySections = sections.length > 0 ? sections : defaultSections;

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-900">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
          Activity Sections & Taxonomy
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1">
          CONFIGURE ACTIVITY CATEGORIZATION HIERARCHY
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {displaySections.map((sec, idx) => (
          <div
            key={sec.id}
            className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-mono text-xs text-neutral-400 font-bold">
                {idx + 1}
              </span>
              <div>
                <span className="font-semibold text-sm text-neutral-200">{sec.name}</span>
                <span className="block font-mono text-[11px] text-neutral-500">slug: {sec.slug}</span>
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              Order {sec.order}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
