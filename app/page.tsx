import React from "react";

import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { About } from "@/widgets/About";
import { Members } from "@/widgets/Members";
import { Projects } from "@/widgets/Projects";
import { Events } from "@/widgets/Events";
import { Join } from "@/widgets/Join";
import { Footer } from "@/widgets/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Members preview />
        <Projects preview />
        <Events />
        <Join />
      </main>
      <Footer />
    </>
  );
}
