import React from 'react';
import { ViewTab } from '../types';
import { SERVICES_DATA, GEEKFORGE_CONTACT } from '../data/mockData';
import { BudgetCalculator } from '../components/BudgetCalculator';
import { QuoteEstimator } from '../components/QuoteEstimator';
import {
  Smartphone,
  Globe,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Share2,
} from 'lucide-react';

interface ServicesViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ setActiveTab }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-blue-500 dark:text-cyan-400" />;
      case 'ecommerce':
        return <ShoppingBag className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      case 'marketing':
        return <TrendingUp className="w-5 h-5 text-amber-500" />;
      case 'web':
      default:
        return <Globe className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-6 pb-20">
      {/* Header Section */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          Our Service Capabilities
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Website & Mobile App Solutions Tailored for South Africa
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          From domain setup to Google Play launch, we design, build, and set up professional digital assets that look sharp, load fast, and do what they're meant to do—represent your business properly online.
        </p>
      </section>

      {/* Flagship R4,500 Mobile App Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a1024] to-[#1a0f30] text-white border border-blue-500/30 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Flagship Mobile Development Promotion</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              🚀 Get Your Own Android Mobile App for ONLY R4,500!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Published on the Google Play Store with full eCommerce cart, PayFast & Ozow payments, push notifications, admin panel, and 100% full source code ownership.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              Get Started in Wizard →
            </button>
            <a
              href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=Hi%20GeekForge,%20I%20want%20to%20learn%20more%20about%20the%20R4500%20Android%20app%20special`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className={`rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between ${
                srv.popular
                  ? 'bg-white dark:bg-slate-900 border-blue-500/50 shadow-xl ring-1 ring-purple-500/20'
                  : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getIcon(srv.category)}
                  </div>
                  {srv.badge ? (
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs">
                      {srv.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">
                      {srv.category.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Included Features:
                </h4>
                <ul className="space-y-2.5 mb-6">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Investment</span>
                  <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                    {srv.startingPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white dark:bg-slate-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Configure In Wizard →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE QUOTE ESTIMATOR SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteEstimator setActiveTab={setActiveTab} />
      </section>

      {/* INTERACTIVE BUDGET CALCULATOR WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BudgetCalculator
          onSelectTier={(tier, tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>

      {/* Specialized WordPress & Shopify Expert Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900/70 rounded-3xl p-6 sm:p-12 border border-slate-200 dark:border-slate-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                Tech Stack Specialization
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                WordPress & Shopify Expert Services
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Whether you need a brand-new custom theme, speed optimization for an existing bloated WordPress site, or complex API integrations for dropshipping and logistics, we have you covered.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    WordPress & WooCommerce
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Custom themes, Gutenberg block building, speed optimization (&lt;1.5s), security hardening, and zero monthly platform fees.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    Shopify Setup & Support
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Liquid theme customization, PayFast/Ozow app configuration, collection architecture, and high-conversion product pages.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    SEO Optimization & Growth Strategies
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Target local South African customers searching in your specific town (Johannesburg, Cape Town, Pretoria, Durban). Schema markup, speed scores, and Google Business Profile optimization.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <Share2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Social Media & WhatsApp Integration
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Live WhatsApp chat widgets, Instagram feed galleries, automated catalog sync with Meta Commerce (Facebook & Instagram Shops), and Google Maps store locators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
