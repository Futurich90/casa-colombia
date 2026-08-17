"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCartStore, cartTotalCOP } from "@/store/useCartStore";
import { useCasaStore } from "@/store/useCasaStore";
import { config } from "@/lib/config";
import { formatCOP } from "@/lib/format";
import { iniciarCheckout } from "@/lib/checkout";
import { transitionBase, easeOut } from "@/lib/motion";
import { isLightColor } from "@/lib/color";
import { CategoryIcon } from "@/components/catalogo/CategoryIcon";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const setCantidad = useCartStore((s) => s.setCantidad);
  const removeItem = useCartStore((s) => s.removeItem);
  const registrarAporte = useCasaStore((s) => s.registrarAporte);
  const progress = useCasaStore((s) => s.progress);

  const totalCOP = cartTotalCOP(items);
  const progresoActual = progress;
  const aportePuntos = (totalCOP / config.metaCOP) * 100;
  const progresoProyectado = Math.min(100, progresoActual + aportePuntos);
  // Un material individual suele aportar una fracción minúscula de la meta;
  // el segmento visual usa un ancho mínimo para que el aporte siga siendo
  // perceptible, mientras el texto siempre muestra el número real.
  const anchoVisualAporte = Math.max(aportePuntos, 0.6);

  async function handleCheckout() {
    const lineItems = items.map((i) => ({
      productId: i.product.slug,
      nombre: i.product.nombre,
      precioCOP: i.product.precioCOP,
      cantidad: i.cantidad,
    }));
    const { redirectUrl } = await iniciarCheckout(lineItems);
    registrarAporte(totalCOP);
    window.open(redirectUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-[var(--color-cemento-900)]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionBase}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[var(--color-cal-050)] p-6 shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easeOut }}
            role="dialog"
            aria-label="Tu donación"
          >
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-lg)] font-semibold text-[var(--color-cemento-900)]">
                Tu donación
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="rounded-full p-2 text-[var(--color-cemento-700)] hover:bg-[var(--color-cemento-100)]"
              >
                ✕
              </button>
            </div>
            <p className="mb-6 font-sans text-xs text-[var(--color-cemento-500)]">
              Los materiales son solo referencia de precio — donas su valor,
              no los recibes en tu casa.
            </p>

            {items.length === 0 ? (
              <p className="font-sans text-[var(--color-cemento-500)]">
                Aún no has elegido ningún material de referencia.
              </p>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.product.slug} className="flex gap-3">
                      <div
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm"
                        style={{ backgroundColor: item.product.imagenColor }}
                      >
                        <CategoryIcon
                          categoria={item.product.categoria}
                          className="h-9 w-9"
                          style={{
                            color: isLightColor(item.product.imagenColor)
                              ? "var(--color-cemento-900)"
                              : "var(--color-cal-050)",
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-sm font-medium text-[var(--color-cemento-900)]">
                          {item.product.nombre}
                        </p>
                        <p className="font-sans text-xs text-[var(--color-cemento-500)]">
                          {formatCOP(item.product.precioCOP)} / {item.product.unidad}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={item.cantidad}
                            onChange={(e) =>
                              setCantidad(item.product.slug, Math.max(1, Number(e.target.value)))
                            }
                            className="w-16 rounded border border-[var(--color-cemento-300)] px-2 py-1 font-sans text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.slug)}
                            className="font-sans text-xs text-[var(--color-estado-error)] hover:underline"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-6 border-t border-[var(--color-cemento-300)] pt-6">
                {/* Gancho: preview en vivo de cuánto sube la casa */}
                <div className="mb-4">
                  <p className="mb-2 font-sans text-sm text-[var(--color-cemento-900)]">
                    Tu donación suma{" "}
                    <span className="font-semibold text-[var(--color-arcilla-700)]">
                      {formatCOP(totalCOP)}
                    </span>{" "}
                    a Mi Casa Colombia
                  </p>
                  <div className="mb-1 flex justify-between font-sans text-xs text-[var(--color-cemento-500)]">
                    <span>Progreso de la meta</span>
                    <span>
                      {progresoActual.toFixed(3)}% → {progresoProyectado.toFixed(3)}%
                    </span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-cemento-100)]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-cemento-300)]"
                      style={{ width: `${progresoActual}%` }}
                    />
                    <motion.div
                      className="absolute inset-y-0 rounded-full bg-[var(--color-acento-amarillo-500)]"
                      style={{ left: `${progresoActual}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${anchoVisualAporte}%` }}
                      transition={transitionBase}
                    />
                  </div>
                </div>

                <div className="mb-4 flex justify-between font-sans text-sm text-[var(--color-cemento-900)]">
                  <span>Total a donar</span>
                  <span className="font-semibold">{formatCOP(totalCOP)}</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-[var(--color-arcilla-500)] px-6 py-3 font-sans text-sm font-semibold text-[var(--color-cal-050)] transition-colors hover:bg-[var(--color-arcilla-700)]"
                >
                  Donar en la VAKI
                </motion.button>
                <p className="mt-3 font-sans text-xs text-[var(--color-cemento-500)]">
                  Te llevamos a la campaña oficial en VAKI con este monto
                  pre-cargado. No compras ni recibes materiales: el 100% se
                  dona para la reconstrucción.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
