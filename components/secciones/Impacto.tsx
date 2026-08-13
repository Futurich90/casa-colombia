"use client";

import { motion } from "motion/react";
import { config } from "@/lib/config";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Impacto() {
  return (
    <section
      id="impacto"
      className="relative overflow-hidden bg-[var(--color-cemento-900)] py-24 text-[var(--color-cal-050)]"
    >
      {/* Puente visual: la sección clara no cae de golpe al negro */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-cal-050)] to-transparent"
      />
      <div aria-hidden className="textura-grano pointer-events-none absolute inset-0" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 mx-auto max-w-6xl px-6"
      >
        <motion.h2
          variants={fadeUp}
          className="mb-4 font-[family-name:var(--font-display)] text-[var(--font-size-2xl)] font-semibold tracking-tight"
        >
          Impacto
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mb-12 max-w-xl font-sans leading-relaxed text-[var(--color-cemento-300)]"
        >
          El terremoto de agosto de 2026 dejó comunidades enteras sin
          vivienda. Esto es a dónde llega tu compra.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div variants={fadeUp}>
            <h3 className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-[var(--color-arcilla-300)]">
              Zonas beneficiadas
            </h3>
            <ul className="flex flex-col gap-2 font-sans text-[var(--color-cal-100)]">
              {config.zonasAfectadas.map((z) => (
                <li key={z.municipio} className="flex justify-between border-b border-[var(--color-cemento-700)] py-2">
                  <span>{z.municipio}</span>
                  <span className="text-[var(--color-cemento-300)]">{z.departamento}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="mb-4 font-sans text-sm uppercase tracking-[0.2em] text-[var(--color-arcilla-300)]">
              Transparencia
            </h3>
            <p className="mb-4 font-sans leading-relaxed text-[var(--color-cemento-300)]">
              Esta plataforma no vende ni envía materiales. Te mostramos su
              precio real de mercado para que sepas qué representa tu aporte,
              y el 100% de lo que donas se transfiere directamente a la
              campaña oficial en VAKI — sin comisiones ni intermediarios.
            </p>
            <a
              href={config.vakiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold text-[var(--color-acento-amarillo-500)] hover:underline"
            >
              Ver la campaña en VAKI →
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
