import { nav } from "@/lib/data";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-8">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-accent" />
          ИТС
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-cream">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-white/35">© 2022–2026 ИТС</p>
      </div>
    </footer>
  );
}
