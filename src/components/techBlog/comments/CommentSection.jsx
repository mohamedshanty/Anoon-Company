"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  Send,
  User,
  Clock,
  Trash2,
  Edit3,
  X,
  Check,
  MoreVertical,
} from "lucide-react";

export default function CommentSection({
  articleId,
  articleDocumentId,
  onCommentAdded,
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [showGuestForm, setShowGuestForm] = useState(false);

  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const contentId = articleDocumentId || articleId;

  const fetchComments = async () => {
    if (!contentId) return;

    try {
      const res = await fetch(`/api/articles/${contentId}/comments`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch comments");
      }

      setComments(data.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedName = localStorage.getItem("comment_author_name");
    const savedEmail = localStorage.getItem("comment_author_email");
    if (savedName) setGuestName(savedName);
    if (savedEmail) setGuestEmail(savedEmail);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [contentId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const authorName = guestName || "Guest";
      const authorEmail = guestEmail || "guest@example.com";

      const res = await fetch(`/api/articles/${contentId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          authorName,
          authorEmail,
          currentCommentsCount: comments.length,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to post comment");
      }

      localStorage.setItem("comment_author_name", authorName);
      localStorage.setItem("comment_author_email", authorEmail);

      await fetchComments();

      if (typeof onCommentAdded === "function") onCommentAdded();

      setNewComment("");
      setShowGuestForm(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (
      !confirm(
        lang === "ar"
          ? "هل أنت متأكد من حذف هذا التعليق؟"
          : "Are you sure you want to delete this comment?",
      )
    )
      return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete comment");
      }

      setComments((prev) =>
        prev.filter((c) => (c.documentId || c.id) !== commentId),
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = async (commentId) => {
    if (!editContent.trim()) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update comment");
      }

      setComments((prev) =>
        prev.map((c) =>
          (c.documentId || c.id) === commentId
            ? { ...c, content: data.data?.content ?? editContent }
            : c,
        ),
      );
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      lang === "ar" ? "ar-EG" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  };

  // Generate a consistent color based on name
  const getAvatarColor = (name = "G") => {
    const colors = [
      "bg-orange-500",
      "bg-purple-500",
      "bg-blue-500",
      "bg-emerald-500",
      "bg-rose-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (isLoading) {
    return (
      <section className="mt-16 pt-8 space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-4">
          <div className="w-6 h-6 rounded-md bg-white/10" />
          <div className="w-32 h-6 rounded-md bg-white/10" />
        </div>

        <div className="space-y-8">
          {/* Input Skeleton */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-20 bg-white/5 rounded-xl w-full" />
                <div className="flex justify-between">
                  <div className="w-20 h-6 rounded-full bg-white/10" />
                  <div className="w-24 h-8 rounded-xl bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Comment List Skeletons */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6">
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-white/10" />
                <div className="w-0.5 h-12 bg-white/5" />
              </div>
              <div className="flex-1 space-y-3 pt-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-white/10 rounded-md w-32" />
                  <div className="h-3 bg-white/5 rounded-md w-24" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/5 rounded-md w-full" />
                  <div className="h-3 bg-white/5 rounded-md w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="comments" className="mt-16 pt-8 space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-brand-sky" />
          {lang === "ar" ? "التعليقات" : "Comments"}
          <span className="text-white/20 text-lg font-light">
            ({comments.length})
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Comment Input - More Compact */}
        <div className="bg-white/5 p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
          <form
            onSubmit={handleSubmitComment}
            className="relative z-10 space-y-4"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand-sky to-purple-500 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "ماذا يدور في ذهنك؟"
                      : "Share your thoughts..."
                  }
                  className="w-full bg-transparent border-none p-0 text-white placeholder-white/20 focus:outline-none focus:ring-0 text-base md:text-lg resize-none min-h-20"
                  required
                />

                <div className="h-px bg-white/5 w-full" />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setShowGuestForm(!showGuestForm)}
                    className={`text-xs py-1.5 px-3 rounded-full border transition-all ${showGuestForm ? "bg-white/10 border-white/20 text-white" : "border-white/5 text-white/40 hover:border-white/20"}`}
                  >
                    {showGuestForm
                      ? lang === "ar"
                        ? "إغلاق"
                        : "Close"
                      : lang === "ar"
                        ? "تعريف الهوية"
                        : "Identify"}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="bg-brand-sky hover:bg-brand-sky/90 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-brand-sky/10"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting
                      ? lang === "ar"
                        ? "جاري..."
                        : "..."
                      : lang === "ar"
                        ? "نشر"
                        : "Post"}
                  </button>
                </div>
              </div>
            </div>

            {showGuestForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={lang === "ar" ? "الاسم" : "Name"}
                  className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-brand-sky/50 transition-all font-medium"
                />
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                  className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-brand-sky/50 transition-all font-medium"
                />
              </div>
            )}
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-8">
          {comments.length > 0 ? (
            comments.map((comment) => {
              const cId = comment.documentId || comment.id;
              const isAuthor =
                guestEmail && comment.author_email === guestEmail;

              return (
                <div key={cId} className="group relative">
                  <div className="flex gap-6">
                    {/* Avatar with dynamic color */}
                    <div className="shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl ${getAvatarColor(comment.author_name)} flex items-center justify-center text-white text-xl font-black shadow-lg shadow-black/20 relative z-10`}
                      >
                        {comment.author_name?.[0]?.toUpperCase() || <User />}
                      </div>
                      <div className="w-0.5 h-full bg-linear-to-b from-white/10 to-transparent mx-auto -mt-2 opacity-50 transition-opacity group-hover:opacity-100" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-lg text-white group-hover:text-brand-sky transition-colors">
                            {comment.author_name || "Guest User"}
                          </h4>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-white/30 text-xs flex items-center gap-1.5 font-medium uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            {formatDate(comment.created_at)}
                          </span>
                        </div>

                        {isAuthor && editingId !== cId && (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingId(cId);
                                setEditContent(comment.content);
                              }}
                              className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-brand-sky transition-all"
                              title={lang === "ar" ? "تعديل" : "Edit"}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cId)}
                              className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-all"
                              title={lang === "ar" ? "حذف" : "Delete"}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="bg-white/5 border border-white/5 p-6 rounded-3xl rounded-tl-none group-hover:border-white/10 transition-all relative overflow-hidden">
                        {editingId === cId ? (
                          <div className="space-y-4">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-white focus:outline-none text-lg resize-none min-h-20"
                              rows="3"
                              autoFocus
                            />
                            <div className="flex justify-end gap-3 pt-2">
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-4 py-2 rounded-xl text-white/40 hover:text-white text-sm font-medium"
                              >
                                {lang === "ar" ? "إلغاء" : "Cancel"}
                              </button>
                              <button
                                onClick={() => handleUpdate(cId)}
                                className="bg-brand-sky text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                              >
                                <Check className="w-4 h-4" />
                                {lang === "ar"
                                  ? "حفظ التغييرات"
                                  : "Save Changes"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-white/70 leading-relaxed text-lg whitespace-pre-wrap">
                            {comment.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {lang === "ar" ? "لا توجد تعليقات بعد" : "No comments yet"}
              </h3>
              <p className="text-white/30 max-w-xs mx-auto">
                {lang === "ar"
                  ? "كن أول من يشارك رأيه في هذا الموضوع!"
                  : "Be the first to share your thoughts on this topic!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
