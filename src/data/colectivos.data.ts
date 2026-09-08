export interface ColectivoLinea {
  id: string;
  linea: string;
  empresa: "Santa Ana" | "El Urbano";
  recorrido: string;
  parada: string;
  frecuencia: string;
  color: string;
  destacado?: boolean;
}

export const COLECTIVOS_CIUDAD_CULTURAL: ColectivoLinea[] = [
  {
    id: "col-1",
    linea: "Línea 4",
    empresa: "Santa Ana",
    recorrido: "Barrio Chijra ↔ Centro ↔ Ciudad Cultural / Alto Padilla",
    parada: "Acceso Principal - Av. Bolivia",
    frecuencia: "Cada 8 - 10 min",
    color: "#7209B7",
    destacado: true,
  },
  {
    id: "col-2",
    linea: "Línea 8",
    empresa: "Santa Ana",
    recorrido: "Barrio Malvinas ↔ Terminal ↔ Centro ↔ Ciudad Cultural",
    parada: "Parada Central Predio Ferial",
    frecuencia: "Cada 10 - 12 min",
    color: "#1DBECB",
    destacado: true,
  },
  {
    id: "col-3",
    linea: "Línea 18",
    empresa: "Santa Ana",
    recorrido: "Barrio Alto Comedero (Sector B1) ↔ Centro ↔ Ciudad Cultural",
    parada: "Av. Bolivia frente a Predio ExpoJuy",
    frecuencia: "Cada 10 min",
    color: "#9D4EDD",
    destacado: true,
  },
  {
    id: "col-4",
    linea: "Línea 33",
    empresa: "Santa Ana",
    recorrido: "Barrio Los Perales ↔ Chijra ↔ Ciudad Cultural",
    parada: "Rotonda de Ingreso Alto Padilla",
    frecuencia: "Cada 12 - 15 min",
    color: "#3A0CA3",
  },
  {
    id: "col-5",
    linea: "Línea 47",
    empresa: "Santa Ana",
    recorrido: "Barrio Cuyaya ↔ Centro ↔ Ciudad Cultural",
    parada: "Acceso Sur Ciudad Cultural",
    frecuencia: "Cada 15 min",
    color: "#480CA8",
  },
  {
    id: "col-6",
    linea: "Línea 3",
    empresa: "El Urbano",
    recorrido: "Barrio Alto Comedero (Sector B6) ↔ Centro ↔ Ciudad Cultural",
    parada: "Acceso Sur Ciudad Cultural",
    frecuencia: "Cada 8 - 10 min",
    color: "#4361EE",
    destacado: true,
  },
  {
    id: "col-7",
    linea: "Línea 7",
    empresa: "El Urbano",
    recorrido: "Barrio San Pedrito ↔ Terminal Vieja ↔ Ciudad Cultural",
    parada: "Estacionamiento General Predio",
    frecuencia: "Cada 10 - 12 min",
    color: "#4CC9F0",
    destacado: true,
  },
  {
    id: "col-8",
    linea: "Línea 12",
    empresa: "El Urbano",
    recorrido: "Barrio Mariano Moreno ↔ Centro ↔ Ciudad Cultural",
    parada: "Av. Bolivia e Curva de Acceso",
    frecuencia: "Cada 12 - 15 min",
    color: "#4895EF",
  },
  {
    id: "col-9",
    linea: "Línea 17",
    empresa: "El Urbano",
    recorrido: "Barrio Coronel Arias ↔ Terminal ↔ Ciudad Cultural",
    parada: "Dársena Central Alto Padilla",
    frecuencia: "Cada 15 min",
    color: "#560BAD",
  },
  {
    id: "col-10",
    linea: "Línea 23",
    empresa: "El Urbano",
    recorrido: "Barrio Campo Verde ↔ Centro ↔ Ciudad Cultural",
    parada: "Acceso Principal - Av. Bolivia",
    frecuencia: "Cada 15 min",
    color: "#3F37C9",
  },
];
