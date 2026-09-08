import React from "react";

import { Region, RegionDetail } from "@appTypes/domain.types";

import JujuyEmpresasMap from "@components/territorio/JujuyEmpresasMap";

export interface DescubriJujuyHeroProps {
  selectedRegionKey: Region;
  currentRegion: RegionDetail;
  allRegiones: Record<Region, RegionDetail>;
  onSelectRegion: (regionKey: Region) => void;
}

export default function DescubriJujuyHero({
  selectedRegionKey,
  currentRegion,
  allRegiones,
  onSelectRegion,
}: DescubriJujuyHeroProps) {
  return (
    <section className="relative min-h-[720px] w-full overflow-hidden bg-[#0B0F17]">

      {/* =========================================================
          IMAGEN PRINCIPAL
      ========================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        <img
          src={currentRegion.img}
          alt={currentRegion.nombre}
          className="h-full w-full scale-[1.03] object-cover object-center transition-all duration-1000 ease-out"
        />

        {/* Overlay principal */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-black/55
            via-black/25
            to-black/90
          "
          aria-hidden="true"
        />

        {/* Violeta muy sutil */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-[#7209B7]/25
            via-transparent
            to-[#1DBECB]/10
          "
          aria-hidden="true"
        />

        {/* Viñeta */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.45)_100%)]
          "
          aria-hidden="true"
        />
      </div>

      {/* =========================================================
          ELEMENTOS DECORATIVOS
      ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[#7209B7]/20 blur-[100px]" />

        <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-[#1DBECB]/15 blur-[100px]" />

        <div className="absolute left-[8%] top-[28%] h-2 w-2 rounded-full bg-[#1DBECB] shadow-[0_0_20px_#1DBECB]" />

        <div className="absolute right-[12%] top-[38%] h-2.5 w-2.5 rounded-full bg-[#A881FC] shadow-[0_0_20px_#A881FC]" />

        <div className="absolute left-[15%] top-[45%] text-2xl text-white/40">
          ✦
        </div>

        <div className="absolute right-[18%] top-[25%] text-xl text-[#1DBECB]/60">
          ✦
        </div>
      </div>

      {/* =========================================================
          CONTENIDO
      ========================================================= */}
      <div className="relative z-10 flex min-h-[720px] flex-col px-5 pb-6 pt-24 sm:px-8 md:px-12">

        {/* Badge */}
        <div className="mx-auto w-full max-w-7xl">

          <div className="flex justify-center md:justify-start">

            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/20
                bg-black/20
                px-4 py-2
                text-[10px] sm:text-[11px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-white
                shadow-lg
                backdrop-blur-md
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#1DBECB] shadow-[0_0_0_4px_rgba(29,190,203,0.15)]" />

              Territorio &amp; Identidad

              <span className="text-white/40">•</span>

              Jujuy 2026
            </div>

          </div>

        </div>

        {/* =====================================================
            TÍTULO
        ===================================================== */}
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center">

          <div className="w-full max-w-4xl pb-16 pt-20 text-center md:text-left">

            {/* Pequeña etiqueta */}
            <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">

              <span className="h-px w-10 bg-[#1DBECB]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#1DBECB]">
                Descubrí
              </span>

              <span className="h-px w-10 bg-[#1DBECB] md:hidden" />

            </div>

            {/* Nombre región */}
            <h1
              className="
                font-display
                text-5xl
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.03em]
                text-white
                drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              {currentRegion.nombre}
            </h1>

            {/* Línea decorativa */}
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">

              <div className="h-1 w-16 rounded-full bg-[#7209B7]" />

              <div className="h-1 w-8 rounded-full bg-[#1DBECB]" />

            </div>

            {/* Subtítulo */}
            <p
              className="
                mt-6
                max-w-2xl
                text-base
                font-light
                leading-relaxed
                text-white/85
                sm:text-lg
                md:text-xl
              "
            >
              {currentRegion.subtitulo}
            </p>

          </div>

        </div>

        {/* =====================================================
            SELECTOR DE REGIONES
        ===================================================== */}
        <div className="relative z-30 mx-auto w-full max-w-5xl">

          <div
            className="
              rounded-[1.75rem]
              border border-white/15
              bg-black/35
              p-2
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              backdrop-blur-xl
              sm:rounded-full
            "
          >

            <div className="flex flex-wrap items-center justify-center gap-1">

              {(Object.keys(allRegiones) as Region[]).map((regKey) => {

                const activa = selectedRegionKey === regKey;

                return (
                  <button
                    key={regKey}
                    type="button"
                    onClick={() => onSelectRegion(regKey)}
                    aria-pressed={activa}
                    className={`
                      min-w-[120px]
                      flex-1
                      cursor-pointer
                      rounded-full
                      px-5
                      py-3
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      transition-all
                      duration-300
                      sm:text-xs

                      ${
                        activa
                          ? `
                            bg-[#7209B7]
                            text-white
                            shadow-lg
                            shadow-[#7209B7]/40
                            hover:bg-[#6508a5]
                          `
                          : `
                            text-white/70
                            hover:bg-white/10
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {allRegiones[regKey].nombre}
                  </button>
                );

              })}

            </div>

          </div>

        </div>

      </div>

      {/* Indicador inferior */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-1
          bg-gradient-to-r
          from-[#7209B7]
          via-[#A881FC]
          to-[#1DBECB]
        "
        aria-hidden="true"
      />

    </section>
  );
}