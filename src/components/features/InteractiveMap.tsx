import { useMemo, useState } from "react";
import planoImg from "../../assets/plano-predio.png"; // Ajustá el nombre exacto de tu imagen (.png, .jpg o .svg)

type Stand = {
  id?: number | string;
  numero?: string;
  empresa?: string;
  nombre?: string;
  categoria?: string;

  /*
   * Posición sobre el plano.
   *
   * 0 = izquierda / arriba
   * 100 = derecha / abajo
   */
  x?: number;
  y?: number;
};

type Props = {
  stands: Stand[];
  busqueda: string;
  selectedCat: string;
};

export default function InteractiveMap({
  stands,
  busqueda,
  selectedCat,
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [selectedStand, setSelectedStand] =
    useState<Stand | null>(null);

  const filteredStands = useMemo(() => {
    const search = busqueda
      .toLowerCase()
      .trim();

    return stands.filter((stand) => {
      const categoryOK =
        selectedCat === "Todos" ||
        stand.categoria === selectedCat;

      const searchOK =
        !search ||
        String(stand.numero ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.empresa ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.nombre ?? "")
          .toLowerCase()
          .includes(search) ||
        String(stand.categoria ?? "")
          .toLowerCase()
          .includes(search);

      return categoryOK && searchOK;
    });
  }, [
    stands,
    busqueda,
    selectedCat,
  ]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#111827]">

      {/* ===============================================
          CONTROLES
      ================================================ */}

      <div
        className="
          absolute
          top-4
          right-4
          z-50
          flex
          flex-col
          overflow-hidden
          rounded-xl
          shadow-xl
        "
      >
        <button
          type="button"
          onClick={() =>
            setZoom((z) =>
              Math.min(z + 0.25, 3)
            )
          }
          className="
            w-11
            h-11
            bg-slate-900
            text-white
            text-xl
            hover:bg-[#1DBECB]
          "
        >
          +
        </button>

        <button
          type="button"
          onClick={() =>
            setZoom((z) =>
              Math.max(z - 0.25, 0.75)
            )
          }
          className="
            w-11
            h-11
            bg-slate-900
            text-white
            text-xl
            border-t
            border-white/10
            hover:bg-[#1DBECB]
          "
        >
          −
        </button>

        <button
          type="button"
          onClick={() => setZoom(1)}
          className="
            w-11
            h-9
            bg-slate-900
            text-white
            text-[10px]
            border-t
            border-white/10
            hover:bg-[#1DBECB]
          "
        >
          CENTRAR
        </button>
      </div>

      {/* ===============================================
          PLANO
      ================================================ */}

      <div
        className="
          absolute
          inset-0
          overflow-auto
        "
      >
        <div
          className="
            min-w-[760px]
            min-h-[620px]
            w-full
            h-full
            flex
            items-center
            justify-center
            p-10
          "
        >
          <div
            className="
              relative
              shrink-0
              transition-transform
              duration-300
            "
            style={{
              width: "595px",
              height: "426px",
              transform: `scale(${zoom})`,
            }}
          >

            {/* PLANO REAL */}
            <img
              src={planoImg}
              alt="Plano real del predio"
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain select-none"
            />
            TypeScript


            {/* ========================================
                ZONA CONFERENCIAS
            ========================================= */}

            <button
              type="button"
              className="
                absolute
                rounded-md
                border-2
                border-[#7209B7]
                bg-[#7209B7]/10
                hover:bg-[#7209B7]/30
                transition
              "
              style={{
                left: "7%",
                top: "7%",
                width: "23%",
                height: "30%",
              }}
              title="Sala de Conferencias"
            >
              <span
                className="
                  bg-[#7209B7]
                  text-white
                  text-[9px]
                  font-bold
                  px-2
                  py-1
                  rounded
                "
              >
                CONFERENCIAS
              </span>
            </button>

            {/* ========================================
                ZONA ESPECTÁCULOS
            ========================================= */}

            <button
              type="button"
              className="
                absolute
                rounded-md
                border-2
                border-[#1DBECB]
                bg-[#1DBECB]/10
                hover:bg-[#1DBECB]/30
                transition
              "
              style={{
                left: "72%",
                top: "43%",
                width: "24%",
                height: "34%",
              }}
              title="Zona de Espectáculos"
            >
              <span
                className="
                  bg-[#1DBECB]
                  text-white
                  text-[9px]
                  font-bold
                  px-2
                  py-1
                  rounded
                "
              >
                ESPECTÁCULOS
              </span>
            </button>

            {/* ========================================
                STANDS
            ========================================= */}

            {filteredStands.map((stand, index) => {
              if (
                stand.x === undefined ||
                stand.y === undefined
              ) {
                return null;
              }

              return (
                <button
                  key={stand.id ?? index}
                  type="button"
                  onClick={() =>
                    setSelectedStand(stand)
                  }
                  className="
                    absolute
                    z-30
                    w-5
                    h-5
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border-2
                    border-white
                    bg-[#1DBECB]
                    shadow-[0_0_12px_rgba(29,190,203,.9)]
                    hover:scale-150
                    transition-transform
                  "
                  style={{
                    left: `${stand.x}%`,
                    top: `${stand.y}%`,
                  }}
                  title={
                    stand.empresa ??
                    stand.numero ??
                    "Stand"
                  }
                />
              );
            })}

            {/* ========================================
                INFO DEL STAND
            ========================================= */}

            {selectedStand &&
              selectedStand.x !== undefined &&
              selectedStand.y !== undefined && (
                <div
                  className="
                    absolute
                    z-[100]
                    min-w-[200px]
                    rounded-xl
                    p-4
                    shadow-2xl
                  "
                  style={{
                    left: `${selectedStand.x}%`,
                    top: `${selectedStand.y}%`,
                    transform:
                      "translate(12px, -105%)",
                    background:
                      "var(--t-card)",
                    border:
                      "1px solid var(--t-card-border)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedStand(null)
                    }
                    className="
                      absolute
                      right-2
                      top-2
                      opacity-50
                      hover:opacity-100
                    "
                  >
                    ×
                  </button>

                  <div className="text-[#1DBECB] text-[10px] uppercase font-bold">
                    {selectedStand.categoria}
                  </div>

                  <div className="font-black text-lg">
                    {selectedStand.numero ??
                      "Stand"}
                  </div>

                  <div className="text-sm">
                    {selectedStand.empresa ??
                      selectedStand.nombre ??
                      "Espacio disponible"}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* ===============================================
          LEYENDA
      ================================================ */}

      <div
        className="
          absolute
          left-4
          bottom-4
          z-40
          rounded-xl
          px-4
          py-3
          text-white
          backdrop-blur-md
        "
        style={{
          background:
            "rgba(15,23,42,.92)",
        }}
      >
        <div className="text-xs font-bold mb-2">
          Plano interactivo
        </div>

        <div className="text-[10px] opacity-70">
          ● Seleccioná un espacio
        </div>

        <div className="text-[10px] opacity-70">
          🔍 Usá + y − para acercar
        </div>
      </div>

      {/* CANTIDAD */}
      <div
        className="
          absolute
          right-4
          bottom-4
          z-40
          rounded-xl
          px-4
          py-3
          text-white
          backdrop-blur-md
        "
        style={{
          background:
            "rgba(15,23,42,.92)",
        }}
      >
        <span className="text-[#1DBECB] font-black">
          {filteredStands.length}
        </span>{" "}
        espacios
      </div>
    </div>
  );
}