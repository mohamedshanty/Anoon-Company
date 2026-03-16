"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Heart, Calendar, Eye, Share2, Clock } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import CommentSection from "./comments/CommentSection";

export default function FullBlog({ article, similarArticles }) {
  const [likes, setLikes] = useState(article?.likes || 0);
  const [views, setViews] = useState(article?.views || 0);
  const [shares, setShares] = useState(article?.shares || 0);
  const [commentsCount, setCommentsCount] = useState(
    article?.comments_count || 0,
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [tableOfContents, setTableOfContents] = useState([]);

  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  // Register view
  useEffect(() => {
    const registerView = async () => {
      const identifier = article?.documentId;
      if (!identifier || hasViewed) return;

      const sessionKey = `viewed_${identifier}`;
      if (sessionStorage.getItem(sessionKey)) {
        setHasViewed(true);
        return;
      }

      try {
        const res = await fetch(`/api/articles/${identifier}/views`, {
          method: "POST",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setViews(data.views);
            setHasViewed(true);
            sessionStorage.setItem(sessionKey, "true");
          }
        }
      } catch (error) {
        console.error("View registration error:", error);
      }
    };

    registerView();
  }, [article?.documentId, hasViewed]);

  // Check if liked from localStorage
  useEffect(() => {
    const identifier = article?.documentId;
    if (identifier) {
      const likedState = localStorage.getItem(`liked_${identifier}`);
      setIsLiked(likedState === "true");
    }
  }, [article?.documentId]);

  // Generate table of contents (client-side only)
  useEffect(() => {
    // تأكد أننا في المتصفح
    if (typeof window !== "undefined") {
      const content = article[`content_${lang}`] || article.content || "";
      if (typeof content === "string") {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, "text/html");
          const headings = Array.from(doc.querySelectorAll("h1, h2, h3")).map(
            (h) => ({
              text: h.innerText,
              id: h.id || h.innerText.toLowerCase().replace(/\s+/g, "-"),
              level: h.tagName.toLowerCase(),
            }),
          );
          setTableOfContents(headings);
        } catch (error) {
          console.error("Error generating table of contents:", error);
        }
      }
    }
  }, [article, lang]);

  const handleLike = async () => {
    const identifier = article.documentId || article.id;
    if (isUpdating || !identifier) return;

    setIsUpdating(true);

    try {
      const newLikedState = !isLiked;

      const res = await fetch(`/api/articles/${identifier}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: newLikedState }),
      });

      if (!res.ok) {
        console.error("Error updating likes");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setIsLiked(newLikedState);
        localStorage.setItem(
          `liked_${identifier}`,
          newLikedState ? "true" : "false",
        );
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleShare = async () => {
    const identifier = article.documentId || article.id;
    const articleUrl = `${window.location.origin}/techBlog/${article.slug}`;
    const shareTitle =
      article[`title_${lang}`] || article.title || "Anoon Blog";

    if (!identifier || isSharing) return;

    setIsSharing(true);
    const previousShares = shares;
    setShares((prev) => prev + 1);

    try {
      const res = await fetch(`/api/articles/${identifier}/shares`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && typeof data.shares === "number") {
          setShares(data.shares);
        }
      } else {
        setShares(previousShares);
      }
    } catch (error) {
      setShares(previousShares);
      console.error("Error sharing article:", error);
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          url: articleUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(articleUrl);
      }
    } catch (error) {
      // Ignore share-sheet cancellation/errors; count is already persisted.
      console.warn("Share action was cancelled or unavailable:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const content = article?.[`content_${lang}`] || article?.content || "";

  // Reading Time (rough estimate)
  const readingTime = useMemo(() => {
    const text =
      typeof content === "string" ? content : JSON.stringify(content);
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} ${lang === "ar" ? "دقائق" : "Min"}`;
  }, [content, lang]);

  if (!article) return null;

  const title = article[`title_${lang}`] || article.title || "بدون عنوان";
  const introduction =
    lang === "ar" ? article.introduction_ar || "" : article.introduction || "";
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
    let rawUrl =
      imageData.formats?.large?.url ||
      imageData.formats?.medium?.url ||
      imageData.url;
    if (rawUrl) {
      heroImageUrl = rawUrl.startsWith("http")
        ? rawUrl
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;
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
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover brightness-[0.45] transition-transform duration-[2s] scale-105"
          priority
        />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            {categoryName}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 md:gap-8 text-white/70 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-sky" />
              <span>
                {readingTime} {lang === "ar" ? "قراء" : "Read"}
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{dateFormatted}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16 relative z-10">
        {/* Left Column: Content */}
        <article className="lg:col-span-8 space-y-12">
          {introduction && (
            <div className="relative mb-8">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-brand-sky/50 rounded-full" />
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light pl-4">
                {introduction}
              </p>
            </div>
          )}
          {introduction && <hr className="my-8 border-t border-brand-sky/30" />}

          <div className="prose prose-invert prose-headings:font-bold prose-headings:text-white prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-lg prose-a:text-brand-sky prose-img:rounded-3xl prose-img:shadow-2xl max-w-none">
            {typeof content === "string" ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <BlocksRenderer
                content={content}
                blocks={{
                  image: ({ src, alt, width, height }) => (
                    <div className="my-12">
                      <Image
                        src={
                          src.startsWith("http")
                            ? src
                            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${src}`
                        }
                        alt={alt || "صورة المقال"}
                        width={width || 1200}
                        height={height || 700}
                        unoptimized
                        className="rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto object-cover border border-white/5"
                      />
                      {alt && (
                        <p className="text-center text-sm text-white/40 mt-4 italic">
                          {alt}
                        </p>
                      )}
                    </div>
                  ),
                }}
              />
            )}
          </div>

          <div className="pt-12 border-t border-white/10">
            <CommentSection
              articleId={article.id}
              articleDocumentId={article.documentId}
              onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
            />
          </div>
        </article>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-32 h-fit">
          {/* Action Stats */}
          <div className="flex gap-4 p-1 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
            <button
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
                isLiked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-transparent text-white/70 hover:bg-white/5"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-red-400" : ""}`} />
              <span className="font-semibold">{likes.toLocaleString()}</span>
            </button>
            <div className="flex-1 flex items-center justify-center gap-2 py-3 border-x border-white/5">
              <Eye className="w-5 h-5 text-brand-sky" />
              <span className="font-semibold text-white/70">
                {views.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white/70 hover:bg-white/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">{shares.toLocaleString()}</span>
            </button>
          </div>

          {/* Metadata Card */}
          <div className="bg-linear-to-br from-white/10 to-transparent p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    {lang === "ar" ? "تاريخ النشر" : "Publication Date"}
                  </p>
                  <p className="font-medium">{dateFormatted}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1 text-right">
                    {lang === "ar" ? "التصنيف" : "Category"}
                  </p>
                  <p className="font-medium text-right text-brand-sky">
                    {categoryName}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                    {lang === "ar" ? "وقت القراءة" : "Reading Time"}
                  </p>
                  <p className="font-medium">{readingTime}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1 text-right">
                    {lang === "ar" ? "اسم الكاتب" : "Author Name"}
                  </p>
                  <p className="font-medium text-right flex items-center gap-2 italic">
                    {author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <h3 className="text-lg font-bold mb-6 text-white/30 uppercase tracking-widest flex items-center gap-2">
                {lang === "ar" ? "محتويات المقال" : "Table of Contents"}
              </h3>
              <nav className="space-y-4">
                {tableOfContents.map((heading, idx) => (
                  <a
                    key={idx}
                    href={`#${heading.id}`}
                    className={`block text-sm transition-all hover:text-brand-sky ${
                      heading.level === "h1" || heading.level === "h2"
                        ? "text-white/70 font-medium"
                        : "text-white/40 pl-4"
                    } flex items-center gap-2`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-sky opacity-40 shrink-0" />
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </div>

      {similarArticles?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {lang === "ar" ? "قد يهمك أيضاً" : "You Might Also Like"}
            </h2>
            <div className="h-0.5 flex-1 bg-linear-to-r from-brand-sky/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Similar articles list could go here */}
          </div>
        </section>
      )}
    </main>
  );
}
