import React from 'react';
import { Layers, Github, ExternalLink, ShieldCheck, Zap, Server, Code, Sparkles, Heart } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About DevPortfolios</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Curating the World's Best Developer Portfolios
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          DevPortfolios is an open-access visual showcase of 2,050+ developer websites, built with a modern dark design system, client-side caching, and responsive live previews.
        </p>
      </div>

      {/* Origin & Attribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Open Source Dataset</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The portfolios catalog is founded upon the well-known repository{' '}
            <a
              href="https://github.com/emmabostian/developer-portfolios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              emmabostian/developer-portfolios
            </a>
            , maintaining an open directory of active software engineer websites across the globe.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Github className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Maintained by Aman22kr</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Built as a static multi-page React application hosted via GitHub Pages. Maintained by developer{' '}
            <a
              href="https://github.com/Aman22kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              @Aman22kr
            </a>
            .
          </p>
        </div>
      </div>

      {/* Technical Highlights */}
      <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-8 mb-12 space-y-6">
        <h2 className="text-xl font-bold text-white">Architecture &amp; Core Innovations</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-400">
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
              <Zap className="w-4 h-4 text-amber-400" /> Smart Concurrent Iframe Queue
            </h4>
            <p className="leading-relaxed">
              To prevent browser tab freezing and excessive RAM consumption, an Intersection Observer queue restricts active iframe rendering to maximum 4–6 concurrent frames in view. Cards out of view release memory immediately.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Graceful Security Fallbacks
            </h4>
            <p className="leading-relaxed">
              When sites block iframe rendering via strict X-Frame-Options or Content-Security-Policy headers, DevPortfolios automatically renders a consistent monogram card with the person's initials and direct verified launch links.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
              <Server className="w-4 h-4 text-blue-400" /> 100% Client-Side Computation
            </h4>
            <p className="leading-relaxed">
              No server database dependencies or cold starts. Searches, alphabetical indexing, bookmark storage, and user submissions execute entirely inside the visitor's browser with persistent localStorage.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5 font-mono">
              <Layers className="w-4 h-4 text-indigo-400" /> GitHub Pages Static Deployment
            </h4>
            <p className="leading-relaxed">
              Configured with Vite relative path resolution, HashRouter client-side routing, and an automated GitHub Actions deployment workflow for reliable zero-server static hosting.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Section at Bottom */}
      <AdBanner />
    </div>
  );
};
