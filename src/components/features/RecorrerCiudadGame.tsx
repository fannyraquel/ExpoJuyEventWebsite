import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
};

type Punto = {
  id: number;
  nombre: string;
  descripcion: string;
  x: number;
  y: number;
  icono: string;
};

const PUNTOS: Punto[] = [
  {
    id: 1,
    nombre: "Entrada Principal",
    descripcion: "Comenzá tu recorrido por la Ciudad Cultural.",
    x: 12,
    y: 76,
    icono: "🚪",
  },
  {
    id: 2,
    nombre: "Zona de Espectáculos",
    descripcion: "Acá suceden los grandes shows y actividades.",
    x: 76,
    y: 68,
    icono: "🎤",
  },
  {
    id: 3,
    nombre: "Sector Gastronómico",
    descripcion: "Un lugar para descubrir sabores y productos.",
    x: 54,
    y: 45,
    icono: "🍽️",
  },
  {
    id: 4,
    nombre: "Artesanos",
    descripcion: "Conocé a los productores y artesanos.",
    x: 40,
    y: 25,
    icono: "🧶",
  },
  {
    id: 5,
    nombre: "Sala de Conferencias",
    descripcion: "Charlas, encuentros y actividades.",
    x: 19,
    y: 18,
    icono: "🎙️",
  },
  {
    id: 6,
    nombre: "Juegos",
    descripcion: "Un espacio para disfrutar en familia.",
    x: 85,
    y: 22,
    icono: "🎮",
  },
];

