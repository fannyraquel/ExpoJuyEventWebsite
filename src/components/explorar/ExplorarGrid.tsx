import React, { useState } from "react";
import { Empresa } from "@appTypes/domain.types";
import ExpositorCard from "./ExpositorCard";

export interface ExplorarGridProps {
  empresas: Empresa[];
  onConectar: (empresaNombre: string) => void;
  canConnectB2B: boolean;
}

export default function ExplorarGrid({
  empresas,
  onConectar,
  canConnectB2B,
}: ExplorarGridProps) {
  const [viewMode, setViewMode] = useState<"card" | "agenda-item">("card");

  if (empresas.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-16 text-center transition-colors">
        <div className="text-4xl mb-3">🏢</div>
        <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-200">
          No se encontraron empresas
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Intentá modificar el término de búsqueda o restablecer los filtros de rubro y búsqueda B2B.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector de Modo de Visualización (Estilo Agenda vs Tarjetas) */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1DBECB]">
            Nómina de Empresas
          </span>
          <span className="text-xs text-slate-400">
            ({empresas.length} registradas)
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-2xl bg-slate-100 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setViewMode("agenda-item")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              viewMode === "agenda-item"
                ? "bg-[#7209B7] text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <span>📋</span>
            <span className="hidden sm:inline">Estilo Agenda</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              viewMode === "card"
                ? "bg-[#7209B7] text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <span>🎴</span>
            <span className="hidden sm:inline">Tarjetas Visuales</span>
          </button>
        </div>
      </div>

      {/* Renderizado de Empresas según el modo seleccionado */}
      {viewMode === "agenda-item" ? (
        <div className="flex flex-col gap-3">
          {empresas.map((empresa, idx) => (
            <ExpositorCard
              key={empresa.id || empresa.nombre}
              empresa={empresa}
              onConectar={onConectar}
              canConnectB2B={canConnectB2B}
              variant="agenda-item"
              index={idx}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {empresas.map((empresa, idx) => (
            <ExpositorCard
              key={empresa.id || empresa.nombre}
              empresa={empresa}
              onConectar={onConectar}
              canConnectB2B={canConnectB2B}
              variant="card"
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
