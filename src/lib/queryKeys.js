/**
 * Centralised query key factory.
 * All React Query cache keys must come from here to ensure
 * consistent cache invalidation across the entire app.
 */
export const queryKeys = {
  articles: {
    all: ["articles"],
    lists: () => [...queryKeys.articles.all, "list"],
    list: (filters) => [...queryKeys.articles.lists(), { filters }],
    details: () => [...queryKeys.articles.all, "detail"],
    detail: (id) => [...queryKeys.articles.details(), id],
  },
  programs: {
    all: ["programs"],
    lists: () => [...queryKeys.programs.all, "list"],
    detail: (id) => [...queryKeys.programs.all, "detail", id],
    courses: (programId) => [...queryKeys.programs.all, "courses", programId],
  },
  courses: {
    all: ["courses"],
    byProgram: (programId) => [
      ...queryKeys.courses.all,
      "by-program",
      programId,
    ],
  },
  stats: {
    all: ["stats"],
    dashboard: () => [...queryKeys.stats.all, "dashboard"],
  },
};
