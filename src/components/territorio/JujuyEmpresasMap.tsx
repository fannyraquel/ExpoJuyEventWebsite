import React, { useMemo, useState } from "react";

import jujuyMask from "@assets/jujuy.png";

import {
  EMPRESAS_JUJUY,
  REGION_MAP_POSITIONS,
} from "@data/empresasjujuy.data";

import { Region } from "@appTypes/domain.types";

interface JujuyEmpresasMapProps {
  regionInicial?: Region | null;
  onEmpresaSelect?: (
    empresa: (typeof EMPRESAS_JUJUY)[number]
  ) => void;
}

const REGIONES: Region[] = [
  "puna",
  "quebrada",
  "valles",
  "yungas",
];

const REGION_CONFIG: Record<
  Region,
  {
    nombre: string;
    color: string;
    light: string;
    icon: string;
    descripcion: string;
  }
> = {
  puna: {
    nombre: "Puna",
    color: "#7209B7",
    light: "#F3E8FF",
    icon: "🏔️",
    descripcion: "Altura, sal, litio y producción andina",
  },

  quebrada: {
    nombre: "Quebrada",
    color: "#1DBECB",
    light: "#E6FAFC",
    icon: "⛰️",
    descripcion: "Patrimonio, artesanías y vinos de altura",
  },

  valles: {
    nombre: "Valles",
    color: "#A881FC",
    light: "#F3EEFF",
    icon: "🌱",
    descripcion: "Corazón productivo e industrial de Jujuy",
  },

  yungas: {
    nombre: "Yungas",
    color: "#7209B7",
    light: "#F3E8FF",
    icon: "🌿",
    descripcion: "Selva, agroindustria y biodiversidad",
  },
};