export default function RecorrerCiudadGame({
  onClose,
}: Props) {
  const [player, setPlayer] = useState({
    x: 12,
    y: 76,
  });

  const [visitados, setVisitados] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState(
    "¡Comenzá el recorrido!"
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const speed = 2;

      setPlayer((current) => {
        let x = current.x;
        let y = current.y;

        if (key === "arrowup" || key === "w") {
          y -= speed;
        }

        if (key === "arrowdown" || key === "s") {
          y += speed;
        }

        if (key === "arrowleft" || key === "a") {
          x -= speed;
        }

        if (key === "arrowright" || key === "d") {
          x += speed;
        }

        return {
          x: Math.max(5, Math.min(95, x)),
          y: Math.max(8, Math.min(92, y)),
        };
      });
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /*
   * Detectar si el jugador llegó a un punto.
   */
  useEffect(() => {
    PUNTOS.forEach((punto) => {
      const distance = Math.sqrt(
        Math.pow(player.x - punto.x, 2) +
        Math.pow(player.y - punto.y, 2)
      );

      if (
        distance < 6 &&
        !visitados.includes(punto.id)
      ) {
        setVisitados((current) => [
          ...current,
          punto.id,
        ]);

        setMensaje(
          `${punto.icono} ${punto.nombre}: ${punto.descripcion}`
        );
      }
    });
  }, [player, visitados]);

  const terminado =
    visitados.length === PUNTOS.length;

  const reiniciar = () => {
    setPlayer({
      x: 12,
      y: 76,
    });

    setVisitados([]);
    setMensaje("¡Comenzá el recorrido!");
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          relative
          w-full
          max-w-5xl
          rounded-3xl
          overflow-hidden
          shadow-2xl
          border
        "
        style={{
          background: "var(--t-card)",
          borderColor:
            "var(--t-card-border)",
        }}
      >

        {/* ==========================================
            HEADER DEL JUEGO
        =========================================== */}

        <div
          className="
            bg-[#1DBECB]
            px-5
            py-4
            flex
            items-center
            justify-between
          "
        >
          <div>
            <div className="text-white/70 text-[10px] uppercase tracking-widest font-bold">
              Experiencia interactiva
            </div>

            <h2 className="font-display text-2xl font-black text-white">
              Recorrer la Ciudad Cultural
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-full
              bg-black/20
              text-white
              hover:bg-black/30
              text-xl
            "
          >
            ×
          </button>
        </div>

        {/* ==========================================
            JUEGO
        =========================================== */}

        <div className="p-4 md:p-6">

          <div className="flex flex-col lg:flex-row gap-5">

            {/* MAPA DEL JUEGO */}
            <div className="flex-1">

              <div
                className="
                  relative
                  aspect-[16/9]
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-[#101827]
                "
                style={{
                  borderColor:
                    "var(--t-card-border)",
                }}
              >

                {/* CALLES */}
                <div className="absolute left-0 right-0 top-[48%] h-[8%] bg-white/5" />

                <div className="absolute top-0 bottom-0 left-[43%] w-[7%] bg-white/5" />

                <div className="absolute left-[8%] top-[20%] w-[80%] h-[3%] rotate-[12deg] bg-white/5" />

                <div className="absolute left-[15%] top-[72%] w-[70%] h-[3%] rotate-[-10deg] bg-white/5" />

                {/* DECORACIÓN */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 35 }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className="absolute w-1 h-1 bg-[#1DBECB] rounded-full"
                        style={{
                          left: `${(index * 37) % 100}%`,
                          top: `${(index * 61) % 100}%`,
                        }}
                      />
                    )
                  )}
                </div>

                {/* PUNTOS */}
                {PUNTOS.map((punto) => {
                  const visitado =
                    visitados.includes(punto.id);

                  return (
                    <div
                      key={punto.id}
                      className="
                        absolute
                        -translate-x-1/2
                        -translate-y-1/2
                      "
                      style={{
                        left: `${punto.x}%`,
                        top: `${punto.y}%`,
                      }}
                    >
                      <div
                        className={`
                          w-10
                          h-10
                          rounded-full
                          flex
                          items-center
                          justify-center
                          border-2
                          border-white
                          shadow-lg
                          text-lg
                          transition-all
                          ${
                            visitado
                              ? "bg-[#1DBECB] scale-90"
                              : "bg-[#7209B7] animate-pulse"
                          }
                        `}
                      >
                        {visitado ? "✓" : punto.icono}
                      </div>

                      <div
                        className="
                          absolute
                          top-11
                          left-1/2
                          -translate-x-1/2
                          whitespace-nowrap
                          text-[9px]
                          font-bold
                          text-white
                          bg-black/70
                          px-2
                          py-1
                          rounded
                        "
                      >
                        {punto.nombre}
                      </div>
                    </div>
                  );
                })}

                {/* JUGADOR */}
                <div
                  className="
                    absolute
                    z-50
                    -translate-x-1/2
                    -translate-y-1/2
                    transition-all
                    duration-75
                  "
                  style={{
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                  }}
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      border-4
                      border-[#1DBECB]
                      shadow-[0_0_20px_rgba(29,190,203,.9)]
                      flex
                      items-center
                      justify-center
                      text-xl
                    "
                  >
                    🧍
                  </div>
                </div>
              </div>

              {/* CONTROLES MÓVILES */}
              <div className="flex justify-center mt-4">
                <div className="grid grid-cols-3 gap-1">
                  <div />

                  <GameButton
                    onClick={() =>
                      movePlayer(
                        setPlayer,
                        0,
                        -2
                      )
                    }
                  >
                    ↑
                  </GameButton>

                  <div />

                  <GameButton
                    onClick={() =>
                      movePlayer(
                        setPlayer,
                        -2,
                        0
                      )
                    }
                  >
                    ←
                  </GameButton>

                  <GameButton
                    onClick={() =>
                      movePlayer(
                        setPlayer,
                        0,
                        2
                      )
                    }
                  >
                    ↓
                  </GameButton>

                  <GameButton
                    onClick={() =>
                      movePlayer(
                        setPlayer,
                        2,
                        0
                      )
                    }
                  >
                    →
                  </GameButton>
                </div>
              </div>
            </div>

            {/* PANEL */}
            <aside
              className="
                lg:w-72
                rounded-2xl
                p-5
                border
              "
              style={{
                background: "var(--t-bg)",
                borderColor:
                  "var(--t-card-border)",
              }}
            >
              <div className="text-[#1DBECB] text-xs uppercase tracking-widest font-bold">
                Tu recorrido
              </div>

              <div className="text-4xl font-black mt-2">
                {visitados.length}
                <span className="text-base opacity-40">
                  {" "}
                  / {PUNTOS.length}
                </span>
              </div>

              <div className="text-xs opacity-60 mb-5">
                lugares descubiertos
              </div>

              {/* PROGRESO */}
              <div className="h-2 bg-black/10 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#1DBECB] transition-all"
                  style={{
                    width: `${
                      (visitados.length /
                        PUNTOS.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              {/* MENSAJE */}
              <div
                className="
                  rounded-xl
                  p-4
                  text-sm
                  mb-5
                "
                style={{
                  background:
                    "rgba(29,190,203,.08)",
                }}
              >
                {mensaje}
              </div>

              {/* LISTA */}
              <div className="space-y-2">
                {PUNTOS.map((punto) => {
                  const done =
                    visitados.includes(
                      punto.id
                    );

                  return (
                    <div
                      key={punto.id}
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                      "
                    >
                      <span>
                        {done ? "✅" : "⭕"}
                      </span>

                      <span
                        className={
                          done
                            ? "line-through opacity-40"
                            : ""
                        }
                      >
                        {punto.nombre}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* GANASTE */}
              {terminado && (
                <div className="mt-5 text-center">
                  <div className="text-4xl mb-2">
                    🎉
                  </div>

                  <div className="font-black text-[#7209B7]">
                    ¡Recorrido completo!
                  </div>

                  <p className="text-xs opacity-60 mt-1">
                    Descubriste toda la Ciudad Cultural.
                  </p>
                </div>
              )}

              <button
                onClick={reiniciar}
                className="
                  w-full
                  mt-6
                  py-2.5
                  rounded-xl
                  border
                  text-xs
                  font-bold
                  hover:bg-[#1DBECB]
                  hover:text-white
                  transition
                "
              >
                Reiniciar recorrido
              </button>

              <p className="text-[10px] opacity-40 text-center mt-3">
                Usá las flechas del teclado o WASD
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   BOTÓN MÓVIL
====================================================== */

function GameButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-12
        h-10
        rounded-lg
        bg-[#7209B7]
        hover:bg-[#4D0080]
        text-white
        font-black
        shadow
      "
    >
      {children}
    </button>
  );
}

/* ======================================================
   MOVIMIENTO
====================================================== */

function movePlayer(
  setPlayer: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  dx: number,
  dy: number
) {
  setPlayer((current) => ({
    x: Math.max(
      5,
      Math.min(95, current.x + dx)
    ),
    y: Math.max(
      8,
      Math.min(92, current.y + dy)
    ),
  }));
}