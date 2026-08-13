"use client";

import { useState } from "react";
import { CasaColombia } from "@/components/casa-colombia/CasaColombia";
import { STAGES } from "@/components/casa-colombia/stages";

export default function CasaDevPage() {
  const [progress, setProgress] = useState(0);

  const etapaActual = STAGES.find((s) => progress >= s.start && progress <= s.end);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-cal-050">
      <div className="w-full max-w-2xl">
        <CasaColombia progress={progress} className="w-full h-auto" />
      </div>

      <div className="w-full max-w-xl flex flex-col gap-3">
        <div className="flex items-center justify-between font-sans text-sm text-[var(--color-cemento-700)]">
          <span>Progreso: {progress}%</span>
          <span>{etapaActual?.label ?? ""}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full accent-[var(--color-arcilla-500)]"
          aria-label="Progreso de la meta"
        />
        <div className="flex gap-1 flex-wrap font-sans text-xs text-[var(--color-cemento-500)]">
          {STAGES.map((s) => (
            <button
              key={s.key}
              onClick={() => setProgress(s.start)}
              className="px-2 py-1 border border-[var(--color-cemento-300)] rounded hover:bg-[var(--color-cal-100)]"
            >
              {s.label} ({s.start}%)
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
