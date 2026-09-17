"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  z: number;
};

function makePoints(count: number) {
  const points: Point[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
}

export function ParticleSphere({
  className = "",
  count = 900,
  interactive = false,
}: {
  className?: string;
  count?: number;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointCount = reduced ? Math.min(count, 280) : count;
    const points = makePoints(pointCount);
    let raf = 0;
    let running = true;
    let visible = true;
    let pageVisible = !document.hidden;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      inside: false,
      active: false,
    };

    const velocity = { x: 0, y: 0 };
    const rotation = { x: 0.35, y: 0 };
    let expand = 0;
    let expandTarget = 0;

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const size = rect.width || 1;
      return {
        x: ((clientX - rect.left) / size) * 2 - 1,
        y: ((clientY - rect.top) / size) * 2 - 1,
      };
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      const local = toLocal(clientX, clientY);
      pointer.targetX = local.x;
      pointer.targetY = local.y;
      pointer.inside = true;
      pointer.active = true;
      expandTarget = 1;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      pointer.active = false;
      expandTarget = 0;
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const onMouseMove = (event: MouseEvent) => {
      onPointerMove(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      onPointerMove(event.touches[0].clientX, event.touches[0].clientY);
    };

    const target: HTMLElement = wrap ?? canvas;

    if (interactive) {
      target.addEventListener("mousemove", onMouseMove);
      target.addEventListener("mouseleave", onPointerLeave);
      target.addEventListener("touchstart", onTouchMove, { passive: true });
      target.addEventListener("touchmove", onTouchMove, { passive: true });
      target.addEventListener("touchend", onPointerLeave);
      target.addEventListener("touchcancel", onPointerLeave);
    }

    const render = () => {
      if (!running) return;
      if (!visible || !pageVisible) {
        raf = 0;
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const size = canvas.clientWidth;
      if (size <= 0) {
        raf = window.requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      expand += (expandTarget - expand) * 0.06;

      if (interactive && pointer.active) {
        velocity.x += pointer.y * 0.004;
        velocity.y += pointer.x * 0.004;
      }

      velocity.x *= 0.94;
      velocity.y *= 0.94;

      const autoSpin = interactive ? 0.0022 : 0.0045;
      rotation.y += autoSpin + velocity.y;
      rotation.x += velocity.x * 0.35;

      const baseTilt = interactive ? 0.28 : 0.35;
      const rotX = baseTilt + rotation.x * 0.15 + (interactive ? pointer.y * 0.18 : 0);
      const rotY = rotation.y + (interactive ? pointer.x * 0.25 : 0);

      const cx = size / 2;
      const cy = size / 2;
      const scale = size * (0.38 + expand * 0.035);

      const glowStrength = 0.18 + expand * 0.14;
      const glow = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.52);
      glow.addColorStop(0, `rgba(58,214,224,${glowStrength})`);
      glow.addColorStop(1, "rgba(58,214,224,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.52, 0, Math.PI * 2);
      ctx.fill();

      const pointerWorld = {
        x: pointer.x * 0.9,
        y: pointer.y * 0.9,
        z: 0.35,
      };

      for (const p of points) {
        let px3 = p.x;
        let py3 = p.y;
        let pz3 = p.z;

        if (interactive && expand > 0.01) {
          const dx = px3 - pointerWorld.x;
          const dy = py3 - pointerWorld.y;
          const dz = pz3 - pointerWorld.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.001;
          const pull = Math.max(0, 1 - dist / 1.35) * expand * 0.22;
          px3 += dx * pull;
          py3 += dy * pull;
          pz3 += dz * pull;
        }

        const y1 = py3 * Math.cos(rotX) - pz3 * Math.sin(rotX);
        const z1 = py3 * Math.sin(rotX) + pz3 * Math.cos(rotX);
        const x2 = px3 * Math.cos(rotY) + z1 * Math.sin(rotY);
        const z2 = -px3 * Math.sin(rotY) + z1 * Math.cos(rotY);
        const depth = (z2 + 1) / 2;
        const px = cx + x2 * scale;
        const py = cy + y1 * scale;
        const alpha = 0.18 + depth * 0.82;
        const r = 0.6 + depth * (1.35 + expand * 0.35);
        ctx.fillStyle = `rgba(${90 + depth * 80}, ${220 + depth * 20}, ${230}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(render);
    };

    const kick = () => {
      if (!running || raf) return;
      raf = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      },
      { threshold: 0.05 },
    );
    observer.observe(wrap ?? canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    kick();
    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (interactive) {
        target.removeEventListener("mousemove", onMouseMove);
        target.removeEventListener("mouseleave", onPointerLeave);
        target.removeEventListener("touchstart", onTouchMove);
        target.removeEventListener("touchmove", onTouchMove);
        target.removeEventListener("touchend", onPointerLeave);
        target.removeEventListener("touchcancel", onPointerLeave);
      }
    };
  }, [count, interactive]);

  return (
    <div
      ref={wrapRef}
      className={`h-full w-full ${interactive ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
