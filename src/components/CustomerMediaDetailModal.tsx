import React from 'react';
import { PortfolioMediaItem, ViewTab } from '../types';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import { X, CheckCircle2, ArrowRight, Calendar, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';

interface CustomerMediaDetailModalProps {
  item: PortfolioMediaItem | null;
  onClose: () => void;
  setActiveTab: (tab: ViewTab) => void;
}

export const CustomerMediaDetailModal: React.FC<CustomerMediaDetailModalProps> = ({
  item,
  onClose,
  setActiveTab,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-orange-500/30 p-6 sm:p-8 shadow-2xl relative text-white">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Media Player / Display */}
          <div className="w-full md:w-80 shrink-0 mx-auto">
            <div className="rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-xl relative">
              {item.media_type === 'video' ? (
                <video
                  src={item.media_url}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full max-h-[460px] object-contain mx-auto"
                />
              ) : (
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full max-h-[460px] object-contain mx-auto"
                />
              )}
            </div>
            <div className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified Production Application</span>
            </div>
          </div>

          {/* Project Details */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full uppercase"
                  style={{
                    backgroundColor: `${item.accent_color || '#FF5722'}20`,
                    color: item.accent_color || '#FF5722',
                  }}
                >
                  {item.platform}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {item.year}
                </span>
                {item.featured && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-[#FFB800] border border-amber-500/30">
                    ★ Featured
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Client: <strong className="text-slate-200">{item.client}</strong>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.description || 'Custom mobile and eCommerce application engineered for production.'}
            </p>

            {/* Metrics pills if present */}
            {item.metrics && item.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                {item.metrics.map((m, idx) => (
                  <div key={idx}>
                    <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FFB800] block">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Deliverables / Features */}
            {item.features && item.features.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                  Key Deliverables & Integrations:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>100% Client Source Code & Database Ownership</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Special Promo Highlight */}
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs flex items-center justify-between">
              <span className="text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                Eligible for R4,500 Android App Special
              </span>
              <span className="text-[#FF5722] font-bold">5-7 Day Launch</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setActiveTab('wizard');
                }}
                className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#F97316] to-[#FF9100] hover:from-[#E64A19] hover:to-[#FF8C00] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-orange-500/20"
              >
                <span>Request Similar App Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(
                  `Hi GeekForge, I saw "${item.title}" in your Customer Portfolio and want to discuss building a similar app for my company.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
