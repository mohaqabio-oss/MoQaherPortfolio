'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TipTapEditor } from '@/components/editor/tiptap-editor';
import { ArrowLeft, Save, Terminal, Shield } from 'lucide-react';

export default function AdminProjectsWriterPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Persist to database
    console.log({ title, slug, contentHtml, isDraft });
    setTimeout(() => {
      setIsSaving(false);
      alert('Case study artifact committed to dossier.');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 p-4 sm:p-8 lg:p-12 cyber-grid">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-navy-800">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            [BACK TO INLINE VIEWPORT]
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDraft(!isDraft)}
              className={`px-3 py-1 font-mono text-xs border transition-colors ${
                isDraft
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}
            >
              {isDraft ? '// STATUS: DRAFT' : '// STATUS: LIVE'}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-cyber-orange transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'COMMITTING...' : '[COMMIT CASE STUDY]'}</span>
            </button>
          </div>
        </div>

        {/* Title and Metadata Inputs */}
        <div className="bg-navy-900 border border-navy-800 p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-orange-500">
            <Terminal className="w-3.5 h-3.5" />
            <span>METADATA // DOSSIER ARTICLE ARTIFACT</span>
          </div>

          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Case Study Headline (e.g. Distributed Consensus Engine)"
            className="w-full bg-navy-950 border border-navy-800 focus:border-orange-500 text-xl sm:text-2xl font-heading font-bold text-slate-100 placeholder:text-slate-600 px-4 py-3 focus:outline-none transition-all"
          />

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span>PERMALINK: /works/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="distributed-consensus-engine"
              className="bg-navy-950 border border-navy-800 focus:border-orange-500 text-orange-400 px-2 py-1 focus:outline-none"
            />
          </div>
        </div>

        {/* TipTap Technical Document Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-slate-500">
            <span>ARCHITECTURE & NARRATIVE DOCUMENT</span>
            <span className="text-orange-400">ENGINE: TIPTAP BILINGUAL SUITE</span>
          </div>

          <TipTapEditor
            initialContent="<h2>System Architecture & Overview</h2><p>Document the distributed architecture, bottlenecks solved, latency benchmarks, and operational telemetry here...</p>"
            onChange={(html) => setContentHtml(html)}
          />
        </div>

      </div>
    </div>
  );
}
