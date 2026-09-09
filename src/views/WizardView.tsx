import React, { useState } from 'react';
import { ViewTab, WizardFormState } from '../types';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calculator,
  MessageCircle,
  Copy,
  Check,
  Smartphone,
  Globe,
  Zap,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface WizardViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const WizardView: React.FC<WizardViewProps> = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calcProgress, setCalcProgress] = useState<number>(0);
  const [calcStatusText, setCalcStatusText] = useState<string>('Analyzing requirements...');
  const [copied, setCopied] = useState<boolean>(false);

  const [form, setForm] = useState<WizardFormState>({
    projectType: 'new',
    platform: 'mobile_app',
    pageCount: '5_10',
    features: ['payments', 'push_notifications', 'catalog'],
    budgetTier: 'r4500_promo',
    timeline: 'standard',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });

  // Calculate live estimate in ZAR
  const calculateEstimate = () => {
    let base = 0;
    const items: { name: string; cost: number }[] = [];

    // Platform base
    if (form.platform === 'mobile_app') {
      base = 4500;
      items.push({ name: 'Android eCommerce App (R4,500 Special Promo)', cost: 4500 });
    } else if (form.platform === 'website') {
      base = 3200;
      items.push({ name: 'Custom WordPress / Web Setup', cost: 3200 });
    } else if (form.platform === 'combo') {
      base = 7200;
      items.push({ name: 'Full Web Store + Android Mobile App Combo', cost: 7200 });
    } else {
      base = 5500;
      items.push({ name: 'Specialized Custom Development', cost: 5500 });
    }

    // Revamp vs New
    if (form.projectType === 'revamp') {
      const discount = Math.round(base * 0.15);
      base = Math.round(base * 0.85); // 15% discount for existing assets
      items.push({ name: 'Existing Site Asset Migration Discount (15%)', cost: -discount });
    }

    // Page count adjustments for web
    if (form.platform !== 'mobile_app') {
      if (form.pageCount === '5_10') {
        base += 800;
        items.push({ name: 'Extended Page Content Architecture (5-10 Pages)', cost: 800 });
      } else if (form.pageCount === 'more_10') {
        base += 1800;
        items.push({ name: 'Enterprise Page Architecture (10+ Pages)', cost: 1800 });
      }
    }

    // Additional selected features
    if (form.features.includes('seo')) {
      base += 950;
      items.push({ name: 'Local SEO Keyword & Google Schema Setup', cost: 950 });
    }
    if (form.features.includes('social_sync')) {
      base += 600;
      items.push({ name: 'Meta Commerce & WhatsApp Sync Integration', cost: 600 });
    }
    if (form.features.includes('domain_hosting')) {
      base += 750;
      items.push({ name: '1 Year .co.za Domain Registration & NVMe SSD Hosting', cost: 750 });
    }

    // Timeline rush
    if (form.timeline === 'rush') {
      base += 1200;
      items.push({ name: 'Priority Express Launch (3-5 Days Expedited)', cost: 1200 });
    }

    return { total: base, items };
  };

  const estimate = calculateEstimate();

  // Handle step progression with calculation animation
  const handleNextStep = () => {
    if (currentStep === 4) {
      setIsCalculating(true);
      setCalcProgress(15);
      setCalcStatusText('Analyzing feature complexity & architecture...');

      setTimeout(() => {
        setCalcProgress(55);
        setCalcStatusText('Calculating South African gateway & hosting tiers...');
      }, 350);

      setTimeout(() => {
        setCalcProgress(85);
        setCalcStatusText('Generating tailored ZAR proposal & timeline...');
      }, 700);

      setTimeout(() => {
        setCalcProgress(100);
        setIsCalculating(false);
        setCurrentStep(5);
      }, 1050);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const toggleFeature = (feat: string) => {
    setForm((prev) => {
      const exists = prev.features.includes(feat);
      return {
        ...prev,
        features: exists ? prev.features.filter((f) => f !== feat) : [...prev.features, feat],
      };
    });
  };

  const handleCopyQuote = () => {
    const text = `GeekForge Project Quote
Target: ${form.platform.toUpperCase()} (${form.projectType === 'new' ? 'New Build' : 'Revamp'})
Estimated Total: R ${estimate.total.toLocaleString()}
Selected Features: ${form.features.join(', ')}
Timeline: ${form.timeline === 'rush' ? 'Rush (3-5 Days)' : 'Standard (5-7 Days)'}
Contact GeekForge: admin@geekforge.co.za | +27 50 058 6175`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppQuote = () => {
    const msg = `Hi GeekForge! I just generated a project quote on your website:
• Project: ${form.projectType === 'new' ? 'New Build' : 'Revamp existing site'}
• Platform: ${form.platform}
• Estimated Total: R${estimate.total.toLocaleString()}
• Name: ${form.clientName || 'Client'}
• Phone: ${form.clientPhone || 'Not specified'}
• Notes: ${form.notes || 'None'}

Can we finalize the proposal and start?`;

    window.open(`${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          Automated Quote Generator Wizard
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Get an Instant Quote in South African Rands
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2">
          Select whether you need a new build or a revamp of an existing site, customize your platforms, and receive an instant price estimation.
        </p>
      </div>

      {/* STEP PROGRESS BAR & LABELS */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className={currentStep >= 1 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
            1. Scope
          </span>
          <span className={currentStep >= 2 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
            2. Platform
          </span>
          <span className={currentStep >= 3 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
            3. Features
          </span>
          <span className={currentStep >= 4 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
            4. Timeline
          </span>
          <span className={currentStep >= 5 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
            5. Final Quote
          </span>
        </div>

        {/* Animated Visual Progress Track */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0066FF] via-[#6366F1] to-[#9333EA] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* CALCULATION SIMULATION OVERLAY WITH ANIMATED PROGRESS BAR */}
      {isCalculating && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center shadow-xl space-y-6 animate-fade-in my-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 text-blue-500 dark:text-cyan-400 flex items-center justify-center animate-spin">
            <RefreshCw className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Calculating Custom Quote...
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {calcStatusText}
            </p>
          </div>
          <div className="w-full max-w-md mx-auto h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 rounded-full"
              style={{ width: `${calcProgress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-purple-400">
            {calcProgress}% Complete
          </span>
        </div>
      )}

      {!isCalculating && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl transition-all">
          {/* STEP 1: Project Scope (New vs Revamp) */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Step 1: What is the nature of your project?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Tell us if you are starting from scratch or improving an existing digital presence.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setForm({ ...form, projectType: 'new' })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.projectType === 'new'
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold mb-3">
                    ✨
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Brand New Build
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    I need a completely new website, eCommerce store, or Android mobile app built from the ground up.
                  </p>
                </div>

                <div
                  onClick={() => setForm({ ...form, projectType: 'revamp' })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.projectType === 'revamp'
                      ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-3">
                    🔄
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    Revamp Existing Website
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    I already have a website or domain that needs a modern redesign, mobile responsiveness, or faster loading speeds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Platform Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Step 2: Choose Your Desired Platform
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Pick the target platform that best suits how your customers browse and buy.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setForm({ ...form, platform: 'mobile_app' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    form.platform === 'mobile_app'
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs">
                    R4,500 Special
                  </span>
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Android eCommerce Mobile App
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Google Play Store publishing, push notifications, PayFast/Ozow, admin panel, and 100% source code ownership.
                  </p>
                </div>

                <div
                  onClick={() => setForm({ ...form, platform: 'website' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.platform === 'website'
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Custom WordPress / CMS Website
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Company profiles, brochure sites, or online catalog with mobile responsiveness and SEO setup.
                  </p>
                </div>

                <div
                  onClick={() => setForm({ ...form, platform: 'combo' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.platform === 'combo'
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Web Store + Android App Combo
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Synchronized inventory between your desktop eCommerce website and Google Play Android mobile application.
                  </p>
                </div>

                <div
                  onClick={() => setForm({ ...form, platform: 'custom' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    form.platform === 'custom'
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Dropshipping & Custom SaaS
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Automated product feeds, supplier API integrations, custom dashboards, and tailored business logic.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Core Features & Payments */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Step 3: Select Essential Features & Integrations
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Choose what functionality your users and store need.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'payments', label: '💳 PayFast & Ozow Secure Gateways', desc: 'Accept instant EFT, debit/credit cards, and SnapScan' },
                  { id: 'push_notifications', label: '🔔 Push Notifications (FCM)', desc: 'Send sales promos and updates directly to phones' },
                  { id: 'catalog', label: '📦 Product & Stock Admin Panel', desc: 'Easy dashboard to add, edit, and manage products' },
                  { id: 'delivery', label: '🚚 Courier Guy & Delivery Integration', desc: 'Live shipping rates or flat-rate door delivery' },
                  { id: 'seo', label: '🎯 Google SEO & Schema Setup', desc: 'Target local search queries in South Africa (+R950)' },
                  { id: 'social_sync', label: '📱 WhatsApp & Social Media Feed', desc: 'Instant live chat and automated Instagram catalog (+R600)' },
                  { id: 'domain_hosting', label: '🌐 .co.za Domain & SSD Hosting', desc: 'Includes SSL security certificate for 1 full year (+R750)' },
                ].map((feat) => {
                  const isChecked = form.features.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                          {feat.label}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {feat.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Timeline & Contact Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Step 4: Timeline & Project Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Select your expected delivery timeframe and provide your contact info for the proposal.
                </p>
              </div>

              {/* Timeline Options */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setForm({ ...form, timeline: 'standard' })}
                  className={`p-4 rounded-xl border cursor-pointer ${
                    form.timeline === 'standard'
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">
                    Standard Turnaround (5 - 7 Business Days)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Normal queue, thorough QA and Google Play review included.
                  </span>
                </div>

                <div
                  onClick={() => setForm({ ...form, timeline: 'rush' })}
                  className={`p-4 rounded-xl border cursor-pointer ${
                    form.timeline === 'rush'
                      ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">
                    Priority Rush (3 - 5 Days Expedited)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Accelerated sprint design & build (+R1,200).
                  </span>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name / Business
                  </label>
                  <input
                    type="text"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    placeholder="e.g. Sipho / TrendBoutique"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={form.clientPhone}
                    onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                    placeholder="e.g. +27 82 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.clientEmail}
                    onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                    placeholder="e.g. hello@mybusiness.co.za"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Project Notes or Existing Website URL (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Tell us what you sell, any competitor sites you like, or questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Instant Quote Generation & Summary */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider">
                  Automated Quote Complete
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Your Estimated Investment:
                </h3>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 mt-2">
                  R {estimate.total.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  All prices in South African Rands (ZAR). No hidden recurring software licenses.
                </p>
              </div>

              {/* Itemized Breakdown Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Itemized Scope Breakdown:
                </h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4">
                  {estimate.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {item.name}
                      </span>
                      <span className={`font-bold ${item.cost < 0 ? 'text-cyan-500' : 'text-slate-900 dark:text-white'}`}>
                        {item.cost < 0 ? `-R${Math.abs(item.cost).toLocaleString()}` : `R${item.cost.toLocaleString()}`}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 flex items-center justify-between text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    <span>Total Estimated Project Cost:</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 font-black">
                      R {estimate.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button
                  id="wizard-whatsapp-quote-btn"
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quote to WhatsApp (+27 50 058 6175)</span>
                </button>

                <button
                  id="wizard-copy-quote-btn"
                  type="button"
                  onClick={handleCopyQuote}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-blue-500 dark:text-cyan-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Quote Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-cyan-300 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-500 dark:text-cyan-400 shrink-0" />
                <span>
                  <strong>100% Code Ownership Guarantee:</strong> GeekForge gives you full access and ownership of all designs, source code, and assets.
                </span>
              </div>
            </div>
          )}

          {/* Navigation Controls (Prev / Next) */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
            {currentStep > 1 && currentStep < 5 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 && (
              <button
                id="wizard-step-next-btn"
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer ml-auto"
              >
                <span>{currentStep === 4 ? 'Calculate Final Quote →' : 'Continue Step →'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === 5 && (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Start New Calculation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
