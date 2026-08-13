import type { CSSProperties } from "react";
import type { Categoria } from "@/data/products";

interface CategoryIconProps {
  categoria: Categoria;
  className?: string;
  style?: CSSProperties;
}

/**
 * Ilustraciones propias tipo plano técnico, una por categoría. No hay
 * fotografía de producto todavía; esto sostiene la identidad visual del
 * catálogo sin depender de imágenes de terceros. Reemplazar por fotos
 * reales cuando existan es tan simple como cambiar lo que renderiza
 * ProductCard/ProductDetail para esa categoría.
 */
export function CategoryIcon({ categoria, className, style }: CategoryIconProps) {
  const props = {
    className,
    style,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (categoria) {
    case "ventanas":
      return (
        <svg {...props}>
          <rect x="10" y="8" width="28" height="32" rx="1" />
          <line x1="24" y1="8" x2="24" y2="40" />
          <line x1="10" y1="24" x2="38" y2="24" />
        </svg>
      );
    case "puertas":
      return (
        <svg {...props}>
          <rect x="14" y="6" width="20" height="38" rx="1" />
          <circle cx="29" cy="26" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "baldosas":
      return (
        <svg {...props}>
          <rect x="8" y="8" width="15" height="15" />
          <rect x="25" y="8" width="15" height="15" />
          <rect x="8" y="25" width="15" height="15" />
          <rect x="25" y="25" width="15" height="15" />
        </svg>
      );
    case "techos":
      return (
        <svg {...props}>
          <path d="M6 32 L24 10 L42 32" />
          <line x1="14" y1="32" x2="14" y2="24.5" />
          <line x1="24" y1="32" x2="24" y2="17" />
          <line x1="34" y1="32" x2="34" y2="24.5" />
        </svg>
      );
    case "ladrillo":
      return (
        <svg {...props}>
          <rect x="6" y="14" width="15" height="9" />
          <rect x="27" y="14" width="15" height="9" />
          <rect x="16.5" y="25" width="15" height="9" />
          <rect x="-2" y="25" width="12" height="9" />
          <rect x="38" y="25" width="12" height="9" />
        </svg>
      );
    case "cemento":
      return (
        <svg {...props}>
          <path d="M15 10 H33 L37 39 A2 2 0 0 1 35 41 H13 A2 2 0 0 1 11 39 Z" />
          <line x1="19" y1="10" x2="19" y2="5" />
          <line x1="29" y1="10" x2="29" y2="5" />
          <line x1="14" y1="24" x2="34" y2="24" />
        </svg>
      );
    case "sanitarios":
      return (
        <svg {...props}>
          <rect x="15" y="7" width="18" height="13" rx="3" />
          <ellipse cx="24" cy="33" rx="13" ry="8" />
          <path d="M14 30 A10 10 0 0 1 34 30" />
        </svg>
      );
    case "pintura":
      return (
        <svg {...props}>
          <rect x="8" y="19" width="15" height="19" rx="1.5" />
          <path d="M9 19 L18 8 H23 L23 19" />
          <rect x="27" y="15" width="4.5" height="18" rx="2" />
          <line x1="31.5" y1="17" x2="40" y2="10" />
        </svg>
      );
    case "herramientas":
      return (
        <svg {...props}>
          <rect x="20" y="7" width="16" height="10" rx="1.5" />
          <line x1="25" y1="16" x2="12" y2="41" strokeWidth="2.5" />
        </svg>
      );
    case "ferreteria":
      return (
        <svg {...props}>
          <ellipse cx="24" cy="9" rx="8" ry="2.6" />
          <line x1="24" y1="11" x2="24" y2="35" />
          <path d="M19 35 L24 43 L29 35 Z" />
        </svg>
      );
    default:
      return null;
  }
}
