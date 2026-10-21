import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Github, Heart, Globe, ExternalLink, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#07090e] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Dev<span className="text-indigo-400">Portfolios</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              A modern, high-speed static directory showcasing 2,000+ developer portfolios with smart lazy-loaded previews.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/Aman22kr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub @Aman22kr"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/emmabostian/developer-portfolios"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                title="Original Dataset by Emma Bostian"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Directory
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  All Portfolios (A–Z)
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-indigo-400 transition-colors">
                  Search Portfolios
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-indigo-400 transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-indigo-400 transition-colors">
                  Submit Your Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">
                  About DevPortfolios
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">
                  Report Broken Link / Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/emmabostian/developer-portfolios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Emma Bostian’s Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://6e87v.hatchboxapp.com/portfolios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Reference Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Credits & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Technology
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Vite', 'React', 'Tailwind CSS', 'Framer Motion', 'Intersection Observer', 'GitHub Pages'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              Optimized for static deployment. 100% client-side caching &amp; concurrent iframe control.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>Built by</span>
            <a
              href="https://github.com/Aman22kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-indigo-400 font-mono font-medium underline underline-offset-4"
            >
              Aman22kr
            </a>
            <span>• DevPortfolios Project</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Static Deployment Ready</span>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-300">
              License &amp; Attributions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
