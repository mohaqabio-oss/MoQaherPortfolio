'use client';

import React, { useState } from 'react';
import { Pencil, Check, X, Terminal, Image as ImageIcon } from 'lucide-react';

interface EditableFieldProps {
  id?: string;
  label: string;
  value: string;
  type?: 'text' | 'textarea' | 'image';
  isAdmin?: boolean;
  onSave?: (newValue: string) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
}

export function EditableField({
  label,
  value,
  type = 'text',
  isAdmin = false,
  onSave,
  children,
  className = '',
}: EditableFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVal, setCurrentVal] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // If not admin, render pristine content without overhead
  if (!isAdmin) {
    return <>{children}</>;
  }

  const handleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(currentVal);
      }
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setIsModalOpen(false);
      }, 500);
    } catch (err) {
      console.error('Failed to commit edit:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div
        className={`group relative inline-block transition-all duration-150 ${className} ${
          isAdmin ? 'cursor-pointer hover:ring-1 hover:ring-orange-500/60 hover:bg-orange-500/[0.03] rounded-sm' : ''
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Sleek Floating Cyber-Orange Edit Tag */}
        <div className="absolute -top-3 -right-2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none flex items-center gap-1 bg-orange-500 text-black px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider shadow-cyber-orange">
          <Pencil className="w-2.5 h-2.5" />
          <span>EDIT // {label}</span>
        </div>

        {/* Technical Corner Brackets on Hover */}
        <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-orange-500 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
        <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-orange-500 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />

        {/* Render Original Content */}
        {children}
      </div>

      {/* Minimalist Cyber Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-navy-900 border border-orange-500/40 shadow-2xl p-6 font-mono text-xs overflow-hidden">
            
            {/* Modal Tech Top Strip */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-800 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-orange-500" />
                <span className="uppercase tracking-widest text-[11px] text-slate-200">
                  MUTATION // {label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-orange-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCommit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider text-slate-400">
                  Target Value [{type}]
                </label>

                {type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 p-3 text-slate-200 font-sans text-sm focus:outline-none transition-all leading-relaxed"
                  />
                ) : (
                  <input
                    type="text"
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none transition-all"
                  />
                )}

                {type === 'image' && currentVal && (
                  <div className="mt-2 p-2 bg-navy-950 border border-navy-800 flex items-center gap-3">
                    <ImageIcon className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] text-slate-400 truncate max-w-xs">{currentVal}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-navy-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border border-navy-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors uppercase text-[10px]"
                >
                  [Cancel / Abort]
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold uppercase text-[10px] tracking-wider transition-all disabled:opacity-50"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COMMITTED</span>
                    </>
                  ) : isSaving ? (
                    <span>WRITING...</span>
                  ) : (
                    <span>[COMMIT CHANGE]</span>
                  )}
                </button>
              </div>
            </form>

            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500" />
          </div>
        </div>
      )}
    </>
  );
}
