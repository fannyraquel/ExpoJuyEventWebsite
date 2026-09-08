import { AcreditacionRecord, AcreditacionEstado } from "../../types/acreditacion.types";

const STORAGE_KEY = "expojuy_acreditaciones_v1";

const INITIAL_MOCK_ACREDITACIONES: AcreditacionRecord[] = [
  {
    id: "ACR-948201",
    codigoUnico: "EXPOJUY-2026-QR-948201",
    documento: "44706400",
    nombre: "Samuel",
    apellido: "Paredes",
    empresa: "Paredes Tech & Servicios",
    cargo: "Director de Operaciones",
    pais: "Argentina",
    codigoPais: "+54",
    codigoArea: "388",
    celular: "154123456",
    paisResidencia: "Argentina",
    provincia: "Jujuy",
    localidad: "San Salvador de Jujuy",
    email: "samueleliasparedes.10@gmail.com",
    rubro: "Tecnología & Software",
    aceptaNovedades: true,
    monto: "$ 5.000,00 ARS",
    numeroTransaccion: "TRX-884920491",
    comprobanteNombre: "comprobante_macro_samuel.png",
    comprobanteUrl: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='100%25' height='100%25' fill='%231C1534'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' fill='%231DBECB' font-size='16' font-family='sans-serif' font-weight='bold'%3ECOMPROBANTE BANCO MACRO%3E%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-size='12' font-family='sans-serif'%3EMonto: %245.000,00 ARS | TRX: 884920491%3E%3C/text%3E%3C/svg%3E",
    fechaSolicitud: "2026-09-08T18:00:00.000Z",
    estado: "pendiente",
  },
  {
    id: "ACR-731049",
    codigoUnico: "EXPOJUY-2026-QR-731049",
    documento: "38920194",
    nombre: "Carolina",
    apellido: "Mendoza",
    empresa: "Litio Jujuy S.A.",
    cargo: "Ingeniera de Procesos",
    pais: "Argentina",
    codigoPais: "+54",
    codigoArea: "388",
    celular: "155987654",
    paisResidencia: "Argentina",
    provincia: "Jujuy",
    localidad: "Palpalá",
    email: "carolina.mendoza@litiojujuy.com",
    rubro: "Minería & Litio",
    aceptaNovedades: true,
    monto: "$ 5.000,00 ARS",
    numeroTransaccion: "MP-9940182",
    comprobanteNombre: "transferencia_mercado_pago.jpg",
    comprobanteUrl: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='100%25' height='100%25' fill='%237209B7'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-size='16' font-family='sans-serif' font-weight='bold'%3EMERCADO PAGO - TRANSFERENCIA%3E%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%231DBECB' font-size='12' font-family='sans-serif'%3EAprobado %245.000,00 | Ref: MP-9940182%3E%3C/text%3E%3C/svg%3E",
    fechaSolicitud: "2026-09-08T15:30:00.000Z",
    fechaRevision: "2026-09-08T16:00:00.000Z",
    revisadoPor: "admin@expojuy.gob.ar",
    estado: "aprobada",
  },
];

class AcreditacionesService {
  private getStored(): AcreditacionRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ACREDITACIONES));
        return INITIAL_MOCK_ACREDITACIONES;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_MOCK_ACREDITACIONES;
    }
  }

  private save(records: AcreditacionRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (err) {
      console.error("Error al guardar acreditaciones en localStorage", err);
    }
  }

  public getAll(): AcreditacionRecord[] {
    return this.getStored();
  }

  public getById(id: string): AcreditacionRecord | undefined {
    return this.getStored().find((r) => r.id === id);
  }

  public getByDocumento(doc: string): AcreditacionRecord | undefined {
    return this.getStored().find((r) => r.documento.trim() === doc.trim());
  }

  public create(
    data: Omit<AcreditacionRecord, "id" | "codigoUnico" | "fechaSolicitud" | "estado">
  ): AcreditacionRecord {
    const list = this.getStored();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newRecord: AcreditacionRecord = {
      ...data,
      id: `ACR-${randomNum}`,
      codigoUnico: `EXPOJUY-2026-QR-${randomNum}`,
      fechaSolicitud: new Date().toISOString(),
      estado: "pendiente",
    };

    list.unshift(newRecord);
    this.save(list);
    return newRecord;
  }

  public getByCodigoStrict(query: string): AcreditacionRecord | undefined {
    const clean = query.trim().toUpperCase();
    if (!clean) return undefined;
    return this.getStored().find(
      (r) =>
        r.codigoUnico.toUpperCase() === clean ||
        r.id.toUpperCase() === clean
    );
  }

  public marcarIngreso(id: string): AcreditacionRecord | null {
    const list = this.getStored();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ingresado: true,
      fechaIngreso: new Date().toISOString(),
    };

    this.save(list);
    return list[index];
  }

  public updateEstado(
    id: string,
    nuevoEstado: AcreditacionEstado,
    revisadoPor: string = "admin@expojuy.gob.ar",
    motivoRechazo?: string
  ): AcreditacionRecord | null {
    const list = this.getStored();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      estado: nuevoEstado,
      fechaRevision: new Date().toISOString(),
      revisadoPor,
      motivoRechazo: motivoRechazo || list[index].motivoRechazo,
    };

    this.save(list);
    return list[index];
  }

  public resetMock(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ACREDITACIONES));
  }
}

export const acreditacionesService = new AcreditacionesService();
