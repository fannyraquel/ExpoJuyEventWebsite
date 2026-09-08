import { useState, useEffect, useMemo } from "react";
import { Sponsor, SponsorTier, SPONSOR_TIERS } from "@appTypes/sponsor.types";
import { sponsorsService } from "@api/services/sponsorsService";
import AguayoDivider from "@components/common/AguayoDivider";
import { useNavigation } from "@context/NavigationContext";

export default function SponsorsPage() {
  const { navigate } = useNavigation();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSponsorModal, setActiveSponsorModal] = useState<Sponsor | null>(null);

  // Carga asíncrona simulada desde backend
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await sponsorsService.getSponsors();
        setSponsors(data);
      } catch (err) {
        console.error("Error al cargar sponsors:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtrado reactivo por término de búsqueda y categoría
  const filteredSponsors = useMemo(() => {
    return sponsors.filter((sp) => {
      const matchSearch =
        sp.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sp.rubro && sp.rubro.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sp.descripcion && sp.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTier = selectedTierFilter === "todos" || sp.tier === selectedTierFilter;

      return matchSearch && matchTier;
    });
  }, [sponsors, searchQuery, selectedTierFilter]);

  // Lista ordenada de Tiers a renderizar
  const tierList = useMemo(() => {
    return Object.values(SPONSOR_TIERS).sort((a, b) => a.orden - b.orden);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--t-bg)] text-[var(--t-text)] pt-20 pb-24 transition-colors duration-300 overflow-hidden">
      {/* GLOW DECORATIVO DE COLORES GRADIENTES DE FONDO (MODO CLARO Y OSCURO) */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-[#7209B7]/25 via-[#9D4EDD]/20 to-transparent blur-[130px] dark:from-[#7209B7]/40 dark:via-[#9D4EDD]/25" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-[#1DBECB]/25 via-[#3A0CA3]/20 to-transparent blur-[150px] dark:from-[#1DBECB]/35 dark:via-[#3A0CA3]/25" />
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-t from-[#7209B7]/20 via-[#1DBECB]/20 to-transparent blur-[120px] dark:from-[#7209B7]/30" />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[var(--t-card-border)] bg-gradient-to-b from-purple-900/10 via-transparent to-transparent py-14 sm:py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1DBECB]/40 bg-[#1DBECB]/10 px-4 py-1.5 text-xs font-bold text-[#0e8a95] dark:text-[#1DBECB] shadow-sm mb-4">
            <span>✨ Edición Internacional ExpoJuy 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#7209B7] via-[#9D4EDD] to-[#1DBECB] bg-clip-text text-transparent">
              Sponsors &amp; Patrocinadores
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[var(--t-text-muted)] font-medium leading-relaxed mb-8">
            Las grandes organizaciones, empresas y corporaciones que confían en ExpoJuy para liderar la transformación productiva, tecnológica e industrial del Noroeste Argentino.
          </p>

          {/* BUSCADOR Y FILTROS RÁPIDOS */}
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar sponsor por nombre, rubro o sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-5 py-3.5 pl-12 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md focus:border-[#7209B7] focus:outline-none focus:ring-2 focus:ring-[#7209B7]/20 transition-all placeholder:text-[var(--t-text-muted)]"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-60">🔍</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold bg-slate-200 dark:bg-white/20 rounded-full px-2 py-0.5 hover:opacity-80 cursor-pointer"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* BARRA DE FILTROS POR CATEGORÍA */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedTierFilter("todos")}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedTierFilter === "todos"
                    ? "bg-[#7209B7] text-white shadow-md scale-105"
                    : "bg-[var(--t-surface)] border border-[var(--t-card-border)] text-[var(--t-text-muted)] hover:bg-[#7209B7]/10 hover:text-[#7209B7]"
                }`}
              >
                Todos
              </button>
              {tierList.map((tier) => {
                const isSelected = selectedTierFilter === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTierFilter(tier.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[#1DBECB] text-slate-950 shadow-md scale-105"
                        : "bg-[var(--t-surface)] border border-[var(--t-card-border)] text-[var(--t-text-muted)] hover:bg-[#1DBECB]/10 hover:text-[#1DBECB]"
                    }`}
                  >
                    {tier.titulo}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AguayoDivider />

      {/* 2. MAIN SPONSOR CATEGORY PANELS (CATEGORIZACIÓN SEGÚN DISEÑO) */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7209B7] border-t-transparent"></div>
            <p className="text-sm font-semibold text-[var(--t-text-muted)]">
              Obteniendo lista de sponsors desde el servidor...
            </p>
          </div>
        ) : filteredSponsors.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--t-card-border)] bg-[var(--t-surface)] p-12 text-center my-8">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-3 text-base font-bold">No se encontraron sponsors</h3>
            <p className="text-xs text-[var(--t-text-muted)] mt-1">
              No hay ningún patrocinador que coincida con "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTierFilter("todos");
              }}
              className="mt-4 rounded-xl bg-[#7209B7] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#5c0793] transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {tierList.map((tier) => {
              // Filtrar los sponsors que corresponden a esta categoría en la búsqueda actual
              const tierSponsors = filteredSponsors.filter((sp) => sp.tier === tier.id);
              if (tierSponsors.length === 0) return null;

              return (
                <div
                  key={tier.id}
                  className="group relative rounded-3xl border border-slate-300/80 dark:border-white/20 bg-white/90 dark:bg-[#0E1122]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#1DBECB]/50"
                >
                  {/* Glow decorativo suave de fondo por categoría */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl -z-10"
                    style={{
                      background: `radial-gradient(circle at 20% 50%, ${tier.accentColor}25, transparent 70%)`,
                    }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* COLUMNA IZQUIERDA: CATEGORÍA DEL SPONSOR (ETIQUETA AMPLIA Y VISIBLE) */}
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/15 pb-5 lg:pb-0 lg:pr-8 flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-4 w-4 rounded-full shrink-0 animate-pulse shadow-md border border-white/20"
                          style={{ backgroundColor: tier.accentColor }}
                        />
                        <h2 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white">
                          {tier.titulo}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 leading-relaxed font-semibold">
                        {tier.descripcion}
                      </p>
                    </div>

                    {/* COLUMNA DERECHA: LOGOS Y MARCAS ORGANIZADAS CON ALTO CONTRASTE */}
                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {tierSponsors.map((sponsor) => (
                          <div
                            key={sponsor.id}
                            onClick={() => setActiveSponsorModal(sponsor)}
                            className="group/logo relative flex flex-col cursor-pointer items-center justify-between rounded-2xl border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-[#181C33] p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1DBECB] hover:bg-white dark:hover:bg-[#202542] hover:shadow-2xl hover:shadow-[#1DBECB]/25 min-h-[140px]"
                          >
                            {/* Insignia visual si es destacado */}
                            {sponsor.destacado && (
                              <span className="absolute -top-3 -right-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 border border-amber-300/50 px-3 py-0.5 text-[10px] font-black text-white shadow-md z-10 uppercase tracking-wider">
                                ★ Premium
                              </span>
                            )}

                            <div className="flex flex-col items-center justify-center w-full space-y-3 my-auto">
                              {/* BADGE CONTENEDOR BLANCO AMPLIADO CON CONTRASTE MÁXIMO */}
                              <div className="flex items-center justify-center h-16 sm:h-20 w-full px-3 rounded-xl bg-white shadow-md border border-slate-200 dark:border-white/40 transition-transform duration-300 group-hover/logo:scale-105">
                                {sponsor.logoUrl ? (
                                  <img
                                    src={sponsor.logoUrl}
                                    alt={sponsor.nombre}
                                    className="max-h-14 sm:max-h-16 w-auto max-w-full object-contain filter drop-shadow-sm"
                                  />
                                ) : (
                                  <span
                                    className="font-display font-black tracking-tight text-lg sm:text-xl md:text-2xl text-slate-900 leading-tight"
                                    style={{
                                      color: sponsor.colorLogo || "#7209B7",
                                    }}
                                  >
                                    {sponsor.nombre}
                                  </span>
                                )}
                              </div>

                              {/* ETIQUETA RUBRO CON MÁXIMA LEGIBILIDAD Y LETRA MÁS GRANDE */}
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 block leading-snug">
                                {sponsor.rubro || sponsor.tier.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. MODAL DETALLE DEL SPONSOR MEJORADO */}
        {activeSponsorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-xl rounded-3xl border border-slate-200/80 dark:border-white/20 bg-white dark:bg-[#121528] text-slate-900 dark:text-white p-6 sm:p-8 shadow-2xl transition-all overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Glow decorativo de fondo en modal */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
                style={{
                  backgroundColor:
                    SPONSOR_TIERS[activeSponsorModal.tier]?.accentColor || "#7209B7",
                }}
              />

              <button
                type="button"
                onClick={() => setActiveSponsorModal(null)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-white/15 text-sm font-extrabold hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-md z-10"
              >
                ✕
              </button>

              {/* ENCABEZADO: INSIGNIA Y BADGE DE CATEGORÍA */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span
                  className="rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md flex items-center gap-1.5"
                  style={{
                    backgroundColor:
                      SPONSOR_TIERS[activeSponsorModal.tier]?.accentColor || "#7209B7",
                  }}
                >
                  <span>💎</span>
                  <span>{SPONSOR_TIERS[activeSponsorModal.tier]?.titulo}</span>
                </span>

                {activeSponsorModal.destacado && (
                  <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 border border-amber-300/60 px-3 py-1 text-xs font-black text-white shadow-md">
                    ★ Sponsor Principal
                  </span>
                )}
              </div>

              {/* BANNER CONTENEDOR BLANCO PARA LOGO O MARCA (GARANTIZA CONTRASTE TOTAL) */}
              <div className="mb-5 flex items-center justify-center p-5 bg-slate-50 dark:bg-white rounded-2xl border border-slate-200 dark:border-white/30 min-h-[90px] shadow-inner">
                {activeSponsorModal.logoUrl ? (
                  <img
                    src={activeSponsorModal.logoUrl}
                    alt={activeSponsorModal.nombre}
                    className="max-h-16 w-auto max-w-full object-contain filter drop-shadow-sm"
                  />
                ) : (
                  <span
                    className="font-display font-black tracking-tight text-2xl sm:text-3xl text-slate-900 text-center leading-tight"
                    style={{ color: activeSponsorModal.colorLogo || "#7209B7" }}
                  >
                    {activeSponsorModal.nombre}
                  </span>
                )}
              </div>

              {/* TÍTULO Y RUBRO CON CONTRASTE ELEVADO */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                {activeSponsorModal.nombre}
              </h3>

              <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#7209B7] dark:text-[#1DBECB] mb-5">
                <span>🏢</span>
                <span>{activeSponsorModal.rubro || "Empresa Patrocinadora Oficial"}</span>
              </div>

              {/* DESCRIPCIÓN INSTITUCIONAL */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold mb-6 shadow-sm">
                {activeSponsorModal.descripcion ||
                  "Empresa e institución referente de la matriz productiva. Participante oficial e impulsora de los programas de desarrollo, rondas de negocios e innovación en ExpoJuy 2026."}
              </div>

              {/* DATOS ESTRUCTURADOS DEL SPONSOR (GRILLA METADATA) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.04] p-3 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-bold mb-0.5">
                    📍 Stand &amp; Ubicación
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Pabellón Central ExpoJuy 2026
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.04] p-3 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-bold mb-0.5">
                    🤝 Participación B2B
                  </span>
                  <span className="font-bold text-[#7209B7] dark:text-[#1DBECB]">
                    Disponible para Ronda de Negocios
                  </span>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-white/15 pt-5">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {activeSponsorModal.sitioWeb ? (
                    <a
                      href={activeSponsorModal.sitioWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg hover:scale-105 transition-all"
                    >
                      <span>🌐 Visitar Sitio Web</span>
                      <span className="text-xs">↗</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                      Sitio web disponible en stand oficial.
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setActiveSponsorModal(null);
                      navigate("negocios");
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 px-4 py-2.5 text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <span>🤝 Cita B2B</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSponsorModal(null)}
                  className="w-full sm:w-auto rounded-xl border border-slate-300 dark:border-white/20 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer text-center"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CALL TO ACTION: QUERÉS SER SPONSOR */}
        <section className="mt-16 rounded-3xl border border-[#1DBECB]/30 bg-gradient-to-br from-[#7209B7]/10 via-[var(--t-surface)] to-[#1DBECB]/10 p-8 sm:p-12 shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-block rounded-full bg-[#7209B7]/20 border border-[#7209B7]/40 px-3 py-1 text-[11px] font-bold text-[#7209B7] dark:text-[#A881FC]">
                💼 Oportunidades de Comercio e Inversión
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                ¿Querés posicionar tu empresa en la feria más importante del NOA?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--t-text-muted)] leading-relaxed font-medium">
                Suma a tu marca a la red de sponsors oficiales de ExpoJuy 2026. Accedé a stands prioritarios, presencia multimedia masiva, encuentros B2B exclusivos y networking con decisores públicos y privados.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => navigate("contacto")}
                className="w-full rounded-2xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] py-3.5 px-6 text-xs sm:text-sm font-extrabold text-white shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center"
              >
                📞 Contactar Equipo Comercial
              </button>
              <button
                type="button"
                onClick={() => navigate("negocios")}
                className="w-full rounded-2xl border border-[var(--t-card-border)] bg-[var(--t-surface)] py-3.5 px-6 text-xs sm:text-sm font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer text-center"
              >
                🤝 Ver Ronda de Negocios
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
