"use client";

import { PrimaryButton } from "@/components/primary-button";
import { tracks, type TrackId } from "@/lib/data";
import { useJoin } from "@/lib/join-context";
import { FormEvent, useEffect, useState } from "react";

const empty = {
  name: "",
  telegram: "",
  school: "",
  about: "",
  tracks: [] as TrackId[],
};

export function ApplyModal() {
  const { open, closeJoin } = useJoin();
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);

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
                setForm(empty);
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
                  // анкета
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
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none ring-accent/40 focus:ring-2"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">Telegram</span>
              <input
                required
                placeholder="@username"
                value={form.telegram}
                onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none ring-accent/40 focus:ring-2"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">Вуз и курс</span>
              <input
                required
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none ring-accent/40 focus:ring-2"
              />
            </label>

            <fieldset>
              <legend className="mb-2 text-sm text-white/55">Трек</legend>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(tracks) as TrackId[]).map((id) => {
                  const selected = form.tracks.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleTrack(id)}
                      className={`rounded-full border px-3 py-1.5 text-sm ${
                        selected
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-white/10 text-white/60"
                      }`}
                    >
                      {tracks[id].label}
                    </button>
                  );
                })}
              </div>
              {form.tracks.length === 0 ? (
                <p className="mt-2 text-xs text-white/35">Выберите хотя бы один трек</p>
              ) : null}
            </fieldset>

            <label className="block text-sm">
              <span className="mb-1.5 block text-white/55">Коротко о себе</span>
              <textarea
                required
                rows={4}
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none ring-accent/40 focus:ring-2"
              />
            </label>

            <PrimaryButton type="submit" className="w-full" variant="wide">
              Отправить
            </PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}
