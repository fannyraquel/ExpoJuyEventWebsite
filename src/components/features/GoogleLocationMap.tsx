import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

/*
 * IMPORTANTE:
 * Reemplazar estas coordenadas por las coordenadas
 * REALES de Ciudad Cultural.
 */
const PREDIO = {
  lat: -24.1858,
  lng: -65.2995,
};

export default function GoogleLocationMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey:
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <div>
          <div className="text-4xl mb-3">🗺️</div>

          <p className="font-bold">
            No se pudo cargar Google Maps
          </p>

          <p className="text-sm opacity-60 mt-1">
            Revisá la clave de Google Maps.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className="
          h-full
          flex
          items-center
          justify-center
          bg-[#101827]
          text-white
        "
      >
        <div className="text-center">
          <div className="text-3xl animate-pulse mb-3">
            📍
          </div>

          <p className="text-[#1DBECB] font-bold">
            Cargando mapa...
          </p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={PREDIO}
      zoom={16}
      options={{
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: "greedy",
      }}
    >
      <MarkerF
        position={PREDIO}
        title="Ciudad Cultural"
      />
    </GoogleMap>
  );
}