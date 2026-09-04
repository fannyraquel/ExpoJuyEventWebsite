import { API_CONFIG } from "../config/api.config";
import { ApiError, ApiResponse, HttpMethod, RequestOptions } from "../types/api.types";
import { generateTransactionSignature } from "./security";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  private getToken(): string | null {
    return localStorage.getItem(API_CONFIG.tokenStorageKey);
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(
      endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  public async request<T = unknown>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const token = options.token || this.getToken();
    const headers: Record<string, string> = {
      ...API_CONFIG.headers,
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const bodyStr = body && method !== "GET" ? JSON.stringify(body) : "";

    // Capa de seguridad SHA-256 para integridad de la transacción
    if (API_CONFIG.security.enableSHA256Signature) {
      const timestamp = Date.now().toString();
      const url = this.buildUrl(endpoint, options.params);
      const { signature, payloadHash } = await generateTransactionSignature(method, url, bodyStr, timestamp);

      headers[API_CONFIG.security.timestampHeader] = timestamp;
      headers[API_CONFIG.security.hashHeader] = payloadHash;
      headers[API_CONFIG.security.signatureHeader] = signature;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (bodyStr) {
      config.body = bodyStr;
    }

    try {
      const url = this.buildUrl(endpoint, options.params);
      const response = await fetch(url, config);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || `Error en la petición: ${response.statusText}`,
          statusCode: response.status,
          errors: data.errors,
        };
        throw error;
      }

      return {
        success: true,
        data: data as T,
        statusCode: response.status,
      };
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      return {
        success: false,
        data: null as unknown as T,
        message: apiErr.message || "Error de red o conexión con el servidor",
        statusCode: apiErr.statusCode || 500,
        errors: apiErr.errors || [String(err)],
      };
    }
  }

  public get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  public post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, body, options);
  }

  public put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", endpoint, body, options);
  }

  public patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", endpoint, body, options);
  }

  public delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }
}

export const apiClient = new ApiClient();
