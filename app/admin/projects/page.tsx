import React from 'react';
import Link from 'next/link';
import { Plus, FileText, ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AdminProjectsPage() {
  let projects: Array<{
    id: string;
    title: string;
    slug: string;
    type: string;
    isDraft: boolean;
    createdAt: Date;
  }> = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
        isDraft: true,
        createdAt: true,
      },
    });
  } catch {
    // If DB is offline
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
            Projects & Case Studies
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            MANAGE DOSSIER ARTIFACTS // CERTIFICATES & ARTICLES
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 mx-auto flex items-center justify-center text-neutral-400">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-mono text-sm text-neutral-300 font-semibold">No Projects Recorded Yet</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Use the TipTap editor to publish your first high-concurrency systems case study or certificate artifact.
          </p>
          <Link
            href="/admin"
            className="inline-block pt-2 text-xs font-mono text-neutral-400 hover:text-white underline decoration-neutral-700"
          >
            Create first case study →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 transition-all"
            >
              <div className="space-y-1">
                <span className="font-semibold text-sm text-neutral-200">{p.title}</span>
                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500">
                  <span>/works/{p.slug}</span>
                  <span>•</span>
                  <span>{p.type}</span>
                  <span>•</span>
                  <span>{p.isDraft ? 'DRAFT' : 'LIVE'}</span>
                </div>
              </div>
              <Link
                href={`/works/${p.slug}`}
                target="_blank"
                className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
