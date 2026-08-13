"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { formatCOP } from "@/lib/format";
import { springProgress } from "@/lib/motion";

export function AnimatedCounter({ value }: { value: number }) {
  const reducedMotion = useReducedMotion();
  const mv = useMotionValue(value);
  const spring = useSpring(mv, reducedMotion ? { stiffness: 1000, damping: 100 } : springProgress);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = formatCOP(Math.round(v));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <motion.span ref={ref} aria-live="polite">
      {formatCOP(value)}
    </motion.span>
  );
}
