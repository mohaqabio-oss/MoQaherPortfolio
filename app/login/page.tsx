'use client';

import React, { useState, useTransition } from 'react';
import { loginAction } from './actions';
import { Terminal, KeyRound, Eye, EyeOff, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

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
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-navy-950 text-slate-200 overflow-hidden cyber-grid selection:bg-orange-500/25 selection:text-orange-400 font-sans">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-gradient-to-tr from-orange-500/[0.04] via-navy-800/20 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Main Cyber Terminal Chamber */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Technical Corner Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-orange-500" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-orange-500" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-orange-500" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-orange-500" />

        <div className="bg-navy-900 border border-navy-800 p-8 sm:p-10 shadow-cyber-subtle">
          
          {/* Header Monogram & Status */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-navy-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 bg-navy-950 border border-orange-500/40 text-orange-500">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-500">
                  SEC_GATEWAY // 084
                </span>
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-slate-100">
                  Dossier Console
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-navy-950 border border-navy-800 font-mono text-[9px] text-orange-400">
              <span className="w-1.5 h-1.5 bg-orange-500 animate-pulse" />
              <span>AUTH-L4</span>
            </div>
          </div>

          {/* Title & Advisory */}
          <div className="space-y-1 mb-6 font-mono">
            <h1 className="text-base font-bold tracking-tight text-slate-100 uppercase">
              // PRIVILEGED ACCESS
            </h1>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Input decryption token to initiate real-time inline editing mode on the live dossier.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5 font-mono">
              <label
                htmlFor="password"
                className="block text-[10px] uppercase tracking-wider text-slate-400"
              >
                Access Key [Root]
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
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
                  className="w-full pl-9 pr-10 py-2.5 bg-navy-950 border border-navy-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-100 placeholder:text-slate-600 text-sm font-mono tracking-wider focus:outline-none transition-all disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-orange-400 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-2.5 bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Commit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-500 hover:bg-orange-400 text-black font-mono text-xs uppercase tracking-wider font-bold shadow-cyber-orange transition-all active:scale-[0.98] disabled:opacity-60 mt-4"
            >
              {isPending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin" />
                  <span>VERIFYING CRYPTO-HASH...</span>
                </>
              ) : (
                <>
                  <span>AUTHENTICATE &amp; EDIT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-navy-800 flex items-center justify-between text-slate-500 font-mono text-[9px] uppercase">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-orange-500" />
              <span>TLS / SHA-256</span>
            </div>
            <span>NODE // PROMETHEUS</span>
          </div>

        </div>
      </div>
    </div>
  );
}
