import React, { useState, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { uploadMediaFile, createPortfolioRecord } from '../services/portfolioService';
import { PortfolioMediaItem } from '../types';
import {
  UploadCloud,
  FileVideo,
  FileImage,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react';

interface AdminUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newItem: PortfolioMediaItem) => void;
}

export const AdminUploadModal: React.FC<AdminUploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { adminToken } = useAdminAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video'>('image');

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('Android Mobile App');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [accentColor, setAccentColor] = useState('#0066FF');
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'Google Play Store Deployed',
    'PayFast & Ozow Integrated',
    'Push Notifications System',
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<'select' | 'preview_meta' | 'complete'>('select');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isImage && !isVideo) {
      setErrorMessage('Please select a valid image (PNG, JPG, WebP) or video (MP4, WebM) file.');
      return;
    }

    // Check size limit: 100MB
    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage('File size exceeds 100MB limit.');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setFileType(isVideo ? 'video' : 'image');

    // Create local object URL for instant preview
    const previewUrl = URL.createObjectURL(file);
    setFilePreviewUrl(previewUrl);

    // Suggest title from filename if empty
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    setUploadStep('preview_meta');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSaveAndPublish = async (shouldPublish: boolean) => {
    if (!selectedFile) {
      setErrorMessage('Please select a media file to upload.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Project title is required.');
      return;
    }
    if (!adminToken) {
      setErrorMessage('Admin session expired. Please sign in again.');
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);

    try {
      // 1. Upload media to persistent backend storage
      const uploadedMedia = await uploadMediaFile(selectedFile, adminToken);

      // 2. Create portfolio database record with strict publishing rule
      const newRecord = await createPortfolioRecord(adminToken, {
        title: title.trim(),
        client: client.trim() || 'Private Client',
        description: description.trim(),
        portfolio_category: 'Android Mobile Apps & eCommerce Showcase',
        media_url: uploadedMedia.url,
        media_type: uploadedMedia.type,
        media_original_name: uploadedMedia.original_name,
        media_size: uploadedMedia.size,
        published: shouldPublish,
        featured: false,
        platform,
        year,
        accent_color: accentColor,
        features,
        metrics: [
          { label: 'Rating', value: '4.9 ★' },
          { label: 'Platform', value: 'Google Play' },
          { label: 'Status', value: shouldPublish ? 'Published' : 'Draft' },
        ],
      });

      setIsUploading(false);
      setUploadStep('complete');
      onSuccess(newRecord);

      // Auto close after small delay
      setTimeout(() => {
        handleResetAndClose();
      }, 1200);
    } catch (err: any) {
      setIsUploading(false);
      setErrorMessage(err.message || 'Failed to save portfolio media');
    }
  };

  const handleResetAndClose = () => {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setSelectedFile(null);
    setFilePreviewUrl(null);
    setTitle('');
    setClient('');
    setDescription('');
    setFeatures(['Google Play Store Deployed', 'PayFast & Ozow Integrated', 'Push Notifications System']);
    setUploadStep('select');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full my-6 p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-md">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                Admin Portfolio Media Upload
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target Section: <span className="font-semibold text-blue-600 dark:text-cyan-400">Android Mobile Apps & eCommerce Showcase</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Breadcrumb Indicator */}
        <div className="flex items-center justify-between py-3 px-2 text-xs font-semibold text-slate-400 border-b border-slate-100 dark:border-slate-800/60 mb-4">
          <span className={uploadStep === 'select' ? 'text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1' : 'text-slate-400'}>
            1. Select Media
          </span>
          <span>→</span>
          <span className={uploadStep === 'preview_meta' ? 'text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1' : 'text-slate-400'}>
            2. Preview & Details
          </span>
          <span>→</span>
          <span className={uploadStep === 'complete' ? 'text-emerald-500 font-bold flex items-center gap-1' : 'text-slate-400'}>
            3. Permanent Save & Publish
          </span>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          {/* STEP 1: SELECT FILE */}
          {uploadStep === 'select' && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-400 rounded-3xl p-10 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,video/mp4,video/webm"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                Drag and drop customer app media here, or browse
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                Supported: High-res screenshots, device captures (PNG, JPG, WebP) or live video recordings (MP4, WebM up to 100MB).
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20">
                <span>Select From Device</span>
              </div>
            </div>
          )}

          {/* STEP 2: LIVE PREVIEW & METADATA ENTRY */}
          {uploadStep === 'preview_meta' && (
            <div className="space-y-6">
              {/* Media Preview Area */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    Media Preview ({fileType === 'video' ? 'Video Player' : 'Image'})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadStep('select');
                      setSelectedFile(null);
                      setFilePreviewUrl(null);
                    }}
                    className="text-xs text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    Change File
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center max-h-64 sm:max-h-80 relative shadow-inner">
                  {fileType === 'video' ? (
                    <video
                      src={filePreviewUrl || undefined}
                      controls
                      autoPlay
                      muted
                      loop
                      className="max-h-64 sm:max-h-80 w-auto object-contain mx-auto rounded-lg"
                    />
                  ) : (
                    <img
                      src={filePreviewUrl || undefined}
                      alt="Preview"
                      className="max-h-64 sm:max-h-80 w-auto object-contain mx-auto rounded-lg"
                    />
                  )}
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 text-white text-[10px] font-mono">
                    {selectedFile?.name} ({((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Project / Application Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. TrendyFootwear SA - Android eCommerce App"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
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
                    placeholder="e.g. TrendyFootwear Boutique Pty Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Platform / Technology
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="Android Mobile App">Android Mobile App (Play Store)</option>
                    <option value="eCommerce & Dropshipping Store">eCommerce & Dropshipping Store</option>
                    <option value="WordPress / WooCommerce">WordPress / WooCommerce</option>
                    <option value="Custom Web & Mobile App">Custom Web & Mobile App</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Description / Project Overview
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a short description of the customer app, deliverables, or business outcomes..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Accent Color Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Theme Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                    <div className="flex gap-1.5">
                      {['#0066FF', '#9333EA', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'].map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setAccentColor(col)}
                          className="w-6 h-6 rounded-full border border-white/40 shadow-xs cursor-pointer"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Tags / Features */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Key Features / Highlight Chips
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                      placeholder="Add tag (e.g. PayFast Checkout, 5-Star Play Store)..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {features.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
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
          )}

          {/* STEP 3: COMPLETE CONFIRMATION */}
          {uploadStep === 'complete' && (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Portfolio Media Successfully Saved!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                The media file is permanently stored on the server backend and the portfolio record is registered in the database.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {uploadStep === 'preview_meta' && (
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400">
              <span className="font-semibold text-emerald-500">Notice:</span> Published items are instantly visible to visitors. Drafts remain administrator-only.
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                disabled={isUploading}
                onClick={() => handleSaveAndPublish(false)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUploading ? 'Saving...' : 'Save as Draft'}
              </button>

              <button
                type="button"
                disabled={isUploading}
                onClick={() => handleSaveAndPublish(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Storage & Publishing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Save & Publish Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
