import React from "react";
import { LayerInfo } from "@appTypes/domain.types";

export interface BioceanicoMapProps {
  currentLayer: LayerInfo;
}

export default function BioceanicoMap({ currentLayer }: BioceanicoMapProps) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden shadow-inner border border-[#E0E0EA] dark:border-white/10 transition-colors duration-300">
        <svg viewBox="0 0 520 400" className="w-full">
          {/* Ocean background */}
          <rect width="520" height="400" className="fill-[#D4E8F0] dark:fill-[#162232] transition-colors" />

          {/* Land masses (simplified) */}
          <ellipse cx="300" cy="200" rx="180" ry="160" className="fill-[#E8D8C0] dark:fill-[#253245] transition-colors" />
          <ellipse cx="420" cy="150" rx="80" ry="60" className="fill-[#E8D8C0] dark:fill-[#253245] transition-colors" />

          {/* Country labels */}
          <text x="420" y="155" textAnchor="middle" fontSize="10" className="fill-slate-600 dark:fill-slate-300" opacity="0.8" fontWeight="bold">
            BRASIL
          </text>
          <text x="340" y="225" textAnchor="middle" fontSize="9" className="fill-slate-600 dark:fill-slate-300" opacity="0.8" fontWeight="bold">
            PARAGUAY
          </text>
          <text x="200" y="265" textAnchor="middle" fontSize="9" className="fill-slate-600 dark:fill-slate-300" opacity="0.8" fontWeight="bold">
            ARGENTINA
          </text>
          <text x="95" y="245" textAnchor="middle" fontSize="9" className="fill-slate-600 dark:fill-slate-300" opacity="0.8" fontWeight="bold">
            CHILE
          </text>

          {/* Route line */}
          <polyline
            points={currentLayer.points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke={currentLayer.color}
            strokeWidth="3"
            strokeDasharray="8,4"
            opacity="0.9"
          />

          {/* Points */}
          {currentLayer.points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="10" fill={currentLayer.color} opacity="0.2" />
              <circle cx={p.x} cy={p.y} r="5" fill={currentLayer.color} />
              <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="9" className="fill-slate-800 dark:fill-white font-bold">
                {p.label}
              </text>
              <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="7" fill={currentLayer.color} fontWeight="bold">
                {p.detail}
              </text>
            </g>
          ))}

          {/* Jujuy highlight */}
          <circle cx="200" cy="260" r="14" fill="none" stroke="#7209B7" strokeWidth="2" strokeDasharray="4,2" />
        </svg>
      </div>

      {/* Point details grid */}
      <div className="mt-6 grid md:grid-cols-4 gap-4">
        {currentLayer.points.map((p) => (
          <div
            key={p.label}
            className="rounded-xl p-4 shadow-sm transition-colors border"
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
            }}
          >
            <div className="font-display font-bold text-sm" style={{ color: "var(--t-text)" }}>
              {p.label}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--t-text-muted)" }}>
              {p.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
