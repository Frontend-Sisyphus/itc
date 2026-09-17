"use client";

import { useProjectsQuery, useTechnologiesQuery } from "@/lib/api/hooks";
import { flattenProjectStack } from "@/lib/taskmanager/map";
import type { ApiProject } from "@/lib/taskmanager/types";
import Link from "next/link";

function ProjectRow({ project }: { project: ApiProject }) {
  const stack = flattenProjectStack(project.stack).slice(0, 6);
  const membersCount = project.members?.length ?? 0;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group grid gap-3 border-b border-white/8 py-5 transition hover:bg-white/[0.02] sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_auto] sm:items-end sm:gap-6"
    >
      <div>
        <p className="text-[12px] uppercase tracking-[0.14em] text-white/35">
          {project.project_type || project.status || "проект"}
        </p>
        <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-cream transition group-hover:text-accent">
          {project.title || `Проект #${project.id}`}
        </h3>
        {project.description ? (
          <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-muted">
            {project.description}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.length > 0 ? (
          stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55"
            >
              {tech}
            </span>
          ))
        ) : (
          <span className="text-[13px] text-white/35">Стек не указан</span>
        )}
      </div>
      <p className="text-[13px] text-muted sm:text-right">
        {membersCount > 0
          ? `${membersCount} в команде`
          : project.status || "—"}
      </p>
    </Link>
  );
}

export function Projects({
  preview = false,
  limit = 5,
}: {
  preview?: boolean;
  limit?: number;
}) {
  const { data, isPending, isError, refetch } = useProjectsQuery();
  const techQuery = useTechnologiesQuery();
  const projects = data ?? [];
  const list = preview ? projects.slice(0, limit) : projects;
  const techCount = techQuery.data?.technologies?.length ?? 0;

  return (
    <section id="projects" className="bg-bg-soft py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-white/35">
              // портфолио
            </p>
            <h2 className="font-display mt-3 text-[36px] font-semibold tracking-[-0.04em] sm:text-[44px]">
              Проекты
            </h2>
          </div>
          <p className="max-w-[360px] text-[14px] leading-6 text-muted md:text-right">
            {isPending
              ? "Тянем проекты из TaskManager…"
              : `${projects.length} активных и завершённых проектов${
                  techCount > 0 ? ` · каталог из ${techCount} технологий` : ""
                }.`}
          </p>
        </div>

        {isPending && list.length === 0 ? (
          <div className="mt-10 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-[18px] bg-white/[0.04]"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-10 rounded-[24px] border border-dashed border-white/12 px-6 py-10 text-center">
            <p className="text-cream">Не удалось загрузить проекты</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 cursor-pointer text-sm text-accent underline-offset-2 hover:underline"
            >
              Повторить
            </button>
          </div>
        ) : list.length === 0 ? (
          <p className="mt-10 text-sm text-muted">Пока нет проектов в API.</p>
        ) : (
          <div className="mt-8 border-t border-white/8">
            {list.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        )}

        {preview && projects.length > limit ? (
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-cream transition hover:border-white/25"
            >
              Все проекты
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
