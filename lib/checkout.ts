import { config } from "./config";

export interface CartLineItem {
  productId: string;
  nombre: string;
  precioCOP: number;
  cantidad: number;
}

export interface CheckoutResult {
  /** URL a la que se debe redirigir al comprador para completar el pago. */
  redirectUrl: string;
}

/**
 * Capa de checkout abstraída. Hoy redirige a la VAKI con el monto
 * pre-cargado; el día que se conecte Wompi o Mercado Pago, solo
 * cambia la implementación de esta función — la UI no se toca.
 */
export async function iniciarCheckout(
  items: CartLineItem[],
): Promise<CheckoutResult> {
  const totalCOP = items.reduce(
    (sum, item) => sum + item.precioCOP * item.cantidad,
    0,
  );

  const url = new URL(config.vakiUrl);
  url.searchParams.set("amount", String(totalCOP));

  return { redirectUrl: url.toString() };
}

export function calcularTotalCOP(items: CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.precioCOP * item.cantidad, 0);
}
