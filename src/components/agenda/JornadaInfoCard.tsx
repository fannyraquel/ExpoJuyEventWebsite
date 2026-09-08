import React from "react";
import { JornadaDetail } from "./JornadaSelector";

export interface JornadaInfoCardProps {
  jornada: JornadaDetail;
}

export default function JornadaInfoCard({ jornada }: JornadaInfoCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full border-4 border-white dark:border-[#23233E] shadow-xl ring-8 ring-[#1DBECB]/20 transition-all">
        <img
          src={jornada.img}
          alt={jornada.nombre}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <span className="mt-4 text-xs font-bold tracking-wider text-[#7209B7] dark:text-[#A881FC] uppercase">
        {jornada.fecha}
      </span>
      <p className="mt-1 max-w-sm text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
        {jornada.subtitulo}
      </p>
    </div>
  );
}
