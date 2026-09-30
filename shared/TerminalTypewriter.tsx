"use client";
import React, { useEffect, useState } from "react";

const DOMAINS: string[] = [
  "frontend",
  "backend",
  "devops",
  "mobile",
  "data science",
  "ml / ai",
  "cybersecurity",
  "qa / testing",
  "product",
  "ui / ux",
  "gamedev",
  "cloud",
];

const TYPE_MS = 70;
const HOLD_MS = 1400;
const ERASE_MS = 40;
const PAUSE_MS = 350;

export const TerminalTypewriter: React.FC = () => {
  const [domainIndex, setDomainIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [phase, setPhase] = useState<"typing" | "erasing" | "pausing">("typing");

  useEffect(() => {
    const current = DOMAINS[domainIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("erasing"), HOLD_MS);
      }
    } else if (phase === "erasing") {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, ERASE_MS);
      } else {
        timer = setTimeout(() => setPhase("pausing"), 0);
      }
    } else {
      timer = setTimeout(() => {
        setDomainIndex((index) => (index + 1) % DOMAINS.length);
        setPhase("typing");
      }, PAUSE_MS);
    }

    return () => clearTimeout(timer);
  }, [domainIndex, phase, text]);

  return (
    <div className="max-w-[520px] rounded-[22px] border border-white/8 bg-[#10161f]/90 px-5 py-4 font-mono text-[13px] leading-7 text-white/70">
      <p>
        <span className="text-accent">$</span>{" "}
        <span className="text-[#7ee8ef]">whoami</span>{" "}
        <span className="text-white/45">--community</span>
      </p>
      <p>
        команда из <span className="text-cream">30</span> человек,{" "}
        <span className="text-cream">3</span> направления,{" "}
        <span className="text-cream">1</span> общий чат
      </p>
      <p className="min-h-[1.75rem]">
        <span className="text-accent">$</span>{" "}
        <span className="text-[#7ee8ef]">focus</span>{" "}
        <span className="text-cream">{text}</span>
        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent align-middle animate-pulse" />
      </p>
    </div>
  );
};

export default TerminalTypewriter;
