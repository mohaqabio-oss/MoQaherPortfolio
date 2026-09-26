'use client';

import React, { useState, useTransition } from 'react';
import { loginAction } from './actions';
import { Lock, KeyRound, Eye, EyeOff, ArrowRight, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('password', password);

    startTransition(async () => {
      const res = await loginAction(null, formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#080808] overflow-hidden selection:bg-neutral-800 selection:text-white">
      
      {/* Background Ambient Radial Specular Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-gradient-to-tr from-neutral-800/15 via-neutral-700/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Main Glassmorphic / Neumorphic Authentication Chamber */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Ambient Outer Halo */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-b from-neutral-600/20 via-neutral-800/10 to-transparent blur-xl opacity-60" />

        <div className="relative rounded-[28px] bg-neutral-950/90 border border-neutral-800/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.8),0_24px_48px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-8 sm:p-10 overflow-hidden">
          
          {/* Subtle Top Diagonal Specular Sheen */}
          <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-25deg] pointer-events-none" />

          {/* Header Monogram & Status */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <Lock className="w-4 h-4 text-neutral-200" />
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Dossier Console
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-200">
                  Restricted Gateway
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                L-4 AUTH
              </span>
            </div>
          </div>

          {/* Title & Technical Advisory */}
          <div className="space-y-1.5 mb-6">
            <h1 className="text-xl font-bold tracking-tight text-neutral-100">
              Administrative Sign-In
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Enter your privileged decryption key to access the portfolio CMS and telemetry pipeline.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Password Input with Specular Inset & Toggle */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400"
              >
                Access Key // Password
              </label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-neutral-300 transition-colors">
                  <KeyRound className="w-4 h-4" />
                </div>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  autoComplete="current-password"
                  required
                  disabled={isPending}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-sm font-mono tracking-wider shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono animate-in fade-in slide-in-from-top-1">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button with Neumorphic Surface & Loading State */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-mono text-xs uppercase tracking-wider font-bold shadow-[0_8px_20px_-4px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_24px_-4px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none mt-2"
            >
              {isPending ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
                  <span>Verifying Credential...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-neutral-900/80 flex items-center justify-between text-neutral-500 font-mono text-[10px]">
            <span>SYSTEM ID: 084-SEC</span>
            <span className="text-neutral-600">AES-256 SESSION</span>
          </div>

        </div>
      </div>
    </div>
  );
}
