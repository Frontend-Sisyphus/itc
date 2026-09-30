import { TrackId } from "./tracks";

export interface Member {
  id: string;
  initials: string;
  name: string;
  role: "руководитель" | "участник";
  track: TrackId;
  tone: "cyan" | "violet" | "green" | "blue";
  photoUrl?: string | null;
  username?: string;
  technologies?: string[];
}

export const leaders: Member[] = [
  { id: "ai", initials: "АИ", name: "Аня Иванова", role: "руководитель", track: "hackathons", tone: "cyan" },
  { id: "mp", initials: "МП", name: "Максим Петров", role: "руководитель", track: "olympiads", tone: "violet" },
  { id: "es", initials: "ЕС", name: "Елена Смирнова", role: "руководитель", track: "grants", tone: "green" },
  { id: "dk", initials: "ДК", name: "Данил Кузнецов", role: "руководитель", track: "hackathons", tone: "blue" },
  { id: "tb", initials: "ТБ", name: "Тимур Байрамов", role: "руководитель", track: "olympiads", tone: "violet" },
  { id: "ov", initials: "ОВ", name: "Ольга Волкова", role: "руководитель", track: "grants", tone: "green" },
  { id: "nr", initials: "НР", name: "Настя Романова", role: "руководитель", track: "hackathons", tone: "cyan" },
  { id: "il", initials: "ИЛ", name: "Игорь Лебедев", role: "руководитель", track: "olympiads", tone: "violet" },
  { id: "ms", initials: "МС", name: "Мария Соколова", role: "руководитель", track: "grants", tone: "green" },
  { id: "an", initials: "АН", name: "Артём Никитин", role: "руководитель", track: "hackathons", tone: "blue" },
  { id: "pk", initials: "ПК", name: "Полина Ковалёва", role: "руководитель", track: "olympiads", tone: "violet" },
  { id: "so", initials: "СО", name: "Сергей Орлов", role: "руководитель", track: "grants", tone: "green" },
  { id: "vm", initials: "ВМ", name: "Виктория Морозова", role: "руководитель", track: "hackathons", tone: "cyan" },
  { id: "rz", initials: "РЗ", name: "Роман Захаров", role: "руководитель", track: "olympiads", tone: "violet" },
];

export const members: Member[] = [
  ...leaders,
  { id: "ka", initials: "КА", name: "Кирилл Абрамов", role: "участник", track: "hackathons", tone: "cyan" },
  { id: "db", initials: "ДБ", name: "Дарья Белова", role: "участник", track: "olympiads", tone: "violet" },
  { id: "ng", initials: "НГ", name: "Никита Громов", role: "участник", track: "grants", tone: "green" },
  { id: "egs", initials: "ЕГ", name: "Егор Савельев", role: "участник", track: "hackathons", tone: "blue" },
  { id: "lf", initials: "ЛФ", name: "Лиза Фролова", role: "участник", track: "olympiads", tone: "violet" },
  { id: "at", initials: "АТ", name: "Алина Тихонова", role: "участник", track: "grants", tone: "green" },
  { id: "pm", initials: "ПМ", name: "Павел Миронов", role: "участник", track: "hackathons", tone: "cyan" },
  { id: "yu", initials: "ЮУ", name: "Юля Устинова", role: "участник", track: "olympiads", tone: "violet" },
  { id: "vk", initials: "ВК", name: "Влад Коротков", role: "участник", track: "grants", tone: "green" },
  { id: "ss", initials: "СС", name: "София Степанова", role: "участник", track: "hackathons", tone: "blue" },
  { id: "im", initials: "ИМ", name: "Илья Макаров", role: "участник", track: "olympiads", tone: "violet" },
  { id: "ak", initials: "АК", name: "Алина Крылова", role: "участник", track: "grants", tone: "green" },
  { id: "dn", initials: "ДН", name: "Денис Новиков", role: "участник", track: "hackathons", tone: "cyan" },
  { id: "mb", initials: "МБ", name: "Милана Борисова", role: "участник", track: "olympiads", tone: "violet" },
  { id: "te", initials: "ТЕ", name: "Тимур Ершов", role: "участник", track: "grants", tone: "green" },
  { id: "ov2", initials: "ОВ", name: "Олег Васильев", role: "участник", track: "hackathons", tone: "blue" },
];
