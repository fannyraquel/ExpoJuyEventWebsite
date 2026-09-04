import { EventStatus } from "../types/domain.types";

export const STATUS_CONFIG: Record<
  EventStatus,
  { textColor: string; bgColor: string; borderColor: string; icon: string; label: string }
> = {
  "en vivo": { textColor: "#FFFFFF", bgColor: "#16A34A", borderColor: "#15803D", icon: "●", label: "En vivo" },
  siguiente: { textColor: "#FFFFFF", bgColor: "#0891B2", borderColor: "#0E7490", icon: "▶", label: "Siguiente" },
  próximo: { textColor: "#FFFFFF", bgColor: "#1DBECB", borderColor: "#17A3AF", icon: "◎", label: "Próximo" },
  finalizado: { textColor: "#FFFFFF", bgColor: "#6B7280", borderColor: "#4B5563", icon: "✓", label: "Finalizado" },
  retrasado: { textColor: "#FFFFFF", bgColor: "#D97706", borderColor: "#B45309", icon: "⏱", label: "Retrasado" },
  cancelado: { textColor: "#FFFFFF", bgColor: "#DC2626", borderColor: "#B91C1C", icon: "✕", label: "Cancelado" },
};

export const CAT_COLORS: Record<string, string> = {
  Minería: "#7209B7",
  Agroindustria: "#1DBECB",
  Turismo: "#7209B7",
  Textil: "#1DBECB",
  Biodiversidad: "#1DBECB",
  Industria: "#8E8E93",
  Servicios: "#8E8E93",
  Gastronomía: "#A881FC",
};

export const LANGS: Record<string, { label: string; border: string }> = {
  ES: { label: "Español", border: "#74ACDF" },
  PT: { label: "Português", border: "#009C3B" },
  FR: { label: "Français", border: "#002395" },
  EN: { label: "English", border: "#B22234" },
};
