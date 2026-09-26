'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EditableField } from '@/components/ui/editable-field';
import { ArrowUpRight, Award, FileCode2, Layers, Plus } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  type: 'CERTIFICATE' | 'ARTICLE_PROJECT';
  coverImage?: string | null;
  issuer?: string | null;
  date?: Date | null;
  content?: string | null;
  screenshots: string[];
  isDraft: boolean;
  categoryId: string;
}

export interface SectionItem {
  id: string;
  name: string;
  slug: string;
  order: number;
  projects: ProjectItem[];
}

interface SectionsViewProps {
  sections: SectionItem[];
  isAdmin?: boolean;
}

export function SectionsView({ sections, isAdmin = false }: SectionsViewProps) {
  return (
    <section id="works" className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-24">
      {sections.map((section, sIdx) => (
        <div key={section.id} id={section.slug} className="space-y-8">
          
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-navy-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-orange-500">
                0{sIdx + 1} //
              </span>
              <EditableField label="Section Name" value={section.name} isAdmin={isAdmin}>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-slate-100">
                  {section.name}
                </h2>
              </EditableField>
            </div>

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1 bg-navy-900 border border-orange-500/40 hover:border-orange-500 text-orange-400 font-mono text-[10px] uppercase tracking-wider transition-all"
              >
                <Plus className="w-3 h-3" />
                <span>Add Record</span>
              </Link>
            )}
          </div>

          {/* Grid of Projects / Certificates */}
          {section.projects.length === 0 ? (
            <div className="p-8 bg-navy-900/40 border border-navy-800/80 font-mono text-xs text-slate-500 flex items-center justify-between">
              <span>NO ARTIFACTS CURRENTLY INDEXED UNDER {section.name.toUpperCase()}</span>
              {isAdmin && (
                <span className="text-orange-400">&gt; AWAITING INGESTION</span>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative bg-navy-900 border border-navy-800 hover:border-orange-500/60 transition-all duration-200 flex flex-col justify-between p-5 overflow-hidden"
                >
                  {/* Top Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span className="flex items-center gap-1.5 text-orange-400">
                        {proj.type === 'CERTIFICATE' ? (
                          <>
                            <Award className="w-3 h-3" />
                            <span>CERTIFICATE</span>
                          </>
                        ) : (
                          <>
                            <FileCode2 className="w-3 h-3" />
                            <span>CASE STUDY</span>
                          </>
                        )}
                      </span>

                      {proj.isDraft && (
                        <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                          DRAFT
                        </span>
                      )}
                    </div>

                    {/* Image Preview for Certificate or Screenshots */}
                    {proj.coverImage && (
                      <div className="relative w-full h-44 bg-navy-950 border border-navy-800 overflow-hidden">
                        <Image
                          src={proj.coverImage}
                          alt={proj.title}
                          fill
                          className="object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* Project Title with Editable Wrapper */}
                    <EditableField label="Project Title" value={proj.title} isAdmin={isAdmin}>
                      <h3 className="font-heading text-lg font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                        {proj.title}
                      </h3>
                    </EditableField>

                    {/* Issuer / Date for Certificate */}
                    {proj.type === 'CERTIFICATE' && proj.issuer && (
                      <EditableField label="Issuer" value={proj.issuer} isAdmin={isAdmin}>
                        <p className="font-mono text-xs text-slate-400">
                          Authority: <span className="text-slate-300 font-semibold">{proj.issuer}</span>
                        </p>
                      </EditableField>
                    )}
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-6 mt-4 border-t border-navy-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-[10px] text-slate-500">/works/{proj.slug}</span>
                    <Link
                      href={`/works/${proj.slug}`}
                      className="flex items-center gap-1 text-slate-300 hover:text-orange-400 transition-colors font-bold uppercase tracking-wider text-[11px]"
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      ))}
    </section>
  );
}
