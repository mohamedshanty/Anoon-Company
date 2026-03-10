"use client";
import {
  FileText,
  Eye,
  Heart,
  TrendingUp,
  BookOpen,
  Edit3,
} from "lucide-react";

export default function DashboardStats({ stats, articles, isLoading }) {
  const recentArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const statCards = [
    {
      label: "Total Articles",
      value: stats.total,
      icon: FileText,
      color: "from-sky-500 to-cyan-500",
      bg: "bg-sky-500/10",
    },
    {
      label: "Published",
      value: stats.published,
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Views",
      value: stats.totalViews?.toLocaleString(),
      icon: Eye,
      color: "from-purple-500 to-violet-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Total Likes",
      value: stats.totalLikes?.toLocaleString(),
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all group"
          >
            <div
              className={`inline-flex p-2 sm:p-2.5 rounded-xl ${bg} mb-3 sm:mb-4`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-bold bg-linear-to-r ${color} bg-clip-text text-transparent`}
            >
              {isLoading ? (
                <span className="block w-14 h-7 bg-white/10 animate-pulse rounded-lg" />
              ) : (
                (value ?? "0")
              )}
            </div>
            <div className="text-white/40 text-xs sm:text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              Recent Articles
            </h2>
          </div>
          <div className="space-y-3">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-white/5 rounded-xl animate-pulse"
                  />
                ))
              : recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    {article.cover_image ? (
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-white/20" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-xs sm:text-sm font-medium truncate">
                        {article.title}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">
                        {new Date(article.created_at).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </p>
                    </div>
                    <span
                      className={`hidden xs:inline-flex shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                        article.status === "published"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {article.status}
                    </span>
                    <span
                      className={`xs:hidden w-2 h-2 rounded-full shrink-0 ${
                        article.status === "published"
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                    />
                  </div>
                ))}
            {!isLoading && recentArticles.length === 0 && (
              <div className="text-center py-8 text-white/20">
                <Edit3 className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No articles yet. Create your first one!</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
            <h2 className="text-white font-semibold mb-4">Content Health</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/50">Published rate</span>
                  <span className="text-green-400">
                    {stats.total > 0
                      ? Math.round((stats.published / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-green-500 to-emerald-500 transition-all duration-700"
                    style={{
                      width: `${stats.total > 0 ? (stats.published / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/50">Drafts</span>
                  <span className="text-yellow-400">
                    {stats.total > 0
                      ? Math.round((stats.drafts / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-yellow-500 to-orange-500 transition-all duration-700"
                    style={{
                      width: `${stats.total > 0 ? (stats.drafts / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-sky-500/10 to-purple-500/10 border border-sky-500/20 rounded-2xl p-4 sm:p-6">
            <div className="text-sky-400 text-xs uppercase tracking-widest mb-2">
              Database
            </div>
            <p className="text-white font-medium text-sm">Supabase</p>
            <p className="text-white/30 text-xs mt-1">
              PostgreSQL · Row Level Security
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
