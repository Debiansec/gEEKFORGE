import React, { useState, useEffect } from 'react';
import { ViewTab, PortfolioItem } from '../types';
import { PORTFOLIO_DATA, CASE_STUDIES, GEEKFORGE_CONTACT } from '../data/mockData';
import { DeviceMockup } from '../components/DeviceMockup';
import {
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';

interface PortfolioViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Perceived loading skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-16 sm:space-y-24 py-6 pb-20">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          Customer Work Completed & Portfolio
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Android Mobile Apps & eCommerce Showcase
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Explore real production-ready Android mobile applications, dropshipping platforms, and custom online stores deployed for South African businesses.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Projects (11)' },
            { id: 'mobile', label: '🚀 Android Mobile Apps' },
            { id: 'ecommerce', label: '🛒 eCommerce & Dropshipping' },
            { id: 'service', label: '⚡ Service & Booking Apps' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Portfolio Grid with Skeleton State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          // Skeleton Loading Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4 shadow-sm"
              >
                <div className="w-48 h-72 mx-auto bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`portfolio-card-${item.id}`}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Interactive Phone Frame Preview */}
                  <div
                    className="mb-6 cursor-pointer transform group-hover:-translate-y-1 transition-transform"
                    onClick={() => setSelectedItem(item)}
                  >
                    <DeviceMockup item={item} compact />
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${item.accentColor}20`,
                        color: item.accentColor,
                      }}
                    >
                      {item.platform}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
                    Client: {item.client}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Stats badge row */}
                  <div className="grid grid-cols-3 gap-1.5 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-center mb-4">
                    {item.stats.map((st, idx) => (
                      <div key={idx}>
                        <span className="font-extrabold text-xs text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 block">
                          {st.value}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.features.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    View App Details & Specs →
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('wizard')}
                    className="p-2 rounded-lg bg-blue-500/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-blue-600 dark:text-cyan-400 hover:text-white transition-all cursor-pointer"
                    title="Build an app like this"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CASE STUDIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-[#0a1024] to-[#1a0f30] text-white rounded-3xl p-6 sm:p-12 border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              Client Growth Case Studies
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
              Real Impact, Measurable Growth
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Short, impactful summaries of how GeekForge engineered digital transformations and boosted online revenue for South African businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                      {cs.industry}
                    </span>
                    <span className="text-xs text-slate-400">Verified Case</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {cs.clientName}
                  </h3>

                  {/* Challenge & Solution */}
                  <div className="space-y-3 mb-6 text-xs leading-relaxed">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-rose-400 font-bold block mb-1">The Challenge:</span>
                      <p className="text-slate-300">{cs.challenge}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-cyan-400 font-bold block mb-1">GeekForge Solution:</span>
                      <p className="text-slate-300">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950 text-center mb-6 border border-slate-800/50">
                    {cs.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 block">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote snippet */}
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-xs italic text-slate-300 mb-2">
                    "{cs.testimonialQuote}"
                  </p>
                  <span className="text-[11px] font-bold text-purple-400 block">
                    — {cs.representative}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal for Selected App */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 mx-auto">
                <DeviceMockup item={selectedItem} compact />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full uppercase"
                    style={{
                      backgroundColor: `${selectedItem.accentColor}20`,
                      color: selectedItem.accentColor,
                    }}
                  >
                    {selectedItem.platform}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Client: {selectedItem.client} • {selectedItem.year}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                    Core App Features:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedItem.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                      <span>Published to Google Play Store</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                      <span>South African Payments (PayFast & Ozow)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(null);
                      setActiveTab('wizard');
                    }}
                    className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <span>Build An App Like This</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(
                      `Hi GeekForge, I saw the ${selectedItem.title} in your portfolio and want to build a similar app for my store.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                  >
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
