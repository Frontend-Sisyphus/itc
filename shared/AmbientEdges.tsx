"use client";
import React, { useEffect, useState } from "react";

/**
 * Lightweight edge ambience: CSS-only, few nodes, pauses when tab is hidden.
 */
export const AmbientEdges: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      setEnabled(!reduce.matches && !document.hidden);
    };

    sync();
    reduce.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      reduce.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  if (!enabled) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div className="ambient-edge-wash ambient-edge-wash--left ambient-static" />
        <div className="ambient-edge-wash ambient-edge-wash--right ambient-static" />
        <div className="ambient-rail ambient-rail--left ambient-static" />
        <div className="ambient-rail ambient-rail--right ambient-static" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden contain-strict"
      aria-hidden="true"
    >
      <div className="ambient-edge-wash ambient-edge-wash--left" />
      <div className="ambient-edge-wash ambient-edge-wash--right" />

      <div className="ambient-orb ambient-orb--tl" />
      <div className="ambient-orb ambient-orb--tr" />

      <div className="ambient-rail ambient-rail--left" />
      <div className="ambient-rail ambient-rail--right" />

      <div className="ambient-spark ambient-spark--left" />
      <div className="ambient-spark ambient-spark--right" />

      <span className="ambient-glyph ambient-glyph--left" style={{ top: "28%" }}>
        01
      </span>
      <span className="ambient-glyph ambient-glyph--left" style={{ top: "62%" }}>
        λ
      </span>
      <span className="ambient-glyph ambient-glyph--right" style={{ top: "34%" }}>
        {"{}"}
      </span>
      <span className="ambient-glyph ambient-glyph--right" style={{ top: "68%" }}>
        {"/>"}
      </span>
    </div>
  );
};

export default AmbientEdges;
