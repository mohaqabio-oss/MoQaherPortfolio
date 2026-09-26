'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const match = document.cookie.match(/(^|;\s*)googtrans=([^;]+)/);
    if (match && match[2].includes('/ar')) {
      setCurrentLang('ar');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      setCurrentLang('en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,ar', autoDisplay: false },
          'google_translate_element'
        );
      }
    };
  }, []);

  const handleToggle = (lang: 'en' | 'ar') => {
    if (lang === currentLang) return;
    const targetVal = lang === 'ar' ? '/en/ar' : '/en/en';
    document.cookie = `googtrans=${targetVal}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${targetVal}; path=/`;

    setCurrentLang(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    const selectElem = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectElem) {
      selectElem.value = lang;
      selectElem.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  if (!mounted) {
    return <div className="w-20 h-7 bg-navy-900 border border-navy-800 animate-pulse" />;
  }

  return (
    <>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      <div
        role="group"
        aria-label="Language selector"
        className="relative inline-flex bg-navy-950 border border-navy-800 p-0.5 font-mono text-[11px]"
      >
        <button
          type="button"
          onClick={() => handleToggle('en')}
          className={`px-2.5 py-1 uppercase tracking-wider transition-all ${
            currentLang === 'en'
              ? 'bg-orange-500 text-black font-bold shadow-cyber-orange'
              : 'text-slate-400 hover:text-slate-200 hover:bg-navy-900'
          }`}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => handleToggle('ar')}
          className={`px-2.5 py-1 uppercase tracking-wider font-arabic transition-all ${
            currentLang === 'ar'
              ? 'bg-orange-500 text-black font-bold shadow-cyber-orange'
              : 'text-slate-400 hover:text-slate-200 hover:bg-navy-900'
          }`}
        >
          عربي
        </button>
      </div>
    </>
  );
}
