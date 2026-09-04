import { ReactNode } from "react";
import { Permission, UserRole } from "../../types/auth.types";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "../../context/NavigationContext";

interface RoleGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: Permission;
  fallback?: ReactNode;
}

export default function RoleGuard({
  children,
  requiredRole,
  requiredPermission,
  fallback,
}: RoleGuardProps) {
  const { role, checkPermission } = useAuth();
  const { navigate } = useNavigation();

  let hasAccess = true;

  if (requiredRole && role !== requiredRole && role !== "admin") {
    hasAccess = false;
  }

  if (requiredPermission && !checkPermission(requiredPermission)) {
    hasAccess = false;
  }

  if (!hasAccess) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="pt-24 pb-16 px-4 text-center max-w-lg mx-auto">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="font-display text-2xl font-bold text-red-400 mb-2">Acceso Restringido</h2>
          <p className="text-sm opacity-80 mb-6">
            Esta sección requiere permisos de rol <strong>{requiredRole || requiredPermission}</strong>. Tu rol actual es{" "}
            <span className="font-bold uppercase">{role}</span>.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("login")}
              className="bg-[#7209B7] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#4D0080] transition-colors"
            >
              Cambiar Rol / Iniciar Sesión
            </button>
            <button
              onClick={() => navigate("inicio")}
              className="border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
