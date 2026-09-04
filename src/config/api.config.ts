const { VITE_API_BASE_URL, VITE_API_TIMEOUT, VITE_ENABLE_SHA256_SIGNATURE, VITE_API_SECRET_KEY } = import.meta.env;

export const API_CONFIG = {
  baseUrl: (VITE_API_BASE_URL as string) || "https://api.expojuy.gob.ar/v1",
  timeout: Number(VITE_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  tokenStorageKey: "expojuy_auth_token",
  userStorageKey: "expojuy_user_session",
  security: {
    enableSHA256Signature: VITE_ENABLE_SHA256_SIGNATURE !== "false",
    signatureHeader: "X-Payload-Signature",
    hashHeader: "X-Payload-Hash",
    timestampHeader: "X-Request-Timestamp",
    secretKey: (VITE_API_SECRET_KEY as string) || "expojuy_sha256_secure_key_2026",
  },
};
