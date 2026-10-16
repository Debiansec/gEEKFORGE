import React from 'react';
import { PortfolioMediaItem } from '../types';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  Globe,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Star,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Play,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface CustomerMediaCardProps {
  item: PortfolioMediaItem;
  index: number;
  totalCount: number;
  onSelect: (item: PortfolioMediaItem) => void;
  onEdit?: (item: PortfolioMediaItem) => void;
  onTogglePublish?: (item: PortfolioMediaItem) => void;
  onToggleFeatured?: (item: PortfolioMediaItem) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onDelete?: (item: PortfolioMediaItem) => void;
}

export const CustomerMediaCard: React.FC<CustomerMediaCardProps> = ({
  item,
  index,
  totalCount,
  onSelect,
  onEdit,
  onTogglePublish,
  onToggleFeatured,
  onMoveUp,
  onMoveDown,
  onDelete,
}) => {
  const { isAdminLoggedIn } = useAdminAuth();

  return (
    <div
      id={`portfolio-card-${item.id}`}
      className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all flex flex-col justify-between group relative shadow-md hover:shadow-xl ${
        item.featured
          ? 'border-purple-500/50 ring-1 ring-purple-500/20'
          : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/40'
      } ${!item.published ? 'opacity-90 border-dashed border-amber-500/40 bg-amber-500/5' : ''}`}
    >
      {/* Top Admin Controls Strip (Visible ONLY to Authenticated Administrator) */}
      {isAdminLoggedIn && (
        <div className="mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                item.published
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${item.published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {item.published ? 'Published' : 'Draft / Hidden'}
            </span>

            {item.featured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                ★ Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Reorder Up/Down */}
            {onMoveUp && (
              <button
                type="button"
                disabled={index === 0}
                onClick={() => onMoveUp(index)}
                className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                title="Move Up"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            )}
            {onMoveDown && (
              <button
                type="button"
                disabled={index === totalCount - 1}
                onClick={() => onMoveDown(index)}
                className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                title="Move Down"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Quick Publish / Unpublish Toggle */}
            {onTogglePublish && (
              <button
                type="button"
                onClick={() => onTogglePublish(item)}
                className={`p-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  item.published
                    ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                    : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
                title={item.published ? 'Unpublish (Hide from Visitors)' : 'Publish (Show to Visitors)'}
              >
                {item.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Star as Featured */}
            {onToggleFeatured && (
              <button
                type="button"
                onClick={() => onToggleFeatured(item)}
                className={`p-1 rounded-md text-xs cursor-pointer transition-colors ${
                  item.featured
                    ? 'text-purple-600 bg-purple-50 dark:bg-purple-950/40'
                    : 'text-slate-400 hover:text-purple-600'
                }`}
                title="Toggle Featured"
              >
                <Star className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Edit */}
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-cyan-400 cursor-pointer"
                title="Edit Project Details & Media"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Delete */}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item)}
                className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 cursor-pointer"
                title="Delete Media"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      <div>
        {/* Media Frame (Clean device frame display for the administrator's uploaded media) */}
        <div
          className="mb-6 cursor-pointer transform group-hover:-translate-y-1 transition-transform relative"
          onClick={() => onSelect(item)}
        >
          {/* Phone Frame Housing */}
          <div className="relative mx-auto rounded-[32px] p-2.5 shadow-xl border-4 border-slate-800 dark:border-slate-700 bg-slate-950 max-w-[260px] overflow-hidden">
            {/* Camera notch */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-900 rounded-full z-20 border border-slate-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>

            {/* Screen View */}
            <div className="rounded-[22px] overflow-hidden bg-slate-900 min-h-[340px] max-h-[380px] flex items-center justify-center relative">
              {item.media_type === 'video' ? (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                  <video
                    src={item.media_url}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                    onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none group-hover:bg-transparent transition-colors">
                    <div className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                      <Play className="w-4 h-4 ml-0.5 text-cyan-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}

              {/* Bottom in-phone watermark pill */}
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-[9px] text-slate-300 flex items-center justify-between border border-slate-800">
                <span className="font-semibold truncate">{item.client}</span>
                <span className="font-bold text-cyan-400 text-[8.5px]">Live Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Meta Information */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: `${item.accent_color || '#0066FF'}20`,
              color: item.accent_color || '#0066FF',
            }}
          >
            {item.platform}
          </span>
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {item.year}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">
          Client: {item.client}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
          {item.description || 'Android mobile application and digital commerce setup deployed for client.'}
        </p>

        {/* Key Features Tags */}
        {item.features && item.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.features.map((f, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Bottom Actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
        >
          View Full Media & Details →
        </button>
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
