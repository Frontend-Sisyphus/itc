"use client";
import React, { FormEvent, useEffect, useState } from "react";

import { useJoin } from "@/context/JoinProvider";
import { tracks, TrackId } from "@/data/tracks";
import { PrimaryButton } from "@/shared/PrimaryButton";

interface FormState {
  name: string;
  telegram: string;
  school: string;
  about: string;
  tracks: TrackId[];
}

const emptyFormState: FormState = {
  name: "",
  telegram: "",
  school: "",
  about: "",
  tracks: [],
};

export const ApplyModal: React.FC = () => {
  const { open, closeJoin } = useJoin();
  const [form, setForm] = useState<FormState>(emptyFormState);
  const [sent, setSent] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeJoin();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeJoin]);

  if (!open) return null;

  const toggleTrack = (id: TrackId) => {
    setForm((prev) => ({
      ...prev,
      tracks: prev.tracks.includes(id)
        ? prev.tracks.filter((item) => item !== id)
        : [...prev.tracks, id],
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (form.tracks.length === 0) return;
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/70"
        onClick={closeJoin}
      />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0d121a] p-5 sm:max-w-[520px] sm:rounded-[28px] sm:p-7">
        {sent ? (
          <div className="py-8 text-center">
            <p className="font-display text-2xl font-semibold">Заявку приняли</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Напишем в Telegram в течение недели — после короткого просмотра
              анкеты и тестового задания по треку.
            </p>
            <PrimaryButton
              className="mt-6"
              onClick={() => {
                setSent(false);
                setForm(emptyFormState);
                closeJoin();
              }}
            >
              Хорошо
            </PrimaryButton>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.16em] text-white/35">
                  {"// анкета"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Подать заявку</h2>
              </div>
              <button
                type="button"
                onClick={closeJoin}
                className="text-white/40 hover:text-cream"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">Имя</span>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((v) => ({ ...v, name: e.target.value }))
                }
                placeholder="Как к вам обращаться"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-cream placeholder-white/25 focus:border-accent focus:outline-none"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">
                Telegram для связи
              </span>
              <input
                required
                value={form.telegram}
                onChange={(e) =>
                  setForm((v) => ({ ...v, telegram: e.target.value }))
                }
                placeholder="@username"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-cream placeholder-white/25 focus:border-accent focus:outline-none"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">Вуз и курс</span>
              <input
                value={form.school}
                onChange={(e) =>
                  setForm((v) => ({ ...v, school: e.target.value }))
                }
                placeholder="Например: МИРЭА, 2 курс"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-cream placeholder-white/25 focus:border-accent focus:outline-none"
              />
            </label>

            <div>
              <span className="mb-2 block text-sm text-white/55">
                Интересующие направления (одно или несколько)
              </span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(tracks) as TrackId[]).map((id) => {
                  const active = form.tracks.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleTrack(id)}
                      className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        active
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20"
                      }`}
                    >
                      {tracks[id].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">О себе и опыте</span>
              <textarea
                rows={3}
                value={form.about}
                onChange={(e) =>
                  setForm((v) => ({ ...v, about: e.target.value }))
                }
                placeholder="Стек, репозитории, участие в соревнованиях или идеи проектов"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-cream placeholder-white/25 focus:border-accent focus:outline-none"
              />
            </label>

            <PrimaryButton
              type="submit"
              className="mt-2 w-full"
              disabled={form.tracks.length === 0}
            >
              Отправить заявку
            </PrimaryButton>
            {form.tracks.length === 0 ? (
              <p className="text-center text-xs text-white/40">
                Выберите хотя бы одно направление
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
