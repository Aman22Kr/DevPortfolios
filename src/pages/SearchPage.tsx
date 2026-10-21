import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Sparkles, History, X, ArrowUpRight, Filter } from 'lucide-react';
import { getAllPortfolios, getPlatforms } from '../data/portfoliosManager';
import { SmartPreviewCard } from '../components/SmartPreviewCard';
import { AdBanner } from '../components/AdBanner';
import { getSearchHistory, addSearchTerm, clearSearchHistory } from '../utils/storage';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [platform, setPlatform] = useState('All');
  const [history, setHistory] = useState<string[]>([]);

  const allPortfolios = useMemo(() => getAllPortfolios(), []);
  const platforms = useMemo(() => ['All', ...getPlatforms()], [allPortfolios]);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  // Update URL search query
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearchTerm(query.trim());
      setHistory(getSearchHistory());
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleSelectHistory = (term: string) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setHistory([]);
  };

  // Results calculation
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allPortfolios.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q);

      const matchesPlatform = platform === 'All' || p.platform === platform;

      return matchesQuery && matchesPlatform;
    });
  }, [allPortfolios, query, platform]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Search Developer Portfolios
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Find software engineers, frontend artists, and full-stack creators across 2,000+ personal websites.
        </p>

        {/* Search input form */}
        <form onSubmit={handleSearchSubmit} className="mt-6 relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type developer name, domain, or hosting platform..."
            className="w-full pl-11 pr-24 py-3.5 bg-[#0f131c] border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-xl"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-colors"
          >
            Search
          </button>
        </form>

        {/* Search History chips */}
        {history.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 flex items-center gap-1 font-mono text-[11px]">
              <History className="w-3 h-3" /> Recent:
            </span>
            {history.map((term) => (
              <button
                key={term}
                onClick={() => handleSelectHistory(term)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-mono transition-colors"
              >
                {term}
              </button>
            ))}
            <button
              onClick={handleClearHistory}
              className="text-[11px] text-slate-500 hover:text-slate-400 underline ml-1"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4 border-b border-slate-800/80 mb-8 text-xs">
        <div className="text-slate-400">
          Showing <span className="font-semibold text-slate-100">{results.length}</span> results
          {query && (
            <span>
              {' '}
              for "<span className="text-indigo-400">{query}</span>"
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono">Platform:</span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-none cursor-pointer"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {results.slice(0, 48).map((portfolio) => (
            <SmartPreviewCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#0f131c]/50 border border-slate-800 my-10">
          <p className="text-base font-semibold text-slate-200">No portfolios matched your query</p>
          <p className="text-xs text-slate-400 mt-1">
            Try checking for spelling or searching for generic terms like "github.io" or "portfolio".
          </p>
          <button
            onClick={() => {
              setQuery('');
              setPlatform('All');
              setSearchParams({});
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Bottom Ad Section */}
      <AdBanner />
    </div>
  );
};
