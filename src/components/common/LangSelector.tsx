import { useState, useRef, useEffect } from "react";
import FlagIcon from "./FlagIcon";
import { LANGS } from "../../config/theme.config";
import { Language, useLanguage } from "../../context/LanguageContext";

export default function LangSelector() {
  const [open, setOpen] = useState(false);
  const { language: selected, setLanguage } = useLanguage();
  const { border } = LANGS[selected];
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar desplegable al hacer click afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer shadow-sm"
        style={{ border: `2.5px solid ${border}`, padding: 1 }}
        aria-label="Seleccionar idioma"
        title="Seleccionar idioma"
      >
        <FlagIcon lang={selected} size={28} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 min-w-[200px] rounded-2xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#1A1A2E]/95 p-1.5 shadow-2xl backdrop-blur-2xl transition-all animate-fade-in">
          <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-black/5 dark:border-white/10 mb-1">
            Seleccionar Idioma
          </div>
          {Object.entries(LANGS).map(([code, { label }]) => {
            const isSelected = selected === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setLanguage(code as Language);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-xs transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#7209B7] text-white font-bold shadow-md"
                    : "text-[var(--t-text)] hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#1DBECB]"
                }`}
              >
                <div className="flex items-center gap-2.5 shrink-0">
                  <FlagIcon lang={code} size={22} />
                  <span className="font-extrabold uppercase tracking-wider text-xs">
                    {code}
                  </span>
                </div>
                <span
                  className={`text-[11px] whitespace-nowrap ${
                    isSelected ? "text-white/90 font-semibold" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
