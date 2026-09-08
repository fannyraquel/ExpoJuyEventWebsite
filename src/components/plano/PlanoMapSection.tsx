import React from "react";
import GoogleLocationMap from "@components/features/GoogleLocationMap";
import InteractiveMap from "@components/features/InteractiveMap";
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
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* GOOGLE MAPS: CÓMO LLEGAR */}
      <div
        className="rounded-2xl overflow-hidden border shadow-lg transition-colors"
        style={{
          background: "var(--t-card)",
          borderColor: "var(--t-card-border)",
        }}
      >
        <div className="px-5 py-4 border-b border-[var(--t-card-border)]">
          <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-bold">
            Cómo llegar
          </div>
          <h2 className="font-display text-2xl font-black">
            Ubicación del predio
          </h2>
          <p className="text-sm opacity-60 mt-1">
            Encontrá el predio y utilizá GPS para llegar.
          </p>
        </div>

        <div className="h-[620px]">
          <GoogleLocationMap
            stands={stands}
            busqueda={busqueda}
            selectedCat={selectedCat}
          />
        </div>
      </div>

      {/* PLANO REAL INTERACTIVO */}
      <div
        className="rounded-2xl overflow-hidden border shadow-lg transition-colors"
        style={{
          background: "var(--t-card)",
          borderColor: "var(--t-card-border)",
        }}
      >
        <div className="px-5 py-4 border-b border-[var(--t-card-border)]">
          <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-bold">
            Distribución
          </div>
          <h2 className="font-display text-2xl font-black">
            Plano del predio
          </h2>
          <p className="text-sm opacity-60 mt-1">
            Explorá los espacios y stands.
          </p>
        </div>

        <div className="h-[620px]">
          <InteractiveMap
            stands={stands}
            busqueda={busqueda}
            selectedCat={selectedCat}
          />
        </div>
      </div>
    </section>
  );
}
