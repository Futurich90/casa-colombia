import type { Transition, Variants } from "motion/react";

/**
 * Sistema de motion de Mi Casa Colombia.
 * Toda animación del sitio se construye a partir de estos tokens.
 * Un componente que necesite un easing o duración nuevos los agrega
 * aquí, nunca los hardcodea inline.
 */

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
} as const;

/** Ease de salida propio: entradas con desaceleración marcada, sin rebote. */
export const easeOut = [0.16, 1, 0.3, 1] as const;
/** Ease simétrico para transiciones de estado (hover, filtros, layout). */
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const stagger = {
  base: 0.06,
} as const;

export const springProgress: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 1,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const transitionBase: Transition = {
  duration: duration.base,
  ease: easeOut,
};

export const transitionFast: Transition = {
  duration: duration.fast,
  ease: easeOut,
};

export const transitionSlow: Transition = {
  duration: duration.slow,
  ease: easeOut,
};

/** Fade + desplazamiento vertical sutil. El caballo de batalla del sitio. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
};

/** Contenedor que escalona la entrada de sus hijos. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.base,
    },
  },
};

/**
 * Reveal de texto por línea con máscara: el padre debe tener
 * overflow-hidden y envolver cada línea en su propio span/div.
 */
export const revealMask: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: duration.slow, ease: easeOut },
  },
};

/** Entrada de ladrillo: cae y asienta con un leve overshoot. */
export const brickDrop: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
};

/** Entrada de ventana/puerta: fade + scale sutil, sin movimiento vertical. */
export const windowFade: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSlow,
  },
};

/** Prefiere-reduced-motion: variantes sin desplazamiento, solo opacity. */
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
};
