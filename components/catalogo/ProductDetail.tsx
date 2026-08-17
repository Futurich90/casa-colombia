"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/data/products";
import { aportePorcentualCasa } from "@/data/products";
import { formatCOP } from "@/lib/format";
import { config } from "@/lib/config";
import { fadeUp, staggerContainer, windowFade } from "@/lib/motion";
import { useCartStore } from "@/store/useCartStore";
import { isLightColor } from "@/lib/color";
import { CategoryIcon } from "./CategoryIcon";

export function ProductDetail({ product }: { product: Product }) {
  const [cantidad, setCantidad] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const aporte = aportePorcentualCasa(product, config.metaCOP) * cantidad;
  const iconColor = isLightColor(product.imagenColor)
    ? "var(--color-cemento-900)"
    : "var(--color-cal-050)";

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/catalogo"
        className="mb-8 inline-block font-sans text-sm text-[var(--color-cemento-500)] hover:text-[var(--color-arcilla-700)]"
      >
        ← Volver al catálogo
      </Link>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-12 md:grid-cols-2"
      >
        <motion.div
          variants={windowFade}
          layoutId={`imagen-${product.slug}`}
          className="flex aspect-[4/3] w-full items-center justify-center rounded-sm"
          style={{ backgroundColor: product.imagenColor }}
        >
          <CategoryIcon categoria={product.categoria} className="h-32 w-32 opacity-90" style={{ color: iconColor }} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="mb-2 font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-arcilla-700)]">
            {product.categoria}
          </p>
          <motion.h1
            layoutId={`titulo-${product.slug}`}
            className="mb-4 font-[family-name:var(--font-display)] text-[var(--font-size-2xl)] font-semibold tracking-tight text-[var(--color-cemento-900)]"
          >
            {product.nombre}
          </motion.h1>
          <p className="mb-6 font-sans leading-relaxed text-[var(--color-cemento-700)]">
            {product.descripcion}
          </p>

          <div className="mb-1 font-[family-name:var(--font-display)] text-[var(--font-size-xl)] font-semibold text-[var(--color-cemento-900)]">
            {formatCOP(product.precioCOP)}{" "}
            <span className="font-sans text-sm font-normal text-[var(--color-cemento-500)]">
              / {product.unidad}
            </span>
          </div>
          <p className="mb-6 font-sans text-xs text-[var(--color-cemento-500)]">
            Precio de referencia en el mercado — no es un pedido que te llega a casa.
          </p>

          <div className="mb-6 flex items-center gap-4">
            <label htmlFor="cantidad" className="font-sans text-sm text-[var(--color-cemento-700)]">
              Cantidad de referencia
            </label>
            <input
              id="cantidad"
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
              className="w-20 rounded border border-[var(--color-cemento-300)] px-3 py-2 font-sans text-sm"
            />
          </div>

          <p className="mb-6 font-sans text-sm text-[var(--color-arcilla-700)]">
            Donar este monto aporta {aporte < 0.01 ? "<0.01" : aporte.toFixed(2)}% a Mi Casa Colombia
          </p>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => addItem(product, cantidad)}
            className="rounded-full bg-[var(--color-arcilla-500)] px-6 py-3 font-sans text-sm font-semibold text-[var(--color-cal-050)] transition-colors hover:bg-[var(--color-arcilla-700)]"
          >
            Sumar a mi donación
          </motion.button>
          <p className="mt-3 font-sans text-xs text-[var(--color-cemento-500)]">
            No estás comprando este material — donas su valor de mercado para
            que familias afectadas por el terremoto reconstruyan su casa.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
