'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroCanvas } from './hero-canvas';
import { SocialIcons, SocialMediaItem } from './social-icons';

interface HeroSectionProps {
  name?: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  socials: SocialMediaItem[];
}

export function HeroSection({
  name = 'ALEXANDER LEVI',
  role = 'Staff Systems Architect & Creative Technologist',
  bio = 'Architecting high-concurrency distributed engines and bespoke web interfaces. Obsessed with micro-interactions, low-latency data streams, and raw typographic clarity.',
  avatarUrl = '/profile-cutout.png',
  socials,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* 1. Interactive Ambient WebGL/Canvas Mesh */}
      <HeroCanvas />

      {/* 2. Ambient Focal Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-neutral-800/20 via-neutral-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[250px] bg-gradient-to-br from-amber-500/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* 3. Main Grid Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Authentic Typographic Architecture */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-300">
              Open to high-impact projects • 2026/2027
            </span>
          </div>

          {/* User Name with Advanced CSS Text Effects (Raw, Brutalist-Editorial, Metallic Gradient) */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              <span className="block font-mono text-xs uppercase tracking-[0.35em] text-neutral-500 mb-1">
                Portfolio & Dossier
              </span>
              <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] selection:text-white">
                {name}
              </span>
            </h1>
            <p className="font-mono text-sm sm:text-base text-neutral-400 tracking-wide font-medium">
              {role}
            </p>
          </div>

          {/* Editorial Bio */}
          <p className="max-w-xl text-neutral-400 text-sm sm:text-base leading-relaxed font-sans font-light">
            {bio}
          </p>

          {/* Social Icons Bar (Dynamic from DB) */}
          <div className="pt-2">
            <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3">
              Direct Channels / Connectivity
            </span>
            <SocialIcons items={socials} />
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex items-center gap-4 flex-wrap">
            <Link
              href="#works"
              className="relative group px-6 py-3 rounded-xl bg-neutral-100 text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold shadow-[0_8px_20px_-4px_rgba(255,255,255,0.2)] hover:bg-white hover:shadow-[0_12px_28px_-4px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
            >
              Explore Index / Works
            </Link>

            <Link
              href="#contact"
              className="px-6 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-500 text-neutral-300 font-mono text-xs uppercase tracking-wider font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-300 active:scale-95"
            >
              Initiate Contact
            </Link>
          </div>
        </div>

        {/* Right Column: Neumorphism / Glassmorphism Cutout Profile Chamber */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group">
            
            {/* Ambient Radial Rim Light */}
            <div className="absolute -inset-1 rounded-[38px] bg-gradient-to-b from-neutral-500/20 via-neutral-700/10 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Sculpted Outer Neumorphic Shell */}
            <div className="relative w-[300px] sm:w-[350px] lg:w-[380px] h-[400px] sm:h-[460px] lg:h-[490px] rounded-[36px] bg-gradient-to-b from-neutral-900/90 via-neutral-950/95 to-black border border-neutral-800/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.8),0_24px_48px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-4 flex flex-col justify-between overflow-hidden">
              
              {/* Inner Glass Chamber */}
              <div className="relative w-full h-full rounded-[26px] bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 border border-neutral-800/50 overflow-hidden flex items-end justify-center">
                
                {/* Tech Grid Watermark Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Diagonal Specular Sheen Stripe */}
                <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-25deg] pointer-events-none" />

                {/* Profile Cutout Image Container */}
                <div className="relative w-full h-[90%] flex items-end justify-center">
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={400}
                    height={520}
                    priority
                    className="object-contain object-bottom max-h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Bottom Architectural Monogram Strip */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-md">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                    ID // 084-SYS
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Offset Floating Code Badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 px-4 py-2.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-[0_16px_32px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center font-mono text-xs font-bold text-neutral-200">
                &lt;/&gt;
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Engineered in</span>
                <span className="font-mono text-xs font-semibold text-neutral-200">Next.js & Prisma</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
