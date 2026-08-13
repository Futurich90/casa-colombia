import { create } from "zustand";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, cantidad?: number) => void;
  removeItem: (slug: string) => void;
  setCantidad: (slug: string, cantidad: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  addItem: (product, cantidad = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.slug === product.slug);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.slug === product.slug
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i,
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { product, cantidad }], isOpen: true };
    }),

  removeItem: (slug) =>
    set((state) => ({ items: state.items.filter((i) => i.product.slug !== slug) })),

  setCantidad: (slug, cantidad) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.product.slug === slug ? { ...i, cantidad } : i))
        .filter((i) => i.cantidad > 0),
    })),

  clear: () => set({ items: [] }),
}));

export function cartTotalCOP(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.product.precioCOP * i.cantidad, 0);
}

export function cartCantidadTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.cantidad, 0);
}
