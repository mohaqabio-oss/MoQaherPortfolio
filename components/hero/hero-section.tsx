'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroCanvas } from './hero-canvas';
import { SocialIcons, SocialMediaItem } from './social-icons';
import { EditableField } from '@/components/ui/editable-field';
import { Terminal, Shield, ArrowUpRight, Cpu } from 'lucide-react';

interface HeroSectionProps {
  name?: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  socials: SocialMediaItem[];
  isAdmin?: boolean;
}

export function HeroSection({
  name = 'ALEXANDER LEVI',
  role = 'Staff Systems Architect // Distributed Engines',
  bio = 'Architecting high-concurrency event streams and low-latency storage engines. Rigorous focus on algorithmic efficiency, memory layout, and raw typographic clarity.',
  avatarUrl = '/avatar-placeholder.png',
  socials,
  isAdmin = false,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden cyber-grid">
      {/* 1. Technical Particle Canvas */}
      <HeroCanvas />

      {/* 2. Cyber Subtle Telemetry Lines & Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-tr from-orange-500/[0.04] via-navy-800/20 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* 3. Main Two-Column Viewport */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
        
        {/* Left Column: Technical Dossier */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          {/* Telemetry Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-navy-900 border border-navy-800 text-slate-400 font-mono text-[11px] tracking-wider">
            <span className="w-1.5 h-1.5 bg-orange-500 animate-ping" />
            <span className="text-orange-400">TELEMETRY:</span>
            <span>NODE_ACTIVE // EU-CENTRAL-1</span>
          </div>

          {/* User Name with Editable Wrapper */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-orange-500 uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>PRINCIPAL DOSSIER</span>
            </div>

            <EditableField label="Full Name" value={name} isAdmin={isAdmin}>
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 uppercase leading-[1.05]">
                {name}
              </h1>
            </EditableField>

            <div className="pt-1">
              <EditableField label="Technical Title" value={role} isAdmin={isAdmin}>
                <p className="font-mono text-xs sm:text-sm text-slate-400 tracking-wide">
                  <span className="text-orange-500 font-bold">&gt; </span>
                  {role}
                </p>
              </EditableField>
            </div>
          </div>

          {/* Engineering Bio with Editable Wrapper */}
          <EditableField label="Engineering Bio" value={bio} type="textarea" isAdmin={isAdmin}>
            <p className="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-normal border-l-2 border-orange-500/40 pl-4 py-1">
              {bio}
            </p>
          </EditableField>

          {/* Direct Channels / Connectivity */}
          <div className="pt-2 space-y-2">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-500">
              DIRECT NETWORKS // REPOSITORIES
            </span>
            <SocialIcons items={socials} />
          </div>

          {/* Action Callouts */}
          <div className="pt-4 flex items-center gap-3 flex-wrap font-mono text-xs">
            <Link
              href="#works"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-black font-bold uppercase tracking-wider shadow-cyber-orange transition-all active:scale-95"
            >
              <span>INSPECT ARTIFACTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 border border-navy-800 hover:border-orange-500/50 text-slate-300 font-semibold uppercase tracking-wider transition-all active:scale-95"
            >
              <span>DISPATCH COMMS</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Sharp Technical Cutout Chamber */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative">
            
            {/* Corner Decorative Tech Brackets */}
            <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-orange-500" />
            <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-orange-500" />
            <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-orange-500" />
            <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-orange-500" />

            {/* Chamber Container */}
            <div className="relative w-[300px] sm:w-[350px] lg:w-[380px] h-[410px] sm:h-[470px] lg:h-[500px] bg-navy-900 border border-navy-800 overflow-hidden flex flex-col justify-between p-3 shadow-cyber-subtle">
              
              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-navy-950 border border-navy-800 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-orange-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>IDENT // ARCH-084</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span>SECURE</span>
                </div>
              </div>

              {/* Portrait Image Cutout Area */}
              <div className="relative w-full h-[84%] flex items-end justify-center bg-navy-950/60 border border-navy-800/60 overflow-hidden">
                <EditableField label="Portrait Image URL" value={avatarUrl} type="image" isAdmin={isAdmin} className="w-full h-full flex items-end justify-center">
                  <Image
                    src={avatarUrl}
                    alt={name}
                    width={400}
                    height={520}
                    priority
                    className="object-contain object-bottom max-h-full filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  />
                </EditableField>
              </div>

              {/* Bottom Technical Status Bar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-navy-950 border border-navy-800 font-mono text-[9px] text-slate-400 uppercase">
                <span className="text-orange-400">CLASSIFICATION: LEVEL-4</span>
                <span>CRYPT-VERIFIED</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
