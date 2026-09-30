"use client";
import React, { useDeferredValue, useMemo, useState } from "react";

import { useMemberSearchQuery, useMembersQuery } from "@/lib/api/hooks";
import { tracks, TrackId } from "@/data/tracks";
import { peopleInTrackLabel } from "@/utils/pluralize";
import { MemberCard } from "@/entities/MemberCard";
import { JoinButton } from "@/shared/PrimaryButton";

type RoleFilter = "all" | "руководитель" | "участник";
type TrackFilter = "all" | TrackId;

interface TrackFilterOption {
  id: TrackFilter;
  label: string;
}

interface RoleFilterOption {
  id: RoleFilter;
  label: string;
}

const trackFilters: TrackFilterOption[] = [
  { id: "all", label: "Все треки" },
  { id: "hackathons", label: "Хакатоны" },
  { id: "olympiads", label: "Олимпиады" },
  { id: "grants", label: "Гранты" },
];

const roleFilters: RoleFilterOption[] = [
  { id: "all", label: "Весь состав" },
  { id: "руководитель", label: "Руководители" },
  { id: "участник", label: "Участники" },
];

const chipBase =
  "cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition duration-200 active:scale-[0.96]";

export const MembersDirectory: React.FC = () => {
  const [track, setTrack] = useState<TrackFilter>("all");
  const [role, setRole] = useState<RoleFilter>("all");
  const [tech, setTech] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search.trim());

  const { members: allMembers, isPending, isFallback, isError, refetch } =
    useMembersQuery();
  const searchActive = deferredSearch.length >= 2;
  const searchQuery = useMemberSearchQuery(deferredSearch);

  const members = searchActive ? searchQuery.members : allMembers;

  const filtered = useMemo(() => {
    return members.filter((member) => {
      const trackOk = track === "all" || member.track === track;
      const roleOk = role === "all" || member.role === role;
      const techOk =
        tech === "all" ||
        (member.technologies ?? []).some(
          (item) => item.toLowerCase() === tech.toLowerCase()
        );
      return trackOk && roleOk && techOk;
    });
  }, [members, track, role, tech]);

  const techOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const member of allMembers) {
      for (const item of member.technologies ?? []) {
        counts.set(item, (counts.get(item) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ru"))
      .slice(0, 12)
      .map(([label]) => label);
  }, [allMembers]);

  const filteredLeaders = filtered.filter(
    (member) => member.role === "руководитель"
  );
  const filteredRest = filtered.filter((member) => member.role === "участник");

  const countByTrack = (id: TrackId): number => {
    return allMembers.filter((member) => member.track === id).length;
  };

  const loading =
    isPending || (searchActive && searchQuery.isPending && members.length === 0);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/6 bg-bg-soft">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(58,214,224,0.08),transparent_42%)]" />
        <div className="container-page relative py-12 md:py-16">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
            {"// команда"}
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
            <div>
              <h1 className="font-display text-[40px] font-semibold tracking-[-0.04em] sm:text-[56px]">
                Участники
              </h1>
              <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-muted">
                Один состав, три трека. Данные подтягиваются из TaskManager —
                поиск по имени и username, фильтры по ролям и направлениям.
              </p>
              <label className="mt-6 block max-w-md">
                <span className="sr-only">Поиск участников</span>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по имени или @username…"
                  className="w-full rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-cream placeholder-white/30 focus:border-accent focus:outline-none"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(tracks) as TrackId[]).map((id) => (
                <div
                  key={id}
                  className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4 text-center"
                >
                  <p className="font-display text-2xl font-semibold text-accent sm:text-3xl">
                    {countByTrack(id)}
                  </p>
                  <p className="mt-1 text-xs text-muted">{tracks[id].label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-col gap-4 border-b border-white/6 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs uppercase tracking-wider text-white/40">
              Трек:
            </span>
            {trackFilters.map((item) => {
              const active = track === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTrack(item.id)}
                  className={`${chipBase} ${
                    active
                      ? "border-accent bg-accent text-[#07343a]"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs uppercase tracking-wider text-white/40">
              Роль:
            </span>
            {roleFilters.map((item) => {
              const active = role === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id)}
                  className={`${chipBase} ${
                    active
                      ? "border-white/30 bg-white/15 text-cream"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {techOptions.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="mr-2 text-xs uppercase tracking-wider text-white/40">
                Стек:
              </span>
              <button
                type="button"
                onClick={() => setTech("all")}
                className={`${chipBase} ${
                  tech === "all"
                    ? "border-white/30 bg-white/15 text-cream"
                    : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                }`}
              >
                Все технологии
              </button>
              {techOptions.map((item) => {
                const active = tech.toLowerCase() === item.toLowerCase();
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTech(active ? "all" : item)}
                    className={`${chipBase} text-xs ${
                      active
                        ? "border-accent/60 bg-accent/20 text-accent"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {isFallback ? (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs text-amber-200/90">
            TaskManager недоступен — показан локальный состав участников.
          </div>
        ) : null}

        {isError && !isFallback ? (
          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-6 text-center">
            <p className="text-sm text-red-200">
              Не удалось загрузить данные из TaskManager
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 text-xs text-accent underline hover:no-underline"
            >
              Попробовать снова
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="h-[140px] animate-pulse rounded-[22px] bg-white/[0.04]"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <p className="text-lg">Никого не найдено</p>
            <p className="mt-1 text-sm text-white/40">
              Попробуйте сбросить фильтры или изменить поисковый запрос
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredLeaders.length > 0 ? (
              <div className="mt-10">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tight text-cream">
                    Руководители направлений
                  </h2>
                  <span className="text-xs text-muted">
                    {peopleInTrackLabel(filteredLeaders.length)}
                  </span>
                </div>
                <div className="grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredLeaders.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            ) : null}

            {filteredRest.length > 0 ? (
              <div className="mt-10">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold tracking-tight text-cream">
                    Участники
                  </h2>
                  <span className="text-xs text-muted">
                    {peopleInTrackLabel(filteredRest.length)}
                  </span>
                </div>
                <div className="grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredRest.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-16 rounded-[28px] border border-white/8 bg-[#0d121a] p-8 text-center sm:p-10">
          <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
            Хотите присоединиться к нашей команде?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Мы всегда рады новым участникам. Отправьте заявку, и мы свяжемся с
            вами в Telegram.
          </p>
          <div className="mt-6">
            <JoinButton>Подать заявку</JoinButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembersDirectory;
