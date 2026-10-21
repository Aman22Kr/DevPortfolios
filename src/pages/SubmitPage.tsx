import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, CheckCircle, ExternalLink, Sparkles, Globe, User, ShieldCheck } from 'lucide-react';
import { addCustomPortfolio } from '../utils/storage';
import { Portfolio } from '../types/portfolio';
import { AdBanner } from '../components/AdBanner';

export const SubmitPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('Vercel');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState<Portfolio | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = name.trim();
    let cleanUrl = url.trim();

    if (!cleanName) {
      setError('Please provide a developer name.');
      return;
    }

    if (!cleanUrl) {
      setError('Please enter a valid website URL.');
      return;
    }

    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    try {
      new URL(cleanUrl);
    } catch {
      setError('The provided URL is not a valid web address.');
      return;
    }

    let domain = '';
    try {
      domain = new URL(cleanUrl).hostname.replace(/^www\./, '');
    } catch {
      domain = cleanUrl.replace(/https?:\/\//, '').split('/')[0];
    }

    const firstLetter = (cleanName[0] || '').toUpperCase();
    const letterCategory = /^[A-Z]$/.test(firstLetter) ? firstLetter : '#';
    const timestamp = Date.now();
    const slug = `${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-c${timestamp.toString().slice(-4)}`;

    const newPortfolio: Portfolio = {
      id: `custom-${timestamp}`,
      name: cleanName,
      url: cleanUrl,
      slug,
      domain,
      platform,
      firstLetter: letterCategory,
      bio: bio.trim() || undefined,
      addedAt: new Date().toISOString(),
      isCustom: true,
    };

    addCustomPortfolio(newPortfolio);
    setSubmitted(newPortfolio);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Community Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Submit Your Developer Portfolio
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Get featured on DevPortfolios alongside 2,000+ top software engineers and creators. Submissions are stored instantly on your device and integrated into the global catalog.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl bg-[#0f131c] border border-emerald-500/30 p-8 text-center shadow-xl mb-12">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">Portfolio Submitted Successfully!</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            <span className="text-slate-200 font-semibold">{submitted.name}</span> has been added to DevPortfolios. It is now active and searchable in the catalog.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link
              to={`/portfolio/${submitted.slug}`}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
            >
              View Your Profile Page
            </Link>
            <button
              onClick={() => {
                setSubmitted(null);
                setName('');
                setUrl('');
                setBio('');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Submit Another
            </button>
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Explore Directory
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 sm:p-10 shadow-2xl mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-mono">
                {error}
              </div>
            )}

            {/* Developer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 uppercase font-mono tracking-wider">
                Developer Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                />
              </div>
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 uppercase font-mono tracking-wider">
                Portfolio URL *
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://myportfolio.dev"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-xs"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Must be an active, publicly accessible web address.
              </p>
            </div>

            {/* Platform / Hosting */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 uppercase font-mono tracking-wider">
                Hosting / Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 focus:outline-none font-mono text-xs cursor-pointer"
              >
                <option value="Vercel">Vercel</option>
                <option value="GitHub Pages">GitHub Pages</option>
                <option value="Netlify">Netlify</option>
                <option value="Framer">Framer</option>
                <option value="Cloudflare">Cloudflare Pages / Workers</option>
                <option value="Render">Render</option>
                <option value="Webflow">Webflow</option>
                <option value="Custom Domain">Custom Domain / Self-Hosted</option>
              </select>
            </div>

            {/* Optional Bio or Tagline */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 uppercase font-mono tracking-wider">
                Short Tagline / Bio (Optional)
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="e.g. Full-Stack Engineer specializing in React, TypeScript, and high-performance WebGL graphics."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit to DevPortfolios Directory</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ad Section at Bottom */}
      <AdBanner />
    </div>
  );
};
