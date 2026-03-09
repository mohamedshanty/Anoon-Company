"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useArticles } from "@/hooks/useArticles";
import ArticleEditor from "./components/ArticleEditor";
import ArticlesTable from "./components/ArticlesTable";
import DashboardStats from "./components/DashboardStats";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  LogOut,
  Plus,
  X,
  BookOpen,
} from "lucide-react";

export default function DashboardClient({ user, initialStats }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [notification, setNotification] = useState(null);

  const {
    articles,
    isLoading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    togglePublish,
    refetch,
  } = useArticles();

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleSaveArticle = async (data) => {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, data);
        showNotification("success", "Article updated successfully!");
      } else {
        await createArticle(data);
        showNotification("success", "Article created successfully!");
      }
      setShowEditor(false);
      setEditingArticle(null);
    } catch (err) {
      showNotification("error", err.message || "Failed to save article.");
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowEditor(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    try {
      await deleteArticle(id);
      showNotification("success", "Article deleted.");
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  const handleTogglePublish = async (id, publish) => {
    try {
      await togglePublish(id, publish);
      showNotification(
        "success",
        publish ? "Article published!" : "Article moved to draft.",
      );
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  const stats =
    articles.length > 0
      ? {
          total: articles.length,
          published: articles.filter((a) => a.status === "published").length,
          drafts: articles.filter((a) => a.status === "draft").length,
          totalViews: articles.reduce((s, a) => s + (a.views || 0), 0),
          totalLikes: articles.reduce((s, a) => s + (a.likes || 0), 0),
        }
      : initialStats;

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col pt-20">
      {/* Notification toast */}
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          <span className="text-sm font-medium">{notification.message}</span>
          <button onClick={() => setNotification(null)}>
            <X className="w-4 h-4 opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Anoon CMS</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`nav-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === id
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-white/30 text-sm hidden md:block">
              {user.email}
            </span>
            <button
              id="dashboard-logout"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">
              {activeTab === "overview"
                ? "Dashboard"
                : activeTab === "articles"
                  ? "Articles"
                  : "Analytics"}
            </h1>
            <p className="text-white/30 text-sm mt-0.5">
              {activeTab === "overview" &&
                "Welcome back. Here's what's happening."}
              {activeTab === "articles" && `${stats.total} total articles`}
              {activeTab === "analytics" && "Performance metrics"}
            </p>
          </div>

          {activeTab === "articles" && (
            <button
              id="new-article-btn"
              onClick={() => {
                setEditingArticle(null);
                setShowEditor(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-sky-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-sky-500/20"
            >
              <Plus className="w-4 h-4" />
              New Article
            </button>
          )}
        </div>

        {activeTab === "overview" && (
          <DashboardStats
            stats={stats}
            articles={articles}
            isLoading={isLoading}
          />
        )}

        {activeTab === "articles" && (
          <ArticlesTable
            articles={articles}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsView articles={articles} stats={stats} />
        )}
      </main>

      {showEditor && (
        <ArticleEditor
          article={editingArticle}
          onSave={handleSaveArticle}
          onClose={() => {
            setShowEditor(false);
            setEditingArticle(null);
          }}
        />
      )}
    </div>
  );
}

function AnalyticsView({ articles, stats }) {
  const topByViews = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
  const topByLikes = [...articles]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);

  const categoryCount = {};
  articles.forEach((a) => {
    const cat = a.category || "Uncategorized";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Views",
            value: stats.totalViews?.toLocaleString() ?? "0",
            color: "from-sky-500 to-cyan-500",
          },
          {
            label: "Total Likes",
            value: stats.totalLikes?.toLocaleString() ?? "0",
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "Published",
            value: stats.published ?? "0",
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Drafts",
            value: stats.drafts ?? "0",
            color: "from-yellow-500 to-orange-500",
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div
              className={`text-3xl font-bold bg-linear-to-r ${color} bg-clip-text text-transparent`}
            >
              {value}
            </div>
            <div className="text-white/40 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">
            Top Articles by Views
          </h2>
          <div className="space-y-3">
            {topByViews.length === 0 ? (
              <p className="text-white/30 text-sm">No data yet.</p>
            ) : (
              topByViews.map((a, i) => (
                <div key={a.id} className="flex items-center gap-3">
                  <span className="text-white/20 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-sm truncate">{a.title}</p>
                    <div className="h-1.5 mt-1 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-sky-500 to-cyan-500"
                        style={{
                          width: `${Math.min(100, ((a.views || 0) / Math.max(1, topByViews[0]?.views || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sky-400 text-sm font-medium">
                    {(a.views || 0).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">
            Top Articles by Likes
          </h2>
          <div className="space-y-3">
            {topByLikes.length === 0 ? (
              <p className="text-white/30 text-sm">No data yet.</p>
            ) : (
              topByLikes.map((a, i) => (
                <div key={a.id} className="flex items-center gap-3">
                  <span className="text-white/20 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-sm truncate">{a.title}</p>
                    <div className="h-1.5 mt-1 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-purple-500 to-pink-500"
                        style={{
                          width: `${Math.min(100, ((a.likes || 0) / Math.max(1, topByLikes[0]?.likes || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-purple-400 text-sm font-medium">
                    {(a.likes || 0).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:col-span-2">
          <h2 className="text-white font-semibold mb-4">
            Articles by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryCount).map(([cat, count]) => (
              <div
                key={cat}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl"
              >
                <span className="text-white/60 text-sm">{cat}</span>
                <span className="text-sky-400 font-bold text-sm">{count}</span>
              </div>
            ))}
            {Object.keys(categoryCount).length === 0 && (
              <p className="text-white/30 text-sm">No articles yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
