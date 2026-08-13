export interface Stage {
  key: string;
  label: string;
  start: number;
  end: number;
}

/**
 * Etapas de construcción de la Casa Colombia, atadas al % de la meta.
 * Ver README del componente para el detalle de cada etapa.
 */
export const STAGES: Stage[] = [
  { key: "terreno", label: "Terreno y replanteo", start: 0, end: 15 },
  { key: "cimentacion", label: "Cimentación", start: 15, end: 30 },
  { key: "muros", label: "Muros en ladrillo", start: 30, end: 45 },
  { key: "aberturas", label: "Ventanas y puertas", start: 45, end: 60 },
  { key: "techo", label: "Estructura del techo", start: 60, end: 75 },
  { key: "tejas", label: "Tejas y acabados", start: 75, end: 90 },
  { key: "vida", label: "La casa vive", start: 90, end: 100 },
];

/** Progreso local 0-1 dentro de un rango de etapa, sin clamping (lo hace motion). */
export function localRange(start: number, end: number): [number, number] {
  return [start, end];
}
