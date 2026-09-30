import { TrackId } from "./tracks";

export interface EventBoardItem {
  id: TrackId;
  title: string;
  kicker: string;
  heading: string;
  text: string;
}

export const eventBoard: EventBoardItem[] = [
  {
    id: "grants",
    title: "Гранты",
    kicker: "гранты",
    heading: "Гранты",
    text: "Студенческие и молодёжные грантовые конкурсы: от идеи до пакета документов. Вместе собираем заявку, смету и защиту перед комиссией.",
  },
  {
    id: "olympiads",
    title: "Олимпиады",
    kicker: "олимпиады",
    heading: "Олимпиады",
    text: "Командное спортивное программирование (ICPC), олимпиады по анализу данных и ИИ. Тренировки, разбор контестов и совместные выезды.",
  },
  {
    id: "hackathons",
    title: "Хакатоны",
    kicker: "хакатоны",
    heading: "Хакатоны",
    text: "48-часовые командные спринты. Быстро делим роли — ML, backend, frontend, product — и собираем рабочий MVP под задачу заказчика.",
  },
];
