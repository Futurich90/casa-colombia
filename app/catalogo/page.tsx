import { CatalogoGrid } from "@/components/catalogo/CatalogoGrid";

export default function CatalogoPage() {
  return (
    <main className="textura-grano mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-[var(--font-size-3xl)] font-semibold tracking-tight text-[var(--color-cemento-900)]">
        Catálogo
      </h1>
      <p className="mb-12 max-w-xl font-sans text-[var(--color-cemento-700)]">
        Cada material tiene el precio real de mercado — no lo compras ni te lo
        enviamos. El 100% de lo que donas se destina a la VAKI para que las
        familias afectadas reconstruyan su casa.
      </p>
      <CatalogoGrid />
    </main>
  );
}
