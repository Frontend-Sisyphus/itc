import React from "react";

import { Header } from "@/widgets/Header";
import { Projects } from "@/widgets/Projects";
import { Footer } from "@/widgets/Footer";

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
