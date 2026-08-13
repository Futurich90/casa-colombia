import { Hero } from "@/components/hero/Hero";
import { ComoFunciona } from "@/components/secciones/ComoFunciona";
import { Impacto } from "@/components/secciones/Impacto";

export default function Home() {
  return (
    <main>
      <Hero />
      <ComoFunciona />
      <Impacto />
    </main>
  );
}
