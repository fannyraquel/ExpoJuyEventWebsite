import React from "react";
import { Section } from "../../types/domain.types";

export interface AccionRapidaItem {
  icon: string;
  title: string;
  text: string;
  section: Section;
  color: string;
}

interface AccionesRapidasSectionProps {
  items: AccionRapidaItem[];
  onNavigate: (section: Section) => void;
}

export default function AccionesRapidasSection({
  items,
  onNavigate,
}: AccionesRapidasSectionProps) {
  return (
    <section className="relative mx-auto -mt-2 max-w-7xl px-5 md:px-8">
      <div className="premium-card grid grid-cols-2 overflow-hidden rounded-[2rem] border border-[var(--t-card-border)] bg-[var(--t-card)] shadow-xl lg:grid-cols-4 transition-colors duration-300">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => onNavigate(item.section)}
            className="group relative cursor-pointer border-b border-[var(--t-card-border)] p-5 text-left transition-all hover:bg-[var(--t-surface)] lg:border-r lg:border-b-0 lg:p-6 last:border-r-0"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--t-surface)] text-xl transition group-hover:scale-110">
                {item.icon}
              </div>

              <span className="text-[var(--t-text-muted)] transition group-hover:translate-x-1 group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC]">
                →
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-black uppercase tracking-wide text-[var(--t-text)] transition group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC] md:text-base">
                {item.title}
              </h3>

              <p className="mt-1 text-[11px] text-[var(--t-text-muted)]">{item.text}</p>
            </div>

            <div
              className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: item.color }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
