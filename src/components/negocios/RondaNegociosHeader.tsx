import React from "react";
import rondaHero from "../../imports/happy-businessman-handshake-meeting-b2b-260nw-2376181961 (1).webp";

export interface RondaNegociosHeaderProps {
  onInscribirse: () => void;
}

export default function RondaNegociosHeader({
  onInscribirse,
}: RondaNegociosHeaderProps) {
return (
  <div className="relative overflow-hidden py-20 px-4 text-center">

    {/* IMAGEN DE FONDO */}
    <img
      src={rondaHero}
      alt=""
      className="absolute inset-0 h-full w-full object-cover object-center"
      aria-hidden="true"
    />

    {/* CAPA VIOLETA TRANSPARENTE */}
    <div
      className="absolute inset-0 bg-[#7209B7]/60"
      aria-hidden="true"
    />

    {/* CAPA OSCURA SUAVE PARA MEJORAR LA LEGIBILIDAD */}
    <div
      className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/20 via-transparent to-[#1A1A2E]/50"
      aria-hidden="true"
    />

    

    {/* CONTENIDO */}
    <div className="relative z-10 max-w-3xl mx-auto space-y-4">

      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1DBECB] backdrop-blur-md">

        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#1DBECB]" />

        Matchmaking Internacional • ExpoJuy 2026

      </div>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
        Conectá con el mundo
      </h1>

      <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
        El espacio de encuentro B2B más relevante del Noroeste Argentino.
        Reuniones de negocios pactadas, agenda personalizada y alianzas de
        inversión internacional.
      </p>

      <div className="pt-3">

        <button
          type="button"
          onClick={onInscribirse}
          className="bg-[#1DBECB] hover:bg-black text-slate-950 hover:text-white px-8 py-4 rounded-2xl font-black text-base transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
        >
          🤝 Solicitar Reunión B2B / Inscribirse
        </button>

      </div>

    </div>
  </div>
);
}
