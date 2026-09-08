import React from "react";

export interface FilterItem {
  label: string;
  count?: number;
}

export interface ExplorarFiltersProps {
  rubros: FilterItem[];
  filtroRubro: string;
  onSelectRubro: (rubro: string) => void;
  buscaOptions: FilterItem[];
  filtroBusca: string;
  onSelectBusca: (busca: string) => void;
  regionesOptions?: FilterItem[];
  filtroRegion?: string;
  onSelectRegion?: (region: string) => void;
  onLimpiarFiltros?: () => void;
  cargando?: boolean;
}

export default function ExplorarFilters({
  rubros,
  filtroRubro,
  onSelectRubro,
  buscaOptions,
  filtroBusca,
  onSelectBusca,
  regionesOptions = [],
  filtroRegion = "Todos",
  onSelectRegion,
  onLimpiarFiltros,
  cargando = false,
}: ExplorarFiltersProps) {
  const tieneFiltrosActivos =
    filtroRubro !== "Todos" || filtroBusca !== "Todos" || filtroRegion !== "Todos";

  return (
    <div className="space-y-4 mb-8 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A2E] p-5 shadow-sm transition-colors duration-300">
      {/* Encabezado de Filtros Dinámicos */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7209B7] dark:text-[#A881FC]">
          <span>⚡</span>
          <span>Filtros Dinámicos de Expositores</span>
          {cargando && (
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#7209B7] border-t-transparent ml-2" />
          )}
        </div>

        {tieneFiltrosActivos && onLimpiarFiltros && (
          <button
            type="button"
            onClick={onLimpiarFiltros}
            className="flex items-center gap-1 text-xs font-bold text-[#EF4444] hover:underline cursor-pointer transition-colors"
          >
            <span>✕ Limpiar todos los filtros</span>
          </button>
        )}
      </div>

      {/* 1. Filtro de Rubro */}
      <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 shrink-0 pt-1.5 min-w-[70px]">
          Rubro:
        </span>
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {rubros.map((item) => {
            const label = typeof item === "string" ? item : item.label;
            const count = typeof item === "string" ? undefined : item.count;
            const active = filtroRubro === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelectRubro(label)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30 scale-105"
                    : "bg-[var(--t-surface)] text-[var(--t-text)] border border-[var(--t-card-border)] hover:border-[#7209B7]"
                }`}
              >
                <span>{label}</span>
                {count !== undefined && (
                  <span
                    className={`ml-1.5 text-[10px] ${
                      active ? "text-white/80" : "opacity-60"
                    }`}
                  >
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filtro de Necesidad B2B (Busca) */}
      <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 shrink-0 pt-1.5 min-w-[70px]">
          Busca:
        </span>
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {buscaOptions.map((item) => {
            const label = typeof item === "string" ? item : item.label;
            const count = typeof item === "string" ? undefined : item.count;
            const active = filtroBusca === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelectBusca(label)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? "bg-[#0891B2] text-white shadow-md shadow-[#0891B2]/30 scale-105"
                    : "bg-[var(--t-surface)] text-[var(--t-text)] border border-[var(--t-card-border)] hover:border-[#0891B2]"
                }`}
              >
                <span>{label}</span>
                {count !== undefined && (
                  <span
                    className={`ml-1.5 text-[10px] ${
                      active ? "text-white/80" : "opacity-60"
                    }`}
                  >
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filtro Opcional de Región */}
      {regionesOptions.length > 0 && onSelectRegion && (
        <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 shrink-0 pt-1.5 min-w-[70px]">
            Región:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {regionesOptions.map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const count = typeof item === "string" ? undefined : item.count;
              const active = filtroRegion === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onSelectRegion(label)}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                    active
                      ? "bg-[#1DBECB] text-slate-950 shadow-md shadow-[#1DBECB]/30 scale-105"
                      : "bg-[var(--t-surface)] text-[var(--t-text)] border border-[var(--t-card-border)] hover:border-[#1DBECB]"
                  }`}
                >
                  <span>{label}</span>
                  {count !== undefined && (
                    <span
                      className={`ml-1.5 text-[10px] ${
                        active ? "text-slate-900/80" : "opacity-60"
                      }`}
                    >
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
