import React, { useMemo, useState } from "react";
import planoImg from "../../assets/plano-predio.png";
import { Stand } from "@appTypes/domain.types";
import { useAuth } from "@context/AuthContext";

type Props = {
  stands: Stand[];
  busqueda: string;
  selectedCat: string;
  isAdmin?: boolean;
};

// Función auxiliar para normalizar coordenadas (porcentajes o píxeles de referencia 595x426)
function getStandCoords(x?: number, y?: number) {
  if (x === undefined || y === undefined) return null;
  const pctX = x > 100 ? (x / 595) * 100 : x;
  const pctY = y > 100 ? (y / 426) * 100 : y;
  return {
    left: Math.max(2, Math.min(98, pctX)),
    top: Math.max(2, Math.min(98, pctY)),
  };
}

// Colores distintivos por categoría
function getCategoryColor(cat?: string): string {
  if (!cat) return "#1DBECB";
  const c = cat.toLowerCase();
  if (c.includes("miner")) return "#7209B7"; // Púrpura
  if (c.includes("agro")) return "#10B981"; // Verde
  if (c.includes("turi")) return "#1DBECB"; // Turquesa
  if (c.includes("textil") || c.includes("arte")) return "#F59E0B"; // Ámbar
  if (c.includes("gastro")) return "#EF4444"; // Rojo
  if (c.includes("servi")) return "#3B82F6"; // Azul
  return "#1DBECB";
}

