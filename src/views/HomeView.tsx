import React, { useState, useEffect } from 'react';
import { ViewTab, PortfolioMediaItem } from '../types';
import { SERVICES_DATA, GEEKFORGE_CONTACT } from '../data/mockData';
import { fetchVisitorPortfolio } from '../services/portfolioService';
import { CustomerMediaCard } from '../components/CustomerMediaCard';
import { CustomerMediaDetailModal } from '../components/CustomerMediaDetailModal';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { FAQAccordion } from '../components/FAQAccordion';
import {
  Smartphone,
  Globe,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageCircle,
  ChevronRight,
  FolderArchive,
  Star,
  Zap,
  Layers,
  Shield,
  Activity,
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const [visitorPortfolio, setVisitorPortfolio] = useState<PortfolioMediaItem[]>([]);
  const [selectedMediaItem, setSelectedMediaItem] = useState<PortfolioMediaItem | null>(null);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    fetchVisitorPortfolio()
      .then((data) => {
        if (isMounted) {
          setVisitorPortfolio(data);
          setIsLoadingPortfolio(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load portfolio on home:', err);
        if (isMounted) setIsLoadingPortfolio(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const firstUploadedApp = visitorPortfolio.length > 0 ? visitorPortfolio[0] : null;

  // Filtered portfolio for home page display (top 6)
  const filteredHomePortfolio = visitorPortfolio.filter((item) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'mobile') return item.platform.toLowerCase().includes('android');
    if (activeCategoryFilter === 'ecommerce') return item.title.toLowerCase().includes('store') || item.title.toLowerCase().includes('retail') || item.title.toLowerCase().includes('dropship') || item.title.toLowerCase().includes('butcher') || item.title.toLowerCase().includes('fashion');
    if (activeCategoryFilter === 'sme') return item.title.toLowerCase().includes('os') || item.title.toLowerCase().includes('stokvel') || item.title.toLowerCase().includes('security') || item.title.toLowerCase().includes('solar');
    return true;
  });

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION WITH WORKSTATION BACKGROUND & DONUT ACCENTS */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20">
        {/* Ambient brand glows: Orange, Gold & Cyan */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#FF5722]/15 via-[#FFB800]/10 to-[#00A3FF]/15 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/30 text-[#FF5722] dark:text-[#FF8C00] text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                <span className="text-slate-900 dark:text-slate-100 font-extrabold">GeekForge</span>
                <span className="text-slate-400">•</span>
                <span>South Africa's Premier Web & Android Engineers</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                We Engineer Websites & Android Apps That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FFB800] to-[#00A3FF]">
                  Scale Real Revenue.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From high-conversion <strong>WordPress CMS</strong> and custom <strong>eCommerce stores</strong> to our flagship <strong>R4,500 Android Mobile App Special</strong> published on the Google Play Store—explore 16+ live production apps designed for South African businesses.
              </p>

              {/* Quick Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722]" />
                  Fast Turnaround (5-7 Days)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
                  PayFast & Ozow Integrated
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3FF]" />
                  100% You Own Source Code
                </span>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  id="hero-wizard-cta-btn"
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#FF9100] hover:from-[#E64A19] hover:to-[#FF8C00] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Get Automated Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-portfolio-cta-btn"
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm sm:text-base transition-colors cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-orange-500/40 flex items-center justify-center gap-2"
                >
                  <span>Explore 16+ Showcase Apps</span>
                  <ChevronRight className="w-4 h-4 text-[#FF5722]" />
                </button>
              </div>

              {/* Contact direct snippet */}
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center lg:justify-start gap-3">
                <span>💬 Direct WhatsApp:</span>
                <a
                  href={GEEKFORGE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FF5722] dark:text-[#FF8C00] font-bold hover:underline"
                >
                  {GEEKFORGE_CONTACT.phoneDisplay}
                </a>
                <span>•</span>
                <span>admin@geekforge.co.za</span>
              </div>
            </div>

            {/* Hero Right Visual: Live interactive preview of GeekForge app */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Floating promo badge */}
                <div className="absolute -top-4 -left-4 z-30 bg-slate-900/95 border border-orange-500/30 rounded-2xl p-3 shadow-xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-[#FF5722] flex items-center justify-center font-bold text-lg">
                    🚀
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                      Google Play Special
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      Android App for R4,500
                    </span>
                  </div>
                </div>

                {/* Interactive Phone Frame */}
                <div className="relative mx-auto rounded-[36px] p-2.5 shadow-2xl border-4 border-slate-800 dark:border-slate-700 bg-slate-950 max-w-[280px]">
                  {/* Notch */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-900 rounded-full z-20 border border-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  </div>

                  <div className="rounded-[24px] overflow-hidden bg-slate-900 min-h-[400px] max-h-[440px] flex flex-col justify-between p-3 relative">
                    {firstUploadedApp ? (
                      // Display live showcase app
                      <div className="h-full flex flex-col justify-between">
                        <div className="pt-6">
                          <span
                            className="text-[9.5px] px-2 py-0.5 rounded-full font-bold uppercase"
                            style={{
                              backgroundColor: `${firstUploadedApp.accent_color}20`,
                              color: firstUploadedApp.accent_color,
                            }}
                          >
                            {firstUploadedApp.platform}
                          </span>
                          <h4 className="text-white font-bold text-sm mt-1 line-clamp-1">
                            {firstUploadedApp.title}
                          </h4>
                          <p className="text-slate-400 text-[10px] line-clamp-1">
                            Client: {firstUploadedApp.client}
                          </p>
                        </div>

                        <div className="rounded-xl overflow-hidden my-2 border border-slate-800 bg-slate-950 flex items-center justify-center max-h-52">
                          <img
                            src={firstUploadedApp.media_url}
                            alt={firstUploadedApp.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedMediaItem(firstUploadedApp)}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white font-extrabold text-[11px] text-center shadow-md cursor-pointer hover:opacity-95"
                        >
                          View App Details & Case Study →
                        </button>
                      </div>
                    ) : (
                      // Turnkey GeekForge Android App Platform Showcase Preview
                      <div className="h-full flex flex-col justify-between pt-6 text-white">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                            <span>GeekForge Native Engine</span>
                            <span className="text-emerald-400 font-bold">Play Store Ready</span>
                          </div>
                          <h4 className="font-heading font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FFB800]">
                            Custom Android App
                          </h4>
                          <p className="text-slate-400 text-[11px] mt-1 leading-snug">
                            High performance mobile commerce, direct push notifications, and instant PayFast & Ozow payments.
                          </p>
                        </div>

                        <div className="my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-[#00A3FF]" />
                              Turnaround
                            </span>
                            <span className="text-[#00A3FF] font-bold">5 - 7 Days</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300 flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3 text-[#FF5722]" />
                              Fixed Price
                            </span>
                            <span className="text-[#FF5722] font-bold">R4,500 Once-Off</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Source Code
                            </span>
                            <span className="text-emerald-400 font-bold">100% Client Owned</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveTab('wizard')}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white font-bold text-xs text-center shadow-md cursor-pointer hover:opacity-95"
                        >
                          Configure Your App Quote
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating reviews badge */}
                <div className="absolute -bottom-4 -right-4 z-30 bg-slate-900/95 border border-slate-800 rounded-2xl p-3 shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-gradient-to-tr from-[#FF5722] to-[#FF9100] text-white flex items-center justify-center text-[10px] font-bold">
                      ZA
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-gradient-to-tr from-[#00A3FF] to-[#0284C7] text-white flex items-center justify-center text-[10px] font-bold">
                      GF
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      4.9 / 5.0 Rating
                    </span>
                    <span className="text-[10px] text-[#FFB800] font-semibold">
                      Verified 16+ Production Apps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLAGSHIP ANDROID APP PROMO BANNER (R4,500 SPECIAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#130b1c] to-[#0a1226] text-white p-6 sm:p-12 border border-orange-500/30 shadow-2xl overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-[#FFB800] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                Flagship Mobile Application Development Special
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                🚀 Get Your Own Android Mobile App for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FFB800] to-[#00A3FF] underline decoration-[#FF5722] decoration-wavy decoration-2">
                  ONLY R4,500!
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Elevate your eCommerce brand, dropshipping store, butchery, or service business with a custom, high-speed Android app published directly to the Google Play Store. Keep customers ordering directly with zero middleman commissions.
              </p>

              {/* Deliverables Grid */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                  <span>Google Play Store Submission & Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                  <span>Push Notifications to Alert Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
                  <span>South African Payment Gateways (PayFast, Ozow)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                  <span>Live Product Catalog & Direct WhatsApp Sync</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  id="banner-claim-special-btn"
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#FF9100] hover:from-[#E64A19] hover:to-[#FF8C00] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  Claim R4,500 Android App Special
                </button>

                <a
                  href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(
                    'Hi GeekForge, I want to claim the R4,500 Android Mobile App Special for my business!'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-slate-900/90 border border-orange-500/30 rounded-3xl p-6 text-center space-y-4 max-w-xs w-full shadow-2xl backdrop-blur-md">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF5722] to-[#FFB800] flex items-center justify-center shadow-lg">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Limited Time Package
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    R4,500{' '}
                    <span className="text-xs text-slate-400 font-normal">once-off</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold mt-1">
                    Save R3,000 off regular price
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 text-left text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF5722]">✓</span>
                    <span>Android APK + AAB file</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFB800]">✓</span>
                    <span>Store Icon & Splash Screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00A3FF]">✓</span>
                    <span>5-7 business days turnaround</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-2">
              Our Core Expertise
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              High-Speed Web & Mobile Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
              Engineered with modern code, strict security, and high conversion rates.
            </p>
          </div>
          <button
            id="home-view-all-services-btn"
            type="button"
            onClick={() => setActiveTab('services')}
            className="inline-flex items-center gap-2 text-[#FF5722] dark:text-[#FF8C00] font-bold text-sm hover:underline cursor-pointer"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                    service.category === 'mobile'
                      ? 'bg-orange-500/10 text-[#FF5722]'
                      : service.category === 'ecommerce'
                      ? 'bg-amber-500/10 text-[#FFB800]'
                      : 'bg-blue-500/10 text-[#00A3FF]'
                  }`}
                >
                  {service.category === 'mobile' ? (
                    <Smartphone className="w-6 h-6" />
                  ) : service.category === 'ecommerce' ? (
                    <ShoppingBag className="w-6 h-6" />
                  ) : (
                    <Globe className="w-6 h-6" />
                  )}
                </div>

                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {service.badge || 'Fast Turnaround'}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-[#FF5722] dark:group-hover:text-[#FF8C00] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                    {service.startingPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="px-3.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-gradient-to-r hover:from-[#FF5722] hover:to-[#FF9100] text-[#FF5722] dark:text-[#FF8C00] hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Configure Quote →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO SECTION (REAL 16+ LIVE APPS SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-2">
              Our Work In Action • 16 Production Applications
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Customer Work Completed & Real Live Apps
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
              Browse completed Android mobile apps, specialized dropshipping stores, and custom business portals built for South African businesses.
            </p>
          </div>

          <button
            id="home-view-all-portfolio-btn"
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-[#FF5722] dark:text-[#FF8C00] font-bold text-sm hover:bg-orange-500/20 cursor-pointer transition-colors"
          >
            <span>Explore All 16 Portfolio Apps</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Projects (16)' },
            { id: 'mobile', label: 'Android Mobile Apps' },
            { id: 'ecommerce', label: 'eCommerce & Dropshipping' },
            { id: 'sme', label: 'SME Management & Utilities' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-orange-500/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoadingPortfolio ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4"
              >
                <div className="w-40 h-56 mx-auto bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
              </div>
            ))}
          </div>
        ) : filteredHomePortfolio.length === 0 ? (
          <div className="text-center py-14 px-4 max-w-xl mx-auto rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-8 sm:p-12 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500/10 to-amber-500/10 text-[#FF5722] flex items-center justify-center mb-4 border border-orange-500/20">
              <FolderArchive className="w-7 h-7" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              No Projects in this Filter
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 italic">
              Switch back to all projects to view all 16 client applications.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-500/10 text-[#FF5722] font-bold text-xs"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomePortfolio.slice(0, 6).map((item, idx) => (
              <CustomerMediaCard
                key={item.id}
                item={item}
                index={idx}
                totalCount={filteredHomePortfolio.length}
                onSelect={(selected) => setSelectedMediaItem(selected)}
              />
            ))}
          </div>
        )}

        {filteredHomePortfolio.length > 6 && (
          <div className="text-center pt-8">
            <button
              type="button"
              onClick={() => setActiveTab('portfolio')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#FF9100] hover:from-[#E64A19] hover:to-[#FF8C00] text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <span>View All 16 Portfolio Showcase Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 5. TESTIMONIAL CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-2">
            Social Proof & Client Stories
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by South African Business Owners
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
            See how GeekForge turns ideas into profitable web and mobile reality.
          </p>
        </div>

        <TestimonialCarousel />
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-2">
            Questions & Answers
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
            Everything you need to know about our development timelines, hosting, and guarantees.
          </p>
        </div>

        <FAQAccordion />
      </section>

      {/* 7. BOTTOM CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#FF9100] p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Launch Your High-Converting App or Store?
            </h2>
            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              Generate an itemized quote in under 2 minutes with our Automated Quote Wizard, or message our engineering team directly on WhatsApp for an immediate consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('wizard')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#FF5722] font-extrabold text-sm sm:text-base shadow-lg hover:bg-orange-50 transition-all cursor-pointer"
              >
                Launch Automated Quote Wizard
              </button>
              <a
                href={GEEKFORGE_CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected media modal */}
      <CustomerMediaDetailModal
        item={selectedMediaItem}
        onClose={() => setSelectedMediaItem(null)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
