"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { cacheManager } from "@/lib/cacheManager";
import { idb, IDB_STORES } from "@/lib/idb";

const LS_KEY = "articles_list";

async function fetchArticles() {
  const res = await fetch("/api/admin/articles");
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  // Persist to IDB for offline access (fire-and-forget)
  idb.putMany(IDB_STORES.ARTICLES, json.articles).catch(() => {});
  // Update localStorage stale cache
  cacheManager.set(LS_KEY, json.articles, cacheManager.TTL.DYNAMIC);
  return json.articles;
}

export function useArticles() {
  const queryClient = useQueryClient();

  // ── Query ────────────────────────────────────────────────────────────────
  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.articles.lists(),
    queryFn: fetchArticles,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    // Show stale localStorage data immediately while re-fetching
    placeholderData: () => cacheManager.get(LS_KEY) ?? [],
  });

  // ── Create ───────────────────────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: async (input) => {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  // ── Update (optimistic) ──────────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...input }) => {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.article;
    },
    onMutate: async ({ id, ...newData }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.articles.lists() });
      const previous = queryClient.getQueryData(queryKeys.articles.lists());
      queryClient.setQueryData(queryKeys.articles.lists(), (old = []) =>
        old.map((a) => (a.id === id ? { ...a, ...newData } : a)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(queryKeys.articles.lists(), ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  // ── Delete (optimistic) ──────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.articles.lists() });
      const previous = queryClient.getQueryData(queryKeys.articles.lists());
      queryClient.setQueryData(queryKeys.articles.lists(), (old = []) =>
        old.filter((a) => a.id !== id),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(queryKeys.articles.lists(), ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  // ── Toggle publish (optimistic) ──────────────────────────────────────────
  const toggleMutation = useMutation({
    mutationFn: async ({ id, publish }) => {
      const res = await fetch(`/api/admin/articles/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.article;
    },
    onMutate: async ({ id, publish }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.articles.lists() });
      const previous = queryClient.getQueryData(queryKeys.articles.lists());
      queryClient.setQueryData(queryKeys.articles.lists(), (old = []) =>
        old.map((a) =>
          a.id === id ? { ...a, status: publish ? "published" : "draft" } : a,
        ),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(queryKeys.articles.lists(), ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  return {
    articles,
    isLoading,
    error: error?.message ?? null,
    refetch: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all }),
    createArticle: (input) => createMutation.mutateAsync(input),
    updateArticle: (id, input) => updateMutation.mutateAsync({ id, ...input }),
    deleteArticle: (id) => deleteMutation.mutateAsync(id),
    togglePublish: (id, publish) => toggleMutation.mutateAsync({ id, publish }),
  };
}
