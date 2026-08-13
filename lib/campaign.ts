import { config } from "./config";

/**
 * Fuente de verdad del monto recaudado. Hoy es un mock local;
 * cuando exista integración con la API de VAKI o un webhook de
 * Wompi/Mercado Pago, esta función se cambia por un fetch real
 * sin tocar quien la consume (el store).
 */
export async function fetchRecaudadoCOP(): Promise<number> {
  return MOCK_RECAUDADO_INICIAL_COP;
}

export const MOCK_RECAUDADO_INICIAL_COP = Math.round(config.metaCOP * 0.34);
