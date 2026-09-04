import { Stand } from "../types/domain.types";

export const STANDS: Stand[] = [
  { id: "A1", empresa: "Litio Puna S.A.", categoria: "Minería", x: 60, y: 80, w: 80, h: 60, open: true },
  { id: "A2", empresa: "Agro Jujuy SRL", categoria: "Agroindustria", x: 160, y: 80, w: 80, h: 60, open: true },
  { id: "B1", empresa: "Quebrada Turismo", categoria: "Turismo", x: 60, y: 180, w: 80, h: 60, open: false },
  { id: "B2", empresa: "Andina Textiles", categoria: "Textil", x: 160, y: 180, w: 80, h: 60, open: true },
  { id: "C1", empresa: "Yungas Bio S.A.", categoria: "Biodiversidad", x: 60, y: 280, w: 80, h: 60, open: true },
  { id: "C2", empresa: "Perico Industrial", categoria: "Industria", x: 160, y: 280, w: 80, h: 60, open: false },
  { id: "D1", empresa: "Salinas Grandes Corp.", categoria: "Minería", x: 300, y: 80, w: 100, h: 140, open: true },
  { id: "D2", empresa: "San Pedro Citrus", categoria: "Agroindustria", x: 300, y: 250, w: 100, h: 90, open: true },
  { id: "S1", empresa: "🚻 Sanitarios", categoria: "Servicios", x: 260, y: 180, w: 30, h: 40, open: true },
  { id: "S2", empresa: "🍽 Gastronomía", categoria: "Gastronomía", x: 420, y: 80, w: 90, h: 180, open: true },
  { id: "S3", empresa: "🏥 Primeros Auxilios", categoria: "Servicios", x: 420, y: 270, w: 90, h: 70, open: true },
];
