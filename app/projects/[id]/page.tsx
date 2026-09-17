import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectDetail } from "@/components/project-detail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props) {
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
