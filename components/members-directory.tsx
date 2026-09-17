"use client";

import { MemberCard } from "@/components/member-card";
import { JoinButton } from "@/components/primary-button";
import { useMemberSearchQuery, useMembersQuery } from "@/lib/api/hooks";
import { tracks, type TrackId } from "@/lib/data";
import { pluralize, peopleInTrackLabel } from "@/lib/pluralize";
import { useDeferredValue, useMemo, useState } from "react";

type RoleFilter = "all" | "руководитель" | "участник";
type TrackFilter = "all" | TrackId;

const trackFilters: { id: TrackFilter; label: string }[] = [
  { id: "all", label: "Все треки" },
  { id: "hackathons", label: "Хакатоны" },
  { id: "olympiads", label: "Олимпиады" },
  { id: "grants", label: "Гранты" },
];

const roleFilters: { id: RoleFilter; label: string }[] = [
  { id: "all", label: "Весь состав" },
  { id: "руководитель", label: "Руководители" },
  { id: "участник", label: "Участники" },
];

const chipBase =
  "cursor-pointer rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition duration-200 active:scale-[0.96]";

export function MembersDirectory() {
  const [track, setTrack] = useState<TrackFilter>("all");
  const [role, setRole] = useState<RoleFilter>("all");
  const [tech, setTech] = useState<string>("all");
  const [search, setSearch] = useState("");
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
          (item) => item.toLowerCase() === tech.toLowerCase(),
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
    (member) => member.role === "руководитель",
  );
  const filteredRest = filtered.filter((member) => member.role === "участник");

  function countByTrack(id: TrackId) {
    return allMembers.filter((member) => member.track === id).length;
  }

  const loading =
    isPending || (searchActive && searchQuery.isPending && members.length === 0);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/6 bg-bg-soft">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(58,214,224,0.08),transparent_42%)]" />
        <div className="container-page relative py-12 md:py-16">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
            // команда
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
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Поиск по имени или username"
                  className="w-full rounded-full border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm text-cream outline-none transition placeholder:text-white/30 focus:border-accent/40"
                />
              </label>
              {isError || isFallback ? (
                <p className="mt-3 text-[13px] text-white/45">
                  {isError
                    ? "Не удалось загрузить API — показан локальный состав."
                    : null}
                  {isFallback && !isError
                    ? "API пуст или недоступен — показан локальный состав."
                    : null}{" "}
                  <button
                    type="button"
                    onClick={() => void refetch()}
                    className="cursor-pointer text-accent underline-offset-2 hover:underline"
                  >
                    Обновить
                  </button>
                </p>
              ) : null}
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {(Object.keys(tracks) as TrackId[]).map((id) => {
                const count = countByTrack(id);
                const active = track === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTrack(id)}
                    className={`cursor-pointer rounded-[20px] border px-3 py-4 text-left transition duration-200 active:scale-[0.97] ${
                      active
                        ? "border-accent/40 bg-accent/10 shadow-[0_0_0_1px_rgba(58,214,224,0.15)]"
                        : "border-white/8 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
                    }`}
                  >
                    <p className="font-display text-[28px] font-semibold leading-none text-accent sm:text-[32px]">
                      {loading ? "—" : count}
                    </p>
                    <p className="mt-2 text-[12px] leading-snug text-muted">
                      {peopleInTrackLabel(id, count)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-b border-white/6 bg-[#070a10]/88 backdrop-blur-xl">
        <div className="container-page flex flex-col gap-3 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {trackFilters.map((item) => {
                const active = track === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTrack(item.id)}
                    className={`${chipBase} ${
                      active
                        ? "border-accent/50 bg-accent/15 text-accent shadow-[0_0_0_1px_rgba(58,214,224,0.2)]"
                        : "border-white/10 text-white/55 hover:border-white/25 hover:bg-white/[0.04] hover:text-cream"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {roleFilters.map((item) => {
                const active = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`${chipBase} ${
                      active
                        ? "border-white/30 bg-white/12 text-cream"
                        : "border-white/10 text-white/45 hover:border-white/22 hover:bg-white/[0.04] hover:text-cream"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          {techOptions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTech("all")}
                className={`${chipBase} ${
                  tech === "all"
                    ? "border-white/30 bg-white/12 text-cream"
                    : "border-white/10 text-white/45 hover:border-white/22 hover:bg-white/[0.04] hover:text-cream"
                }`}
              >
                Все технологии
              </button>
              {techOptions.map((item) => {
                const active = tech === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTech(item)}
                    className={`${chipBase} ${
                      active
                        ? "border-accent/50 bg-accent/15 text-accent"
                        : "border-white/10 text-white/45 hover:border-white/22 hover:bg-white/[0.04] hover:text-cream"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      <section className="container-page py-10 md:py-14">
        <div className="flex flex-col gap-2 border-b border-white/6 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-white/35">
              // каталог
            </p>
            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">
              {track === "all" ? "Все направления" : tracks[track].label}
            </h2>
          </div>
          <p className="text-[13px] text-muted">
            Найдено:{" "}
            <span className="text-cream">
              {filtered.length}{" "}
              {pluralize(filtered.length, "человек", "человека", "человек")}
            </span>{" "}
            из {members.length}
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-[108px] animate-pulse rounded-[22px] bg-white/[0.04]"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-6 py-16 text-center">
            <p className="text-lg font-semibold">Никого не нашли</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Сбросьте фильтры или измените запрос — в составе есть участники
              по всем направлениям.
            </p>
            <button
              type="button"
              onClick={() => {
                setTrack("all");
                setRole("all");
                setTech("all");
                setSearch("");
              }}
              className="mt-5 inline-flex cursor-pointer rounded-full border border-white/12 px-4 py-2 text-sm font-bold text-cream transition duration-200 hover:border-white/30 hover:bg-white/[0.05] active:scale-[0.97] active:bg-white/[0.08]"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            {role !== "участник" && filteredLeaders.length > 0 ? (
              <div>
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <h3 className="text-[15px] font-medium tracking-[0.04em] text-white/70 uppercase">
                    Руководители
                  </h3>
                  <span className="text-[13px] text-muted">
                    {filteredLeaders.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filteredLeaders.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            ) : null}

            {role !== "руководитель" && filteredRest.length > 0 ? (
              <div>
                <div className="mb-6 flex items-baseline justify-between gap-4">
                  <h3 className="text-[15px] font-medium tracking-[0.04em] text-white/70 uppercase">
                    Участники
                  </h3>
                  <span className="text-[13px] text-muted">
                    {filteredRest.length}
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

        <div className="mt-16 overflow-hidden rounded-[28px] border border-white/8 bg-bg-soft">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-[12px] uppercase tracking-[0.16em] text-white/35">
                // вступить
              </p>
              <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em]">
                Хотите в состав?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                Короткое интервью и тестовое задание по треку — дальше общий чат
                и ближайший разбор. Можно выбрать один трек или сразу несколько.
              </p>
            </div>
            <JoinButton>Подать заявку</JoinButton>
          </div>
        </div>
      </section>
    </div>
  );
}
