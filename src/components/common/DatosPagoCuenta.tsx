import React, { useState } from "react";

export interface CuentaBancariaInfo {
  banco: string;
  titular: string;
  cuit: string;
  alias: string;
  cvu: string;
  tipoCuenta?: string;
  monto?: string;
  concepto?: string;
}

export const CUENTA_EXPOJUY_DEFAULT: CuentaBancariaInfo = {
  banco: "Banco Macro S.A.",
  titular: "Cámara de Comercio Exterior de Jujuy / ExpoJuy 2026",
  cuit: "30-68491028-4",
  alias: "EXPOJUY.2026.PAGO",
  cvu: "2850001030000123456789",
  tipoCuenta: "Cuenta Corriente Especial ARS",
  monto: "$ 5.000,00 ARS",
  concepto: "Acreditación Visitante ExpoJuy",
};

interface DatosPagoCuentaProps {
  cuenta?: CuentaBancariaInfo;
  titulo?: string;
  subtitulo?: string;
  className?: string;
  mostrarMonto?: boolean;
}

export default function DatosPagoCuenta({
  cuenta = CUENTA_EXPOJUY_DEFAULT,
  titulo = "Datos para Transferencia Bancaria",
  subtitulo = "Realizá el pago exacto antes de enviar tu comprobante de acreditación",
  className = "",
  mostrarMonto = true,
}: DatosPagoCuentaProps) {
  const [copiadoCampo, setCopiadoCampo] = useState<string | null>(null);

  const copiarAlPortapapeles = (texto: string, campo: string) => {
    navigator.clipboard.writeText(texto);
    setCopiadoCampo(campo);
    setTimeout(() => {
      setCopiadoCampo(null);
    }, 2000);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 shadow-lg backdrop-blur-md transition-all duration-300 ${className}`}
      style={{
        background: "var(--t-surface)",
        borderColor: "var(--t-card-border)",
        color: "var(--t-text)",
      }}
    >
      {/* Fondo decorativo con neón suave */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#1DBECB]/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-[#7209B7]/10 blur-2xl" />

      {/* HEADER DEL COMPONENTE */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7209B7]/10 border border-[#7209B7]/20 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#7209B7] dark:text-[#A881FC]">
            <span>🏦</span> TRANSFERENCIA BANCARIA / MERCADO PAGO
          </div>
          <h3 className="mt-1 text-base font-extrabold tracking-tight font-display text-[var(--t-text)]">
            {titulo}
          </h3>
          {subtitulo && (
            <p className="text-xs text-[var(--t-text-muted)] font-medium">{subtitulo}</p>
          )}
        </div>

        {mostrarMonto && cuenta.monto && (
          <div className="shrink-0 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] p-0.5 shadow-md">
            <div className="rounded-[10px] bg-[var(--t-card)] px-4 py-2 text-center">
              <span className="block text-[9px] uppercase font-black tracking-widest text-[var(--t-text-muted)]">
                Monto a Transferir
              </span>
              <span className="text-lg font-black text-[#1DBECB] font-mono">
                {cuenta.monto}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* GRILLA DE DATOS DE LA CUENTA */}
      <div className="relative z-10 mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
        {/* Banco y Titular */}
        <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/20 p-3 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--t-text-muted)] block">
            Entidad Bancaria &amp; Titular
          </span>
          <div className="font-extrabold text-[var(--t-text)]">{cuenta.banco}</div>
          <div className="text-[11px] text-[var(--t-text-muted)] font-medium leading-tight">
            {cuenta.titular}
          </div>
          {cuenta.tipoCuenta && (
            <div className="text-[10px] text-[#7209B7] dark:text-[#A881FC] font-semibold pt-0.5">
              {cuenta.tipoCuenta}
            </div>
          )}
        </div>

        {/* CUIT */}
        <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/20 p-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--t-text-muted)] block">
              CUIT de la Organización
            </span>
            <div className="font-mono font-extrabold text-sm text-[var(--t-text)] mt-0.5">
              {cuenta.cuit}
            </div>
          </div>
          <button
            type="button"
            onClick={() => copiarAlPortapapeles(cuenta.cuit, "cuit")}
            className="mt-2 self-start inline-flex items-center gap-1 rounded-lg bg-black/5 dark:bg-white/10 px-2.5 py-1 text-[11px] font-bold hover:bg-[#1DBECB]/20 transition-colors cursor-pointer"
          >
            {copiadoCampo === "cuit" ? "✓ ¡CUIT Copiado!" : "📋 Copiar CUIT"}
          </button>
        </div>

        {/* ALIAS DESTACADO */}
        <div className="rounded-xl border border-[#7209B7]/30 bg-[#7209B7]/5 p-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#7209B7] dark:text-[#A881FC] block">
              ALIAS (Cualquier Banco / MP)
            </span>
            <div className="font-mono font-black text-base text-[#7209B7] dark:text-[#A881FC] tracking-wider mt-0.5">
              {cuenta.alias}
            </div>
          </div>
          <button
            type="button"
            onClick={() => copiarAlPortapapeles(cuenta.alias, "alias")}
            className="mt-2.5 inline-flex items-center justify-center gap-1 rounded-lg bg-[#7209B7] text-white px-3 py-1.5 text-[11px] font-extrabold shadow-sm hover:scale-105 transition-all cursor-pointer"
          >
            {copiadoCampo === "alias" ? "✓ ¡ALIAS COPIADO!" : "📋 COPIAR ALIAS"}
          </button>
        </div>

        {/* CVU / CBU */}
        <div className="rounded-xl border border-[#1DBECB]/30 bg-[#1DBECB]/5 p-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0e8a95] dark:text-[#1DBECB] block">
              CVU / CBU
            </span>
            <div className="font-mono font-bold text-xs text-[var(--t-text)] tracking-wider mt-0.5 break-all">
              {cuenta.cvu}
            </div>
          </div>
          <button
            type="button"
            onClick={() => copiarAlPortapapeles(cuenta.cvu, "cvu")}
            className="mt-2.5 inline-flex items-center justify-center gap-1 rounded-lg bg-[#1DBECB] text-slate-950 px-3 py-1.5 text-[11px] font-extrabold shadow-sm hover:scale-105 transition-all cursor-pointer"
          >
            {copiadoCampo === "cvu" ? "✓ ¡CVU COPIADO!" : "📋 COPIAR CVU"}
          </button>
        </div>
      </div>

      {cuenta.concepto && (
        <div className="relative z-10 mt-3 rounded-lg border border-black/5 dark:border-white/10 bg-slate-100 dark:bg-black/30 p-2.5 text-[11px] text-[var(--t-text-muted)] flex items-center justify-between">
          <span>
            💡 <strong>Concepto recomendado:</strong> {cuenta.concepto}
          </span>
        </div>
      )}
    </div>
  );
}
