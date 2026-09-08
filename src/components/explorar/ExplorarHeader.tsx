import React from "react";

import explorarHero from "../../imports/CAEII-EXAR.webp";

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
    <div className="relative overflow-hidden py-14 px-4">

      {/* IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${explorarHero})`,
        }}
        aria-hidden="true"
      />

      {/* CAPA VIOLETA */}
      <div
        className="absolute inset-0 bg-[#7209B7]/55 dark:bg-[#12122A]/75"
        aria-hidden="true"
      />

      {/* BRILLO TURQUESA */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#1DBECB]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* BRILLO VIOLETA */}
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#A881FC]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto max-w-3xl space-y-4 text-center">

        {/* ETIQUETA */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#1DBECB]" />
          Catálogo Oficial • ExpoJuy 2026
        </div>

        {/* TÍTULO */}
        <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
          Expositores &amp; Empresas
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="mx-auto max-w-xl text-xs leading-relaxed text-white/85 sm:text-sm">
          Descubrí la nómina oficial de expositores acreditados y las empresas
          a las que representan. Consultá ofertas de inversión, comercio y
          agenda reuniones B2B.
        </p>

        {/* BUSCADOR */}
        <div className="mx-auto flex max-w-xl gap-2 pt-2">

          <div className="relative flex-1">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && onSearchSubmit()
              }
              placeholder="Buscar por nombre, rubro, región o CUIT..."
              className="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-sm text-white placeholder-white/60 backdrop-blur-md transition-all focus:border-[#1DBECB] focus:outline-none focus:ring-2 focus:ring-[#1DBECB]/40"
            />
          </div>

          <button
            type="button"
            onClick={onSearchSubmit}
            className="shrink-0 rounded-xl bg-[#1A1A2E] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-black cursor-pointer"
          >
            Buscar
          </button>

        </div>
      </div>
    </div>
  );
}