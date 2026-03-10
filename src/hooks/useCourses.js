"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { idb, IDB_STORES } from "@/lib/idb";

export function useCourses(programId) {
  const queryClient = useQueryClient();

  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.programs.courses(programId),
    queryFn: async () => {
      const res = await fetch(`/api/admin/courses?program_id=${programId}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      idb.putMany(IDB_STORES.COURSES, json.courses).catch(() => {});
      return json.courses;
    },
    enabled: !!programId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.programs.courses(programId),
    });

  const createMutation = useMutation({
    mutationFn: async (input) => {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, program_id: programId }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.course;
    },
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...input }) => {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.course;
    },
    onMutate: async ({ id, ...newData }) => {
      const key = queryKeys.programs.courses(programId);
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, (old = []) =>
        old.map((c) => (c.id === id ? { ...c, ...newData } : c)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(
          queryKeys.programs.courses(programId),
          ctx.previous,
        );
    },
    onSettled: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
    },
    onMutate: async (id) => {
      const key = queryKeys.programs.courses(programId);
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, (old = []) =>
        old.filter((c) => c.id !== id),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(
          queryKeys.programs.courses(programId),
          ctx.previous,
        );
    },
    onSettled: invalidate,
  });

  return {
    courses,
    isLoading,
    error: error?.message ?? null,
    createCourse: (input) => createMutation.mutateAsync(input),
    updateCourse: (id, input) => updateMutation.mutateAsync({ id, ...input }),
    deleteCourse: (id) => deleteMutation.mutateAsync(id),
  };
}
