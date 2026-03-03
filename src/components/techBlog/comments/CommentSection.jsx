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

  const contentId = articleDocumentId || articleId;

  // جلب التعليقات
  useEffect(() => {
    const fetchComments = async () => {
      if (!contentId) return;

      try {
        const res = await fetch(`/api/articles/${contentId}/comments`);

        if (!res.ok) {
          console.error("Failed to fetch comments:", res.status);
          return;
        }

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
      const commentData = {
        content: newComment,
        authorName: guestName || "Guest",
        authorEmail: guestEmail || "guest@example.com",
      };

      const res = await fetch(`/api/articles/${contentId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error posting comment:", errorData);
        throw new Error(`Failed to post comment: ${res.status}`);
      }

      const data = await res.json();

      // إضافة التعليق الجديد محلياً أو إعادة جلب القائمة بالكامل لضمان الترتيب
      if (data.data) {
        setComments((prev) => [data.data, ...prev]);
      } else {
        // Fallback: re-fetch comments if response structure is unusual
        const reFetchRes = await fetch(`/api/articles/${contentId}/comments`);
        const reFetchData = await reFetchRes.json();
        setComments(reFetchData.data || []);
      }

      // إعلام الأب بالإضافة
      if (typeof onCommentAdded === 'function') {
        onCommentAdded();
      }

      // تنظيف الحقول
      setNewComment("");
      setGuestName("");
      setGuestEmail("");
      setShowGuestForm(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
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
              ? lang === "ar"
                ? "إخفاء"
                : "Hide"
              : lang === "ar"
                ? "أضف معلوماتك"
                : "Add your info"}
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
            ? lang === "ar"
              ? "جاري الإرسال..."
              : "Sending..."
            : lang === "ar"
              ? "أضف تعليقاً"
              : "Add Comment"}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white/5 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-sky/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-brand-sky" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-white">
                      {comment.attributes?.authorName ||
                        comment.authorName ||
                        "Anonymous"}
                    </span>
                    <span className="text-white/40 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(
                        comment.attributes?.createdAt || comment.createdAt,
                      )}
                    </span>
                  </div>

                  <p className="text-white/80 leading-relaxed">
                    {comment.attributes?.content || comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
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
