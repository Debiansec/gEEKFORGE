import React, { useState, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { updatePortfolioRecord, uploadMediaFile, deletePortfolioRecord } from '../services/portfolioService';
import { PortfolioMediaItem } from '../types';
import {
  X,
  Loader2,
  AlertCircle,
  UploadCloud,
  CheckCircle2,
  Trash2,
  Eye,
  Star,
  Globe,
  Plus,
} from 'lucide-react';

interface AdminEditModalProps {
  item: PortfolioMediaItem | null;
  onClose: () => void;
  onUpdated: (updatedItem: PortfolioMediaItem) => void;
  onDeleted: (deletedId: string) => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({
  item,
  onClose,
  onUpdated,
  onDeleted,
}) => {
  const { adminToken } = useAdminAuth();

  if (!item) return null;

  const [title, setTitle] = useState(item.title);
  const [client, setClient] = useState(item.client);
  const [description, setDescription] = useState(item.description);
  const [platform, setPlatform] = useState(item.platform);
  const [year, setYear] = useState(item.year);
  const [accentColor, setAccentColor] = useState(item.accent_color);
  const [published, setPublished] = useState(item.published);
  const [featured, setFeatured] = useState(item.featured);
  const [features, setFeatures] = useState<string[]>(item.features || []);
  const [newTagInput, setNewTagInput] = useState('');

  // Media replacement state
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [replacementPreview, setReplacementPreview] = useState<string | null>(null);
  const [replacementType, setReplacementType] = useState<'image' | 'video'>('image');

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplacementFile = (file: File) => {
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    setReplacementFile(file);
    setReplacementType(isVideo ? 'video' : 'image');
    setReplacementPreview(URL.createObjectURL(file));
  };

  const addTag = () => {
    if (newTagInput.trim()) {
      setFeatures([...features, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const removeTag = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!adminToken) return;
    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      let mediaUrl = item.media_url;
      let mediaType = item.media_type;
      let originalName = item.media_original_name;
      let size = item.media_size;

      // If administrator replaced media file
      if (replacementFile) {
        const uploadRes = await uploadMediaFile(replacementFile, adminToken);
        mediaUrl = uploadRes.url;
        mediaType = uploadRes.type;
        originalName = uploadRes.original_name;
        size = uploadRes.size;
      }

      const updated = await updatePortfolioRecord(adminToken, item.id, {
        title: title.trim(),
        client: client.trim(),
        description: description.trim(),
        platform,
        year,
        accent_color: accentColor,
        published,
        featured,
        features,
        media_url: mediaUrl,
        media_type: mediaType,
        media_original_name: originalName,
        media_size: size,
      });

      onUpdated(updated);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update portfolio record');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!adminToken) return;
    setIsDeleting(true);
    try {
      await deletePortfolioRecord(adminToken, item.id);
      onDeleted(item.id);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete record');
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full my-6 p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
              Edit Portfolio Media Record
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ID: <span className="font-mono">{item.id.slice(0, 8)}...</span> • Uploaded by {item.uploaded_by}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="my-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 my-3">
          {/* Media Preview & Replace */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {replacementPreview ? 'New Media (Will replace existing)' : 'Current Media in Storage'}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Replace Media File</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleReplacementFile(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="rounded-xl overflow-hidden bg-slate-900 max-h-56 flex items-center justify-center relative">
              {replacementPreview ? (
                replacementType === 'video' ? (
                  <video src={replacementPreview} controls className="max-h-56 w-auto mx-auto" />
                ) : (
                  <img src={replacementPreview} alt="Replacement Preview" className="max-h-56 w-auto mx-auto object-contain" />
                )
              ) : item.media_type === 'video' ? (
                <video src={item.media_url} controls className="max-h-56 w-auto mx-auto" />
              ) : (
                <img src={item.media_url} alt={item.title} className="max-h-56 w-auto mx-auto object-contain" />
              )}
            </div>
            {replacementPreview && (
              <p className="text-[11px] text-amber-500 mt-1.5 font-medium">
                ⚠️ New media selected. Click "Save Changes" below to permanently replace the old file.
              </p>
            )}
          </div>

          {/* Published and Featured Toggles */}
          <div className="grid sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded-md text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {published ? 'Published (Visible to Visitors)' : 'Draft (Admin Only)'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Controls public visibility on the showcase
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded-md text-purple-600 focus:ring-purple-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {featured ? '★ Starred as Featured App' : 'Standard Item'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Highlights this project in special teasers
                </span>
              </div>
            </label>
          </div>

          {/* Form fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              >
                <option value="Android Mobile App">Android Mobile App</option>
                <option value="eCommerce & Dropshipping Store">eCommerce & Dropshipping Store</option>
                <option value="WordPress / WooCommerce">WordPress / WooCommerce</option>
                <option value="Custom Web & Mobile App">Custom Web & Mobile App</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer"
                />
                <span className="font-mono text-xs text-slate-500">{accentColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            </div>

            {/* Feature tags */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Key Features
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add feature tag..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {features.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(idx)}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls: Save / Delete */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Media Record</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-500 font-bold">Permanently delete?</span>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
