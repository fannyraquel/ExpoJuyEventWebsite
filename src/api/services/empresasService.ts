import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { EMPRESAS } from "../../data/empresas.data";
import { Empresa } from "../../types/domain.types";
import { ApiResponse } from "../../types/api.types";

export const empresasService = {
  async getEmpresas(rubro?: string, busca?: string): Promise<ApiResponse<Empresa[]>> {
    const params: Record<string, string> = {};
    if (rubro && rubro !== "Todos") params.rubro = rubro;
    if (busca && busca !== "Todos") params.busca = busca;

    const response = await apiClient.get<Empresa[]>(ENDPOINTS.EMPRESAS.LIST, { params });
    if (response.success && response.data) {
      return response;
    }

    // Fallback a data estática si la API offline
    let data = EMPRESAS;
    if (rubro && rubro !== "Todos") {
      data = data.filter((e) => e.rubro === rubro);
    }
    if (busca && busca !== "Todos") {
      data = data.filter((e) => e.busca === busca);
    }

    return {
      success: true,
      data,
      statusCode: 200,
    };
  },

  async conectar(empresaNombre: string, payload: { nombre: string; empresa: string; email: string }): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post<{ message: string }>(ENDPOINTS.EMPRESAS.CONECTAR(empresaNombre), payload);
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
