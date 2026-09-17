"use client";

import { JoinButton } from "@/components/primary-button";
import { ParticleSphere } from "@/components/particle-sphere";
import { TerminalTypewriter } from "@/components/terminal-typewriter";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(58,214,224,0.08),transparent_45%)]" />
      <div className="container-page grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:gap-8 lg:pb-20 lg:pt-16">
        <div className="relative z-10 max-w-[640px]">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-accent/30 px-3 py-1.5 text-[12px] tracking-[0.08em] text-accent sm:px-3.5 sm:text-[12px] sm:tracking-[0.14em]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            студенческое объединение · основано в 2022
          </div>

          <h1 className="font-display mt-6 text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-cream sm:text-[56px] lg:text-[68px] xl:text-[72px]">
            Мы находим
            <br />
            задачу — и
            <br />
            <span className="text-accent">доводим её до финала.</span>
          </h1>

          <p className="relative mt-6 max-w-[470px] text-[15px] leading-7 text-muted sm:text-[16px]">
            <span className="pointer-events-none absolute -right-16 top-2 hidden h-24 w-40 rounded-full bg-white/4 blur-2xl lg:block" />
            «ИТС» — сообщество студентов, которые вместе готовятся к хакатонам,
            разбирают олимпиадные задачи и подают заявки на гранты. Один состав,
            три трека.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <JoinButton>Подать заявку</JoinButton>
            <a
              href="#events"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-bold underline text-cream transition duration-300 hover:border-white/25 hover:bg-white/[0.06]"
            >
              Куда мы уже съездили
              <span className="ml-2 text-[12px]">↓</span>
            </a>
          </div>

          <div className="mt-8">
            <TerminalTypewriter />
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-none">
          <ParticleSphere interactive />
        </div>
      </div>
    </section>
  );
}
