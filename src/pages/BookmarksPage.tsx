import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Download, ExternalLink, ArrowLeft, Layers } from 'lucide-react';
import { getBookmarks, clearAllBookmarks } from '../utils/storage';
import { getPortfolioById } from '../data/portfoliosManager';
import { SmartPreviewCard } from '../components/SmartPreviewCard';
import { AdBanner } from '../components/AdBanner';
import { Portfolio } from '../types/portfolio';

export const BookmarksPage: React.FC = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Portfolio[]>([]);

  const loadBookmarks = () => {
    const ids = getBookmarks();
    const items = ids
      .map((id) => getPortfolioById(id))
      .filter((p): p is Portfolio => p !== undefined);
    setBookmarkedItems(items);
  };

  useEffect(() => {
    loadBookmarks();
    window.addEventListener('devportfolios_bookmarks_updated', loadBookmarks);
    return () => window.removeEventListener('devportfolios_bookmarks_updated', loadBookmarks);
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved bookmarks?')) {
      clearAllBookmarks();
      setBookmarkedItems([]);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookmarkedItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'devportfolios_bookmarks.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Bookmark className="w-4 h-4 fill-amber-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Saved Bookmarks
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your personal collection of favorite developer portfolios, saved locally on this device.
          </p>
        </div>

        {bookmarkedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/40 text-rose-300 text-xs font-mono transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-[#0f131c]/50 border border-slate-800 my-10 max-w-lg mx-auto">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-200">No bookmarks saved yet</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            While exploring the directory, tap the bookmark icon on any developer card to save their portfolio here for future inspiration.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Portfolios</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {bookmarkedItems.map((portfolio) => (
            <SmartPreviewCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      )}

      {/* Ad Section at Bottom */}
      <AdBanner />
    </div>
  );
};
