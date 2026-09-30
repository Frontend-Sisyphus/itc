export type TrackId = "hackathons" | "olympiads" | "grants";

export interface TrackInfo {
  id: TrackId;
  label: string;
  tag: string;
  color: "cyan" | "violet" | "green";
}

export const tracks: Record<TrackId, TrackInfo> = {
  hackathons: {
    id: "hackathons",
    label: "Хакатоны",
    tag: "хакатоны",
    color: "cyan",
  },
  olympiads: {
    id: "olympiads",
    label: "Олимпиады",
    tag: "олимпиады",
    color: "violet",
  },
  grants: {
    id: "grants",
    label: "Гранты",
    tag: "гранты",
    color: "green",
  },
};
