import { useState } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "../../context/NavigationContext";
import { UserRole } from "../../types/auth.types";
import { ROLES } from "../../config/roles.config";

export default function LoginPage() {
  const { user, role, switchRole, logout } = useAuth();
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSelectRole = async (selectedRole: UserRole) => {
    setLoading(true);
    await switchRole(selectedRole);
    setLoading(false);
    if (selectedRole === "admin") {
      navigate("admin");
    }
  };

  return (
    <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
      <div className="bg-[#1A1A2E] py-16 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Configuración de Usuarios y Permisos RBAC</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">Perfil &amp; Roles</h1>
        <p className="text-white/60 max-w-xl mx-auto text-sm">
          Simulá y cambiá dinámicamente tu rol en vivo para probar permisos de acceso, formularios B2B y rutas protegidas.
        </p>
      </div>
      <AguayoDivider />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div
          className="rounded-2xl p-6 mb-8 shadow-sm transition-colors"
          style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
        >
          <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--t-text-muted)" }}>
            Sesión Activa
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-display text-2xl font-bold" style={{ color: "var(--t-text)" }}>
                {user?.name}
              </div>
              <div className="text-sm" style={{ color: "var(--t-text-muted)" }}>
                {user?.email}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase"
                style={{ background: ROLES[role]?.badgeBg, color: ROLES[role]?.badgeColor }}
              >
                Rol: {ROLES[role]?.label}
              </span>
              <button
                onClick={logout}
                className="text-xs text-red-400 border border-red-400/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
          Seleccionar Rol para Demostración:
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {(Object.keys(ROLES) as UserRole[]).map((rKey) => {
            const rInfo = ROLES[rKey];
            const isSelected = role === rKey;

            return (
              <div
                key={rKey}
                onClick={() => !loading && handleSelectRole(rKey)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                  isSelected
                    ? "border-[#1DBECB] shadow-lg ring-2 ring-[#1DBECB]/50"
                    : "hover:border-[#7209B7]"
                }`}
                style={{
                  background: "var(--t-card)",
                  borderColor: isSelected ? "#1DBECB" : "var(--t-card-border)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-lg" style={{ color: "var(--t-text)" }}>
                    {rInfo.label}
                  </span>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: rInfo.badgeBg, color: rInfo.badgeColor }}
                  >
                    {rKey}
                  </span>
                </div>
                <div className="text-xs space-y-1 mb-4" style={{ color: "var(--t-text-muted)" }}>
                  <div>
                    <strong>Permisos:</strong> {rInfo.permissions.join(", ")}
                  </div>
                </div>
                <button
                  disabled={loading}
                  className={`w-full py-2 rounded-lg font-bold text-xs transition-colors ${
                    isSelected ? "bg-[#1DBECB] text-white" : "bg-[#7209B7] text-white hover:bg-[#4D0080]"
                  }`}
                >
                  {isSelected ? "✓ Rol Activo" : `Cambiar a ${rInfo.label}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
