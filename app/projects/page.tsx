import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="pb-10">
        <Projects />
      </main>
      <Footer />
    </>
  );
}
