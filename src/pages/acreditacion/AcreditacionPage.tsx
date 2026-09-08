import React from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import AcreditacionInvitadosForm from "../../forms/acreditacion/AcreditacionInvitadosForm";

export default function AcreditacionPage() {
  return (
    <div className="relative z-10 pt-14 text-[var(--t-text)] transition-colors duration-300">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#7209B7] via-[#5C0099] to-[#1DBECB] py-16 px-4 text-center text-white backdrop-blur-md shadow-lg">
        {/* Decoraciones de fondo */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
            📍 PREPARÁ TU VISITA • EXPOJUY 2026
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Acreditación de Invitados
          </h1>

          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Completá tu registro online previamente para ingresar de forma rápida, evitar filas y acceder a todas las pabellones y actividades de la feria.
          </p>
        </div>
      </div>

      {/* DIVISOR ANDINO / AGUAYO */}
      <AguayoDivider />

      {/* CONTENIDO PRINCIPAL Y FORMULARIO */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMNA FORMULARIO PRINCIPAL (8 cols) */}
          <div className="lg:col-span-8">
            <AcreditacionInvitadosForm />
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN ÚTIL (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* TARJETA 1: DATOS DEL PREDIO */}
            <div
              className="rounded-3xl p-6 border shadow-md backdrop-blur-md transition-colors space-y-4"
              style={{
                background: "var(--t-card)",
                borderColor: "var(--t-card-border)",
              }}
            >
              <div className="flex items-center gap-3 border-b border-black/5 dark:border-white/10 pb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7209B7]/15 text-[#7209B7] dark:text-[#A881FC] text-xl font-bold">
                  📍
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--t-text)]">
                    Predio Ciudad Cultural
                  </h3>
                  <span className="text-xs text-[var(--t-text-muted)] font-medium block">
                    San Salvador de Jujuy
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[var(--t-text-muted)] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#1DBECB] font-bold">📅</span>
                  <div>
                    <span className="font-bold text-[var(--t-text)] block">Fechas:</span>
                    <span>Del 9 al 12 de Octubre de 2026</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#7209B7] dark:text-[#A881FC] font-bold">🕒</span>
                  <div>
                    <span className="font-bold text-[var(--t-text)] block">Horarios de Apertura:</span>
                    <span>10:00 hs a 22:00 hs continuo</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-[#1DBECB] font-bold">🎟</span>
                  <div>
                    <span className="font-bold text-[var(--t-text)] block">Ingreso Rápido:</span>
                    <span>Escaneá tu credencial digital QR en molinetes express</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TARJETA 2: BENEFICIOS DE ACREDITARTE */}
            <div
              className="rounded-3xl p-6 border shadow-md backdrop-blur-md transition-colors space-y-3"
              style={{
                background: "var(--t-surface)",
                borderColor: "var(--t-card-border)",
              }}
            >
              <h4 className="font-display text-sm font-extrabold text-[#7209B7] dark:text-[#1DBECB] uppercase tracking-wider">
                ✨ Beneficios Acreditación
              </h4>
              <ul className="space-y-2 text-xs text-[var(--t-text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Sin demoras en boleterías presenciales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Acceso a salas de conferencias y workshops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Posibilidad de agendar reuniones B2B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Certificado digital de asistencia.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
