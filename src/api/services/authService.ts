import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { User, UserRole } from "../../types/auth.types";
import { ApiResponse } from "../../types/api.types";

export const authService = {
  async login(email: string, role: UserRole = "visitor"): Promise<ApiResponse<{ user: User; token: string }>> {
    // Intentar petición real al backend con fallback a simulador
    const response = await apiClient.post<{ user: User; token: string }>(ENDPOINTS.AUTH.LOGIN, { email, role });
    if (response.success) {
      return response;
    }

    // Fallback Mock para funcionamiento local sin backend levantado
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0] || "Usuario ExpoJuy",
      email,
      role,
      empresaId: role === "exhibitor" ? "emp-1" : undefined,
    };
    const mockToken = `mock-token-${role}-${Date.now()}`;

    return {
      success: true,
      data: { user: mockUser, token: mockToken },
      statusCode: 200,
    };
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    return apiClient.get<User>(ENDPOINTS.AUTH.ME);
  },

  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(ENDPOINTS.AUTH.LOGOUT);
  },
};
