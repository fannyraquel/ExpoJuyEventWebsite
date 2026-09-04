import { useState } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import { REGIONES } from "../../data/regiones.data";
import { EMPRESAS } from "../../data/empresas.data";
import { Region } from "../../types/domain.types";

export default function DescubriJujuyPage() {
  const [region, setRegion] = useState<Region>("quebrada");
  const r = REGIONES[region];

  return (
    <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
      <div className="relative overflow-hidden py-20 px-4 text-center transition-colors duration-500" style={{ background: r.color }}>
        <div className="relative z-10">
          <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Descubrí Jujuy</div>
          <h1 className="font-display text-5xl font-black text-white mb-3">{r.nombre}</h1>
          <p className="text-white/80 text-xl italic font-display">{r.subtitulo}</p>
        </div>
      </div>
      <div className="sticky top-14 z-30 border-b shadow-sm transition-colors" style={{ background: "var(--t-nav-bg)", borderColor: "var(--t-card-border)" }}>
        <div className="max-w-5xl mx-auto px-4 flex gap-1 py-2">
          {(Object.keys(REGIONES) as Region[]).map((reg) => {
            const rg = REGIONES[reg];
            return (
              <button
                key={reg}
                onClick={() => setRegion(reg)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  region === reg ? "text-white" : "hover:bg-[#F0F0F5] dark:hover:bg-white/5"
                }`}
                style={region === reg ? { background: rg.color } : { color: "var(--t-text)" }}
              >
                {rg.nombre}
              </button>
            );
          })}
        </div>
      </div>
      <AguayoDivider thin />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="overflow-hidden rounded-2xl h-64 mb-6 shadow-sm" style={{ background: "var(--t-surface)" }}>
              <img src={r.img} alt={r.nombre} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4 shadow-sm transition-colors" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
                <div className="font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "var(--t-text-muted)" }}>
                  Municipios
                </div>
                <ul className="space-y-1">
                  {r.municipios.map((m) => (
                    <li key={m} className="text-sm font-medium" style={{ color: "var(--t-text)" }}>
                      • {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-4 shadow-sm transition-colors" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
                <div className="font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "var(--t-text-muted)" }}>
                  Productos
                </div>
                <ul className="space-y-1">
                  {r.productos.map((p) => (
                    <li key={p} className="text-sm font-semibold" style={{ color: r.color }}>
                      ◆ {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl p-6 shadow-sm transition-colors" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
              <div className="font-display text-lg font-bold mb-2" style={{ color: "var(--t-text)" }}>
                🏔 Turismo
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t-text-muted)" }}>
                {r.turismo}
              </p>
            </div>
            <div className="rounded-xl p-6 shadow-sm transition-colors" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
              <div className="font-display text-lg font-bold mb-2" style={{ color: "var(--t-text)" }}>
                🎭 Cultura
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t-text-muted)" }}>
                {r.cultura}
              </p>
            </div>
            <div className="rounded-xl p-6 text-white shadow-md" style={{ background: r.color }}>
              <div className="font-display text-lg font-bold mb-2">Empresas de la región</div>
              <div className="space-y-2">
                {EMPRESAS.filter((e) => e.region === r.nombre).map((e) => (
                  <div key={e.nombre} className="flex justify-between items-center text-sm">
                    <span className="font-semibold">{e.nombre}</span>
                    <span className="text-white/70">{e.rubro}</span>
                  </div>
                ))}
                {EMPRESAS.filter((e) => e.region === r.nombre).length === 0 && (
                  <p className="text-white/60 text-sm">Ver sección Explorar para más empresas de esta región.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
