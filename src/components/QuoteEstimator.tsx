import React, { useState } from 'react';
import { ViewTab } from '../types';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import {
  Sliders,
  Calculator,
  ArrowRight,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Layers,
  FileText,
  Smartphone,
  Globe,
  ShoppingBag,
} from 'lucide-react';

interface QuoteEstimatorProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ setActiveTab }) => {
  const [platform, setPlatform] = useState<'android' | 'ecommerce' | 'website' | 'suite'>('android');
  const [pages, setPages] = useState<number>(5);
  const [features, setFeatures] = useState<number>(3);
  const [urgent, setUrgent] = useState<boolean>(false);

  // Dynamic estimate calculation based on GeekForge's South African rates
  const calculateEstimate = () => {
    let baseMin = 2500;
    let baseMax = 3500;

    if (platform === 'android') {
      baseMin = 4500; // Special promotional baseline
      baseMax = 5200;
    } else if (platform === 'ecommerce') {
      baseMin = 4200;
      baseMax = 5800;
    } else if (platform === 'suite') {
      baseMin = 7500;
      baseMax = 9500;
    }

    // Additional pages (first 5 included)
    const extraPages = Math.max(0, pages - 5);
    baseMin += extraPages * 250;
    baseMax += extraPages * 400;

    // Feature complexity (first 2 included)
    const extraFeatures = Math.max(0, features - 2);
    baseMin += extraFeatures * 450;
    baseMax += extraFeatures * 750;

    if (urgent) {
      baseMin = Math.round(baseMin * 1.25);
      baseMax = Math.round(baseMax * 1.25);
    }

    return {
      min: baseMin,
      max: baseMax,
      timeline: urgent ? '3 to 5 Days (Rush Priority)' : '7 to 10 Business Days',
    };
  };

  const estimate = calculateEstimate();

  const handleWhatsAppEstimate = () => {
    const text = `Hi GeekForge!
I just used the Quote Estimator on your website:
• Solution: ${platform.toUpperCase()}
• Pages: ${pages}
• Selected Features: ${features}
• Turnaround: ${urgent ? 'Priority Rush' : 'Standard'}
• Rough Estimate: R${estimate.min.toLocaleString()} – R${estimate.max.toLocaleString()}

Can you please confirm this quote and send me the next steps?`;

    window.open(`${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="quote-estimator-widget" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Quote Estimator</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Instant Project Cost Estimator
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Adjust project complexity and scope sliders to see a real-time rough price range before opening our detailed wizard.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block sm:text-right">
              All Inclusive
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-purple-400 flex items-center gap-1 sm:justify-end">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Zero Hidden Setup Fees
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Sliders and Configuration */}
          <div className="lg:col-span-7 space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                1. Select Digital Platform
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'android', label: 'Android App', icon: Smartphone, highlight: 'R4,500 Special' },
                  { id: 'ecommerce', label: 'eCommerce Store', icon: ShoppingBag, highlight: 'PayFast' },
                  { id: 'website', label: 'Business Web', icon: Globe, highlight: 'WordPress' },
                  { id: 'suite', label: 'Web + App Suite', icon: Sparkles, highlight: 'Best Value' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = platform === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPlatform(item.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/10 dark:bg-purple-500/15 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                      <div>
                        <span className={`text-xs font-bold block ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                          {item.label}
                        </span>
                        <span className="text-[10px] text-blue-600 dark:text-purple-300 font-semibold">
                          {item.highlight}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pages Slider */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Project Size / Screen Count
                  </span>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                  {pages} {pages === 1 ? 'Page / View' : 'Pages / Views'}
                </span>
              </div>

              <input
                id="quote-pages-slider"
                type="range"
                min="1"
                max="25"
                step="1"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>1 Page (Landing)</span>
                <span>5 Pages (Standard)</span>
                <span>15+ Pages (Multi-category)</span>
              </div>
            </div>

            {/* Feature Count Slider */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Key Features & Integrations
                  </span>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                  {features} {features === 1 ? 'Feature' : 'Features'}
                </span>
              </div>

              <input
                id="quote-features-slider"
                type="range"
                min="1"
                max="10"
                step="1"
                value={features}
                onChange={(e) => setFeatures(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />

              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>1 Feature (Basic)</span>
                <span>4 Features (PayFast + Push + Catalog)</span>
                <span>8+ Features (Full SaaS/Portal)</span>
              </div>
            </div>

            {/* Fast Turnaround Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/80">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Priority Rush Turnaround (3–5 Days)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Accelerated sprint deployment with dedicated senior engineer.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setUrgent(!urgent)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  urgent ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
                aria-label="Toggle rush priority"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    urgent ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Estimated Range Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-950 via-[#0a1024] to-[#1a0f30] text-white rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl relative">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Estimated Investment
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-tight">
                  R{estimate.min.toLocaleString()} – R{estimate.max.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-6">
                *Approximate guideline based on your slider parameters. Fixed formal contract provided before project kickoff.
              </p>

              {/* Estimate Highlights */}
              <div className="space-y-2.5 mb-6 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Estimated Timeline:</span>
                  <span className="font-semibold text-white">{estimate.timeline}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Payment Gateways:</span>
                  <span className="font-semibold text-cyan-300">PayFast / Ozow / Payflex</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Source Code:</span>
                  <span className="font-semibold text-purple-300">100% Client Ownership</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Post-Launch Care:</span>
                  <span className="font-semibold text-white">30 Days Included</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  id="quote-estimator-wizard-btn"
                  type="button"
                  onClick={() => {
                    setActiveTab('wizard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <span>Lock In Quote in Detailed Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="quote-estimator-whatsapp-btn"
                  type="button"
                  onClick={handleWhatsAppEstimate}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <span>Send Estimate to WhatsApp Developer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
