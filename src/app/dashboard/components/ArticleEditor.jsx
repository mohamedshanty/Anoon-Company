"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { generateSlug } from "@/lib/slugUtils";
import {
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  Check,
  AlertCircle,
  Globe,
  FileText,
} from "lucide-react";
import dynamic from "next/dynamic";
const TipTapEditor = dynamic(() => import("@/components/ui/TipTapEditor"), {
  ssr: false,
});

const EMPTY_FORM = {
  title: "",
  title_ar: "",
  slug: "",
  excerpt: "",
  excerpt_ar: "",
  content: "",
  content_ar: "",
  cover_image: "",
  category: "",
  category_ar: "",
  tags: [],
  tags_ar: [],
  introdaction: "",
  introdaction_ar: "",
  author: "",
  author_ar: "",
  status: "draft",
};

export default function ArticleEditor({ article, onSave, onClose }) {
  const [form, setForm] = useState(
    article ? { ...article } : { ...EMPTY_FORM },
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(article?.cover_image || null);
  const [activeSection, setActiveSection] = useState("en");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!article && form.title && !form.slug) {
      setForm((prev) => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title, article]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      ...(!article ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleTagsChange = (value, field) => {
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, [field]: tags }));
  };

  const handleFileUpload = async (file) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      setForm((prev) => ({ ...prev, cover_image: json.url }));
      setPreviewUrl(json.url);
      URL.revokeObjectURL(localUrl);
    } catch (err) {
      setUploadError(err.message || "Upload failed.");
      setPreviewUrl(article?.cover_image || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(form);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all text-sm";
  const labelClass =
    "block text-xs text-white/40 uppercase tracking-widest font-medium mb-1.5";
  const textareaClass = `${inputClass} resize-none min-h-[120px]`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0a0f1e] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-500 to-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">
                {article ? "Edit Article" : "New Article"}
              </h2>
              <p className="text-white/30 text-xs">
                {article
                  ? `Editing: ${article.title}`
                  : "Fill in the details below"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-8 py-6 space-y-6"
        >
          {/* Language toggle */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setActiveSection("en")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === "en" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("ar")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === "ar" ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              🇸🇦 العربية
            </button>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className={labelClass}>Cover Image</label>
            <div
              className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
                isUploading
                  ? "border-sky-500/50 bg-sky-500/5"
                  : uploadError
                    ? "border-red-500/40 bg-red-500/5"
                    : "border-white/10 hover:border-white/20 bg-white/3"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                id="cover-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />

              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Change image
                    </span>
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                      <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-white/30">
                  {isUploading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-sky-400 mb-3" />
                  ) : (
                    <ImageIcon className="w-10 h-10 mb-3" />
                  )}
                  <p className="text-sm font-medium">
                    {isUploading
                      ? "Uploading to Cloudinary..."
                      : "Drop image or click to upload"}
                  </p>
                  <p className="text-xs mt-1">PNG, JPG, WebP up to 10MB</p>
                </div>
              )}
            </div>
            {uploadError && (
              <p className="mt-2 text-red-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {uploadError}
              </p>
            )}
            {form.cover_image && !isUploading && (
              <p className="mt-2 text-green-400 text-xs flex items-center gap-1">
                <Check className="w-3 h-3" /> Uploaded to Cloudinary
              </p>
            )}
          </div>

          {/* English Fields */}
          {activeSection === "en" && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title (English) *</label>
                <input
                  id="field-title"
                  type="text"
                  required
                  value={form.title || ""}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article title..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Slug *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                    /techBlog/
                  </span>
                  <input
                    id="field-slug"
                    type="text"
                    required
                    value={form.slug || ""}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="article-slug"
                    className={`${inputClass} pl-24`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Introduction</label>
                <textarea
                  id="field-introdaction"
                  value={form.introdaction || ""}
                  onChange={(e) => handleChange("introdaction", e.target.value)}
                  placeholder="Brief introduction paragraph..."
                  className={textareaClass}
                  rows={3}
                />
              </div>
              <div>
                <label className={labelClass}>Excerpt</label>
                <textarea
                  id="field-excerpt"
                  value={form.excerpt || ""}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  placeholder="Short summary for cards..."
                  className={textareaClass}
                  rows={3}
                />
              </div>
              <div>
                <label className={labelClass}>Content (Rich Text)</label>
                <TipTapEditor
                  value={form.content}
                  onChange={(val) => handleChange("content", val)}
                  placeholder="Write article content in English..."
                  dir="ltr"
                  imageUploadHandler={async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const json = await res.json();
                    return json.url;
                  }}
                />
              </div>
            </div>
          )}

          {/* Arabic Fields */}
          {activeSection === "ar" && (
            <div className="space-y-4" dir="rtl">
              <div>
                <label className={`${labelClass} text-right`}>
                  العنوان (عربي)
                </label>
                <input
                  id="field-title-ar"
                  type="text"
                  value={form.title_ar || ""}
                  onChange={(e) => handleChange("title_ar", e.target.value)}
                  placeholder="عنوان المقال..."
                  className={inputClass}
                  dir="rtl"
                />
              </div>
              <div>
                <label className={`${labelClass} text-right`}>المقدمة</label>
                <textarea
                  id="field-introdaction-ar"
                  value={form.introdaction_ar || ""}
                  onChange={(e) =>
                    handleChange("introdaction_ar", e.target.value)
                  }
                  placeholder="مقدمة المقال..."
                  className={textareaClass}
                  dir="rtl"
                  rows={3}
                />
              </div>
              <div>
                <label className={`${labelClass} text-right`}>الملخص</label>
                <textarea
                  id="field-excerpt-ar"
                  value={form.excerpt_ar || ""}
                  onChange={(e) => handleChange("excerpt_ar", e.target.value)}
                  placeholder="ملخص قصير..."
                  className={textareaClass}
                  dir="rtl"
                  rows={3}
                />
              </div>
              <div>
                <label className={`${labelClass} text-right`}>
                  المحتوى (نص غني)
                </label>
                <TipTapEditor
                  value={form.content_ar}
                  onChange={(val) => handleChange("content_ar", val)}
                  placeholder="اكتب محتوى المقال بالعربية..."
                  dir="rtl"
                  imageUploadHandler={async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const json = await res.json();
                    return json.url;
                  }}
                />
              </div>
            </div>
          )}

          {/* Shared Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
            <div>
              <label className={labelClass}>Category (EN)</label>
              <input
                id="field-category"
                type="text"
                value={form.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Technology"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>التصنيف (AR)</label>
              <input
                id="field-category-ar"
                type="text"
                value={form.category_ar || ""}
                onChange={(e) => handleChange("category_ar", e.target.value)}
                placeholder="تقنية"
                className={inputClass}
                dir="rtl"
              />
            </div>
            <div>
              <label className={labelClass}>Author (EN)</label>
              <input
                id="field-author"
                type="text"
                value={form.author || ""}
                onChange={(e) => handleChange("author", e.target.value)}
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>الكاتب (AR)</label>
              <input
                id="field-author-ar"
                type="text"
                value={form.author_ar || ""}
                onChange={(e) => handleChange("author_ar", e.target.value)}
                placeholder="محمد أحمد"
                className={inputClass}
                dir="rtl"
              />
            </div>
            <div>
              <label className={labelClass}>Tags (comma separated)</label>
              <input
                id="field-tags"
                type="text"
                value={form.tags?.join(", ") || ""}
                onChange={(e) => handleTagsChange(e.target.value, "tags")}
                placeholder="tech, ai, web"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>الوسوم (مفصولة بفواصل)</label>
              <input
                id="field-tags-ar"
                type="text"
                value={form.tags_ar?.join(", ") || ""}
                onChange={(e) => handleTagsChange(e.target.value, "tags_ar")}
                placeholder="تقنية، ذكاء اصطناعي"
                className={inputClass}
                dir="rtl"
              />
            </div>
          </div>

          {/* Status */}
          <div className="pt-2 border-t border-white/5">
            <label className={labelClass}>Status</label>
            <div className="flex gap-3">
              {["draft", "published"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleChange("status", s)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.status === s
                      ? s === "published"
                        ? "bg-green-500/20 border-green-500/40 text-green-400"
                        : "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                      : "border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  {s === "published" ? (
                    <Globe className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            id="save-article-btn"
            type="submit"
            disabled={isSaving || isUploading}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-sky-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            {isSaving
              ? "Saving..."
              : article
                ? "Save Changes"
                : "Create Article"}
          </button>
        </div>
      </div>
    </div>
  );
}
