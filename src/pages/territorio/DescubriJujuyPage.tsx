import { useState } from "react";

import AguayoDivider from "@components/common/AguayoDivider";

import { REGIONES } from "@data/regiones.data";

import { Region } from "@appTypes/domain.types";

import {
  DescubriJujuyHero,
  DescubriJujuyIntro,
  DescubriJujuyDetailCard,
} from "@components/territorio";

import JujuyEmpresasMap from "@components/territorio/JujuyEmpresasMap";


export default function DescubriJujuyPage() {
  const [region, setRegion] = useState<Region>("quebrada");

  const [tabActiva, setTabActiva] = useState<
    "turismo" | "cultura" | "municipios"
  >("turismo");

  const r = REGIONES[region];

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans text-slate-800 selection:bg-[#1DBECB]/20 transition-colors duration-300 dark:bg-[#0B0F17] dark:text-slate-200">

      {/* ============================================================
          HERO + SELECTOR DE REGIÓN
      ============================================================ */}

      <DescubriJujuyHero
        selectedRegionKey={region}
        currentRegion={r}
        allRegiones={REGIONES}
        onSelectRegion={setRegion}
      />

      <div className="h-16 md:h-20" />

      {/* ============================================================
          CONTENIDO PRINCIPAL
      ============================================================ */}

      <main className="mx-auto max-w-7xl space-y-16 px-6 py-12 md:py-16">

        {/* ==========================================================
            INTRO
        ========================================================== */}

        <DescubriJujuyIntro />

        {/* ==========================================================
            DETALLE DE LA REGIÓN
        ========================================================== */}

        <DescubriJujuyDetailCard
          currentRegion={r}
          tabActiva={tabActiva}
          onTabChange={setTabActiva}
        />

        {/* ==========================================================
            MAPA INTERACTIVO DE EMPRESAS
        ========================================================== */}

        <JujuyEmpresasMap
          regionInicial={region}
          onEmpresaSelect={(empresa) => {
            setRegion(empresa.region);
          }}
        />

      </main>

      {/* ============================================================
          DIVISOR AGUAYO
      ============================================================ */}

      <div className="mt-16">
        <AguayoDivider />
      </div>
    </div>
  );
}