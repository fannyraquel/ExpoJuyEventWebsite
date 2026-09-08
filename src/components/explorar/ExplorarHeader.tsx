import React from "react";

export interface ExplorarHeaderProps {
  busqueda: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export default function ExplorarHeader({
  busqueda,
  onSearchChange,
  onSearchSubmit,
}: ExplorarHeaderProps) {
  return (
    <div className="bg-[#7209B7]/90 py-14 px-4 backdrop-blur-sm text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#1DBECB]" />
          Catálogo Oficial • ExpoJuy 2026
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
          Expositores &amp; Empresas
        </h1>

        <p className="text-white/80 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Descubrí la nómina oficial de expositores acreditados y las empresas a las que representan. Consultá ofertas de inversión, comercio y agenda reuniones B2B.
        </p>

        <div className="flex gap-2 max-w-xl mx-auto pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
              placeholder="Buscar por nombre, rubro, región o CUIT..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-[#1DBECB]/40 text-sm backdrop-blur-md transition-all"
            />
          </div>
          <button
            type="button"
            onClick={onSearchSubmit}
            className="bg-[#1A1A2E] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all hover:scale-105 shadow-md cursor-pointer shrink-0"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
