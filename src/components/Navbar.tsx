import React, { useState } from 'react';
import { ViewTab } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import { GeekForgeLogo } from './GeekForgeLogo';
import {
  Sun,
  Moon,
  Menu,
  X,
  Calculator,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAdminLoggedIn, adminUser, openLoginModal } = useAdminAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: ViewTab; label: string; badge?: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'services', label: 'Services' },
    { tab: 'portfolio', label: 'Portfolio', badge: 'Showcase' },
    { tab: 'wizard', label: 'Quote Generator', badge: 'Automated' },
    { tab: 'blog', label: 'Insights' },
    { tab: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: ViewTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-[#080d1a]/95 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      {/* Top micro announcement bar with GeekForge Donut flame & cyan blend */}
      <div className="bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#00A3FF] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD000] animate-pulse" />
          <span>
            🚀 <strong>Limited Offer:</strong> Turnkey Android Mobile App for ONLY{' '}
            <strong className="underline decoration-[#FFD000] underline-offset-2">R4,500!</strong>
          </span>
        </span>
        <span className="hidden md:inline">• Google Play Store • PayFast & Ozow • 100% Code Ownership</span>
        <button
          type="button"
          onClick={() => handleNavClick('portfolio')}
          className="underline hover:text-amber-200 ml-1 font-bold cursor-pointer transition-colors"
        >
          View Apps →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Official GeekForge Logo */}
        <button
          id="navbar-brand-logo"
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left group cursor-pointer"
        >
          <GeekForgeLogo size="md" showTagline={true} showDomain={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-link-${item.tab}`}
                type="button"
                onClick={() => handleNavClick(item.tab)}
                className={`relative px-3 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#FF5722] dark:text-[#FF8C00] bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-500/30 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span
                    className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side controls: Light/Dark Switch & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Theme Toggle Switch */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-orange-500/50 transition-all cursor-pointer shadow-xs group"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Switch light and dark mode"
          >
            <span
              className={`flex items-center gap-1 transition-colors ${
                theme === 'light' ? 'text-[#FFB800] font-bold' : 'text-slate-400 group-hover:text-slate-500'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Light</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span
              className={`flex items-center gap-1 transition-colors ${
                theme === 'dark' ? 'text-[#FF8C00] font-bold' : 'text-slate-400 group-hover:text-slate-500'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Dark</span>
            </span>
          </button>

          {/* Admin Portal Button */}
          {isAdminLoggedIn ? (
            <button
              type="button"
              onClick={() => handleNavClick('portfolio')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all cursor-pointer"
              title={`Logged in as ${adminUser?.email}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Admin Mode</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={openLoginModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF8C00] hover:border-orange-500/40 transition-all cursor-pointer"
              title="Admin Login"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-[11px]">Admin</span>
            </button>
          )}

          {/* Quick Quote Wizard CTA with GeekForge Flame Orange Gradient */}
          <button
            id="navbar-quote-cta-btn"
            type="button"
            onClick={() => handleNavClick('wizard')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#FF9100] hover:from-[#E64A19] hover:to-[#FF8C00] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 transition-all cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Quote</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white dark:bg-[#0c1222] border-b border-slate-200 dark:border-slate-800 space-y-2 shadow-2xl animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => handleNavClick(item.tab)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-blue-600 dark:text-cyan-300 border border-blue-500/20 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Mobile Theme Switcher Row */}
          <div className="pt-2 pb-1 flex items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Appearance:</span>
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => {
                  if (theme !== 'light') toggleTheme();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                  theme === 'light'
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
              <button
                type="button"
                onClick={() => {
                  if (theme !== 'dark') toggleTheme();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('wizard')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Quote Generator</span>
            </button>
            <a
              href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=Hi%20GeekForge,%20I%20would%20like%20to%20inquire%20about%20your%20services`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us: {GEEKFORGE_CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
