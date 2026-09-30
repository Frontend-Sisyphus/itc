import React from "react";

import { Header } from "@/widgets/Header";
import { ProjectDetail } from "@/entities/ProjectDetail";
import { Footer } from "@/widgets/Footer";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id: raw } = await params;
  const id = Number(raw);

  return (
    <>
      <Header />
      <main className="pb-16">
        {Number.isNaN(id) ? (
          <div className="container-page py-16 text-center text-muted">
            Некорректный id проекта
          </div>
        ) : (
          <ProjectDetail id={id} />
        )}
      </main>
      <Footer />
    </>
  );
}
