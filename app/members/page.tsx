import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MembersDirectory } from "@/components/members-directory";

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
