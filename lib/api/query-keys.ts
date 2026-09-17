export const queryKeys = {
  users: ["users"] as const,
  usersSearch: (term: string) => ["users", "search", term] as const,
  technologies: ["technologies"] as const,
  projects: ["projects"] as const,
  projectsByUsername: (username: string) =>
    ["projects", "username", username] as const,
  project: (id: number) => ["projects", id] as const,
};
