"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BlogArticleCard from "./BlogArticleCard";

const tabContentVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

export default function TabsSection() {
  const { t, i18n } = useTranslation();
  const { isRTL, dir } = useRTL();
  const prefersReducedMotion = useReducedMotion();

  const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [articlesByTab, setArticlesByTab] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localLikes, setLocalLikes] = useState({}); // لتخزين الإعجابات المحلية
  const [localViews, setLocalViews] = useState({}); // لتخزين المشاهدات المحلية
  const [localShares, setLocalShares] = useState({});
  const [sharingById, setSharingById] = useState({});
  const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "";

  const getArticleIdentifier = (item) => item?.documentId || item?.id;
  const getArticleHref = (item) => {
    const identifier = getArticleIdentifier(item);
    return identifier ? `/techBlog/${identifier}` : "/techBlog";
  };

  const handleShare = async (item) => {
    const identifier = getArticleIdentifier(item);
    if (!identifier || sharingById[identifier]) return;

    const articleUrl = `${window.location.origin}${getArticleHref(item)}`;
    const title = item[`title_${currentLang}`] || item.title || "Anoon Blog";
    const previousShares = localShares[identifier] ?? item.shares ?? 0;

    setSharingById((prev) => ({ ...prev, [identifier]: true }));
    setLocalShares((prev) => ({
      ...prev,
      [identifier]: previousShares + 1,
    }));

    try {
      const res = await fetch(`/api/articles/${identifier}/shares`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && typeof data.shares === "number") {
          setLocalShares((prev) => ({
            ...prev,
            [identifier]: data.shares,
          }));
        }
      } else {
        setLocalShares((prev) => ({
          ...prev,
          [identifier]: previousShares,
        }));
      }
    } catch (error) {
      setLocalShares((prev) => ({
        ...prev,
        [identifier]: previousShares,
      }));
      console.error("Error sharing article:", error);
      setSharingById((prev) => ({ ...prev, [identifier]: false }));
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: articleUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(articleUrl);
      }
    } catch (error) {
      // Ignore share-sheet cancellation/errors; count is already persisted.
      console.warn("Share action was cancelled or unavailable:", error);
    } finally {
      setSharingById((prev) => ({ ...prev, [identifier]: false }));
    }
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
            ? "غير قادر على الاتصال بالسيرفر."
            : "Unable to connect to the server.",
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
              <div
                key={i}
                className="w-24 h-10 rounded-full bg-white/5 animate-pulse"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
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
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className={`relative px-6 py-2.5 rounded-full border cursor-pointer text-sm md:text-base overflow-hidden ${
                activeTab === tab.id
                  ? "border-brand-sky text-white shadow-lg shadow-brand-sky/20"
                  : "border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30"
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTechBlogTab"
                  className="absolute inset-0 rounded-full bg-brand-sky"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </motion.button>
          ))}
        </div>

        <div className="min-h-105 md:min-h-130">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={prefersReducedMotion ? undefined : tabContentVariants}
              initial={prefersReducedMotion ? false : "initial"}
              animate={prefersReducedMotion ? undefined : "animate"}
              exit={prefersReducedMotion ? undefined : "exit"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {articlesByTab[activeTab]?.length > 0 ? (
                articlesByTab[activeTab].map((item) => {
                  const identifier = getArticleIdentifier(item);
                  if (!identifier) return null;
                  const isLiked = localLikes[identifier] || false;
                  const isViewed = localViews[identifier] || false;
                  const shareCount =
                    localShares[identifier] ?? item.shares ?? 0;

                  return (
                    <motion.div
                      key={identifier}
                      variants={prefersReducedMotion ? undefined : itemVariants}
                      initial={prefersReducedMotion ? false : "initial"}
                      animate={prefersReducedMotion ? undefined : "animate"}
                      exit={prefersReducedMotion ? undefined : "exit"}
                      layout
                      className="h-full"
                    >
                      <BlogArticleCard
                        item={item}
                        currentLang={currentLang}
                        isRTL={isRTL}
                        href={getArticleHref(item)}
                        mediaBaseUrl={mediaBaseUrl}
                        readMoreLabel={t(
                          "blog.article.read_more",
                          "اقرأ المزيد",
                        )}
                        isLiked={isLiked}
                        isViewed={isViewed}
                        shareCount={shareCount}
                        onShare={handleShare}
                        isSharing={sharingById[identifier]}
                      />
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  variants={prefersReducedMotion ? undefined : itemVariants}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? undefined : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  className="col-span-full text-center py-20"
                >
                  <p className="text-white/50 text-lg">
                    {t(
                      "blog.tabs.no_articles",
                      "لا توجد مقالات متاحة في هذا القسم حاليًا",
                    )}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
