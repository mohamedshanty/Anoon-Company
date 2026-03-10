"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/i18n.client";

// ─── QueryClient factory ──────────────────────────────────────────────────────
// One client per browser tab; Next.js SSR gets its own per-request instance.
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes – no refetch during that window
        staleTime: 5 * 60 * 1000,
        // Keep unused cache for 30 minutes before garbage-collecting
        gcTime: 30 * 60 * 1000,
        // Retry twice with exponential back-off (max 30 s)
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
        // Re-fetch when the user switches back to the tab or reconnects
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
    // Always create a new client on the server
    return makeQueryClient();
  }
  // Reuse the same client across renders in the browser
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

// ─── QueryProvider ────────────────────────────────────────────────────────────
export function QueryProvider({ children }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
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
