import React from "react";
import { Empresa } from "@appTypes/domain.types";
import { CAT_COLORS } from "@config/theme.config";
import RoleGuard from "@components/common/RoleGuard";
import SolicitudB2BForm from "@forms/b2b/SolicitudB2BForm";

export interface RondaNegociosCardProps {
  empresa: Empresa;
  isExpanded: boolean;
  onToggleExpand: () => void;
  userRole: string;
}

// Fallback images by sector if company cover image is missing
const FALLBACK_COVER_IMAGES: Record<string, string> = {
  Minería: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
  Agroindustria: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
  Turismo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
  Biodiversidad: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  Industria: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
  Textil: "https://images.unsplash.com/photo-1606744888344-493238951221?w=800&auto=format&fit=crop&q=80",
};

export default function RondaNegociosCard({
  empresa,
  isExpanded,
  onToggleExpand,
  userRole,
}: RondaNegociosCardProps) {
  const catColor = CAT_COLORS[empresa.rubro] || "#7209B7";
  const coverImg =
    empresa.imagen ||
    FALLBACK_COVER_IMAGES[empresa.rubro] ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80";

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 shadow-sm transition-all duration-300 ${
        isExpanded
          ? "border-[#1DBECB] ring-2 ring-[#1DBECB]/20 shadow-xl"
          : "hover:border-[#7209B7]/40 hover:shadow-md"
      }`}
      style={{
        background: "var(--t-card)",
        borderColor: isExpanded ? "#1DBECB" : "var(--t-card-border)",
      }}
    >
      {/* 1. CABECERA: EMPRESA, PAÍS Y BADGES */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{empresa.pais}</span>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#1DBECB] block font-bold tracking-wider">
                Empresa Registrada
              </span>
              <h3 className="font-display text-lg font-bold text-[var(--t-text)] leading-snug">
                {empresa.nombre}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-white shadow-sm"
              style={{ backgroundColor: catColor }}
            >
              {empresa.rubro}
            </span>
            {empresa.standNumero && (
              <span className="text-[10px] font-bold text-slate-400">
                📍 {empresa.standNumero}
              </span>
            )}
          </div>
        </div>

        {/* 2. CAJA EXCLUSIVA DE PERFIL E IMAGEN DE LA EMPRESA */}
        <div className="mt-4 rounded-2xl bg-[var(--t-surface)] p-3.5 border border-[var(--t-card-border)] space-y-3">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#1DBECB]">
            <span>🏢 Perfil Institucional &amp; Marca</span>
            <span className="text-slate-400 font-semibold capitalize">Región: {empresa.region}</span>
          </div>

          {/* Banner / Imagen de la Empresa */}
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-slate-900 border border-black/10">
            <img
              src={coverImg}
              alt={empresa.nombre}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Logo o Avatar de Marca sobre la foto */}
            <div className="absolute bottom-2 left-3 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-slate-950 border border-white/40 flex items-center justify-center overflow-hidden shadow">
                {empresa.logo ? (
                  <img src={empresa.logo} alt={empresa.nombre} className="h-full w-full object-contain p-0.5" />
                ) : (
                  <span className="text-xs font-black text-[#1DBECB]">
                    {empresa.nombre.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-white drop-shadow">
                {empresa.nombre}
              </span>
            </div>
          </div>

          {/* Descripción institucional */}
          {empresa.descripcion && (
            <p className="text-xs text-[var(--t-text-muted)] line-clamp-2 leading-relaxed">
              {empresa.descripcion}
            </p>
          )}
        </div>
      </div>

      {/* 3. INTERÉS B2B Y BOTÓN DE DESPLIEGUE */}
      <div className="mt-4 pt-3 border-t border-[var(--t-card-border)] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] text-[var(--t-text-muted)]">
            Busca: <strong className="text-[var(--t-text)]">{empresa.busca}</strong>
          </span>

          <button
            type="button"
            onClick={onToggleExpand}
            className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 ${
              isExpanded
                ? "bg-[#7209B7] hover:bg-[#59078f]"
                : "bg-[#1DBECB] hover:bg-[#169aa5] text-slate-950 hover:text-white"
            }`}
          >
            {isExpanded ? "Ocultar Formulario" : "🤝 Conectar B2B"}
          </button>
        </div>

        {/* 4. FORMULARIO B2B PROTEGIDO POR ROLEGUARD */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[var(--t-card-border)] animate-fade-in">
            <RoleGuard
              requiredPermission="connect_b2b"
              fallback={
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs text-amber-500 dark:text-amber-300 text-center font-medium">
                  🔒 Para solicitar reuniones B2B debes contar con el rol de <strong>Expositor</strong> o <strong>Administrador</strong>. (Tu rol actual es: <span className="uppercase font-bold">{userRole}</span>).
                </div>
              }
            >
              <SolicitudB2BForm empresaNombre={empresa.nombre} onSuccess={onToggleExpand} />
            </RoleGuard>
          </div>
        )}
      </div>
    </div>
  );
}
