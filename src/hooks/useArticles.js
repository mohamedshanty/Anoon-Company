"use client";
import { useState, useEffect, useCallback } from "react";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/articles");
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setArticles(json.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const createArticle = useCallback(
    async (input) => {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      await fetchArticles();
      return json.article;
    },
    [fetchArticles],
  );

  const updateArticle = useCallback(
    async (id, input) => {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      await fetchArticles();
      return json.article;
    },
    [fetchArticles],
  );

  const deleteArticle = useCallback(
    async (id) => {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      await fetchArticles();
    },
    [fetchArticles],
  );

  const togglePublish = useCallback(
    async (id, publish) => {
      const res = await fetch(`/api/admin/articles/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      await fetchArticles();
      return json.article;
    },
    [fetchArticles],
  );

  return {
    articles,
    isLoading,
    error,
    refetch: fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    togglePublish,
  };
}
