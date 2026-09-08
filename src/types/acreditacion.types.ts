export type AcreditacionEstado = "pendiente" | "aprobada" | "rechazada";

export interface AcreditacionRecord {
  id: string; // ID único ej: "ACR-849201"
  codigoUnico: string; // Código QR ej: "EXPOJUY-2026-QR-984210"
  documento: string;
  nombre: string;
  apellido: string;
  empresa: string;
  cargo: string;
  pais: string;
  codigoPais: string;
  codigoArea: string;
  celular: string;
  paisResidencia: string;
  provincia: string;
  localidad: string;
  email: string;
  rubro: string;
  aceptaNovedades: boolean;
  esEmpresario?: boolean;
  
  // Datos de Validación y Pago
  monto: string;
  numeroTransaccion?: string;
  comprobanteNombre?: string;
  comprobanteUrl?: string; // Data URL Base64 o URL del archivo cargado
  fechaSolicitud: string;
  fechaRevision?: string;
  revisadoPor?: string;
  motivoRechazo?: string;
  
  estado: AcreditacionEstado;
  ingresado?: boolean;
  fechaIngreso?: string;
}
