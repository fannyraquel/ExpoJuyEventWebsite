import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Stand } from "@appTypes/domain.types";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Coordenadas Reales de Ciudad Cultural (Alto Padilla, San Salvador de Jujuy)
const PREDIO = {
  lat: -24.1855,
  lng: -65.2995,
};

export interface GoogleLocationMapProps {
  stands?: Stand[];
  busqueda?: string;
  selectedCat?: string;
}

// Convertidor de posición interna de Stand (x,y) a coordenadas GPS relativas
function getStandGpsPosition(x?: number, y?: number) {
  if (x === undefined || y === undefined) return PREDIO;
  const pctX = x > 100 ? (x / 595) * 100 : x;
  const pctY = y > 100 ? (y / 426) * 100 : y;

  // Offset GPS en la zona de Ciudad Cultural
  const lat = PREDIO.lat + (pctY - 50) * -0.000035;
  const lng = PREDIO.lng + (pctX - 50) * 0.000045;
  return { lat, lng };
}

export default function GoogleLocationMap({
  stands = [],
  busqueda = "",
  selectedCat = "Todos",
}: GoogleLocationMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  // Filtrado de Stands
  const filteredStands = useMemo(() => {
    const search = busqueda.toLowerCase().trim();

    return stands.filter((stand) => {
      const categoryOK =
        selectedCat === "Todos" || stand.categoria === selectedCat;

      const searchOK =
        !search ||
        String(stand.id ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.numero ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.empresa ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.categoria ?? "")
          .toLowerCase()
          .includes(search);

      return categoryOK && searchOK;
    });
  }, [stands, busqueda, selectedCat]);

  // VISTA FALLBACK INTERACTIVA (Google Maps oficial si no hay API Key en .env)
  if (!apiKey || loadError) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0F172A] text-white">
        {/* Mapa Oficial de Google Maps (Ciudad Cultural, Jujuy) */}
        <iframe
          title="Ubicación Ciudad Cultural Jujuy"
          src="https://maps.google.com/maps?q=-24.1855,-65.2995&hl=es&z=17&output=embed"
          className="h-full w-full border-0 opacity-100 transition-opacity"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Overlay informativo sobre la ubicación */}
        <div className="absolute top-4 left-4 z-10 max-w-xs rounded-2xl border border-white/15 bg-slate-900/90 p-4 text-xs shadow-2xl backdrop-blur-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-[#1DBECB] font-extrabold uppercase tracking-wider text-[10px]">
            <span>📍</span>
            <span>Ubicación GPS Oficial</span>
          </div>
          <h3 className="mt-1 font-black text-sm text-white">
            Ciudad Cultural • Alto Padilla
          </h3>
          <p className="mt-1 text-[11px] text-slate-300 leading-snug">
            San Salvador de Jujuy, Jujuy, Argentina.
          </p>

          <div className="mt-3 border-t border-white/10 pt-2.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Stands cargados:</span>
            <span className="font-bold text-[#1DBECB]">{filteredStands.length} espacios</span>
          </div>
        </div>

        {/* Botón directo para abrir GPS en Google Maps app */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2 items-end">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=-24.1855,-65.2995"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-2xl bg-[#7209B7] px-4 py-2.5 text-xs font-bold text-white shadow-xl border border-white/20 transition hover:bg-[#59078f] hover:scale-105"
          >
            <span>🧭</span>
            <span>Abrir en Google Maps / GPS</span>
          </a>
        </div>
      </div>
    );
  }

  // ESTADO DE CARGA GOOGLE MAPS JS API
  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0F172A] text-white">
        <div className="text-center">
          <div className="text-3xl animate-bounce mb-3">📍</div>
          <p className="text-[#1DBECB] font-bold text-sm">
            Cargando ubicación en Google Maps...
          </p>
        </div>
      </div>
    );
  }

  // RENDERING PRINCIPAL GOOGLE MAPS CON MARKERS
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={PREDIO}
      zoom={17}
      options={{
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: "greedy",
      }}
    >
      {/* Marcador Principal de Ciudad Cultural */}
      <MarkerF
        position={PREDIO}
        title="Ciudad Cultural - Predio ExpoJuy 2026"
      />

      {/* Marcadores de Stands Filtrados en Google Maps */}
      {filteredStands.map((stand) => {
        const gpsPos = getStandGpsPosition(stand.x, stand.y);
        return (
          <MarkerF
            key={stand.id}
            position={gpsPos}
            title={`${stand.empresa || "Stand"} (${stand.categoria})`}
            onClick={() => setSelectedStand(stand)}
          />
        );
      })}

      {/* Info Window al seleccionar un Stand */}
      {selectedStand && (
        <InfoWindowF
          position={getStandGpsPosition(selectedStand.x, selectedStand.y)}
          onCloseClick={() => setSelectedStand(null)}
        >
          <div className="p-1 text-slate-800 max-w-[200px]">
            <span className="text-[10px] font-bold text-[#7209B7] uppercase">
              {selectedStand.categoria}
            </span>
            <h4 className="font-extrabold text-xs mt-0.5">
              Stand {selectedStand.numero || selectedStand.id}
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {selectedStand.empresa || selectedStand.nombre || "Espacio reservado"}
            </p>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}