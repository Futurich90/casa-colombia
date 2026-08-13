export type Categoria =
  | "ventanas"
  | "puertas"
  | "baldosas"
  | "techos"
  | "ladrillo"
  | "cemento"
  | "sanitarios"
  | "pintura"
  | "herramientas"
  | "ferreteria";

export interface Product {
  slug: string;
  nombre: string;
  categoria: Categoria;
  precioCOP: number;
  unidad: string;
  descripcion: string;
  imagenColor: string; // color de fondo detrás del ícono de categoría, mientras no hay fotografía real
  destacado?: boolean;
}

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: "ventanas", label: "Ventanas" },
  { value: "puertas", label: "Puertas" },
  { value: "baldosas", label: "Baldosas" },
  { value: "techos", label: "Techos" },
  { value: "ladrillo", label: "Ladrillo" },
  { value: "cemento", label: "Cemento" },
  { value: "sanitarios", label: "Sanitarios" },
  { value: "pintura", label: "Pintura" },
  { value: "herramientas", label: "Herramientas" },
  { value: "ferreteria", label: "Ferretería" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "ventana-aluminio-corrediza-120",
    nombre: "Ventana de aluminio corrediza 120x100",
    categoria: "ventanas",
    precioCOP: 420000,
    unidad: "unidad",
    descripcion:
      "Ventana corrediza en aluminio natural con vidrio templado de 4mm. Ideal para reposición de vanos en vivienda de interés social.",
    imagenColor: "#3d5a73",
    destacado: true,
  },
  {
    slug: "puerta-madera-solida-90",
    nombre: "Puerta en madera sólida 90x210",
    categoria: "puertas",
    precioCOP: 380000,
    unidad: "unidad",
    descripcion:
      "Puerta entamborada en madera de pino, marco incluido. Lista para instalar en fachada o interior.",
    imagenColor: "#8b6f47",
  },
  {
    slug: "baldosa-ceramica-antideslizante",
    nombre: "Baldosa cerámica antideslizante 33x33",
    categoria: "baldosas",
    precioCOP: 28000,
    unidad: "m²",
    descripcion:
      "Baldosa de piso cerámico antideslizante, tono arcilla. Vendida por metro cuadrado.",
    imagenColor: "#a85c3e",
  },
  {
    slug: "teja-fibrocemento-3.05",
    nombre: "Teja de fibrocemento 3.05m",
    categoria: "techos",
    precioCOP: 95000,
    unidad: "unidad",
    descripcion:
      "Teja ondulada de fibrocemento, calibre estándar para vivienda. Resistente a granizo.",
    imagenColor: "#6b6259",
    destacado: true,
  },
  {
    slug: "ladrillo-tolete-x100",
    nombre: "Ladrillo tolete común (paquete x100)",
    categoria: "ladrillo",
    precioCOP: 150000,
    unidad: "paquete x100",
    descripcion:
      "Ladrillo tolete de arcilla cocida para muro estructural. Paquete de 100 unidades.",
    imagenColor: "#a85c3e",
    destacado: true,
  },
  {
    slug: "cemento-gris-50kg",
    nombre: "Cemento gris tipo UG 50kg",
    categoria: "cemento",
    precioCOP: 32000,
    unidad: "bulto 50kg",
    descripcion:
      "Cemento gris de uso general, ideal para mampostería, pañetes y fundida de placas.",
    imagenColor: "#6b6259",
  },
  {
    slug: "sanitario-ahorrador-blanco",
    nombre: "Sanitario ahorrador blanco",
    categoria: "sanitarios",
    precioCOP: 265000,
    unidad: "unidad",
    descripcion:
      "Sanitario de doble descarga, bajo consumo de agua, incluye tapa.",
    imagenColor: "#e8e3da",
  },
  {
    slug: "pintura-vinilo-blanco-galon",
    nombre: "Pintura vinilo tipo 1 blanco (galón)",
    categoria: "pintura",
    precioCOP: 68000,
    unidad: "galón",
    descripcion: "Pintura vinilo tipo 1 para interior y exterior, alto cubrimiento.",
    imagenColor: "#f5f1e8",
  },
  {
    slug: "kit-herramienta-basica-albanileria",
    nombre: "Kit básico de herramienta de albañilería",
    categoria: "herramientas",
    precioCOP: 145000,
    unidad: "kit",
    descripcion:
      "Palustre, plomada, nivel, cordel y flexómetro. Lo esencial para levantar un muro.",
    imagenColor: "#3d3833",
  },
  {
    slug: "ventana-madera-fija-80",
    nombre: "Ventana en madera fija 80x60",
    categoria: "ventanas",
    precioCOP: 210000,
    unidad: "unidad",
    descripcion: "Ventana fija en madera inmunizada con vidrio sencillo de 3mm.",
    imagenColor: "#8b6f47",
  },
  {
    slug: "puerta-metalica-seguridad",
    nombre: "Puerta metálica de seguridad 90x210",
    categoria: "puertas",
    precioCOP: 520000,
    unidad: "unidad",
    descripcion: "Puerta en lámina calibre 20 con marco reforzado y cerradura de tres puntos.",
    imagenColor: "#3d3833",
  },
  {
    slug: "teja-zinc-2.44",
    nombre: "Teja de zinc 2.44m",
    categoria: "techos",
    precioCOP: 58000,
    unidad: "unidad",
    descripcion: "Teja ondulada en zinc calibre 34, liviana y de instalación rápida.",
    imagenColor: "#b8afa3",
  },
  {
    slug: "puntillas-2-pulgadas-caja",
    nombre: "Puntillas de 2 pulgadas (caja x1000)",
    categoria: "ferreteria",
    precioCOP: 8500,
    unidad: "caja x1000",
    descripcion: "Puntillas de acero para estructuras en madera. Caja de 1000 unidades.",
    imagenColor: "#6b6259",
  },
  {
    slug: "tornillos-autoperforantes-caja",
    nombre: "Tornillos autoperforantes (caja x100)",
    categoria: "ferreteria",
    precioCOP: 9200,
    unidad: "caja x100",
    descripcion: "Tornillos autoperforantes para lámina y madera, cabeza hexagonal.",
    imagenColor: "#8b6f47",
  },
  {
    slug: "alambre-negro-calibre-18",
    nombre: "Alambre negro calibre 18 (rollo 1kg)",
    categoria: "ferreteria",
    precioCOP: 7500,
    unidad: "rollo 1kg",
    descripcion: "Alambre negro recocido para amarre de hierro en mampostería y refuerzo.",
    imagenColor: "#3d3833",
  },
  {
    slug: "guantes-carnaza-par",
    nombre: "Guantes de carnaza (par)",
    categoria: "ferreteria",
    precioCOP: 9800,
    unidad: "par",
    descripcion: "Guantes de protección en carnaza para trabajo de albañilería y obra.",
    imagenColor: "#a85c3e",
  },
  {
    slug: "silicona-transparente-tubo",
    nombre: "Silicona transparente (tubo)",
    categoria: "ferreteria",
    precioCOP: 9500,
    unidad: "tubo",
    descripcion: "Sellador de silicona transparente para vidrio, sanitarios y acabados.",
    imagenColor: "#e8e3da",
  },
  {
    slug: "brocha-2-pulgadas",
    nombre: "Brocha de 2 pulgadas",
    categoria: "ferreteria",
    precioCOP: 6200,
    unidad: "unidad",
    descripcion: "Brocha de cerda natural para pintura de acabados e interiores.",
    imagenColor: "#8b6f47",
  },
  {
    slug: "cinta-metrica-5m",
    nombre: "Cinta métrica 5m",
    categoria: "ferreteria",
    precioCOP: 9900,
    unidad: "unidad",
    descripcion: "Flexómetro de 5 metros con carcasa reforzada, uso diario de obra.",
    imagenColor: "#e8b23d",
  },
  {
    slug: "lija-madera-pliego",
    nombre: "Lija para madera (pliego)",
    categoria: "ferreteria",
    precioCOP: 3500,
    unidad: "pliego",
    descripcion: "Lija de grano medio para acabado y preparación de superficies en madera.",
    imagenColor: "#c98868",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategoria(categoria: Categoria | "todas"): Product[] {
  if (categoria === "todas") return PRODUCTS;
  return PRODUCTS.filter((p) => p.categoria === categoria);
}

/** Cuánto del avance de la casa (en puntos %) representa comprar 1 unidad de este producto. */
export function aportePorcentualCasa(product: Product, metaCOP: number): number {
  return (product.precioCOP / metaCOP) * 100;
}
