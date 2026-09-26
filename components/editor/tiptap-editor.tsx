'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { TIPTAP_FONT_OPTIONS, TipTapFontOption } from '@/lib/fonts';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo2,
  Redo2,
  ChevronDown,
  Type,
  RemoveFormatting,
  Terminal,
} from 'lucide-react';

interface TipTapEditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function TipTapEditor({
  initialContent = '',
  onChange,
  placeholder = 'Document architecture decisions, performance benchmarks, and findings...',
  editable = true,
}: TipTapEditorProps) {
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFontDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-navy-950 border border-navy-800 p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto my-4',
          },
        },
      }),
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'tiptap focus:outline-none min-h-[460px] p-6 sm:p-10 text-slate-300 font-sans leading-relaxed selection:bg-orange-500/25 selection:text-orange-400',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="w-full h-[520px] bg-navy-950 border border-navy-800 flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
          INITIALIZING_TIPTAP_ENGINE...
        </span>
      </div>
    );
  }

  const currentFontFamily = editor.getAttributes('textStyle').fontFamily;
  const activeFont = TIPTAP_FONT_OPTIONS.find(
    (f) => f.variable === currentFontFamily || f.name === currentFontFamily
  );

  const setFont = (font: TipTapFontOption) => {
    editor.chain().focus().setFontFamily(font.variable).run();
    setFontDropdownOpen(false);
  };

  const clearFont = () => {
    editor.chain().focus().unsetFontFamily().run();
    setFontDropdownOpen(false);
  };

  return (
    <div className="w-full border border-navy-800 bg-navy-950 overflow-hidden transition-all focus-within:border-orange-500/50">
      
      {/* ================= HEADER / FORMATTING TOOLBAR ================= */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-navy-900 border-b border-navy-800">
        
        {/* Left Toolbar Group: Font Selector + Styles */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          
          {/* Custom Font Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setFontDropdownOpen((prev) => !prev)}
              aria-label="Select typography"
              className="flex items-center gap-2 h-7 px-2.5 bg-navy-950 border border-navy-800 hover:border-orange-500/40 text-xs text-slate-300 transition-all focus:outline-none"
            >
              <Type className="w-3.5 h-3.5 text-orange-400" />
              <span
                className="max-w-[140px] truncate"
                style={{ fontFamily: activeFont?.variable || 'inherit' }}
              >
                {activeFont ? activeFont.label.split(' ')[0] : 'Default Font'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {/* Dropdown Menu */}
            {fontDropdownOpen && (
              <div className="absolute top-8 left-0 z-50 w-64 p-1 bg-navy-900 border border-orange-500/40 shadow-2xl max-h-80 overflow-y-auto font-mono text-xs">
                <button
                  type="button"
                  onClick={clearFont}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-slate-400 hover:text-slate-100 hover:bg-navy-950 transition-colors text-left"
                >
                  <span className="text-[10px] uppercase tracking-wider">System Default</span>
                  <RemoveFormatting className="w-3 h-3 text-slate-500" />
                </button>

                <div className="h-px bg-navy-800 my-1" />

                {/* Arabic / Multilingual Group */}
                <div className="px-2 py-0.5 text-[9px] uppercase tracking-wider text-orange-400">
                  // Arabic Technical
                </div>
                {TIPTAP_FONT_OPTIONS.filter((f) => f.category === 'arabic').map((font) => (
                  <button
                    key={font.variable}
                    type="button"
                    onClick={() => setFont(font)}
                    style={{ fontFamily: font.variable }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors text-left ${
                      activeFont?.variable === font.variable
                        ? 'bg-orange-500 text-black font-bold'
                        : 'text-slate-300 hover:bg-navy-950 hover:text-white'
                    }`}
                  >
                    <span>{font.label}</span>
                    <span className="text-[10px] opacity-70">AR</span>
                  </button>
                ))}

                <div className="h-px bg-navy-800 my-1" />

                {/* Latin / Tech Group */}
                <div className="px-2 py-0.5 text-[9px] uppercase tracking-wider text-orange-400">
                  // Latin Technical
                </div>
                {TIPTAP_FONT_OPTIONS.filter((f) => f.category !== 'arabic').map((font) => (
                  <button
                    key={font.variable}
                    type="button"
                    onClick={() => setFont(font)}
                    style={{ fontFamily: font.variable }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors text-left ${
                      activeFont?.variable === font.variable
                        ? 'bg-orange-500 text-black font-bold'
                        : 'text-slate-300 hover:bg-navy-950 hover:text-white'
                    }`}
                  >
                    <span>{font.label}</span>
                    <span className="text-[10px] opacity-70">EN</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-navy-800 mx-1" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('bold')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('italic')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          {/* Strike */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Strikethrough"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('strike')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-navy-800 mx-1" />

          {/* Heading 1 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            aria-label="Heading 1"
            className={`px-1.5 h-7 flex items-center gap-0.5 text-xs transition-all ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>

          {/* Heading 2 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            aria-label="Heading 2"
            className={`px-1.5 h-7 flex items-center gap-0.5 text-xs transition-all ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>

          {/* Heading 3 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            aria-label="Heading 3"
            className={`px-1.5 h-7 flex items-center gap-0.5 text-xs transition-all ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-navy-800 mx-1" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet list"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('bulletList')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>

          {/* Ordered List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Numbered list"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('orderedList')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          {/* Code Block */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            aria-label="Code block"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('codeBlock')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          {/* Blockquote */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Blockquote"
            className={`w-7 h-7 flex items-center justify-center transition-all ${
              editor.isActive('blockquote')
                ? 'bg-orange-500 text-black font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-navy-950'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Group: Undo / Redo */}
        <div className="flex items-center gap-1 font-mono">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label="Undo"
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label="Redo"
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-200 disabled:opacity-30 transition-all"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ================= WRITER CANVAS AREA ================= */}
      <div className="relative bg-navy-950">
        <EditorContent editor={editor} />
      </div>

      {/* ================= STATUS FOOTER ================= */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-navy-900 border-t border-navy-800 text-slate-500 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-orange-500" />
          <span className="uppercase tracking-wider">ENGINE: TIPTAP CYBER-SUITE</span>
        </div>
        <div>
          <span>{editor.state.doc.textContent.split(/\s+/).filter(Boolean).length} WORDS</span>
          <span className="mx-2">•</span>
          <span>{editor.state.doc.textContent.length} CHARS</span>
        </div>
      </div>

    </div>
  );
}
