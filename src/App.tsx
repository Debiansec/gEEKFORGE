/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewTab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminLoginModal } from './components/AdminLoginModal';
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
      <AdminAuthProvider>
        <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 selection:bg-[#FF5722] selection:text-white transition-colors duration-200 relative overflow-x-hidden">
          {/* Studio Workstation Background Image Layer with Ambient Vignette */}
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-cover bg-center bg-no-repeat transition-opacity"
            style={{ backgroundImage: "url('/background.jpg')" }}
          />

          {/* Ambient Brand Glows mirroring GeekForge Donut (Flame Orange, Gold, Cyan) */}
          <div className="fixed -top-20 left-1/4 w-[500px] h-[500px] bg-[#FF5722]/15 rounded-full blur-[150px] pointer-events-none -z-10" />
          <div className="fixed top-1/3 -right-20 w-[450px] h-[450px] bg-[#FFB800]/12 rounded-full blur-[150px] pointer-events-none -z-10" />
          <div className="fixed -bottom-20 left-10 w-[500px] h-[500px] bg-[#00A3FF]/15 rounded-full blur-[150px] pointer-events-none -z-10" />

          {/* Subtle Top Scroll Progress Indicator */}
          <ScrollProgressBar />

          {/* Navigation Bar */}
          <div className="relative z-40">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main View Render */}
          <main className="flex-1 w-full relative z-10">
            {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
            {activeTab === 'services' && <ServicesView setActiveTab={setActiveTab} />}
            {activeTab === 'portfolio' && <PortfolioView setActiveTab={setActiveTab} />}
            {activeTab === 'wizard' && <WizardView setActiveTab={setActiveTab} />}
            {activeTab === 'blog' && <BlogView setActiveTab={setActiveTab} />}
            {activeTab === 'contact' && <ContactView setActiveTab={setActiveTab} />}
          </main>

          {/* Footer */}
          <div className="relative z-30">
            <Footer setActiveTab={setActiveTab} />
          </div>

          {/* Floating Context-Aware WhatsApp Button */}
          <FloatingWhatsApp activeTab={activeTab} />

          {/* Admin Login Dialog */}
          <AdminLoginModal />
        </div>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}
