"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface TileProps {
  smoothedProgress: MotionValue<number>;
  threshold: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  reducedMotion: boolean;
}

/** Una teja: se desliza en diagonal hasta asentar en el techo. */
export function Tile({
  smoothedProgress,
  threshold,
  x,
  y,
  w,
  h,
  rotate,
  reducedMotion,
}: TileProps) {
  const appear = useTransform(smoothedProgress, [threshold - 1.2, threshold + 1.2], [0, 1]);
  const opacity = reducedMotion ? 1 : appear;
  const translateY = useTransform(appear, [0, 1], [-10, 0]);
  const translateX = useTransform(appear, [0, 1], [8, 0]);

  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={1}
      fill="var(--color-madera-700)"
      style={{
        opacity,
        translateY: reducedMotion ? 0 : translateY,
        translateX: reducedMotion ? 0 : translateX,
        rotate,
        transformOrigin: `${x + w / 2}px ${y + h / 2}px`,
      }}
    />
  );
}
