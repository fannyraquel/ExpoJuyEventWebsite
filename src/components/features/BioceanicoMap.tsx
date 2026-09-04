import { LayerInfo } from "../../types/domain.types";

interface BioceanicoMapProps {
  currentLayer: LayerInfo;
}

export default function BioceanicoMap({ currentLayer }: BioceanicoMapProps) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden shadow-inner border border-[#E0E0EA] dark:border-white/10">
        <svg viewBox="0 0 520 400" className="w-full">
          {/* Ocean backgrounds */}
          <rect width="520" height="400" fill="#D4E8F0" />
          {/* Land masses (simplified) */}
          <ellipse cx="300" cy="200" rx="180" ry="160" fill="#E8D8C0" />
          <ellipse cx="420" cy="150" rx="80" ry="60" fill="#E8D8C0" />

          {/* Country labels */}
          <text x="420" y="155" textAnchor="middle" fontSize="10" fill="#4A4A4A" opacity="0.7" fontWeight="bold">
            BRASIL
          </text>
          <text x="340" y="225" textAnchor="middle" fontSize="9" fill="#4A4A4A" opacity="0.7" fontWeight="bold">
            PARAGUAY
          </text>
          <text x="200" y="265" textAnchor="middle" fontSize="9" fill="#4A4A4A" opacity="0.7" fontWeight="bold">
            ARGENTINA
          </text>
          <text x="95" y="245" textAnchor="middle" fontSize="9" fill="#4A4A4A" opacity="0.7" fontWeight="bold">
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
              <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="9" fill="#4A4A4A" fontWeight="bold">
                {p.label}
              </text>
              <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="7" fill={currentLayer.color}>
                {p.detail}
              </text>
            </g>
          ))}

          {/* Jujuy highlight */}
          <circle cx="200" cy="260" r="14" fill="none" stroke="#7209B7" strokeWidth="2" strokeDasharray="4,2" />
        </svg>
      </div>

      <div className="mt-6 grid md:grid-cols-4 gap-4">
        {currentLayer.points.map((p) => (
          <div
            key={p.label}
            className="rounded-xl p-4 shadow-sm transition-colors"
            style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
          >
            <div className="font-display font-bold" style={{ color: "var(--t-text)" }}>
              {p.label}
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--t-text-muted)" }}>
              {p.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
