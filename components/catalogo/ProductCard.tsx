"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/data/products";
import { formatCOP } from "@/lib/format";
import { config } from "@/lib/config";
import { aportePorcentualCasa } from "@/data/products";
import { fadeUp } from "@/lib/motion";
import { isLightColor } from "@/lib/color";
import { CategoryIcon } from "./CategoryIcon";

interface ProductCardProps {
  product: Product;
  /** Tarjeta grande, ocupa más columnas en el grid editorial. */
  featured?: boolean;
  /** Desplazamiento vertical para romper la retícula (aire asimétrico). */
  offsetClassName?: string;
  spanClassName?: string;
}

export function ProductCard({
  product,
  featured = false,
  offsetClassName = "",
  spanClassName = "",
}: ProductCardProps) {
  const aporte = aportePorcentualCasa(product, config.metaCOP);
  const iconColor = isLightColor(product.imagenColor)
    ? "var(--color-cemento-900)"
    : "var(--color-cal-050)";

  return (
    <motion.div layout variants={fadeUp} className={`group ${spanClassName} ${offsetClassName}`}>
      <Link href={`/producto/${product.slug}`} className="block">
        <motion.div
          layoutId={`imagen-${product.slug}`}
          className={`relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-sm ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}
          style={{ backgroundColor: product.imagenColor }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1.5px, transparent 1.5px, transparent 13px)",
            }}
          />
          <CategoryIcon
            categoria={product.categoria}
            className={`relative opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.06] ${
              featured ? "h-24 w-24" : "h-16 w-16"
            }`}
            style={{ color: iconColor }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(0,0,0,0.08), inset 0 -28px 36px -24px rgba(0,0,0,0.22)",
            }}
          />
          <span className="absolute bottom-3 left-3 rounded-sm bg-[var(--color-cal-050)]/85 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[var(--color-cemento-700)]">
            {product.categoria}
          </span>
        </motion.div>
        <motion.h3
          layoutId={`titulo-${product.slug}`}
          className={`mb-1 font-[family-name:var(--font-display)] font-semibold text-[var(--color-cemento-900)] ${
            featured ? "text-[var(--font-size-xl)]" : "text-[var(--font-size-lg)]"
          }`}
        >
          {product.nombre}
        </motion.h3>
        <p className="mb-2 font-sans text-sm text-[var(--color-cemento-500)]">
          {formatCOP(product.precioCOP)} / {product.unidad}
        </p>
        <p className="font-sans text-xs text-[var(--color-arcilla-700)]">
          Aporta {aporte < 0.01 ? "<0.01" : aporte.toFixed(2)}% a Mi Casa Colombia
        </p>
      </Link>
    </motion.div>
  );
}
