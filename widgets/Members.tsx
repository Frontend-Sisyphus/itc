"use client";
import React from "react";

import Link from "next/link";

import { useMembersQuery } from "@/lib/api/hooks";
import { MemberCard } from "@/entities/MemberCard";

export interface MembersProps {
  preview?: boolean;
}

export const Members: React.FC<MembersProps> = ({ preview = false }) => {
  const { members, isPending } = useMembersQuery();
  const leaders = members.filter((member) => member.role === "руководитель");
  const source = leaders.length > 0 ? leaders : members;
  const list = preview ? source.slice(0, 14) : source;

  return (
    <section id="members" className="py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
              {"// команда"}
            </p>
            <h2 className="font-display mt-3 text-[36px] font-semibold tracking-[-0.04em] sm:text-[44px]">
              Участники
            </h2>
          </div>
          <p className="max-w-[340px] text-[14px] leading-6 text-muted md:text-right">
            {isPending
              ? "Загружаем состав из TaskManager…"
              : leaders.length > 0
                ? `${leaders.length} руководителей направлений ведут собрания и берут новичков в команду.`
                : `${members.length} участников сообщества — живые данные из TaskManager.`}
          </p>
        </div>

        {isPending && list.length === 0 ? (
          <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-[108px] animate-pulse rounded-[22px] bg-white/[0.04]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {list.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {preview ? (
          <div className="mt-10 flex justify-center">
            <Link
              href="/members"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-cream transition hover:border-white/25"
            >
              Смотреть весь состав
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Members;
