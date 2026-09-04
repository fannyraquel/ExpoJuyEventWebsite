import { useState } from "react";
import FlagIcon from "./FlagIcon";
import { LANGS } from "../../config/theme.config";

export default function LangSelector() {
  const [selected, setSelected] = useState("ES");
  const [open, setOpen] = useState(false);
  const { border } = LANGS[selected];

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center rounded-full transition-transform hover:scale-105 focus:outline-none"
        style={{ border: `2.5px solid ${border}`, padding: 1 }}
        aria-label="Seleccionar idioma"
      >
        <FlagIcon lang={selected} size={30} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 bg-[#1A1A2E] rounded-xl shadow-xl overflow-hidden border border-white/10 min-w-[140px]">
            {Object.entries(LANGS).map(([code, { label }]) => (
              <button
                key={code}
                onClick={() => {
                  setSelected(code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${
                  selected === code ? "bg-white/10" : ""
                }`}
              >
                <FlagIcon lang={code} size={22} />
                <span className="text-white font-semibold">{code}</span>
                <span className="text-white/50 text-xs">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