export default function JujuyEmpresasMap({
  regionInicial = null,
  onEmpresaSelect,
}: JujuyEmpresasMapProps) {
  const [regionSeleccionada, setRegionSeleccionada] =
    useState<Region | null>(regionInicial);

  const [empresaSeleccionada, setEmpresaSeleccionada] =
    useState<(typeof EMPRESAS_JUJUY)[number] | null>(null);

  const [hoverRegion, setHoverRegion] =
    useState<Region | null>(null);

  const empresasPorRegion = useMemo(() => {
    return REGIONES.reduce(
      (acc, region) => {
        acc[region] = EMPRESAS_JUJUY.filter(
          (empresa) => empresa.region === region
        );

        return acc;
      },
      {} as Record<Region, typeof EMPRESAS_JUJUY>
    );
  }, []);

  const empresasVisibles = regionSeleccionada
    ? empresasPorRegion[regionSeleccionada]
    : EMPRESAS_JUJUY;

  const seleccionarRegion = (region: Region) => {
    setRegionSeleccionada((actual) =>
      actual === region ? null : region
    );

    setEmpresaSeleccionada(null);
  };

  const seleccionarEmpresa = (
    empresa: (typeof EMPRESAS_JUJUY)[number]
  ) => {
    setEmpresaSeleccionada(empresa);
    setRegionSeleccionada(empresa.region);

    onEmpresaSelect?.(empresa);
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-[#111113]">
      {/* ============================================================
          DECORACIÓN SUPERIOR
      ============================================================ */}

      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-1 w-12 rounded-full bg-[#1DBECB]" />

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7209B7] dark:text-[#A881FC]">
            Producción jujeña
          </span>
        </div>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-[#4A4A4A] dark:text-white md:text-5xl">
              Empresas de Jujuy
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#8E8E93] dark:text-gray-400">
              Explorá el mapa productivo de la provincia y descubrí
              empresas, emprendimientos y organizaciones según la región
              donde se encuentran sus sedes.
            </p>
          </div>

          <div className="rounded-full border border-[#1DBECB]/30 bg-[#1DBECB]/10 px-4 py-2 text-sm font-semibold text-[#4A4A4A] dark:text-gray-200">
            {EMPRESAS_JUJUY.length} organizaciones
          </div>
        </div>
      </div>

      {/* ============================================================
          CONTENEDOR PRINCIPAL
      ============================================================ */}

      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">

        {/* ==========================================================
            MAPA
        ========================================================== */}

        <div
          className="
            relative
            min-h-[650px]
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-200
            bg-gradient-to-br
            from-[#fafafa]
            via-white
            to-[#f3efff]
            shadow-xl
            dark:border-white/10
            dark:from-[#171719]
            dark:via-[#111113]
            dark:to-[#1d1724]
          "
        >
          {/* Aguayo decorativo */}

          <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#1DBECB] via-[#A881FC] to-[#7209B7]" />

          {/* Texto de fondo */}

          <div className="pointer-events-none absolute left-6 top-6 z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8E8E93]">
              Mapa productivo
            </p>

            <p className="mt-1 text-sm font-semibold text-[#4A4A4A] dark:text-gray-300">
              Jujuy · Argentina
            </p>
          </div>

          {/* ========================================================
              SILUETA DE JUJUY
          ======================================================== */}

          <div className="absolute inset-0 flex items-center justify-center p-12 md:p-20">
            <div className="relative h-full w-full max-w-[560px]">

              {/* Halo */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[75%]
                  w-[55%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#A881FC]/10
                  blur-3xl
                "
              />

              {/* BOTA DE JUJUY */}

              <img
                src={jujuyMask}
                alt="Mapa de la provincia de Jujuy"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  max-h-full
                  max-w-full
                  -translate-x-1/2
                  -translate-y-1/2
                  object-contain
                  drop-shadow-[0_20px_30px_rgba(114,9,183,0.20)]
                  transition-all
                  duration-500
                "
              />

              {/* ==================================================
                  REGIONES
              ================================================== */}

              {REGIONES.map((region) => {
                const position = REGION_MAP_POSITIONS[region];
                const config = REGION_CONFIG[region];

                const activa = regionSeleccionada === region;
                const hover = hoverRegion === region;

                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => seleccionarRegion(region)}
                    onMouseEnter={() => setHoverRegion(region)}
                    onMouseLeave={() => setHoverRegion(null)}
                    className="
                      absolute
                      z-30
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      transition-all
                      duration-300
                      focus:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-[#1DBECB]/40
                    "
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                    }}
                    aria-label={`Ver empresas de la región ${config.nombre}`}
                  >
                    {/* Anillo */}

                    <span
                      className={`
                        absolute
                        inset-0
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          activa || hover
                            ? "scale-150 opacity-20"
                            : "scale-100 opacity-0"
                        }
                      `}
                      style={{
                        backgroundColor: config.color,
                      }}
                    />

                    {/* Punto */}

                    <span
                      className={`
                        relative
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border-4
                        border-white
                        shadow-lg
                        transition-all
                        duration-300
                        dark:border-[#18181b]
                        ${
                          activa || hover
                            ? "scale-125"
                            : "scale-100"
                        }
                      `}
                      style={{
                        backgroundColor: config.color,
                      }}
                    >
                      <span className="text-lg">
                        {config.icon}
                      </span>
                    </span>

                    {/* Label */}

                    <span
                      className={`
                        absolute
                        left-1/2
                        top-full
                        mt-2
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-black
                        shadow-md
                        transition-all
                        duration-300
                        ${
                          activa || hover
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-80"
                        }
                      `}
                      style={{
                        backgroundColor:
                          activa || hover
                            ? config.color
                            : "rgba(255,255,255,0.92)",
                        color:
                          activa || hover
                            ? "#FFFFFF"
                            : "#4A4A4A",
                      }}
                    >
                      {config.nombre}
                    </span>
                  </button>
                );
              })}

              {/* ==================================================
                  MARCADORES DE EMPRESAS
              ================================================== */}

              {empresasVisibles.map((empresa, index) => {
                const region = empresa.region;

                const regionPosition =
                  REGION_MAP_POSITIONS[region];

                /*
                 * El mapa es representativo y no GIS.
                 * Distribuimos los marcadores alrededor
                 * de la posición de cada región.
                 */

                const offsetX =
                  ((index % 5) - 2) * 2.2;

                const offsetY =
                  (Math.floor(index / 5) % 5 - 2) * 2.1;

                const x = Math.min(
                  92,
                  Math.max(
                    8,
                    regionPosition.x + offsetX
                  )
                );

                const y = Math.min(
                  92,
                  Math.max(
                    8,
                    regionPosition.y + offsetY
                  )
                );

                const seleccionada =
                  empresaSeleccionada?.id === empresa.id;

                return (
                  <button
                    key={empresa.id}
                    type="button"
                    onClick={() =>
                      seleccionarEmpresa(empresa)
                    }
                    className="
                      group
                      absolute
                      z-40
                      -translate-x-1/2
                      -translate-y-1/2
                      focus:outline-none
                    "
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                    aria-label={`Ver ${empresa.nombre}`}
                  >
                    {/* Pulso */}

                    <span
                      className={`
                        absolute
                        inset-0
                        rounded-full
                        bg-[#1DBECB]
                        transition-all
                        duration-300
                        ${
                          seleccionada
                            ? "scale-[2.2] opacity-30"
                            : "scale-150 opacity-0 group-hover:scale-[2] group-hover:opacity-20"
                        }
                      `}
                    />

                    {/* Marcador */}

                    <span
                      className={`
                        relative
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-white
                        bg-[#1DBECB]
                        shadow-lg
                        transition-all
                        duration-200
                        dark:border-[#18181b]
                        ${
                          seleccionada
                            ? "scale-150 bg-[#7209B7]"
                            : "group-hover:scale-125"
                        }
                      `}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>

                    {/* Tooltip */}

                    <span
                      className="
                        pointer-events-none
                        absolute
                        bottom-full
                        left-1/2
                        mb-2
                        hidden
                        w-max
                        max-w-[220px]
                        -translate-x-1/2
                        rounded-xl
                        bg-[#4A4A4A]
                        px-3
                        py-2
                        text-left
                        text-xs
                        text-white
                        shadow-xl
                        group-hover:block
                        dark:bg-white
                        dark:text-[#4A4A4A]
                      "
                    >
                      <strong className="block">
                        {empresa.nombre}
                      </strong>

                      <span className="mt-0.5 block opacity-70">
                        {empresa.localidad}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              LEYENDA
          ======================================================== */}

          <div className="absolute bottom-5 left-5 right-5 z-50 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {REGIONES.map((region) => {
              const config = REGION_CONFIG[region];

              return (
                <button
                  key={region}
                  type="button"
                  onClick={() =>
                    seleccionarRegion(region)
                  }
                  className={`
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    bg-white/90
                    px-3
                    py-2
                    text-xs
                    font-bold
                    shadow-sm
                    backdrop-blur-md
                    transition-all
                    hover:-translate-y-0.5
                    dark:bg-[#18181b]/90
                    ${
                      regionSeleccionada === region
                        ? "border-[#7209B7]"
                        : "border-gray-200 dark:border-white/10"
                    }
                  `}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: config.color,
                    }}
                  />

                  <span className="text-[#4A4A4A] dark:text-gray-200">
                    {config.nombre}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==========================================================
            PANEL DE EMPRESAS
        ========================================================== */}

        <aside
          className="
            flex
            max-h-[650px]
            flex-col
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-200
            bg-white
            shadow-xl
            dark:border-white/10
            dark:bg-[#18181b]
          "
        >
          {/* Header */}

          <div className="border-b border-gray-100 p-6 dark:border-white/10">
            {regionSeleccionada ? (
              <>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
                    style={{
                      backgroundColor:
                        REGION_CONFIG[regionSeleccionada].light,
                    }}
                  >
                    {REGION_CONFIG[regionSeleccionada].icon}
                  </span>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                      Región
                    </p>

                    <h3 className="font-serif text-2xl font-bold text-[#4A4A4A] dark:text-white">
                      {REGION_CONFIG[regionSeleccionada].nombre}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#8E8E93]">
                  {REGION_CONFIG[regionSeleccionada].descripcion}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  Todas las regiones
                </p>

                <h3 className="mt-1 font-serif text-2xl font-bold text-[#4A4A4A] dark:text-white">
                  Empresas jujeñas
                </h3>

                <p className="mt-2 text-sm text-[#8E8E93]">
                  Seleccioná una región en el mapa para explorar
                  sus empresas.
                </p>
              </>
            )}

            {/* Cantidad */}

            <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/5">
              <span className="text-sm font-medium text-[#8E8E93]">
                Empresas encontradas
              </span>

              <span className="font-bold text-[#7209B7] dark:text-[#A881FC]">
                {empresasVisibles.length}
              </span>
            </div>
          </div>

          {/* Lista */}

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {empresasVisibles.map((empresa) => {
                const activa =
                  empresaSeleccionada?.id === empresa.id;

                return (
                  <button
                    key={empresa.id}
                    type="button"
                    onClick={() =>
                      seleccionarEmpresa(empresa)
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      p-4
                      text-left
                      transition-all
                      duration-200
                      ${
                        activa
                          ? "border-[#7209B7]/40 bg-[#7209B7]/5 shadow-sm"
                          : "border-transparent bg-gray-50 hover:border-[#1DBECB]/30 hover:bg-[#1DBECB]/5 dark:bg-white/5"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`
                          mt-1
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          text-xs
                          font-black
                          ${
                            activa
                              ? "bg-[#7209B7] text-white"
                              : "bg-[#1DBECB]/15 text-[#1DBECB]"
                          }
                        `}
                      >
                        {empresa.nombre.charAt(0)}
                      </span>

                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold text-[#4A4A4A] dark:text-gray-100">
                          {empresa.nombre}
                        </h4>

                        <p className="mt-1 text-xs text-[#8E8E93]">
                          {empresa.rubro}
                        </p>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8E8E93]">
                          <span>📍</span>
                          <span>{empresa.localidad}</span>
                        </div>

                        {empresa.descripcion && (
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#8E8E93]">
                            {empresa.descripcion}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}

          <div className="border-t border-gray-100 bg-gray-50/70 p-4 dark:border-white/10 dark:bg-white/[0.02]">
            <button
              type="button"
              onClick={() => {
                setRegionSeleccionada(null);
                setEmpresaSeleccionada(null);
              }}
              className="
                w-full
                rounded-xl
                border
                border-[#7209B7]/20
                bg-white
                px-4
                py-3
                text-sm
                font-bold
                text-[#7209B7]
                transition-all
                hover:bg-[#7209B7]
                hover:text-white
                dark:bg-transparent
                dark:text-[#A881FC]
              "
            >
              Ver todas las regiones
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}