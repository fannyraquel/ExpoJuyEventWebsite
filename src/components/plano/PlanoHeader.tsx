import React from "react";

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
    <section className="bg-[#1DBECB]/78 py-12 px-4 text-center backdrop-blur-sm">
      <div className="font-mono-data text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
        Plano interactivo
      </div>

      <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
        Mapa del predio
      </h1>

      <p className="text-white/80 max-w-2xl mx-auto mb-6">
        Encontrá la ubicación del predio, conocé la distribución de los espacios y descubrí todo lo que tiene para ofrecer.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {/* BOTÓN REGISTRO */}
        <button
          type="button"
          onClick={onToggleRegistroModal}
          className="bg-[#7209B7] hover:bg-[#4D0080] text-white px-6 py-3 rounded-lg text-sm font-bold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
        >
          {showRegistroModal ? "Ocultar Registro" : "Solicitar Stand / Registro Expositores"}
        </button>

        {/* BOTÓN JUEGO */}
        <button
          type="button"
          onClick={onOpenGame}
          className="bg-white hover:bg-white/90 text-[#7209B7] px-6 py-3 rounded-lg text-sm font-black shadow-md transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
        >
          <span className="text-lg">🧭</span>
          Recorrer la Ciudad Cultural
        </button>
      </div>
    </section>
  );
}
