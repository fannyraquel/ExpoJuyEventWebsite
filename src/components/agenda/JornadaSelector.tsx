import React from "react";
import { AgendaDay } from "../../types/domain.types";

export interface JornadaDetail {
  fecha: string;
  nombre: string;
  subtitulo: string;
  img: string;
}

export interface JornadaSelectorProps {
  currentDay: AgendaDay;
  jornadasInfo: Record<AgendaDay, JornadaDetail>;
  onSelectDay: (day: AgendaDay) => void;
}

export default function JornadaSelector({
  currentDay,
  jornadasInfo,
  onSelectDay,
}: JornadaSelectorProps) {
  const days: AgendaDay[] = [1, 2, 3, 4];

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 dark:border-white/10 pb-6 md:justify-start transition-colors">
      {days.map((d) => {
        const activo = currentDay === d;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onSelectDay(d)}
            className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activo
                ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30 scale-105"
                : "bg-[#7209B7]/10 dark:bg-[#7209B7]/25 text-[#7209B7] dark:text-[#A881FC] hover:bg-[#7209B7]/20"
            }`}
          >
            Día {d} • {jornadasInfo[d]?.fecha}
          </button>
        );
      })}
    </div>
  );
}
