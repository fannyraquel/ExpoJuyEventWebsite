import RoleGuard from "../../components/common/RoleGuard";
import AguayoDivider from "../../components/common/AguayoDivider";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboardPage() {
  const { user, role } = useAuth();

  return (
    <RoleGuard requiredRole="admin">
      <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
        <div className="bg-[#DC2626] py-14 px-4 text-center">
          <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Panel de Control General</div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">Administración ExpoJuy 2026</h1>
          <p className="text-white/80 text-sm">Sesión activa como: {user?.name} ({role})</p>
        </div>
        <AguayoDivider />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div
              className="p-6 rounded-xl shadow-sm transition-colors"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="text-[#0891B2] font-mono-data text-xs font-bold uppercase mb-1">Empresas Acreditadas</div>
              <div className="font-display text-3xl font-black" style={{ color: "var(--t-text)" }}>
                312
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--t-text-muted)" }}>
                12 pendientes de aprobación
              </p>
            </div>

            <div
              className="p-6 rounded-xl shadow-sm transition-colors"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="text-[#7209B7] font-mono-data text-xs font-bold uppercase mb-1">Reuniones B2B Solicitadas</div>
              <div className="font-display text-3xl font-black" style={{ color: "var(--t-text)" }}>
                1,840
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--t-text-muted)" }}>
                94% confirmadas
              </p>
            </div>

            <div
              className="p-6 rounded-xl shadow-sm transition-colors"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="text-[#1DBECB] font-mono-data text-xs font-bold uppercase mb-1">Ocupación del Predio</div>
              <div className="font-display text-3xl font-black" style={{ color: "var(--t-text)" }}>
                98.5%
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--t-text-muted)" }}>
                3 stands disponibles
              </p>
            </div>
          </div>

          <div
            className="rounded-xl p-6 transition-colors shadow-sm"
            style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
          >
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
              Herramientas de Administrador
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <button className="bg-[#7209B7] text-white p-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                ⚙ Gestionar Expositores
              </button>
              <button className="bg-[#0891B2] text-white p-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                📅 Editar Agenda
              </button>
              <button className="bg-[#1DBECB] text-white p-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                🗺 Asignar Stands
              </button>
              <button className="bg-[#D97706] text-white p-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                📊 Exportar Reporte DATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
