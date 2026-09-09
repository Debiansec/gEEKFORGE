import React, { useState } from 'react';
import { BUDGET_TIERS, GEEKFORGE_CONTACT } from '../data/mockData';
import { ViewTab } from '../types';
import { Check, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface BudgetCalculatorProps {
  onSelectTier?: (tierName: string, tab: ViewTab) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onSelectTier }) => {
  const [budget, setBudget] = useState<number>(4500);

  // Determine active tier based on budget
  const activeTier = BUDGET_TIERS.find((t) => budget >= t.min && budget <= t.max) || BUDGET_TIERS[BUDGET_TIERS.length - 1];

  const presets = [3000, 4500, 8500, 15000];

  const handleLaunchWizard = () => {
    if (onSelectTier) {
      onSelectTier(activeTier.title, 'wizard');
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hi GeekForge, my estimated budget is R${budget.toLocaleString()} and I am interested in your "${activeTier.title}" package. Can we discuss?`
    );
    window.open(`${GEEKFORGE_CONTACT.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <div
      id="budget-calculator-widget"
      className="w-full max-w-4xl mx-auto bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden"
    >
      {/* Neon Glow Blending Blue and Purple */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Interactive Budget Calculator
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          What Is Your Estimated Project Budget?
        </h3>
        <p className="text-slate-400 text-sm mt-2">
          Slide to match your budget in South African Rands (ZAR) to see the ideal service package, deliverables, and estimated turnaround.
        </p>
      </div>

      {/* Slider & Display */}
      <div className="max-w-xl mx-auto mb-8 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400 font-medium">Budget Target</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            R {budget.toLocaleString()}
          </span>
        </div>

        <input
          id="budget-range-slider"
          type="range"
          min={2500}
          max={25000}
          step={500}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
        />

        {/* Preset Pills */}
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <span>R 2,500</span>
          <div className="flex gap-2">
            {presets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setBudget(val)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  budget === val
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                R{val >= 1000 ? `${val / 1000}k` : val}
              </button>
            ))}
          </div>
          <span>R 25,000+</span>
        </div>
      </div>

      {/* Recommended Package Card */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                {activeTier.title}
              </h4>
              {activeTier.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xs shadow-xs">
                  {activeTier.badge}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-1">
              {activeTier.description}
            </p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs text-slate-400 block">Typical Investment</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {activeTier.price}
            </span>
          </div>
        </div>

        {/* Deliverables checklist */}
        <div className="mt-6">
          <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            What's Included in this Tier:
          </h5>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {activeTier.included.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <div className="w-4 h-4 rounded-full bg-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-slate-700/60">
          <button
            id="budget-calc-wizard-btn"
            type="button"
            onClick={handleLaunchWizard}
            className="w-full sm:w-auto flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] via-[#4F46E5] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 cursor-pointer"
          >
            <span>{activeTier.recommendedAction}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="budget-calc-whatsapp-btn"
            type="button"
            onClick={handleWhatsAppInquiry}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
