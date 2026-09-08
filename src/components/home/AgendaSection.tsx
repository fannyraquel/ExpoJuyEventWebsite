import React, { useState } from "react";
import StatusBadge from "@components/common/StatusBadge";
import { AgendaEvent, Section } from "@appTypes/domain.types";

export interface AgendaSectionData {
  tag: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  metrics: Array<{
    valor: string;
    etiqueta: string;
    destacado?: boolean;
  }>;
  buttonText: string;
  buttonSection: Section;
  listTag: string;
  listTitle: string;
  emptyMessage: string;
}

interface AgendaSectionProps {
  data: AgendaSectionData;
  eventos: AgendaEvent[];
  onNavigate: (section: Section) => void;
}

export function Metrica({
  valor,
  etiqueta,
  destacado = false,
}: {
  valor: string;
  etiqueta: string;
  destacado?: boolean;
}) {
  return (
    <div className="border-t border-white/20 pt-3">
      <span
        className={`block text-2xl font-black ${
          destacado ? "text-[#1DBECB]" : ""
        }`}
      >
        {valor}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-purple-200">
        {etiqueta}
      </span>
    </div>
  );
}

export default function AgendaSection({
  data,
  eventos,
  onNavigate,
}: AgendaSectionProps) {
  const [selectedEvento, setSelectedEvento] = useState<AgendaEvent | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Panel principal */}
        <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#7209B7] p-7 text-white md:p-9 lg:col-span-5">
          <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-[#A881FC] opacity-20" />
          <div className="absolute -bottom-12 -left-16 h-36 w-36 rounded-full bg-[#1DBECB] opacity-20" />

          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1DBECB]">
              {data.tag}
            </span>

            <h2 className="mt-3 text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
              {data.titleMain}
              <span className="block text-[#A881FC]">{data.titleHighlight}</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-purple-100/80">
              {data.description}
            </p>
          </div>

          {/* Métricas */}
          <div className="relative z-10 mt-8 grid grid-cols-3 gap-3">
            {data.metrics.map((metric, idx) => (
              <Metrica
                key={idx}
                valor={metric.valor}
                etiqueta={metric.etiqueta}
                destacado={metric.destacado}
              />
            ))}
          </div>

          <button
            onClick={() => onNavigate(data.buttonSection)}
            className="group relative z-10 mt-7 self-start cursor-pointer rounded-full bg-white px-5 py-3 text-xs font-black text-[#7209B7] transition hover:scale-105"
          >
            {data.buttonText}
            <span className="ml-2 inline-block transition group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Lista de actividades */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          <div className="mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1DBECB]">
              {data.listTag}
            </span>

            <h3 className="mt-1 text-2xl font-black text-[var(--t-text)] md:text-3xl transition-colors">
              {data.listTitle}
            </h3>
          </div>

          {eventos.length > 0 ? (
            eventos.map((evento, indice) => (
              <div
                key={indice}
                onClick={() => setSelectedEvento(evento)}
                className="group flex cursor-pointer items-center gap-4 rounded-[1.5rem] border border-transparent bg-[var(--t-surface)] p-4 transition-all hover:border-[#A881FC] hover:bg-[var(--t-card)] hover:shadow-lg md:p-5"
              >
                {/* Número de actividad */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A881FC]/15 text-sm font-black text-[#7209B7] dark:text-[#A881FC] md:h-14 md:w-14">
                  {String(indice + 1).padStart(2, "0")}
                </div>

                {/* Información */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DBECB]">
                      {evento.hora || "Horario a confirmar"}
                    </span>

                    <StatusBadge status={evento.status || "activo"} />
                  </div>

                  <h4 className="mt-1 line-clamp-2 text-sm font-black text-[var(--t-text)] transition group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] md:text-base">
                    {evento.titulo || `Actividad #${indice + 1}`}
                  </h4>
                </div>

                {/* Flecha decorativa */}
                <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--t-card)] text-[#7209B7] dark:text-[#A881FC] transition group-hover:bg-[#7209B7] group-hover:text-white dark:group-hover:bg-[#7209B7] dark:group-hover:text-white sm:flex">
                  →
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--t-card-border)] bg-[var(--t-surface)] p-8 text-center text-xs text-[var(--t-text-muted)]">
              {data.emptyMessage}
            </div>
          )}
        </div>
      </div>

      {/* MODAL DETALLE DE ACTIVIDAD */}
      {selectedEvento && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedEvento(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[var(--t-card-border)] bg-[var(--t-card)] p-6 text-[var(--t-text)] shadow-2xl transition-all md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fondo decorativo del modal */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#7209B7]/10 dark:bg-[#7209B7]/25 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#1DBECB]/10 dark:bg-[#1DBECB]/25 blur-2xl" />

            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedEvento(null)}
              className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[var(--t-surface)] text-[var(--t-text)] transition hover:bg-[#7209B7] hover:text-white"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {/* Cabecera modal */}
            <div className="flex flex-wrap items-center gap-2 pr-8">
              {selectedEvento.rubro && (
                <span className="rounded-full bg-[#1DBECB]/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0e8a95] dark:text-[#1DBECB]">
                  {selectedEvento.rubro}
                </span>
              )}
              {selectedEvento.status && (
                <StatusBadge status={selectedEvento.status} />
              )}
            </div>

            {/* Título */}
            <h3 className="mt-4 text-xl font-black text-[var(--t-text)] md:text-2xl leading-snug">
              {selectedEvento.titulo}
            </h3>

            {/* Detalles principales en grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-[var(--t-surface)] p-4 text-xs">
              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[var(--t-text-muted)] text-[10px]">
                  🕒 Horario
                </span>
                <span className="font-extrabold text-[#7209B7] dark:text-[#A881FC]">
                  {selectedEvento.hora || "A confirmar"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[var(--t-text-muted)] text-[10px]">
                  📍 Ubicación / Lugar
                </span>
                <span className="font-bold text-[var(--t-text)]">
                  {selectedEvento.lugar || "Ciudad Cultural"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[var(--t-text-muted)] text-[10px]">
                  🌐 Idioma
                </span>
                <span className="font-bold text-[var(--t-text)]">
                  {selectedEvento.idioma || "Español"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase tracking-wider text-[var(--t-text-muted)] text-[10px]">
                  📌 Estado
                </span>
                <span className="font-bold capitalize text-[var(--t-text)]">
                  {selectedEvento.status}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-7 flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedEvento(null);
                  onNavigate(data.buttonSection);
                }}
                className="cursor-pointer rounded-full bg-[#7209B7] px-6 py-2.5 text-xs font-black text-white shadow-md transition hover:bg-[#5f0799] hover:scale-105"
              >
                Ver en la Agenda Completa →
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvento(null)}
                className="cursor-pointer rounded-full border border-[var(--t-card-border)] bg-[var(--t-card)] px-5 py-2.5 text-xs font-bold text-[var(--t-text)] transition hover:bg-[var(--t-surface)]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
