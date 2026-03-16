"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useArticles } from "@/hooks/useArticles";
import ArticleEditor from "./components/ArticleEditor";
import ArticlesTable from "./components/ArticlesTable";
import DashboardStats from "./components/DashboardStats";
import TrainingProgramsList from "./components/TrainingProgramsList";
import TrainingProgramEditor from "./components/TrainingProgramEditor";
import OfflineBanner from "./components/OfflineBanner";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  LogOut,
  Plus,
  X,
  BookOpen,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Zap,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Command,
  Sparkles,
  Activity,
  Settings,
  HelpCircle,
  Menu,
  ArrowUpRight,
  Circle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

// ─── Animated Background ──────────────────────────────────────────────────────
function MeshBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base dark */}
      <div className="absolute inset-0 bg-[#030712]" />
      {/* Radial glows */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "meshDrift1 18s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #9333EA 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "meshDrift2 22s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "meshDrift3 14s ease-in-out infinite alternate",
        }}
      />
      {/* Noise grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px),
                            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)`,
        }}
      />
      <style>{`
        @keyframes meshDrift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(5%,8%) scale(1.1); } }
        @keyframes meshDrift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-6%,-5%) scale(1.15); } }
        @keyframes meshDrift3 { from { transform: translate(0,0); } to { transform: translate(4%,-6%); } }
        @keyframes slideInRight { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }
        @keyframes slideInUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes countUp { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse-ring { 0% { transform:scale(1); opacity:1; } 100% { transform:scale(1.6); opacity:0; } }
        .animate-slide-in-right { animation: slideInRight 0.4s cubic-bezier(.22,1,.36,1) both; }
        .animate-slide-in-up { animation: slideInUp 0.35s cubic-bezier(.22,1,.36,1) both; }
        .animate-fade-in { animation: fadeIn 0.3s ease both; }
        .animate-count-up { animation: countUp 0.5s cubic-bezier(.22,1,.36,1) both; }
        .shimmer-bg {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s infinite;
        }
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .glass-heavy { background: rgba(10,15,30,0.85); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.1); }
        .nav-glow { box-shadow: 0 0 20px rgba(14,165,233,0.15); }
        .btn-glow:hover { box-shadow: 0 0 24px rgba(14,165,233,0.35), 0 0 48px rgba(147,51,234,0.2); }
        .sidebar-item-active { background: linear-gradient(135deg, rgba(14,165,233,0.15), rgba(147,51,234,0.1)); border-left: 2px solid #0EA5E9; }
        .sidebar-item-active .sidebar-icon { color: #0EA5E9; }
        .text-gradient-blue { background: linear-gradient(135deg, #0EA5E9, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-purple { background: linear-gradient(135deg, #9333EA, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-main { background: linear-gradient(135deg, #0EA5E9 0%, #9333EA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: transform 0.2s cubic-bezier(.22,1,.36,1), box-shadow 0.2s ease, border-color 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.15); }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

// ─── Command Palette ──────────────────────────────────────────────────────────
function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [isOpen]);

  const commands = [
    {
      id: "overview",
      label: "Go to Overview",
      icon: LayoutDashboard,
      group: "Navigation",
    },
    {
      id: "articles",
      label: "Go to Articles",
      icon: FileText,
      group: "Navigation",
    },
    {
      id: "training",
      label: "Go to Training Programs",
      icon: BookOpen,
      group: "Navigation",
    },
    {
      id: "analytics",
      label: "Go to Analytics",
      icon: BarChart2,
      group: "Navigation",
    },
    {
      id: "new-article",
      label: "Create New Article",
      icon: Plus,
      group: "Actions",
    },
    {
      id: "new-training",
      label: "Create New Program",
      icon: Plus,
      group: "Actions",
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 animate-fade-in"
      style={{ background: "rgba(3,7,18,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="glass-heavy rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
          <Search className="w-4 h-4 text-white/30 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-sm"
          />
          <kbd className="text-white/20 text-xs border border-white/10 px-1.5 py-0.5 rounded-md">
            ESC
          </kbd>
        </div>
        <div className="py-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-white/25 text-sm py-8">No results</p>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    onNavigate(cmd.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left group"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-sky-500/10 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors flex-1">
                    {cmd.label}
                  </span>
                  <span className="text-white/20 text-xs">{cmd.group}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Settings View ─────────────────────────────────────────────────────────────
function SettingsView({ user, onLogout }) {
  return (
    <div className="space-y-6 animate-slide-in-up max-w-2xl">
      <div className="glass rounded-2xl p-6 border border-white/8">
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">
          Account
        </p>
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: "linear-gradient(135deg, #0EA5E9, #9333EA)" }}
          >
            {user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-white font-medium text-sm">{user?.email}</p>
            <p className="text-white/40 text-xs mt-0.5">Administrator</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/8">
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">
          Preferences
        </p>
        <div className="space-y-4">
          {[
            {
              label: "Dark Mode",
              desc: "Always enabled for CMS",
              enabled: true,
              locked: true,
            },
            {
              label: "Compact Sidebar",
              desc: "Collapse sidebar by default",
              enabled: false,
              locked: false,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="text-white/70 text-sm">{pref.label}</p>
                <p className="text-white/30 text-xs mt-0.5">{pref.desc}</p>
              </div>
              <div
                className={`w-10 h-5 rounded-full relative transition-colors ${pref.enabled ? "bg-sky-500" : "bg-white/10"} ${pref.locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${pref.enabled ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border border-red-500/20">
        <p className="text-red-400/60 text-[10px] uppercase tracking-widest mb-4">
          Danger Zone
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Sign out</p>
            <p className="text-white/30 text-xs mt-0.5">
              End your admin session
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Help Modal ───────────────────────────────────────────────────────────────
function HelpModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in"
      style={{ background: "rgba(3,7,18,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="glass-heavy rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10">
              <HelpCircle className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Help & Shortcuts
              </h2>
              <p className="text-white/30 text-xs">Anoon CMS quick reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">
              Keyboard Shortcuts
            </p>
            <div className="space-y-2">
              {[
                { keys: "⌘K / Ctrl+K", desc: "Open Command Palette" },
                { keys: "Escape", desc: "Close modals & overlays" },
              ].map((s) => (
                <div
                  key={s.keys}
                  className="flex items-center justify-between py-2 px-3 bg-white/3 rounded-xl"
                >
                  <span className="text-white/60 text-sm">{s.desc}</span>
                  <kbd className="text-white/40 text-xs border border-white/10 px-2 py-0.5 rounded-md font-mono">
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">
              Sections
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: LayoutDashboard,
                  label: "Overview",
                  desc: "Stats & activity summary",
                },
                {
                  icon: FileText,
                  label: "Articles",
                  desc: "Create & manage blog posts",
                },
                {
                  icon: BookOpen,
                  label: "Training",
                  desc: "Training programs",
                },
                {
                  icon: BarChart2,
                  label: "Analytics",
                  desc: "Performance metrics",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 bg-white/3 rounded-xl"
                >
                  <Icon className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/70 text-xs font-medium">{label}</p>
                    <p className="text-white/30 text-[10px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/8 flex items-center justify-between">
          <p className="text-white/25 text-xs">Anoon CMS v1.0</p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/70 text-xs transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  user,
  onLogout,
  mobileOpen,
  onMobileClose,
  isMobile,
  onHelp,
}) {
  const ec = !isMobile && collapsed; // effectiveCollapsed
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "training", label: "Training", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  return (
    <aside
      className={`glass-heavy fixed left-0 top-0 h-full z-30 flex flex-col transition-all duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      style={{ width: ec ? "72px" : "240px" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/6 shrink-0">
        <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/logo1.png"
            alt="Anoon Logo"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        {!ec && (
          <div className="ml-3 overflow-hidden animate-fade-in">
            <p className="text-white font-bold text-sm leading-none">
              Anoon CMS
            </p>
            <p className="text-white/30 text-[10px] mt-0.5">Admin Dashboard</p>
          </div>
        )}
        <button
          onClick={() =>
            isMobile ? onMobileClose() : setCollapsed(!collapsed)
          }
          className="ml-auto p-1.5 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/5 transition-all"
        >
          {isMobile ? (
            <X className="w-3.5 h-3.5" />
          ) : ec ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {!ec && (
          <p className="text-white/20 text-[10px] uppercase tracking-widest px-3 pb-2 font-medium">
            Main
          </p>
        )}
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              if (isMobile) onMobileClose();
            }}
            title={ec ? label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative
              ${
                activeTab === id
                  ? "sidebar-item-active text-white"
                  : "text-white/35 hover:text-white/70 hover:bg-white/5"
              }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 sidebar-icon transition-colors ${activeTab === id ? "" : "text-white/30 group-hover:text-white/60"}`}
            />
            {!ec && <span className="truncate">{label}</span>}
            {activeTab === id && !ec && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
            )}
          </button>
        ))}

        <div className="pt-4">
          {!ec && (
            <p className="text-white/20 text-[10px] uppercase tracking-widest px-3 pb-2 font-medium">
              System
            </p>
          )}
          {bottomItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              title={ec ? label : undefined}
              onClick={() => {
                if (id === "help") {
                  onHelp?.();
                } else {
                  setActiveTab(id);
                }
                if (isMobile) onMobileClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id && id !== "help"
                  ? "sidebar-item-active text-white"
                  : "text-white/25 hover:text-white/55 hover:bg-white/5"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${activeTab === id && id !== "help" ? "sidebar-icon" : ""}`}
              />
              {!ec && <span className="truncate">{label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/6">
        {ec ? (
          <button
            onClick={onLogout}
            title="Sign out"
            className="w-full flex items-center justify-center p-2 rounded-xl text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-all">
            <div
              className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #0EA5E9, #9333EA)",
              }}
            >
              {user.email?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/70 text-xs font-medium truncate">
                {user.email}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white/30 text-[10px]">Online</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Sign out"
              className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({
  activeTab,
  onCommandPalette,
  stats,
  articles = [],
  collapsed,
  onMobileMenu,
  isMobile,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const tabTitles = {
    overview: "Dashboard Overview",
    articles: "Articles",
    training: "Training Programs",
    analytics: "Analytics",
    settings: "Settings",
  };

  return (
    <header
      className="fixed top-0 right-0 h-16 z-20 flex items-center px-4 sm:px-6 border-b border-white/6 transition-all duration-300"
      style={{
        left: isMobile ? 0 : collapsed ? "72px" : "240px",
        background: "rgba(3,7,18,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex-1 flex items-center gap-2 sm:gap-4">
        <button
          onClick={onMobileMenu}
          className="md:hidden p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-white font-semibold text-sm">
            {tabTitles[activeTab]}
          </h1>
          <p className="text-white/25 text-xs">
            {greeting} · {dateStr}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search / Command */}
        <button
          onClick={onCommandPalette}
          className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-white/30 hover:text-white/60 hover:bg-white/6 transition-all text-xs group"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:block">Search...</span>
          <kbd className="hidden md:flex items-center gap-0.5 border border-white/10 rounded px-1 py-0.5 text-[10px] text-white/20 group-hover:border-white/20 group-hover:text-white/35 transition-colors">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <Bell className="w-4 h-4" />
            {articles.length > 0 && (
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-400"
                style={{ boxShadow: "0 0 0 2px rgba(3,7,18,1)" }}
              />
            )}
          </button>
          {notifOpen && (
            <div className="absolute top-10 right-0 w-72 glass-heavy rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-slide-in-up">
              <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                <span className="text-white text-sm font-semibold">
                  Recent Activity
                </span>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="p-1 rounded-lg text-white/30 hover:text-white/60 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="py-2 max-h-72 overflow-y-auto">
                {articles.length === 0 ? (
                  <p className="text-white/25 text-sm text-center py-6">
                    No recent activity
                  </p>
                ) : (
                  articles.slice(0, 6).map((a) => (
                    <div
                      key={a.id}
                      className="px-4 py-2.5 hover:bg-white/5 transition-colors"
                    >
                      <p className="text-white/70 text-xs font-medium truncate">
                        {a.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${a.status === "published" ? "bg-green-400" : "bg-yellow-400"}`}
                        />
                        <span className="text-white/30 text-[10px] capitalize">
                          {a.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-2.5 border-t border-white/8">
                <p className="text-white/20 text-[10px] text-center">
                  {articles.length} articles total
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl glass text-xs">
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"
            style={{ boxShadow: "0 0 6px rgba(74,222,128,0.6)" }}
          />
          <span className="text-white/35">System OK</span>
        </div>
      </div>
    </header>
  );
}

// ─── Notification Toast ───────────────────────────────────────────────────────
function Toast({ notification, onClose }) {
  if (!notification) return null;

  const isSuccess = notification.type === "success";
  return (
    <div
      className={`fixed top-5 right-5 z-[200] flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl border animate-slide-in-right`}
      style={{
        background: isSuccess
          ? "rgba(16,185,129,0.08)"
          : "rgba(239,68,68,0.08)",
        borderColor: isSuccess ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {isSuccess ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
      )}
      <span
        className={`text-sm font-medium ${isSuccess ? "text-emerald-300" : "text-red-300"}`}
      >
        {notification.message}
      </span>
      <button
        onClick={onClose}
        className="ml-1 p-0.5 rounded-lg opacity-50 hover:opacity-100 transition-opacity text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Quick Action FAB ─────────────────────────────────────────────────────────
function QuickActionFAB({ activeTab, onNewArticle, onNewProgram }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col items-end gap-2 animate-slide-in-up">
          {(activeTab === "articles" || activeTab === "overview") && (
            <button
              onClick={() => {
                onNewArticle();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 card-hover"
              style={{
                background: "linear-gradient(135deg, #0EA5E9, #0284c7)",
              }}
            >
              <FileText className="w-4 h-4" /> New Article
            </button>
          )}
          {(activeTab === "training" || activeTab === "overview") && (
            <button
              onClick={() => {
                onNewProgram();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 card-hover"
              style={{
                background: "linear-gradient(135deg, #9333EA, #7c3aed)",
              }}
            >
              <BookOpen className="w-4 h-4" /> New Program
            </button>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl btn-glow transition-all duration-200 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #0EA5E9, #9333EA)",
        }}
      >
        <Plus
          className={`w-5 h-5 text-white transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        />
      </button>
    </div>
  );
}

// ─── Analytics View ───────────────────────────────────────────────────────────
function AnalyticsView({ articles, stats }) {
  const topByViews = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
  const topByLikes = [...articles]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);
  const topByShares = [...articles]
    .sort((a, b) => (b.shares || 0) - (a.shares || 0))
    .slice(0, 5);
  const categoryCount = {};
  articles.forEach((a) => {
    const cat = a.category || "Uncategorized";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  const metricCards = [
    {
      label: "Total Views",
      value: stats.totalViews?.toLocaleString() ?? "0",
      icon: Eye,
      gradient: "from-sky-500 to-cyan-400",
      glow: "rgba(14,165,233,0.25)",
    },
    {
      label: "Total Likes",
      value: stats.totalLikes?.toLocaleString() ?? "0",
      icon: Heart,
      gradient: "from-purple-500 to-pink-500",
      glow: "rgba(147,51,234,0.25)",
    },
    {
      label: "Total Shares",
      value: stats.totalShares?.toLocaleString() ?? "0",
      icon: Share2,
      gradient: "from-blue-500 to-indigo-400",
      glow: "rgba(59,130,246,0.25)",
    },
    {
      label: "Published",
      value: stats.published ?? "0",
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-400",
      glow: "rgba(16,185,129,0.25)",
    },
    {
      label: "Drafts",
      value: stats.drafts ?? "0",
      icon: Activity,
      gradient: "from-amber-500 to-orange-400",
      glow: "rgba(245,158,11,0.25)",
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4">
        {metricCards.map(({ label, value, icon: Icon, gradient, glow }, i) => (
          <div
            key={label}
            className="glass rounded-2xl p-4 sm:p-5 card-hover cursor-default animate-count-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}
                style={{ boxShadow: `0 4px 16px ${glow}` }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/15" />
            </div>
            <div
              className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {value}
            </div>
            <div className="text-white/35 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {[
          {
            title: "Top by Views",
            data: topByViews,
            key: "views",
            gradient: "from-sky-500 to-cyan-400",
            color: "text-sky-400",
          },
          {
            title: "Top by Likes",
            data: topByLikes,
            key: "likes",
            gradient: "from-purple-500 to-pink-500",
            color: "text-purple-400",
          },
          {
            title: "Top by Shares",
            data: topByShares,
            key: "shares",
            gradient: "from-blue-500 to-indigo-400",
            color: "text-blue-400",
          },
        ].map(({ title, data, key, gradient, color }) => (
          <div key={title} className="glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-white/30" />
              <h3 className="text-white/70 text-sm font-semibold">{title}</h3>
            </div>
            <div className="space-y-3">
              {data.length === 0 ? (
                <p className="text-white/20 text-sm text-center py-6">
                  No data yet.
                </p>
              ) : (
                data.map((a, i) => (
                  <div key={a.id} className="flex items-center gap-3">
                    <span className="text-white/15 text-xs font-mono w-4 shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/60 text-xs truncate mb-1">
                        {a.title}
                      </p>
                      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
                          style={{
                            width: `${Math.min(100, ((a[key] || 0) / Math.max(1, data[0]?.[key] || 1)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className={`${color} text-xs font-semibold shrink-0`}>
                      {(a[key] || 0).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        <div className="glass rounded-2xl p-4 sm:p-5 sm:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-4 h-4 text-white/30" />
            <h3 className="text-white/70 text-sm font-semibold">
              Articles by Category
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryCount).map(([cat, count]) => (
              <div
                key={cat}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/4 border border-white/8 hover:border-sky-500/30 transition-all"
              >
                <span className="text-white/50 text-xs">{cat}</span>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-md text-sky-300"
                  style={{ background: "rgba(14,165,233,0.12)" }}
                >
                  {count}
                </span>
              </div>
            ))}
            {Object.keys(categoryCount).length === 0 && (
              <p className="text-white/20 text-sm py-4">No articles yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Client ────────────────────────────────────────────────────
export default function DashboardClient({ user, initialStats }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showTrainingEditor, setShowTrainingEditor] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [notification, setNotification] = useState(null);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const {
    articles,
    isLoading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    togglePublish,
  } = useArticles();

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdPaletteOpen(true);
      }
      if (e.key === "Escape") {
        setCmdPaletteOpen(false);
        setHelpOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
        showNotification("success", "Article updated successfully");
      } else {
        await createArticle(data);
        showNotification("success", "Article created successfully");
      }
      setShowEditor(false);
      setEditingArticle(null);
    } catch (err) {
      showNotification("error", err.message || "Failed to save article");
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
      showNotification("success", "Article deleted");
    } catch (err) {
      showNotification("error", err.message);
    }
  };
  const handleTogglePublish = async (id, publish) => {
    try {
      await togglePublish(id, publish);
      showNotification(
        "success",
        publish ? "Article published!" : "Moved to drafts",
      );
    } catch (err) {
      showNotification("error", err.message);
    }
  };

  const handleCommandNavigate = (cmdId) => {
    if (["overview", "articles", "training", "analytics"].includes(cmdId)) {
      setActiveTab(cmdId);
    } else if (cmdId === "new-article") {
      setEditingArticle(null);
      setShowEditor(true);
      setActiveTab("articles");
    } else if (cmdId === "new-training") {
      setEditingProgram(null);
      setShowTrainingEditor(true);
      setActiveTab("training");
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
          totalShares: articles.reduce((s, a) => s + (a.shares || 0), 0),
        }
      : initialStats;

  return (
    <>
      <OfflineBanner />
      <MeshBackground />

      {/* Layout */}
      <div className="relative z-10 min-h-screen">
        {/* Mobile backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/60 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
          onLogout={handleLogout}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
          isMobile={isMobile}
          onHelp={() => setHelpOpen(true)}
        />

        {/* Content area */}
        <div
          className="flex flex-col min-h-screen transition-all duration-300"
          style={{ marginLeft: isMobile ? 0 : collapsed ? "72px" : "240px" }}
        >
          <TopBar
            activeTab={activeTab}
            onCommandPalette={() => setCmdPaletteOpen(true)}
            stats={stats}
            articles={articles}
            collapsed={collapsed}
            onMobileMenu={() => {
              setMobileSidebarOpen(true);
              setCollapsed(false);
            }}
            isMobile={isMobile}
          />

          <main className="flex-1 pt-16">
            <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto">
              {/* Page header */}
              <div className="flex items-center justify-between mb-8 animate-slide-in-up">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/20 text-xs uppercase tracking-widest">
                      Anoon CMS
                    </span>
                    <span className="text-white/15 text-xs">·</span>
                    <span className="text-sky-400/60 text-xs capitalize">
                      {activeTab}
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-xl">
                    {activeTab === "overview" && (
                      <span>
                        Welcome back{" "}
                        <span className="text-gradient-main">·</span> Here's
                        your overview
                      </span>
                    )}
                    {activeTab === "articles" && `${stats.total || 0} Articles`}
                    {activeTab === "training" && "Training Programs"}
                    {activeTab === "analytics" && "Performance Analytics"}
                    {activeTab === "settings" && "Settings"}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === "articles" && (
                    <button
                      onClick={() => {
                        setEditingArticle(null);
                        setShowEditor(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-glow transition-all hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, #0EA5E9, #9333EA)",
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:block">New Article</span>
                    </button>
                  )}
                  {activeTab === "training" && (
                    <button
                      onClick={() => {
                        setEditingProgram(null);
                        setShowTrainingEditor(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-glow transition-all hover:scale-[1.02]"
                      style={{
                        background: "linear-gradient(135deg, #0EA5E9, #9333EA)",
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:block">New Program</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab content */}
              <div key={activeTab} className="animate-slide-in-up">
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
                {activeTab === "training" && (
                  <TrainingProgramsList
                    onEdit={(program) => {
                      setEditingProgram(program);
                      setShowTrainingEditor(true);
                    }}
                  />
                )}
                {activeTab === "analytics" && (
                  <AnalyticsView articles={articles} stats={stats} />
                )}
                {activeTab === "settings" && (
                  <SettingsView user={user} onLogout={handleLogout} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}

      {/* Overlays */}
      <Toast
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onNavigate={handleCommandNavigate}
      />

      <QuickActionFAB
        activeTab={activeTab}
        onNewArticle={() => {
          setEditingArticle(null);
          setShowEditor(true);
          setActiveTab("articles");
        }}
        onNewProgram={() => {
          setEditingProgram(null);
          setShowTrainingEditor(true);
          setActiveTab("training");
        }}
      />

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
      {showTrainingEditor && (
        <TrainingProgramEditor
          program={editingProgram}
          onSave={() => setShowTrainingEditor(false)}
          onClose={() => {
            setShowTrainingEditor(false);
            setEditingProgram(null);
          }}
        />
      )}
    </>
  );
}
