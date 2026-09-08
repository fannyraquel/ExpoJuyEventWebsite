import React from "react";
import { Region, RegionDetail } from "@appTypes/domain.types";

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
    <section className="relative flex h-[75vh] min-h-[520px] w-full flex-col justify-between px-6 pb-6 pt-24 md:px-12">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={currentRegion.img}
          alt={currentRegion.nombre}
          className="h-full w-full scale-105 object-cover object-center transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
      </div>

      {/* Badge superior */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#1DBECB]" />
          Territorio &amp; Identidad • Jujuy 2026
        </div>
      </div>

      {/* Título de la región */}
      <div className="relative z-10 mx-auto max-w-5xl space-y-4 text-center">
        <h1 className="font-serif text-5xl font-normal uppercase tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-8xl">
          {currentRegion.nombre}
        </h1>
        <p className="mx-auto max-w-2xl text-sm font-light italic leading-relaxed text-white/80 sm:text-base md:text-lg">
          "{currentRegion.subtitulo}"
        </p>
      </div>

      {/* Selector flotante de regiones */}
      <div className="relative z-20 mx-auto w-full max-w-3xl translate-y-6 sm:translate-y-8">
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/95 dark:bg-[#1A1A2E]/95 p-2 shadow-2xl backdrop-blur-xl sm:rounded-full transition-colors">
          {(Object.keys(allRegiones) as Region[]).map((regKey) => {
            const activa = selectedRegionKey === regKey;
            return (
              <button
                key={regKey}
                type="button"
                onClick={() => onSelectRegion(regKey)}
                className={`min-w-[120px] flex-1 cursor-pointer rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activa
                    ? "scale-100 bg-[#7209B7] text-white shadow-lg shadow-[#7209B7]/35"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#23233E] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {allRegiones[regKey].nombre}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
