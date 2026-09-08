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
        {/* Logo principal GRANDE y centrado */}
      <div className="relative mb-3 w-full flex justify-center items-center">

        {/* Halo lila */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -z-10
            h-[65%]
            w-[70%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#A881FC]/15
            blur-[65px]
            dark:bg-[#A881FC]/30
            dark:blur-[80px]
            transition-all
            duration-700
          "
          aria-hidden="true"
        />

        {/* Halo turquesa */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -z-10
            h-[40%]
            w-[55%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#1DBECB]/10
            blur-[50px]
            dark:bg-[#1DBECB]/25
            dark:blur-[60px]
            transition-all
            duration-700
          "
          aria-hidden="true"
        />

        <img
          src={logoExpojuy}
          alt={logoAlt}
          className="
            relative
            z-10
            h-auto
            w-[85%]
            sm:w-[90%]
            lg:w-full
            max-w-[520px]
            object-contain
            transition-all
            duration-500

            dark:brightness-125
            dark:contrast-125
            dark:saturate-125
            dark:mix-blend-screen
            dark:drop-shadow-[0_0_18px_rgba(168,129,252,0.30)]
          "
        />

      </div>
      </div>
    </header>
  );
}
