import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { AGENDA } from "../../data/agenda.data";
import { AgendaDay, AgendaEvent } from "../../types/domain.types";
import { ApiResponse } from "../../types/api.types";

export const agendaService = {
  async getAgendaByDay(day: AgendaDay): Promise<ApiResponse<AgendaEvent[]>> {
    const response = await apiClient.get<AgendaEvent[]>(ENDPOINTS.AGENDA.LIST, {
      params: { day },
    });
    if (response.success && response.data) {
      return response;
    }

    return {
      success: true,
      data: AGENDA[day] || [],
      statusCode: 200,
    };
  },
};
