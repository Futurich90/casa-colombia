"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface BrickProps {
  smoothedProgress: MotionValue<number>;
  threshold: number;
  x: number;
  y: number;
  w: number;
  h: number;
  reducedMotion: boolean;
}

/** Un ladrillo: cae y asienta con overshoot cuando el progreso cruza su umbral. */
export function Brick({
  smoothedProgress,
  threshold,
  x,
  y,
  w,
  h,
  reducedMotion,
}: BrickProps) {
  const appear = useTransform(smoothedProgress, [threshold - 1.5, threshold + 1.5], [0, 1]);
  const opacity = reducedMotion ? 1 : appear;
  const translateY = useTransform(appear, [0, 1], [-14, 0]);
  const scale = useTransform(appear, [0, 1], [0.94, 1]);

  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={1}
      fill="var(--color-arcilla-500)"
      stroke="var(--color-arcilla-700)"
      strokeWidth={1}
      style={{
        opacity,
        translateY: reducedMotion ? 0 : translateY,
        scale: reducedMotion ? 1 : scale,
        transformOrigin: `${x + w / 2}px ${y + h}px`,
      }}
    />
  );
}
