import AguayoDivider from "../../components/common/AguayoDivider";
import RoleGuard from "../../components/common/RoleGuard";
import { DATA_INDICATORS } from "../../data/indicadores.data";

export default function ExpoJuyDataPage() {
  return (
    <div className="pt-14">
      <div className="bg-[#1A1A2E] py-16 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Fuente oficial · Única y verificada</div>
        <h1 className="font-display text-5xl font-black text-white mb-3">ExpoJuy DATA</h1>
        <p className="text-[#FFFFFF]/60 max-w-xl mx-auto">
          Los indicadores oficiales de ExpoJuy 2026. Actualizados post-evento. Transparencia como diferencial.
        </p>
      </div>
      <AguayoDivider />

      <RoleGuard
        requiredPermission="view_data_indicators"
        fallback={
          <div className="py-20 text-center text-red-400 font-bold">Acceso denegado a los datos oficiales de ExpoJuy DATA.</div>
        }
      >
        <div className="py-12 px-4" style={{ background: "var(--t-bg)" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {DATA_INDICATORS.map((d) => (
              <div
                key={d.label}
                className="rounded-xl p-6 hover:shadow-md transition-shadow"
                style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
              >
                <div className="text-3xl mb-3">{d.icon}</div>
                <div className="font-display text-4xl font-black text-[#7209B7] leading-none mb-1">{d.value}</div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--t-text)" }}>
                  {d.label}
                </div>
                <div className="font-mono-data text-xs uppercase tracking-wide" style={{ color: "var(--t-text-muted)" }}>
                  {d.unit}
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-6xl mx-auto mt-8 bg-[#1DBECB]/10 border border-[#1DBECB]/30 rounded-xl p-5 text-center">
            <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-1">Nota de transparencia</div>
            <p className="text-[#4A4A4A]/70 dark:text-white/70 text-sm">
              Todos los indicadores son publicados con fuente verificada al cierre de cada edición. Los valores pre-evento son proyecciones basadas en registros confirmados a la fecha.
            </p>
          </div>
        </div>
      </RoleGuard>
    </div>
  );
}
