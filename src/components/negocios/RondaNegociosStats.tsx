import React from "react";

export interface StatItem {
  val: string;
  label: string;
  icon: string;
}

const DEFAULT_STATS: StatItem[] = [
  { val: "96", label: "Mesas B2B", icon: "📋" },
  { val: "1.840", label: "Reuniones Pactadas", icon: "🤝" },
  { val: "23", label: "Países Participantes", icon: "🌎" },
  { val: "4", label: "Jornadas Intensivas", icon: "📅" },
];

export default function RondaNegociosStats({
  stats = DEFAULT_STATS,
}: {
  stats?: StatItem[];
}) {
  return (
    <div
      className="py-12 px-4 border-b transition-colors duration-300"
      style={{
        background: "var(--t-surface)",
        borderColor: "var(--t-card-border)",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: "var(--t-card)",
              border: "1px solid var(--t-card-border)",
            }}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-display text-3xl sm:text-4xl font-black text-[#7209B7] dark:text-[#A881FC]">
              {item.val}
            </div>
            <div className="text-xs sm:text-sm font-semibold mt-1 text-[var(--t-text-muted)]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
