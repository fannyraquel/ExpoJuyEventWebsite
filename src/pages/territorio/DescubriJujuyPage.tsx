import { useState } from "react";
import AguayoDivider from "@components/common/AguayoDivider";
import { REGIONES } from "@data/regiones.data";
import { EMPRESAS } from "@data/empresas.data";
import { Region } from "@appTypes/domain.types";
import {
  DescubriJujuyHero,
  DescubriJujuyIntro,
  DescubriJujuyDetailCard,
  DescubriJujuyEmpresas,
} from "@components/territorio";

export default function DescubriJujuyPage() {
  const [region, setRegion] = useState<Region>("quebrada");
  const [tabActiva, setTabActiva] = useState<"turismo" | "cultura" | "municipios">("turismo");

  const r = REGIONES[region];
  const empresasRegion = EMPRESAS.filter((e) => e.region === r.nombre);

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#0B0F17] font-sans text-slate-800 dark:text-slate-200 selection:bg-[#1DBECB]/20 transition-colors duration-300">
      {/* Hero Header y Selector de Región */}
      <DescubriJujuyHero
        selectedRegionKey={region}
        currentRegion={r}
        allRegiones={REGIONES}
        onSelectRegion={setRegion}
      />

      <div className="h-16 md:h-20" />

      {/* Secciones Principales */}
      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12 md:py-16">
        {/* Sub-sección Intro */}
        <DescubriJujuyIntro />

        {/* Sub-sección Detalle y Tarjeta con Tabs */}
        <DescubriJujuyDetailCard
          currentRegion={r}
          tabActiva={tabActiva}
          onTabChange={setTabActiva}
        />

        {/* Sub-sección Empresas por Región */}
        <DescubriJujuyEmpresas
          regionNombre={r.nombre}
          empresas={empresasRegion}
        />
      </main>

      <div className="mt-16">
        <AguayoDivider />
      </div>
    </div>
  );
}
