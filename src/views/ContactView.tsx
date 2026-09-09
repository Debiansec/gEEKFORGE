import React, { useState } from 'react';
import { ViewTab } from '../types';
import { GEEKFORGE_CONTACT } from '../data/mockData';
import {
  Mail,
  Globe,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface ContactViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const ContactView: React.FC<ContactViewProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Android Mobile App (R4,500 Special)',
    budget: 'R4,500',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hi GeekForge!
I would like to start a project:
• Name: ${formData.name || 'Client'}
• Email: ${formData.email || 'N/A'}
• Service: ${formData.service}
• Budget: ${formData.budget}
• Message: ${formData.message || 'Please contact me to discuss my website/app.'}`;

    window.open(`${GEEKFORGE_CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-6 pb-24">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          Contact GeekForge
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Let's Build Something That Drives Real Revenue
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Reach out directly via WhatsApp for immediate support, or submit your project details below to receive a formal proposal.
        </p>
      </section>

      {/* Main Grid: Contact Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Highlight Box */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider block">
                    Fastest Response Channel
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Direct WhatsApp Support
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect directly with our lead developers in South Africa. We typically reply within 15–30 minutes during business hours.
              </p>

              <a
                id="contact-whatsapp-direct-link"
                href={`${GEEKFORGE_CONTACT.whatsappUrl}?text=Hi%20GeekForge,%20I%20would%20like%20to%20inquire%20about%20your%20services`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Now: {GEEKFORGE_CONTACT.phoneDisplay}</span>
              </a>
            </div>

            {/* General Info Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Contact Details
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500 dark:text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block font-semibold">Official Email</span>
                    <a href={`mailto:${GEEKFORGE_CONTACT.email}`} className="font-semibold hover:text-blue-500 dark:hover:text-cyan-400 transition-colors">
                      {GEEKFORGE_CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-500 dark:text-cyan-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block font-semibold">Website</span>
                    <a href={`https://${GEEKFORGE_CONTACT.websiteDisplay}`} target="_blank" rel="noreferrer" className="font-semibold hover:text-blue-500 dark:hover:text-cyan-400 transition-colors">
                      {GEEKFORGE_CONTACT.websiteDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-purple-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block font-semibold">Location & Reach</span>
                    <span className="font-semibold">{GEEKFORGE_CONTACT.location}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Deploying digital solutions nationwide across South Africa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block font-semibold">Operating Hours</span>
                    <span className="font-semibold">{GEEKFORGE_CONTACT.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                <span>NDA & Confidentiality Respected on all Inquiries.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
              <div className="mb-6">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Send a Project Brief
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fill in your details below and we will prepare a breakdown and proposal for your review.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-blue-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Message Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you {formData.name || 'there'}. Our engineering team will review your specifications and contact you via WhatsApp or Email shortly.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also Send to WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lerato Ndlovu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        WhatsApp / Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +27 82 555 1234"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. info@company.co.za"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Service Interested In
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Android Mobile App (R4,500 Special)">
                          🚀 Android Mobile App (R4,500 Special)
                        </option>
                        <option value="Custom WordPress / CMS Website">
                          Custom WordPress / CMS Website
                        </option>
                        <option value="eCommerce Online Store (WooCommerce / Shopify)">
                          eCommerce Online Store
                        </option>
                        <option value="Dropshipping Platform Build">
                          Dropshipping Platform Build
                        </option>
                        <option value="SEO & Growth Optimization">
                          SEO & Growth Optimization
                        </option>
                        <option value="Website Revamp & Speed Boost">
                          Website Revamp & Speed Boost
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Project Description & Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details about your products/services, timeline expectations, or any reference websites..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Project Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
