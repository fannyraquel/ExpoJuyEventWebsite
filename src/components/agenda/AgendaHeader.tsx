import React from "react";
import logoExpojuy from "../../assets/logoagenda.png";

export interface AgendaHeaderProps {
  badgeText?: string;
  logoAlt?: string;
}

export default function AgendaHeader({
  badgeText = "4 Días de Encuentro • San Salvador de Jujuy",
  logoAlt = "ExpoJuy 2026",
}: AgendaHeaderProps) {
  return (
    <header className="px-6 pt-24 pb-8 text-center md:pt-28">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        {/* Etiqueta superior */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1DBECB]/30 bg-white/80 dark:bg-[#1A1A2E]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#7209B7] dark:text-[#A881FC] shadow-sm backdrop-blur-md transition-colors">
          <span className="h-2 w-2 rounded-full bg-[#1DBECB] animate-pulse" />
          {badgeText}
        </div>

        {/* Logo principal GRANDE y centrado */}
        <div className="relative mb-3 w-full flex justify-center">
          <div className="absolute inset-0 -z-10 rounded-full bg-[#A881FC]/20 blur-3xl" />
          <img
            src={logoExpojuy}
            alt={logoAlt}
            className="h-auto w-[85%] sm:w-[90%] lg:w-full max-w-[520px] object-contain dark:brightness-125 dark:contrast-125 transition-all"
          />
        </div>
      </div>
    </header>
  );
}
