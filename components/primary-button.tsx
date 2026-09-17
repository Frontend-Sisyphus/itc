"use client";

import { useJoin } from "@/lib/join-context";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "wide";
};

export function PrimaryButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: Props) {
  const base =
    "inline-flex cursor-pointer items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:scale-[0.97]";

  const styles = {
    primary:
      "bg-[linear-gradient(180deg,#7af0f6_0%,#3ad6e0_100%)] px-5 py-2.5 text-sm text-[#07343a] shadow-[0_0_0_0_rgba(58,214,224,0)] hover:shadow-[0_8px_28px_rgba(58,214,224,0.35)] hover:brightness-105 active:brightness-95 active:shadow-none",
    wide: "bg-[linear-gradient(90deg,#3ad6e0_0%,#7af0f6_100%)] px-8 py-3 text-sm text-[#07343a] hover:brightness-105 active:brightness-95",
    ghost:
      "border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm text-cream hover:border-white/25 hover:bg-white/[0.06] active:bg-white/[0.1]",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function JoinButton({
  children,
  className,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  variant?: Props["variant"];
}) {
  const { openJoin } = useJoin();
  return (
    <PrimaryButton className={className} variant={variant} onClick={openJoin}>
      {children}
    </PrimaryButton>
  );
}
