/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewTab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { PortfolioView } from './views/PortfolioView';
import { WizardView } from './views/WizardView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('home');

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
        {/* Subtle Top Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main View Render */}
        <main className="flex-1 w-full">
          {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'services' && <ServicesView setActiveTab={setActiveTab} />}
          {activeTab === 'portfolio' && <PortfolioView setActiveTab={setActiveTab} />}
          {activeTab === 'wizard' && <WizardView setActiveTab={setActiveTab} />}
          {activeTab === 'blog' && <BlogView setActiveTab={setActiveTab} />}
          {activeTab === 'contact' && <ContactView setActiveTab={setActiveTab} />}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />

        {/* Floating Context-Aware WhatsApp Button */}
        <FloatingWhatsApp activeTab={activeTab} />
      </div>
    </ThemeProvider>
  );
}
