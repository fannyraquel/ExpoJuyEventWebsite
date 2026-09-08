import React, { useState, useMemo } from "react";
import { Empresa } from "@appTypes/domain.types";
import RondaNegociosCard from "./RondaNegociosCard";

export interface RondaNegociosGridProps {
  empresas: Empresa[];
  expandedEmpresa: string | null;
  onToggleExpand: (empresaNombre: string) => void;
  userRole: string;
}

export default function RondaNegociosGrid({
  empresas,
  expandedEmpresa,
  onToggleExpand,
  userRole,
}: RondaNegociosGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRubro, setSelectedRubro] = useState("Todos");
  const [selectedRegion, setSelectedRegion] = useState("Todos");

  // Extract unique rubros and regiones dynamically
  const rubros = useMemo(() => {
    const set = new Set<string>();
    empresas.forEach((e) => {
      if (e.rubro) set.add(e.rubro);
    });
    return ["Todos", ...Array.from(set)];
  }, [empresas]);

  const regiones = useMemo(() => {
    const set = new Set<string>();
    empresas.forEach((e) => {
      if (e.region) set.add(e.region);
    });
    return ["Todos", ...Array.from(set)];
  }, [empresas]);

  // Filter logic
  const filteredEmpresas = useMemo(() => {
    return empresas.filter((empresa) => {
      // Rubro filter
      if (selectedRubro !== "Todos" && empresa.rubro !== selectedRubro) {
        return false;
      }
      // Region filter
      if (selectedRegion !== "Todos" && empresa.region !== selectedRegion) {
        return false;
      }
      // Search term filter (nombre, rubro, busca, país, stand, descripcion)
      if (searchTerm.trim() !== "") {
        const q = searchTerm.toLowerCase().trim();
        const matchesNombre = empresa.nombre.toLowerCase().includes(q);
        const matchesRubro = empresa.rubro.toLowerCase().includes(q);
        const matchesBusca = empresa.busca.toLowerCase().includes(q);
        const matchesPais = empresa.pais.toLowerCase().includes(q);
        const matchesStand = empresa.standNumero?.toLowerCase().includes(q) ?? false;
        const matchesDesc = empresa.descripcion?.toLowerCase().includes(q) ?? false;

        return (
          matchesNombre ||
          matchesRubro ||
          matchesBusca ||
          matchesPais ||
          matchesStand ||
          matchesDesc
        );
      }

      return true;
    });
  }, [empresas, selectedRubro, selectedRegion, searchTerm]);

  const hasActiveFilters =
    searchTerm !== "" || selectedRubro !== "Todos" || selectedRegion !== "Todos";

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedRubro("Todos");
    setSelectedRegion("Todos");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* CABECERA DE SECCIÓN Y CONTROLES DE FILTRADO */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1DBECB] mb-1">
            <span>Directorio de Oportunidades B2B</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--t-text)]">
            Empresas & Marcas Participantes
          </h2>
          <p className="text-xs sm:text-sm text-[var(--t-text-muted)] mt-1">
            Explora las instituciones y empresas acreditadas en ExpoJuy 2026 y agenda una cita directa.
          </p>
        </div>

        {/* CONTADORES */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
          <span className="rounded-lg bg-[var(--t-surface)] px-3 py-1.5 border border-[var(--t-card-border)]">
            Mostrando: <strong className="text-[#1DBECB]">{filteredEmpresas.length}</strong> / {empresas.length}
          </span>
        </div>
      </div>

      {/* BARRA DE FILTROS BÚSQUEDA Y CATEGORÍAS */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-[var(--t-surface)] border border-[var(--t-card-border)] shadow-sm">
        {/* INPUT DE BÚSQUEDA */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por empresa, marca, rubro o necesidad B2B..."
            className="w-full rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[var(--t-card)] border border-[var(--t-card-border)] text-[var(--t-text)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1DBECB]/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-3 flex items-center text-xs text-slate-400 hover:text-red-400 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* FILTRO POR RUBRO */}
        <div className="sm:w-48">
          <select
            value={selectedRubro}
            onChange={(e) => setSelectedRubro(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-xs sm:text-sm bg-[var(--t-card)] border border-[var(--t-card-border)] text-[var(--t-text)] focus:outline-none focus:ring-2 focus:ring-[#1DBECB]/50 cursor-pointer"
          >
            <option value="Todos">Rubro: Todos</option>
            {rubros.filter((r) => r !== "Todos").map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* FILTRO POR REGIÓN */}
        <div className="sm:w-48">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-xs sm:text-sm bg-[var(--t-card)] border border-[var(--t-card-border)] text-[var(--t-text)] focus:outline-none focus:ring-2 focus:ring-[#1DBECB]/50 cursor-pointer capitalize"
          >
            <option value="Todos">Región: Todas</option>
            {regiones.filter((reg) => reg !== "Todos").map((reg) => (
              <option key={reg} value={reg} className="capitalize">
                {reg}
              </option>
            ))}
          </select>
        </div>

        {/* BOTÓN REINICIAR */}
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="rounded-xl px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* GRID DE CARDS DE EMPRESAS */}
      {filteredEmpresas.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredEmpresas.map((empresa) => (
            <RondaNegociosCard
              key={empresa.id || empresa.nombre}
              empresa={empresa}
              isExpanded={expandedEmpresa === empresa.nombre}
              onToggleExpand={() =>
                onToggleExpand(expandedEmpresa === empresa.nombre ? "" : empresa.nombre)
              }
              userRole={userRole}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[var(--t-card-border)] p-12 text-center bg-[var(--t-card)]">
          <div className="text-4xl mb-3">🏢🔎</div>
          <h3 className="text-lg font-bold text-[var(--t-text)] mb-1">
            No se encontraron empresas B2B
          </h3>
          <p className="text-xs text-[var(--t-text-muted)] max-w-md mx-auto mb-4">
            No hay empresas registradas que coincidan con la búsqueda "{searchTerm}" o los filtros seleccionados.
          </p>
          <button
            onClick={handleResetFilters}
            className="rounded-xl bg-[#1DBECB] text-slate-950 px-5 py-2 text-xs font-bold hover:bg-[#7209B7] hover:text-white transition-colors cursor-pointer"
          >
            Ver todas las empresas
          </button>
        </div>
      )}
    </section>
  );
}
