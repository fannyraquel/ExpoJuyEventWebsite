import React from "react";
import StatusBadge from "@components/common/StatusBadge";
import { AgendaDay, AgendaEvent } from "@appTypes/domain.types";

export interface AgendaEventListProps {
  day: AgendaDay;
  jornadaNombre: string;
  eventos: AgendaEvent[];
  cargando: boolean;
  agendaPersonal: string[];
  onToggleAgendaPersonal: (titulo: string) => void;
  onSelectEvento?: (evento: AgendaEvent) => void;
  showBadgeHeader?: boolean;
}

export default function AgendaEventList({
  day,
  jornadaNombre,
  eventos,
  cargando,
  agendaPersonal,
  onToggleAgendaPersonal,
  onSelectEvento,
  showBadgeHeader = false,
}: AgendaEventListProps) {
  return (
    <div className="w-full">
      {/* Insignia de encabezado opcional dentro del listado */}
      {showBadgeHeader && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#1DBECB]/20 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0e8a95] dark:text-[#1DBECB] uppercase">
            Día {day}
          </span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">
            {jornadaNombre}
          </h2>
        </div>
      )}

      {cargando ? (
        <div className="flex h-48 items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#7209B7] border-t-transparent" />
        </div>
      ) : eventos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-white/20 p-8 text-center text-xs text-slate-400 dark:text-slate-500">
          No hay actividades registradas para este rubro.
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/10 transition-colors">
          {eventos.map((e, i) => {
            const enAgenda = agendaPersonal.includes(e.titulo);
            return (
              <div
                key={i}
                onClick={() => onSelectEvento && onSelectEvento(e)}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-[#23233E]/80 rounded-xl px-2.5 cursor-pointer"
              >
                {/* Columna Izquierda: Hora */}
                <div className="min-w-[100px] text-xs sm:text-sm font-semibold tracking-tight text-slate-400 dark:text-slate-400 group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] transition-colors">
                  {e.hora}
                </div>

                {/* Columna Derecha: Título, Lugar y Tags */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 leading-snug group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] transition-colors">
                      {e.titulo}
                    </h3>
                    <div className="shrink-0">
                      <StatusBadge status={e.status} />
                    </div>
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400 dark:text-slate-400">
                    <span>📍 {e.lugar}</span>
                    <span>🌐 {e.idioma}</span>
                    <span className="font-semibold text-[#1DBECB]">
                      {e.rubro}
                    </span>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onToggleAgendaPersonal(e.titulo);
                      }}
                      className="ml-auto font-bold text-[#7209B7] dark:text-[#A881FC] hover:underline cursor-pointer"
                    >
                      {enAgenda ? "✓ En mi agenda" : "+ Mi agenda"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
