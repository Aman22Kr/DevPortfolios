import React from 'react';
import { ExternalLink, Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export const AdBanner: React.FC = () => {
  return (
    <div className="w-full my-8">
      <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/40 p-4 sm:p-5 backdrop-blur-sm shadow-md">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-1/4 w-64 h-12 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Featured Partner
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Sponsored</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mt-1">
                Deploy Your Portfolio in Seconds with Zero Config
              </h4>
              <p className="text-xs text-slate-400 hidden md:block">
                Custom domains, automated SSL, instant global edge CDN, and high-performance previews.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Free Tier Available</span>
            </div>

            <a
              href="https://github.com/Aman22kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] shrink-0"
            >
              <span>Explore Dev Tools</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
