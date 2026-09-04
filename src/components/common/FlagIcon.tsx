import React from "react";
import { LANGS } from "../../config/theme.config";

export default function FlagIcon({ lang, size = 32 }: { lang: string; size?: number }) {
  const r = size / 2;
  const clipId = `flag-clip-${lang}-${size}`;
  const inner = r - 1.5;

  const flags: Record<string, React.ReactNode> = {
    ES: (
      <>
        <rect x={0} y={0} width={size} height={size / 3} fill="#74ACDF" />
        <rect x={0} y={size / 3} width={size} height={size / 3} fill="#FFFFFF" />
        <rect x={0} y={(size / 3) * 2} width={size} height={size / 3 + 2} fill="#74ACDF" />
        <circle cx={r} cy={r} r={size * 0.13} fill="#F6B40E" />
      </>
    ),
    PT: (
      <>
        <rect x={0} y={0} width={size} height={size + 2} fill="#009C3B" />
        <polygon
          points={`${r},${size * 0.1} ${size * 0.92},${r} ${r},${size * 0.9} ${size * 0.08},${r}`}
          fill="#FFDF00"
        />
        <circle cx={r} cy={r} r={size * 0.28} fill="#002776" />
        <path
          d={`M ${r - size * 0.26} ${r + size * 0.04} A ${size * 0.26} ${size * 0.26} 0 0 1 ${r + size * 0.26} ${r + size * 0.04}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={size * 0.07}
        />
      </>
    ),
    FR: (
      <>
        <rect x={0} y={0} width={size / 3} height={size + 2} fill="#002395" />
        <rect x={size / 3} y={0} width={size / 3} height={size + 2} fill="#FFFFFF" />
        <rect x={(size / 3) * 2} y={0} width={size / 3 + 2} height={size + 2} fill="#ED2939" />
      </>
    ),
    EN: (
      <>
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={i}
            x={0}
            y={(size / 13) * i}
            width={size}
            height={size / 13 + 1}
            fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
          />
        ))}
        <rect x={0} y={0} width={size * 0.4} height={size * 0.54} fill="#3C3B6E" />
        {[...Array(3)].map((_, row) =>
          [...Array(row % 2 === 0 ? 3 : 2)].map((__, col) => (
            <text
              key={`${row}-${col}`}
              x={(col + (row % 2 === 0 ? 0.17 : 0.5)) * ((size * 0.4) / 3)}
              y={(row + 0.7) * ((size * 0.54) / 4)}
              fontSize={size * 0.1}
              fill="#FFFFFF"
              textAnchor="middle"
            >
              ★
            </text>
          ))
        )}
      </>
    ),
  };

  const currentLang = LANGS[lang] ? lang : "ES";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", borderRadius: "50%" }}>
      <defs>
        <clipPath id={clipId}>
          <circle cx={r} cy={r} r={inner} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{flags[currentLang]}</g>
      <circle cx={r} cy={r} r={inner} fill="none" stroke={LANGS[currentLang].border} strokeWidth="2" />
    </svg>
  );
}
