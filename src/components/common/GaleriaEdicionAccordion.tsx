import { useState } from "react";

interface GaleriaEdicionAccordionProps {
  imagenes: string[];
  titulo?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function GaleriaEdicionAccordion({
  imagenes,
  titulo = "Galería Fotográfica",
  isOpen,
  onToggle,
}: GaleriaEdicionAccordionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev" | "fade">("fade");

  if (!imagenes || imagenes.length === 0) {
    return null;
  }

  const openLightbox = (url: string, index: number) => {
    setTransitionDirection("fade");
    setSelectedImage(url);
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && imagenes.length > 0) {
      setTransitionDirection("prev");
      const prevIdx = (selectedImageIndex - 1 + imagenes.length) % imagenes.length;
      setSelectedImageIndex(prevIdx);
      setSelectedImage(imagenes[prevIdx]);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && imagenes.length > 0) {
      setTransitionDirection("next");
      const nextIdx = (selectedImageIndex + 1) % imagenes.length;
      setSelectedImageIndex(nextIdx);
      setSelectedImage(imagenes[nextIdx]);
    }
  };

  const getAnimationClass = () => {
    switch (transitionDirection) {
      case "next":
        return "animate-img-slide-right";
      case "prev":
        return "animate-img-slide-left";
      case "fade":
      default:
        return "animate-img-fade";
    }
  };

  return (
    <div className="w-full transition-all duration-300">
      {/* BOTÓN DISPARADOR DE ACORDEÓN */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-2 rounded-xl text-left hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#7209B7] dark:text-[#A881FC]">
          <span>📸</span>
          <span>
            {titulo} ({imagenes.length} {imagenes.length === 1 ? "fotografía" : "fotografías"})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-[#1DBECB]">
            {isOpen ? "Ocultar Galería ▲" : "Desplegar Galería ▼"}
          </span>
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 text-xs font-black transition-transform duration-300 ${
              isOpen ? "rotate-180 bg-[#7209B7] text-white" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      {/* CONTENIDO DESPLEGABLE TIPO ACORDEÓN CON MASONRY PINTEREST */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 animate-fade-in transition-all">
          {imagenes.length === 0 ? (
            <div className="py-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-white/15 p-6 bg-slate-50 dark:bg-white/5">
              <span className="text-3xl block mb-1">📷</span>
              <p className="text-xs text-[var(--t-text-muted)] font-medium">
                Archivos fotográficos impresos conservados en el acervo institucional físico de la Cámara de Comercio Exterior.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {imagenes.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(imgUrl, idx)}
                  className="group/card relative break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#1A1D33] shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`Fotografía ${idx + 1}`}
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover/card:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 text-white text-xs font-extrabold">
                    <span>🔍 Ampliar</span>
                    <span className="text-[10px] font-mono opacity-80">Foto {idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL LIGHTBOX CON BOTÓN DE CIERRE CLARO, NAVEGACIÓN Y TRANSICIÓN FLUIDA */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          {/* BOTÓN PRINCIPAL PARA CERRAR LA VISUALIZACIÓN DE LA IMAGEN */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 text-xs font-black shadow-2xl transition-all cursor-pointer hover:scale-105"
          >
            <span>✕</span>
            <span>Cerrar Visualización</span>
          </button>

          {/* BOTÓN NAVEGACIÓN ANTERIOR */}
          {imagenes.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-[#7209B7] text-white text-2xl font-black shadow-lg transition-all cursor-pointer hover:scale-110"
              aria-label="Fotografía anterior"
            >
              ‹
            </button>
          )}

          {/* CONTENEDOR CENTRAL DE LA IMAGEN AMPLIADA CON TRANSICIÓN DINÁMICA */}
          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center">
            <div className="overflow-hidden rounded-2xl flex items-center justify-center p-1">
              <img
                key={`${selectedImageIndex}-${transitionDirection}`}
                src={selectedImage}
                alt="Visualización ampliada"
                className={`max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20 ${getAnimationClass()}`}
              />
            </div>

            {/* BARRA INFERIOR DE ACCIONES, MINIATURAS Y BOTÓN DE CIERRE */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-mono font-bold text-white/90 bg-black/60 px-4 py-1.5 rounded-full border border-white/20 shadow-md">
                Imagen {selectedImageIndex !== null ? selectedImageIndex + 1 : 1} de {imagenes.length}
              </span>

              {/* MINIATURAS RÁPIDAS */}
              {imagenes.length > 1 && (
                <div className="flex items-center gap-1.5 max-w-xs overflow-x-auto p-1 scrollbar-none">
                  {imagenes.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setTransitionDirection(i > (selectedImageIndex ?? 0) ? "next" : "prev");
                        setSelectedImageIndex(i);
                        setSelectedImage(img);
                      }}
                      className={`h-8 w-8 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                        i === selectedImageIndex
                          ? "border-[#1DBECB] scale-110 shadow-lg ring-2 ring-[#1DBECB]/50"
                          : "border-white/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-full bg-white/20 hover:bg-rose-600 text-white px-4 py-1.5 text-xs font-black shadow-md transition-all cursor-pointer"
              >
                Cerrar Imagen ✕
              </button>
            </div>
          </div>

          {/* BOTÓN NAVEGACIÓN SIGUIENTE */}
          {imagenes.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 hover:bg-[#7209B7] text-white text-2xl font-black shadow-lg transition-all cursor-pointer hover:scale-110"
              aria-label="Fotografía siguiente"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
