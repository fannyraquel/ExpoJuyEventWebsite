import { useEffect, useState } from "react";

import AguayoDivider from "../../components/common/AguayoDivider";
import InteractiveMap from "../../components/features/InteractiveMap";
import GoogleLocationMap from "../../components/features/GoogleLocationMap";
import RecorrerCiudadGame from "../../components/features/RecorrerCiudadGame";
import { standsService } from "../../api/services/standsService";
import { Stand } from "../../types/domain.types";
import RegistroExpositorForm from "../../forms/expositores/RegistroExpositorForm";

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

  const categorias = [
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

  return (
    <div
      className="relative z-10 pt-14 min-h-screen"
      style={{
        background: "transparent",
        color: "var(--t-text)",
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="bg-[#1DBECB]/78 py-12 px-4 text-center backdrop-blur-sm">
        <div className="font-mono-data text-white/70 text-xs uppercase tracking-[0.2em] mb-3">
          Plano interactivo
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
          Mapa del predio
        </h1>

        <p className="text-white/80 max-w-2xl mx-auto mb-6">
          Encontrá la ubicación del predio, conocé la distribución
          de los espacios y descubrí todo lo que tiene para ofrecer.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {/* REGISTRO */}
          <button
            onClick={() =>
              setShowRegistroModal(!showRegistroModal)
            }
            className="
              bg-[#7209B7]
              hover:bg-[#4D0080]
              text-white
              px-6
              py-3
              rounded-lg
              text-sm
              font-bold
              shadow-md
              transition-all
              hover:scale-[1.02]
            "
          >
            {showRegistroModal
              ? "Ocultar Registro"
              : "Solicitar Stand / Registro Expositores"}
          </button>

          {/* JUEGO */}
          <button
            onClick={() => setShowGame(true)}
            className="
              bg-white
              hover:bg-white/90
              text-[#7209B7]
              px-6
              py-3
              rounded-lg
              text-sm
              font-black
              shadow-md
              transition-all
              hover:scale-[1.02]
              flex
              items-center
              gap-2
            "
          >
            <span className="text-lg">🧭</span>
            Recorrer la Ciudad Cultural
          </button>
        </div>
      </section>

      <AguayoDivider />

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <main className="max-w-[1450px] mx-auto px-4 py-10">

        {/* REGISTRO */}
        {showRegistroModal && (
          <div className="mb-8">
            <RegistroExpositorForm />
          </div>
        )}

        {/* ===================================================
            BUSCADOR
        ==================================================== */}

        <section
          className="rounded-2xl border p-4 mb-6 shadow-sm"
          style={{
            background: "var(--t-card)",
            borderColor: "var(--t-card-border)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4">

            {/* BUSCADOR */}
            <div className="relative flex-1">
              <span
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-lg
                  pointer-events-none
                "
              >
                🔎
              </span>

              <input
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
                placeholder="Buscar empresa, stand o rubro..."
                className="
                  w-full
                  rounded-xl
                  pl-11
                  pr-4
                  py-3
                  text-sm
                  border
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#1DBECB]/30
                "
                style={{
                  background: "var(--t-input-bg)",
                  borderColor: "var(--t-input-border)",
                  color: "var(--t-text)",
                }}
              />
            </div>

            {/* CATEGORÍAS */}
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => {
                const active =
                  selectedCat === categoria.id;

                return (
                  <button
                    key={categoria.id}
                    onClick={() =>
                      setSelectedCat(categoria.id)
                    }
                    className={`
                      px-4
                      py-2
                      rounded-full
                      border
                      text-xs
                      font-bold
                      transition-all
                      whitespace-nowrap
                      ${
                        active
                          ? "bg-[#1DBECB] text-white"
                          : "hover:border-[#1DBECB]"
                      }
                    `}
                    style={{
                      background: active
                        ? "#1DBECB"
                        : "var(--t-card)",
                      borderColor: active
                        ? "#1DBECB"
                        : "var(--t-card-border)",
                      color: active
                        ? "#fff"
                        : "var(--t-text)",
                    }}
                  >
                    {categoria.label}

                    <span
                      className={`
                        ml-1.5
                        ${
                          active
                            ? "text-white/80"
                            : "opacity-50"
                        }
                      `}
                    >
                      {categoria.cantidad}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================
            MAPAS
        ==================================================== */}

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* ================================================
              GOOGLE MAPS
          ================================================= */}

          <div
            className="
              rounded-2xl
              overflow-hidden
              border
              shadow-lg
            "
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
            }}
          >
            <div className="px-5 py-4 border-b">
              <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-bold">
                Cómo llegar
              </div>

              <h2 className="font-display text-2xl font-black">
                Ubicación del predio
              </h2>

              <p className="text-sm opacity-60 mt-1">
                Encontrá el predio y utilizá GPS para llegar.
              </p>
            </div>

            <div className="h-[620px]">
              <GoogleLocationMap />
            </div>
          </div>

          {/* ================================================
              PLANO REAL
          ================================================= */}

          <div
            className="
              rounded-2xl
              overflow-hidden
              border
              shadow-lg
            "
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
            }}
          >
            <div className="px-5 py-4 border-b">
              <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-bold">
                Distribución
              </div>

              <h2 className="font-display text-2xl font-black">
                Plano del predio
              </h2>

              <p className="text-sm opacity-60 mt-1">
                Explorá los espacios y stands.
              </p>
            </div>

            <div className="h-[620px]">
              <InteractiveMap
                stands={stands}
                busqueda={busqueda}
                selectedCat={selectedCat}
              />
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          JUEGO
      ====================================================== */}

      {showGame && (
        <RecorrerCiudadGame
          onClose={() => setShowGame(false)}
        />
      )}
    </div>
  );
}