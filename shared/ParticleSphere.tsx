"use client";
import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
}

const makePoints = (count: number): Point[] => {
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
};

export interface ParticleSphereProps {
  className?: string;
  count?: number;
  interactive?: boolean;
}

export const ParticleSphere: React.FC<ParticleSphereProps> = ({
  className = "",
  count = 900,
  interactive = false,
}) => {
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
    };

    let rotX = 0.4;
    let rotY = 0.2;
    const autoSpeed = 0.0035;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const parent = wrap ?? canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const w = Math.max(160, Math.floor(rect?.width ?? canvas.clientWidth ?? 360));
      const h = Math.max(160, Math.floor(rect?.height ?? canvas.clientHeight ?? 360));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = w;
      height = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && wrap) {
      ro = new ResizeObserver(() => resize());
      ro.observe(wrap);
    } else {
      window.addEventListener("resize", resize);
    }

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      io.observe(canvas);
    }

    const onVisibility = () => {
      pageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.targetX = Math.max(-1, Math.min(1, nx));
      pointer.targetY = Math.max(-1, Math.min(1, ny));
      pointer.inside = true;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    if (interactive) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    const sphereRadius = () => Math.min(width, height) * 0.4;

    const render = () => {
      if (!running) return;

      if (!visible || !pageVisible) {
        raf = requestAnimationFrame(render);
        return;
      }

      if (interactive) {
        pointer.x += (pointer.targetX - pointer.x) * 0.06;
        pointer.y += (pointer.targetY - pointer.y) * 0.06;
      }

      rotY += autoSpeed + pointer.x * 0.01;
      rotX += pointer.y * 0.006;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;
      const radius = sphereRadius();
      const fov = 380;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2 * radius + radius * 0.4);
        const px = cx + x1 * radius * scale;
        const py = cy + y2 * radius * scale;

        const depthFactor = (z2 + 1) / 2;
        const alpha = 0.12 + depthFactor * 0.85;
        const size = Math.max(0.7, (0.8 + depthFactor * 1.6) * (dpr > 1 ? 1 : 1.1));

        const isCyan = (i + (p.y > 0 ? 1 : 0)) % 5 !== 0;
        ctx.fillStyle = isCyan
          ? `rgba(58, 214, 224, ${alpha.toFixed(3)})`
          : `rgba(245, 240, 230, ${(alpha * 0.8).toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (interactive) {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [count, interactive]);

  return (
    <div
      ref={wrapRef}
      className={`relative flex h-full w-full items-center justify-center ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block touch-none select-none"
        aria-hidden="true"
      />
    </div>
  );
};

export default ParticleSphere;
