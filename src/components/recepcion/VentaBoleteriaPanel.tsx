import React, { useState, FormEvent } from "react";
import FormInput from "../../forms/common/FormInput";
import FormSelect from "../../forms/common/FormSelect";
import { acreditacionesService } from "../../api/services/acreditacionesService";
import { AcreditacionRecord } from "../../types/acreditacion.types";

interface VentaBoleteriaPanelProps {
  onAcreditacionGenerada?: (record: AcreditacionRecord) => void;
}

export default function VentaBoleteriaPanel({ onAcreditacionGenerada }: VentaBoleteriaPanelProps) {
  const [formData, setFormData] = useState({
    documento: "",
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    esEmpresario: false,
    empresa: "",
    cargo: "",
    rubro: "Público General",
    metodoPago: "efectivo",
    monto: "$ 5.000,00 ARS",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emitida, setEmitida] = useState<AcreditacionRecord | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.documento.trim()) newErrors.documento = "Requerido";
    if (!formData.nombre.trim()) newErrors.nombre = "Requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "Requerido";
    if (formData.esEmpresario && !formData.empresa.trim()) {
      newErrors.empresa = "Nombre de empresa requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Crear la acreditación
    const creada = acreditacionesService.create({
      documento: formData.documento,
      nombre: formData.nombre,
      apellido: formData.apellido,
      esEmpresario: formData.esEmpresario,
      empresa: formData.esEmpresario ? formData.empresa : "Particular",
      cargo: formData.esEmpresario ? formData.cargo : "Visitante Particular",
      pais: "Argentina",
      codigoPais: "+54",
      codigoArea: "388",
      celular: formData.celular || "Sin Celular",
      paisResidencia: "Argentina",
      provincia: "Jujuy",
      localidad: "San Salvador de Jujuy",
      email: formData.email || `${formData.documento}@boleteria.expojuy.gob.ar`,
      rubro: formData.rubro,
      aceptaNovedades: true,
      monto: formData.monto,
      numeroTransaccion: `TAQUILLA-${formData.metodoPago.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      comprobanteNombre: `ticket_pago_${formData.metodoPago}.pdf`,
      comprobanteUrl: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='100%25' height='100%25' fill='%2310B981'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-size='16' font-family='sans-serif' font-weight='bold'%3ECOBRO EN BOLETERÍA %245.000%3C/text%3E%3C/svg%3E",
    });

    // Aprobar inmediatamente por cobro presencial en taquilla
    const aprobada = acreditacionesService.updateEstado(creada.id, "aprobada", "recepcion_boleteria@expojuy.gob.ar");
    // Marcar como ingresado en taquilla
    const ingresado = acreditacionesService.marcarIngreso(creada.id) || aprobada || creada;

    setEmitida(ingresado);
    if (onAcreditacionGenerada) {
      onAcreditacionGenerada(ingresado);
    }
  };

  const handleNuevaVenta = () => {
    setFormData({
      documento: "",
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
      esEmpresario: false,
      empresa: "",
      cargo: "",
      rubro: "Público General",
      metodoPago: "efectivo",
      monto: "$ 5.000,00 ARS",
    });
    setErrors({});
    setEmitida(null);
  };

  return (
    <div className="space-y-6">
      {emitida ? (
        /* VOUCHER / PASE EMITIDO CON ÉXITO */
        <div className="space-y-6 text-center animate-fade-in">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-3xl">
            ✓
          </div>

          <div>
            <span className="inline-block rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-1 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-widest mb-1">
              ✓ COBRO PRESENCIAL &amp; EMISIÓN DE PASE COMPLETA
            </span>
            <h3 className="text-2xl font-black text-[var(--t-text)] font-display">
              Entrada Emitida con Éxito
            </h3>
            <p className="text-xs text-[var(--t-text-muted)] mt-1">
              El visitante ha sido acreditado e ingresado al sistema de molinetes.
            </p>
          </div>

          {/* TARJETA PASE GENERADA */}
          <div className="mx-auto max-w-md rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#7209B7]/10 via-[var(--t-surface)] to-emerald-500/10 p-6 shadow-2xl backdrop-blur-xl text-left relative">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/15 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1DBECB]">
                  BOLETERÍA • ENTRADA OFICIAL
                </span>
                <div className="text-xs font-mono font-bold text-[var(--t-text)] mt-0.5">
                  {emitida.codigoUnico}
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">
                COBRADO
              </span>
            </div>

            <div className="my-5 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Visitante</span>
                <span className="font-extrabold text-[var(--t-text)] text-sm">
                  {emitida.nombre} {emitida.apellido}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Documento</span>
                <span className="font-bold text-[var(--t-text)]">{emitida.documento}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Perfil</span>
                <span className="font-semibold text-[var(--t-text)]">
                  {emitida.esEmpresario ? `💼 ${emitida.empresa}` : "👤 Particular"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Monto Cobrado</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {emitida.monto} ({formData.metodoPago.toUpperCase()})
                </span>
              </div>
            </div>

            {/* CÓDIGO QR HABILITADO */}
            <div className="flex items-center gap-4 rounded-xl border border-emerald-500/40 bg-white/80 dark:bg-black/50 p-3">
              <div className="h-16 w-16 shrink-0 rounded-lg bg-slate-900 dark:bg-white p-1.5 flex flex-wrap gap-1 justify-center items-center shadow-md">
                <div className="w-5 h-5 bg-white dark:bg-slate-900 rounded-xs" />
                <div className="w-5 h-5 bg-[#7209B7] rounded-xs" />
                <div className="w-5 h-5 bg-[#1DBECB] rounded-xs" />
                <div className="w-5 h-5 bg-white dark:bg-slate-900 rounded-xs" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  Pase Habilitado para Molinete
                </div>
                <div className="text-[10px] text-[var(--t-text-muted)] leading-tight mt-0.5">
                  Escaneá este código en la entrada o entregá el comprobante impreso.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-6 py-3 text-xs font-bold text-white shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              🖨 Imprimir Ticket / Pase PDF
            </button>
            <button
              type="button"
              onClick={handleNuevaVenta}
              className="w-full sm:w-auto rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-6 py-3 text-xs font-bold text-[var(--t-text)] hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
            >
              🎟 Registrar Otra Venta
            </button>
          </div>
        </div>
      ) : (
        /* FORMULARIO DE COBRO Y EMISIÓN EN BOLETERÍA */
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormInput
              label="Documento / DNI"
              required
              value={formData.documento}
              onChange={(e) => handleChange("documento", e.target.value)}
              placeholder="DNI / Pasaporte"
              error={errors.documento}
            />
            <FormInput
              label="Nombre"
              required
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Nombre del visitante"
              error={errors.nombre}
            />
            <FormInput
              label="Apellido"
              required
              value={formData.apellido}
              onChange={(e) => handleChange("apellido", e.target.value)}
              placeholder="Apellido del visitante"
              error={errors.apellido}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Correo electrónico (Opcional)"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Para envío de comprobante PDF..."
            />
            <FormInput
              label="Celular / Teléfono (Opcional)"
              value={formData.celular}
              onChange={(e) => handleChange("celular", e.target.value)}
              placeholder="Número de celular..."
            />
          </div>

          {/* INTERRUPTOR: EMPRESARIO / INSTITUCIONAL */}
          <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-white/40 dark:bg-black/30 p-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-[var(--t-text)] flex items-center gap-2">
                  <span>💼</span>
                  <span>¿Es una Entrada Empresarial / Institucional?</span>
                </div>
                <p className="text-[11px] text-[var(--t-text-muted)] font-medium">
                  {formData.esEmpresario ? "Perfil Empresarial / Organización" : "Perfil Visitante Particular"}
                </p>
              </div>

              <div className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={formData.esEmpresario}
                  onChange={(e) => handleChange("esEmpresario", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7209B7]"></div>
              </div>
            </label>

            {formData.esEmpresario && (
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
                <FormInput
                  label="Nombre de la Empresa"
                  required={formData.esEmpresario}
                  value={formData.empresa}
                  onChange={(e) => handleChange("empresa", e.target.value)}
                  placeholder="Empresa / Organización"
                  error={errors.empresa}
                />
                <FormInput
                  label="Cargo / Ocupación"
                  value={formData.cargo}
                  onChange={(e) => handleChange("cargo", e.target.value)}
                  placeholder="Cargo..."
                />
              </div>
            )}
          </div>

          {/* MÉTODO DE PAGO Y COBRO EN TAQUILLA */}
          <div className="rounded-2xl border border-[#1DBECB]/30 bg-[#1DBECB]/5 p-5 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#0e8a95] dark:text-[#1DBECB]">
              Cobro y Método de Pago en Taquilla
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.metodoPago === "efectivo"
                    ? "border-[#1DBECB] bg-[#1DBECB]/20 font-bold"
                    : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20"
                }`}
              >
                <input
                  type="radio"
                  name="metodoPago"
                  value="efectivo"
                  checked={formData.metodoPago === "efectivo"}
                  onChange={() => handleChange("metodoPago", "efectivo")}
                  className="sr-only"
                />
                <span className="text-xl">💵</span>
                <div>
                  <span className="text-xs font-bold block text-[var(--t-text)]">Efectivo</span>
                  <span className="text-[10px] text-[var(--t-text-muted)]">Cobro directo</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.metodoPago === "tarjeta"
                    ? "border-[#1DBECB] bg-[#1DBECB]/20 font-bold"
                    : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20"
                }`}
              >
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  checked={formData.metodoPago === "tarjeta"}
                  onChange={() => handleChange("metodoPago", "tarjeta")}
                  className="sr-only"
                />
                <span className="text-xl">💳</span>
                <div>
                  <span className="text-xs font-bold block text-[var(--t-text)]">POSNET / Tarjeta</span>
                  <span className="text-[10px] text-[var(--t-text-muted)]">Débito / Crédito</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.metodoPago === "mercadopago"
                    ? "border-[#1DBECB] bg-[#1DBECB]/20 font-bold"
                    : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20"
                }`}
              >
                <input
                  type="radio"
                  name="metodoPago"
                  value="mercadopago"
                  checked={formData.metodoPago === "mercadopago"}
                  onChange={() => handleChange("metodoPago", "mercadopago")}
                  className="sr-only"
                />
                <span className="text-xl">📱</span>
                <div>
                  <span className="text-xs font-bold block text-[var(--t-text)]">Mercado Pago</span>
                  <span className="text-[10px] text-[var(--t-text-muted)]">QR Presencial</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <span>🎟 EMITIR ENTRADA &amp; ACREDITAR INGRESO</span>
              <span>→</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
