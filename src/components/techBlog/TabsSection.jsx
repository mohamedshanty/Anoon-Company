"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

const sections = [
  { id: 1, title: "Section 1" },
  { id: 2, title: "Section 2" },
  { id: 3, title: "Section 3" },
  { id: 4, title: "Section 4" },
  { id: 5, title: "Section 5" },
];

// Example articles for each section
const articles = {
  1: [
    {
      id: 1,
      title: "Learn more about ai",
      description:
        "World leaders gathered at the Global Climate Summit to discuss urgent climate action, emissions reductions, and renewable energy targets.",
      category: "Environment",
      date: "October 10, 2023",
      author: "Jane Smith",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
      slug: "1", // ← غيرنا slug إلى "1" ليتوافق مع الرابط /techBlog/1
    },
  ],
  2: [
    {
      id: 2,
      title: "A Decisive Victory for Progressive Policies",
      description: "",
      category: "Politics",
      date: "October 12, 2023",
      author: "John Doe",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
      slug: "2", // ← غيرنا إلى "2"
    },
    {
      id: 3,
      title: "A Decisive Victory for Progressive Policies",
      description: "",
      category: "Politics",
      date: "October 12, 2023",
      author: "John Doe",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
      slug: "3", // ← غيرنا إلى "3"
    },
    {
      id: 4,
      title: "A Decisive Victory for Progressive Policies",
      description: "",
      category: "Politics",
      date: "October 12, 2023",
      author: "John Doe",
      image: "/images/blogImage.png",
      likes: "1.4k",
      comments: 204,
      slug: "4", // ← غيرنا إلى "4"
    },
  ],
  3: [],
  4: [],
  5: [],
};

export default function TabsSection() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[45%] h-[45%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-20 w-[35%] h-[35%] bg-brand-orange/10 blur-[100px] rounded-full" />
      </div>

      <div className="main-container relative z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 ${
                activeSection === sec.id
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
            articles[activeSection].map((article, index) => (
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
                    <h3 className="text-xl font-semibold text-white group-hover:text-brand-sky transition-colors cursor-pointer hover:text-brand-sky">
                      {article.title}
                    </h3>
                  </Link>

                  {/* Description - Only for first article */}
                  {article.description && (
                    <p className="text-white/70 text-sm leading-relaxed">
                      {article.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                    <span className="px-2 py-1 bg-white/10 rounded-full">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
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
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-white/50 text-lg">
                No articles available in this section.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
