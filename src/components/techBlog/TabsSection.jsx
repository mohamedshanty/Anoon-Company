"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRTL } from "@/hooks/useRTL";

export default function TabsSection() {
  const { t } = useTranslation();
  const { isRTL, dir } = useRTL();
  const [activeSection, setActiveSection] = useState("ins");

  const sections = [
    { id: "ins", title: t("blog.tabs.sections.ins", "AI Insights") },
    { id: "tre", title: t("blog.tabs.sections.tre", "Tech Trends") },
    { id: "fut", title: t("blog.tabs.sections.fut", "Future Tech") },
    { id: "inn", title: t("blog.tabs.sections.inn", "Innovation") },
    { id: "gui", title: t("blog.tabs.sections.gui", "Guides") },
  ];

  // Example articles for each section
  const articles = {
    ins: [
      {
        id: 1,
        title: t("blog.tabs.articles.ins_1.title", "Learn more about AI"),
        description: t("blog.tabs.articles.ins_1.description", "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets."),
        category: t("blog.categories.environment", "Environment"),
        date: "October 10, 2023",
        author: t("blog.authors.jane_smith", "Jane Smith"),
        image: "/images/blogImage.png",
        likes: "1.4k",
        comments: 204,
        slug: "1",
      },
    ],
    tre: [
      {
        id: 2,
        title: t("blog.tabs.articles.tre_1.title", "A Decisive Victory for Progressive Policies"),
        description: "",
        category: t("blog.categories.politics", "Politics"),
        date: "October 12, 2023",
        author: t("blog.authors.john_doe", "John Doe"),
        image: "/images/blogImage.png",
        likes: "1.4k",
        comments: 204,
        slug: "2",
      },
      {
        id: 3,
        title: t("blog.tabs.articles.tre_1.title", "A Decisive Victory for Progressive Policies"),
        description: "",
        category: t("blog.categories.politics", "Politics"),
        date: "October 12, 2023",
        author: t("blog.authors.john_doe", "John Doe"),
        image: "/images/blogImage.png",
        likes: "1.4k",
        comments: 204,
        slug: "3",
      },
      {
        id: 4,
        title: t("blog.tabs.articles.tre_1.title", "A Decisive Victory for Progressive Policies"),
        description: "",
        category: t("blog.categories.politics", "Politics"),
        date: "October 12, 2023",
        author: t("blog.authors.john_doe", "John Doe"),
        image: "/images/blogImage.png",
        likes: "1.4k",
        comments: 204,
        slug: "4",
      },
    ],
    fut: [],
    inn: [],
    gui: [],
  };

  return (
    <section className="py-24 relative overflow-hidden" dir={dir}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-20 ${isRTL ? 'left-20' : 'right-20'} w-[45%] h-[45%] bg-blue-600/10 blur-[120px] rounded-full`} />
        <div className={`absolute bottom-20 ${isRTL ? 'right-20' : 'left-20'} w-[35%] h-[35%] bg-brand-orange/10 blur-[100px] rounded-full`} />
      </div>

      <div className="main-container relative z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${activeSection === sec.id
                ? "bg-brand-sky border-brand-sky text-white shadow-lg shadow-brand-sky/20"
                : "border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30"
                }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles[activeSection] && articles[activeSection].length > 0 ? (
            articles[activeSection].map((article) => (
              <div
                key={article.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-brand-sky/5"
              >
                {/* Article Image - جعل الصورة قابلة للنقر */}
                <Link
                  href={`/techBlog/${article.slug}`}
                  className="block relative h-48 overflow-hidden"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                  />
                </Link>

                {/* Article Content */}
                <div className="p-5 space-y-4">
                  {/* Title - جعل العنوان قابلاً للنقر */}
                  <Link href={`/techBlog/${article.slug}`}>
                    <h3 className={`text-xl font-semibold text-white group-hover:text-brand-sky transition-colors cursor-pointer hover:text-brand-sky ${isRTL ? 'text-right' : 'text-left'}`}>
                      {article.title}
                    </h3>
                  </Link>

                  {/* Description - Only for first article */}
                  {article.description && (
                    <p className={`text-white/70 text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                      {article.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className={`flex flex-wrap items-center gap-2 text-xs text-white/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="px-2 py-1 bg-white/10 rounded-full">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>

                  {/* Stats */}
                  <div className={`flex items-center gap-4 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center gap-1 text-white/60">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/60">
                      <MessageCircle className="w-4 h-4 text-brand-sky" />
                      <span>{article.comments}</span>
                    </div>
                  </div>

                  {/* Read More Button - رابط كامل */}
                  <Link
                    href={`/techBlog/${article.slug}`}
                    className="block w-full py-2.5 px-4 rounded-xl border border-brand-sky/30 text-brand-sky hover:bg-brand-sky hover:text-white transition-all duration-300 font-medium text-center cursor-pointer"
                  >
                    {t("blog.article.read_more", "Read More")}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-white/50 text-lg">
                {t("blog.tabs.no_articles", "No articles available in this section.")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

