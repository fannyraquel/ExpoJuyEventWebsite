import React from "react";

export interface RubroFilterProps {
  rubros: string[];
  selectedRubro: string;
  onSelectRubro: (rubro: string) => void;
}

export default function RubroFilter({
  rubros,
  selectedRubro,
  onSelectRubro,
}: RubroFilterProps) {
  return (
    <div className="mb-10 flex flex-wrap gap-1.5">
      {rubros.map((r) => {
        const activo = selectedRubro === r;
        return (
          <button
            key={r}
            type="button"
            onClick={() => onSelectRubro(r)}
            className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
              activo
                ? "bg-[#1DBECB] text-white"
                : "bg-slate-100 dark:bg-[#23233E] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2A2A48]"
            }`}
          >
            {r}
          </button>
        );
      })}
    </div>
  );
}
