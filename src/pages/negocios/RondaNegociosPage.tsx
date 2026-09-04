import { useState, useEffect } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import RoleGuard from "../../components/common/RoleGuard";
import { empresasService } from "../../api/services/empresasService";
import { Empresa } from "../../types/domain.types";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "../../context/NavigationContext";
import SolicitudB2BForm from "../../forms/b2b/SolicitudB2BForm";

export default function RondaNegociosPage() {
  const { queryParams } = useNavigation();
  const { role } = useAuth();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [expanded, setExpanded] = useState<string | null>(queryParams.empresa || null);

  useEffect(() => {
    empresasService.getEmpresas().then((res) => {
      if (res.success && res.data) {
        setEmpresas(res.data);
      }
    });
  }, []);

  return (
    <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
      <div className="relative overflow-hidden bg-[#7209B7] py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="aguayo-divider h-full" style={{ backgroundSize: "96px 100%", height: "100%" }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Ronda de Negocios</div>
          <h1 className="font-display text-5xl font-black text-white mb-4">Conectá con el mundo</h1>
          <p className="text-white/70 text-lg mb-8">
            El espacio de encuentro B2B más relevante del NOA. Reuniones pactadas, agenda personalizada, resultados concretos.
          </p>
          <button
            onClick={() => setExpanded(empresas[0]?.nombre || null)}
            className="bg-[#1DBECB] hover:bg-[#4D0080] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Inscribirse a la Ronda
          </button>
        </div>
      </div>
      <AguayoDivider />

      <div className="py-12 px-4 border-b transition-colors" style={{ background: "var(--t-surface)", borderColor: "var(--t-card-border)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["96", "Mesas", "📋"],
            ["1.840", "Reuniones", "🤝"],
            ["23", "Países", "🌎"],
            ["4", "Jornadas", "📅"],
          ].map(([v, l, icon]) => (
            <div
              key={l}
              className="rounded-xl p-6 text-center shadow-sm transition-colors"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-display text-4xl font-black text-[#7209B7]">{v}</div>
              <div className="text-sm mt-1" style={{ color: "var(--t-text-muted)" }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--t-text)" }}>
          Perfiles B2B Disponibles
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {empresas.map((e) => (
            <div
              key={e.nombre}
              className="rounded-xl p-5 hover:shadow-md transition-all"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold" style={{ color: "var(--t-text)" }}>
                  {e.nombre}
                </h3>
                <span
                  className="text-xs font-mono-data px-2 py-0.5 rounded"
                  style={{ background: "var(--t-surface)", color: "var(--t-text)", border: "1px solid var(--t-card-border)" }}
                >
                  {e.pais}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap text-xs mb-3">
                <span className="px-2.5 py-1 rounded-full font-bold" style={{ background: "#7209B7", color: "#FFFFFF" }}>
                  {e.rubro}
                </span>
                <span className="px-2.5 py-1 rounded-full font-bold" style={{ background: "#0891B2", color: "#FFFFFF" }}>
                  {e.region}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--t-text-muted)" }}>
                  Busca: <strong style={{ color: "var(--t-text)" }}>{e.busca}</strong>
                </span>
                <button
                  onClick={() => setExpanded(expanded === e.nombre ? null : e.nombre)}
                  className="bg-[#1DBECB] hover:bg-[#7209B7] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {expanded === e.nombre ? "Ocultar Formulario" : "Conectar B2B"}
                </button>
              </div>

              {expanded === e.nombre && (
                <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor: "var(--t-card-border)" }}>
                  <RoleGuard
                    requiredPermission="connect_b2b"
                    fallback={
                      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-3 rounded-lg text-xs text-center">
                        🔒 Para enviar solicitudes de reuniones B2B debes contar con rol <strong>Expositor</strong> o <strong>Administrador</strong>. (Tu rol actual: {role}).
                      </div>
                    }
                  >
                    <SolicitudB2BForm empresaNombre={e.nombre} onSuccess={() => setExpanded(null)} />
                  </RoleGuard>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
