export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
  },
  EMPRESAS: {
    LIST: "/empresas",
    DETAIL: (id: string) => `/empresas/${id}`,
    CONECTAR: (id: string) => `/empresas/${id}/conectar`,
  },
  AGENDA: {
    LIST: "/agenda",
    DETAIL: (id: string) => `/agenda/${id}`,
    MI_AGENDA: "/agenda/mi-agenda",
  },
  STANDS: {
    LIST: "/stands",
    DETAIL: (id: string) => `/stands/${id}`,
    RESERVAR: (id: string) => `/stands/${id}/reserva`,
  },
  NOTICIAS: {
    LIST: "/noticias",
    DETAIL: (id: string) => `/noticias/${id}`,
  },
  INDICADORES: {
    GET_ALL: "/indicadores",
  },
};
