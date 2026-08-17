"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { lenisRef } from "@/lib/lenisInstance";

const HEADER_OFFSET = -80;

/** Resuelve el id de ancla de un href tipo "#impacto" o "/#impacto". */
function anchorIdFrom(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const path = href.slice(0, hashIndex);
  if (path !== "" && path !== "/") return null; // ancla de otra página, no manejar acá
  return href.slice(hashIndex + 1);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    let frame = requestAnimationFrame(raf);

    // Todo click en un link de ancla ("#seccion" o "/#seccion") se resuelve
    // con lenis.scrollTo en vez del salto nativo del navegador, para que el
    // estado interno de Lenis nunca se desincronice del scroll real.
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const id = anchorIdFrom(href);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET });
      history.pushState(null, "", `/#${id}`);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
