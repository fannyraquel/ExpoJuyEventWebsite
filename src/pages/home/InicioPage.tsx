import { useState, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import AguayoDivider from "../../components/common/AguayoDivider";
import StatusBadge from "../../components/common/StatusBadge";
import { noticiasService } from "../../api/services/noticiasService";
import { agendaService } from "../../api/services/agendaService";
import { Noticia, AgendaEvent } from "../../types/domain.types";

export default function InicioPage() {
  const { navigate } = useNavigation();
  const [search, setSearch] = useState("");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [agendaSummary, setAgendaSummary] = useState<AgendaEvent[]>([]);

  useEffect(() => {
    noticiasService.getNoticias().then((res) => {
      if (res.success && res.data) {
        setNoticias(res.data.slice(0, 3));
      }
    });

    agendaService.getAgendaByDay(1).then((res) => {
      if (res.success && res.data) {
        setAgendaSummary(res.data.filter((e) => e.status !== "finalizado").slice(0, 4));
      }
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
        {/* 4-panel vertical split background */}
        <div className="absolute inset-0 flex flex-row">
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/purmamarca.jpg" alt="Purmamarca" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/453b.jpg" alt="Puna" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/Yungas-Camino-Qapag-na.jpg" alt="Yungas" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/images.jpg" alt="Quebrada" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/65 to-[#1A1A2E]/92" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          {/* EXPOJUY wordmark responsive clamp */}
          <h1 className="font-display font-black leading-none mb-4 tracking-tight" style={{ fontSize: "clamp(2.2rem, 10vw, 8rem)" }}>
            <span className="relative inline-block">
              <span className="absolute -top-2 left-0 h-[4px] sm:h-[6px] w-[55%] rounded-sm" style={{ background: "#1DBECB" }} />
              <span className="text-white">E</span>
            </span>
            <span className="text-white">XPO</span>
            <span className="relative inline-block">
              <span className="absolute -top-2 left-[40%] h-[4px] sm:h-[6px] w-[28%] rounded-sm" style={{ background: "#7209B7" }} />
              <span className="text-white">J</span>
            </span>
            <span className="text-white">UY</span>
          </h1>

          {/* Tagline */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <div className="flex items-center gap-2 sm:gap-3 text-white/90">
              <span className="font-display text-xs sm:text-base font-normal tracking-widest uppercase text-white/60">
                Conectando
              </span>
              <span className="font-display text-sm sm:text-xl font-black tracking-widest uppercase">Países</span>
              <span className="h-px w-6 sm:w-10 bg-white/30 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-white/90">
              <span className="h-px w-6 sm:w-10 bg-white/30 hidden sm:block" />
              <span className="font-display text-xs sm:text-base font-normal tracking-widest uppercase text-white/60">
                Creando
              </span>
              <span className="font-display text-sm sm:text-xl font-black tracking-widest uppercase">
                Oportunidades
              </span>
            </div>
          </div>

          <p className="text-[#FFFFFF]/80 text-sm sm:text-lg mb-8 max-w-2xl mx-auto px-2">
            La feria de negocios, cultura e innovación más importante del NOA. 4 jornadas, 312 expositores, 23 países,
            1.840 reuniones comerciales.
          </p>

          {/* Buscador global responsive */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto mb-8 px-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscá empresa, rubro o actividad..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#1DBECB] text-sm w-full"
            />
            <button
              onClick={() => navigate("explorar")}
              className="bg-[#7209B7] hover:bg-[#4D0080] text-white px-5 py-3 rounded-lg font-semibold transition-colors text-sm w-full sm:w-auto"
            >
              Buscar
            </button>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 px-2">
            <button
              onClick={() => navigate("agenda")}
              className="bg-[#1DBECB] hover:bg-[#7209B7] text-white px-8 py-3.5 rounded-lg font-bold text-base transition-colors w-full sm:w-auto"
            >
              Inscribite
            </button>
            <button
              onClick={() => navigate("explorar")}
              className="border-2 border-[#1DBECB] text-[#1DBECB] hover:bg-[#1DBECB] hover:text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all w-full sm:w-auto"
            >
              Sumate como expositor
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto px-2">
            {[
              ["312", "Expositores"],
              ["23", "Países"],
              ["4", "Jornadas"],
              ["45K", "Visitantes"],
            ].map(([v, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
                <div className="font-display text-xl sm:text-2xl font-black text-[#1DBECB]">{v}</div>
                <div className="text-[#FFFFFF]/70 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AguayoDivider />

      {/* 3 Noticias destacadas */}
      <div className="py-12 sm:py-16 px-4" style={{ background: "var(--t-bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row items-center justify-between gap-2 mb-8">
            <h2 className="font-display text-xl sm:text-3xl font-bold" style={{ color: "var(--t-text)" }}>
              Noticias destacadas
            </h2>
            <button onClick={() => navigate("noticias")} className="text-[#7209B7] text-xs sm:text-sm font-semibold hover:underline shrink-0">
              Ver todas →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {noticias.map((n) => (
              <article
                key={n.id}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
              >
                <div className="overflow-hidden bg-[#F0F0F5] h-48">
                  <img
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide ${n.tagColor}`}>
                    {n.tag}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg leading-snug mb-2" style={{ color: "var(--t-text)" }}>
                    {n.title}
                  </h3>
                  <p className="text-xs sm:text-sm" style={{ color: "var(--t-text-muted)" }}>
                    {n.excerpt}
                  </p>
                  <div className="font-mono-data text-xs mt-3" style={{ color: "var(--t-text-muted)" }}>
                    {n.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AguayoDivider thin />

      {/* Agenda resumida */}
      <div className="bg-[#1A1A2E] py-12 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row items-center justify-between gap-2 mb-6">
            <h2 className="font-display text-xl sm:text-3xl font-bold text-[#FFFFFF]">Próximas actividades</h2>
            <button onClick={() => navigate("agenda")} className="text-[#1DBECB] text-xs sm:text-sm font-semibold hover:underline shrink-0">
              Ver agenda completa →
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {agendaSummary.map((e, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <div className="font-mono-data text-[#1DBECB] text-sm font-bold min-w-[3rem]">{e.hora}</div>
                  <div className="sm:hidden">
                    <StatusBadge status={e.status} />
                  </div>
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <div className="text-[#FFFFFF] font-semibold text-sm truncate">{e.titulo}</div>
                  <div className="text-[#FFFFFF]/50 text-xs mt-0.5">
                    {e.lugar} · {e.idioma}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <StatusBadge status={e.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AguayoDivider />

      {/* Sponsors */}
      <div className="py-10 sm:py-12 px-4" style={{ background: "var(--t-surface)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs font-mono-data uppercase tracking-widest mb-6" style={{ color: "var(--t-text-muted)" }}>
            Sponsors Oficiales 2026
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            {["Gobierno de Jujuy", "Ministerio de Producción", "Cámara de Comercio NOA", "Banco Nación", "CONICET", "ProArgentina"].map((s) => (
              <div
                key={s}
                className="font-display font-bold text-sm sm:text-lg hover:opacity-100 transition-opacity cursor-pointer"
                style={{ color: "var(--t-text)" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
