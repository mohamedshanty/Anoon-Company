"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Send, User, Clock } from "lucide-react";

export default function CommentSection({ articleId, articleDocumentId }) {
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
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
    const API_TOKEN = process.env.STRAPI_API_TOKEN;

    // جلب التعليقات
    useEffect(() => {
        const fetchComments = async () => {
            if (!contentId) return;

            try {
                console.log("Fetching comments for:", contentId);
                console.log("Using API Token:", API_TOKEN ? "✅ Yes" : "❌ No");

                // الرابط الصحيح لجلب التعليقات في Strapi v5
                const res = await fetch(
                    `${STRAPI_URL}/api/comments?filters[relatedTo][$containsi]=api::article.article:${contentId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${API_TOKEN}`,
                        },
                    }
                );

                console.log("Response status:", res.status);

                if (!res.ok) {
                    console.error("Failed to fetch comments:", res.status);
                    return;
                }

                const data = await res.json();
                console.log("Comments data:", data);

                setComments(data.data || []);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (API_TOKEN) {
            fetchComments();
        } else {
            console.error("⚠️ API_TOKEN is missing in .env.local");
            setIsLoading(false);
        }
    }, [contentId, STRAPI_URL, API_TOKEN]);

    // إضافة تعليق جديد
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !API_TOKEN) return;

        setIsSubmitting(true);

        try {
            console.log("Posting comment with token:", API_TOKEN ? "✅ Yes" : "❌ No");

            // الرابط الصحيح للإضافة
            const endpoint = `${STRAPI_URL}/api/comments`;

            // الهيكل الصحيح للبيانات
            const commentData = {
                data: {
                    content: newComment,
                    authorName: guestName || "Guest",
                    authorEmail: guestEmail || "guest@example.com",
                    relatedTo: `api::article.article:${contentId}`,
                }
            };

            console.log("Sending data:", commentData);

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify(commentData),
            });

            console.log("Response status:", res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error response:", errorText);
                throw new Error(`Failed to post comment: ${res.status}`);
            }

            const data = await res.json();
            console.log("Comment posted successfully:", data);

            // إعادة جلب التعليقات
            const updatedRes = await fetch(
                `${STRAPI_URL}/api/comments?filters[relatedTo][$containsi]=api::article.article:${contentId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`,
                    },
                }
            );
            const updatedData = await updatedRes.json();
            setComments(updatedData.data || []);

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
            }
        );
    };

    if (isLoading) {
        return (
            <div className="mt-12 text-center text-white/70">
                {lang === 'ar' ? 'جاري تحميل التعليقات...' : 'Loading comments...'}
            </div>
        );
    }

    return (
        <section className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-brand-sky" />
                {lang === 'ar' ? 'التعليقات' : 'Comments'} ({comments.length})
            </h2>

            {/* نموذج إضافة تعليق */}
            <form onSubmit={handleSubmitComment} className="mb-10">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب تعليقك...' : 'Write your comment...'}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-brand-sky transition"
                    rows="3"
                    required
                />

                {/* حقل للزوار */}
                <div className="mt-3">
                    <button
                        type="button"
                        onClick={() => setShowGuestForm(!showGuestForm)}
                        className="text-sm text-brand-sky hover:underline"
                    >
                        {showGuestForm
                            ? (lang === 'ar' ? 'إخفاء' : 'Hide')
                            : (lang === 'ar' ? 'أضف معلوماتك' : 'Add your info')}
                    </button>

                    {showGuestForm && (
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                placeholder={lang === 'ar' ? 'الاسم' : 'Name'}
                                className="p-2 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-brand-sky"
                            />
                            <input
                                type="email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
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
                        ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                        : (lang === 'ar' ? 'أضف تعليقاً' : 'Add Comment')}
                </button>
            </form>

            {/* قائمة التعليقات */}
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
                                            {comment.attributes?.authorName || comment.authorName || 'Anonymous'}
                                        </span>
                                        <span className="text-white/40 text-sm flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(comment.attributes?.createdAt || comment.createdAt)}
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
                        {lang === 'ar'
                            ? 'لا توجد تعليقات بعد. كن أول من يعلق!'
                            : 'No comments yet. Be the first to comment!'}
                    </div>
                )}
            </div>
        </section>
    );
}