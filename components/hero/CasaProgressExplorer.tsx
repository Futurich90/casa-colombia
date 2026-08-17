"use client";

interface CasaProgressExplorerProps {
  /** Progreso real de la meta, 0-100. */
  progress: number;
  /** Valor que se está previsualizando, o null si se está mostrando el real. */
  preview: number | null;
  onPreviewChange: (value: number | null) => void;
}

/**
 * Barra de progreso con marcador de "dónde vamos" + slider interactivo para
 * previsualizar cualquier etapa de la construcción, incluida la casa
 * completa. El marcador siempre representa el progreso real; el slider
 * puede alejarse de él para explorar, y se puede volver atrás en un click.
 */
export function CasaProgressExplorer({
  progress,
  preview,
  onPreviewChange,
}: CasaProgressExplorerProps) {
  const valorMostrado = preview ?? progress;
  const enVistaPrevia = preview !== null;

  return (
    <div className="mt-1">
      <div className="mb-1.5 flex items-center justify-between font-sans text-xs text-[var(--color-cemento-500)]">
        <span>
          {enVistaPrevia ? (
            <>Vista previa: <strong className="text-[var(--color-cemento-900)]">{Math.round(valorMostrado)}%</strong></>
          ) : (
            <>Vamos en <strong className="text-[var(--color-cemento-900)]">{progress.toFixed(1)}%</strong></>
          )}
        </span>
        {enVistaPrevia && (
          <button
            type="button"
            onClick={() => onPreviewChange(null)}
            className="font-semibold text-[var(--color-arcilla-700)] hover:underline"
          >
            Volver al progreso real
          </button>
        )}
      </div>

      <div className="relative mb-2 h-1.5 w-full overflow-visible rounded-full bg-[var(--color-cemento-100)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-cemento-300)]"
          style={{ width: `${progress}%` }}
        />
        {/* Marcador: siempre el progreso real, aunque se esté explorando otra cosa */}
        <div
          className="absolute top-1/2 h-3 w-[3px] -translate-y-1/2 rounded-full bg-[var(--color-cemento-900)]"
          style={{ left: `${progress}%` }}
          title={`Progreso real: ${progress.toFixed(1)}%`}
        />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={valorMostrado}
        onChange={(e) => onPreviewChange(Number(e.target.value))}
        className="w-full accent-[var(--color-arcilla-500)]"
        aria-label="Explorar cómo se vería la casa en distintas etapas"
      />

      <button
        type="button"
        onClick={() => onPreviewChange(100)}
        className="mt-1.5 font-sans text-xs font-semibold text-[var(--color-arcilla-700)] hover:underline"
      >
        Ver cómo se vería completa →
      </button>
    </div>
  );
}
