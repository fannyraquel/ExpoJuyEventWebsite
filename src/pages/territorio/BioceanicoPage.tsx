import { useState } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import BioceanicoMap from "../../components/features/BioceanicoMap";
import { BIOCEANICO_LAYERS } from "../../data/bioceanico.data";

export default function BioceanicoPage() {
  const [layer, setLayer] = useState("producción");
  const current = BIOCEANICO_LAYERS[layer] || BIOCEANICO_LAYERS["producción"];

  return (
    <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
      <div className="bg-[#1A1A2E] py-14 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Geopolítica productiva</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Corredor Bioceánico</h1>
        <p className="text-[#FFFFFF]/70 text-lg">Brasil · Paraguay · Jujuy · Chile — el eje del futuro comercial sudamericano</p>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(BIOCEANICO_LAYERS).map((l) => {
            const layerObj = BIOCEANICO_LAYERS[l];
            return (
              <button
                key={l}
                onClick={() => setLayer(l)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm capitalize transition-all border ${
                  layer === l ? "text-white border-transparent" : ""
                }`}
                style={{
                  background: layer === l ? layerObj.color : "var(--t-card)",
                  borderColor: layer === l ? "transparent" : "var(--t-card-border)",
                  color: layer === l ? "#FFFFFF" : "var(--t-text)",
                }}
              >
                {l}
              </button>
            );
          })}
        </div>
        <p className="text-sm mb-6 italic" style={{ color: "var(--t-text-muted)" }}>
          {current.description}
        </p>

        <BioceanicoMap currentLayer={current} />
      </div>
    </div>
  );
}
