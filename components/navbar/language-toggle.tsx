'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: unknown;
          },
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

    // Read current translation state from cookie or html lang
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

    // Define the global Google Translate init callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ar',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };
  }, []);

  const handleToggle = (lang: 'en' | 'ar') => {
    if (lang === currentLang) return;

    // Set cookie for GTranslate
    const targetVal = lang === 'ar' ? '/en/ar' : '/en/en';
    document.cookie = `googtrans=${targetVal}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${targetVal}; path=/`;

    setCurrentLang(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Trigger translate via hidden select or reload clean
    const selectElem = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (selectElem) {
      selectElem.value = lang;
      selectElem.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  if (!mounted) {
    return <div className="w-24 h-9 rounded-full bg-neutral-900/60 animate-pulse" />;
  }

  return (
    <>
      {/* Hidden Mount Point for Google Translate Element */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* External Google Translate Script */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Sleek Custom Dual Switch */}
      <div
        role="group"
        aria-label="Language selection"
        className="relative inline-flex p-1 rounded-full bg-neutral-900/90 border border-neutral-800/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        {/* Sliding Indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[46px] rounded-full bg-gradient-to-b from-neutral-200 to-neutral-300 shadow-[0_2px_8px_rgba(255,255,255,0.15)] transition-all duration-300 ease-out ${
            currentLang === 'en' ? 'left-1' : 'left-[51px]'
          }`}
        />

        {/* English Button */}
        <button
          type="button"
          onClick={() => handleToggle('en')}
          className={`relative z-10 w-[46px] py-1 text-xs font-semibold tracking-wider transition-colors duration-200 text-center select-none ${
            currentLang === 'en' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          EN
        </button>

        {/* Arabic Button */}
        <button
          type="button"
          onClick={() => handleToggle('ar')}
          className={`relative z-10 w-[46px] py-1 text-xs font-semibold tracking-wider font-sans transition-colors duration-200 text-center select-none ${
            currentLang === 'ar' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          عربي
        </button>
      </div>
    </>
  );
}
