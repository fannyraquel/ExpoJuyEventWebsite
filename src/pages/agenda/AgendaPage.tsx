import { useState, useEffect, useRef } from "react";
import StatusBadge from "../../components/common/StatusBadge";
import { agendaService } from "../../api/services/agendaService";
import { AgendaDay, AgendaEvent } from "../../types/domain.types";
import { STATUS_CONFIG } from "../../config/theme.config";
import videoMundo from "../../assets/mundo.mp4";
import logoExpojuy from "../../assets/logoagenda.png"; // Ajustá la ruta según tu estructura
// Fotos representativas por jornada (podés reemplazar por las imágenes de tu proyecto)
const JORNADA_INFO: Record<
  AgendaDay,
  { fecha: string; nombre: string; img: string; subtitulo: string }
> = {
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


export default function AgendaPage() {
  const videoFondoRef = useRef<HTMLVideoElement | null>(null);
  const [day, setDay] = useState<AgendaDay>(1);
  const [filtroRubro, setFiltroRubro] = useState("Todos");
  const [eventos, setEventos] = useState<AgendaEvent[]>([]);
  const [cargando, setCargando] = useState(false);
  const [agendaPersonal, setAgendaPersonal] = useState<string[]>([]);

  // Reducir la velocidad del video apenas monte el componente
  useEffect(() => {
    if (videoFondoRef.current) {
      videoFondoRef.current.playbackRate = 1; // 0.4 = 40% de la velocidad normal
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

  const allRubros = [
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

  const filteredEventos = eventos.filter(
    (e) => filtroRubro === "Todos" || e.rubro === filtroRubro
  );

  const jornadaActual = JORNADA_INFO[day];
return (
    <div className="relative min-h-screen overflow-hidden pb-24 font-sans text-slate-800">
      {/* ====================================================
          FONDO: VIDEO DEL MUNDO (Estilo Hero Luminoso)
          ==================================================== */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-white">
        {/* 1. Video del mundo en loop bien visible */}
        <video
          ref={videoFondoRef}
          src={videoMundo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 opacity-60"
        />

        {/* 2. Capa de degradado blanco suave que protege legibilidad sin tapar el video */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-slate-100/90" 
          aria-hidden="true" 
        />

        {/* 3. Resplandores ambientales de marca */}
        <div 
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7209B7]/15 blur-3xl" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1DBECB]/20 blur-3xl" 
          aria-hidden="true" 
        />
      </div>

      {/* ====================================================
          CONTENIDO POR ENCIMA DEL VIDEO (z-10)
          ==================================================== */}
      <div className="relative z-10">
        {/* ====================================================
            CABECERA EDITORIAL (Con pt-24 para la navbar)
            ==================================================== */}
        <header className="px-6 pt-24 pb-8 text-center md:pt-28">
          <div className="mx-auto max-w-4xl flex flex-col items-center">
            {/* Etiqueta superior */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1DBECB]/30 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#7209B7] shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#1DBECB] animate-pulse" />
              4 Días de Encuentro • San Salvador de Jujuy
            </div>

            {/* Logo principal GRANDE y centrado */}
            <div className="relative mb-3 w-full flex justify-center">
              <div className="absolute inset-0 -z-10 rounded-full bg-[#A881FC]/20 blur-3xl" />
              <img
                src={logoExpojuy}
                alt="ExpoJuy 2026"
                className="h-auto w-[85%] sm:w-[90%] lg:w-full max-w-[520px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Subtítulo de la sección 
            <h2 className="text-xl font-bold uppercase tracking-wider text-slate-700 md:text-2xl">
              Itinerario & Agenda Oficial
            </h2>*/}
          </div>
        </header>

        {/* ====================================================
            TARJETA BLANCA FLOTANTE CENTRAL (Estilo Itinerario)
            ==================================================== */}
        <main className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] bg-white p-6 shadow-2xl md:p-12">

            {/* Selector de Jornadas (Píldoras Superiores) */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 border-b border-slate-100 pb-6 md:justify-start">
              {([1, 2, 3, 4] as AgendaDay[]).map((d) => {
                const activo = day === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      activo
                        ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30 scale-105"
                        : "bg-[#7209B7]/10 text-[#7209B7] hover:bg-[#7209B7]/20"
                    }`}
                  >
                    Día {d} • {JORNADA_INFO[d].fecha}
                  </button>
                );
              })}
            </div>

            {/* Filtros de Rubro */}
            <div className="mb-10 flex flex-wrap gap-1.5">
              {allRubros.map((r) => {
                const activo = filtroRubro === r;
                return (
                  <button
                    key={r}
                    onClick={() => setFiltroRubro(r)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                      activo
                        ? "bg-[#1DBECB] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            {/* ====================================================
                BLOQUE PRINCIPAL: FOTO CIRCULAR + LISTADO DUAL
                ==================================================== */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">

              {/* FOTO CIRCULAR EMBLEMÁTICA (Columna izquierda) */}
              <div className="flex flex-col items-center text-center md:col-span-4 md:sticky md:top-8">
                <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-white shadow-xl ring-8 ring-[#1DBECB]/20 sm:h-52 sm:w-52">
                  <img
                    src={jornadaActual.img}
                    alt={jornadaActual.nombre}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <span className="mt-4 text-xs font-bold tracking-wider text-[#7209B7] uppercase">
                  {jornadaActual.fecha}
                </span>
                <p className="mt-1 max-w-[200px] text-xs text-slate-500">
                  {jornadaActual.subtitulo}
                </p>
              </div>

              {/* LISTA DE EVENTOS (Columna derecha: Hora vs Actividad) */}
              <div className="md:col-span-8">

                {/* Insignia de encabezado de bloque */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#1DBECB]/20 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0e8a95] uppercase">
                    Día {day}
                  </span>
                  <h2 className="text-xl font-bold text-slate-800">
                    {jornadaActual.nombre}
                  </h2>
                </div>

                {cargando ? (
                  <div className="flex h-48 items-center justify-center">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#7209B7] border-t-transparent" />
                  </div>
                ) : filteredEventos.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
                    No hay actividades registradas para este rubro.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredEventos.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-4 transition-colors hover:bg-slate-50/80 rounded-xl px-2.5"
                        >
                          {/* Columna Izquierda: Hora */}
                          <div className="min-w-[100px] text-xs sm:text-sm font-semibold tracking-tight text-slate-400 group-hover:text-[#7209B7] transition-colors">
                            {e.hora}
                          </div>

                          {/* Columna Derecha: Título, Lugar y Tags */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                                {e.titulo}
                              </h3>
                              <div className="shrink-0">
                                <StatusBadge status={e.status} />
                              </div>
                            </div>

                            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                              <span>📍 {e.lugar}</span>
                              <span>🌐 {e.idioma}</span>
                              <span className="font-semibold text-[#1DBECB]">
                                {e.rubro}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setAgendaPersonal((current) =>
                                    current.includes(e.titulo)
                                      ? current.filter((title) => title !== e.titulo)
                                      : [...current, e.titulo],
                                  )
                                }
                                className="ml-auto font-bold text-[#7209B7] hover:underline cursor-pointer"
                              >
                                {agendaPersonal.includes(e.titulo) ? "✓ En mi agenda" : "+ Mi agenda"}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
