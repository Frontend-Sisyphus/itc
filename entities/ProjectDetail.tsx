"use client";
import React from "react";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getProject } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";
import { flattenProjectStack } from "@/lib/taskmanager/map";

export interface ProjectDetailProps {
  id: number;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => getProject(id),
  });

  if (isPending) {
    return (
      <div className="container-page py-16">
        <div className="h-10 w-48 animate-pulse rounded bg-white/[0.06]" />
        <div className="mt-6 h-40 animate-pulse rounded-[24px] bg-white/[0.04]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container-page py-16 text-center">
        <p className="text-lg font-semibold">Проект не найден</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 cursor-pointer text-sm text-accent underline-offset-2 hover:underline"
        >
          Повторить
        </button>
        <div className="mt-6">
          <Link href="/projects" className="text-sm text-muted hover:text-cream">
            ← ко всем проектам
          </Link>
        </div>
      </div>
    );
  }

  const stack = flattenProjectStack(data.stack);

  return (
    <article className="container-page py-12 md:py-16">
      <Link
        href="/projects"
        className="text-[13px] text-white/45 transition hover:text-cream"
      >
        ← Все проекты
      </Link>

      <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-white/35">
        {[data.project_type, data.status].filter(Boolean).join(" · ") ||
          "проект"}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-[36px] font-semibold tracking-[-0.04em] sm:text-[48px]">
        {data.title || `Проект #${data.id}`}
      </h1>
      {data.description ? (
        <p className="mt-5 max-w-2xl text-[16px] leading-7 text-muted">
          {data.description}
        </p>
      ) : null}

      {stack.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-white/60"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      {data.members && data.members.length > 0 ? (
        <section className="mt-14 border-t border-white/8 pt-10">
          <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
            Команда
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.members.map((member) => (
              <li
                key={`${member.username ?? member.full_name}-${member.role}`}
                className="border-b border-white/8 pb-4"
              >
                <p className="text-[15px] font-medium text-cream">
                  {member.full_name || member.username || "Участник"}
                </p>
                <p className="mt-1 text-[13px] text-muted">
                  {[member.role, member.username ? `@${member.username}` : null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
};

export default ProjectDetail;
