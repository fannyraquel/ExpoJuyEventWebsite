import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { STANDS } from "../../data/stands.data";
import { Stand } from "../../types/domain.types";
import { ApiResponse } from "../../types/api.types";

export const standsService = {
  async getStands(): Promise<ApiResponse<Stand[]>> {
    const response = await apiClient.get<Stand[]>(ENDPOINTS.STANDS.LIST);
    if (response.success && response.data) {
      return response;
    }

    return {
      success: true,
      data: STANDS,
      statusCode: 200,
    };
  },
};
