import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-cemento-300)] bg-[var(--color-cal-050)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 font-sans text-sm text-[var(--color-cemento-500)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-cemento-900)]">
            {config.organizacion}
          </p>
          <p>100% de lo recaudado va a la reconstrucción.</p>
        </div>

        <div className="flex flex-wrap gap-6">
          <a
            href={config.vakiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-arcilla-700)]"
          >
            Ver la VAKI
          </a>
          <a href="/catalogo" className="hover:text-[var(--color-arcilla-700)]">
            Catálogo
          </a>
          <a
            href="mailto:contacto@casacolombia.co"
            className="hover:text-[var(--color-arcilla-700)]"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
