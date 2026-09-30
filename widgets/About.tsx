import React from "react";

import { stats } from "@/data/stats";

export const About: React.FC = () => {
  return (
    <section id="community" className="bg-bg-soft py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.85fr)] lg:items-center">
        <div className="max-w-[560px]">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
            {"// о сообществе"}
          </p>
          <h2 className="font-display mt-3 text-[28px] font-semibold leading-tight tracking-[-0.03em] text-cream sm:text-[36px]">
            Не курс и не кружок — рабочая группа
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
            <p>
              Мы собрались вокруг простой идеи: соревновательные и грантовые
              форматы выигрываются командой, а не одиночкой. Внутри — три трека:
              хакатоны, олимпиады и гранты, и любой участник может двигаться
              сразу по нескольким.
            </p>
            <p>
              Встречаемся раз в неделю разбирать кейсы, а перед крупными
              событиями — чаще. Новых участников берём после короткого
              собеседования и тестового задания по треку.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-white/8">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`px-5 py-6 sm:px-6 sm:py-7 ${index % 2 === 0 ? "border-r border-white/8" : ""} ${index < 2 ? "border-b border-white/8" : ""}`}
            >
              <p className="font-display text-[40px] font-semibold leading-none text-accent sm:text-[48px]">
                {item.value}
              </p>
              <p className="mt-2 text-[13px] text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
