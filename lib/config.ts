/**
 * Configuración central del proyecto. Punto único de verdad para
 * los valores que cambian según la campaña activa.
 */
export const config = {
  /** TODO: reemplazar por la URL real de la VAKI cuando esté disponible. */
  vakiUrl: "https://vaki.co/es/vaki/PLACEHOLDER",
  metaCOP: 1_000_000_000,
  organizacion: "Casa Colombia",
  zonasAfectadas: [
    { departamento: "Chocó", municipio: "San José del Palmar" },
    { departamento: "Risaralda", municipio: "Pereira" },
    { departamento: "Valle del Cauca", municipio: "Cali" },
    { departamento: "Caldas", municipio: "Manizales" },
    { departamento: "Antioquia", municipio: "Antioquia (varios municipios)" },
    { departamento: "Quindío", municipio: "Armenia" },
    { departamento: "Chocó", municipio: "Quibdó" },
  ],
} as const;
