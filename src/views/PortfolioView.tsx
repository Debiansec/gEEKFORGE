import React, { useState, useEffect, useCallback } from 'react';
import { ViewTab, PortfolioMediaItem } from '../types';
import { CASE_STUDIES, GEEKFORGE_CONTACT } from '../data/mockData';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  fetchVisitorPortfolio,
  fetchAdminPortfolio,
  updatePortfolioRecord,
  reorderPortfolioRecords,
  deletePortfolioRecord,
} from '../services/portfolioService';
import { CustomerMediaCard } from '../components/CustomerMediaCard';
import { CustomerMediaDetailModal } from '../components/CustomerMediaDetailModal';
import { AdminUploadModal } from '../components/AdminUploadModal';
import { AdminEditModal } from '../components/AdminEditModal';
import {
  Sparkles,
  UploadCloud,
  FolderArchive,
  ShieldCheck,
  Lock,
  LogOut,
  RefreshCw,
  Plus,
  Filter,
  CheckCircle2,
  Search,
  Smartphone,
  ShoppingBag,
  Layers,
} from 'lucide-react';

interface PortfolioViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ setActiveTab }) => {
  const { adminUser, adminToken, isAdminLoggedIn, openLoginModal, logout } = useAdminAuth();

  const [portfolioItems, setPortfolioItems] = useState<PortfolioMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioMediaItem | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioMediaItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load portfolio records according to role
  const loadPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isAdminLoggedIn && adminToken) {
        // Admin view: loads all media (published + drafts)
        const adminData = await fetchAdminPortfolio(adminToken);
        setPortfolioItems(adminData);
      } else {
        // Visitor view: strictly published, category = "Android Mobile Apps & eCommerce Showcase", uploaded_by = "authenticated_admin"
        const visitorData = await fetchVisitorPortfolio();
        setPortfolioItems(visitorData);
      }
    } catch (err) {
      console.error('Failed to load portfolio items:', err);
      setPortfolioItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAdminLoggedIn, adminToken]);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Admin Quick Actions
  const handleTogglePublish = async (item: PortfolioMediaItem) => {
    if (!adminToken) return;
    try {
      const updated = await updatePortfolioRecord(adminToken, item.id, {
        published: !item.published,
      });
      setPortfolioItems((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
      showNotification(
        updated.published
          ? `Published "${updated.title}" — Visitors can now see this media.`
          : `Unpublished "${updated.title}" — Immediately hidden from visitors.`
      );
    } catch (err: any) {
      alert(err.message || 'Failed to toggle publish status');
    }
  };

  const handleToggleFeatured = async (item: PortfolioMediaItem) => {
    if (!adminToken) return;
    try {
      const updated = await updatePortfolioRecord(adminToken, item.id, {
        featured: !item.featured,
      });
      setPortfolioItems((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
      showNotification(
        updated.featured ? `Marked "${updated.title}" as Featured.` : `Removed Featured status.`
      );
    } catch (err: any) {
      alert(err.message || 'Failed to toggle featured status');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (!adminToken || index <= 0) return;
    const newItems = [...portfolioItems];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setPortfolioItems(newItems);

    try {
      const reordered = await reorderPortfolioRecords(
        adminToken,
        newItems.map((i) => i.id)
      );
      setPortfolioItems(reordered);
      showNotification('Portfolio display order updated.');
    } catch (err: any) {
      alert(err.message || 'Failed to reorder items');
      loadPortfolio();
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!adminToken || index >= portfolioItems.length - 1) return;
    const newItems = [...portfolioItems];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setPortfolioItems(newItems);

    try {
      const reordered = await reorderPortfolioRecords(
        adminToken,
        newItems.map((i) => i.id)
      );
      setPortfolioItems(reordered);
      showNotification('Portfolio display order updated.');
    } catch (err: any) {
      alert(err.message || 'Failed to reorder items');
      loadPortfolio();
    }
  };

  const handleDeleteItem = async (item: PortfolioMediaItem) => {
    if (!adminToken) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${item.title}"? This cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      await deletePortfolioRecord(adminToken, item.id);
      setPortfolioItems((prev) => prev.filter((p) => p.id !== item.id));
      showNotification(`Deleted "${item.title}".`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete portfolio media');
    }
  };

  const handleUploadSuccess = (newRecord: PortfolioMediaItem) => {
    setPortfolioItems((prev) => [newRecord, ...prev]);
    setIsUploadModalOpen(false);
    showNotification(
      newRecord.published
        ? `Successfully published "${newRecord.title}"!`
        : `Saved draft for "${newRecord.title}".`
    );
  };

  const handleItemUpdated = (updatedRecord: PortfolioMediaItem) => {
    setPortfolioItems((prev) =>
      prev.map((item) => (item.id === updatedRecord.id ? updatedRecord : item))
    );
    setEditingItem(null);
    showNotification(`Updated "${updatedRecord.title}".`);
  };

  const handleItemDeleted = (deletedId: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== deletedId));
    setEditingItem(null);
    showNotification('Portfolio item removed.');
  };

  const publishedCount = portfolioItems.filter((i) => i.published).length;
  const draftCount = portfolioItems.filter((i) => !i.published).length;

  // Filter and search
  const filteredItems = portfolioItems.filter((item) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchClient = item.client.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchFeatures = item.features.some((f) => f.toLowerCase().includes(q));
      if (!matchTitle && !matchClient && !matchDesc && !matchFeatures) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'combat') {
      return item.title.toLowerCase().includes('fight') || item.title.toLowerCase().includes('boxing');
    }
    if (selectedCategory === 'sme') {
      return (
        item.title.toLowerCase().includes('os') ||
        item.title.toLowerCase().includes('stokvel') ||
        item.title.toLowerCase().includes('security') ||
        item.title.toLowerCase().includes('solar')
      );
    }
    if (selectedCategory === 'dropship') {
      return item.title.toLowerCase().includes('dropship') || item.title.toLowerCase().includes('brand ai');
    }
    if (selectedCategory === 'retail') {
      return (
        item.title.toLowerCase().includes('fashion') ||
        item.title.toLowerCase().includes('kicks') ||
        item.title.toLowerCase().includes('beauty') ||
        item.title.toLowerCase().includes('newborn') ||
        item.title.toLowerCase().includes('butcher') ||
        item.title.toLowerCase().includes('cake') ||
        item.title.toLowerCase().includes('shopza') ||
        item.title.toLowerCase().includes('mobiledirect')
      );
    }
    return true;
  });

  return (
    <div className="space-y-16 sm:space-y-24 py-6 pb-20">
      {/* Toast notification */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-orange-500/40 flex items-center gap-3 animate-fade-in text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/30 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-3">
          Customer Work Completed & Portfolio
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Android Mobile Apps & eCommerce Showcase
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
          Explore 16+ verified production-ready Android mobile applications, automated dropshipping hubs, and custom business management portals designed, engineered, and published by GeekForge.
        </p>

        {/* Administrator Auth Banner / Entrypoint */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {isAdminLoggedIn ? (
            <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-600/10 via-amber-600/10 to-blue-600/10 border border-orange-500/30 text-xs text-slate-800 dark:text-slate-200 shadow-sm">
              <div className="flex items-center gap-1.5 font-bold text-[#FF5722]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Admin: {adminUser?.email}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {publishedCount} Published
              </span>
              {draftCount > 0 && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-amber-500">
                    {draftCount} Drafts
                  </span>
                </>
              )}
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white font-bold hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Media</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-[#FF5722] dark:hover:text-[#FF8C00] text-xs font-semibold hover:border-orange-500/30 transition-all cursor-pointer shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Portfolio Upload Portal</span>
            </button>
          )}
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: `All Projects (${portfolioItems.length})` },
              { id: 'combat', label: 'Combat & Sports' },
              { id: 'sme', label: 'SME OS & Finance' },
              { id: 'dropship', label: 'Dropship & AI' },
              { id: 'retail', label: 'eCommerce & Retail' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-orange-500/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps, features, clients..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          // Skeleton Loading
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4 shadow-sm"
              >
                <div className="w-48 h-72 mx-auto bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 px-4 max-w-xl mx-auto rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-8 sm:p-14 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500/10 to-amber-500/10 text-[#FF5722] flex items-center justify-center mb-5 border border-orange-500/20">
              <FolderArchive className="w-8 h-8" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              No Projects Match Your Filter
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2.5 italic">
              Try adjusting your search query or switch category tab to see all 16 client applications.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white font-bold text-xs shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          // PORTFOLIO MEDIA GRID
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Displaying {filteredItems.length} verified production applications
              </div>
              {isAdminLoggedIn && (
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5722] to-[#FF9100] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer hover:opacity-90"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Media</span>
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, idx) => (
                <CustomerMediaCard
                  key={item.id}
                  item={item}
                  index={idx}
                  totalCount={filteredItems.length}
                  onSelect={(selected) => setSelectedItem(selected)}
                  onEdit={(editing) => setEditingItem(editing)}
                  onTogglePublish={handleTogglePublish}
                  onToggleFeatured={handleToggleFeatured}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CASE STUDIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-[#140b1c] to-[#0a1226] text-white rounded-3xl p-6 sm:p-12 border border-orange-500/30 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              Client Growth Case Studies
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
              Real Impact, Measurable Growth
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              How GeekForge engineered digital transformations and boosted online revenue for South African businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#FF5722] uppercase tracking-wider">
                      {cs.industry}
                    </span>
                    <span className="text-xs text-slate-400">Verified Case</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {cs.clientName}
                  </h3>

                  {/* Challenge & Solution */}
                  <div className="space-y-3 mb-6 text-xs leading-relaxed">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-rose-400 font-bold block mb-1">The Challenge:</span>
                      <p className="text-slate-300">{cs.challenge}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[#00A3FF] font-bold block mb-1">GeekForge Solution:</span>
                      <p className="text-slate-300">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950 text-center mb-6 border border-slate-800/50">
                    {cs.metrics.map((m, idx) => (
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
                </div>

                {/* Testimonial Quote snippet */}
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-xs italic text-slate-300 mb-2">
                    "{cs.testimonialQuote}"
                  </p>
                  <span className="text-[11px] font-bold text-[#FFB800] block">
                    — {cs.representative}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal for Selected Media Item */}
      <CustomerMediaDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        setActiveTab={setActiveTab}
      />

      {/* Admin Upload Modal */}
      <AdminUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Admin Edit Modal */}
      <AdminEditModal
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdated={handleItemUpdated}
        onDeleted={handleItemDeleted}
      />
    </div>
  );
};
