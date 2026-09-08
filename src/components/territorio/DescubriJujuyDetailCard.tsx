import React from "react";
import { RegionDetail } from "@appTypes/domain.types";

export interface DescubriJujuyDetailCardProps {
  currentRegion: RegionDetail;
  tabActiva: "turismo" | "cultura" | "municipios";
  onTabChange: (tab: "turismo" | "cultura" | "municipios") => void;
}

export default function DescubriJujuyDetailCard({
  currentRegion,
  tabActiva,
  onTabChange,
}: DescubriJujuyDetailCardProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
      {/* Tarjeta de información con tabs */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 dark:border-white/15 bg-[#111827] dark:bg-[#131B2E] p-8 text-white shadow-2xl md:p-10 lg:col-span-5">
        <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-[#7209B7]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[#1DBECB]/25 blur-3xl" />

        <div className="relative z-10 space-y-6">
          {/* Selector de Tabs */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/10 p-1">
            {(["turismo", "cultura", "municipios"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  tabActiva === tab
                    ? "bg-[#1DBECB] text-slate-900 shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contenido de la tab */}
          <div className="min-h-[160px] space-y-3">
            {tabActiva === "turismo" && (
              <div>
                <span className="font-mono text-[11px] uppercase text-[#1DBECB]">
                  Atractivos
                </span>
                <h3 className="mb-2 mt-1 text-xl font-bold">
                  Circuitos &amp; Geografía
                </h3>
                <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
                  {currentRegion.turismo}
                </p>
              </div>
            )}

            {tabActiva === "cultura" && (
              <div>
                <span className="font-mono text-[11px] uppercase text-[#1DBECB]">
                  Tradición
                </span>
                <h3 className="mb-2 mt-1 text-xl font-bold">
                  Fiestas &amp; Expresiones
                </h3>
                <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">
                  {currentRegion.cultura}
                </p>
              </div>
            )}

            {tabActiva === "municipios" && (
              <div>
                <span className="font-mono text-[11px] uppercase text-[#1DBECB]">
                  Localidades
                </span>
                <h3 className="mb-2 mt-1 text-xl font-bold">
                  Comunidades Integradas
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {currentRegion.municipios.map((m) => (
                    <span
                      key={m}
                      className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Producción típica regional */}
        <div className="relative z-10 mt-6 border-t border-white/10 pt-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1DBECB]">
            Producción Típica Regional
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {currentRegion.productos.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
              >
                ◆ {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Imagen destacada de la región */}
      <div className="group relative min-h-[380px] overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-2xl lg:col-span-7">
        <img
          src={currentRegion.img}
          alt={`Paisaje de ${currentRegion.nombre}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#1DBECB]">
              Registro Oficial
            </span>
            <p className="font-serif text-base font-bold">
              {currentRegion.nombre} • Jujuy
            </p>
          </div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">
            Edición 2026
          </span>
        </div>
      </div>
    </div>
  );
}
