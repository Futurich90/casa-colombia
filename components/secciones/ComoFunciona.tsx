"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const PASOS = [
  {
    numero: "01",
    titulo: "Eliges un material",
    texto: "Ves cuánto cuesta ese material en el mercado — ventanas, ladrillo, cemento, hasta puntillas. Es una referencia, no un pedido que te llega a casa.",
    span: "md:col-span-5",
    offset: "",
  },
  {
    numero: "02",
    titulo: "Donas ese valor en la VAKI",
    texto: "El 100% de lo que donas se transfiere directamente a la campaña oficial para las zonas afectadas por el terremoto.",
    span: "md:col-span-3",
    offset: "md:mt-20",
  },
  {
    numero: "03",
    titulo: "La Casa Colombia crece",
    texto: "Tu donación levanta una parte real de la casa: cimientos, muros, techo, hasta que la meta se cumple.",
    span: "md:col-span-4",
    offset: "md:mt-8",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={fadeUp}
          className="mb-16 max-w-lg font-[family-name:var(--font-display)] text-[var(--font-size-2xl)] font-semibold tracking-tight text-[var(--color-cemento-900)]"
        >
          Cómo funciona
        </motion.h2>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
          {PASOS.map((paso) => (
            <motion.div key={paso.numero} variants={fadeUp} className={`${paso.span} ${paso.offset}`}>
              <div className="mb-4 font-[family-name:var(--font-display)] text-[var(--font-size-xl)] font-semibold text-[var(--color-arcilla-500)]">
                {paso.numero}
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-display)] text-[var(--font-size-lg)] font-semibold text-[var(--color-cemento-900)]">
                {paso.titulo}
              </h3>
              <p className="font-sans leading-relaxed text-[var(--color-cemento-700)]">
                {paso.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
