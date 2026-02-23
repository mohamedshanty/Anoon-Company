"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Eye,
} from "lucide-react";

export default function FullBlog({ article, similarArticles }) {
  if (!article) return null;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-[45%] h-[45%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-20 w-[35%] h-[35%] bg-brand-orange/10 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section with Image as Landing */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 main-container max-w-6xl mx-auto">
          {/* Article Title and Meta */}
          <div className="space-y-6 animate-fadeIn">
            {/* Category Badge */}
            <div className="inline-block px-4 py-2 bg-brand-sky/20 backdrop-blur-sm border border-brand-sky/30 rounded-full">
              <span className="text-brand-sky font-medium text-sm">
                {article.category || "Healthcare"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight">
              {article.title}
            </h1>

            {/* Author and Date Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-sky" />
                <span>{article.author || "Dr. Emily Walker"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-sky" />
                <span>{article.date || "October 15, 2023"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-sky" />
                <span>{article.readingTime || "10 min read"}</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the Content */}
      <div className="main-container relative z-10 max-w-6xl mx-auto py-24">
        {/* Main Content Area with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Right Side (العمود الأكبر) */}
          <div className="lg:col-span-3">
            {/* Introduction */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Introduction
              </h2>
              <p className="text-white/60 text-md leading-relaxed font-light">
                {article.introduction}
              </p>
            </div>

            <hr className="border-t border-white/20 my-20" />

            {/* Article Content */}
            <div className="space-y-8 mb-16">
              {article.content?.map((section, index) => (
                <div key={index} id={`section-${index}`}>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {section.subtitle}
                  </h2>
                  <p className="text-white/60 text-md leading-relaxed font-light">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Left Sidebar - Article Info (العمود الأصغر) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Engagement Stats */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex justify-around">
                <div className="flex flex-col items-center">
                  <Heart className="w-5 h-5 text-red-500 mb-1" />
                  <span className="text-white font-medium text-sm">
                    {article.likes || "24.5k"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Eye className="w-5 h-5 text-white/70 mb-1" />
                  <span className="text-white font-medium text-sm">
                    {article.views || "50k"}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-5 h-5 text-white/70 mb-1" />
                  <span className="text-white font-medium text-sm">
                    {article.comments || "206"}
                  </span>
                </div>
              </div>

              {/* Publication Info */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4">
                <div>
                  <div className="text-white/50 text-xs mb-1">
                    Publication Date
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-4 h-4 text-brand-sky" />
                    <span>{article.date || "October 15, 2023"}</span>
                  </div>
                </div>

                <div>
                  <div className="text-white/50 text-xs mb-1">Category</div>
                  <div className="flex items-center gap-2 text-white">
                    <Tag className="w-4 h-4 text-brand-sky" />
                    <span>{article.category || "Healthcare"}</span>
                  </div>
                </div>

                <div>
                  <div className="text-white/50 text-xs mb-1">Reading Time</div>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-brand-sky" />
                    <span>{article.readingTime || "10 Min"}</span>
                  </div>
                </div>

                <div>
                  <div className="text-white/50 text-xs mb-1">Author Name</div>
                  <div className="flex items-center gap-2 text-white">
                    <User className="w-4 h-4 text-brand-sky" />
                    <span>{article.author || "Dr. Emily Walker"}</span>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              {article.content && article.content.length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 text-sm">
                    Table of Contents
                  </h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    {article.content.map((section, index) => (
                      <li key={index}>
                        <a
                          href={`#section-${index}`}
                          className="flex items-center gap-2 hover:text-brand-sky transition-colors"
                        >
                          <span className="w-1 h-1 bg-white rounded-full"></span>
                          {section.subtitle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Articles */}
        {similarArticles && similarArticles.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-8">
              Similar Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarArticles.map((art) => (
                <div
                  key={art.id}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-brand-sky/5"
                >
                  <Link
                    href={`/techBlog/${art.slug}`}
                    className="block relative h-48 overflow-hidden"
                  >
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                    />
                  </Link>
                  <div className="p-5 space-y-4">
                    <Link href={`/techBlog/${art.slug}`}>
                      <h3 className="text-xl font-semibold text-white group-hover:text-brand-sky transition-colors cursor-pointer">
                        {art.title}
                      </h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
