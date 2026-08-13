"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface OpeningProps {
  smoothedProgress: MotionValue<number>;
  start: number;
  end: number;
  x: number;
  y: number;
  w: number;
  h: number;
  variant: "ventana" | "puerta";
  reducedMotion: boolean;
  /** 0-1: cuánta "luz" tiene encendida (etapa final). */
  glow?: MotionValue<number>;
  glowFilterId?: string;
}

/** Ventana o puerta: fade + scale sutil, sin caída. */
export function Opening({
  smoothedProgress,
  start,
  end,
  x,
  y,
  w,
  h,
  variant,
  reducedMotion,
  glow,
  glowFilterId,
}: OpeningProps) {
  const appear = useTransform(smoothedProgress, [start, end], [0, 1]);
  const opacity = reducedMotion ? 1 : appear;
  const scale = useTransform(appear, [0, 1], [0.92, 1]);
  const fallbackGlow = useTransform(smoothedProgress, [0, 100], [0, 0]);
  const glowOpacity = glow ?? fallbackGlow;
  const haloOpacity = useTransform(glowOpacity, (v) => v * 0.85);

  return (
    <g>
      {variant === "ventana" && (
        <motion.rect
          x={x - 10}
          y={y - 10}
          width={w + 20}
          height={h + 20}
          fill="var(--color-acento-amarillo-300)"
          filter={glowFilterId ? `url(#${glowFilterId})` : undefined}
          style={{ opacity: haloOpacity }}
        />
      )}
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={variant === "puerta" ? "var(--color-madera-700)" : "var(--color-cemento-700)"}
        stroke="var(--color-cemento-900)"
        strokeWidth={1.5}
        style={{
          opacity,
          scale: reducedMotion ? 1 : scale,
          transformOrigin: `${x + w / 2}px ${y + h / 2}px`,
        }}
      />
      {variant === "ventana" && (
        <motion.rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={2}
          fill="var(--color-acento-amarillo-500)"
          style={{ opacity: glowOpacity }}
        />
      )}
    </g>
  );
}
