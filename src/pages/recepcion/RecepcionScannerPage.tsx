import React, { useState, useEffect, useRef } from "react";
import RoleGuard from "../../components/common/RoleGuard";
import AguayoDivider from "../../components/common/AguayoDivider";
import VentaBoleteriaPanel from "../../components/recepcion/VentaBoleteriaPanel";
import { acreditacionesService } from "../../api/services/acreditacionesService";
import { AcreditacionRecord } from "../../types/acreditacion.types";

export default function RecepcionScannerPage() {
  // ESTADOS DEL ACORDEÓN
  const [escanerAbierto, setEscanerAbierto] = useState<boolean>(true);
  const [boleteriaAbierta, setBoleteriaAbierta] = useState<boolean>(false);

  // ESTADOS DEL ESCÁNER Y VALIDACIÓN
  const [inputQuery, setInputQuery] = useState<string>("");
  const [camaraActiva, setCamaraActiva] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [resultadoValidacion, setResultadoValidacion] = useState<{
    status: "exito" | "pendiente" | "rechazada" | "no_encontrado" | "ya_ingresado";
    record?: AcreditacionRecord;
    mensaje: string;
  } | null>(null);

  const [historialEscaneos, setHistorialEscaneos] = useState<
    Array<{ record: AcreditacionRecord; hora: string; status: string }>
  >([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Iniciar cámara usando WebRTC MediaDevices
  const iniciarCamara = async () => {
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCamaraActiva(true);
    } catch (err) {
      console.warn("No se pudo acceder a la cámara:", err);
      setCamaraActiva(false);
      alert("No se pudo acceder a la cámara del dispositivo. Por favor verificá los permisos o ingresá el código QR manualmente.");
    }
  };

  const detenerCamara = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCamaraActiva(false);
  };

  const alternarCamara = () => {
    const nuevoModo = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nuevoModo);
    if (camaraActiva) {
      detenerCamara();
      setTimeout(iniciarCamara, 300);
    }
  };

  useEffect(() => {
    return () => {
      detenerCamara();
    };
  }, []);

  const validarCodigo = (codigo: string) => {
    const clean = codigo.trim();
    if (!clean) return;

    // Si es solo número (DNI), informar que se requiere el código QR oficial de la entrada
    if (/^\d+$/.test(clean)) {
      setResultadoValidacion({
        status: "no_encontrado",
        mensaje: `Acceso denegado: '${clean}' es un DNI. Solo se permite el ingreso con el CÓDIGO QR GENERADO e impreso en la entrada oficial (ej: EXPOJUY-2026-QR-XXXXXX).`,
      });
      return;
    }

    const record = acreditacionesService.getByCodigoStrict(clean);

    if (!record) {
      setResultadoValidacion({
        status: "no_encontrado",
        mensaje: `No se encontró ninguna credencial válida registrada con el código '${clean}'. Verificá el código QR enviado al visitante.`,
      });
      return;
    }

    if (record.estado === "pendiente") {
      setResultadoValidacion({
        status: "pendiente",
        record,
        mensaje: "Acreditación registrada pero el pago está PENDIENTE de validación por Tesorería.",
      });
      return;
    }

    if (record.estado === "rechazada") {
      setResultadoValidacion({
        status: "rechazada",
        record,
        mensaje: `Solicitud rechazada: ${record.motivoRechazo || "Pago no acreditado"}`,
      });
      return;
    }

    if (record.ingresado) {
      setResultadoValidacion({
        status: "ya_ingresado",
        record,
        mensaje: `El visitante ya registró su ingreso a las ${new Date(
          record.fechaIngreso || ""
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} hs.`,
      });
      return;
    }

    // ACCESO EXITOSO Y APROBADO CON CÓDIGO QR VÁLIDO
    const actualizado = acreditacionesService.marcarIngreso(record.id) || record;
    const horaActual = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    setResultadoValidacion({
      status: "exito",
      record: actualizado,
      mensaje: "¡Acreditación confirmada! Código QR de credencial verificado correctamente.",
    });

    setHistorialEscaneos((prev) => [
      { record: actualizado, hora: horaActual, status: "ACCESO AUTORIZADO POR QR" },
      ...prev.slice(0, 9),
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validarCodigo(inputQuery);
  };

  const handleVentaEmitida = (record: AcreditacionRecord) => {
    const horaActual = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setHistorialEscaneos((prev) => [
      { record, hora: horaActual, status: "VENTA BOLETERÍA & INGRESO" },
      ...prev.slice(0, 9),
    ]);
  };

  const muestraSample = [
    { label: "QR Aprobado: EXPOJUY-2026-QR-731049", code: "EXPOJUY-2026-QR-731049" },
    { label: "QR Pendiente: EXPOJUY-2026-QR-948201", code: "EXPOJUY-2026-QR-948201" },
  ];

  return (
    <RoleGuard requiredRole="admin">
      <div className="relative z-10 pt-14 text-[var(--t-text)] transition-colors duration-300">
        {/* HEADER DE RECEPCIÓN Y MESA DE ACCESO */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#7209B7] via-[#5C0099] to-[#1DBECB] py-14 px-4 text-center text-white backdrop-blur-md shadow-lg">
          <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
              🚪 RECEPCIÓN • BOLETERÍA &amp; MOLINETES
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Control de Acceso &amp; Boletería
            </h1>

            <p className="text-white/90 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              Gestión integral de molinetes para validación de pases QR y venta presencial de entradas en puerta con acreditación inmediata.
            </p>
          </div>
        </div>

        <AguayoDivider />

        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          {/* ACORDEÓN 1: ESCÁNER Y CONTROL DE ACCESO QR */}
          <div
            className="overflow-hidden rounded-3xl border shadow-xl backdrop-blur-md transition-all duration-300"
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
            }}
          >
            {/* CABECERA DE ACORDEÓN 1 */}
            <button
              type="button"
              onClick={() => setEscanerAbierto(!escanerAbierto)}
              className="w-full flex items-center justify-between p-6 text-left border-b border-black/5 dark:border-white/10 transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7209B7]/15 text-[#7209B7] dark:text-[#A881FC] text-2xl font-black border border-[#7209B7]/30">
                  🔍
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7209B7]/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#7209B7] dark:text-[#A881FC] mb-1">
                    MOLINETES &amp; INGRESO
                  </div>
                  <h2 className="text-xl font-bold font-display text-[var(--t-text)]">
                    1. Escáner &amp; Validación de Credenciales QR
                  </h2>
                  <p className="text-xs text-[var(--t-text-muted)] font-medium">
                    Validación con la cámara del celular o lectora para pases de visitantes acreditados previamente.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block rounded-full bg-[#1DBECB]/10 border border-[#1DBECB]/30 px-3 py-1 text-xs font-bold text-[#0e8a95] dark:text-[#1DBECB]">
                  {camaraActiva ? "🟢 Cámara En Vivo" : "📷 Escáner Cámara"}
                </span>
                <span className="text-xl font-bold text-[var(--t-text-muted)] transition-transform duration-300">
                  {escanerAbierto ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* CONTENIDO DESPLEGABLE DE ESCÁNER */}
            {escanerAbierto && (
              <div className="p-6 space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#7209B7] dark:text-[#1DBECB]">
                      CÁMARA DEL DISPOSITIVO MÓVIL
                    </span>
                    <h3 className="text-base font-bold font-display text-[var(--t-text)]">
                      Visor en Tiempo Real
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {!camaraActiva ? (
                      <button
                        type="button"
                        onClick={iniciarCamara}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                      >
                        <span>📷 Activar Cámara</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={alternarCamara}
                          className="rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-3 py-2 text-xs font-bold text-[var(--t-text)] cursor-pointer"
                          title="Cambiar entre cámara trasera y frontal"
                        >
                          🔄 Cambiar Cámara
                        </button>
                        <button
                          type="button"
                          onClick={detenerCamara}
                          className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-500 cursor-pointer"
                        >
                          ⏹ Detener
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* CAJA DE VISOR DE CÁMARA */}
                <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 bg-slate-950 flex flex-col items-center justify-center min-h-[240px] shadow-inner">
                  {camaraActiva ? (
                    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-52 h-52 border-2 border-[#1DBECB] rounded-2xl relative shadow-[0_0_20px_rgba(29,190,203,0.5)]">
                          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#7209B7] rounded-tl-lg" />
                          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#7209B7] rounded-tr-lg" />
                          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#7209B7] rounded-bl-lg" />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#7209B7] rounded-br-lg" />
                          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#1DBECB] to-transparent animate-pulse top-1/2 absolute" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center space-y-3">
                      <div className="text-4xl text-[var(--t-text-muted)] opacity-50">📱</div>
                      <div className="text-xs font-semibold text-slate-400">
                        Hacé clic en <strong>Activar Cámara</strong> para encender la cámara de tu celular y escanear credenciales QR.
                      </div>
                    </div>
                  )}
                </div>

                {/* FORMULARIO DE INGRESO MANUAL / LECTORA BARCODE */}
                <form onSubmit={handleFormSubmit} className="space-y-3 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--t-text-muted)] block">
                    Ingreso Exclusivo por Código de Credencial QR
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      placeholder="Escaneá o escribí el código QR oficial ej: EXPOJUY-2026-QR-731049..."
                      className="flex-1 rounded-xl border px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#1DBECB]"
                      style={{
                        background: "var(--t-input-bg)",
                        borderColor: "var(--t-input-border)",
                        color: "var(--t-text)",
                      }}
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-[#7209B7] hover:bg-[#5C0099] text-white px-6 py-3 text-xs font-extrabold shadow-md cursor-pointer transition-all shrink-0"
                    >
                      🔍 Validar Ingreso
                    </button>
                  </div>
                </form>

                {/* BOTONES DE PRUEBA RÁPIDA */}
                <div className="pt-2 border-t border-black/5 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--t-text-muted)] block mb-2">
                    Prueba Rápida de Acreditaciones de Demostración:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {muestraSample.map((s) => (
                      <button
                        key={s.code}
                        type="button"
                        onClick={() => {
                          setInputQuery(s.code);
                          validarCodigo(s.code);
                        }}
                        className="rounded-lg border border-[var(--t-card-border)] bg-[var(--t-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--t-text)] hover:border-[#1DBECB] transition-colors cursor-pointer"
                      >
                        ⚡ {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RESULTADO DE LA VALIDACIÓN EN VIVO */}
                {resultadoValidacion && (
                  <div className="animate-fade-in pt-2">
                    {resultadoValidacion.status === "exito" && (
                      <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 shadow-xl space-y-4 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white text-3xl font-black shadow-lg">
                            ✓
                          </div>
                          <div>
                            <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-300 uppercase tracking-widest border border-emerald-500/30">
                              ACCESO PERMITIDO • INGRESO REGISTRADO
                            </span>
                            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-display mt-0.5">
                              {resultadoValidacion.record?.nombre} {resultadoValidacion.record?.apellido}
                            </h3>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white/50 dark:bg-black/30 p-4 rounded-2xl font-mono">
                          <div>
                            <span className="text-[10px] uppercase text-[var(--t-text-muted)] block font-bold">Documento</span>
                            <span className="font-bold text-[var(--t-text)]">{resultadoValidacion.record?.documento}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[var(--t-text-muted)] block font-bold">Perfil</span>
                            <span className="font-bold text-[#7209B7] dark:text-[#A881FC]">
                              {resultadoValidacion.record?.esEmpresario
                                ? `💼 ${resultadoValidacion.record?.empresa}`
                                : "👤 Particular"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[var(--t-text-muted)] block font-bold">Rubro</span>
                            <span className="font-bold text-[var(--t-text)]">{resultadoValidacion.record?.rubro}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[var(--t-text-muted)] block font-bold">Código QR</span>
                            <span className="font-bold text-[#1DBECB] truncate block">
                              {resultadoValidacion.record?.codigoUnico}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {resultadoValidacion.status === "ya_ingresado" && (
                      <div className="rounded-3xl border border-sky-500/40 bg-sky-500/10 p-6 shadow-xl space-y-3 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white text-2xl font-bold">
                            ℹ️
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-sky-600 dark:text-sky-300 uppercase tracking-wider block">
                              INGRESO PREVIO REGISTRADO
                            </span>
                            <h3 className="text-xl font-bold text-[var(--t-text)]">
                              {resultadoValidacion.record?.nombre} {resultadoValidacion.record?.apellido}
                            </h3>
                            <p className="text-xs text-[var(--t-text-muted)]">{resultadoValidacion.mensaje}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {resultadoValidacion.status === "pendiente" && (
                      <div className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 shadow-xl space-y-3 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white text-2xl font-bold">
                            ⏳
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                              PAGO PENDIENTE DE VALIDACIÓN
                            </span>
                            <h3 className="text-xl font-bold text-[var(--t-text)]">
                              {resultadoValidacion.record?.nombre} {resultadoValidacion.record?.apellido}
                            </h3>
                            <p className="text-xs text-[var(--t-text-muted)]">{resultadoValidacion.mensaje}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {resultadoValidacion.status === "no_encontrado" && (
                      <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 shadow-xl space-y-3 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white text-2xl font-bold">
                            🚫
                          </div>
                          <div>
                            <span className="text-xs font-extrabold text-red-500 uppercase tracking-wider block">
                              CÓDIGO NO ENCONTRADO
                            </span>
                            <p className="text-xs text-[var(--t-text)] font-semibold">{resultadoValidacion.mensaje}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACORDEÓN 2: BOLETERÍA PRESENCIAL - VENTA & ACREDITACIÓN EN TAQUILLA */}
          <div
            className="overflow-hidden rounded-3xl border shadow-xl backdrop-blur-md transition-all duration-300"
            style={{
              background: "var(--t-card)",
              borderColor: "var(--t-card-border)",
            }}
          >
            {/* CABECERA DE ACORDEÓN 2 */}
            <button
              type="button"
              onClick={() => setBoleteriaAbierta(!boleteriaAbierta)}
              className="w-full flex items-center justify-between p-6 text-left border-b border-black/5 dark:border-white/10 transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1DBECB]/15 text-[#0e8a95] dark:text-[#1DBECB] text-2xl font-black border border-[#1DBECB]/30">
                  🎟️
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1DBECB]/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#0e8a95] dark:text-[#1DBECB] mb-1">
                    TAQUILLA PRESENCIAL
                  </div>
                  <h2 className="text-xl font-bold font-display text-[var(--t-text)]">
                    2. Boletería • Venta de Entradas &amp; Acreditación Inmediata
                  </h2>
                  <p className="text-xs text-[var(--t-text-muted)] font-medium">
                    Cobro directo en puerta (Efectivo/Tarjeta/MP) y emisión express de pase de entrada aprobado con QR.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  💵 Venta en PREDIO
                </span>
                <span className="text-xl font-bold text-[var(--t-text-muted)] transition-transform duration-300">
                  {boleteriaAbierta ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {/* CONTENIDO DESPLEGABLE DE BOLETERÍA */}
            {boleteriaAbierta && (
              <div className="p-6 animate-fade-in">
                <VentaBoleteriaPanel onAcreditacionGenerada={handleVentaEmitida} />
              </div>
            )}
          </div>

          {/* HISTORIAL DE ESCANEOS Y VENTAS RECIENTES */}
          {historialEscaneos.length > 0 && (
            <div
              className="rounded-3xl border p-6 shadow-md transition-colors backdrop-blur-md space-y-4"
              style={{
                background: "var(--t-card)",
                borderColor: "var(--t-card-border)",
              }}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#7209B7] dark:text-[#1DBECB]">
                Historial de Accesos y Ventas Recientes en Recepción
              </h3>
              <div className="divide-y divide-black/5 dark:divide-white/10 text-xs">
                {historialEscaneos.map((h, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[var(--t-text)]">
                        {h.record.nombre} {h.record.apellido}
                      </span>
                      <span className="text-[10px] text-[var(--t-text-muted)] block font-mono">
                        DNI: {h.record.documento} • {h.record.esEmpresario ? `💼 ${h.record.empresa}` : "👤 Particular"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px]">
                        ✓ {h.status}
                      </span>
                      <span className="text-[10px] text-[var(--t-text-muted)] font-mono">{h.hora} hs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
