export type SponsorTier =
  | "diamante"
  | "platino"
  | "oro"
  | "plata"
  | "bronce"
  | "pyme"
  | "media_partner";

export interface SponsorTierInfo {
  id: SponsorTier;
  titulo: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  descripcion: string;
  orden: number;
}

export interface Sponsor {
  id: string;
  nombre: string;
  tier: SponsorTier;
  logoUrl?: string;
  sitioWeb?: string;
  descripcion?: string;
  rubro?: string;
  destacado?: boolean;
  colorLogo?: string;
}

export const SPONSOR_TIERS: Record<SponsorTier, SponsorTierInfo> = {
  diamante: {
    id: "diamante",
    titulo: "SPONSOR DIAMANTE",
    badgeBg: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
    badgeText: "text-cyan-600 dark:text-cyan-300",
    borderColor: "border-cyan-400/40 dark:border-cyan-400/30",
    accentColor: "#1DBECB",
    descripcion: "Patrocinadores principales de máximo prestigio con la máxima presencia institucional.",
    orden: 1,
  },
  platino: {
    id: "platino",
    titulo: "SPONSOR PLATINO",
    badgeBg: "from-slate-300/30 via-slate-400/20 to-slate-500/20",
    badgeText: "text-slate-700 dark:text-slate-200",
    borderColor: "border-slate-300 dark:border-slate-600",
    accentColor: "#94A3B8",
    descripcion: "Socios estratégicos líderes en innovación y desarrollo industrial.",
    orden: 2,
  },
  oro: {
    id: "oro",
    titulo: "SPONSOR ORO",
    badgeBg: "from-amber-400/20 via-yellow-500/20 to-amber-600/20",
    badgeText: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-400/40 dark:border-amber-500/30",
    accentColor: "#F59E0B",
    descripcion: "Empresas e instituciones destacadas en la matriz económica del NOA.",
    orden: 3,
  },
  plata: {
    id: "plata",
    titulo: "SPONSOR PLATA",
    badgeBg: "from-slate-400/20 via-zinc-400/20 to-slate-400/20",
    badgeText: "text-slate-600 dark:text-slate-400",
    borderColor: "border-slate-400/30 dark:border-slate-700",
    accentColor: "#64748B",
    descripcion: "Marcas impulsoras de la tecnología, infraestructura y comercio.",
    orden: 4,
  },
  bronce: {
    id: "bronce",
    titulo: "SPONSOR BRONCE",
    badgeBg: "from-amber-700/15 via-orange-800/15 to-amber-900/15",
    badgeText: "text-amber-800 dark:text-amber-400",
    borderColor: "border-amber-700/30 dark:border-amber-800/30",
    accentColor: "#B45309",
    descripcion: "Compañías y proveedores de soluciones especializadas para el sector productivo.",
    orden: 5,
  },
  pyme: {
    id: "pyme",
    titulo: "SPONSOR PYME",
    badgeBg: "from-purple-500/15 via-indigo-500/15 to-purple-600/15",
    badgeText: "text-[#7209B7] dark:text-[#A881FC]",
    borderColor: "border-purple-500/30 dark:border-purple-500/30",
    accentColor: "#7209B7",
    descripcion: "Pequeñas y medianas empresas regionales que impulsan el crecimiento sostenible.",
    orden: 6,
  },
  media_partner: {
    id: "media_partner",
    titulo: "MEDIA PARTNER",
    badgeBg: "from-emerald-500/15 via-teal-500/15 to-emerald-600/15",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-500/30 dark:border-emerald-500/30",
    accentColor: "#10B981",
    descripcion: "Medios de comunicación y difusión estratégica oficiales del evento.",
    orden: 7,
  },
};
