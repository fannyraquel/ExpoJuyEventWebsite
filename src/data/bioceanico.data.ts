import { LayerInfo } from "../types/domain.types";

export const BIOCEANICO_LAYERS: Record<string, LayerInfo> = {
  producción: {
    color: "#7209B7",
    description: "Circuito productivo: agroindustria, minería, manufactura",
    points: [
      { x: 420, y: 180, label: "São Paulo", detail: "Hub manufacturero" },
      { x: 340, y: 220, label: "Asunción", detail: "Agroindustria" },
      { x: 200, y: 260, label: "Jujuy", detail: "Litio + Agroindustria" },
      { x: 100, y: 240, label: "Antofagasta", detail: "Minería + Puerto" },
    ],
  },
  turismo: {
    color: "#7209B7",
    description: "Ruta turística bioceánica: destinos culturales y naturales",
    points: [
      { x: 420, y: 180, label: "Iguazú", detail: "Patrimonio natural" },
      { x: 340, y: 220, label: "Asunción", detail: "Ciudad histórica" },
      { x: 200, y: 260, label: "Quebrada", detail: "Patrimonio UNESCO" },
      { x: 100, y: 240, label: "Atacama", detail: "Desierto" },
    ],
  },
  minería: {
    color: "#1DBECB",
    description: "Corredor minero: litio, cobre, y minerales críticos",
    points: [
      { x: 200, y: 200, label: "Puna Jujeña", detail: "Litio" },
      { x: 160, y: 240, label: "Catamarca", detail: "Cobre" },
      { x: 100, y: 230, label: "Atacama", detail: "Litio + Cobre" },
      { x: 80, y: 260, label: "Antofagasta", detail: "Puerto exportación" },
    ],
  },
  logística: {
    color: "#1DBECB",
    description: "Infraestructura vial, ferroviaria y portuaria",
    points: [
      { x: 420, y: 180, label: "Santos", detail: "Puerto Atlántico" },
      { x: 340, y: 220, label: "Asunción", detail: "Nodo logístico" },
      { x: 200, y: 260, label: "Jujuy", detail: "Paso de Jama" },
      { x: 100, y: 240, label: "Iquique", detail: "Puerto Pacífico" },
    ],
  },
};
