import { useState } from "react";
import { BIOCEANICO_LAYERS } from "@data/bioceanico.data";
import {
  BioceanicoHeader,
  BioceanicoLayerFilter,
  BioceanicoMap,
} from "@components/territorio";

export default function BioceanicoPage() {
  const [layer, setLayer] = useState("producción");
  const current = BIOCEANICO_LAYERS[layer] || BIOCEANICO_LAYERS["producción"];

  return (
    <div
      className="relative z-10 pt-14 min-h-screen transition-colors duration-300"
      style={{ background: "transparent", color: "var(--t-text)" }}
    >
      <BioceanicoHeader />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <BioceanicoLayerFilter
          layers={BIOCEANICO_LAYERS}
          selectedLayer={layer}
          onSelectLayer={setLayer}
        />

        <p className="text-sm mb-6 italic transition-colors" style={{ color: "var(--t-text-muted)" }}>
          {current.description}
        </p>

        <BioceanicoMap currentLayer={current} />
      </main>
    </div>
  );
}
