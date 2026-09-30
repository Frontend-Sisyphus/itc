"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { navLinks } from "@/data/navigation";
import { JoinButton } from "@/shared/PrimaryButton";

export const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-[#070a10]/80 backdrop-blur-xl">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-wide"
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(58,214,224,0.9)]" />
          ИТС
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] text-white/55 lg:flex">
          {navLinks.map((item) => (
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
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M5 7h14" />
                <path d="M5 12h14" />
                <path d="M5 17h14" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/6 bg-[#070a10] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4 text-[16px] text-white/70">
            {navLinks.map((item) => (
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
};

export default Header;
