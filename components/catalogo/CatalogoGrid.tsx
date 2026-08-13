"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIAS, PRODUCTS, type Categoria } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { staggerContainer } from "@/lib/motion";

/**
 * Patrón editorial: alterna anchos de columna y desplazamientos verticales
 * para romper la retícula de "tres tarjetas iguales". El primer producto
 * destacado de cada tanda de 7 ocupa doble ancho.
 */
function layoutFor(index: number, destacado: boolean) {
  if (destacado && index % 5 === 0) {
    return { span: "sm:col-span-2 lg:col-span-4", offset: "" };
  }
  const cycle = index % 4;
  const spans = ["lg:col-span-2", "lg:col-span-3", "lg:col-span-2", "lg:col-span-3"];
  const offsets = ["", "lg:mt-14", "lg:mt-6", ""];
  return { span: spans[cycle], offset: offsets[cycle] };
}

export function CatalogoGrid() {
  const [categoria, setCategoria] = useState<Categoria | "todas">("todas");

  const productos =
    categoria === "todas" ? PRODUCTS : PRODUCTS.filter((p) => p.categoria === categoria);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        <FiltroBoton
          activo={categoria === "todas"}
          onClick={() => setCategoria("todas")}
          label="Todas"
        />
        {CATEGORIAS.map((c) => (
          <FiltroBoton
            key={c.value}
            activo={categoria === c.value}
            onClick={() => setCategoria(c.value)}
            label={c.label}
          />
        ))}
      </div>

      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-4 lg:grid-cols-6"
      >
        <AnimatePresence mode="popLayout">
          {productos.map((product, index) => {
            const { span, offset } = layoutFor(index, Boolean(product.destacado));
            return (
              <ProductCard
                key={product.slug}
                product={product}
                featured={Boolean(product.destacado) && index % 5 === 0}
                spanClassName={`col-span-2 ${span}`}
                offsetClassName={offset}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FiltroBoton({
  activo,
  onClick,
  label,
}: {
  activo: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors ${
        activo
          ? "border-[var(--color-arcilla-500)] bg-[var(--color-arcilla-500)] text-[var(--color-cal-050)]"
          : "border-[var(--color-cemento-300)] text-[var(--color-cemento-700)] hover:border-[var(--color-arcilla-500)]"
      }`}
      aria-pressed={activo}
    >
      {label}
    </button>
  );
}
