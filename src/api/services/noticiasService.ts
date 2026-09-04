import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { NOTICIAS } from "../../data/noticias.data";
import { Noticia } from "../../types/domain.types";
import { ApiResponse } from "../../types/api.types";

export const noticiasService = {
  async getNoticias(tag?: string): Promise<ApiResponse<Noticia[]>> {
    const params: Record<string, string> = {};
    if (tag && tag !== "Todos") params.tag = tag;

    const response = await apiClient.get<Noticia[]>(ENDPOINTS.NOTICIAS.LIST, { params });
    if (response.success && response.data) {
      return response;
    }

    let data = NOTICIAS;
    if (tag && tag !== "Todos") {
      data = data.filter((n) => n.tag === tag);
    }

    return {
      success: true,
      data,
      statusCode: 200,
    };
  },
};
