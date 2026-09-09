import React from 'react';
import { ViewTab } from '../types';
import { SERVICES_DATA, PORTFOLIO_DATA, GEEKFORGE_CONTACT } from '../data/mockData';
import { DeviceMockup } from '../components/DeviceMockup';
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
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  // Sample featured apps for the home section
  const featuredApp = PORTFOLIO_DATA[0]; // DropShop
  const featuredKicks = PORTFOLIO_DATA[1]; // Fashion Express

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20">
        {/* Background gradient decorative shapes: Neon Blue & Neon Purple Blend */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#0066FF]/20 via-[#6366F1]/15 to-[#9333EA]/20 blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/25 text-blue-600 dark:text-cyan-300 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-ping" />
                <span>South Africa's Trusted Web & Mobile Developers</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                We Design, Build & Launch Websites That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#6366F1] to-[#9333EA] dark:from-[#38BDF8] dark:via-[#818CF8] dark:to-[#C084FC]">
                  Deliver Real Sales.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From custom <strong>WordPress CMS</strong> and high-converting <strong>eCommerce stores</strong> to our flagship <strong>R4,500 Android Mobile App Special</strong> published on the Google Play Store—we help your brand dominate online.
              </p>

              {/* Quick Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  Fast Turnaround (5-7 Days)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  PayFast & Ozow Integrated
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  100% You Own Source Code
                </span>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  id="hero-wizard-cta-btn"
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] via-[#4F46E5] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-purple-500/35 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Get Automated Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-portfolio-cta-btn"
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm sm:text-base transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
                >
                  <span>Explore 11+ Apps</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Contact direct snippet */}
              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center lg:justify-start gap-3">
                <span>💬 Quick WhatsApp:</span>
                <a
                  href={GEEKFORGE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-cyan-400 font-bold hover:underline"
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
                <div className="absolute -top-4 -left-4 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-bounce-gentle">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-cyan-300 flex items-center justify-center font-bold">
                    🚀
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                      Google Play Special
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Android App for R4,500
                    </span>
                  </div>
                </div>

                {/* Device Mockup */}
                <DeviceMockup item={featuredApp} />

                {/* Floating reviews badge */}
                <div className="absolute -bottom-4 -right-4 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xl flex items-center gap-2.5">
                  <div className="flex -space-x-2">
                    <img
                      className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                      alt="Client"
                    />
                    <img
                      className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                      alt="Client"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      4.9 / 5.0 Star Rating
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-purple-400 font-semibold">
                      50+ South African Stores
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
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a1024] to-[#1a0f30] text-white p-6 sm:p-12 border border-blue-500/30 shadow-2xl overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Mobile Application Development Promotion
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                🚀 Get Your Own Android Mobile App for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 underline decoration-cyan-400 decoration-wavy decoration-2">
                  ONLY R4,500!
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Transform your business into a 24/7 online store with a professional Android eCommerce App — published on the Google Play Store and ready for customers to download!
              </p>

              {/* What You Get Checklist */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-cyan-400 font-bold">✅</span>
                  <span>Full eCommerce Store Functionality</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-cyan-400 font-bold">✅</span>
                  <span>Secure Online Payments (PayFast, Ozow, Cards)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-cyan-400 font-bold">✅</span>
                  <span>Fast Checkout & Order Management</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-purple-400 font-bold">✅</span>
                  <span>Push Notifications & Flash Promotions</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-purple-400 font-bold">✅</span>
                  <span>Product / Stock Management Admin Panel</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-purple-400 font-bold">✅</span>
                  <span>Shipping & Delivery Setup (Courier Guy etc.)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-cyan-400 font-bold">✅</span>
                  <span>WhatsApp, Social Media & Google Maps Sync</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="text-cyan-400 font-bold">✅</span>
                  <span>Google Play Store Publishing Included</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 col-span-full">
                  <span className="text-purple-400 font-bold">✅</span>
                  <span className="font-semibold text-purple-200">You Own the Full Source Code & App Database Outright</span>
                </div>
              </div>

              {/* Perfect For Badges */}
              <div className="pt-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  💼 Perfect For:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['Clothing Stores', 'Boutiques', 'Restaurants', 'Beauty Shops', 'Electronics', 'Furniture', 'Butcheries', 'Cake Bakers', 'Solar Installers'].map((type, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
                      • {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button
                  id="promo-android-wizard-btn"
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <span>Claim R4,500 Special in Quote Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=Hi%20GeekForge!%20I%20want%20to%20claim%20the%20R4500%20Android%20Mobile%20App%20special%20for%20my%20business`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <span>WhatsApp: {GEEKFORGE_CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Visual device preview side */}
            <div className="lg:col-span-4 flex justify-center">
              <DeviceMockup item={featuredKicks} compact />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            Website Design & Setup
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            End-to-End Digital Solutions Built for Growth
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3">
            We design, build, and set up professional websites that look sharp, load fast, and do what they're meant to do—represent your business properly online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                srv.popular
                  ? 'bg-white dark:bg-slate-900 border-blue-500/40 shadow-xl ring-1 ring-purple-500/20'
                  : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-blue-600 dark:text-cyan-300 flex items-center justify-center font-bold">
                    {srv.category === 'mobile' ? (
                      <Smartphone className="w-5 h-5" />
                    ) : srv.category === 'ecommerce' ? (
                      <ShoppingBag className="w-5 h-5" />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                  </div>
                  {srv.badge && (
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {srv.shortDesc}
                </p>

                <ul className="space-y-2 mb-6">
                  {srv.features.slice(0, 4).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Starting at</span>
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">
                    {srv.startingPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-blue-600 dark:text-cyan-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Configure Quote →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PORTFOLIO CAROUSEL / TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
              Our Work In Action
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Customer Work Completed & Real Live Apps
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
              Browse 11+ completed Android apps and custom eCommerce stores built for South African entrepreneurs.
            </p>
          </div>
          <button
            id="home-view-all-portfolio-btn"
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold text-sm hover:underline cursor-pointer"
          >
            <span>View Full Portfolio & Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Featured App Previews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between"
            >
              <div className="mb-4">
                <DeviceMockup item={item} compact />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {item.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 font-bold">
                    {item.platform}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="grid grid-cols-3 gap-1 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-[10px]">
                  {item.stats.map((st, i) => (
                    <div key={i}>
                      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 block text-xs">
                        {st.value}
                      </span>
                      <span className="text-slate-400 truncate block">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIAL CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            Social Proof & Client Stories
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by South African Business Owners
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
            Real feedback from merchants in Johannesburg, Cape Town, Durban, and Pretoria.
          </p>
        </div>

        <TestimonialCarousel />
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Got Questions? We Have Honest Answers
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
            Everything you need to know about our R4,500 Android eCommerce special, timelines, payment setup, and web development.
          </p>
        </div>

        <FAQAccordion />
      </section>

      {/* 7. QUICK CONTACT CALLOUT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-100 dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-md">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Ready to bring your business vision to life immediately?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Contact us today to discuss your customization requirements, pricing tiers, and launch timeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => setActiveTab('wizard')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Start Automated Quote Generator
            </button>
            <a
              href={GEEKFORGE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {GEEKFORGE_CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
