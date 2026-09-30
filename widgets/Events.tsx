"use client";
import React, { useMemo, useState } from "react";

import { eventBoard } from "@/data/eventBoard";
import { TrackId } from "@/data/tracks";

const TRACK_ORDER: TrackId[] = ["grants", "olympiads", "hackathons"];

const centerStyles: Record<TrackId, string> = {
  grants:
    "border-green/40 bg-[linear-gradient(165deg,#1f5544_0%,#123028_52%,#0e1a16_100%)] shadow-[0_28px_70px_rgba(61,214,165,0.3)]",
  olympiads:
    "border-violet/40 bg-[linear-gradient(165deg,#4a3a86_0%,#2a2150_48%,#18132c_100%)] shadow-[0_28px_70px_rgba(139,124,255,0.34)]",
  hackathons:
    "border-accent/40 bg-[linear-gradient(165deg,#1a5560_0%,#123840_50%,#0e1a1e_100%)] shadow-[0_28px_70px_rgba(58,214,224,0.3)]",
};

interface IconProps {
  active?: boolean;
}

const GrantIcon: React.FC<IconProps> = ({ active }) => (
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

const OlympiadIcon: React.FC<IconProps> = ({ active }) => (
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

const HackathonIcon: React.FC<IconProps> = ({ active }) => (
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

const icons = {
  grants: GrantIcon,
  olympiads: OlympiadIcon,
  hackathons: HackathonIcon,
};

export const Events: React.FC = () => {
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
              {"// доска событий"}
            </p>
            <h2 className="font-display mt-3 text-[32px] font-semibold tracking-[-0.04em] sm:text-[44px]">
              Где мы участвовали
            </h2>
          </div>
          <p className="max-w-[340px] text-[14px] leading-6 text-muted md:text-right">
            Кликните на карточку сбоку, чтобы переключить фокус на нужный трек.
          </p>
        </div>

        <div className="relative mt-8 flex min-h-[300px] items-center justify-center py-4 md:mt-12 md:min-h-[360px] md:py-6">
          {order.map((id, index) => {
            const isCenter = index === 1;
            const isLeft = index === 0;
            const isRight = index === 2;
            const item = eventBoard.find((entry) => entry.id === id)!;
            const Icon = icons[id];

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-label={`Переключить на трек: ${item.title}`}
                className={`flex cursor-pointer flex-col items-center justify-center text-center transition-all duration-500 ease-out focus-visible:outline-none ${
                  isCenter
                    ? `relative z-20 h-[260px] w-[260px] rounded-[36px] border sm:h-[320px] sm:w-[320px] ${centerStyles[id]}`
                    : "absolute z-10 h-[190px] w-[190px] rounded-[28px] border border-white/8 bg-[#0c1017]/90 text-white/45 sm:h-[240px] sm:w-[240px]"
                } ${
                  isLeft
                    ? "-translate-x-[58%] scale-[0.88] hover:border-white/20 sm:-translate-x-[72%] md:-translate-x-[85%]"
                    : ""
                } ${
                  isRight
                    ? "translate-x-[58%] scale-[0.88] hover:border-white/20 sm:translate-x-[72%] md:translate-x-[85%]"
                    : ""
                }`}
              >
                <div
                  className={`transition duration-300 ${
                    isCenter ? "scale-100" : "scale-90 opacity-60"
                  }`}
                >
                  <Icon active={isCenter} />
                </div>
                <p
                  className={`font-display mt-3 font-semibold transition ${
                    isCenter
                      ? "text-[20px] text-cream sm:text-[24px]"
                      : "text-[16px] text-white/45 sm:text-[18px]"
                  }`}
                >
                  {item.title}
                </p>
                {isCenter ? (
                  <span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55 sm:text-[12px]">
                    выбрано
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-6 flex justify-center gap-2">
          {TRACK_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === id ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Выбрать ${id}`}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-[680px] rounded-[28px] border border-white/8 bg-[#0d121a] p-6 text-center sm:p-8">
          <p className="text-[12px] uppercase tracking-[0.16em] text-white/35">
            {`// ${current.kicker}`}
          </p>
          <h3 className="font-display mt-2 text-[24px] font-semibold text-cream sm:text-[28px]">
            {current.heading}
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-muted">{current.text}</p>
        </div>
      </div>
    </section>
  );
};

export default Events;
