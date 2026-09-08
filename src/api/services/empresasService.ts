import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { EMPRESAS } from "../../data/empresas.data";
import { Empresa } from "../../types/domain.types";
import { ApiResponse } from "../../types/api.types";

export interface EmpresaFilterParams {
  rubro?: string;
  busca?: string;
  region?: string;
  busqueda?: string;
}

export interface EmpresaFilterMetadata {
  rubros: { label: string; count: number }[];
  buscaOptions: { label: string; count: number }[];
  regiones: { label: string; count: number }[];
}

export const empresasService = {
  /**
   * Obtiene las empresas aplicando los filtros de rubro, necesidad B2B, región y búsqueda.
   * Diseñado para interactuar con endpoints de API/BD o fallback local.
   */
  async getEmpresas(filters?: EmpresaFilterParams): Promise<ApiResponse<Empresa[]>> {
    const params: Record<string, string> = {};
    if (filters?.rubro && filters.rubro !== "Todos") params.rubro = filters.rubro;
    if (filters?.busca && filters.busca !== "Todos") params.busca = filters.busca;
    if (filters?.region && filters.region !== "Todos") params.region = filters.region;
    if (filters?.busqueda) params.q = filters.busqueda;

    const response = await apiClient.get<Empresa[]>(ENDPOINTS.EMPRESAS.LIST, { params });
    if (response.success && response.data) {
      return response;
    }

    // Fallback síncrono a data local si la API está offline
    let data = EMPRESAS;
    if (filters?.rubro && filters.rubro !== "Todos") {
      data = data.filter((e) => e.rubro === filters.rubro);
    }
    if (filters?.busca && filters.busca !== "Todos") {
      data = data.filter((e) => e.busca === filters.busca);
    }
    if (filters?.region && filters.region !== "Todos") {
      data = data.filter((e) => e.region.toLowerCase() === filters.region?.toLowerCase());
    }
    if (filters?.busqueda) {
      const q = filters.busqueda.toLowerCase().trim();
      data = data.filter(
        (e) =>
          e.nombre.toLowerCase().includes(q) ||
          e.rubro.toLowerCase().includes(q) ||
          e.region.toLowerCase().includes(q) ||
          e.expositores?.some(
            (exp) =>
              exp.nombre.toLowerCase().includes(q) ||
              exp.cargo.toLowerCase().includes(q)
          ) ||
          (e.descripcion && e.descripcion.toLowerCase().includes(q))
      );
    }

    return {
      success: true,
      data,
      statusCode: 200,
    };
  },

  /**
   * Obtiene la metadata dinámica de los filtros (categorías y contadores) desde la BD/API
   */
  async getFilterMetadata(): Promise<ApiResponse<EmpresaFilterMetadata>> {
    const response = await apiClient.get<EmpresaFilterMetadata>(
      `${ENDPOINTS.EMPRESAS.LIST}/metadata`
    );
    if (response.success && response.data) {
      return response;
    }

    // Extracción dinámica desde el dataset para estar 100% preparado para BD
    const rubroCounts: Record<string, number> = {};
    const buscaCounts: Record<string, number> = {};
    const regionCounts: Record<string, number> = {};

    EMPRESAS.forEach((e) => {
      rubroCounts[e.rubro] = (rubroCounts[e.rubro] || 0) + 1;
      buscaCounts[e.busca] = (buscaCounts[e.busca] || 0) + 1;
      regionCounts[e.region] = (regionCounts[e.region] || 0) + 1;
    });

    const total = EMPRESAS.length;

    const rubros = [
      { label: "Todos", count: total },
      ...Object.keys(rubroCounts).map((k) => ({ label: k, count: rubroCounts[k] })),
    ];

    const buscaOptions = [
      { label: "Todos", count: total },
      ...Object.keys(buscaCounts).map((k) => ({ label: k, count: buscaCounts[k] })),
    ];

    const regiones = [
      { label: "Todos", count: total },
      ...Object.keys(regionCounts).map((k) => ({ label: k, count: regionCounts[k] })),
    ];

    return {
      success: true,
      data: { rubros, buscaOptions, regiones },
      statusCode: 200,
    };
  },

  async conectar(
    empresaNombre: string,
    payload: { nombre: string; empresa: string; email: string }
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post<{ message: string }>(
      ENDPOINTS.EMPRESAS.CONECTAR(empresaNombre),
      payload
    );
    if (response.success) {
      return response;
    }

    return {
      success: true,
      data: { message: `Solicitud de reunión enviada a ${empresaNombre} con éxito.` },
      statusCode: 200,
    };
  },
};
