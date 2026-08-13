"use client";

import { useEffect, useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { springProgress } from "@/lib/motion";
import { Brick } from "./Brick";
import { Tile } from "./Tile";
import { Opening } from "./Opening";
import { STAGES } from "./stages";

interface CasaColombiaProps {
  /** Progreso de la meta, 0 a 100. */
  progress: number;
  className?: string;
}

const [TERRENO, CIMENTACION, MUROS, ABERTURAS, TECHO, TEJAS, VIDA] = STAGES;

// Geometría base (viewBox 800x600)
const GROUND_Y = 480;
const WALL_X = 250;
const WALL_W = 300;
const WALL_TOP = 320;
const WALL_BOTTOM = 460;
const ROOF_APEX = { x: 400, y: 220 };

const BRICK_ROWS = 4;
const BRICK_COLS = 10;
const BRICK_W = WALL_W / BRICK_COLS;
const BRICK_H = (WALL_BOTTOM - WALL_TOP) / BRICK_ROWS;

const TILES_PER_SIDE = 5;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function CasaColombia({ progress, className }: CasaColombiaProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const glowFilterId = `ventana-glow-blur-${useId()}`;
  const progressMV = useMotionValue(progress);

  useEffect(() => {
    progressMV.set(progress);
  }, [progress, progressMV]);

  const smoothedProgress = useSpring(
    progressMV,
    reducedMotion ? { stiffness: 1000, damping: 100 } : springProgress,
  );

  // Terreno: replanteo (líneas guía) — aparece y se retira cuando empieza la cimentación
  const terrenoOpacity = useTransform(
    smoothedProgress,
    [TERRENO.start, TERRENO.end, CIMENTACION.end],
    [0, 1, 0],
  );

  // Cimentación: crece desde el piso (transform, no height)
  const cimentacionScale = useTransform(
    smoothedProgress,
    [CIMENTACION.start, CIMENTACION.end],
    [0, 1],
  );

  // Estructura del techo: fade + scale desde el centro de la cumbrera
  const techoAppear = useTransform(
    smoothedProgress,
    [TECHO.start, TECHO.end],
    [0, 1],
  );

  // Luz y vida: ventanas encendidas + humo
  const vidaAppear = useTransform(smoothedProgress, [VIDA.start, VIDA.end], [0, 1]);

  const roofScale = useTransform(techoAppear, [0, 1], [0.85, 1]);

  // Cielo: amanece a medida que la casa avanza (tinte muy sutil, no una caja opaca)
  const cieloDia = useTransform(smoothedProgress, [0, 100], [0, 1]);
  const cieloTinte = useTransform(cieloDia, (v) => v * 0.12);

  const bricks = Array.from({ length: BRICK_ROWS * BRICK_COLS }, (_, i) => {
    const row = Math.floor(i / BRICK_COLS); // 0 = fila superior
    const col = i % BRICK_COLS;
    const rowFromBottom = BRICK_ROWS - 1 - row;
    const order = rowFromBottom * BRICK_COLS + col; // se construye de abajo hacia arriba
    const t =
      MUROS.start +
      (order / (BRICK_ROWS * BRICK_COLS - 1)) * (MUROS.end - MUROS.start - 3);
    return {
      key: `brick-${i}`,
      x: WALL_X + col * BRICK_W,
      y: WALL_TOP + row * BRICK_H,
      w: BRICK_W - 2,
      h: BRICK_H - 2,
      threshold: t,
    };
  });

  const roofEaveLeft = { x: WALL_X - 20, y: WALL_TOP };
  const roofEaveRight = { x: WALL_X + WALL_W + 20, y: WALL_TOP };
  const chimneyBase = {
    x: lerp(ROOF_APEX.x, roofEaveRight.x, 0.4),
    y: lerp(ROOF_APEX.y, roofEaveRight.y, 0.4),
  };

  const tiles = Array.from({ length: TILES_PER_SIDE * 2 }, (_, order) => {
    const side: "left" | "right" = order % 2 === 0 ? "left" : "right";
    const i = Math.floor(order / 2);
    const localT = (i + 0.5) / TILES_PER_SIDE; // 0 (alero) a 1 (cumbrera)

    const [from, to] =
      side === "left" ? [roofEaveLeft, ROOF_APEX] : [ROOF_APEX, roofEaveRight];
    const x = lerp(from.x, to.x, side === "left" ? localT : 1 - localT);
    const y = lerp(from.y, to.y, side === "left" ? localT : 1 - localT);

    const t = TEJAS.start + (order / (TILES_PER_SIDE * 2 - 1)) * (TEJAS.end - TEJAS.start - 2);
    return {
      key: `tile-${side}-${i}`,
      x: x - 17,
      y: y - 7,
      w: 34,
      h: 14,
      rotate: side === "left" ? -32 : 32,
      threshold: t,
    };
  });

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      role="img"
      aria-label={`Casa Colombia en construcción, ${Math.round(progress)}% de la meta alcanzado`}
    >
      <defs>
        <filter id={glowFilterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/*
        Sin fondo de cielo opaco a propósito: la casa vive dentro de la
        escena que la envuelve (el Hero, o el fondo de la página de prueba),
        no dentro de su propia caja. Solo un tinte cálido muy sutil marca el
        amanecer a medida que avanza el progreso.
      */}
      <motion.rect
        x={0}
        y={0}
        width={800}
        height={600}
        fill="var(--color-acento-amarillo-300)"
        style={{ opacity: reducedMotion ? cieloTinte.get() : cieloTinte }}
      />

      {/* Suelo */}
      <rect x={0} y={GROUND_Y} width={800} height={600 - GROUND_Y} fill="var(--color-cemento-500)" opacity={0.25} />

      {/*
        Plano de referencia: la silueta completa de la casa, siempre presente
        desde 0%. Es lo que falta por construir — a medida que cada etapa
        aparece con su propio elemento sólido, va tapando el trazo punteado
        que está debajo. Nunca se anima ni se oculta.
      */}
      <g
        aria-hidden
        fill="none"
        stroke="var(--color-cemento-500)"
        strokeWidth={1.5}
        strokeDasharray="5 5"
        opacity={0.4}
      >
        <rect x={WALL_X - 10} y={WALL_BOTTOM} width={WALL_W + 20} height={GROUND_Y - WALL_BOTTOM} />
        <rect x={WALL_X} y={WALL_TOP} width={WALL_W} height={WALL_BOTTOM - WALL_TOP} />
        <rect x={WALL_X + 24} y={WALL_TOP + 20} width={54} height={54} />
        <rect x={WALL_X + WALL_W - 78} y={WALL_TOP + 20} width={54} height={54} />
        <rect x={WALL_X + WALL_W / 2 - 30} y={WALL_BOTTOM - 90} width={60} height={90} />
        <path d={`M${roofEaveLeft.x} ${roofEaveLeft.y} L${ROOF_APEX.x} ${ROOF_APEX.y} L${roofEaveRight.x} ${roofEaveRight.y}`} />
        <rect x={chimneyBase.x - 9} y={chimneyBase.y - 42} width={18} height={44} />
      </g>

      {/* Etapa 1 — Terreno y replanteo */}
      <motion.g style={{ opacity: reducedMotion ? terrenoOpacity.get() : terrenoOpacity }}>
        <line x1={200} y1={GROUND_Y} x2={600} y2={GROUND_Y} stroke="var(--color-cemento-700)" strokeWidth={2} strokeDasharray="4 6" />
        {[220, 400, 580].map((x) => (
          <g key={x}>
            <line x1={x} y1={GROUND_Y} x2={x} y2={GROUND_Y - 26} stroke="var(--color-madera-500)" strokeWidth={3} />
            <line x1={x - 14} y1={GROUND_Y - 26} x2={x + 14} y2={GROUND_Y - 26} stroke="var(--color-madera-500)" strokeWidth={2} />
          </g>
        ))}
      </motion.g>

      {/* Etapa 2 — Cimentación */}
      <motion.rect
        x={WALL_X - 10}
        y={WALL_BOTTOM}
        width={WALL_W + 20}
        height={GROUND_Y - WALL_BOTTOM}
        fill="var(--color-cemento-500)"
        style={{
          scaleY: reducedMotion ? cimentacionScale.get() : cimentacionScale,
          transformOrigin: `${WALL_X + WALL_W / 2}px ${GROUND_Y}px`,
        }}
      />

      {/* Etapa 3 — Muros en ladrillo */}
      {bricks.map((b) => (
        <Brick
          key={b.key}
          smoothedProgress={smoothedProgress}
          threshold={b.threshold}
          x={b.x}
          y={b.y}
          w={b.w}
          h={b.h}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Etapa 4 — Ventanas y puertas */}
      <Opening
        smoothedProgress={smoothedProgress}
        start={ABERTURAS.start}
        end={ABERTURAS.end}
        x={WALL_X + 24}
        y={WALL_TOP + 20}
        w={54}
        h={54}
        variant="ventana"
        reducedMotion={reducedMotion}
        glow={vidaAppear}
        glowFilterId={glowFilterId}
      />
      <Opening
        smoothedProgress={smoothedProgress}
        start={ABERTURAS.start}
        end={ABERTURAS.end}
        x={WALL_X + WALL_W - 78}
        y={WALL_TOP + 20}
        w={54}
        h={54}
        variant="ventana"
        reducedMotion={reducedMotion}
        glow={vidaAppear}
        glowFilterId={glowFilterId}
      />
      <Opening
        smoothedProgress={smoothedProgress}
        start={ABERTURAS.start + 4}
        end={ABERTURAS.end}
        x={WALL_X + WALL_W / 2 - 30}
        y={WALL_BOTTOM - 90}
        w={60}
        h={90}
        variant="puerta"
        reducedMotion={reducedMotion}
      />

      {/* Etapa 5 — Estructura del techo */}
      <motion.g
        style={{
          opacity: reducedMotion ? techoAppear.get() : techoAppear,
          scale: reducedMotion ? 1 : roofScale,
          transformOrigin: `${ROOF_APEX.x}px ${WALL_TOP}px`,
        }}
      >
        <line x1={WALL_X - 20} y1={WALL_TOP} x2={ROOF_APEX.x} y2={ROOF_APEX.y} stroke="var(--color-madera-700)" strokeWidth={5} />
        <line x1={WALL_X + WALL_W + 20} y1={WALL_TOP} x2={ROOF_APEX.x} y2={ROOF_APEX.y} stroke="var(--color-madera-700)" strokeWidth={5} />
        <line x1={WALL_X - 20} y1={WALL_TOP} x2={WALL_X + WALL_W + 20} y2={WALL_TOP} stroke="var(--color-madera-700)" strokeWidth={4} />
      </motion.g>

      {/* Etapa 6 — Tejas y acabados */}
      {tiles.map((t) => (
        <Tile
          key={t.key}
          smoothedProgress={smoothedProgress}
          threshold={t.threshold}
          x={t.x}
          y={t.y}
          w={t.w}
          h={t.h}
          rotate={t.rotate}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Chimenea: se levanta con la estructura del techo, apoyada en el faldón derecho */}
      <motion.rect
        x={chimneyBase.x - 9}
        y={chimneyBase.y - 42}
        width={18}
        height={44}
        fill="var(--color-cemento-700)"
        style={{ opacity: reducedMotion ? techoAppear.get() : techoAppear }}
      />

      {/* Etapa 7 — La casa vive: humo */}
      <Smoke
        vidaAppear={vidaAppear}
        reducedMotion={reducedMotion}
        originX={chimneyBase.x}
        originY={chimneyBase.y - 44}
      />
    </svg>
  );
}

function Smoke({
  vidaAppear,
  reducedMotion,
  originX,
  originY,
}: {
  vidaAppear: ReturnType<typeof useTransform<number, number>>;
  reducedMotion: boolean;
  originX: number;
  originY: number;
}) {
  const baseOpacity = useTransform(vidaAppear, [0, 1], [0, 0.6]);

  if (reducedMotion) {
    return (
      <circle cx={originX} cy={originY - 20} r={6} fill="var(--color-cemento-300)" opacity={0.4} />
    );
  }

  return (
    <motion.g style={{ opacity: baseOpacity }}>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={6}
          fill="var(--color-cemento-300)"
          initial={{ cx: originX, cy: originY, opacity: 0 }}
          animate={{
            cy: [originY, originY - 60],
            opacity: [0, 0.5, 0],
            cx: [originX, originX + (i % 2 === 0 ? 10 : -10)],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.g>
  );
}
