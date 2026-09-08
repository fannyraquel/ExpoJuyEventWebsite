import { useState, useEffect, useRef } from "react";
import { agendaService } from "../../api/services/agendaService";
import { AgendaDay, AgendaEvent } from "../../types/domain.types";
import StatusBadge from "../../components/common/StatusBadge";
import videoMundo from "../../assets/mundo.mp4";
import {
  AgendaHeader,
  JornadaSelector,
  RubroFilter,
  JornadaInfoCard,
  AgendaEventList,
  JornadaDetail,
} from "../../components/agenda";

export const JORNADA_INFO: Record<AgendaDay, JornadaDetail> = {
  1: {
    fecha: "09 Octubre",
    nombre: "Apertura & Producción",
    subtitulo: "Innovación regional y minería sustentable",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
  },
  2: {
    fecha: "10 Octubre",
    nombre: "Comercio & Agroindustria",
    subtitulo: "Rondas de negocios y cadena de valor",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
  },
  3: {
    fecha: "11 Octubre",
    nombre: "Tecnología & Energía",
    subtitulo: "Transición energética y economía del conocimiento",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  },
  4: {
    fecha: "12 Octubre",
    nombre: "Cultura, Turismo & Cierre",
    subtitulo: "Encuentro internacional de integración",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
  },
};

export const ALL_RUBROS = [
  "Todos",
  "Institucional",
  "Comercio",
  "Minería",
  "Negocios",
  "Turismo",
  "Agroindustria",
  "Finanzas",
  "Cultura",
  "Datos",
];

export default function AgendaPage() {
  const videoFondoRef = useRef<HTMLVideoElement | null>(null);
  const [day, setDay] = useState<AgendaDay>(1);
  const [filtroRubro, setFiltroRubro] = useState("Todos");
  const [eventos, setEventos] = useState<AgendaEvent[]>([]);
  const [cargando, setCargando] = useState(false);
  const [agendaPersonal, setAgendaPersonal] = useState<string[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<AgendaEvent | null>(null);

  useEffect(() => {
    if (videoFondoRef.current) {
      videoFondoRef.current.playbackRate = 1;
    }
  }, []);

  useEffect(() => {
    setCargando(true);
    agendaService
      .getAgendaByDay(day)
      .then((res) => {
        if (res.success && res.data) {
          setEventos(res.data);
        }
      })
      .finally(() => setCargando(false));
  }, [day]);

  const filteredEventos = eventos.filter(
    (e) => filtroRubro === "Todos" || e.rubro === filtroRubro
  );

  const jornadaActual = JORNADA_INFO[day];

  const toggleAgendaPersonal = (titulo: string) => {
    setAgendaPersonal((current) =>
      current.includes(titulo)
        ? current.filter((t) => t !== titulo)
        : [...current, titulo]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 font-sans text-slate-800 dark:text-slate-100 bg-[var(--t-bg)] transition-colors duration-300">
      {/* FONDO: VIDEO DEL MUNDO */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-white dark:bg-[#12122A]">
        <video
          ref={videoFondoRef}
          src={videoMundo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 opacity-60 dark:opacity-40"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-slate-100/90 dark:from-[#12122A]/40 dark:via-[#12122A]/70 dark:to-[#12122A]/90 transition-colors"
          aria-hidden="true"
        />

        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7209B7]/15 dark:bg-[#7209B7]/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1DBECB]/20 dark:bg-[#1DBECB]/25 blur-3xl"
          aria-hidden="true"
        />
      </div>

      {/* CONTENIDO POR ENCIMA DEL VIDEO */}
      <div className="relative z-10">
        <AgendaHeader />

        <main className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] bg-white dark:bg-[#1A1A2E] p-6 shadow-2xl border border-transparent dark:border-white/10 md:p-12 transition-colors duration-300">
            {/* Selector de Jornadas */}
            <JornadaSelector
              currentDay={day}
              jornadasInfo={JORNADA_INFO}
              onSelectDay={setDay}
            />

            {/* Filtros de Rubro */}
            <RubroFilter
              rubros={ALL_RUBROS}
              selectedRubro={filtroRubro}
              onSelectRubro={setFiltroRubro}
            />

            {/* Insignia y Encabezado por encima de los registros de la agenda */}
            <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
              <span className="rounded-full bg-[#1DBECB]/20 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0e8a95] dark:text-[#1DBECB] uppercase">
                Día {day}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white transition-colors">
                {jornadaActual.nombre}
              </h2>
            </div>

            {/* Tarjeta Informativa de la Jornada (Foto + Fecha + Subtítulo) */}
            <div className="mb-8 flex justify-center rounded-2xl bg-slate-50/50 dark:bg-white/5 p-6 border border-slate-100 dark:border-white/10 transition-colors">
              <JornadaInfoCard jornada={jornadaActual} />
            </div>

            {/* Listado de Eventos */}
            <AgendaEventList
              day={day}
              jornadaNombre={jornadaActual.nombre}
              eventos={filteredEventos}
              cargando={cargando}
              agendaPersonal={agendaPersonal}
              onToggleAgendaPersonal={toggleAgendaPersonal}
              onSelectEvento={setSelectedEvento}
            />
          </div>
        </main>
      </div>

      {/* MODAL DETALLE DE EVENTO */}
      {selectedEvento && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedEvento(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[var(--t-card-border)] bg-[var(--t-card)] p-6 text-[var(--t-text)] shadow-2xl transition-all md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#7209B7]/10 dark:bg-[#7209B7]/25 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#1DBECB]/10 dark:bg-[#1DBECB]/25 blur-2xl" />

            <button
              onClick={() => setSelectedEvento(null)}
              className="absolute top-5 right-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[var(--t-surface)] text-[var(--t-text)] transition hover:bg-[#7209B7] hover:text-white"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

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

            <h3 className="mt-4 text-xl font-black text-[var(--t-text)] md:text-2xl leading-snug">
              {selectedEvento.titulo}
            </h3>

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

            <div className="mt-7 flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => toggleAgendaPersonal(selectedEvento.titulo)}
                className="cursor-pointer rounded-full bg-[#7209B7] px-6 py-2.5 text-xs font-black text-white shadow-md transition hover:bg-[#5f0799] hover:scale-105"
              >
                {agendaPersonal.includes(selectedEvento.titulo)
                  ? "✓ Quitar de Mi Agenda"
                  : "+ Agregar a Mi Agenda"}
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
    </div>
  );
}
