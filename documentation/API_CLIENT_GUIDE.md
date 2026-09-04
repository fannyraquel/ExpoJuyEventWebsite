# Guía del Cliente de API Backend

## 📡 Arquitectura de Conexión

Toda la comunicación con el servidor backend REST v1 se realiza a través de la instancia singleton de `apiClient` definida en `src/api/client.ts`.

### Características clave:
1. **Configuración dinámica de BaseURL**: Lee automáticamente `import.meta.env.VITE_API_BASE_URL` o usa por defecto `https://api.expojuy.gob.ar/v1`.
2. **Inyección de Tokens**: Extrae el Bearer token guardado en la sesión activa y lo agrega a las cabeceras `Authorization: Bearer <token>`.
3. **Capa de Seguridad SHA-256**: Genera automáticamente checksums e inmunidad contra alteración de datos (*HMAC/SHA-256 Request Signatures*).
4. **Manejo uniforme de errores**: Devuelve siempre una estructura `ApiResponse<T>` estandarizada.

---

## 🔒 Capa de Seguridad y Firma de Transacciones (SHA-256)

Para proteger la integridad de las transacciones contra manipulación (Man-In-The-Middle / Tampering), la capa de red implementa un algoritmo criptográfico **SHA-256** utilizando la API nativa **Web Crypto** (`crypto.subtle.digest`).

### Cabeceras HTTP Criptográficas inyectadas:

- **`X-Request-Timestamp`**: Marca de tiempo UTC en milisegundos (`Date.now()`).
- **`X-Payload-Hash`**: Hash SHA-256 en formato Hexadecimal del cuerpo de la petición (`JSON.stringify(body)`).
- **`X-Payload-Signature`**: Firma de la transacción generada concatenando:
  ```text
  METODO:URL:TIMESTAMP:PAYLOAD_HASH:SECRET_KEY
  ```
  y aplicando la función HASH `SHA-256`.

### Configuración en `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  // ...
  security: {
    enableSHA256Signature: true,
    signatureHeader: "X-Payload-Signature",
    hashHeader: "X-Payload-Hash",
    timestampHeader: "X-Request-Timestamp",
    secretKey: (import.meta.env.VITE_API_SECRET_KEY as string) || "expojuy_sha256_secure_key_2026",
  },
};
```

---

## 💻 Ejemplo de Creación de un Servicio API

```typescript
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import { Noticia } from "../../types/domain.types";
import { ApiResponse } from "../../types/api.types";

export const noticiasService = {
  async getNoticias(tag?: string): Promise<ApiResponse<Noticia[]>> {
    return apiClient.get<Noticia[]>(ENDPOINTS.NOTICIAS.LIST, {
      params: tag ? { tag } : undefined,
    });
  },
};
```
