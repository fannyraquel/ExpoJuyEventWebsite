import React from "react";
import GoogleLocationMap from "@components/features/GoogleLocationMap";
import InteractiveMap from "@components/features/InteractiveMap";
import PlanoColectivosSection from "./PlanoColectivosSection";
import { Stand } from "@appTypes/domain.types";

export interface PlanoMapSectionProps {
  stands: Stand[];
  busqueda: string;
  selectedCat: string;
}

export default function PlanoMapSection({
  stands,
  busqueda,
  selectedCat,
}: PlanoMapSectionProps) {
  return (
    <div className="space-y-8">
      {/* 1. MAPA INTERACTIVO DEL PREDIO (ARRIBA - ANCHO COMPLETO PERMITIDO) */}
      <div
        className="rounded-2xl overflow-hidden border shadow-lg transition-colors w-full"
        style={{
          background: "var(--t-card)",
          borderColor: "var(--t-card-border)",
        }}
      >
        <div className="px-6 py-4 border-b border-[var(--t-card-border)] flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-extrabold">
              🗺️ Distribución Oficial de Stands
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black">
              Plano Interactivo del Predio
            </h2>
            <p className="text-xs sm:text-sm opacity-70 mt-0.5">
              Explorá todos los pabellones, stands, áreas de descanso, servicios y accesos.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7209B7]/15 border border-[#7209B7]/30 px-3.5 py-1.5 text-xs font-bold text-[#7209B7] dark:text-[#A881FC]">
            <span>✨ Navegación &amp; Zoom 2D</span>
          </div>
        </div>

        <div className="h-[650px] w-full">
          <InteractiveMap
            stands={stands}
            busqueda={busqueda}
            selectedCat={selectedCat}
          />
        </div>
      </div>

      {/* 2. GRILLA INFERIOR DE 2 COLUMNAS: GOOGLE MAPS + LÍNEAS DE COLECTIVOS AL LADO */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        {/* GOOGLE MAPS: UBICACIÓN GPS & CÓMO LLEGAR */}
        <div
          className="rounded-2xl overflow-hidden border shadow-lg transition-colors flex flex-col justify-between"
          style={{
            background: "var(--t-card)",
            borderColor: "var(--t-card-border)",
          }}
        >
          <div className="px-5 py-4 border-b border-[var(--t-card-border)]">
            <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-bold">
              📍 Ubicación GPS &amp; Cómo Llegar
            </div>
            <h2 className="font-display text-2xl font-black">
              Ubicación del predio
            </h2>
            <p className="text-xs opacity-70 mt-0.5">
              San Salvador de Jujuy · Navegación asistida por Google Maps.
            </p>
          </div>

          <div className="h-[560px] w-full">
            <GoogleLocationMap
              stands={stands}
              busqueda={busqueda}
              selectedCat={selectedCat}
            />
          </div>
        </div>

        {/* LÍNEAS DE COLECTIVOS A CIUDAD CULTURAL AL LADO DE GOOGLE MAPS */}
        <div className="w-full h-full">
          <PlanoColectivosSection />
        </div>
      </div>
    </div>
  );
}