export default function InteractiveMap({
  stands,
  busqueda,
  selectedCat,
  isAdmin: propIsAdmin,
}: Props) {
  const [zoom, setZoom] = useState<number>(1.5);
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);

  // Verificación del Rol de Administrador
  let isUserAdmin = false;
  try {
    const { role } = useAuth();
    isUserAdmin = role === "admin";
  } catch {
    isUserAdmin = false;
  }
  const isAdmin = propIsAdmin !== undefined ? propIsAdmin : isUserAdmin;

  // MODO UBICADOR / INSPECTOR DE COORDENADAS (EXCLUSIVO ADMIN)
  const [modoUbicador, setModoUbicador] = useState<boolean>(false);
  const [pinPicker, setPinPicker] = useState<{
    pctX: number;
    pctY: number;
    pxX: number;
    pxY: number;
  } | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Filtrado de Stands
  const filteredStands = useMemo(() => {
    const search = busqueda.toLowerCase().trim();

    return stands.filter((stand) => {
      const categoryOK =
        selectedCat === "Todos" || stand.categoria === selectedCat;

      const searchOK =
        !search ||
        String(stand.id ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.numero ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.empresa ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.nombre ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.categoria ?? "")
          .toLowerCase()
          .includes(search);

      return categoryOK && searchOK;
    });
  }, [stands, busqueda, selectedCat]);

  // Click en el mapa para el Modo Ubicador (Solo Admin)
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdmin || !modoUbicador) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const pctX = Math.round((clickX / rect.width) * 1000) / 10;
    const pctY = Math.round((clickY / rect.height) * 1000) / 10;

    const pxX = Math.round((clickX / rect.width) * 595);
    const pxY = Math.round((clickY / rect.height) * 426);

    setPinPicker({ pctX, pctY, pxX, pxY });
    setCopiedSuccess(false);
  };

  const handleCopyCoords = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0F172A] selection:bg-[#1DBECB]/30">
      {/* ===============================================
          PANEL DE CONTROLES FLOTANTE
      ================================================ */}
      <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2.5">
        {/* Controles de Zoom en Card Glassmorphism */}
        <div className="flex flex-col gap-1 rounded-2xl border border-white/15 bg-slate-900/85 p-1.5 shadow-2xl backdrop-blur-xl">
          {/* Botón Zoom In */}
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white transition-all hover:bg-[#1DBECB] hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            title="Acercar mapa"
            aria-label="Acercar mapa"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          {/* Botón Zoom Out */}
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white transition-all hover:bg-[#1DBECB] hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            title="Alejar mapa"
            aria-label="Alejar mapa"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>

          {/* Botón Reset Zoom */}
          <button
            type="button"
            onClick={() => setZoom(1.5)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-all hover:bg-[#7209B7] hover:text-white hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            title="Restablecer tamaño predeterminado (150%)"
            aria-label="Restablecer tamaño predeterminado"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M20.985 19.644v-4.992m0 0h-4.992m4.992 0-3.181 3.183a8.25 8.25 0 1 1 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        </div>

        {/* Botón Modo Ubicador (DISPONIBLE SÓLO PARA ADMINISTRADORES) */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => {
              setModoUbicador(!modoUbicador);
              if (modoUbicador) setPinPicker(null);
            }}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-bold shadow-2xl backdrop-blur-xl transition-all cursor-pointer ${
              modoUbicador
                ? "border-white/40 bg-gradient-to-r from-[#7209B7] to-[#1DBECB] text-white shadow-lg shadow-[#7209B7]/40 ring-2 ring-white/30 animate-pulse"
                : "border-white/15 bg-slate-900/85 text-white/90 hover:border-[#1DBECB]/50 hover:bg-[#7209B7] hover:text-white"
            }`}
            title="Herramienta de Administrador para obtener coordenadas de stands"
          >
            <svg
              className="h-4 w-4 text-[#1DBECB] group-hover:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="tracking-wide">
              {modoUbicador ? "Ubicador Activo (Admin)" : "Modo Ubicador"}
            </span>
          </button>
        )}
      </div>

      {/* BANNER INFORMATIVO DE MODO UBICADOR (SÓLO ADMIN) */}
      {isAdmin && modoUbicador && (
        <div className="absolute top-4 left-4 z-40 max-w-sm rounded-2xl border border-[#7209B7]/50 bg-slate-900/90 p-3.5 text-xs text-white shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex items-center justify-between font-extrabold text-[#1DBECB]">
            <span className="flex items-center gap-1.5">
              <span>📍</span>
              <span>Herramienta Administrador</span>
            </span>
            <button
              onClick={() => setModoUbicador(false)}
              className="text-white/60 hover:text-white text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-300">
            Hacé click en cualquier lugar del plano para obtener su ubicación exacta en <strong>%</strong> y <strong>px</strong>.
          </p>
        </div>
      )}

      {/* POPUP DE COORDENADAS COPIABLES (SÓLO ADMIN) */}
      {isAdmin && pinPicker && (
        <div className="absolute bottom-16 left-4 z-50 max-w-sm rounded-2xl border border-[#1DBECB]/50 bg-slate-900/95 p-4 text-xs text-white shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex items-center justify-between font-extrabold text-[#1DBECB]">
            <span>📍 Coordenadas Obtenidas</span>
            <button
              onClick={() => setPinPicker(null)}
              className="text-white/60 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="mt-2.5 space-y-1.5 font-mono text-[11px] bg-black/50 p-3 rounded-xl border border-white/10">
            <div className="flex justify-between">
              <span className="text-slate-400">Porcentaje (%):</span>
              <span className="font-bold text-white">x: {pinPicker.pctX}, y: {pinPicker.pctY}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-1">
              <span className="text-slate-400">Píxeles (px):</span>
              <span className="font-bold text-[#A881FC]">x: {pinPicker.pxX}, y: {pinPicker.pxY}</span>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() =>
                handleCopyCoords(`{ x: ${pinPicker.pctX}, y: ${pinPicker.pctY} }`)
              }
              className="flex-1 rounded-xl bg-[#1DBECB] px-3 py-2 text-[11px] font-bold text-slate-950 shadow-md transition hover:bg-[#169aa5] cursor-pointer"
            >
              {copiedSuccess ? "✓ Copiado (%)" : "Copiar %"}
            </button>
            <button
              type="button"
              onClick={() =>
                handleCopyCoords(`{ x: ${pinPicker.pxX}, y: ${pinPicker.pxY} }`)
              }
              className="flex-1 rounded-xl bg-[#7209B7] px-3 py-2 text-[11px] font-bold text-white shadow-md transition hover:bg-[#58078e] cursor-pointer"
            >
              {copiedSuccess ? "✓ Copiado (px)" : "Copiar px"}
            </button>
          </div>
        </div>
      )}

      {/* ===============================================
          ÁREA DEL PLANO INTERACTIVO
      ================================================ */}
      <div className="absolute inset-0 overflow-auto">
        <div className="min-w-[760px] min-h-[620px] w-full h-full flex items-center justify-center p-10">
          <div
            onClick={handleMapClick}
            className={`relative shrink-0 transition-transform duration-300 ${
              isAdmin && modoUbicador ? "cursor-crosshair" : ""
            }`}
            style={{
              width: "595px",
              height: "426px",
              transform: `scale(${zoom})`,
            }}
          >
            {/* Imagen del plano real */}
            <img
              src={planoImg}
              alt="Plano real del predio"
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain select-none"
            />

            {/* ZONAS DESTACADAS PREDEFINIDAS */}
            <div
              className="absolute rounded-md border-2 border-[#7209B7] bg-[#7209B7]/10 hover:bg-[#7209B7]/30 transition pointer-events-none"
              style={{ left: "7%", top: "7%", width: "23%", height: "30%" }}
            >
              <span className="bg-[#7209B7] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow absolute top-1 left-1">
                CONFERENCIAS
              </span>
            </div>

            <div
              className="absolute rounded-md border-2 border-[#1DBECB] bg-[#1DBECB]/10 hover:bg-[#1DBECB]/30 transition pointer-events-none"
              style={{ left: "72%", top: "43%", width: "24%", height: "34%" }}
            >
              <span className="bg-[#1DBECB] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow absolute top-1 left-1">
                ESPECTÁCULOS
              </span>
            </div>

            {/* PIN DE MODO UBICADOR (CLICK ACTUAL - SÓLO ADMIN) */}
            {isAdmin && pinPicker && (
              <div
                className="absolute z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${pinPicker.pctX}%`,
                  top: `${pinPicker.pctY}%`,
                }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="h-7 w-7 animate-ping rounded-full bg-[#1DBECB] opacity-75" />
                  <span className="absolute h-4 w-4 rounded-full bg-[#7209B7] border-2 border-white shadow-xl" />
                </div>
              </div>
            )}

            {/* STANDS REGISTRADOS */}
            {filteredStands.map((stand, index) => {
              const coords = getStandCoords(stand.x, stand.y);
              if (!coords) return null;

              const isSelected = selectedStand?.id === stand.id;
              const catColor = getCategoryColor(stand.categoria);
              const standLabel = stand.numero || stand.id || `#${index + 1}`;

              return (
                <button
                  key={stand.id ?? index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStand(stand);
                  }}
                  className={`absolute z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white text-[9px] font-extrabold text-white shadow-lg transition-all duration-300 cursor-pointer ${
                    isSelected ? "scale-150 ring-4 ring-[#1DBECB]" : "hover:scale-130"
                  }`}
                  style={{
                    left: `${coords.left}%`,
                    top: `${coords.top}%`,
                    backgroundColor: catColor,
                    width: "24px",
                    height: "24px",
                  }}
                  title={`${stand.empresa || stand.nombre || "Stand"} (${stand.categoria || "General"})`}
                >
                  {String(standLabel).substring(0, 3)}
                </button>
              );
            })}

            {/* POPUP / MODAL DEL STAND SELECCIONADO */}
            {selectedStand && (
              (() => {
                const coords = getStandCoords(selectedStand.x, selectedStand.y);
                if (!coords) return null;

                return (
                  <div
                    className="absolute z-[100] min-w-[220px] max-w-[280px] rounded-xl p-4 shadow-2xl text-slate-800 dark:text-slate-100 animate-fade-in"
                    style={{
                      left: `${coords.left}%`,
                      top: `${coords.top}%`,
                      transform: "translate(-50%, -120%)",
                      background: "var(--t-card, #1E293B)",
                      border: "1px solid var(--t-card-border, rgba(255,255,255,0.15))",
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStand(null);
                      }}
                      className="absolute right-2.5 top-2.5 text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
                    >
                      ✕
                    </button>

                    <div
                      className="inline-block rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white mb-1.5"
                      style={{
                        backgroundColor: getCategoryColor(selectedStand.categoria),
                      }}
                    >
                      {selectedStand.categoria || "Stand Acreditado"}
                    </div>

                    <div className="font-black text-base text-[var(--t-text)] leading-tight">
                      Stand {selectedStand.numero || selectedStand.id}
                    </div>

                    <div className="mt-1 text-xs font-medium text-[var(--t-text)]">
                      {selectedStand.empresa || selectedStand.nombre || "Espacio reservado"}
                    </div>

                    {selectedStand.open !== undefined && (
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold">
                        <span className={`h-2 w-2 rounded-full ${selectedStand.open ? "bg-emerald-400" : "bg-amber-400"}`} />
                        <span>{selectedStand.open ? "Stand Abierto / Atendiendo" : "Próximamente"}</span>
                      </div>
                    )}
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>

      {/* ===============================================
          LEYENDA E INSTRUCCIONES
      ================================================ */}
      <div
        className="absolute left-4 bottom-4 z-40 rounded-2xl px-4 py-3 text-white backdrop-blur-xl border border-white/15 shadow-2xl"
        style={{ background: "rgba(15,23,42,.88)" }}
      >
        <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#1DBECB] animate-pulse" />
          <span>Plano Interactivo ExpoJuy</span>
        </div>
        <div className="text-[10px] opacity-80">● Seleccioná un punto para ver detalles</div>
        {isAdmin ? (
          <div className="text-[10px] opacity-80 font-semibold text-[#1DBECB]">
            📍 Herramienta Admin: Modo Ubicador disponible
          </div>
        ) : (
          <div className="text-[10px] opacity-80">
            🔍 Usá los controles para explorar espacios
          </div>
        )}
      </div>

      {/* CANTIDAD DE STANDS */}
      <div
        className="absolute right-4 bottom-4 z-40 flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-xl"
        style={{ background: "rgba(15,23,42,.88)" }}
      >
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1DBECB]/20 px-2 text-xs font-black text-[#1DBECB]">
          {filteredStands.length}
        </span>
        <span className="font-bold">espacios listados</span>
      </div>
    </div>
  );
}