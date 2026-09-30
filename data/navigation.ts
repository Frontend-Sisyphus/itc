export interface NavItem {
  href: string;
  label: string;
}

export const navLinks: NavItem[] = [
  { href: "/#community", label: "Сообщество" },
  { href: "/#members", label: "Участники" },
  { href: "/#projects", label: "Проекты" },
  { href: "/#events", label: "Где мы участвовали" },
  { href: "/#about", label: "О нас" },
];

export const nav = navLinks;
