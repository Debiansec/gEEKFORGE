import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-android-price');
  const [activeFilter, setActiveFilter] = useState<'all' | 'android' | 'web' | 'pricing' | 'process'>('all');

  const filtered = FAQ_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Schema.org FAQPage structured data for search engine rich results and SEO visibility
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div id="faq-section" className="w-full max-w-3xl mx-auto">
      {/* Schema.org FAQPage JSON-LD Structured Data */}
      <script
        id="faq-jsonld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'android', label: 'R4,500 Android App', icon: true },
          { id: 'pricing', label: 'Payment Gateways & Cost' },
          { id: 'web', label: 'Websites & Domains' },
          { id: 'process', label: 'Timelines & Launch' },
        ].map((btn) => {
          const isActive = activeFilter === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#9333EA] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {btn.icon && <Sparkles className="w-3 h-3 text-cyan-300" />}
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Accordion Items */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              id={`faq-item-${item.id}`}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-blue-500/40 bg-white dark:bg-slate-900 shadow-md ring-1 ring-purple-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isOpen ? 'text-blue-500 dark:text-purple-400' : 'text-slate-400'
                    }`}
                  />
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-500 dark:text-purple-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
