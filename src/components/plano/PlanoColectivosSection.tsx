import React, { useState } from "react";
import { COLECTIVOS_CIUDAD_CULTURAL, ColectivoLinea } from "@data/colectivos.data";

export interface PlanoColectivosSectionProps {
  colectivos?: ColectivoLinea[];
}

export default function PlanoColectivosSection({
  colectivos = COLECTIVOS_CIUDAD_CULTURAL,
}: PlanoColectivosSectionProps) {
  const [empresaFiltro, setEmpresaFiltro] = useState<string>("Todas");
  const [busquedaLocal, setBusquedaLocal] = useState<string>("");

  const santaAnaCount = colectivos.filter((c) => c.empresa === "Santa Ana").length;
  const elUrbanoCount = colectivos.filter((c) => c.empresa === "El Urbano").length;

  const colectivosFiltrados = colectivos.filter((item) => {
    const coincideEmpresa = empresaFiltro === "Todas" || item.empresa === empresaFiltro;
    const q = busquedaLocal.toLowerCase();
    const coincideBusqueda =
      !q ||
      item.linea.toLowerCase().includes(q) ||
      item.empresa.toLowerCase().includes(q) ||
      item.recorrido.toLowerCase().includes(q) ||
      item.parada.toLowerCase().includes(q);
    return coincideEmpresa && coincideBusqueda;
  });

  return (
    <section className="mb-10 rounded-2xl border p-6 shadow-sm transition-colors duration-300 bg-[var(--t-card)] border-[var(--t-card-border)] text-[var(--t-text)]">
      {/* Encabezado de la Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--t-card-border)] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1DBECB]">
            <span>🚌</span>
            <span>Transporte Público Urbano</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-black text-[var(--t-text)] md:text-3xl">
            Líneas de Colectivos a Ciudad Cultural
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[var(--t-text-muted)]">
            Diferenciación de líneas operadas por <strong>Santa Ana</strong> y <strong>El Urbano</strong> para llegar al predio.
          </p>
        </div>

        {/* Tarjeta rápida SUBE */}
        <div className="flex items-center gap-3 rounded-xl border border-[#1DBECB]/30 bg-[#1DBECB]/10 px-4 py-2.5 shrink-0 text-xs">
          <span className="text-xl">💳</span>
          <div>
            <span className="font-extrabold text-[#0e8a95] dark:text-[#1DBECB]">Tarjeta SUBE Requerida</span>
            <p className="text-[10px] opacity-80 text-[var(--t-text-muted)]">Frecuencia reforzada durante la ExpoJuy</p>
          </div>
        </div>
      </div>

      {/* Barra de Filtros por Empresa y Búsqueda de Línea */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Pestañas de Filtro por Empresa (Santa Ana / El Urbano) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setEmpresaFiltro("Todas")}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all ${
              empresaFiltro === "Todas"
                ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30"
                : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#7209B7]/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
            }`}
          >
            Todas las Líneas ({colectivos.length})
          </button>

          <button
            type="button"
            onClick={() => setEmpresaFiltro("Santa Ana")}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all ${
              empresaFiltro === "Santa Ana"
                ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30"
                : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#7209B7]/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
            }`}
          >
            🚌 Santa Ana ({santaAnaCount})
          </button>

          <button
            type="button"
            onClick={() => setEmpresaFiltro("El Urbano")}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all ${
              empresaFiltro === "El Urbano"
                ? "bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/30"
                : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#4361EE]/10 hover:text-[#4361EE] dark:hover:text-[#4CC9F0]"
            }`}
          >
            🚌 El Urbano ({elUrbanoCount})
          </button>
        </div>

        {/* Buscador de Líneas o Barrios */}
        <div className="relative min-w-[240px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none opacity-60">
            🔍
          </span>
          <input
            type="text"
            value={busquedaLocal}
            onChange={(e) => setBusquedaLocal(e.target.value)}
            placeholder="Buscar número de línea o barrio..."
            className="w-full rounded-xl pl-9 pr-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-[#7209B7]/40 transition-colors"
            style={{
              background: "var(--t-input-bg)",
              borderColor: "var(--t-input-border)",
              color: "var(--t-text)",
            }}
          />
        </div>
      </div>

      {/* Grid de Cartas por Línea de Colectivo */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {colectivosFiltrados.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-[var(--t-card-border)] p-8 text-center text-xs text-[var(--t-text-muted)]">
            No se encontraron líneas de colectivo con los criterios ingresados.
          </div>
        ) : (
          colectivosFiltrados.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1DBECB]/50 hover:shadow-lg"
            >
              {item.destacado && (
                <span className="absolute top-2 right-2 rounded-full bg-[#1DBECB]/15 px-2 py-0.5 text-[9px] font-extrabold uppercase text-[#0e8a95] dark:text-[#1DBECB]">
                  Directo
                </span>
              )}

              <div>
                {/* Badge de la Línea y Tag de la Empresa */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-sm font-black text-white shadow-sm"
                    style={{
                      backgroundColor:
                        item.empresa === "Santa Ana" ? "#7209B7" : "#4361EE",
                    }}
                  >
                    {item.linea}
                  </span>
                  <div>
                    <span
                      className={`inline-block rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        item.empresa === "Santa Ana"
                          ? "bg-[#7209B7]/15 text-[#7209B7] dark:text-[#A881FC]"
                          : "bg-[#4361EE]/15 text-[#4361EE] dark:text-[#4CC9F0]"
                      }`}
                    >
                      {item.empresa}
                    </span>
                  </div>
                </div>

                {/* Recorrido */}
                <div className="mt-3 space-y-1">
                  <span className="text-[10px] font-bold text-[#1DBECB] uppercase tracking-wider">
                    Trayecto
                  </span>
                  <p className="text-xs font-medium text-[var(--t-text)] leading-snug line-clamp-3">
                    {item.recorrido}
                  </p>
                </div>

                {/* Parada Cercana */}
                <div className="mt-3 flex items-start gap-1.5 text-[11px] text-[var(--t-text-muted)]">
                  <span className="shrink-0 text-xs">📍</span>
                  <span className="line-clamp-2">{item.parada}</span>
                </div>
              </div>

              {/* Pie de Card: Frecuencia */}
              <div className="mt-4 flex items-center justify-between border-t border-[var(--t-card-border)] pt-2.5 text-[10px]">
                <span className="text-[var(--t-text-muted)]">⏱️ Frecuencia</span>
                <span className="font-extrabold text-[#7209B7] dark:text-[#A881FC]">
                  {item.frecuencia}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
