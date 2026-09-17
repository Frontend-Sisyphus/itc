import type {
  ApiProject,
  ApiTechnologyCatalog,
  ApiUser,
} from "@/lib/taskmanager/types";

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(payload?.error ?? `Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function getUsers() {
  return readJson<ApiUser[]>(await fetch("/api/users"));
}

export async function getUsersSearch(term: string) {
  const query = new URLSearchParams({ term });
  return readJson<ApiUser[]>(await fetch(`/api/users/search?${query}`));
}

export async function getTechnologies() {
  return readJson<ApiTechnologyCatalog>(await fetch("/api/technologies"));
}

export async function getProjects(params?: { id?: number; username?: string }) {
  const query = new URLSearchParams();
  if (params?.id != null) query.set("id", String(params.id));
  if (params?.username) query.set("username", params.username);
  const suffix = query.size > 0 ? `?${query}` : "";
  return readJson<ApiProject[]>(await fetch(`/api/projects${suffix}`));
}

export async function getProject(id: number) {
  return readJson<ApiProject>(await fetch(`/api/projects/${id}`));
}
