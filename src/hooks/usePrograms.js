"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { cacheManager } from "@/lib/cacheManager";
import { idb, IDB_STORES } from "@/lib/idb";

const LS_KEY = "programs_list";

async function fetchPrograms() {
  const res = await fetch("/api/admin/training-programs");
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  idb.putMany(IDB_STORES.PROGRAMS, json.programs).catch(() => {});
  cacheManager.set(LS_KEY, json.programs, cacheManager.TTL.DYNAMIC);
  return json.programs;
}

export function usePrograms() {
  const queryClient = useQueryClient();

  const {
    data: programs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.programs.lists(),
    queryFn: fetchPrograms,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: () => cacheManager.get(LS_KEY) ?? [],
  });

  const createMutation = useMutation({
    mutationFn: async (input) => {
      const res = await fetch("/api/admin/training-programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.program;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...input }) => {
      const res = await fetch(`/api/admin/training-programs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.program;
    },
    onMutate: async ({ id, ...newData }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.programs.lists() });
      const previous = queryClient.getQueryData(queryKeys.programs.lists());
      queryClient.setQueryData(queryKeys.programs.lists(), (old = []) =>
        old.map((p) => (p.id === id ? { ...p, ...newData } : p)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(queryKeys.programs.lists(), ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/admin/training-programs/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.programs.lists() });
      const previous = queryClient.getQueryData(queryKeys.programs.lists());
      queryClient.setQueryData(queryKeys.programs.lists(), (old = []) =>
        old.filter((p) => p.id !== id),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(queryKeys.programs.lists(), ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all });
      cacheManager.invalidate(LS_KEY);
    },
  });

  return {
    programs,
    isLoading,
    error: error?.message ?? null,
    refetch: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.programs.all }),
    createProgram: (input) => createMutation.mutateAsync(input),
    updateProgram: (id, input) => updateMutation.mutateAsync({ id, ...input }),
    deleteProgram: (id) => deleteMutation.mutateAsync(id),
  };
}
