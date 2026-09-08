import React, { useState } from "react";
import { Empresa, ExpositorInfo } from "@appTypes/domain.types";
import { CAT_COLORS } from "@config/theme.config";

export interface ExpositorCardProps {
  empresa: Empresa;
  onConectar: (empresaNombre: string) => void;
  canConnectB2B: boolean;
  variant?: "card" | "agenda-item";
  index?: number;
}

// Imágenes de respaldo de personas si no hubiera foto de expositor
const FALLBACK_PERSON_PHOTOS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
];

// Imágenes de respaldo de empresas según el rubro
const FALLBACK_COVER_IMAGES: Record<string, string> = {
  Minería: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
  Agroindustria: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
  Turismo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
  Biodiversidad: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  Industria: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
  Textil: "https://images.unsplash.com/photo-1606744888344-493238951221?w=800&auto=format&fit=crop&q=80",
};

export default function ExpositorCard({
  empresa,
  onConectar,
  canConnectB2B,
  variant = "card",
  index = 0,
}: ExpositorCardProps) {
  const [selectedExpositorIndex, setSelectedExpositorIndex] = useState<number>(0);

  const catColor = CAT_COLORS[empresa.rubro] || "#7209B7";
  const coverImg =
    empresa.imagen ||
    FALLBACK_COVER_IMAGES[empresa.rubro] ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80";

  // Lista de Expositores (Personas representantes de la empresa)
  const listaExpositores: ExpositorInfo[] =
    empresa.expositores && empresa.expositores.length > 0
      ? empresa.expositores
      : [
          {
            nombre: `Representante ${empresa.nombre}`,
            cargo: `Expositor Oficial • ${empresa.rubro}`,
            foto: FALLBACK_PERSON_PHOTOS[Math.abs(empresa.nombre.length) % FALLBACK_PERSON_PHOTOS.length],
          },
        ];

  const currentExpositor = listaExpositores[selectedExpositorIndex] || listaExpositores[0];

  // --- VARIANTE 1: VISTA AGENDA HORIZONTAL ---
  if (variant === "agenda-item") {
    return (
      <div
        onClick={() => onConectar(empresa.nombre)}
        className="group relative flex cursor-pointer flex-col sm:flex-row sm:items-center gap-4 rounded-[1.5rem] border border-slate-200/80 dark:border-white/10 bg-[var(--t-surface)] p-4 sm:p-5 transition-all duration-300 hover:border-[#A881FC] hover:bg-[var(--t-card)] hover:shadow-xl"
      >
        {/* Avatares de Expositores (Personas) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center -space-x-3">
            {listaExpositores.map((exp, idx) => {
              const isSelected = idx === selectedExpositorIndex;
              return (
                <button
                  key={exp.nombre + idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExpositorIndex(idx);
                  }}
                  className={`relative cursor-pointer transition-transform ${
                    isSelected ? "z-20 scale-110 ring-2 ring-[#1DBECB]" : "z-10 opacity-70 hover:opacity-100"
                  } rounded-full`}
                  title={`${exp.nombre} - ${exp.cargo}`}
                >
                  <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white dark:border-[#1A1A2E] shadow">
                    <img src={exp.foto} alt={exp.nombre} className="h-full w-full object-cover object-top" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Datos del Expositor Seleccionado & Empresa */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: catColor }}
            >
              {empresa.rubro}
            </span>
            <span className="text-base">{empresa.pais}</span>
            <span className="text-[10px] font-bold text-slate-400 capitalize">• {empresa.region}</span>
            {empresa.standNumero && (
              <span className="rounded-md bg-[#1DBECB]/15 px-2 py-0.5 text-[10px] font-black text-[#0e8a95] dark:text-[#1DBECB]">
                📍 {empresa.standNumero}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black text-[var(--t-text)] transition group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] leading-snug">
            {currentExpositor.nombre}
          </h3>

          <p className="text-xs font-semibold text-[#7209B7] dark:text-[#A881FC]">
            {currentExpositor.cargo} <span className="text-slate-400 font-normal">• Representa a <strong>{empresa.nombre}</strong></span>
          </p>

          <div className="pt-0.5 flex items-center gap-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interés:</span>
            <span className="font-extrabold text-[#7209B7] dark:text-[#A881FC]">
              Busca: <span className="text-[var(--t-text)] font-semibold">{empresa.busca}</span>
            </span>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="shrink-0 pt-2 sm:pt-0 flex items-center justify-end">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-[#23233E] group-hover:bg-[#7209B7] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:scale-105"
          >
            <span>{canConnectB2B ? `🤝 Agendar con ${currentExpositor.nombre.split(" ")[1] || "Expositor"}` : "📄 Ver Perfil B2B"}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    );
  }

  // --- VARIANTE 2: TARJETA DE EXPOSITOR PROTAGONISTA ---
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A2E] shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#1DBECB]/50">
      {/* 1. HEADER CON FOTO DE FONDO DE LA EMPRESA & BADGES */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-900">
        <img
          src={coverImg}
          alt={empresa.nombre}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80"
        />

        {/* Degradado sombreado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

        {/* Badge de Stand (Arriba Izquierda) */}
        {empresa.standNumero && (
          <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
            📍 {empresa.standNumero}
          </span>
        )}

        {/* Badge de Región (Arriba Derecha) */}
        <span className="absolute top-3 right-3 rounded-full bg-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/20 shadow-md capitalize">
          {empresa.region}
        </span>
      </div>

      {/* 2. SECCIÓN DE EXPOSITORES (PERSONAS CON SELECTOR) */}
      <div className="relative px-5 pt-0 pb-3">
        {/* Avatares Circulares de Expositores (Con selector si hay más de 1) */}
        <div className="relative -mt-12 flex justify-between items-end mb-3">
          <div className="flex items-center -space-x-3">
            {listaExpositores.map((exp, idx) => {
              const isSelected = idx === selectedExpositorIndex;
              return (
                <button
                  key={exp.nombre + idx}
                  type="button"
                  onClick={() => setSelectedExpositorIndex(idx)}
                  className={`relative cursor-pointer transition-transform duration-300 ${
                    isSelected ? "z-20 scale-110 ring-4 ring-[#1DBECB]" : "z-10 opacity-70 hover:opacity-100 hover:scale-105"
                  } rounded-full`}
                  title={`${exp.nombre} - ${exp.cargo}`}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white dark:border-[#1A1A2E] shadow-xl">
                    <img
                      src={exp.foto}
                      alt={exp.nombre}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  {isSelected && (
                    <span
                      className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1A1A2E]"
                      title="Expositor Seleccionado"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* País & Rubro */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-xl">{empresa.pais}</span>
            <span
              className="rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: catColor }}
            >
              {empresa.rubro}
            </span>
          </div>
        </div>

        {/* Insignia de Cantidad de Expositores */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#1DBECB] mb-1">
          <span>👤 Expositor Acreditado</span>
          {listaExpositores.length > 1 && (
            <span className="rounded-full bg-[#1DBECB]/15 px-2 py-0.5 text-[#0e8a95] dark:text-[#1DBECB]">
              {listaExpositores.length} expositores
            </span>
          )}
        </div>

        {/* Nombre y Cargo del Expositor Seleccionado */}
        <div className="space-y-1 min-h-[56px]">
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] transition-colors">
            {currentExpositor.nombre}
          </h3>
          <p className="text-xs font-semibold text-[#7209B7] dark:text-[#A881FC]">
            {currentExpositor.cargo}
          </p>
        </div>

        {/* Empresa que Representa */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-white/5 p-2.5 border border-slate-100 dark:border-white/10">
          <span className="text-sm">🏢</span>
          <div className="min-w-0 flex-1">
            <span className="text-[9px] font-mono uppercase text-slate-400">Representa a:</span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              {empresa.nombre}
            </p>
          </div>
        </div>

        {/* Datos de Contacto del Expositor */}
        {currentExpositor.email && (
          <div className="mt-2.5 flex flex-col gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <span>✉️</span>
              <a
                href={`mailto:${currentExpositor.email}`}
                className="hover:underline hover:text-[#7209B7] dark:hover:text-[#A881FC] truncate"
              >
                {currentExpositor.email}
              </a>
            </div>
            {currentExpositor.telefono && (
              <div className="flex items-center gap-1.5">
                <span>📞</span>
                <span>{currentExpositor.telefono}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. PIE DE CARD: INTERÉS B2B Y BOTÓN DE CONEXIÓN */}
      <div className="p-5 pt-0 space-y-3">
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Interés:</span>
          <span
            className="rounded-full px-3 py-0.5 text-[10px] font-extrabold text-white shadow-sm"
            style={{ backgroundColor: "#0891B2" }}
          >
            Busca: {empresa.busca}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onConectar(empresa.nombre)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-[#23233E] group-hover:bg-[#7209B7] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
          <span>
            {canConnectB2B
              ? `🤝 Agendar con ${currentExpositor.nombre.split(" ")[1] || "Expositor"}`
              : "📄 Ver Perfil B2B"}
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
