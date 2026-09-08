import React from "react";
import { LayerInfo } from "@appTypes/domain.types";

export interface BioceanicoLayerFilterProps {
  layers: Record<string, LayerInfo>;
  selectedLayer: string;
  onSelectLayer: (layerKey: string) => void;
}

export default function BioceanicoLayerFilter({
  layers,
  selectedLayer,
  onSelectLayer,
}: BioceanicoLayerFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.keys(layers).map((key) => {
        const layerObj = layers[key];
        const activo = selectedLayer === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelectLayer(key)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm capitalize transition-all border cursor-pointer ${
              activo ? "text-white border-transparent shadow-md scale-105" : ""
            }`}
            style={{
              background: activo ? layerObj.color : "var(--t-card)",
              borderColor: activo ? "transparent" : "var(--t-card-border)",
              color: activo ? "#FFFFFF" : "var(--t-text)",
            }}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
