"use client";

import { useEffect } from "react";
import { lenisRef } from "@/lib/lenisInstance";

/**
 * Si la página carga con un ancla en la URL (ej. viniendo de /catalogo con
 * un link a "/#impacto"), hace el scroll inicial vía Lenis en vez de dejar
 * que el navegador salte de forma nativa — mismo motivo que en
 * SmoothScrollProvider: un salto nativo desincroniza el estado de Lenis.
 */
export function ScrollToHashOnLoad() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    let attempts = 0;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (lenisRef.current && target) {
        lenisRef.current.scrollTo(target, { offset: -80, immediate: true });
      } else if (attempts < 20) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
  }, []);

  return null;
}
