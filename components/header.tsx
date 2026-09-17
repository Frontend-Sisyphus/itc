"use client";

import { JoinButton } from "@/components/primary-button";
import { nav } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-[#070a10]/80 backdrop-blur-xl">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-wide">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(58,214,224,0.9)]" />
          ИТС
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] text-white/55 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <JoinButton>Вступить</JoinButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-cream transition duration-200 hover:border-white/25 hover:bg-white/[0.05] active:scale-95 active:bg-white/[0.08] lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <div className="flex w-4 flex-col gap-1.5">
            <span className={`h-px w-full origin-center bg-cream transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`h-px w-full origin-center bg-cream transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/6 bg-[#070a10] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4 text-[16px] text-white/70">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5">
            <JoinButton className="w-full">Вступить</JoinButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
