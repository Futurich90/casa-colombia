import type Lenis from "lenis";

/**
 * Referencia global a la instancia activa de Lenis. Cualquier scroll
 * programático (anclas, "volver arriba", etc.) debe pasar por acá en
 * vez de la API nativa del navegador — si el scroll nativo mueve la
 * página sin que Lenis se entere, su estado interno queda desincronizado
 * y dejar de responder a nuevas interacciones.
 */
export const lenisRef: { current: Lenis | null } = { current: null };
