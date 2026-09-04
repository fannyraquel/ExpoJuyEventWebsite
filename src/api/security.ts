import { API_CONFIG } from "../config/api.config";

/**
 * Genera un Hash SHA-256 en formato Hexadecimal usando la API nativa Web Crypto.
 */
export async function generateSHA256Hash(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Genera una firma de transacción segura SHA-256 concatenando Método, URL, Timestamp, Body y SecretKey.
 */
export async function generateTransactionSignature(
  method: string,
  url: string,
  bodyStr: string,
  timestamp: string
): Promise<{ signature: string; payloadHash: string }> {
  const secretKey = API_CONFIG.security.secretKey;
  const payloadHash = await generateSHA256Hash(bodyStr || "");
  const dataToSign = `${method.toUpperCase()}:${url}:${timestamp}:${payloadHash}:${secretKey}`;
  const signature = await generateSHA256Hash(dataToSign);

  return { signature, payloadHash };
}
