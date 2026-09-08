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
    <section className="h-full rounded-2xl border p-5 shadow-lg transition-colors duration-300 bg-[var(--t-card)] border-[var(--t-card-border)] text-[var(--t-text)] flex flex-col justify-between">
      {/* Encabezado de la Sección */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--t-card-border)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#1DBECB]">
              <span>🚌</span>
              <span>Transporte Público Urbano</span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-black text-[var(--t-text)]">
              Colectivos a Ciudad Cultural
            </h2>
            <p className="mt-0.5 text-xs text-[var(--t-text-muted)]">
              Líneas operadas por <strong>Santa Ana</strong> y <strong>El Urbano</strong>.
            </p>
          </div>

          {/* Tarjeta rápida SUBE */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#1DBECB]/30 bg-[#1DBECB]/10 px-3 py-1.5 shrink-0 text-xs">
            <span className="text-lg">💳</span>
            <div>
              <span className="font-extrabold text-[#0e8a95] dark:text-[#1DBECB] text-[11px] block">SUBE Requerida</span>
              <p className="text-[9px] opacity-80 text-[var(--t-text-muted)]">Frecuencia reforzada</p>
            </div>
          </div>
        </div>

        {/* Barra de Filtros por Empresa y Búsqueda de Línea */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2.5 justify-between items-stretch sm:items-center">
          {/* Pestañas de Filtro por Empresa */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setEmpresaFiltro("Todas")}
              className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                empresaFiltro === "Todas"
                  ? "bg-[#7209B7] text-white shadow-sm"
                  : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#7209B7]/10 hover:text-[#7209B7]"
              }`}
            >
              Todas ({colectivos.length})
            </button>

            <button
              type="button"
              onClick={() => setEmpresaFiltro("Santa Ana")}
              className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                empresaFiltro === "Santa Ana"
                  ? "bg-[#7209B7] text-white shadow-sm"
                  : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#7209B7]/10 hover:text-[#7209B7]"
              }`}
            >
              Santa Ana ({santaAnaCount})
            </button>

            <button
              type="button"
              onClick={() => setEmpresaFiltro("El Urbano")}
              className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold transition-all ${
                empresaFiltro === "El Urbano"
                  ? "bg-[#4361EE] text-white shadow-sm"
                  : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#4361EE]/10 hover:text-[#4361EE]"
              }`}
            >
              El Urbano ({elUrbanoCount})
            </button>
          </div>

          {/* Buscador de Líneas o Barrios */}
          <div className="relative min-w-[180px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none opacity-60">
              🔍
            </span>
            <input
              type="text"
              value={busquedaLocal}
              onChange={(e) => setBusquedaLocal(e.target.value)}
              placeholder="Buscar línea o barrio..."
              className="w-full rounded-xl pl-8 pr-2.5 py-1 text-[11px] border focus:outline-none focus:ring-2 focus:ring-[#7209B7]/40 transition-colors"
              style={{
                background: "var(--t-input-bg)",
                borderColor: "var(--t-input-border)",
                color: "var(--t-text)",
              }}
            />
          </div>
        </div>

        {/* Grid / Contenedor Scrollable de Cartas por Línea de Colectivo */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
          {colectivosFiltrados.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-[var(--t-card-border)] p-6 text-center text-xs text-[var(--t-text-muted)]">
              No se encontraron líneas de colectivo con los criterios ingresados.
            </div>
          ) : (
            colectivosFiltrados.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1DBECB]/50 hover:shadow-md"
              >
                {item.destacado && (
                  <span className="absolute top-2 right-2 rounded-full bg-[#1DBECB]/15 px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-[#0e8a95] dark:text-[#1DBECB]">
                    Directo
                  </span>
                )}

                <div>
                  {/* Badge de la Línea y Tag de la Empresa */}
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 min-w-8 items-center justify-center rounded-lg px-1.5 text-xs font-black text-white shadow-sm"
                      style={{
                        backgroundColor:
                          item.empresa === "Santa Ana" ? "#7209B7" : "#4361EE",
                      }}
                    >
                      {item.linea}
                    </span>
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

                  {/* Recorrido */}
                  <div className="mt-2 space-y-0.5">
                    <span className="text-[9px] font-bold text-[#1DBECB] uppercase tracking-wider">
                      Trayecto
                    </span>
                    <p className="text-[11px] font-medium text-[var(--t-text)] leading-snug line-clamp-2">
                      {item.recorrido}
                    </p>
                  </div>

                  {/* Parada Cercana */}
                  <div className="mt-2 flex items-start gap-1 text-[10px] text-[var(--t-text-muted)]">
                    <span className="shrink-0 text-xs">📍</span>
                    <span className="line-clamp-1">{item.parada}</span>
                  </div>
                </div>

                {/* Pie de Card: Frecuencia */}
                <div className="mt-3 flex items-center justify-between border-t border-[var(--t-card-border)] pt-2 text-[9px]">
                  <span className="text-[var(--t-text-muted)]">⏱️ Frecuencia</span>
                  <span className="font-extrabold text-[#7209B7] dark:text-[#A881FC]">
                    {item.frecuencia}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
