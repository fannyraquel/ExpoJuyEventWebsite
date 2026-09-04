import { AgendaDay, AgendaEvent } from "../types/domain.types";

export const AGENDA: Record<AgendaDay, AgendaEvent[]> = {
  1: [
    { hora: "09:00", titulo: "Apertura oficial ExpoJuy 2026", rubro: "Institucional", lugar: "Escenario Central", status: "finalizado", idioma: "ES" },
    { hora: "10:30", titulo: "Corredor Bioceánico: oportunidades para PYMES", rubro: "Comercio", lugar: "Sala A", status: "finalizado", idioma: "ES" },
    { hora: "13:00", titulo: "Panel: Minería responsable en la Puna", rubro: "Minería", lugar: "Sala B", status: "en vivo", idioma: "ES / EN" },
    { hora: "15:30", titulo: "Ronda de Negocios — Sesión 1", rubro: "Negocios", lugar: "Pabellón RdN", status: "siguiente", idioma: "ES / PT" },
    { hora: "18:00", titulo: "Charla: Turismo regenerativo en Quebrada", rubro: "Turismo", lugar: "Sala C", status: "próximo", idioma: "ES" },
  ],
  2: [
    { hora: "09:30", titulo: "Taller: Exportaciones agro desde Valles", rubro: "Agroindustria", lugar: "Sala A", status: "próximo", idioma: "ES" },
    { hora: "11:00", titulo: "Foro Internacional Litio & Baterías", rubro: "Minería", lugar: "Escenario Central", status: "próximo", idioma: "ES / EN / FR" },
    { hora: "14:00", titulo: "Ronda de Negocios — Sesión 2", rubro: "Negocios", lugar: "Pabellón RdN", status: "próximo", idioma: "ES / PT" },
    { hora: "16:30", titulo: "Presentación: Yungas y biodiversidad productiva", rubro: "Turismo", lugar: "Sala B", status: "próximo", idioma: "ES" },
  ],
  3: [
    { hora: "09:00", titulo: "Taller: Financiamiento para exportadores", rubro: "Finanzas", lugar: "Sala C", status: "próximo", idioma: "ES" },
    { hora: "11:30", titulo: "Cumbre de Municipios Productivos", rubro: "Institucional", lugar: "Escenario Central", status: "próximo", idioma: "ES" },
    { hora: "14:30", titulo: "Ronda de Negocios — Sesión 3", rubro: "Negocios", lugar: "Pabellón RdN", status: "próximo", idioma: "ES / PT / EN" },
    { hora: "17:00", titulo: "Arte y Cultura Jujuy: aguayo, cerámica, folklore", rubro: "Cultura", lugar: "Plaza Andina", status: "próximo", idioma: "ES" },
  ],
  4: [
    { hora: "10:00", titulo: "Clausura y entrega de reconocimientos", rubro: "Institucional", lugar: "Escenario Central", status: "próximo", idioma: "ES" },
    { hora: "12:00", titulo: "Presentación ExpoJuy DATA 2026", rubro: "Datos", lugar: "Sala A", status: "próximo", idioma: "ES / EN" },
    { hora: "15:00", titulo: "Cierre: Muestra gastronómica Jujuy", rubro: "Cultura", lugar: "Plaza Andina", status: "próximo", idioma: "ES" },
  ],
};
