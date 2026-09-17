/** Russian plural forms: one / few / many */
export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string,
) {
  const abs = Math.abs(count) % 100;
  const last = abs % 10;

  if (abs > 10 && abs < 20) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
}

export const trackIn = {
  hackathons: "в хакатонах",
  olympiads: "в олимпиадах",
  grants: "в грантах",
} as const;

export function peopleInTrackLabel(
  track: keyof typeof trackIn,
  count: number,
) {
  const people = pluralize(count, "человек", "человека", "человек");
  return `${people} ${trackIn[track]}`;
}
