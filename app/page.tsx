import { Hero } from "@/components/hero/Hero";
import { ComoFunciona } from "@/components/secciones/ComoFunciona";
import { Impacto } from "@/components/secciones/Impacto";
import { ScrollToHashOnLoad } from "@/components/layout/ScrollToHashOnLoad";

export default function Home() {
  return (
    <main>
      <ScrollToHashOnLoad />
      <Hero />
      <ComoFunciona />
      <Impacto />
    </main>
  );
}
