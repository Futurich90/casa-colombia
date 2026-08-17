"use client";

import Link from "next/link";
import { useCartStore, cartCantidadTotal } from "@/store/useCartStore";

export function Header() {
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.open);
  const cantidad = cartCantidadTotal(items);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-cemento-300)] bg-[var(--color-cal-050)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-cemento-900)]"
        >
          Mi Casa Colombia
        </Link>

        <nav className="hidden items-center gap-8 font-sans text-sm text-[var(--color-cemento-700)] sm:flex">
          <Link href="/catalogo" className="hover:text-[var(--color-arcilla-700)]">
            Catálogo
          </Link>
          <Link href="/#como-funciona" className="hover:text-[var(--color-arcilla-700)]">
            Cómo funciona
          </Link>
          <Link href="/#impacto" className="hover:text-[var(--color-arcilla-700)]">
            Impacto
          </Link>
        </nav>

        <button
          type="button"
          onClick={openCart}
          className="relative rounded-full border border-[var(--color-cemento-300)] px-4 py-2 font-sans text-sm text-[var(--color-cemento-900)] transition-colors hover:border-[var(--color-arcilla-500)] hover:text-[var(--color-arcilla-700)]"
          aria-label={`Abrir mi donación, ${cantidad} materiales seleccionados`}
        >
          Mi donación
          {cantidad > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-arcilla-500)] text-xs font-semibold text-[var(--color-cal-050)]">
              {cantidad}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
