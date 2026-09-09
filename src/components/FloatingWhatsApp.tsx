import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewTab } from '../types';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  activeTab: ViewTab;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ activeTab }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Context-specific messaging based on current tab
  const getContext = () => {
    switch (activeTab) {
      case 'portfolio':
        return {
          tooltip: 'Inquire about Android App Special (R4,500)',
          message: 'Hi GeekForge! I was browsing your Android Mobile App portfolio and would like to inquire about the R4,500 eCommerce special.',
        };
      case 'services':
        return {
          tooltip: 'Discuss Web & eCommerce Services',
          message: 'Hi GeekForge! I am reviewing your web development and eCommerce services and would like to discuss my project requirements.',
        };
      case 'wizard':
        return {
          tooltip: 'Need Help With Your Quote?',
          message: 'Hi GeekForge! I am using your automated quote wizard and have a few custom questions about my website.',
        };
      case 'blog':
        return {
          tooltip: 'Ask a Tech or Strategy Question',
          message: 'Hi GeekForge! I read your industry insights and have a question about online stores and payment gateways in South Africa.',
        };
      case 'contact':
        return {
          tooltip: 'Direct WhatsApp Line (+27 50 058 6175)',
          message: 'Hi GeekForge! I would like to get in touch regarding a web or mobile development project.',
        };
      case 'home':
      default:
        return {
          tooltip: 'Chat with a Developer • Instant Reply',
          message: 'Hi GeekForge! I am interested in building a website / Android app for my business. Can you assist?',
        };
    }
  };

  const context = getContext();

  const handleOpenWhatsApp = () => {
    const url = `${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(context.message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      id="floating-whatsapp-container"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        mass: 0.8,
        delay: 0.3,
      }}
    >
      {/* Context Tooltip Bubble */}
      {!isDismissed && (
        <div className="relative hidden sm:flex items-center gap-2 bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs font-medium py-2 px-3.5 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              Online • WhatsApp SA
            </span>
            <span className="text-slate-200">{context.tooltip}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-slate-700 transition-colors"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Triangular pointer */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-slate-900 dark:border-l-slate-800"></div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        id="floating-whatsapp-btn"
        type="button"
        onClick={handleOpenWhatsApp}
        className="group relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat with GeekForge on WhatsApp"
      >
        {/* Pulse ping ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 fill-white text-white drop-shadow-sm" />

        {/* Small South Africa flag badge */}
        <span className="absolute -top-1 -right-1 text-xs select-none">
          🇿🇦
        </span>
      </button>
    </motion.div>
  );
};
