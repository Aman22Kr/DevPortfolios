import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Shuffle,
  Grid,
  List,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllPortfolios, getLettersWithCounts, getPlatforms } from '../data/portfoliosManager';
import { Portfolio, SortOption, ViewMode } from '../types/portfolio';
import { SmartPreviewCard } from '../components/SmartPreviewCard';
import { AdBanner } from '../components/AdBanner';
import { getSavedViewMode, saveViewMode } from '../utils/storage';
import { cleanUrlDisplay } from '../utils/helpers';

const ITEMS_PER_PAGE = 24;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const allPortfolios = useMemo(() => getAllPortfolios(), []);
  const letters = useMemo(() => getLettersWithCounts(), [allPortfolios]);
  const platforms = useMemo(() => ['All Platforms', ...getPlatforms()], [allPortfolios]);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All Platforms');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<ViewMode>(getSavedViewMode());
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Sync view mode to storage
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    saveViewMode(mode);
  };

  // Filter & Sort logic
  const filteredPortfolios = useMemo(() => {
    let result = [...allPortfolios];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q) ||
          p.platform.toLowerCase().includes(q)
      );
    }

    // Letter filter
    if (selectedLetter !== 'ALL') {
      result = result.filter((p) => p.firstLetter === selectedLetter);
    }

    // Platform filter
    if (selectedPlatform !== 'All Platforms') {
      result = result.filter((p) => p.platform === selectedPlatform);
    }

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isCustom ? 1 : 0) - (a.isCustom ? 1 : 0));
    } else if (sortBy === 'random') {
      // Keep stable based on seed or random
      result.sort(() => 0.5 - Math.random());
    }

    return result;
  }, [allPortfolios, searchQuery, selectedLetter, selectedPlatform, sortBy]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedLetter, selectedPlatform, sortBy]);

  const displayedPortfolios = useMemo(() => {
    return filteredPortfolios.slice(0, visibleCount);
  }, [filteredPortfolios, visibleCount]);

  const hasMore = visibleCount < filteredPortfolios.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredPortfolios.length));
  };

  // Jump to random portfolio
  const handleRandomJump = () => {
    if (allPortfolios.length === 0) return;
    const randomItem = allPortfolios[Math.floor(Math.random() * allPortfolios.length)];
    navigate(`/portfolio/${randomItem.slug}`);
  };

  return (
    <div className="min-w-0 flex-1">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 ambient-glow pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{allPortfolios.length.toLocaleString()}+ Curated Developer Websites</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto"
        >
          Discover Inspiring <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Developer Portfolios
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto"
        >
          Browse real portfolios from software engineers, designers, and creators worldwide. Powered by lazy-loaded live previews, instant A–Z filtering, and zero-clutter card layout.
        </motion.p>

        {/* Hero Quick Search & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center"
        >
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by engineer name, domain, or hosting..."
              className="w-full pl-11 pr-4 py-3 bg-[#0f131c]/90 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={handleRandomJump}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold shadow-lg transition-all hover:scale-[1.02] shrink-0"
            title="Jump to a random developer portfolio"
          >
            <Shuffle className="w-4 h-4 text-indigo-400" />
            <span>Random Portfolio</span>
          </button>
        </motion.div>
      </section>

      {/* A–Z Letter Filters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#0d1017]/90 border border-slate-800/80 shadow-lg">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {/* "All" button */}
            <button
              onClick={() => setSelectedLetter('ALL')}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedLetter === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              All ({allPortfolios.length})
            </button>

            {/* Alphabet letters A-Z */}
            {letters.map(({ letter, count }) => {
              const active = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  disabled={count === 0}
                  className={`shrink-0 min-w-[32px] px-2 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex flex-col items-center ${
                    count === 0
                      ? 'text-slate-700 cursor-not-allowed'
                      : active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={`${letter} (${count} portfolios)`}
                >
                  <span>{letter}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter & View Mode Controls Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-3 border-y border-slate-800/80 text-xs">
          {/* Active criteria feedback */}
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-200">
              {filteredPortfolios.length.toLocaleString()}
            </span>
            <span>portfolios found</span>
            {selectedLetter !== 'ALL' && (
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono border border-indigo-500/20">
                Letter: {selectedLetter}
              </span>
            )}
            {selectedPlatform !== 'All Platforms' && (
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono border border-purple-500/20">
                {selectedPlatform}
              </span>
            )}
          </div>

          {/* Controls: Platform filter, Sort, View mode */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Platform Dropdown */}
            <div className="relative">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="appearance-none bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl px-3 py-1.5 pr-8 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="name-asc">Alphabetical (A → Z)</option>
                <option value="name-desc">Alphabetical (Z → A)</option>
                <option value="random">Shuffle Order</option>
                <option value="newest">Recently Added</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Toggle: Grid / Compact */}
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5">
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Grid Preview View"
                aria-label="Grid Preview View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleViewModeChange('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'compact' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Compact List View"
                aria-label="Compact List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Portfolios List or Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {displayedPortfolios.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 my-8">
            <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-200">No portfolios match your filters</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try clearing your search query or choosing another letter category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLetter('ALL');
                setSelectedPlatform('All Platforms');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View with Smart Preview Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedPortfolios.map((portfolio, idx) => (
              <SmartPreviewCard
                key={portfolio.id}
                portfolio={portfolio}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          /* Compact Streamlined View */
          <div className="rounded-2xl border border-slate-800/80 bg-[#0f131c]/90 divide-y divide-slate-800/80 overflow-hidden shadow-lg">
            {displayedPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-100 hover:text-indigo-400 transition-colors">
                      {portfolio.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {portfolio.platform}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 truncate block mt-0.5">
                    {cleanUrlDisplay(portfolio.url)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Square thumbnail blank area */}
                  <div
                    title="Video / Thumbnail Blank Placeholder"
                    className="w-6 h-6 rounded border border-dashed border-slate-700 bg-slate-800/50 flex items-center justify-center text-[8px] text-slate-500 font-mono"
                  >
                    ■
                  </div>

                  <button
                    onClick={() => navigate(`/portfolio/${portfolio.slug}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    Details
                  </button>

                  <a
                    href={portfolio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-400 border border-indigo-500/30 text-xs font-medium transition-colors"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-mono font-medium shadow-lg transition-all hover:scale-[1.02]"
            >
              Load More Portfolios ({displayedPortfolios.length} of {filteredPortfolios.length})
            </button>
          </div>
        )}
      </section>

      {/* Ad Section at Bottom of page (Mandated in RTF) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner />
      </div>
    </div>
  );
};
