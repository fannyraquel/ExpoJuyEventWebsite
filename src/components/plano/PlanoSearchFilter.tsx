import React from "react";

export interface PlanoCategoria {
  id: string;
  label: string;
  cantidad: number;
}

export interface PlanoSearchFilterProps {
  busqueda: string;
  onSearchChange: (value: string) => void;
  categorias: PlanoCategoria[];
  selectedCat: string;
  onSelectCat: (catId: string) => void;
}

export default function PlanoSearchFilter({
  busqueda,
  onSearchChange,
  categorias,
  selectedCat,
  onSelectCat,
}: PlanoSearchFilterProps) {
  return (
    <section
      className="rounded-2xl border p-4 mb-6 shadow-sm transition-colors"
      style={{
        background: "var(--t-card)",
        borderColor: "var(--t-card-border)",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* INPUT DE BÚSQUEDA */}
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
            🔎
          </span>

          <input
            value={busqueda}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar empresa, stand o rubro..."
            className="w-full rounded-xl pl-11 pr-4 py-3 text-sm border focus:outline-none focus:ring-2 focus:ring-[#1DBECB]/30 transition-colors"
            style={{
              background: "var(--t-input-bg)",
              borderColor: "var(--t-input-border)",
              color: "var(--t-text)",
            }}
          />
        </div>

        {/* CATEGORÍAS */}
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => {
            const active = selectedCat === categoria.id;

            return (
              <button
                key={categoria.id}
                type="button"
                onClick={() => onSelectCat(categoria.id)}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active ? "bg-[#1DBECB] text-white" : "hover:border-[#1DBECB]"
                }`}
                style={{
                  background: active ? "#1DBECB" : "var(--t-card)",
                  borderColor: active ? "#1DBECB" : "var(--t-card-border)",
                  color: active ? "#fff" : "var(--t-text)",
                }}
              >
                {categoria.label}
                <span
                  className={`ml-1.5 ${
                    active ? "text-white/80" : "opacity-50"
                  }`}
                >
                  {categoria.cantidad}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
