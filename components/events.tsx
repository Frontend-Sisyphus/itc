"use client";

import { eventBoard, type TrackId } from "@/lib/data";
import { useMemo, useState } from "react";

const TRACK_ORDER: TrackId[] = ["grants", "olympiads", "hackathons"];

const centerStyles: Record<TrackId, string> = {
  grants:
    "border-green/40 bg-[linear-gradient(165deg,#1f5544_0%,#123028_52%,#0e1a16_100%)] shadow-[0_28px_70px_rgba(61,214,165,0.3)]",
  olympiads:
    "border-violet/40 bg-[linear-gradient(165deg,#4a3a86_0%,#2a2150_48%,#18132c_100%)] shadow-[0_28px_70px_rgba(139,124,255,0.34)]",
  hackathons:
    "border-accent/40 bg-[linear-gradient(165deg,#1a5560_0%,#123840_50%,#0e1a1e_100%)] shadow-[0_28px_70px_rgba(58,214,224,0.3)]",
};

function GrantIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-[67px] w-[67px] sm:h-[82px] sm:w-[82px] ${active ? "text-white/90" : "text-white/35"}`}
      fill="none"
    >
      <path
        d="M32 8c6 10 8 16 8 22a8 8 0 1 1-16 0c0-6 2-12 8-22Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M24 46c2.5-6 5.5-9 8-9s5.5 3 8 9"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M20 52h24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function OlympiadIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-[67px] w-[67px] sm:h-[82px] sm:w-[82px] ${active ? "text-white/95" : "text-white/35"}`}
      fill="none"
    >
      <path d="M18 46 L32 16 L46 46 Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M22 46h20" stroke="currentColor" strokeWidth="1.6" />
      <path d="M40 16h8v8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M26 34h12" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

function HackathonIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-[67px] w-[67px] sm:h-[82px] sm:w-[82px] ${active ? "text-white/95" : "text-white/35"}`}
      fill="none"
    >
      <path
        d="M34 10 L20 34h12l-4 20 18-28H34l4-16Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons = {
  grants: GrantIcon,
  olympiads: OlympiadIcon,
  hackathons: HackathonIcon,
};

export function Events() {
  const [active, setActive] = useState<TrackId>("olympiads");

  const order = useMemo(() => {
    const idx = TRACK_ORDER.indexOf(active);
    return [
      TRACK_ORDER[(idx + 2) % 3],
      TRACK_ORDER[idx],
      TRACK_ORDER[(idx + 1) % 3],
    ];
  }, [active]);

  const current = eventBoard.find((item) => item.id === active)!;

  return (
    <section id="events" className="overflow-x-clip pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
              // доска событий
            </p>
            <h2 className="font-display mt-3 text-[32px] font-semibold tracking-[-0.04em] sm:text-[44px]">
              Где мы участвовали
            </h2>
          </div>
          <p className="max-w-[340px] text-[14px] leading-6 text-muted md:text-right">
            Кликни по боковой карточке — она встанет в центр. Кликни по
            центральной — откроются подробности.
          </p>
        </div>

        <div className="relative mx-auto mt-12 flex h-[360px] max-w-[936px] items-center justify-center sm:mt-16 sm:h-[456px]">
          <div className={`events-glow events-glow--${active}`} />

          {order.map((id, index) => {
            const item = eventBoard.find((entry) => entry.id === id)!;
            const Icon = icons[id];
            const isCenter = index === 1;
            const sideClass =
              index === 0
                ? "z-[5] -translate-x-[54%] rotate-[-10deg] scale-[0.82] sm:-translate-x-[58%]"
                : index === 2
                  ? "z-[5] translate-x-[54%] rotate-[10deg] scale-[0.82] sm:translate-x-[58%]"
                  : "z-20 scale-100";

            return (
              <button
                key={id}
                type="button"
                aria-pressed={isCenter}
                aria-label={item.title}
                onClick={() => setActive(id)}
                className={`events-card absolute flex h-[306px] w-[246px] cursor-pointer flex-col rounded-[34px] border p-6 text-left transition duration-500 sm:h-[372px] sm:w-[306px] sm:p-7 ${
                  isCenter
                    ? `${centerStyles[id]}`
                    : "border-white/8 bg-[#151a22]/95 opacity-80 hover:opacity-95"
                } ${sideClass}`}
              >
                <div className="flex flex-1 items-center justify-center">
                  <Icon active={isCenter} />
                </div>
                <div className="flex items-end justify-between gap-3">
                  <p
                    className={`text-[11px] uppercase tracking-[0.16em] sm:text-[12px] ${
                      isCenter ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    {item.title}
                  </p>
                  {isCenter ? (
                    <span className="shrink-0 text-[13px] text-white/70">
                      Подробнее →
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-[560px] text-center sm:mt-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
            {current.kicker}
          </p>
          <h3 className="mt-3 text-[22px] font-semibold sm:text-[24px]">
            {current.heading}
          </h3>
          <p className="mt-3 text-[14px] leading-7 text-muted">{current.text}</p>
          <div className="mt-6 flex justify-center gap-2.5">
            {TRACK_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                aria-label={eventBoard.find((item) => item.id === id)!.title}
                onClick={() => setActive(id)}
                className={`h-2 cursor-pointer rounded-full transition duration-300 active:scale-90 ${
                  active === id
                    ? "w-6 bg-cream"
                    : "w-2 bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
