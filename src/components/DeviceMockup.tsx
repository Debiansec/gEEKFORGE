import React from 'react';
import { PortfolioItem } from '../types';
import { ShoppingBag, Star, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface DeviceMockupProps {
  item: PortfolioItem;
  className?: string;
  compact?: boolean;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ item, className = '', compact = false }) => {
  const isDark = item.mockupTheme === 'dark';
  const screen = item.mockupData.screens[0];

  return (
    <div
      id={`device-mockup-${item.id}`}
      className={`relative mx-auto rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 dark:border-slate-700 bg-slate-950 text-slate-100 transition-all duration-300 hover:scale-[1.02] ${compact ? 'max-w-[280px]' : 'max-w-[320px]'} ${className}`}
    >
      {/* Phone outer frame speaker and camera notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-between px-3 z-20 border border-slate-800">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-sky-900"></div>
        </div>
        <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
      </div>

      {/* Screen container */}
      <div
        className={`relative overflow-hidden rounded-[28px] pt-7 pb-4 px-3 flex flex-col justify-between min-h-[440px] text-xs ${
          isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
      >
        {/* Top Status Bar */}
        <div className="flex items-center justify-between px-1 mb-2 text-[10px] text-slate-400 font-medium tracking-tight">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2 border border-current rounded-xs"></span>
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* In-App Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/20">
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-sm" style={{ color: item.accentColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentColor }}></span>
              {item.mockupData.appName}
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
              {item.mockupData.tagline}
            </p>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-800/40 dark:bg-slate-800 flex items-center justify-center text-slate-300">
            <ShoppingBag className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Promo Hero Banner */}
        <div
          className="rounded-xl p-2.5 mb-2.5 text-white relative overflow-hidden shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${item.accentColor}dd, ${item.accentColor}88)`,
          }}
        >
          <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-black/30 backdrop-blur-xs inline-block mb-1">
            Featured Special
          </span>
          <h4 className="font-bold text-xs leading-tight drop-shadow-xs">
            {screen?.title || item.title}
          </h4>
          {screen?.subtitle && (
            <p className="text-[9.5px] text-white/90 mt-0.5 line-clamp-1">
              {screen.subtitle}
            </p>
          )}
        </div>

        {/* Product Items List */}
        <div className="space-y-1.5 flex-1 overflow-hidden">
          {screen?.items?.slice(0, 3).map((prod, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg border transition-all flex items-center justify-between gap-2 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[11px] truncate block">
                    {prod.name}
                  </span>
                </div>
                {prod.desc && (
                  <p className="text-[9px] text-slate-400 truncate">
                    {prod.desc}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-0.5">
                  {prod.price && (
                    <span className="font-bold text-[10.5px]" style={{ color: item.accentColor }}>
                      {prod.price}
                    </span>
                  )}
                  {prod.rating && (
                    <span className="flex items-center text-[9px] text-amber-500 font-medium">
                      <Star className="w-2.5 h-2.5 fill-amber-500 mr-0.5 inline" />
                      {prod.rating}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-white shadow-xs"
                style={{ backgroundColor: item.accentColor }}
                title="Add to Cart"
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Quick Trust Pill */}
        <div className="mt-2 py-1 px-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-cyan-400 text-[9.5px] flex items-center justify-between font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
            Fast SA Delivery & PayFast Safe
          </span>
          <span className="text-[9px] text-blue-600 dark:text-cyan-400 font-bold">Verified</span>
        </div>

        {/* Bottom In-App Nav Bar */}
        <div className="flex items-center justify-around pt-2 mt-1.5 border-t border-slate-700/20 text-[9px] text-slate-400">
          <span className="font-semibold" style={{ color: item.accentColor }}>Home</span>
          <span>Catalog</span>
          <span>Orders</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};
