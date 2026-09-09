import React, { useState } from 'react';
import { ViewTab, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  X,
} from 'lucide-react';

interface BlogViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const getPostImage = (post: BlogPost) => {
    if (post.coverImage) return post.coverImage;
    if (post.category === 'Mobile Apps') {
      return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80';
    }
    if (post.category === 'WordPress & CMS') {
      return 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80';
    }
    if (post.category === 'eCommerce') {
      return 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&auto=format&fit=crop&q=80';
    }
    if (post.category === 'SEO & Growth') {
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80';
    }
    return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80';
  };

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-6 pb-24">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          Industry Insights & Guides
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Web, Mobile & eCommerce Strategies
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Practical advice on selling online, integrating South African payment gateways, getting published on Google Play, and scaling your web presence.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="blog-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides, e.g. PayFast, Android app, SEO, dropshipping..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'Mobile Apps', label: 'Mobile Apps' },
            { id: 'eCommerce', label: 'eCommerce & PayFast' },
            { id: 'SEO & Growth', label: 'SEO & Google Rank' },
            { id: 'WordPress & CMS', label: 'WordPress & Tech' },
            { id: 'Tech Guides', label: 'Tech Guides' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
            <p className="text-xs text-slate-500 mt-1">Try another search term or reset your category filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                id={`blog-post-${post.id}`}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Article Image */}
                  <div
                    className="relative h-48 overflow-hidden cursor-pointer"
                    onClick={() => setActiveArticle(post)}
                  >
                    <img
                      src={getPostImage(post)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white">
                      {post.category}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2
                      onClick={() => setActiveArticle(post)}
                      className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors cursor-pointer leading-snug mb-3 line-clamp-2"
                    >
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Hero Banner */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={getPostImage(activeArticle)}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-block mb-2 shadow-xs">
                  {activeArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
                  <span>By {activeArticle.author.name} ({activeArticle.author.role})</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
                <span>{activeArticle.readTime}</span>
              </div>

              {/* Formatted Content */}
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Bottom In-Article CTA */}
              <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Ready to implement this for your business?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    GeekForge builds turnkey websites and mobile apps with full PayFast integration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    setActiveTab('wizard');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#9333EA] hover:from-[#0052cc] hover:to-[#7e22ce] text-white font-bold text-xs shrink-0 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Configure Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
