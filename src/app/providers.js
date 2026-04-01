"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import "@/i18n.client";

// ── Lazy-load devtools — only imported in development ─────────────────────────
const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () =>
          import("@tanstack/react-query-devtools").then(
            (mod) => mod.ReactQueryDevtools
          ),
        { ssr: false }
      )
    : () => null;

// ─── QueryClient factory ──────────────────────────────────────────────────────
// One client per browser tab; Next.js SSR gets its own per-request instance.
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

let browserQueryClient = null;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

// ─── QueryProvider ────────────────────────────────────────────────────────────
export function QueryProvider({ children }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

// ─── I18nProvider ─────────────────────────────────────────────────────────────
export function I18nProvider({ children }) {
  const { i18n, ready } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  if (!ready) {
    return null;
  }

  return children;
}

// ─── Combined root provider ───────────────────────────────────────────────────
export function AppProviders({ children }) {
  return (
    <QueryProvider>
      <I18nProvider>{children}</I18nProvider>
    </QueryProvider>
  );
}
