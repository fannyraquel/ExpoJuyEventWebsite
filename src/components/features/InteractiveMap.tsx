import { useState } from "react";
import { Stand } from "../../types/domain.types";
import { CAT_COLORS } from "../../config/theme.config";

interface InteractiveMapProps {
  stands: Stand[];
  busqueda: string;
  selectedCat: string;
}

export default function InteractiveMap({ stands, busqueda, selectedCat }: InteractiveMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const highlighted = busqueda
    ? stands.find((s) => s.empresa.toLowerCase().includes(busqueda.toLowerCase()))?.id
    : null;

  return (
    <div>
      {/* SVG Plano */}
      <div className="bg-[#F0F0F5] rounded-2xl p-6 overflow-x-auto">
        <svg viewBox="0 0 540 400" className="w-full max-w-2xl mx-auto" style={{ minWidth: 340 }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4A4A4A" strokeWidth="0.3" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="540" height="400" fill="url(#grid)" />

          {/* Entradas */}
          <rect x="10" y="180" width="40" height="40" fill="#1DBECB" rx="4" />
          <text x="30" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
            ENTRADA
          </text>
          <rect x="490" y="180" width="40" height="40" fill="#1DBECB" rx="4" />
          <text x="510" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
            SALIDA
          </text>

          {/* Pasillo central */}
          <rect x="250" y="50" width="40" height="300" fill="#4A4A4A" opacity="0.06" />
          <text
            x="270"
            y="210"
            textAnchor="middle"
            fontSize="8"
            fill="#4A4A4A"
            opacity="0.5"
            transform="rotate(-90,270,210)"
          >
            PASILLO CENTRAL
          </text>

          {stands.map((s) => {
            const isHighlighted = highlighted === s.id;
            const catMatch = selectedCat === "Todos" || s.categoria === selectedCat;
            const color = CAT_COLORS[s.categoria] || "#999";
            const opacity = catMatch ? 1 : 0.2;
            const isHov = hovered === s.id;

            return (
              <g
                key={s.id}
                style={{ cursor: "pointer", opacity }}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <rect
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  fill={isHighlighted ? "#1DBECB" : color}
                  fillOpacity={isHov ? 1 : 0.85}
                  stroke={isHighlighted ? "#7209B7" : isHov ? "#4A4A4A" : color}
                  strokeWidth={isHighlighted ? 3 : isHov ? 2 : 1}
                  rx="4"
                />
                <circle cx={s.x + s.w - 8} cy={s.y + 8} r="5" fill={s.open ? "#22c55e" : "#ef4444"} />
                <text x={s.x + s.w / 2} y={s.y + s.h / 2 - 4} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">
                  {s.id}
                </text>
                <text
                  x={s.x + s.w / 2}
                  y={s.y + s.h / 2 + 7}
                  textAnchor="middle"
                  fontSize="6"
                  fill="white"
                  opacity="0.9"
                >
                  {s.empresa.length > 14 ? s.empresa.slice(0, 13) + "…" : s.empresa}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip on hover */}
      {hovered && (() => {
        const s = stands.find((x) => x.id === hovered);
        if (!s) return null;
        return (
          <div className="mt-4 bg-[#1A1A2E] text-white rounded-xl p-4 text-sm flex items-center gap-4 border border-white/10">
            <div className="w-3 h-3 rounded-full" style={{ background: CAT_COLORS[s.categoria] || "#999" }} />
            <div>
              <strong>{s.id}</strong> — {s.empresa}
              <span className="ml-3 text-white/60">{s.categoria}</span>
            </div>
            <span className={`ml-auto flex items-center gap-1 text-xs font-semibold ${s.open ? "text-green-400" : "text-red-400"}`}>
              {s.open ? "● Abierto" : "✕ Cerrado"}
            </span>
          </div>
        );
      })()}

      {/* Leyenda */}
      <div className="mt-6 flex flex-wrap gap-3">
        {Object.entries(CAT_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--t-text-muted)" }}>
            <div className="w-3 h-3 rounded" style={{ background: color }} />
            {cat}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs ml-4" style={{ color: "var(--t-text-muted)" }}>
          <div className="w-3 h-3 rounded-full bg-green-500" /> Abierto
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--t-text-muted)" }}>
          <div className="w-3 h-3 rounded-full bg-red-500" /> Cerrado
        </div>
      </div>
    </div>
  );
}
