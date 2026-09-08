import React, { useState, useEffect } from "react";
import { AcreditacionRecord, AcreditacionEstado } from "../../types/acreditacion.types";
import { acreditacionesService } from "../../api/services/acreditacionesService";

export default function GestionAcreditacionesPanel() {
  const [acreditaciones, setAcreditaciones] = useState<AcreditacionRecord[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<AcreditacionEstado | "todas">("todas");
  const [busqueda, setBusqueda] = useState<string>("");
  const [comprobanteSeleccionado, setComprobanteSeleccionado] = useState<AcreditacionRecord | null>(null);
  const [motivoRechazoInput, setMotivoRechazoInput] = useState<string>("");
  const [modalRechazoTarget, setModalRechazoTarget] = useState<AcreditacionRecord | null>(null);
  const [modalEmailEnviadoTarget, setModalEmailEnviadoTarget] = useState<AcreditacionRecord | null>(null);

  const cargarDatos = () => {
    const list = acreditacionesService.getAll();
    setAcreditaciones(list);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAprobar = (id: string) => {
    const actualizado = acreditacionesService.updateEstado(id, "aprobada", "secretaria_pagos@expojuy.gob.ar");
    cargarDatos();
    if (actualizado) {
      setModalEmailEnviadoTarget(actualizado);
    }
  };

  const handleAbrirRechazo = (item: AcreditacionRecord) => {
    setModalRechazoTarget(item);
    setMotivoRechazoInput("");
  };

  const handleConfirmarRechazo = () => {
    if (!modalRechazoTarget) return;
    acreditacionesService.updateEstado(
      modalRechazoTarget.id,
      "rechazada",
      "secretaria_pagos@expojuy.gob.ar",
      motivoRechazoInput || "Comprobante no verificado o pago insuficiente"
    );
    setModalRechazoTarget(null);
    setMotivoRechazoInput("");
    cargarDatos();
  };

  const filtradas = acreditaciones.filter((item) => {
    const coincideEstado = filtroEstado === "todas" ? true : item.estado === filtroEstado;
    const coincideBusqueda =
      !busqueda ||
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.documento.includes(busqueda) ||
      item.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      (item.numeroTransaccion && item.numeroTransaccion.toLowerCase().includes(busqueda.toLowerCase())) ||
      item.id.toLowerCase().includes(busqueda.toLowerCase());

    return coincideEstado && coincideBusqueda;
  });

  const conteos = {
    total: acreditaciones.length,
    pendientes: acreditaciones.filter((a) => a.estado === "pendiente").length,
    aprobadas: acreditaciones.filter((a) => a.estado === "aprobada").length,
    rechazadas: acreditaciones.filter((a) => a.estado === "rechazada").length,
  };

  return (
    <div
      className="rounded-2xl border p-6 shadow-md transition-colors backdrop-blur-md space-y-6"
      style={{
        background: "var(--t-card)",
        borderColor: "var(--t-card-border)",
        color: "var(--t-text)",
      }}
    >
      {/* HEADER DE GESTIÓN DE TESORERÍA Y PAGOS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7209B7]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#7209B7] dark:text-[#A881FC] mb-1">
            <span>🏦</span> SECRETARÍA DE PAGOS &amp; AUDITORÍA
          </div>
          <h2 className="text-2xl font-black font-display tracking-tight text-[var(--t-text)]">
            Validación de Acreditaciones
          </h2>
          <p className="text-xs text-[var(--t-text-muted)] font-medium">
            Verificá los comprobantes de pago de los visitantes, aprobá transferencias y emití automáticamente el correo con el QR oficial.
          </p>
        </div>

        {/* MÉTRICAS RÁPIDAS */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center">
            <span className="block text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">
              Pendientes
            </span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {conteos.pendientes}
            </span>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-center">
            <span className="block text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
              Aprobadas
            </span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {conteos.aprobadas}
            </span>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-4 py-2 text-center">
            <span className="block text-[10px] font-black uppercase text-[var(--t-text-muted)]">
              Total
            </span>
            <span className="text-xl font-black text-[var(--t-text)] font-mono">
              {conteos.total}
            </span>
          </div>
        </div>
      </div>

      {/* CONTROLES DE FILTRO Y BÚSQUEDA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* BOTONES DE FILTRO ESTADO */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(["todas", "pendiente", "aprobada", "rechazada"] as const).map((est) => {
            const isActive = filtroEstado === est;
            const labels: Record<string, string> = {
              todas: "Todas",
              pendiente: "⏳ Pendientes",
              aprobada: "✓ Aprobadas",
              rechazada: "✕ Rechazadas",
            };
            return (
              <button
                key={est}
                type="button"
                onClick={() => setFiltroEstado(est)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#7209B7] text-white shadow-md scale-105"
                    : "bg-[var(--t-surface)] text-[var(--t-text-muted)] hover:bg-[#7209B7]/10 hover:text-[#7209B7]"
                }`}
              >
                {labels[est]}
              </button>
            );
          })}
        </div>

        {/* CAMPO DE BÚSQUEDA */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por Nombre, DNI, Email o TRX..."
            className="w-full rounded-xl border px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#1DBECB]"
            style={{
              background: "var(--t-input-bg)",
              borderColor: "var(--t-input-border)",
              color: "var(--t-text)",
            }}
          />
        </div>
      </div>

      {/* TABLA DE REGISTROS DE ACREDITACIÓN */}
      <div className="overflow-x-auto rounded-xl border border-black/5 dark:border-white/10">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-black/40 text-[10px] font-black uppercase tracking-wider text-[var(--t-text-muted)]">
            <tr>
              <th className="px-4 py-3">Solicitud</th>
              <th className="px-4 py-3">Visitante / DNI</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Monto / N° TRX</th>
              <th className="px-4 py-3">Comprobante</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones de Validación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {filtradas.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-xs text-[var(--t-text-muted)]">
                  No se encontraron acreditaciones que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              filtradas.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-[#7209B7] dark:text-[#A881FC]">
                    {item.id}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-bold text-[var(--t-text)] flex items-center gap-1.5 flex-wrap">
                      <span>{item.nombre} {item.apellido}</span>
                      {item.esEmpresario ? (
                        <span className="rounded-full bg-[#7209B7]/15 text-[#7209B7] dark:text-[#A881FC] border border-[#7209B7]/30 px-2 py-0.5 text-[9px] font-extrabold uppercase">
                          💼 {item.empresa || "Empresario"}
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-200 dark:bg-white/10 text-[var(--t-text-muted)] px-2 py-0.5 text-[9px] font-bold">
                          👤 Particular
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[var(--t-text-muted)] font-mono mt-0.5">
                      DNI: {item.documento} • {item.rubro} {item.cargo && item.cargo !== "Visitante Particular" ? `(${item.cargo})` : ""}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-[11px] text-[var(--t-text)] font-medium">{item.email}</div>
                    <div className="text-[10px] text-[var(--t-text-muted)]">{item.celular}</div>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {item.monto}
                    </div>
                    <div className="text-[10px] text-[var(--t-text-muted)]">
                      TRX: {item.numeroTransaccion || "Sin Ref"}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {item.comprobanteUrl ? (
                      <button
                        type="button"
                        onClick={() => setComprobanteSeleccionado(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#1DBECB]/40 bg-[#1DBECB]/10 px-2.5 py-1 text-[11px] font-extrabold text-[#0e8a95] dark:text-[#1DBECB] hover:bg-[#1DBECB]/20 transition-colors cursor-pointer"
                      >
                        <span>📄 Ver Pago</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-red-400">Sin archivo</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {item.estado === "aprobada" && (
                      <button
                        type="button"
                        onClick={() => setModalEmailEnviadoTarget(item)}
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                        title="Ver comprobante enviado por email"
                      >
                        <span>✓ Aprobada</span>
                        <span className="text-[9px]">📧</span>
                      </button>
                    )}
                    {item.estado === "pendiente" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-extrabold text-amber-600 dark:text-amber-400 border border-amber-500/30 animate-pulse">
                        ⏳ Pendiente
                      </span>
                    )}
                    {item.estado === "rechazada" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-extrabold text-red-500 border border-red-500/30">
                        ✕ Rechazada
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right space-x-1.5">
                    {item.estado !== "aprobada" ? (
                      <button
                        type="button"
                        onClick={() => handleAprobar(item.id)}
                        className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-[11px] font-extrabold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>✓ Validar &amp; Enviar QR</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setModalEmailEnviadoTarget(item)}
                        className="rounded-lg border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 text-[11px] font-extrabold transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>📧 Reenviar Email QR</span>
                      </button>
                    )}

                    {item.estado !== "rechazada" && (
                      <button
                        type="button"
                        onClick={() => handleAbrirRechazo(item)}
                        className="rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 px-2.5 py-1.5 text-[11px] font-extrabold transition-all cursor-pointer"
                      >
                        ✕ Rechazar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PREVISUALIZACIÓN DE COMPROBANTE DE PAGO */}
      {comprobanteSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-xl rounded-3xl border p-6 shadow-2xl space-y-4"
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
              color: "var(--t-text)",
            }}
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
              <div>
                <h3 className="font-display font-bold text-lg">Comprobante de Pago Subido</h3>
                <span className="text-xs text-[var(--t-text-muted)] font-mono">
                  {comprobanteSeleccionado.nombre} {comprobanteSeleccionado.apellido} • TRX: {comprobanteSeleccionado.numeroTransaccion}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setComprobanteSeleccionado(null)}
                className="h-8 w-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* VISTA PREVIA DEL ARCHIVO */}
            <div className="flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/15 bg-slate-900/10 dark:bg-black/40 p-4 min-h-[220px]">
              {comprobanteSeleccionado.comprobanteUrl ? (
                <img
                  src={comprobanteSeleccionado.comprobanteUrl}
                  alt="Comprobante de pago"
                  className="max-h-[350px] w-auto rounded-xl object-contain shadow-md"
                />
              ) : (
                <div className="text-xs text-[var(--t-text-muted)] font-medium">
                  No hay previsualización de imagen disponible.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-[var(--t-text-muted)]">
                Monto: {comprobanteSeleccionado.monto}
              </span>
              <div className="flex gap-2">
                {comprobanteSeleccionado.estado !== "aprobada" && (
                  <button
                    type="button"
                    onClick={() => {
                      handleAprobar(comprobanteSeleccionado.id);
                      setComprobanteSeleccionado(null);
                    }}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    ✓ Validar &amp; Enviar QR por Email
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setComprobanteSeleccionado(null)}
                  className="rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-4 py-2 text-xs font-bold text-[var(--t-text)] cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SIMULADOR DE ENVÍO DE EMAIL CON QR */}
      {modalEmailEnviadoTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-xl rounded-3xl border p-6 shadow-2xl space-y-5 relative overflow-hidden"
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
              color: "var(--t-text)",
            }}
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-2xl" />

            <div className="flex items-start justify-between border-b border-black/10 dark:border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 text-2xl border border-emerald-500/30">
                  📧
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                    ✓ CORREO ENVIADO AUTOMÁTICAMENTE
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-[var(--t-text)] mt-1">
                    Comprobante &amp; Credencial QR Emitida
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalEmailEnviadoTarget(null)}
                className="h-8 w-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center font-bold text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* ENCABEZADO DEL EMAIL ENVIADO */}
            <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-white/40 dark:bg-black/40 p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--t-text-muted)] font-bold">Destinatario:</span>
                <span className="font-extrabold text-[#1DBECB]">{modalEmailEnviadoTarget.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--t-text-muted)] font-bold">Asunto:</span>
                <span className="font-bold text-[var(--t-text)]">
                  [ExpoJuy 2026] ¡Acreditación Confirmada! Pase de Ingreso Oficial
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--t-text-muted)] font-bold">Emisor:</span>
                <span className="text-[var(--t-text-muted)]">secretaria_pagos@expojuy.gob.ar</span>
              </div>
            </div>

            {/* VISTA PREVIA DEL VOUCHER / PASE ADJUNTO */}
            <div className="rounded-2xl border border-[#7209B7]/30 bg-gradient-to-br from-[#7209B7]/10 via-[var(--t-surface)] to-[#1DBECB]/10 p-5 shadow-xl text-left space-y-3">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/15 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1DBECB]">
                    CREDENCIA OFICIAL DE ACCESO • EXPOJUY 2026
                  </span>
                  <div className="text-xs font-mono font-bold text-[var(--t-text)]">
                    {modalEmailEnviadoTarget.codigoUnico}
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 uppercase">
                  ✓ VERIFICADA
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Titular</span>
                  <span className="font-extrabold text-[var(--t-text)]">
                    {modalEmailEnviadoTarget.nombre} {modalEmailEnviadoTarget.apellido}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Documento</span>
                  <span className="font-bold text-[var(--t-text)]">{modalEmailEnviadoTarget.documento}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Perfil</span>
                  <span className="font-semibold text-[var(--t-text)]">
                    {modalEmailEnviadoTarget.esEmpresario ? `💼 ${modalEmailEnviadoTarget.empresa}` : "👤 Visitante Particular"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Lugar</span>
                  <span className="font-semibold text-[var(--t-text)]">Ciudad Cultural de Jujuy</span>
                </div>
              </div>

              {/* SIMULADOR CÓDIGO QR HABILITADO */}
              <div className="flex items-center gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="h-16 w-16 shrink-0 rounded-lg bg-slate-900 dark:bg-white p-1.5 flex flex-wrap gap-1 justify-center items-center shadow-md">
                  <div className="w-5 h-5 bg-white dark:bg-slate-900 rounded-xs" />
                  <div className="w-5 h-5 bg-[#7209B7] rounded-xs" />
                  <div className="w-5 h-5 bg-[#1DBECB] rounded-xs" />
                  <div className="w-5 h-5 bg-white dark:bg-slate-900 rounded-xs" />
                </div>
                <div>
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    CÓDIGO QR DE ACCESO ACTIVO
                  </div>
                  <div className="text-[10px] text-[var(--t-text-muted)] leading-tight mt-0.5">
                    Este código es escaneable directamente en molinetes de ingreso express.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-[var(--t-text-muted)] font-medium">
                💬 Se ha enviado una copia en formato PDF adjunta al correo.
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  📥 Imprimir / Descargar PDF
                </button>
                <button
                  type="button"
                  onClick={() => setModalEmailEnviadoTarget(null)}
                  className="w-full sm:w-auto rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-5 py-2.5 text-xs font-bold text-[var(--t-text)] cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RECHAZO DE PAGO */}
      {modalRechazoTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md rounded-3xl border p-6 shadow-2xl space-y-4"
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
              color: "var(--t-text)",
            }}
          >
            <h3 className="font-display font-bold text-lg text-red-500">
              Rechazar Solicitud de Acreditación
            </h3>
            <p className="text-xs text-[var(--t-text-muted)]">
              Por favor especificá el motivo del rechazo para notificar al visitante{" "}
              <strong>{modalRechazoTarget.nombre} {modalRechazoTarget.apellido}</strong>.
            </p>

            <textarea
              rows={3}
              value={motivoRechazoInput}
              onChange={(e) => setMotivoRechazoInput(e.target.value)}
              placeholder="Ej: El monto transferido no coincide o el comprobante es ilegible."
              className="w-full rounded-xl border p-3 text-xs focus:outline-none focus:border-red-500"
              style={{
                background: "var(--t-input-bg)",
                borderColor: "var(--t-input-border)",
                color: "var(--t-text)",
              }}
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalRechazoTarget(null)}
                className="rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-4 py-2 text-xs font-bold text-[var(--t-text)] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarRechazo}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-colors cursor-pointer"
              >
                Confirmar Rechazo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
