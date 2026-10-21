import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Bookmark, Globe, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Portfolio } from '../types/portfolio';
import { useIframeQueueSlot } from '../hooks/useIframeQueue';
import { getInitials, getAvatarGradient, cleanUrlDisplay } from '../utils/helpers';
import { isBookmarked, toggleBookmark } from '../utils/storage';

interface SmartPreviewCardProps {
  portfolio: Portfolio;
  priority?: boolean;
}

export const SmartPreviewCard: React.FC<SmartPreviewCardProps> = ({ portfolio, priority = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [previewMode, setPreviewMode] = useState<'iframe' | 'monogram'>('iframe');
  
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync bookmark state
  useEffect(() => {
    setBookmarked(isBookmarked(portfolio.id));
    const handleBookmarkChange = () => {
      setBookmarked(isBookmarked(portfolio.id));
    };
    window.addEventListener('devportfolios_bookmarks_updated', handleBookmarkChange);
    return () => window.removeEventListener('devportfolios_bookmarks_updated', handleBookmarkChange);
  }, [portfolio.id]);

  // Intersection Observer for viewport tracking
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Unload when scrolled far out to conserve browser RAM
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: '120px',
        threshold: 0.1,
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Request a slot in the concurrent queue (max 5)
  const canLoadIframe = useIframeQueueSlot(portfolio.id, isVisible);

  // Handle bookmark click
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleBookmark(portfolio.id);
    setBookmarked(newState);
  };

  const initials = getInitials(portfolio.name);
  const gradientClass = getAvatarGradient(portfolio.name);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="group relative flex flex-col rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10 overflow-hidden transition-colors"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#131824]/90 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="font-mono text-slate-400 truncate max-w-[150px]">
            {portfolio.domain}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            className={`p-1.5 rounded-lg transition-colors ${
              bookmarked
                ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          <Link
            to={`/portfolio/${portfolio.slug}`}
            className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="relative aspect-[16/10] w-full bg-[#0a0d14] overflow-hidden">
        {/* Fallback Monogram & Initials View */}
        {(!canLoadIframe || iframeError || previewMode === 'monogram') && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br ${gradientClass} transition-opacity`}>
            {/* Ambient pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <span className="text-xl font-bold tracking-wider font-mono text-indigo-400">
                  {initials}
                </span>
              </div>
              <h3 className="font-semibold text-slate-200 text-sm max-w-[200px] truncate">
                {portfolio.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {portfolio.platform}
              </p>

              {/* Requirement: Blank square space for YouTube video link or thumbnail showcase */}
              <div
                title="Thumbnail / Video Placeholder Space"
                className="mt-3 w-7 h-7 rounded border border-dashed border-slate-700/80 bg-slate-800/40 flex items-center justify-center text-[9px] font-mono text-slate-500"
              >
                ■
              </div>
            </div>
          </div>
        )}

        {/* Live Iframe Preview when allowed by Queue and in viewport */}
        {isVisible && canLoadIframe && previewMode === 'iframe' && !iframeError && (
          <>
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-10 space-y-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] font-mono text-slate-400">Connecting preview...</span>
              </div>
            )}
            <iframe
              src={portfolio.url}
              title={`Preview of ${portfolio.name}`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
              className={`w-[200%] h-[200%] border-0 origin-top-left transform scale-50 pointer-events-none transition-opacity duration-500 ${
                iframeLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
              }`}
            />
          </>
        )}

        {/* Overlay clickable mask that links to detail page */}
        <Link
          to={`/portfolio/${portfolio.slug}`}
          className="absolute inset-0 z-20 focus:outline-none"
          aria-label={`View ${portfolio.name}'s portfolio profile`}
        />

        {/* Floating preview toggle badge */}
        <div className="absolute bottom-2.5 right-2.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPreviewMode((prev) => (prev === 'iframe' ? 'monogram' : 'iframe'));
            }}
            className="px-2 py-1 text-[10px] font-mono rounded bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-slate-700 backdrop-blur shadow flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
            {previewMode === 'iframe' ? 'Card View' : 'Live Frame'}
          </button>
        </div>
      </div>

      {/* Primary Bottom Section: Name + Link ONLY (as strictly required) */}
      <div className="p-4 flex items-center justify-between gap-3 bg-[#0f131c] border-t border-slate-800/60 mt-auto">
        <div className="min-w-0">
          <Link
            to={`/portfolio/${portfolio.slug}`}
            className="block text-sm font-semibold text-slate-100 hover:text-indigo-400 truncate transition-colors"
          >
            {portfolio.name}
          </Link>
          <span className="text-[11px] font-mono text-slate-500 truncate block">
            {cleanUrlDisplay(portfolio.url)}
          </span>
        </div>

        <a
          href={portfolio.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${portfolio.name}'s portfolio`}
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-400 border border-indigo-500/30 text-xs font-medium transition-colors"
        >
          <span>Visit</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
