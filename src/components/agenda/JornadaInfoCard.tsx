import React from "react";
import { JornadaDetail } from "./JornadaSelector";

export interface JornadaInfoCardProps {
  jornada: JornadaDetail;
}

export default function JornadaInfoCard({ jornada }: JornadaInfoCardProps) {
  return (
<div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1A2E]">
  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={jornada.img}
          alt={`${jornada.fecha} - ${jornada.nombre}`}
          className="h-full w-full object-cover"
        />
    {/* Degradado para integrar la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

    {/* INFORMACIÓN */}
      <div className="p-5 text-center">
        <p className="text-sm font-black uppercase tracking-wider text-[#A881FC]">
          {jornada.fecha}
        </p>
        <p className="mt-2 text-sm font-medium text-[var(--t-text-muted)]">
          {jornada.subtitulo}
        </p>
      </div>
    </div>  
  );
}
