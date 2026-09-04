export type Section =
  | "inicio"
  | "sobre"
  | "explorar"
  | "agenda"
  | "negocios"
  | "plano"
  | "bioceánico"
  | "descubrí"
  | "data"
  | "noticias"
  | "admin"
  | "login";

export type Region = "puna" | "quebrada" | "valles" | "yungas";
export type AgendaDay = 1 | 2 | 3 | 4;

export type EventStatus =
  | "próximo"
  | "siguiente"
  | "en vivo"
  | "finalizado"
  | "retrasado"
  | "cancelado";

export interface Noticia {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  date: string;
  img: string;
  excerpt: string;
}

export interface AgendaEvent {
  hora: string;
  titulo: string;
  rubro: string;
  lugar: string;
  status: EventStatus;
  idioma: string;
}

export interface Empresa {
  id?: string;
  nombre: string;
  rubro: string;
  region: string;
  busca: string;
  pais: string;
}

export interface RegionDetail {
  nombre: string;
  subtitulo: string;
  color: string;
  bg: string;
  municipios: string[];
  productos: string[];
  turismo: string;
  cultura: string;
  img: string;
}

export interface DataIndicator {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export interface Stand {
  id: string;
  empresa: string;
  categoria: string;
  x: number;
  y: number;
  w: number;
  h: number;
  open: boolean;
}

export interface LayerPoint {
  x: number;
  y: number;
  label: string;
  detail: string;
}

export interface LayerInfo {
  color: string;
  description: string;
  points: LayerPoint[];
}
