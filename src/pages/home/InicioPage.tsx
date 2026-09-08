import { useEffect, useRef, useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import AguayoDivider from "../../components/common/AguayoDivider";
import StatusBadge from "../../components/common/StatusBadge";
import { noticiasService } from "../../api/services/noticiasService";
import { agendaService } from "../../api/services/agendaService";
import { Noticia, AgendaEvent } from "../../types/domain.types";

import jujuyMask from "../../assets/jujuy.png";
import logoExpojuy from "../../assets/EXPOJUY_Logo2026/RGB/expojuy26_horizontal.png";
import heroVideo from "../../assets/EXPOJUY_Logo2026/RGB/noname.mp4";
import heroImg from "../../assets/EXPOJUY_Logo2026/RGB/67124e485ddd2.jpg";
import videoMundo from "../../assets/mundo.mp4";

/* -------------------------------------------------------------------------- */
/*                              DATOS DE INTERFAZ                             */
/* -------------------------------------------------------------------------- */

const ACCIONES_RAPIDAS = [
  {
    icon: "📅",
    title: "Cronograma",
    text: "Actividades y horarios",
    section: "agenda",
    color: "#7209B7",
  },
  {
    icon: "🏢",
    title: "Expositores",
    text: "Descubrí los stands",
    section: "explorar",
    color: "#1DBECB",
  },
  {
    icon: "🎤",
    title: "Conferencias",
    text: "Charlas y encuentros",
    section: "agenda",
    color: "#A881FC",
  },
  {
    icon: "📍",
    title: "Predio",
    text: "Cómo llegar",
    section: "plano",
    color: "#7209B7",
  },
];

/* -------------------------------------------------------------------------- */
/*                              PÁGINA PRINCIPAL                              */
/* -------------------------------------------------------------------------- */

export default function InicioPage() {
  const { navigate } = useNavigation();
  const [agendaPersonal, setAgendaPersonal] = useState<string[]>([]);

  // Datos dinámicos obtenidos desde los servicios.
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [eventos, setEventos] = useState<AgendaEvent[]>([]);
  const [cargando, setCargando] = useState(true);

  // Controla la transición entre la imagen y el video principal.
  const [mostrarVideo, setMostrarVideo] = useState(false);

  // Referencia para controlar la velocidad del video decorativo.
  const mundoVideoRef = useRef<HTMLVideoElement>(null);

  /* ------------------------------------------------------------------------ */
  /*                    CONFIGURACIÓN DEL VIDEO DECORATIVO                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (mundoVideoRef.current) {
      mundoVideoRef.current.playbackRate = 0.5;
    }
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                     ALTERNANCIA ENTRE IMAGEN Y VIDEO                     */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const DURACION_IMAGEN = 3000;
    const DURACION_VIDEO = 20000;

    const temporizador = setTimeout(() => {
      setMostrarVideo((estadoActual) => !estadoActual);
    }, mostrarVideo ? DURACION_VIDEO : DURACION_IMAGEN);

    return () => clearTimeout(temporizador);
  }, [mostrarVideo]);

  const [mostrarFecha, setMostrarFecha] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMostrarFecha((prev) => !prev);
    }, 3500); // Cambia cada 3.5 segundos

    return () => clearInterval(intervalo);
  }, []);
  /* ------------------------------------------------------------------------ */
  /*                            CARGA DE CONTENIDO                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resNoticias, resAgenda] = await Promise.allSettled([
          noticiasService.getNoticias(),
          agendaService.getAgendaByDay(1),
        ]);

        if (
          resNoticias.status === "fulfilled" &&
          resNoticias.value.success &&
          resNoticias.value.data
        ) {
          setNoticias(resNoticias.value.data.slice(0, 4));
        }

        if (
          resAgenda.status === "fulfilled" &&
          resAgenda.value.success &&
          resAgenda.value.data
        ) {
          setEventos(resAgenda.value.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error al cargar datos del inicio:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="home-premium w-full min-h-screen overflow-hidden bg-white text-[#4A4A4A]">

      {/* ====================================================================
          HERO PRINCIPAL min-h-[680px] overflow-hidden bg-white lg:min-h-[720px]
      ==================================================================== */}
      <section className="relative overflow-hidden ">
      {/* ====================================================
          FONDO HERO COMPLETO — VIDEO DEL MUNDO PANORÁMICO
          ==================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none -z-0 overflow-hidden">
        
        {/* 1. El video ocupando toda la pantalla superior */}
        <video
          ref={mundoVideoRef}
          src={videoMundo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 opacity-[0.20]"
        />

        {/* 2. Capa de degradado blanco:
              - Protege la legibilidad del texto
              - Desvanece el fondo suavemente hacia la sección de abajo */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" 
          aria-hidden="true" 
        />

        {/* 3. Resplandor sutil violeta/cyan para darle profundidad de marca */}
        <div 
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7209B7]/10 blur-3xl" 
          aria-hidden="true" 
        />
        <div 
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1DBECB]/10 blur-3xl" 
          aria-hidden="true" 
        />
      </div>

        {/* Elementos decorativos del fondo */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#7209B7] opacity-[0.08] blur-3xl" />
          <div className="absolute top-[35%] -left-40 h-[380px] w-[380px] rounded-full bg-[#1DBECB] opacity-[0.10] blur-3xl" />

          <div className="absolute top-32 left-[7%] h-3 w-3 rounded-full bg-[#1DBECB]" />
          <div className="absolute top-44 left-[9%] h-2 w-2 rounded-full bg-[#A881FC]" />
          <div className="absolute right-[8%] bottom-36 h-3 w-3 rounded-full bg-[#7209B7]" />

          <div className="absolute top-[18%] right-[42%] text-3xl text-[#1DBECB]">✦</div>

        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
          <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full border border-[#7209B7]/15 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#7209B7] shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#1DBECB] shadow-[0_0_0_4px_rgba(29,190,203,0.15)]" />
            La gran expo del NOA
          </div>
          <div className="grid min-h-[600px] items-center gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-4">

            {/* --------------------------------------------------------------
                IDENTIDAD VISUAL DE JUJUY
            -------------------------------------------------------------- */}
            <div className="relative order-2 flex justify-center lg:order-1 lg:col-span-6 lg:justify-start">

              {/* Contenedor de la silueta de Jujuy */}
              <div className="relative z-10 w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px]">                <div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: `url(${jujuyMask})`,
                    maskImage: `url(${jujuyMask})`,
                    WebkitMaskSize: "contain",
                    maskSize: "cover",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                >
                  {/* Imagen estática */}
                  <img
                    src={heroImg}
                    alt="ExpoJuy - Jujuy"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      mostrarVideo ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Video que aparece automáticamente */}
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      mostrarVideo ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                {/* Indicador del contenido mostrado */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#4A4A4A] shadow-lg backdrop-blur-md">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      mostrarVideo
                        ? "animate-pulse bg-[#1DBECB]"
                        : "bg-[#7209B7]"
                    }`}
                  />

                  {mostrarVideo ? "Experiencia ExpoJuy" : "Jujuy • Ciudad Cultural"}
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------
                MENSAJE PRINCIPAL
            -------------------------------------------------------------- */}
            <div className="order-1 flex justify-center lg:order-2 lg:col-span-6">
              <div className="flex w-full max-w-[650px] flex-col items-center text-center">

                {/* Etiqueta de edición */}
                {/* Etiqueta dinámica con giro y fecha */}
                <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#1DBECB]/25 bg-[#1DBECB]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7209B7] md:text-xs shadow-sm backdrop-blur-sm transition-all duration-300">
                  <span className="h-2 w-2 rounded-full bg-[#1DBECB] animate-pulse shrink-0" />
                  
                  {/* Contenedor del texto con efecto flip 3D */}
                  <div className="relative h-4 min-w-[140px] overflow-hidden">
                    {/* Texto 1: Edición 2026 */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${
                        mostrarFecha
                          ? "-translate-y-full opacity-0 scale-95"
                          : "translate-y-0 opacity-100 scale-100"
                      }`}
                    >
                      Edición 2026
                    </span>

                    {/* Texto 2: Del 9 al 12 de Octubre */}
                    {/* Texto 2: Entra completo */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-700 transform text-[#1DBECB] font-extrabold ${
                        mostrarFecha
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
                    >
                      Del 9 al 12 de Octubre
                    </span>
                  </div>
                </div>

              

                {/* Logo principal GRANDE y centrado */}
                <div className="relative mb-6 w-full flex justify-center">
                  <div className="absolute inset-0 -z-10 rounded-full bg-[#A881FC]/15 blur-3xl" />
                  <img
                    src={logoExpojuy}
                    alt="ExpoJuy 2026"
                    className="h-auto w-[90%] sm:w-[95%] lg:w-full max-w-[640px] object-contain"
                  />
                </div>

                {/* Descripción alineada con el centro */}
                <p className="mb-6 w-full max-w-lg text-center text-sm leading-relaxed text-[#4A4A4A] md:text-base">
                  La ExpoJuy es la exposición multisectorial más importante del norte argentino, 
                  celebrada en la Ciudad Cultural de San Salvador de Jujuy, que reúne a los sectores agrícola, 
                  ganadero, industrial, minero, comercial, tecnológico y de servicios de la región
                </p>

                {/* Botones principales */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate("agenda")}
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#7209B7] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#5f0799] hover:shadow-xl"
                  >
                    Explorar ExpoJuy
                    <span className="transition group-hover:translate-x-1">→</span>
                  </button>

                  <button
                    onClick={() => navigate("noticias")}
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#7209B7] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#5f0799] hover:shadow-xl"
                  >
                    Ver novedades
                    <span>↗</span>
                  </button>
                </div>

                {/* Resumen numérico */}
                <div className="mt-8 flex flex-wrap gap-5 border-t border-[#4A4A4A]/10 pt-6">
                  <DatoHero valor="50+" etiqueta="Expositores" color="text-[#7209B7]" />
                  <DatoHero valor="20+" etiqueta="Actividades" color="text-[#1DBECB]" />
                  <DatoHero valor="01" etiqueta="Gran encuentro" color="text-[#7209B7]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          ACCIONES RÁPIDAS
      ==================================================================== */}
      <section className="relative mx-auto -mt-2 max-w-7xl px-5 md:px-8">
        <div className="premium-card grid grid-cols-2 overflow-hidden rounded-[2rem] border border-[#4A4A4A]/10 bg-white shadow-xl lg:grid-cols-4">
          {ACCIONES_RAPIDAS.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.section as "agenda" | "explorar" | "plano")}
              className="group relative cursor-pointer border-b border-[#4A4A4A]/10 p-5 text-left transition-all hover:bg-[#FAFAFA] lg:border-r lg:border-b-0 lg:p-6 last:border-r-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F7F7] text-xl transition group-hover:scale-110">
                  {item.icon}
                </div>

                <span className="text-[#8E8E93] transition group-hover:translate-x-1 group-hover:text-[#7209B7]">
                  →
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-black uppercase tracking-wide text-[#4A4A4A] transition group-hover:text-[#7209B7] md:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] text-[#8E8E93]">{item.text}</p>
              </div>

              <div
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: item.color }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Separador visual */}
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <AguayoDivider />
      </div>

      {/* ====================================================================
          NOTICIAS DESTACADAS
      ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="pointer-events-none absolute top-0 right-0 text-8xl font-black text-[#A881FC]/30">
          ✳
        </div>

        {/* Encabezado */}
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1DBECB]">
              Lo que está pasando
            </span>

            <h2 className="mt-1 text-3xl font-black tracking-tight text-[#7209B7] md:text-5xl">
              DESTACADOS
            </h2>

            <p className="mt-2 text-sm text-[#8E8E93]">
              Actualidad, novedades y noticias de ExpoJuy.
            </p>
          </div>

          <button
            onClick={() => navigate("noticias")}
            className="self-start cursor-pointer text-xs font-bold text-[#7209B7] transition hover:text-[#1DBECB] md:self-auto"
          >
            VER TODAS LAS NOTICIAS →
          </button>
        </div>

        {/* Listado de noticias */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cargando ? (
            [1, 2, 3, 4].map((numero) => (
              <div
                key={numero}
                className="h-[330px] animate-pulse rounded-[1.5rem] bg-[#F7F7F7]"
              />
            ))
          ) : noticias.length > 0 ? (
            noticias.map((noticia, indice) => (
              <article
                key={noticia.id || indice}
                className="group relative flex min-h-[330px] cursor-pointer flex-col overflow-hidden rounded-[1.5rem] bg-[#F7F7F7] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Imagen de la noticia */}
                <div className="relative h-[190px] overflow-hidden">
                  {noticia.img ? (
                    <img
                      src={noticia.img}
                      alt={noticia.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#A881FC]/20 text-5xl">
                      📰
                    </div>
                  )}

                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#7209B7] backdrop-blur">
                    ExpoJuy
                  </div>
                </div>

                {/* Información de la noticia */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DBECB]">
                    {noticia.date || "Reciente"}
                  </span>

                  <h3 className="mt-2 line-clamp-3 text-base font-black leading-tight text-[#4A4A4A] transition group-hover:text-[#7209B7]">
                    {noticia.title || `Novedad #${indice + 1}`}
                  </h3>

                  <div className="mt-auto pt-4">
                    <span className="text-xs font-bold text-[#7209B7]">
                      Leer noticia
                    </span>
                    <span className="ml-2 text-[#1DBECB] transition-all group-hover:ml-3">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-1 rounded-[1.5rem] border border-dashed border-[#4A4A4A]/20 py-14 text-center text-sm text-[#8E8E93] sm:col-span-2 lg:col-span-4">
              No hay novedades registradas por el momento.
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          AGENDA Y PRÓXIMAS ACTIVIDADES
      ==================================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">

          {/* Panel principal */}
          <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#7209B7] p-7 text-white md:p-9 lg:col-span-5">
            <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-[#A881FC] opacity-20" />
            <div className="absolute -bottom-12 -left-16 h-36 w-36 rounded-full bg-[#1DBECB] opacity-20" />

            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1DBECB]">
                Próximamente
              </span>

              <h2 className="mt-3 text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
                AGENDA
                <span className="block text-[#A881FC]">EXPOJUY</span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-purple-100/80">
                Prepará tu visita y descubrí todas las actividades que tenemos
                preparadas.
              </p>
            </div>

            {/* Métricas */}
            <div className="relative z-10 mt-8 grid grid-cols-3 gap-3">
              <Metrica valor="50+" etiqueta="Stands" />
              <Metrica valor="20+" etiqueta="Eventos" />
              <Metrica valor="+" etiqueta="Experiencias" destacado />
            </div>

            <button
              onClick={() => navigate("agenda")}
              className="group relative z-10 mt-7 self-start cursor-pointer rounded-full bg-white px-5 py-3 text-xs font-black text-[#7209B7] transition hover:scale-105"
            >
              Ver agenda completa
              <span className="ml-2 inline-block transition group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* Lista de actividades */}
          <div className="flex flex-col gap-3 lg:col-span-7">
            <div className="mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1DBECB]">
                No te lo pierdas
              </span>

              <h3 className="mt-1 text-2xl font-black text-[#4A4A4A] md:text-3xl">
                PRÓXIMAS ACTIVIDADES
              </h3>
            </div>

            {eventos.length > 0 ? (
              eventos.map((evento, indice) => (
                <div
                  key={indice}
                  className="group flex items-center gap-4 rounded-[1.5rem] border border-transparent bg-[#F8F8F8] p-4 transition-all hover:border-[#A881FC] hover:bg-white hover:shadow-lg md:p-5"
                >
                  {/* Número de actividad */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A881FC]/15 text-sm font-black text-[#7209B7] md:h-14 md:w-14">
                    {String(indice + 1).padStart(2, "0")}
                  </div>

                  {/* Información */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DBECB]">
                        {evento.hora || "Horario a confirmar"}
                      </span>

                      <StatusBadge status={evento.status || "activo"} />
                    </div>

                    <h4 className="mt-1 line-clamp-2 text-sm font-black text-[#4A4A4A] transition group-hover:text-[#7209B7] md:text-base">
                      {evento.titulo || `Actividad #${indice + 1}`}
                    </h4>
                  </div>

                  {/* Flecha decorativa */}
                  <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-white text-[#7209B7] transition group-hover:bg-[#7209B7] group-hover:text-white sm:flex">
                    →
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-dashed border-[#4A4A4A]/20 bg-[#F8F8F8] p-8 text-center text-xs text-[#8E8E93]">
                Consultá la agenda completa para conocer los horarios y
                actividades.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <div className="rounded-[2rem] border border-[#7209B7]/10 bg-[#1A1A2E] p-6 text-white shadow-xl md:flex md:items-center md:justify-between md:p-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1DBECB]">Una experiencia para todos</span>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">Conectá, descubrí y hacé negocios.</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/60">Viví cuatro jornadas de innovación, cultura e intercambio en Jujuy.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("sobre")}
            className="mt-5 inline-flex shrink-0 items-center justify-center rounded-full border border-[#1DBECB] px-6 py-3 text-sm font-bold text-[#1DBECB] transition hover:bg-[#1DBECB] hover:text-[#1A1A2E] md:mt-0"
          >
            Conocé ExpoJuy →
          </button>
        </div>
      </section>

      {/* ====================================================================
          LLAMADO FINAL A LA ACCIÓN
      ==================================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-8 pb-16 md:px-8">
        <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-[2rem] border border-[#A881FC]/20 bg-[#F5F1FF]">
          {/* Decoración de fondo */}
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#A881FC]/25" />
          <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#1DBECB]/20" />
          <div className="absolute top-10 right-[28%] text-6xl text-[#7209B7]/20">✳</div>

          <div className="relative z-10 grid w-full items-center gap-6 p-7 md:grid-cols-12 md:p-10">
            <div className="md:col-span-8">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1DBECB]">
                ¿Vas a visitar ExpoJuy?
              </span>

              <h2 className="mt-2 text-4xl font-black leading-[0.9] tracking-tight text-[#7209B7] md:text-6xl">
                PREPARÁ TU
                <span className="block text-[#1DBECB]">VISITA.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#4A4A4A]">
                Acreditate online y prepará todo para disfrutar de ExpoJuy sin
                demoras.
              </p>
            </div>

            <div className="flex md:col-span-4 md:justify-end">
              <button
                onClick={() => navigate("contacto")}
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#7209B7] px-7 py-4 text-sm font-black text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl md:w-auto"
              >
                Acreditate ahora
                <span className="transition group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PIE DECORATIVO
      ==================================================================== */}
      <div className="relative h-8 overflow-hidden">
        <div className="absolute -bottom-[45px] -left-5 h-28 w-28 rounded-full bg-[#7209B7]" />
        <div className="absolute -right-5 -bottom-[45px] h-28 w-28 rounded-full bg-[#1DBECB]" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           COMPONENTES AUXILIARES                            */
/* -------------------------------------------------------------------------- */

function DatoHero({
  valor,
  etiqueta,
  color,
}: {
  valor: string;
  etiqueta: string;
  color: string;
}) {
  return (
    <div>
      <span className={`block text-xl font-black ${color}`}>{valor}</span>
      <span className="text-[10px] uppercase tracking-wider text-[#8E8E93]">
        {etiqueta}
      </span>
    </div>
  );
}

function Metrica({
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
      <span className={`block text-2xl font-black ${destacado ? "text-[#1DBECB]" : ""}`}>
        {valor}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-purple-200">
        {etiqueta}
      </span>
    </div>
  );
}
