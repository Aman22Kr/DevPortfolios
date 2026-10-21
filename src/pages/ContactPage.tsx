import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, HelpCircle, ShieldAlert } from 'lucide-react';
import { saveContactSubmission } from '../utils/storage';
import { AdBanner } from '../components/AdBanner';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Report broken link');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    saveContactSubmission({
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How do I add or update my developer portfolio?',
      a: 'To request adding your portfolio or updating an existing listing, submit a message using the form above with your name and website URL.',
    },
    {
      q: 'Why do some portfolio previews show initials instead of a live website?',
      a: 'Many sites configure strict security headers (such as X-Frame-Options: SAMEORIGIN or CSP frame-ancestors). When a site restricts external iframe embedding, our smart preview system gracefully falls back to an initials monogram avatar.',
    },
    {
      q: 'How is data persisted on DevPortfolios?',
      a: 'Bookmarks, search history, custom submissions, and UI preferences are securely stored on your device using standard browser localStorage.',
    },
    {
      q: 'How can I deploy this project to GitHub Pages?',
      a: 'The project is configured for GitHub Actions static deployment under GitHub username Aman22kr. See the README.md in the repository for one-click setup.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact &amp; Support
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Report a broken website link, request a portfolio update, or inquire about developer tool sponsorships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
        {/* Contact Form */}
        <div className="md:col-span-3 rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Received!</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                Thank you for contacting DevPortfolios. Your feedback has been stored and our maintainers will review it.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-6 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 font-mono uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 font-mono uppercase">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 font-mono uppercase">
                  Topic *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-xs font-mono text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="Report broken link">Report Broken Link / 404</option>
                  <option value="Update portfolio info">Update My Portfolio Info</option>
                  <option value="Remove portfolio">Remove Portfolio Listing</option>
                  <option value="Sponsorship & Ad inquiry">Sponsorship &amp; Ad Inquiry</option>
                  <option value="Feature suggestion">Feature Suggestion</option>
                  <option value="Other">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 font-mono uppercase">
                  Message *
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Provide portfolio name, URL, or your inquiry details..."
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info & GitHub maintainer info */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Community Driven
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We monitor directory links periodically to ensure high signal and remove deactivated websites.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0f131c]/90 border border-slate-800/80 p-6 space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 font-mono uppercase">
              Project Maintainer
            </h4>
            <p className="text-xs text-slate-400">
              Developed and curated by{' '}
              <a
                href="https://github.com/Aman22kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 font-mono hover:underline"
              >
                Aman22kr
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#0f131c]/80 border border-slate-800/80 p-5 space-y-2"
            >
              <h4 className="text-sm font-semibold text-slate-200">{faq.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Ad Section */}
      <AdBanner />
    </div>
  );
};
