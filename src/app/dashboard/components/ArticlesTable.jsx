"use client";
import { useState } from "react";
import {
  Edit2,
  Trash2,
  Globe,
  EyeOff,
  Eye,
  Heart,
  Share2,
  Search,
  FileText,
} from "lucide-react";

export default function ArticlesTable({
  articles,
  isLoading,
  error,
  onEdit,
  onDelete,
  onTogglePublish,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.toLowerCase().includes(search.toLowerCase()) ||
      a.author?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            id="articles-search"
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-sky-500/50 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {["all", "published", "draft"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                statusFilter === s
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-white/30 text-xs uppercase tracking-widest font-medium">
                  Article
                </th>
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium hidden lg:table-cell">
                  Stats
                </th>
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium hidden md:table-cell">
                  Status
                </th>
                <th className="text-left px-4 py-4 text-white/30 text-xs uppercase tracking-widest font-medium hidden lg:table-cell">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-white/30 text-xs uppercase tracking-widest font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-white/20">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No articles found.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {article.cover_image ? (
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-white/20" />
                          </div>
                        )}
                        <div>
                          <p className="text-white/80 font-medium text-sm line-clamp-1 max-w-[200px]">
                            {article.title}
                          </p>
                          <p className="text-white/30 text-xs mt-0.5 font-mono">
                            /{article.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {article.category ? (
                        <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 rounded-full text-xs">
                          {article.category}
                        </span>
                      ) : (
                        <span className="text-white/20 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {article.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {article.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" /> {article.shares || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${article.status === "published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-white/30 text-xs">
                        {new Date(article.created_at).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            onTogglePublish(
                              article.id,
                              article.status !== "published",
                            )
                          }
                          title={
                            article.status === "published"
                              ? "Unpublish"
                              : "Publish"
                          }
                          className={`p-2 rounded-lg transition-all ${article.status === "published" ? "text-green-400 hover:bg-green-500/10" : "text-white/30 hover:bg-white/10 hover:text-white/70"}`}
                        >
                          {article.status === "published" ? (
                            <Globe className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => onEdit(article)}
                          className="p-2 rounded-lg text-white/30 hover:bg-sky-500/10 hover:text-sky-400 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(article.id)}
                          className="p-2 rounded-lg text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-white/20 text-xs text-right">
        Showing {filtered.length} of {articles.length} articles
      </p>
    </div>
  );
}
