"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Eye,
  Share2,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

/* ── helpers ──────────────────────────────────────────────── */

function extractTextFromBlocks(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks.trim();
  if (!Array.isArray(blocks)) return "";
  let text = "";
  blocks.forEach((block) => {
    block?.children?.forEach((child) => {
      if (child?.text) text += `${child.text} `;
    });
  });
  return text.trim();
}

function resolveImageUrl(item, mediaBaseUrl) {
  const fallback = "/images/blogImage.png";
  if (!item) return fallback;
  const rawUrl =
    item.image?.[0]?.formats?.medium?.url ||
    item.image?.[0]?.formats?.small?.url ||
    item.image?.[0]?.url ||
    item.cover_image;
  if (!rawUrl) return fallback;
  if (rawUrl.startsWith("http")) return rawUrl;
  return `${mediaBaseUrl || ""}${rawUrl}`;
}

function calcReadingTime(raw, lang) {
  const text = typeof raw === "string" ? raw : JSON.stringify(raw ?? "");
  const mins = Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
  return `${mins} ${lang === "ar" ? "د" : "min"}`;
}

/* ── component ────────────────────────────────────────────── */

export default function BlogArticleCard({
  item,
  currentLang,
  isRTL = false,
  href,
  scrollOnNavigate,
  mediaBaseUrl,
  readMoreLabel,
  isLiked = false,
  isViewed = false,
  shareCount,
  onShare,
  isSharing = false,
  showExcerpt = true,
  showMeta = true,
  showActions = true,
}) {
  if (!item) return null;

  const title = item[`title_${currentLang}`] || item.title || "بدون عنوان";
  const excerptRaw = item[`excerpt_${currentLang}`] || item.excerpt;
  const excerpt = extractTextFromBlocks(excerptRaw);
  const identifier = item.documentId || item.id;
  const cardHref = href || (identifier ? `/techBlog/${identifier}` : "/techBlog");

  const categoryName = item.category
    ? item.category[`name_${currentLang}`] || item.category.name
    : currentLang === "ar"
    ? "غير مصنف"
    : "Uncategorized";

  const author = item[`author_${currentLang}`] || item.author || "غير معروف";
  const authorInitial = author.trim().charAt(0).toUpperCase();

  const publishedDate = item.publishedAt || item.published_at;
  const dateFormatted = publishedDate
    ? new Date(publishedDate).toLocaleDateString(
        currentLang === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      )
    : currentLang === "ar"
    ? "غير محدد"
    : "Unknown";

  const imageUrl = resolveImageUrl(item, mediaBaseUrl);
  const likes = item.likes || 0;
  const views = item.views || 0;
  const comments = item.comments_count || 0;
  const shares = shareCount ?? item.shares ?? 0;

  const contentRaw =
    item[`content_${currentLang}`] || item.content || excerptRaw || "";
  const readTime = calcReadingTime(contentRaw, currentLang);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const goTop = () => window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <article
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 bg-noon-card transition-all duration-500 hover:border-brand-sky/40 hover:-translate-y-1"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 40px rgba(77,171,255,0.15), 0 4px 24px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
      }}
    >
      {/* ── Image ──────────────────────────────────────────── */}
      <Link
        href={cardHref}
        scroll={scrollOnNavigate}
        onClick={goTop}
        className="block relative overflow-hidden"
        style={{ height: "200px", flexShrink: 0 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/images/blogImage.png";
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)",
          }}
        />


        {/* Reading time */}
        <span
          className="absolute bottom-3 right-3 flex items-center gap-1 text-white/80"
          style={{
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "999px",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Clock style={{ width: 11, height: 11, color: "#4dabff" }} />
          {readTime}
        </span>
      </Link>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5" style={{ gap: "12px" }}>

        {/* Title — override global h3 with inline styles */}
        <Link href={cardHref} scroll={scrollOnNavigate} onClick={goTop}>
          <p
            className={`font-bold text-white transition-colors duration-300 group-hover:text-brand-sky ${
              isRTL ? "text-right" : "text-left"
            }`}
            style={{
              fontSize: "16px",
              lineHeight: "1.45",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </p>
        </Link>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p
            className={isRTL ? "text-right" : "text-left"}
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "13.5px",
              lineHeight: "1.6",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {excerpt}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* ── Footer ─────────────────────────────────────── */}
        <div
          className="flex flex-col"
          style={{
            gap: "10px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Author + date */}
          {showMeta && (
            <div
              className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
              style={{ gap: "8px" }}
            >
              {/* Avatar */}
              <span
                className="flex items-center justify-center font-bold text-brand-sky shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(77,171,255,0.12)",
                  border: "1px solid rgba(77,171,255,0.3)",
                  fontSize: "11px",
                }}
              >
                {authorInitial}
              </span>
              <span
                className="text-white/70 truncate font-medium"
                style={{ fontSize: "12px" }}
              >
                {author}
              </span>
              <span
                className={`text-white/40 shrink-0 tabular-nums ${
                  isRTL ? "mr-auto" : "ml-auto"
                }`}
                style={{ fontSize: "11px" }}
              >
                {dateFormatted}
              </span>
            </div>
          )}

          {/* Stats */}
          {showActions && (
            <div
              className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
              style={{ gap: "14px" }}
            >
              <span
                className="flex items-center"
                style={{ gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 12 }}
              >
                <Heart
                  style={{
                    width: 13,
                    height: 13,
                    color: isLiked ? "#f87171" : "rgba(248,113,113,0.6)",
                    fill: isLiked ? "#f87171" : "none",
                    transition: "all 0.3s",
                  }}
                />
                {likes + (isLiked ? 1 : 0)}
              </span>
              <span
                className="flex items-center"
                style={{ gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 12 }}
              >
                <Eye style={{ width: 13, height: 13, color: "rgba(77,171,255,0.7)" }} />
                {views + (isViewed ? 1 : 0)}
              </span>
              <span
                className="flex items-center"
                style={{ gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 12 }}
              >
                <MessageCircle style={{ width: 13, height: 13, color: "rgba(77,171,255,0.7)" }} />
                {comments}
              </span>
              {typeof onShare === "function" && (
                <button
                  type="button"
                  onClick={() => onShare(item)}
                  disabled={isSharing}
                  className="flex items-center hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 12 }}
                  aria-label="Share"
                >
                  <Share2 style={{ width: 13, height: 13, color: "rgba(77,171,255,0.7)" }} />
                  {shares}
                </button>
              )}
            </div>
          )}

          {/* CTA button */}
          <Link
            href={cardHref}
            scroll={scrollOnNavigate}
            onClick={goTop}
            className={`group/btn flex items-center justify-center font-semibold transition-all duration-300 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
            style={{
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "12px",
              fontSize: "13.5px",
              color: "#4dabff",
              border: "1px solid rgba(77,171,255,0.3)",
              background: "rgba(77,171,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#4dabff";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.border = "1px solid #4dabff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(77,171,255,0.06)";
              e.currentTarget.style.color = "#4dabff";
              e.currentTarget.style.border = "1px solid rgba(77,171,255,0.3)";
            }}
          >
            {readMoreLabel}
            <Arrow
              style={{ width: 15, height: 15 }}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
