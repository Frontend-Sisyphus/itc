"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getProjects,
  getTechnologies,
  getUsers,
  getUsersSearch,
} from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";
import { members as mockMembers } from "@/data/members";
import { mapUsersToMembers } from "@/lib/taskmanager/map";

export function useUsersQuery() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: getUsers,
    staleTime: 60_000,
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => getProjects(),
    staleTime: 60_000,
  });
}

export function useTechnologiesQuery() {
  return useQuery({
    queryKey: queryKeys.technologies,
    queryFn: getTechnologies,
    staleTime: 5 * 60_000,
  });
}

export function useUsersSearchQuery(term: string) {
  const normalized = term.trim();
  return useQuery({
    queryKey: queryKeys.usersSearch(normalized),
    queryFn: () => getUsersSearch(normalized),
    enabled: normalized.length >= 2,
    staleTime: 30_000,
  });
}

/** Live members enriched by project membership; falls back to mock data. */
export function useMembersQuery() {
  const usersQuery = useUsersQuery();
  const projectsQuery = useProjectsQuery();

  const isPending = usersQuery.isPending || projectsQuery.isPending;
  const isError = usersQuery.isError;
  const users = usersQuery.data;
  const projects = projectsQuery.data ?? [];

  const members =
    users && users.length > 0
      ? mapUsersToMembers(users, projects)
      : isPending
        ? []
        : mockMembers;

  return {
    members,
    projects: projectsQuery.data ?? [],
    isPending,
    isError,
    isFallback: !isPending && (!users || users.length === 0),
    error: usersQuery.error ?? projectsQuery.error,
    refetch: async () => {
      await Promise.all([usersQuery.refetch(), projectsQuery.refetch()]);
    },
  };
}

export function useMemberSearchQuery(term: string) {
  const searchQuery = useUsersSearchQuery(term);
  const projectsQuery = useProjectsQuery();

  const projects = projectsQuery.data ?? [];
  const members =
    searchQuery.data && searchQuery.data.length >= 0
      ? mapUsersToMembers(searchQuery.data, projects)
      : [];

  return {
    members,
    isPending: searchQuery.isPending && term.trim().length >= 2,
    isFetching: searchQuery.isFetching,
    isError: searchQuery.isError,
    error: searchQuery.error,
  };
}
