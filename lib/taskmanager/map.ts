import type { Member, TrackId } from "@/lib/data";
import type { ApiProject, ApiUser } from "@/lib/taskmanager/types";

const TRACKS: TrackId[] = ["hackathons", "olympiads", "grants"];

const toneByTrack: Record<TrackId, Member["tone"]> = {
  hackathons: "cyan",
  olympiads: "violet",
  grants: "green",
};

function initialsFrom(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 0) return "?";
  return parts.map((part) => part[0]!.toUpperCase()).join("");
}

function inferRole(user: ApiUser, projectRoles: string[]): Member["role"] {
  const candidates = [user.role, ...projectRoles].filter(Boolean) as string[];
  const joined = candidates.join(" ").toLowerCase();
  if (
    /админ|руковод|организ|lead|owner|admin|тимлид|team\s*lead|куратор|ментор/.test(
      joined,
    )
  ) {
    return "руководитель";
  }
  return "участник";
}

function displayName(user: ApiUser) {
  if (user.full_name?.trim()) {
    const parts = user.full_name.trim().split(/\s+/).filter(Boolean);
    // "Фамилия Имя Отчество" → "Имя Фамилия"
    if (parts.length >= 2) return `${parts[1]} ${parts[0]}`;
    return user.full_name.trim();
  }
  const full = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  if (full) return full;
  if (user.username) return user.username;
  if (user.telegram_id) return `tg:${user.telegram_id}`;
  return "Участник";
}

function userKey(user: ApiUser, index: number) {
  if (user.id != null) return String(user.id);
  if (user.telegram_id) return `tg-${user.telegram_id}`;
  if (user.username) return `u-${user.username.toLowerCase()}`;
  return `idx-${index}`;
}

function inferTrack(
  user: ApiUser,
  projectTypes: string[],
  index: number,
): TrackId {
  const haystack = [
    ...(user.technologies ?? []),
    ...projectTypes,
  ]
    .join(" ")
    .toLowerCase();

  if (/hack|хакат/.test(haystack)) return "hackathons";
  if (/olymp|олимп|math|алго/.test(haystack)) return "olympiads";
  if (/grant|грант/.test(haystack)) return "grants";

  return TRACKS[index % TRACKS.length]!;
}

function membershipIndex(projects: ApiProject[]) {
  const byUsername = new Map<string, { roles: string[]; types: string[] }>();

  for (const project of projects) {
    for (const member of project.members ?? []) {
      const key = member.username?.trim().toLowerCase();
      if (!key) continue;
      const entry = byUsername.get(key) ?? { roles: [], types: [] };
      if (member.role) entry.roles.push(member.role);
      if (project.project_type) entry.types.push(project.project_type);
      byUsername.set(key, entry);
    }
  }

  return byUsername;
}

export function mapUsersToMembers(
  users: ApiUser[],
  projects: ApiProject[] = [],
): Member[] {
  const membership = membershipIndex(projects);

  const mapped = users.map((user, index) => {
    const name = displayName(user);
    const username = user.username?.trim().toLowerCase() ?? "";
    const meta = username ? membership.get(username) : undefined;
    const track = inferTrack(user, meta?.types ?? [], index);
    const role = inferRole(user, meta?.roles ?? []);
    const tone =
      track === "hackathons" && index % 2 === 1 ? "blue" : toneByTrack[track];

    return {
      id: userKey(user, index),
      initials: initialsFrom(name),
      name,
      role,
      track,
      tone,
      photoUrl: user.photo_url ?? null,
      username: user.username ?? undefined,
      technologies: user.technologies ?? [],
    };
  });

  return mapped.sort(compareMembers);
}

/** Никита Слободенюк → Иван Абутков → остальные руководители → участники */
const LEADER_ORDER = ["wszug", "ivan_abutkov"];

function memberRank(member: Member) {
  const username = member.username?.trim().toLowerCase() ?? "";
  const pinned = LEADER_ORDER.indexOf(username);
  if (pinned !== -1) return pinned;
  if (member.role === "руководитель") return LEADER_ORDER.length;
  return LEADER_ORDER.length + 1;
}

export function compareMembers(a: Member, b: Member) {
  const rankDiff = memberRank(a) - memberRank(b);
  if (rankDiff !== 0) return rankDiff;
  return a.name.localeCompare(b.name, "ru");
}

export function flattenProjectStack(stack?: Record<string, string[]>) {
  if (!stack) return [] as string[];
  return Object.values(stack).flat().filter(Boolean);
}
