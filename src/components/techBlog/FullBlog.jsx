"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Heart, MessageCircle, Calendar, User, Tag, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { CommentSection } from "./comments/CommentSection";

export default function FullBlog({ article, similarArticles }) {
  const [likes, setLikes] = useState(article?.likes || 0);
  const [views, setViews] = useState(article?.views || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  // تسجيل المشاهدة مرة واحدة فقط لكل جلسة
  useEffect(() => {
    const registerView = async () => {
      if (!article?.id || hasViewed) return;

      const viewedInSession = sessionStorage.getItem(`viewed_${article.id}`);
      if (viewedInSession) return;

      try {
        const articleId = article?.documentId || article?.id;

        const res = await fetch(`/api/articles/${articleId}/views`, {
          method: "POST",
        });

        if (!res.ok) return;

        const data = await res.json();
        if (data.success) {
          setViews(data.views);
          setHasViewed(true);
          sessionStorage.setItem(`viewed_${article.id}`, "true");

          // تحديث localStorage للمشاهدة
          const viewedArticles = JSON.parse(
            localStorage.getItem("viewed_articles") || "{}",
          );
          viewedArticles[article.id] = true;
          localStorage.setItem(
            "viewed_articles",
            JSON.stringify(viewedArticles),
          );
        }
      } catch (error) {
        console.error("Error registering view:", error);
      }
    };

    registerView();
  }, [article, hasViewed]);

  // التحقق من حالة الإعجاب من localStorage
  useEffect(() => {
    if (article?.id) {
      const liked = localStorage.getItem(`liked_${article.id}`);
      setIsLiked(liked === "true");

      // تحديث عدد الإعجابات إذا كان المستخدم معجباً
      if (liked === "true" && likes === article?.likes) {
        setLikes((prev) => prev + 1);
      }
    }
  }, [article?.id, article?.likes]);

  const handleLike = async () => {
    if (isUpdating || !article?.id) return;

    setIsUpdating(true);

    try {
      const newLikedState = !isLiked;
      const articleId = article?.documentId || article?.id;

      const res = await fetch(`/api/articles/${articleId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: newLikedState }),
      });

      if (!res.ok) return;

      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setIsLiked(newLikedState);
        localStorage.setItem(`liked_${article.id}`, newLikedState);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!article) return null;

  const title = article[`title_${lang}`] || article.title || "بدون عنوان";
  const introduction = article[`introduction_${lang}`] || "";
  const content = article[`content_${lang}`] || article.content || "";
  const author = article[`author_${lang}`] || article.author || "غير معروف";
  const categoryName =
    article?.category?.[`name_${lang}`] ||
    article?.category?.name ||
    (lang === "ar" ? "غير مصنف" : "Uncategorized");

  let heroImageUrl = "/images/blogImage.png";

  if (
    article?.image &&
    Array.isArray(article.image) &&
    article.image.length > 0
  ) {
    const imageData = article.image[0];
    if (imageData.formats?.large?.url) {
      heroImageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData.formats.large.url}`;
    } else if (imageData.formats?.medium?.url) {
      heroImageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData.formats.medium.url}`;
    } else if (imageData.url) {
      heroImageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageData.url}`;
    }
  }

  const dateFormatted = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(
        lang === "ar" ? "ar-EG" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      )
    : "غير محدد";

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={heroImageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-6 drop-shadow-2xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="main-container relative z-10 max-w-4xl mx-auto py-16 px-6">
        {introduction && (
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light">
            {introduction}
          </p>
        )}

        <div className="flex flex-wrap gap-6 text-white/70 mb-12 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{dateFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={18} />
            <span>{categoryName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span>
              {views.toLocaleString()} {lang === "ar" ? "مشاهدة" : "views"}
            </span>
          </div>
        </div>

        {/* أزرار التفاعل */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-white/10">
          <button
            onClick={handleLike}
            disabled={isUpdating}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isLiked
                ? "bg-red-500/20 text-red-400"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isLiked ? "fill-red-400 text-red-400 scale-110" : ""
              }`}
            />
            <span>{likes.toLocaleString()}</span>
          </button>

          <div className="flex items-center gap-2 text-white/70">
            <MessageCircle className="w-5 h-5 text-brand-sky" />
            <span>{article.comments || 0}</span>
          </div>
        </div>

        <div className="prose prose-invert prose-headings:text-white prose-p:text-white/80 prose-a:text-brand-sky max-w-none prose-lg">
          {typeof content === "string" ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <BlocksRenderer
              content={content}
              blocks={{
                image: ({ src, alt, width, height }) => (
                  <div className="my-10">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${src}`}
                      alt={alt || "صورة في المقال"}
                      width={width || 800}
                      height={height || 500}
                      unoptimized
                      className="rounded-2xl shadow-2xl mx-auto object-cover"
                    />
                  </div>
                ),
              }}
            />
          )}
        </div>

        <CommentSection
          articleId={article.id}
          articleDocumentId={article.documentId}
        />

        {similarArticles?.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              {lang === "ar" ? "مقالات مشابهة" : "Similar Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* يمكنك إضافة عرض المقالات المشابهة هنا */}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
