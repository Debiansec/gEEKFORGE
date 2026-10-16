import React, { useState } from 'react';
import { ViewTab } from '../types';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import { GeekForgeLogo } from './GeekForgeLogo';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNav = (tab: ViewTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please provide your email address.');
      setNewsletterStatus('error');
      return;
    }
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Please provide a valid email address.');
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 500);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Upper CTA Banner with Neon Blue / Purple Gradient */}
      <div className="bg-gradient-to-r from-[#0052cc] via-[#4338ca] to-[#7e22ce] text-white py-8 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-200">
              Ready to grow your business online?
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-0.5 tracking-tight">
              Get an Android eCommerce Mobile App for ONLY R4,500
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              Google Play Store publishing, full admin panel, PayFast & Ozow payments, and you own 100% of the source code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="footer-cta-wizard-btn"
              type="button"
              onClick={() => handleNav('wizard')}
              className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-extrabold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-lg cursor-pointer"
            >
              Start Automated Quote
            </button>
            <a
              id="footer-cta-whatsapp-link"
              href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=Hi%20GeekForge,%20I%20am%20ready%20to%20get%20started%20on%20my%20website/app`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/20 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>WhatsApp Us Today</span>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Mail className="w-4 h-4" />
              <span>South Africa Tech & eCommerce Newsletter</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Stay in the loop with web & mobile development updates
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Practical guides on PayFast integration, Google Play releases, and scaling online sales in South Africa.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] sm:min-w-[420px]">
            {newsletterStatus === 'success' ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you! You're subscribed to GeekForge updates.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    id="footer-newsletter-btn"
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-xs shrink-0 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                  </button>
                </div>
                {newsletterError && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{newsletterError}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About GeekForge & Official Logo */}
          <div className="space-y-4">
            <GeekForgeLogo size="md" showTagline={true} showDomain={true} />
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              We design, build, and deploy high-performance websites and native-grade mobile apps that look sharp, load fast, and generate consistent revenue across South Africa.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <span>🇿🇦 Proudly South African Engineering</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  R4,500 Android Mobile App Special
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  Custom WordPress & CMS Websites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  eCommerce (WooCommerce & Shopify)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  Dropshipping Website Development
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  SEO Optimization & Google Ranking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('services')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                  Website Setup, Domain & Fast Hosting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  App & Web Portfolio (11+ Real Works)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Growth Case Studies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('wizard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Automated Quote Calculator Wizard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Industry Insights & Tech Guides
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Project Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={GEEKFORGE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {GEEKFORGE_CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a
                  href={`mailto:${GEEKFORGE_CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {GEEKFORGE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`https://${GEEKFORGE_CONTACT.websiteDisplay}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {GEEKFORGE_CONTACT.websiteDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{GEEKFORGE_CONTACT.location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{GEEKFORGE_CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GeekForge (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              100% Code Ownership
            </span>
            <span>•</span>
            <span>PayFast / Ozow / Payflex Ready</span>
            <span>•</span>
            <span>Google Play Store Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
