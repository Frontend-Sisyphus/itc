import { About } from "@/components/about";
import { Events } from "@/components/events";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Join } from "@/components/join";
import { Members } from "@/components/members";
import { Projects } from "@/components/projects";

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
