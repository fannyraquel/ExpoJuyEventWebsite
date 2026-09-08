import React from "react";
import planoHero from "../../imports/san-salvador-de-jujuy-map-260nw-2570590987.webp";

export interface PlanoHeaderProps {
  showRegistroModal: boolean;
  onToggleRegistroModal: () => void;
  onOpenGame: () => void;
}

export default function PlanoHeader({
  showRegistroModal,
  onToggleRegistroModal,
  onOpenGame,
}: PlanoHeaderProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 px-4 text-center">

      {/* IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${planoHero})`,
        }}
        aria-hidden="true"
      />

      {/* CAPA VIOLETA SEMITRANSPARENTE */}
      <div
        className="absolute inset-0 bg-[#7209B7]/70 dark:bg-[#12122A]/65"
        aria-hidden="true"
      />

      {/* DEGRADADO PARA MEJORAR LEGIBILIDAD */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#7209B7]/40 via-[#7209B7]/60 to-[#12122A]/75"
        aria-hidden="true"
      />

      {/* DESTELLO TURQUESA */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#1DBECB]/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#A881FC]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ETIQUETA */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-lg mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1DBECB] animate-pulse" />
          Plano interactivo • ExpoJuy 2026
        </div>

        {/* TÍTULO */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 tracking-tight drop-shadow-lg">
          Mapa del predio
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-white/90 max-w-2xl mx-auto mb-8 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md">
          Encontrá la ubicación del predio, conocé la distribución de los
          espacios y descubrí todo lo que tiene para ofrecer.
        </p>

        {/* BOTONES */}
        <div className="flex flex-wrap justify-center gap-3">

          {/* BOTÓN REGISTRO */}
          <button
            type="button"
            onClick={onToggleRegistroModal}
            className="bg-[#7209B7] hover:bg-[#5f0799] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-[#7209B7]/30 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            {showRegistroModal
              ? "Ocultar Registro"
              : "Solicitar Stand / Registro Expositores"}
          </button>

          {/* BOTÓN JUEGO */}
          <button
            type="button"
            onClick={onOpenGame}
            className="bg-[#1DBECB] hover:bg-[#17a9b5] text-slate-950 px-6 py-3 rounded-xl text-sm font-black shadow-lg shadow-[#1DBECB]/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">🧭</span>
            Recorrer la Ciudad Cultural
          </button>

        </div>
      </div>
    </section>
  );
}