import { useState } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import GaleriaEdicionAccordion from "../../components/common/GaleriaEdicionAccordion";
import { SITE_CONFIG } from "../../config/site.config";
import { DATA_INDICATORS } from "../../data/indicadores.data";
import { useNavigation } from "@context/NavigationContext";

// Carga automática de imágenes de la carpeta Galeria Ediciones usando Vite Glob
const galleryModules = import.meta.glob<string>(
  "../../assets/Galeria Ediciones/*/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

// Importación de fotos de muestra para 2026 y 2014
import img2026_1 from "../../assets/67124e485ddd2.jpg";
import img2026_2 from "../../assets/jujuy.png";
import img2026_3 from "../../assets/logoagenda.png";
import img2026_4 from "../../assets/plano-predio.png";
import img2026_5 from "../../assets/happy-businessman-handshake-meeting-b2b-260nw-2376181961.webp";

interface EdicionHistorica {
  year: string;
  numero: number;
  titulo: string;
  desc: string;
  icon: string;
  tag: string;
  destacado?: boolean;
}

export default function SobrePage() {
  const { navigate } = useNavigation();

  // Estado para el acordeón desplegable por año (por defecto '2026' abierto)
  const [openAccordionYear, setOpenAccordionYear] = useState<string | null>("2026");

  // Ediciones históricas ordenadas DEL MÁS RECIENTE AL MÁS VIEJO (2026 N°17 -> 2014 N°12)
  const historiaEdiciones: EdicionHistorica[] = [
    {
      year: "2026",
      numero: 17,
      titulo: "17° Edición Internacional",
      desc: "La Gran Muestra Multisectorial e Industrial: 312 expositores, 23 naciones y USD 280M en acuerdos comerciales.",
      icon: "✨",
      tag: "Edición Actual",
      destacado: true,
    },
    {
      year: "2024",
      numero: 16,
      titulo: "16° Edición Internacional",
      desc: "Consolidación de Jujuy en el eje estratégico del Corredor Bioceánico e integración de la minería del litio.",
      icon: "🌐",
      tag: "Bioceánico",
    },
    {
      year: "2022",
      numero: 15,
      titulo: "15° Edición Internacional",
      desc: "Récord histórico de presencia empresarial post-pandemia: 240 expositores y 15 países participantes.",
      icon: "🚀",
      tag: "Récord",
    },
    {
      year: "2018",
      numero: 14,
      titulo: "14° Edición Internacional",
      desc: "Primera delegación internacional con representación de la industria naval y astillera de Brasil.",
      icon: "🇧🇷",
      tag: "Internacional",
    },
    {
      year: "2016",
      numero: 13,
      titulo: "13° Edición Internacional",
      desc: "Apertura de fronteras regionales: Integración de la matriz comercial NOA y acuerdos estratégicos con Bolivia.",
      icon: "🇦🇷",
      tag: "Expansión",
    },
    {
      year: "2014",
      numero: 12,
      titulo: "12° Edición Internacional",
      desc: "Primera edición registrada en el archivo digital unificado: 80 expositores y foco en productores del Norte Argentino.",
      icon: "🌱",
      tag: "Fundacional Digital",
    },
  ];

  // Función para obtener las fotos correspondientes a un año
  const getPhotosForYear = (year: string): string[] => {
    if (year === "2026") {
      return [img2026_1, img2026_2, img2026_3, img2026_4, img2026_5];
    }

    const photos: string[] = [];
    Object.entries(galleryModules).forEach(([path, url]) => {
      if (path.includes(`/Galeria Ediciones/${year}/`)) {
        photos.push(url);
      }
    });
    return photos;
  };

  return (
    <div className="relative min-h-screen bg-[var(--t-bg)] text-[var(--t-text)] pt-20 pb-24 transition-colors duration-300 overflow-hidden">
      {/* GLOW DECORATIVO AMBIENTAL DE FONDO */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-gradient-to-tr from-[#7209B7]/25 via-[#9D4EDD]/20 to-transparent blur-[140px] dark:from-[#7209B7]/35 dark:via-[#9D4EDD]/25" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-[#1DBECB]/25 via-[#3A0CA3]/20 to-transparent blur-[150px] dark:from-[#1DBECB]/35" />

      {/* 1. HERO SECTION */}
      <section className="relative border-b border-[var(--t-card-border)] bg-gradient-to-b from-purple-900/10 via-transparent to-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1DBECB]/40 bg-[#1DBECB]/10 px-4 py-1.5 text-xs font-black text-[#0e8a95] dark:text-[#1DBECB] shadow-sm mb-5">
            <span>🏛️ Institucional · Cámara de Comercio Exterior de Jujuy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-5 leading-tight">
            <span className="bg-gradient-to-r from-[#7209B7] via-[#9D4EDD] to-[#1DBECB] bg-clip-text text-transparent">
              Historia, Misión &amp; Métricas
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-lg text-[var(--t-text-muted)] font-semibold leading-relaxed mb-10">
            Desde 2014, ExpoJuy es el escenario multisectorial e industrial de referencia del Noroeste Argentino, conectando el potencial minero, biotecnológico, agrícola e industrial de Jujuy con los mercados del mundo.
          </p>

          {/* INSIGNIAS RÁPIDAS DE IMPACTO EN EL HERO */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#141728]/80 backdrop-blur-md p-4 shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-[#7209B7] dark:text-[#A881FC] block mb-0.5">312+</span>
              <span className="text-xs font-bold text-[var(--t-text-muted)] uppercase tracking-wider">Empresas Expositoras</span>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#141728]/80 backdrop-blur-md p-4 shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-[#1DBECB] block mb-0.5">23</span>
              <span className="text-xs font-bold text-[var(--t-text-muted)] uppercase tracking-wider">Países Participantes</span>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#141728]/80 backdrop-blur-md p-4 shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 block mb-0.5">USD 280M</span>
              <span className="text-xs font-bold text-[var(--t-text-muted)] uppercase tracking-wider">Negocios Proyectados</span>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#141728]/80 backdrop-blur-md p-4 shadow-lg">
              <span className="text-2xl sm:text-3xl font-black text-emerald-500 block mb-0.5">45.000+</span>
              <span className="text-xs font-bold text-[var(--t-text-muted)] uppercase tracking-wider">Visitantes Esperados</span>
            </div>
          </div>
        </div>
      </section>

      <AguayoDivider />

      {/* 2. LEMA 2026 & VALORES ESTRATÉGICOS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEMA PRINCIPAL */}
          <div className="lg:col-span-7 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-[#7209B7] via-[#5C0793] to-[#3A0CA3] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#1DBECB]/25 blur-3xl" />
            <div>
              <span className="inline-block rounded-full bg-white/20 border border-white/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider mb-6">
                Lema Oficial ExpoJuy 2026
              </span>
              <h3 className="font-display text-2xl sm:text-4xl italic font-black mb-4 leading-tight">
                "{SITE_CONFIG.lema}"
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
                Una visión compartida que une la matriz productiva provincial con los mercados globales, potenciando la minería sustentable, la energía limpia, la agroindustria y la biotecnología.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold text-purple-200">
                📍 San Salvador de Jujuy · Ciudad Cultural
              </span>
              <button
                type="button"
                onClick={() => navigate("contacto")}
                className="rounded-xl bg-white text-slate-950 px-4 py-2 text-xs font-black hover:bg-slate-100 transition-all shadow-md cursor-pointer"
              >
                Contactar Organización
              </button>
            </div>
          </div>

          {/* PILARES ESTRATÉGICOS */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-[#141728]/90 p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⛏️</span>
                <h4 className="text-base font-black">Minería Sustentable &amp; Litio</h4>
              </div>
              <p className="text-xs text-[var(--t-text-muted)] font-medium leading-relaxed">
                Jujuy a la vanguardia de la transición energética global con importantes proyectos de extracción e industrialización de litio.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-[#141728]/90 p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌾</span>
                <h4 className="text-base font-black">Agroindustria &amp; Biotecnología</h4>
              </div>
              <p className="text-xs text-[var(--t-text-muted)] font-medium leading-relaxed">
                Producción de valor agregado, cultivos sustentables e innovación biotecnológica aplicada al agro.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-[#141728]/90 p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🤝</span>
                <h4 className="text-base font-black">Ronda de Negocios B2B Internacional</h4>
              </div>
              <p className="text-xs text-[var(--t-text-muted)] font-medium leading-relaxed">
                Encuentros ejecutivos presenciales entre compradores internacionales, PyMES y proveedores locales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AguayoDivider />

      {/* 3. LÍNEA DE TIEMPO INTERACTIVA ORDENADA DEL MÁS RECIENTE AL MÁS VIEJO (2026 -> 2014) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7209B7]/40 bg-[#7209B7]/10 px-4 py-1.5 text-xs font-black text-[#7209B7] dark:text-[#A881FC] shadow-sm mb-3">
              <span>🖼️ Galería Fotográfica Interactiva</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
              Trayectoria &amp; Ediciones Históricas
            </h2>
            <p className="text-xs sm:text-sm text-[var(--t-text-muted)] font-semibold leading-relaxed">
              Hacé clic en cualquier edición para abrir su **galería de imágenes estilo Pinterest**. Ordenado de la edición actual hasta el registro inicial de 2014.
            </p>
          </div>

          <div className="relative border-l-2 border-[#7209B7]/30 dark:border-[#7209B7]/50 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
            {historiaEdiciones.map((item) => {
              const isAccordionOpen = openAccordionYear === item.year;
              const editionPhotos = getPhotosForYear(item.year);

              return (
                <div key={item.year} className="group relative">
                  {/* Nodo en la línea de tiempo */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#7209B7] text-white text-xs font-black shadow-lg border-2 border-white dark:border-[#121528] group-hover:scale-125 group-hover:bg-[#1DBECB] transition-transform duration-300">
                    {item.icon}
                  </div>

                  <div
                    className={`rounded-3xl border p-6 sm:p-7 shadow-lg transition-all duration-300 ${
                      item.destacado
                        ? "border-[#7209B7] bg-gradient-to-r from-[#7209B7]/10 via-[var(--t-surface)] to-[#1DBECB]/10 dark:bg-[#18152E]"
                        : "border-slate-200 dark:border-white/15 bg-white/90 dark:bg-[#141728]/90"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-data text-xl sm:text-2xl font-black text-[#7209B7] dark:text-[#A881FC]">
                          Edición {item.year}
                        </span>
                        <span className="rounded-full bg-slate-200 dark:bg-white/10 px-3 py-1 text-xs font-extrabold text-slate-700 dark:text-slate-200">
                          {item.titulo}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#1DBECB]/15 text-[#0e8a95] dark:text-[#1DBECB] border border-[#1DBECB]/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* ACORDEÓN DESPLEGABLE DE GALERÍA DE FOTOS REUTILIZABLE (SOLO SI TIENE IMÁGENES) */}
                    {editionPhotos.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/10">
                        <GaleriaEdicionAccordion
                          imagenes={editionPhotos}
                          titulo={`Galería Fotográfica ${item.year}`}
                          isOpen={isAccordionOpen}
                          onToggle={() =>
                            setOpenAccordionYear(isAccordionOpen ? null : item.year)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* NOTA INSTITUCIONAL DE EDICIONES ANTERIORES (1990 A 2012 / EDICIONES 1 A 11) */}
            <div className="relative mt-12 rounded-3xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-100/60 dark:bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <span className="text-3xl p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 shrink-0">
                  📜
                </span>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Ediciones Anteriores (1° a 11° Edición — 1990 a 2012)
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--t-text-muted)] font-medium leading-relaxed">
                    ExpoJuy cuenta con un valioso legado histórico iniciado en la década de 1990. Los registros fotográficos impresos y carpetas de archivo de las primeras **11 ediciones** se conservan en el archivo histórico documental físico en la sede de la Cámara de Comercio Exterior de Jujuy. Esta plataforma digital integra el acervo fotográfico desde la **12° Edición (2014)** hasta la actual **17° Edición Internacional (2026)**.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AguayoDivider />

      {/* 4. SECCIÓN DESTACADA: EXPOJUY DATA (GRILLA CON MÉTRICAS VERIFICADAS) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7209B7]/40 bg-[#7209B7]/10 px-4 py-1.5 text-xs font-black text-[#7209B7] dark:text-[#A881FC] shadow-sm mb-3">
              <span>📊 Dashboard Informativo Verificado</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              ExpoJuy DATA — Indicadores Clave
            </h2>
            <p className="text-sm sm:text-base text-[var(--t-text-muted)] font-semibold leading-relaxed">
              Métricas oficiales, superficie de exposición, proyecciones financieras e interacciones de negocios verificadas para la edición 2026.
            </p>
          </div>

          {/* GRILLA DE INDICADORES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA_INDICATORS.map((indicator) => (
              <div
                key={indicator.label}
                className="group relative rounded-3xl border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-[#121528]/95 backdrop-blur-xl p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#1DBECB]/50 overflow-hidden"
              >
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[#1DBECB]/10 blur-2xl group-hover:bg-[#7209B7]/20 transition-all duration-500" />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7209B7]/15 to-[#1DBECB]/15 border border-[#1DBECB]/30 text-3xl shadow-inner transition-transform group-hover:scale-110">
                    {indicator.icon}
                  </div>
                  <span className="font-mono-data text-xs font-black uppercase tracking-wider text-[#0e8a95] dark:text-[#1DBECB] bg-[#1DBECB]/10 px-3 py-1 rounded-full border border-[#1DBECB]/30 shadow-sm">
                    {indicator.unit}
                  </span>
                </div>

                <div className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] transition-colors">
                  {indicator.value}
                </div>

                <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 mb-1">
                  {indicator.label}
                </div>

                <p className="text-xs text-[var(--t-text-muted)] font-medium">
                  Indicador oficial verificado ExpoJuy 2026.
                </p>
              </div>
            ))}
          </div>

          {/* NOTA DE TRANSPARENCIA */}
          <div className="mt-12 rounded-3xl border border-[#1DBECB]/40 bg-gradient-to-r from-[#1DBECB]/10 via-[var(--t-surface)] to-[#7209B7]/10 p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-lg backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0e8a95] dark:text-[#1DBECB] mb-2 font-mono">
              <span>📌 Transparencia Institucional &amp; Fuentes</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--t-text-muted)] font-semibold leading-relaxed">
              Todos los indicadores oficiales son auditados y publicados al cierre de cada edición por la **Cámara de Comercio Exterior de Jujuy**. Los valores pre-evento reflejan proyecciones confirmadas mediante registro directo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
