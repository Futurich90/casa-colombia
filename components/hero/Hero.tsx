"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { CasaColombia } from "@/components/casa-colombia/CasaColombia";
import { AnimatedCounter } from "./AnimatedCounter";
import { CasaProgressExplorer } from "./CasaProgressExplorer";
import { useCasaStore } from "@/store/useCasaStore";
import { config } from "@/lib/config";
import { fadeUp, staggerContainer, revealMask, easeOut } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const recaudadoCOP = useCasaStore((s) => s.recaudadoCOP);
  const progress = useCasaStore((s) => s.progress);
  const cargarRecaudado = useCasaStore((s) => s.cargarRecaudado);
  const [preview, setPreview] = useState<number | null>(null);
  const displayProgress = preview ?? progress;

  useEffect(() => {
    cargarRecaudado();
  }, [cargarRecaudado]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const mountainsY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const casaY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const casaScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      className="textura-grano relative flex flex-col overflow-hidden md:min-h-[100svh]"
      aria-label="Mi Casa Colombia y el estado de la recaudación"
    >
      {/*
        Envoltorio de fondo fijado al alto del primer viewport (100svh), no al
        alto total de la sección: en móvil el contenido puede ser más alto que
        la pantalla y las capas "bottom" no deben perseguirlo.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[100svh] overflow-hidden md:block">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-cal-050)] to-[var(--color-cemento-100)]"
          style={{ y: reducedMotion ? 0 : skyY }}
        />
        <motion.svg
          aria-hidden
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-[32%] w-full opacity-70"
          style={{ y: reducedMotion ? 0 : mountainsY }}
        >
          <path d="M0 200 L120 90 L260 160 L400 60 L560 150 L680 100 L800 200 Z" fill="var(--color-cemento-300)" />
        </motion.svg>
      </div>

      {/*
        La casa: protagonista visual. En móvil vive en el flujo normal, arriba
        del texto — un overlay la habría tapado por completo en pantallas
        angostas. Desde md+ se convierte en un fondo grande desplazado a la
        derecha para no competir con el texto.
      */}
      <motion.div
        className="flex justify-center bg-gradient-to-b from-[var(--color-cal-050)] to-[var(--color-cemento-100)] pt-4 pb-2 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:justify-end md:bg-none md:pb-0 md:pt-0 md:pr-4 lg:pr-10"
        style={{
          y: reducedMotion ? 0 : casaY,
          scale: reducedMotion ? 1 : casaScale,
        }}
      >
        <CasaColombia
          progress={displayProgress}
          className="h-[54svh] w-full max-w-lg sm:h-[64svh] sm:max-w-xl md:h-[82svh] md:max-w-3xl lg:h-[92svh] lg:max-w-5xl"
        />
      </motion.div>

      {/* Contenido: en móvil sigue el flujo debajo de la casa; desde md+ flota como card sobre la escena */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pb-16 pt-6 sm:px-10 md:pt-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-md rounded-sm border border-[var(--color-cemento-300)]/60 bg-[var(--color-cal-050)] p-8 shadow-[0_8px_40px_-12px_rgba(28,26,23,0.25)] md:bg-[var(--color-cal-050)]/95 md:backdrop-blur-sm"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 font-sans text-sm uppercase tracking-[0.2em] text-[var(--color-arcilla-700)]"
          >
            Reconstruyamos juntos
          </motion.p>

          <div className="mb-5 overflow-hidden">
            <motion.h1
              variants={reducedMotion ? fadeUp : revealMask}
              transition={{ duration: 0.8, ease: easeOut }}
              className="font-[family-name:var(--font-display)] text-[var(--font-size-3xl)] font-semibold leading-[1.05] tracking-tight text-[var(--color-cemento-900)]"
            >
              Cada material que donas levanta Mi Casa Colombia
            </motion.h1>
          </div>

          <motion.p
            variants={fadeUp}
            className="mb-6 font-sans text-[var(--font-size-base)] leading-relaxed text-[var(--color-cemento-700)]"
          >
            Aquí ves cuánto cuestan en el mercado los materiales para
            reconstruir. No los compras ni te los enviamos: el 100% de tu
            aporte se dona directamente en la VAKI para que las familias
            afectadas reconstruyan su casa.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-7">
            <div className="font-sans text-sm text-[var(--color-cemento-500)]">
              Recaudado hasta ahora
            </div>
            <div className="font-[family-name:var(--font-display)] text-[var(--font-size-2xl)] font-semibold text-[var(--color-cemento-900)]">
              <AnimatedCounter value={recaudadoCOP} />
            </div>
            <div className="font-sans text-sm text-[var(--color-cemento-500)]">
              de la meta de {new Intl.NumberFormat("es-CO").format(config.metaCOP)} COP
            </div>
            <CasaProgressExplorer
              progress={progress}
              preview={preview}
              onPreviewChange={setPreview}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.div whileTap={{ scale: 0.96 }}>
              <Link
                href="/catalogo"
                className="block rounded-full bg-[var(--color-arcilla-500)] px-6 py-3 font-sans text-sm font-semibold text-[var(--color-cal-050)] transition-colors hover:bg-[var(--color-arcilla-700)]"
              >
                Elegir materiales y donar
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.96 }}>
              <a
                href={config.vakiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full border border-[var(--color-cemento-700)] px-6 py-3 font-sans text-sm font-semibold text-[var(--color-cemento-900)] transition-colors hover:border-[var(--color-arcilla-700)] hover:text-[var(--color-arcilla-700)]"
              >
                Donar directo a la VAKI
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
