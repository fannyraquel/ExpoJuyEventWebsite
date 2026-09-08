import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@context/NavigationContext";
import AguayoDivider from "@components/common/AguayoDivider";
import { noticiasService } from "@api/services/noticiasService";
import { agendaService } from "@api/services/agendaService";
import { Noticia, AgendaEvent } from "@appTypes/domain.types";

import {
  HeroSection,
  AccionesRapidasSection,
  AgendaSection,
  ExperienciaBannerSection,
  CtaVisitaSection,
  NoticiasDestacadasSection,
  FooterDecorativoSection,
  DatoHero,
  Metrica,
  HeroData,
  AccionRapidaItem,
  AgendaSectionData,
  ExperienciaBannerData,
  CtaVisitaData,
  NoticiasDestacadasData,
} from "@components/home";

/* -------------------------------------------------------------------------- */
/*                              DATOS DE INTERFAZ                             */
/* -------------------------------------------------------------------------- */

export const HERO_DATA: HeroData = {
  badge: "La gran expo del NOA",
  editionTagline: {
    text1: "Edición 2026",
    text2: "Del 9 al 12 de Octubre",
  },
  logoAlt: "ExpoJuy 2026",
  description:
    "La ExpoJuy es la exposición multisectorial más importante del norte argentino, celebrada en la Ciudad Cultural de San Salvador de Jujuy, que reúne a los sectores agrícola, ganadero, industrial, minero, comercial, tecnológico y de servicios de la región",
  buttons: [
    { text: "Explorar ExpoJuy", section: "agenda", arrow: "→" },
    { text: "Ver novedades", section: "noticias", arrow: "↗" },
  ],
  stats: [
    { valor: "50+", etiqueta: "Expositores", color: "text-[#7209B7]" },
    { valor: "20+", etiqueta: "Actividades", color: "text-[#1DBECB]" },
    { valor: "01", etiqueta: "Gran encuentro", color: "text-[#7209B7]" },
  ],
  badgeVideoText: "Experiencia ExpoJuy",
  badgeImageText: "Jujuy • Ciudad Cultural",
};

export const ACCIONES_RAPIDAS_DATA: AccionRapidaItem[] = [
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

export const AGENDA_SECTION_DATA: AgendaSectionData = {
  tag: "Próximamente",
  titleMain: "AGENDA",
  titleHighlight: "EXPOJUY",
  description:
    "Prepará tu visita y descubrí todas las actividades que tenemos preparadas.",
  metrics: [
    { valor: "50+", etiqueta: "Stands" },
    { valor: "20+", etiqueta: "Eventos" },
    { valor: "+", etiqueta: "Experiencias", destacado: true },
  ],
  buttonText: "Ver agenda completa",
  buttonSection: "agenda",
  listTag: "No te lo pierdas",
  listTitle: "PRÓXIMAS ACTIVIDADES",
  emptyMessage:
    "Consultá la agenda completa para conocer los horarios y actividades.",
};

export const EXPERIENCIA_BANNER_DATA: ExperienciaBannerData = {
  tag: "Una experiencia para todos",
  title: "Conectá, descubrí y hacé negocios.",
  description:
    "Viví cuatro jornadas de innovación, cultura e intercambio en Jujuy.",
  buttonText: "Conocé ExpoJuy →",
  buttonSection: "sobre",
};

export const CTA_VISITA_DATA: CtaVisitaData = {
  tag: "¿Vas a visitar ExpoJuy?",
  titleMain: "PREPARÁ TU",
  titleHighlight: "VISITA.",
  description:
    "Acreditate online y prepará todo para disfrutar de ExpoJuy sin demoras.",
  buttonText: "Acreditate ahora",
  buttonSection: "acreditacion",
};

export const NOTICIAS_DESTACADAS_DATA: NoticiasDestacadasData = {
  tag: "Lo que está pasando",
  title: "DESTACADOS",
  description: "Actualidad, novedades y noticias de ExpoJuy.",
  buttonText: "VER TODAS LAS NOTICIAS →",
  buttonSection: "noticias",
  badgeLabel: "ExpoJuy",
  readMoreText: "Leer noticia",
  emptyMessage: "No hay novedades registradas por el momento.",
};

// Re-export auxiliar subcomponents & section components for dynamic reuse
export {
  DatoHero,
  Metrica,
  HeroSection,
  AccionesRapidasSection,
  AgendaSection,
  ExperienciaBannerSection,
  CtaVisitaSection,
  NoticiasDestacadasSection,
  FooterDecorativoSection,
};

/* -------------------------------------------------------------------------- */
/*                              PÁGINA PRINCIPAL                              */
/* -------------------------------------------------------------------------- */

export default function InicioPage() {
  const { navigate } = useNavigation();

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
    <div className="home-premium w-full min-h-screen overflow-hidden bg-[var(--t-bg)] text-[var(--t-text)] transition-colors duration-300">
      {/* 1. HERO PRINCIPAL */}
      <HeroSection
        data={HERO_DATA}
        mostrarVideo={mostrarVideo}
        mostrarFecha={mostrarFecha}
        mundoVideoRef={mundoVideoRef}
        onNavigate={navigate}
      />

      {/* 2. ACCIONES RÁPIDAS */}
      <AccionesRapidasSection
        items={ACCIONES_RAPIDAS_DATA}
        onNavigate={navigate}
      />

      {/* Separador visual */}
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <AguayoDivider />
      </div>

      {/* 3. AGENDA Y PRÓXIMAS ACTIVIDADES */}
      <AgendaSection
        data={AGENDA_SECTION_DATA}
        eventos={eventos}
        onNavigate={navigate}
      />

      {/* 4. BANNER EXPERIENCIA */}
      <ExperienciaBannerSection
        data={EXPERIENCIA_BANNER_DATA}
        onNavigate={navigate}
      />

      {/* 5. LLAMADO FINAL A LA ACCIÓN */}
      <CtaVisitaSection
        data={CTA_VISITA_DATA}
        onNavigate={navigate}
      />

      {/* 6. NOTICIAS DESTACADAS */}
      <NoticiasDestacadasSection
        data={NOTICIAS_DESTACADAS_DATA}
        noticias={noticias}
        cargando={cargando}
        onNavigate={navigate}
      />

      {/* 7. PIE DECORATIVO */}
      <FooterDecorativoSection />
    </div>
  );
}
