import { useEffect, useState } from "react";

import AguayoDivider from "@components/common/AguayoDivider";
import RecorrerCiudadGame from "@components/features/RecorrerCiudadGame";
import { standsService } from "@api/services/standsService";
import { Stand } from "@appTypes/domain.types";
import RegistroExpositorForm from "../../forms/expositores/RegistroExpositorForm";
import {
  PlanoHeader,
  PlanoSearchFilter,
  PlanoColectivosSection,
  PlanoMapSection,
  PlanoCategoria,
} from "@components/plano";

export const CATEGORIAS_PLANO: PlanoCategoria[] = [
  {
    id: "Todos",
    label: "Todos",
    cantidad: 167,
  },
  {
    id: "Stands Cubiertos",
    label: "Cubiertos",
    cantidad: 95,
  },
  {
    id: "Artesanos",
    label: "Artesanos",
    cantidad: 25,
  },
  {
    id: "Stands Descubiertos",
    label: "Descubiertos",
    cantidad: 32,
  },
  {
    id: "Gastronómicos",
    label: "Gastronómicos",
    cantidad: 13,
  },
  {
    id: "Juegos",
    label: "Juegos",
    cantidad: 2,
  },
];

export default function PlanoPage() {
  const [stands, setStands] = useState<Stand[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todos");
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    standsService.getStands().then((res) => {
      if (res.success && res.data) {
        setStands(res.data);
      }
    });
  }, []);

  return (
    <div
      className="relative z-10 pt-14 min-h-screen transition-colors duration-300"
      style={{
        background: "transparent",
        color: "var(--t-text)",
      }}
    >
      {/* HEADER DE LA PÁGINA */}
      <PlanoHeader
        showRegistroModal={showRegistroModal}
        onToggleRegistroModal={() => setShowRegistroModal(!showRegistroModal)}
        onOpenGame={() => setShowGame(true)}
      />

      <AguayoDivider />

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-[1450px] mx-auto px-4 py-10 space-y-6">
        {/* FORMULARIO DE REGISTRO EXPOSITOR (MODAL/ACORDEÓN) */}
        {showRegistroModal && (
          <div className="mb-8">
            <RegistroExpositorForm />
          </div>
        )}

        {/* BUSCADOR Y FILTRO DE CATEGORÍAS DE STANDS */}
        <PlanoSearchFilter
          busqueda={busqueda}
          onSearchChange={setBusqueda}
          categorias={CATEGORIAS_PLANO}
          selectedCat={selectedCat}
          onSelectCat={setSelectedCat}
        />

        {/* MAPAS DEL PREDIO (MAPA INTERACTIVO FULL-WIDTH ARRIBA + GOOGLE MAPS Y COLECTIVOS ABAJO) */}
        <PlanoMapSection
          stands={stands}
          busqueda={busqueda}
          selectedCat={selectedCat}
        />
      </main>

      {/* MODAL DE VIRTUAL TOUR / JUEGO */}
      {showGame && (
        <RecorrerCiudadGame onClose={() => setShowGame(false)} />
      )}
    </div>
  );
}