import React from "react";

import { Header } from "@/widgets/Header";
import { MembersDirectory } from "@/widgets/MembersDirectory";
import { Footer } from "@/widgets/Footer";

export default function MembersPage() {
  return (
    <>
      <Header />
      <main className="pb-10">
        <MembersDirectory />
      </main>
      <Footer />
    </>
  );
}
