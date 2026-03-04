"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";

export default function TabsSection() {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useRTL();

  const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [articlesByTab, setArticlesByTab] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localLikes, setLocalLikes] = useState({}); // لتخزين الإعجابات المحلية
  const [localViews, setLocalViews] = useState({}); // لتخزين المشاهدات المحلية

  // دالة لاستخراج النص من blocks
  const extractTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "";
    let text = "";
    blocks.forEach((block) => {
      if (block.children) {
        block.children.forEach((child) => {
          if (child.text) text += child.text + " ";
        });
      }
    });
    return text.trim();
  };

  // تحميل حالات الإعجاب من localStorage
  useEffect(() => {
    const loadLocalData = () => {
      // تحميل الإعجابات
      const likedStates = {};
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("liked_")) {
          const articleId = key.replace("liked_", "");
          likedStates[articleId] = localStorage.getItem(key) === "true";
        }
      });
      setLocalLikes(likedStates);

      // تحميل المشاهدات المسجلة في هذه الجلسة
      const viewedStates = {};
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("viewed_")) {
          const articleId = key.replace("viewed_", "");
          viewedStates[articleId] = true;
        }
      });
      setLocalViews(viewedStates);
    };

    loadLocalData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/blog/data");
        const json = await res.json();

        if (!json.success) throw new Error(json.error);

        // تنسيق التصنيفات (Tabs)
        const allTab = {
          id: "all",
          slug: "all",
          title: currentLang === "ar" ? "الكل" : "All",
        };
        const formattedTabs = [
          allTab,
          ...json.categories.map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item[`name_${currentLang}`] || item.name || "بدون اسم",
          })),
        ];

        setTabs(formattedTabs);

        // تجميع المقالات حسب التصنيف
        const grouped = {};
        json.articles.forEach((article) => {
          const categoryId = article.category?.id;
          if (categoryId) {
            if (!grouped[categoryId]) {
              grouped[categoryId] = [];
            }
            grouped[categoryId].push(article);
          }
        });
        // إضافة جميع المقالات تحت تبويب "الكل"
        grouped["all"] = json.articles;

        setArticlesByTab(grouped);

        if (formattedTabs.length > 0) {
          setActiveTab(formattedTabs[0].id);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(
          currentLang === "ar"
            ? "غير قادر على الاتصال بالسيرفر. تأكد من تشغيل خادم Strapi."
            : "Unable to connect to the server. Please ensure Strapi is running.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentLang]);

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="main-container relative z-10">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-10 rounded-full bg-white/5 animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="h-48 bg-white/10 animate-pulse" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-white/10 rounded-md animate-pulse w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded-md animate-pulse w-full" />
                    <div className="h-4 bg-white/5 rounded-md animate-pulse w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-4 bg-white/10 rounded-full animate-pulse w-16" />
                    <div className="h-4 bg-white/10 rounded-full animate-pulse w-16" />
                  </div>
                  <div className="h-10 bg-white/10 rounded-xl animate-pulse w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="py-24 text-center text-red-400">{error}</div>;
  }

  if (tabs.length === 0) {
    return (
      <div className="py-24 text-center text-white/70">
        {t("blog.tabs.no_articles", "لا توجد تصنيفات")}
      </div>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden" dir={dir}>
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-sky/5 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-brand-sky/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="main-container relative z-10">
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 cursor-pointer text-sm md:text-base ${
                activeTab === tab.id
                  ? "bg-brand-sky border-brand-sky text-white shadow-lg shadow-brand-sky/20"
                  : "border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesByTab[activeTab]?.length > 0 ? (
            articlesByTab[activeTab].map((item) => {
              const title =
                item[`title_${currentLang}`] || item.title || "بدون عنوان";

              const excerptBlocks =
                item[`excerpt_${currentLang}`] || item.excerpt;
              const excerpt = excerptBlocks
                ? extractTextFromBlocks(excerptBlocks)
                : "";

              let imageUrl = "/images/blogImage.png";

              if (
                item.image &&
                Array.isArray(item.image) &&
                item.image.length > 0
              ) {
                const imageData = item.image[0];
                let rawUrl =
                  imageData.formats?.medium?.url ||
                  imageData.formats?.small?.url ||
                  imageData.url;
                if (rawUrl) {
                  imageUrl = rawUrl.startsWith("http")
                    ? rawUrl
                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;
                }
              }

              const categoryName = item.category
                ? item.category[`name_${currentLang}`] || item.category.name
                : currentLang === "ar"
                  ? "غير مصنف"
                  : "Uncategorized";

              const author =
                item[`author_${currentLang}`] || item.author || "غير معروف";

              const dateFormatted = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString(
                    currentLang === "ar" ? "ar-EG" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )
                : t("common.unknown_date", "غير محدد");

              // التحقق مما إذا كان المستخدم معجب بهذه المقالة
              const isLiked = localLikes[item.id] || false;

              // التحقق مما إذا كانت المشاهدة مسجلة محلياً
              const isViewed = localViews[item.id] || false;

              return (
                <div
                  key={item.id}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-brand-sky/5"
                >
                  <Link
                    href={`/techBlog/${item.slug}`}
                    className="block relative h-48 overflow-hidden"
                  >
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "/images/blogImage.png";
                      }}
                    />
                  </Link>

                  <div className="p-5 space-y-4">
                    <Link href={`/techBlog/${item.slug}`}>
                      <h3
                        className={`text-xl font-semibold text-white group-hover:text-brand-sky transition-colors line-clamp-2 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {title}
                      </h3>
                    </Link>

                    {excerpt && (
                      <p
                        className={`text-white/70 text-sm leading-relaxed line-clamp-3 ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {excerpt}
                      </p>
                    )}

                    <div
                      className={`flex flex-wrap items-center gap-2 text-xs text-white/50 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span className="px-2 py-1 bg-white/10 rounded-full">
                        {categoryName}
                      </span>
                      <span>•</span>
                      <span>{dateFormatted}</span>
                      <span>•</span>
                      <span>{author}</span>
                    </div>

                    <div
                      className={`flex items-center gap-4 text-sm ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1 text-white/60">
                        <Heart
                          className={`w-4 h-4 transition-all duration-300 ${
                            isLiked
                              ? "fill-red-400 text-red-400"
                              : "text-red-400"
                          }`}
                        />
                        <span>{(item.likes || 0) + (isLiked ? 1 : 0)}</span>
                      </div>

                      <div className="flex items-center gap-1 text-white/60">
                        <Eye className="w-4 h-4 text-brand-sky" />
                        <span>{(item.views || 0) + (isViewed ? 1 : 0)}</span>
                      </div>

                      <div className="flex items-center gap-1 text-white/60">
                        <MessageCircle className="w-4 h-4 text-brand-sky" />
                        <span>{item.comments_count || 0}</span>
                      </div>
                    </div>

                    <Link
                      href={`/techBlog/${item.slug}`}
                      className="block w-full py-2.5 px-4 rounded-xl border border-brand-sky/30 text-brand-sky hover:bg-brand-sky hover:text-white transition-all duration-300 font-medium text-center"
                    >
                      {t("blog.article.read_more", "اقرأ المزيد")}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-white/50 text-lg">
                {t(
                  "blog.tabs.no_articles",
                  "لا توجد مقالات متاحة في هذا القسم حاليًا",
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
