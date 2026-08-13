import { create } from "zustand";
import { config } from "@/lib/config";
import { fetchRecaudadoCOP, MOCK_RECAUDADO_INICIAL_COP } from "@/lib/campaign";

interface CasaState {
  recaudadoCOP: number;
  /** Monto que se acaba de sumar, usado para disparar la micro-celebración. Se limpia después de mostrarla. */
  ultimoAporteCOP: number | null;
  progress: number;
  cargarRecaudado: () => Promise<void>;
  registrarAporte: (montoCOP: number) => void;
  limpiarUltimoAporte: () => void;
}

function progresoDesde(recaudadoCOP: number): number {
  return Math.min(100, (recaudadoCOP / config.metaCOP) * 100);
}

export const useCasaStore = create<CasaState>((set) => ({
  recaudadoCOP: MOCK_RECAUDADO_INICIAL_COP,
  ultimoAporteCOP: null,
  progress: progresoDesde(MOCK_RECAUDADO_INICIAL_COP),

  cargarRecaudado: async () => {
    const recaudadoCOP = await fetchRecaudadoCOP();
    set({ recaudadoCOP, progress: progresoDesde(recaudadoCOP) });
  },

  registrarAporte: (montoCOP) =>
    set((state) => {
      const recaudadoCOP = state.recaudadoCOP + montoCOP;
      return {
        recaudadoCOP,
        progress: progresoDesde(recaudadoCOP),
        ultimoAporteCOP: montoCOP,
      };
    }),

  limpiarUltimoAporte: () => set({ ultimoAporteCOP: null }),
}));
