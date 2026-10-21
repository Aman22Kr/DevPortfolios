import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Bookmark,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  ArrowLeft,
  Layers,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  getPortfolioBySlug,
  getAllPortfolios,
  getRandomPortfolios,
} from '../data/portfoliosManager';
import { SmartPreviewCard } from '../components/SmartPreviewCard';
import { AdBanner } from '../components/AdBanner';
import { getInitials, getAvatarGradient } from '../utils/helpers';
import { isBookmarked, toggleBookmark, addRecentlyViewed } from '../utils/storage';

export const PortfolioDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const portfolio = slug ? getPortfolioBySlug(slug) : undefined;
  const all = getAllPortfolios();

  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Sync bookmarks and record recently viewed
  useEffect(() => {
    if (portfolio) {
      setBookmarked(isBookmarked(portfolio.id));
      addRecentlyViewed(portfolio.id);
    }
  }, [portfolio]);

  if (!portfolio) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Portfolio Not Found</h2>
        <p className="text-slate-400 text-sm mt-2">
          The requested portfolio could not be located in our directory.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  // Find index for prev / next
  const currentIndex = all.findIndex((p) => p.id === portfolio.id);
  const prevPortfolio = currentIndex > 0 ? all[currentIndex - 1] : all[all.length - 1];
  const nextPortfolio = currentIndex < all.length - 1 ? all[currentIndex + 1] : all[0];

  // Related portfolios
  const related = getRandomPortfolios(4, portfolio.id);

  const handleBookmarkToggle = () => {
    const updated = toggleBookmark(portfolio.id);
    setBookmarked(updated);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = getInitials(portfolio.name);
  const gradientClass = getAvatarGradient(portfolio.name);

  // Device width classes
  const deviceWidthClass = {
    desktop: 'w-full h-[620px]',
    tablet: 'w-[768px] max-w-full h-[620px]',
    mobile: 'w-[375px] max-w-full h-[620px]',
  }[deviceMode];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Prev/Next navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-slate-200">
            Portfolios
          </Link>
          <span>/</span>
          <span className="text-indigo-400 font-semibold">{portfolio.name}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => navigate(`/portfolio/${prevPortfolio.slug}`)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <button
            onClick={() => navigate(`/portfolio/${nextPortfolio.slug}`)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Portfolio Header Profile */}
      <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center font-mono font-bold text-2xl sm:text-3xl text-white border border-slate-700 shadow-xl`}
            >
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {portfolio.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {portfolio.platform}
                </span>
                {portfolio.isCustom && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Community Submitted
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1 flex items-center gap-2">
                <span>{portfolio.domain}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Public Profile
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleBookmarkToggle}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                bookmarked
                  ? 'bg-amber-400/15 border-amber-500/30 text-amber-300 hover:bg-amber-400/25'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied URL' : 'Share'}</span>
            </button>

            <a
              href={portfolio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Square placeholder area as mandated in RTF */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              title="Designated blank square space for YouTube video link or thumbnail"
              className="w-12 h-12 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 flex items-center justify-center text-slate-500 font-mono text-xs"
            >
              ■
            </div>
            <div>
              <p className="text-xs font-medium text-slate-300">
                Showcase Video &amp; Thumbnail Space
              </p>
              <p className="text-[11px] text-slate-500">
                Reserved square media thumbnail slot for developer walk-throughs and video intros.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Source: <a href="https://github.com/emmabostian/developer-portfolios" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">emmabostian/developer-portfolios</a>
          </div>
        </div>
      </div>

      {/* Live Preview Frame Container */}
      <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 overflow-hidden shadow-2xl mb-12">
        {/* Frame Top Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-[#131824] border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-slate-400 truncate max-w-[280px]">
              {portfolio.url}
            </span>
          </div>

          {/* Viewport device switcher & reload */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${
                deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${
                deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${
                deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              title="Reload Preview"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Iframe or Security Fallback View */}
        <div className="bg-[#090b10] flex justify-center p-2 sm:p-6 min-h-[500px]">
          <div className={`transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-white ${deviceWidthClass}`}>
            <iframe
              key={iframeKey}
              src={portfolio.url}
              title={`Live view of ${portfolio.name}`}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        <div className="px-6 py-3 bg-[#131824]/60 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Note: If the preview appears blank or displays a connection notice, the website restricts external framing via X-Frame-Options or CSP headers.
          </span>
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline inline-flex items-center gap-1 shrink-0 font-medium"
          >
            <span>Open in new window</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Related Portfolios Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">More Inspiring Portfolios</h3>
            <p className="text-xs text-slate-400">Discover other developer websites from the catalog</p>
          </div>
          <Link to="/" className="text-xs font-mono text-indigo-400 hover:underline">
            View all ({all.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <SmartPreviewCard key={p.id} portfolio={p} />
          ))}
        </div>
      </section>

      {/* Ad Section at Bottom of page */}
      <AdBanner />
    </div>
  );
};
