"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Send, User, Clock } from "lucide-react";

export default function CommentSection({ articleId, articleDocumentId, onCommentAdded }) {
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

  // استرجاع معلومات الضيف من localStorage عند التحميل
  useEffect(() => {
    const savedName = localStorage.getItem("comment_author_name");
    const savedEmail = localStorage.getItem("comment_author_email");
    if (savedName) setGuestName(savedName);
    if (savedEmail) setGuestEmail(savedEmail);
  }, []);

  // جلب التعليقات
  useEffect(() => {
    const fetchComments = async () => {
      if (!contentId) return;

      try {
        const res = await fetch(`/api/articles/${contentId}/comments`);
        if (!res.ok) return;
        const data = await res.json();
        setComments(data.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [contentId]);

  // إضافة تعليق جديد
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
          currentCommentsCount: comments.length
        }),
      });

      if (!res.ok) throw new Error(`Failed to post comment`);

      const data = await res.json();

      // حفظ معلومات الضيف لاستخدامها لاحقاً
      localStorage.setItem("comment_author_name", authorName);
      localStorage.setItem("comment_author_email", authorEmail);

      // إعادة جلب التعليقات لضمان الحصول على الـ documentId الصحيح من السيرفر
      const reFetchRes = await fetch(`/api/articles/${contentId}/comments`);
      const reFetchData = await reFetchRes.json();
      setComments(reFetchData.data || []);

      if (typeof onCommentAdded === 'function') onCommentAdded();

      setNewComment("");
      setShowGuestForm(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // حذف تعليق
  const handleDelete = async (commentId) => {
    if (!confirm(lang === "ar" ? "هل أنت متأكد من حذف هذا التعليق؟" : "Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
      if (res.ok) {
        setComments(prev => prev.filter(c => (c.documentId || c.id) !== commentId));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // تعديل تعليق
  const handleUpdate = async (commentId) => {
    if (!editContent.trim()) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setComments(prev => prev.map(c =>
          (c.documentId || c.id) === commentId ? { ...c, content: editContent } : c
        ));
        setEditingId(null);
      }
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

  if (isLoading) {
    return (
      <div className="mt-12 text-center text-white/70">
        {lang === "ar" ? "جاري تحميل التعليقات..." : "Loading comments..."}
      </div>
    );
  }

  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-brand-sky" />
        {lang === "ar" ? "التعليقات" : "Comments"} ({comments.length})
      </h2>

      <form onSubmit={handleSubmitComment} className="mb-10">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            lang === "ar" ? "اكتب تعليقك..." : "Write your comment..."
          }
          className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-brand-sky transition"
          rows="3"
          required
        />

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowGuestForm(!showGuestForm)}
            className="text-sm text-brand-sky hover:underline"
          >
            {showGuestForm
              ? lang === "ar" ? "إخفاء" : "Hide"
              : lang === "ar" ? "أضف معلوماتك" : "Add your info"}
          </button>

          {showGuestForm && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={lang === "ar" ? "الاسم" : "Name"}
                className="p-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-brand-sky"
              />
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                className="p-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-brand-sky"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !newComment.trim()}
          className="mt-3 px-6 py-2 bg-brand-sky text-white rounded-lg hover:bg-brand-sky/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {isSubmitting
            ? lang === "ar" ? "جاري الإرسال..." : "Sending..."
            : lang === "ar" ? "أضف تعليقاً" : "Add Comment"}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const cId = comment.documentId || comment.id;
            const isAuthor = guestEmail && (comment.authorEmail === guestEmail);

            return (
              <div key={cId} className="bg-white/5 rounded-lg p-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-sky/20 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-brand-sky" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-white">
                          {comment.authorName || "Anonymous"}
                        </span>
                        <span className="text-white/40 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>

                      {/* أزرار التحكم - تظهر فقط لصاحب التعليق */}
                      {isAuthor && editingId !== cId && (
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingId(cId); setEditContent(comment.content); }}
                            className="text-xs text-brand-sky hover:underline"
                          >
                            {lang === "ar" ? "تعديل" : "Edit"}
                          </button>
                          <button
                            onClick={() => handleDelete(cId)}
                            className="text-xs text-red-400 hover:underline"
                          >
                            {lang === "ar" ? "حذف" : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>

                    {editingId === cId ? (
                      <div className="mt-2 text-left">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-2 bg-white/10 border border-brand-sky/30 rounded text-white focus:outline-none"
                          rows="2"
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleUpdate(cId)}
                            className="px-3 py-1 bg-brand-sky text-white text-xs rounded"
                          >
                            {lang === "ar" ? "حفظ" : "Save"}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-white/10 text-white text-xs rounded"
                          >
                            {lang === "ar" ? "إلغاء" : "Cancel"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white/80 leading-relaxed text-left">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-white/50">
            {lang === "ar"
              ? "لا توجد تعليقات بعد. كن أول من يعلق!"
              : "No comments yet. Be the first to comment!"}
          </div>
        )}
      </div>
    </section>
  );
}
