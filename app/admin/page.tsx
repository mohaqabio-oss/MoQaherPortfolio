'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TipTapEditor } from '@/components/editor/tiptap-editor';
import { ArrowLeft, Save, Eye } from 'lucide-react';

export default function NewCaseStudyPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-generate slug from title
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
    // Submit to Server Action or API Route
    console.log({ title, slug, contentHtml, isDraft });
    setTimeout(() => {
      setIsSaving(false);
      alert('Case study content saved successfully!');
    }, 600);
  };

  return (
    <div className="space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Portfolio
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDraft(!isDraft)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-colors ${
                isDraft
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400'
              }`}
            >
              {isDraft ? 'Draft Status' : 'Live Status'}
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold shadow-lg hover:bg-white transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {isSaving ? 'Persisting...' : 'Save Artifact'}
            </button>
          </div>
        </div>

        {/* Header Title & Slug */}
        <div className="space-y-4 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="space-y-1">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              Dossier Editor // ARTICLE_PROJECT
            </span>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Case Study Headline (e.g. Distributed Consensus Engine)"
              className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-neutral-100 placeholder:text-neutral-600 focus:outline-none tracking-tight"
            />
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-neutral-900 font-mono text-xs text-neutral-400">
            <span className="text-neutral-600">permalink: /works/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="distributed-consensus-engine"
              className="bg-transparent text-neutral-300 focus:outline-none underline decoration-neutral-700"
            />
          </div>
        </div>

        {/* TipTap Rich Text Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              Document Writer & Architecture Narrative
            </span>
            <span className="font-mono text-[11px] text-neutral-500">
              Bilingual TipTap Engine with 10 Google Fonts
            </span>
          </div>

          <TipTapEditor
            initialContent="<h2>System Architecture & Overview</h2><p>Document the distributed architecture, bottlenecks solved, latency benchmarks, and operational telemetry here...</p>"
            onChange={(html) => setContentHtml(html)}
          />
        </div>
      </div>
    );
}

