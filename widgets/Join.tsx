"use client";
import React from "react";

import { JoinButton } from "@/shared/PrimaryButton";
import { ParticleSphere } from "@/shared/ParticleSphere";

export const Join: React.FC = () => {
  return (
    <section id="about" className="bg-bg-soft py-16 md:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)]">
        <div className="max-w-[560px]">
          <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
            {"// о нас"}
          </p>
          <h2 className="font-display mt-3 text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[36px]">
            Мы открыты для новых
            <br />
            участников
            <br />
            круглый год
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
            <p>
              «ИТС» — некоммерческое студенческое сообщество. Мы не берём взносов
              и не обещаем побед — только рабочую среду, менторов из выпускников
              и людей, с которыми не страшно ехать на очный этап в другой город.
            </p>
            <p>
              Заявку можно подать на любой из трёх треков или сразу на несколько
              — команда сама решит, куда вас позвать после короткого интервью.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[#10161f] p-6 sm:p-8">
          <div className="relative z-10 max-w-[280px]">
            <h3 className="text-[22px] font-semibold">Хотите к нам?</h3>
            <p className="mt-3 text-[14px] leading-6 text-muted">
              Заполните короткую анкету — обычно отвечаем в течение недели.
            </p>
            <JoinButton className="mt-6">Заполнить анкету</JoinButton>
          </div>
          <div className="pointer-events-none absolute -bottom-8 -right-10 h-56 w-56 opacity-80 sm:h-64 sm:w-64">
            <ParticleSphere count={700} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
