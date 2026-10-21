import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Compass, ArrowLeft, Home } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const NotFoundPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 text-indigo-400">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
        Lost in Cyberspace?
      </h1>

      <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
        The page you are looking for might have been moved, renamed, or never existed in the directory.
      </p>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mt-8 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a portfolio..."
          className="w-full pl-10 pr-20 py-2.5 bg-[#0f131c] border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg"
        >
          Search
        </button>
      </form>

      <div className="flex items-center justify-center gap-3 mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-medium"
        >
          <span>All Portfolios</span>
        </Link>
      </div>

      <div className="mt-16">
        <AdBanner />
      </div>
    </div>
  );
};
