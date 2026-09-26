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
  placeholder = 'Write your case study, system architecture decisions, and project findings...',
  editable = true,
}: TipTapEditorProps) {
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
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
            class: 'rounded-xl bg-neutral-900 border border-neutral-800 p-4 font-mono text-xs sm:text-sm text-neutral-200 shadow-inner overflow-x-auto my-4',
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
          'tiptap prose prose-invert max-w-none focus:outline-none min-h-[460px] p-6 sm:p-10 text-neutral-300 font-sans leading-relaxed selection:bg-neutral-700/60 selection:text-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="w-full h-[520px] rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col items-center justify-center gap-3 animate-pulse">
        <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-neutral-300 animate-spin" />
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          Initializing Engine...
        </span>
      </div>
    );
  }

  // Determine current active font
  const currentFontFamily = editor.getAttributes('textStyle').fontFamily;
  const activeFont = TIPTAP_FONT_OPTIONS.find(
    (f) => f.variable === currentFontFamily || f.name === currentFontFamily
  );

  const setFont = (font: TipTapFontOption) => {
    // Apply CSS variable font-family (mapped globally in layout.tsx)
    editor.chain().focus().setFontFamily(font.variable).run();
    setFontDropdownOpen(false);
  };

  const clearFont = () => {
    editor.chain().focus().unsetFontFamily().run();
    setFontDropdownOpen(false);
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-800/90 bg-neutral-950/95 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden transition-all duration-300 focus-within:border-neutral-700">
      
      {/* ================= HEADER / FORMATTING TOOLBAR ================= */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-neutral-900/95 border-b border-neutral-800/80 backdrop-blur-xl">
        
        {/* Left Toolbar Group: Font Selector + Styles */}
        <div className="flex flex-wrap items-center gap-1.5">
          
          {/* Custom Font Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setFontDropdownOpen((prev) => !prev)}
              aria-label="Select typography"
              className="flex items-center gap-2 h-8 px-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-200 shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-neutral-600"
            >
              <Type className="w-3.5 h-3.5 text-neutral-400" />
              <span
                className="max-w-[130px] truncate"
                style={{ fontFamily: activeFont?.variable || 'inherit' }}
              >
                {activeFont ? activeFont.label.split(' ')[0] : 'Default Font'}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-500 transition-transform duration-200" />
            </button>

            {/* Dropdown Menu */}
            {fontDropdownOpen && (
              <div className="absolute top-10 left-0 z-50 w-64 p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 shadow-[0_16px_36px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl max-h-80 overflow-y-auto">
                <button
                  type="button"
                  onClick={clearFont}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/80 transition-colors text-left"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider">System Default</span>
                  <RemoveFormatting className="w-3 h-3 text-neutral-500" />
                </button>

                <div className="h-px bg-neutral-800/80 my-1" />

                {/* Arabic / Multilingual Group */}
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Arabic & Multilingual
                </div>
                {TIPTAP_FONT_OPTIONS.filter((f) => f.category === 'arabic').map((font) => (
                  <button
                    key={font.variable}
                    type="button"
                    onClick={() => setFont(font)}
                    style={{ fontFamily: font.variable }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                      activeFont?.variable === font.variable
                        ? 'bg-neutral-800/90 text-white font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-900/70 hover:text-white'
                    }`}
                  >
                    <span>{font.label}</span>
                    <span className="font-mono text-[10px] text-neutral-500 font-normal">AR/EN</span>
                  </button>
                ))}

                <div className="h-px bg-neutral-800/80 my-1" />

                {/* Latin / Editorial Group */}
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Latin & Editorial
                </div>
                {TIPTAP_FONT_OPTIONS.filter((f) => f.category !== 'arabic').map((font) => (
                  <button
                    key={font.variable}
                    type="button"
                    onClick={() => setFont(font)}
                    style={{ fontFamily: font.variable }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                      activeFont?.variable === font.variable
                        ? 'bg-neutral-800/90 text-white font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-900/70 hover:text-white'
                    }`}
                  >
                    <span>{font.label}</span>
                    <span className="font-mono text-[10px] text-neutral-500 font-normal">EN</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-neutral-800 mx-1" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            aria-label="Bold"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('bold')
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            aria-label="Italic"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('italic')
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* Strike */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            aria-label="Strikethrough"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('strike')
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-neutral-800 mx-1" />

          {/* Heading 1 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            aria-label="Heading 1"
            className={`px-2 h-8 rounded-lg flex items-center gap-1 font-mono text-xs font-bold transition-all ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Heading1 className="w-4 h-4" />
          </button>

          {/* Heading 2 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            aria-label="Heading 2"
            className={`px-2 h-8 rounded-lg flex items-center gap-1 font-mono text-xs font-bold transition-all ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Heading2 className="w-4 h-4" />
          </button>

          {/* Heading 3 */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            aria-label="Heading 3"
            className={`px-2 h-8 rounded-lg flex items-center gap-1 font-mono text-xs font-bold transition-all ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-neutral-800 mx-1" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet list"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('bulletList')
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <List className="w-4 h-4" />
          </button>

          {/* Ordered List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Numbered list"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('orderedList')
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* Code Block */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            aria-label="Code block"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('codeBlock')
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Code className="w-4 h-4" />
          </button>

          {/* Blockquote */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Blockquote"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              editor.isActive('blockquote')
                ? 'bg-neutral-800 text-white border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        {/* Right Toolbar Group: History Operations */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label="Undo"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label="Redo"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= WRITER CANVAS AREA ================= */}
      <div className="relative bg-neutral-950/70">
        <EditorContent editor={editor} />
      </div>

      {/* ================= DOCUMENT STATUS FOOTER ================= */}
      <div className="flex items-center justify-between px-6 py-2 bg-neutral-950 border-t border-neutral-900 text-neutral-500 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          <span className="uppercase tracking-wider">TipTap Engine Ready</span>
        </div>
        <div>
          <span>{editor.storage.characterCount?.words?.() ?? editor.state.doc.textContent.split(/\s+/).filter(Boolean).length} words</span>
          <span className="mx-2">•</span>
          <span>{editor.state.doc.textContent.length} characters</span>
        </div>
      </div>

    </div>
  );
}
