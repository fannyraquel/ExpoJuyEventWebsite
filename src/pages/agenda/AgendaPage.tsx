import { useState, useEffect } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import StatusBadge from "../../components/common/StatusBadge";
import { agendaService } from "../../api/services/agendaService";
import { AgendaDay, AgendaEvent } from "../../types/domain.types";
import { STATUS_CONFIG } from "../../config/theme.config";

export default function AgendaPage() {
  const [day, setDay] = useState<AgendaDay>(1);
  const [filtroRubro, setFiltroRubro] = useState("Todos");
  const [eventos, setEventos] = useState<AgendaEvent[]>([]);

  useEffect(() => {
    agendaService.getAgendaByDay(day).then((res) => {
      if (res.success && res.data) {
        setEventos(res.data);
      }
    });
  }, [day]);

  const allRubros = ["Todos", "Institucional", "Comercio", "Minería", "Negocios", "Turismo", "Agroindustria", "Finanzas", "Cultura", "Datos"];

  const filteredEventos = eventos.filter((e) => filtroRubro === "Todos" || e.rubro === filtroRubro);

  return (
    <div className="pt-14">
      <div className="bg-[#1A1A2E] py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">12–15 Octubre 2026</div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Agenda Oficial</h1>
          <p className="text-[#FFFFFF]/60 text-base">Estados en tiempo real. Filtrá por rubro, idioma o jornada.</p>
        </div>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex gap-2 mb-6 flex-wrap">
          {([1, 2, 3, 4] as AgendaDay[]).map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                day === d
                  ? "bg-[#7209B7] text-white"
                  : "bg-white border border-[#F0F0F5] text-[#4A4A4A] hover:border-[#7209B7] dark:bg-[#23233E] dark:text-white dark:border-white/10"
              }`}
            >
              Jornada {d} — {["12 Oct", "13 Oct", "14 Oct", "15 Oct"][d - 1]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {allRubros.map((r) => (
            <button
              key={r}
              onClick={() => setFiltroRubro(r)}
              className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
              style={
                filtroRubro === r
                  ? { background: "#0891B2", color: "#FFFFFF", borderColor: "#0891B2" }
                  : { background: "var(--t-surface)", color: "var(--t-text)", borderColor: "var(--t-card-border)" }
              }
            >
              {r}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredEventos.map((e, i) => {
            const cfg = STATUS_CONFIG[e.status] || STATUS_CONFIG["próximo"];
            return (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl p-5 border transition-all"
                style={{ background: "var(--t-card)", borderColor: cfg.borderColor, borderLeftWidth: 4 }}
              >
                <div className="font-mono-data font-bold text-lg min-w-[3.5rem]" style={{ color: cfg.bgColor }}>
                  {e.hora}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-lg leading-snug" style={{ color: "var(--t-text)" }}>
                    {e.titulo}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "var(--t-text-muted)" }}>
                    <span>📍 {e.lugar}</span>
                    <span>🌐 {e.idioma}</span>
                    <span className="font-semibold" style={{ color: "#7209B7" }}>
                      {e.rubro}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={e.status} />
                  <button className="text-xs text-[#1DBECB] font-semibold hover:underline">+ Mi agenda</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
