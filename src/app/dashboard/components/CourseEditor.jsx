"use client";
import { useState, useCallback } from "react";
import { X, ImageIcon, Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";

const EMPTY_FORM = {
  title: "",
  title_ar: "",
  description: "",
  description_ar: "",
  image_url: "",
  duration: "",
  level: "",
};

export default function CourseEditor({ course, programId, onSave, onClose }) {
  const { createCourse, updateCourse } = useCourses(programId);
  const [form, setForm] = useState(course ? { ...course } : { ...EMPTY_FORM });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(course?.image_url || null);

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
      setPreviewUrl(course?.image_url || null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...form, program_id: programId };
      if (course) {
        await updateCourse(course.id, payload);
      } else {
        await createCourse(payload);
      }
      onSave && onSave();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0a0f1e] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
          <h2 className="text-white font-semibold">
            {course ? "Edit Course" : "Add Course"}
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
              Course Image
            </label>
            <div
              className="relative border-2 border-dashed border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() =>
                document.getElementById("course-image-input").click()
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
              id="course-image-input"
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
                Duration
              </label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g. 8 weeks"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Level</label>
              <select
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-white/10 text-white focus:outline-none focus:border-sky-500/50"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
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
              {isSaving ? "Saving..." : course ? "Update Course" : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
