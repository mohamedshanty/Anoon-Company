"use client";
import { useState, useCallback } from "react";
import { X, ImageIcon, Loader2 } from "lucide-react";
import { usePrograms } from "@/hooks/usePrograms";

const EMPTY_FORM = {
  title: "",
  title_ar: "",
  description: "",
  description_ar: "",
  image_url: "",
  button_text: "",
  button_text_ar: "",
  button_href: "",
};

export default function TrainingProgramEditor({ program, onSave, onClose }) {
  const [form, setForm] = useState(
    program ? { ...program } : { ...EMPTY_FORM },
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(program?.image_url || null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
      setForm((prev) => ({ ...prev, image_url: json.url }));
      setPreviewUrl(json.url);
      URL.revokeObjectURL(localUrl);
    } catch (err) {
      setUploadError(err.message || "Upload failed.");
      setPreviewUrl(program?.image_url || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { createProgram, updateProgram } = usePrograms();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (program) {
        await updateProgram(program.id, form);
      } else {
        await createProgram(form);
      }
      onSave && onSave();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0a0f1e] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
          <h2 className="text-white font-semibold">
            {program ? "Edit Training Program" : "Add Training Program"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-8 py-6 space-y-6"
        >
          {/* Image upload */}
          <div>
            <label className="block text-xs text-white/40 mb-2">
              Program Image
            </label>
            <div
              className="relative border-2 border-dashed border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() =>
                document.getElementById("program-image-input").click()
              }
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <ImageIcon className="w-8 h-8 text-white/20" />
                  <span className="text-white/30 text-sm">
                    Drag & drop or click to upload
                  </span>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                  <span className="text-white text-sm">Uploading...</span>
                </div>
              )}
            </div>
            <input
              id="program-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files[0] && handleFileUpload(e.target.files[0])
              }
            />
            {uploadError && (
              <p className="text-red-400 text-xs mt-1">{uploadError}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1">
                Title (EN)
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">
                العنوان (AR)
              </label>
              <input
                type="text"
                value={form.title_ar}
                onChange={(e) => handleChange("title_ar", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
                required
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">
                Description (EN)
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">
                الوصف (AR)
              </label>
              <textarea
                value={form.description_ar}
                onChange={(e) => handleChange("description_ar", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
                rows={3}
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">
                Button Text (EN)
              </label>
              <input
                type="text"
                value={form.button_text}
                onChange={(e) => handleChange("button_text", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">
                نص الزر (AR)
              </label>
              <input
                type="text"
                value={form.button_text_ar}
                onChange={(e) => handleChange("button_text_ar", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
                dir="rtl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-white/40 mb-1">
                Button Link
              </label>
              <input
                type="text"
                value={form.button_href}
                onChange={(e) => handleChange("button_href", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving
                ? "Saving..."
                : program
                  ? "Update Program"
                  : "Save Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
