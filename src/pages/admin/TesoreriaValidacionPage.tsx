import React from "react";
import RoleGuard from "../../components/common/RoleGuard";
import AguayoDivider from "../../components/common/AguayoDivider";
import GestionAcreditacionesPanel from "../../components/admin/GestionAcreditacionesPanel";
import { useAuth } from "../../context/AuthContext";

export default function TesoreriaValidacionPage() {
  const { user, role } = useAuth();

  return (
    <RoleGuard requiredRole="admin">
      <div className="relative z-10 pt-14 text-[var(--t-text)] transition-colors duration-300">
        {/* ENCABEZADO DE LA PÁGINA DE TESORERÍA / SECRETARÍA DE PAGOS */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#7209B7] via-[#5C0099] to-[#1DBECB] py-16 px-4 text-center text-white backdrop-blur-md shadow-lg">
          <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
              🏦 SECRETARÍA DE PAGOS &amp; AUDITORÍA • EXPOJUY 2026
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Validación de Acreditaciones
            </h1>

            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Portal exclusivo para secretarios de tesorería y administradores. Revisá comprobantes de transferencia, aprobá solicitudes y emití automáticamente las credenciales oficiales con código QR por correo electrónico.
            </p>

            <div className="pt-2 text-xs font-mono text-white/70">
              Sesión activa: <span className="font-extrabold text-white">{user?.name}</span> ({role})
            </div>
          </div>
        </div>

        {/* DIVISOR ANDINO / AGUAYO */}
        <AguayoDivider />

        {/* CONTENIDO PRINCIPAL: PANEL DE AUDITORÍA */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <GestionAcreditacionesPanel />
        </div>
      </div>
    </RoleGuard>
  );
}
