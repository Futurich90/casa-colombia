/**
 * Fuente de verdad del monto recaudado. Hoy es un valor fijo que se
 * actualiza a mano contra el número real de la VAKI (no hay acceso a
 * su API); cuando exista integración oficial, esta función se cambia
 * por un fetch real sin tocar quien la consume (el store).
 */
export async function fetchRecaudadoCOP(): Promise<number> {
  return MOCK_RECAUDADO_INICIAL_COP;
}

/** Última actualización manual: 17 ago 2026, según la VAKI real. */
export const MOCK_RECAUDADO_INICIAL_COP = 5_088_851;
