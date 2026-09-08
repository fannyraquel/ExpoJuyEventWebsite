import React, { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import DatosPagoCuenta, { CUENTA_EXPOJUY_DEFAULT } from "../../components/common/DatosPagoCuenta";
import { acreditacionesService } from "../../api/services/acreditacionesService";
import { AcreditacionRecord } from "../../types/acreditacion.types";

export interface AcreditacionFormData {
  documento: string;
  nombre: string;
  apellido: string;
  esEmpresario: boolean;
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

  // Pago y Comprobante
  numeroTransaccion: string;
  comprobanteNombre: string;
  comprobanteUrl: string;
}

const INITIAL_FORM_DATA: AcreditacionFormData = {
  documento: "",
  nombre: "",
  apellido: "",
  esEmpresario: false,
  empresa: "",
  cargo: "",
  pais: "Argentina",
  codigoPais: "+54",
  codigoArea: "",
  celular: "",
  paisResidencia: "Argentina",
  provincia: "Jujuy",
  localidad: "San Salvador de Jujuy",
  email: "",
  rubro: "Público General",
  aceptaNovedades: true,
  numeroTransaccion: "",
  comprobanteNombre: "",
  comprobanteUrl: "",
};

const PAISES_OPTIONS = [
  { value: "Argentina", label: "Argentina" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Chile", label: "Chile" },
  { value: "Brasil", label: "Brasil" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Perú", label: "Perú" },
  { value: "Colombia", label: "Colombia" },
  { value: "Otro", label: "Otro País" },
];

const PROVINCIAS_OPTIONS = [
  { value: "Jujuy", label: "Jujuy" },
  { value: "Salta", label: "Salta" },
  { value: "Tucumán", label: "Tucumán" },
  { value: "Catamarca", label: "Catamarca" },
  { value: "La Rioja", label: "La Rioja" },
  { value: "Santiago del Estero", label: "Santiago del Estero" },
  { value: "Buenos Aires", label: "Buenos Aires / CABA" },
  { value: "Córdoba", label: "Córdoba" },
  { value: "Santa Fe", label: "Santa Fe" },
  { value: "Mendoza", label: "Mendoza" },
  { value: "Otra", label: "Otra Provincia / Estado" },
];

const LOCALIDADES_JUJUY = [
  { value: "San Salvador de Jujuy", label: "San Salvador de Jujuy" },
  { value: "Palpalá", label: "Palpalá" },
  { value: "San Pedro de Jujuy", label: "San Pedro de Jujuy" },
  { value: "Perico", label: "Perico" },
  { value: "Tilcara", label: "Tilcara" },
  { value: "Humahuaca", label: "Humahuaca" },
  { value: "La Quiaca", label: "La Quiaca" },
  { value: "Ledesma / Libertador", label: "Libertador General San Martín" },
  { value: "Otra", label: "Otra Ciudad / Localidad" },
];

const RUBROS_OPTIONS = [
  { value: "Público General", label: "Público General / Visitante" },
  { value: "Minería & Litio", label: "Minería & Litio" },
  { value: "Agroindustria & Alimentos", label: "Agroindustria & Alimentos" },
  { value: "Comercio & Servicios", label: "Comercio & Servicios" },
  { value: "Tecnología & Software", label: "Tecnología & Innovación" },
  { value: "Turismo & Gastronomía", label: "Turismo & Gastronomía" },
  { value: "Institucional & Gobierno", label: "Institucional / Gobierno" },
  { value: "Estudiante & Académico", label: "Estudiante / Académico" },
  { value: "Prensa & Comunicación", label: "Prensa & Medios de Comunicación" },
];

const STEPS = [
  { id: 1, title: "Datos del Visitante", short: "1. Datos", icon: "👤" },
  { id: 2, title: "Pago & Comprobante", short: "2. Pago", icon: "💳" },
  { id: 3, title: "Revisión & Envío", short: "3. Revisión", icon: "📋" },
];

export default function AcreditacionInvitadosForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<AcreditacionFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof AcreditacionFormData, string>>>({});
  const [registroCreado, setRegistroCreado] = useState<AcreditacionRecord | null>(null);

  const handleChange = (field: keyof AcreditacionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        comprobanteNombre: file.name,
        comprobanteUrl: (event.target?.result as string) || "",
      }));
      if (errors.comprobanteUrl) {
        setErrors((prev) => ({ ...prev, comprobanteUrl: undefined }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof AcreditacionFormData, string>> = {};

    if (!formData.documento.trim()) {
      newErrors.documento = "El número de documento / ID es obligatorio";
    }
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }
    if (!formData.celular.trim()) {
      newErrors.celular = "El número de celular es obligatorio";
    }

    if (formData.esEmpresario) {
      if (!formData.empresa.trim()) {
        newErrors.empresa = "El nombre de la empresa u organización es requerido";
      }
      if (!formData.cargo.trim()) {
        newErrors.cargo = "Su cargo u ocupación en la empresa es requerido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof AcreditacionFormData, string>> = {};

    if (!formData.numeroTransaccion.trim()) {
      newErrors.numeroTransaccion = "El N° de transferencia o comprobante es requerido";
    }
    if (!formData.comprobanteUrl) {
      newErrors.comprobanteUrl = "Debe adjuntar el archivo del comprobante de pago";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 200, behavior: "smooth" });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 200, behavior: "smooth" });
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      return;
    }

    const nuevo = acreditacionesService.create({
      documento: formData.documento,
      nombre: formData.nombre,
      apellido: formData.apellido,
      esEmpresario: formData.esEmpresario,
      empresa: formData.esEmpresario ? formData.empresa : "Particular",
      cargo: formData.esEmpresario ? formData.cargo : "Visitante Particular",
      pais: formData.pais,
      codigoPais: formData.codigoPais,
      codigoArea: formData.codigoArea,
      celular: formData.celular,
      paisResidencia: formData.paisResidencia,
      provincia: formData.provincia,
      localidad: formData.localidad,
      email: formData.email,
      rubro: formData.rubro,
      aceptaNovedades: formData.aceptaNovedades,
      monto: CUENTA_EXPOJUY_DEFAULT.monto || "$ 5.000,00 ARS",
      numeroTransaccion: formData.numeroTransaccion,
      comprobanteNombre: formData.comprobanteNombre || "comprobante_pago.png",
      comprobanteUrl: formData.comprobanteUrl,
    });

    setRegistroCreado(nuevo);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setCurrentStep(1);
    setRegistroCreado(null);
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 backdrop-blur-md"
      style={{
        background: "var(--t-card)",
        borderColor: "var(--t-card-border)",
      }}
    >
      {/* Fondo decorativo con gradientes suaves */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#7209B7]/15 dark:bg-[#7209B7]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#1DBECB]/15 dark:bg-[#1DBECB]/25 blur-3xl" />

      {/* HEADER DEL FORMULARIO */}
      <div className="relative z-10 border-b px-6 py-8 text-center sm:px-10 border-black/5 dark:border-white/10 bg-gradient-to-b from-[#7209B7]/5 to-transparent">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1DBECB]/30 bg-[#1DBECB]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0e8a95] dark:text-[#1DBECB] mb-3">
          <span>🎟</span> ACREDITACIÓN ONLINE
        </div>
        <h2 className="text-2xl font-black tracking-tight text-[var(--t-text)] sm:text-3xl font-display">
          Acreditación de invitados
        </h2>
        <p className="mt-2 text-sm font-medium text-[var(--t-text-muted)] max-w-lg mx-auto">
          Completá tus datos por pasos, realizá la transferencia y adjuntá tu comprobante para validar tu credencial oficial.
        </p>

        {/* BARRA DE PASOS (STEPPER INDICATOR) */}
        {!registroCreado && (
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 max-w-2xl mx-auto">
            {STEPS.map((s, idx) => {
              const isActive = currentStep === s.id;
              const isCompleted = currentStep > s.id;

              return (
                <React.Fragment key={s.id}>
                  {idx > 0 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors duration-300 ${
                        currentStep >= s.id ? "bg-[#1DBECB]" : "bg-black/10 dark:bg-white/10"
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (s.id < currentStep) setCurrentStep(s.id);
                    }}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#7209B7] text-white shadow-md scale-105"
                        : isCompleted
                        ? "bg-[#1DBECB]/20 text-[#0e8a95] dark:text-[#1DBECB] border border-[#1DBECB]/40"
                        : "bg-slate-200/60 dark:bg-white/10 text-[var(--t-text-muted)] opacity-60"
                    }`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-black bg-black/10 dark:bg-white/10">
                      {isCompleted ? "✓" : s.id}
                    </span>
                    <span className="hidden sm:inline">{s.title}</span>
                    <span className="sm:hidden">{s.short}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 sm:p-10">
        {registroCreado ? (
          /* RESULTADO: PENDIENTE DE VALIDACIÓN POR ADMINISTRACIÓN */
          <div className="space-y-6 text-center animate-fade-in">
            {registroCreado.estado === "aprobada" ? (
              /* CASO APROBADA */
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-3xl">
                ✓
              </div>
            ) : (
              /* CASO PENDIENTE */
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-3xl animate-pulse">
                ⏳
              </div>
            )}

            <div>
              <span className="inline-block rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1 text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
                ESTADO: {registroCreado.estado === "aprobada" ? "✓ ACREDITACIÓN VALIDADA" : "⏳ PENDIENTE DE VALIDACIÓN DE PAGO"}
              </span>

              <h3 className="text-2xl font-bold text-[var(--t-text)] font-display mt-1">
                {registroCreado.estado === "aprobada"
                  ? "¡Acreditación Confirmada!"
                  : "¡Solicitud de Acreditación Registrada!"}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--t-text-muted)] mt-2 max-w-lg mx-auto leading-relaxed">
                {registroCreado.estado === "aprobada"
                  ? "Tu pago ha sido auditado y tu credencial oficial se encuentra activa."
                  : "Hemos recibido tu comprobante de transferencia. El equipo de administración revisará la acreditación para emitir tu credencial definitiva con código QR."}
              </p>
            </div>

            {/* VISTA PREVIA DE LA CREDENCIAL / ESTADO */}
            <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-[#7209B7]/30 bg-gradient-to-br from-[#7209B7]/10 via-[var(--t-surface)] to-[#1DBECB]/10 p-6 shadow-2xl backdrop-blur-xl text-left relative">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/15 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1DBECB]">
                    SOLICITUD • {registroCreado.id}
                  </span>
                  <div className="text-xs font-mono font-bold text-[var(--t-text)] mt-0.5">
                    Ref: {registroCreado.numeroTransaccion || "S/N"}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#7209B7] to-[#1DBECB] flex items-center justify-center text-white font-black text-sm">
                  EJ
                </div>
              </div>

              <div className="my-5 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Titular</span>
                  <span className="font-extrabold text-[var(--t-text)] text-sm">
                    {registroCreado.nombre} {registroCreado.apellido}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Documento</span>
                  <span className="font-bold text-[var(--t-text)]">{registroCreado.documento}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Perfil / Entidad</span>
                  <span className="font-semibold text-[var(--t-text)]">
                    {registroCreado.esEmpresario ? `💼 ${registroCreado.empresa}` : "👤 Visitante Particular"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--t-text-muted)] block">Comprobante</span>
                  <span className="font-mono text-[11px] text-[#1DBECB] truncate block">
                    {registroCreado.comprobanteNombre || "Adjuntado"}
                  </span>
                </div>
              </div>

              {/* SIMULADOR DE CÓDIGO QR / MARCA DE AGUA PENDIENTE */}
              <div className="relative flex items-center gap-4 rounded-xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/50 p-3 overflow-hidden">
                {registroCreado.estado !== "aprobada" && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-center p-2 z-10">
                    <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                      🔒 QR En Verificación por Administración
                    </span>
                  </div>
                )}
                <div className="h-16 w-16 shrink-0 rounded-lg bg-slate-900 dark:bg-white p-1.5 flex flex-wrap gap-1 justify-center items-center shadow-inner">
                  <div className="w-5 h-5 bg-white dark:bg-slate-900 rounded-xs" />
                  <div className="w-5 h-5 bg-[#7209B7] rounded-xs" />
                  <div className="w-5 h-5 bg-[#1DBECB] rounded-xs" />
                  <div className="w-5 h-5 bg-white dark:bg-slate-900 rounded-xs" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                    Código de Validación: {registroCreado.codigoUnico}
                  </div>
                  <div className="text-[10px] text-[var(--t-text-muted)] leading-tight mt-0.5">
                    El QR se habilitará automáticamente al ser validado en el Panel Admin.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {registroCreado.estado === "aprobada" ? (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  📥 Descargar Credencial Oficial (PDF)
                </button>
              ) : (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-600 dark:text-amber-300 font-medium text-center">
                  ⚙️ Para probar la validación: Iniciá sesión como <strong>Administrador</strong> en el menú <em>Perfil &amp; Roles</em>.
                </div>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-6 py-3 text-xs font-bold text-[var(--t-text)] shadow-sm transition-all hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
              >
                Registrar otra acreditación
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO POR PASOS (WIZARD) */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PASO 1: DATOS PERSONALES DEL VISITANTE */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#7209B7] text-white font-bold text-xs">
                    1
                  </span>
                  <h3 className="text-base font-black uppercase tracking-wider text-[#7209B7] dark:text-[#A881FC] font-display">
                    Datos del Visitante
                  </h3>
                </div>

                {/* ROW 1: Documento, Nombre, Apellido */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FormInput
                    label="Documento / Pasaporte / ID"
                    required
                    value={formData.documento}
                    onChange={(e) => handleChange("documento", e.target.value)}
                    placeholder="Documento / Pasaporte / ID"
                    error={errors.documento}
                  />
                  <FormInput
                    label="Nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    placeholder="Nombre"
                    error={errors.nombre}
                  />
                  <FormInput
                    label="Apellido"
                    required
                    value={formData.apellido}
                    onChange={(e) => handleChange("apellido", e.target.value)}
                    placeholder="Apellido"
                    error={errors.apellido}
                  />
                </div>

                {/* INTERRUPTOR (TOGGLE SWITCH): EMPRESARIO / INSTITUCIONAL vs VISITANTE COMÚN */}
                <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-white/40 dark:bg-black/30 p-4 transition-all duration-300">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-[var(--t-text)] flex items-center gap-2">
                        <span className="text-base">💼</span>
                        <span>¿Asistís en representación de una Empresa, Comercio o Institución?</span>
                      </div>
                      <p className="text-[11px] text-[var(--t-text-muted)] font-medium">
                        {formData.esEmpresario
                          ? "Perfil Empresarial / Profesional activado (Se solicitará nombre de empresa y cargo)"
                          : "Perfil Visitante Particular / Público General (Desactivado para asistentes independientes)"}
                      </p>
                    </div>

                    <div className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                      <input
                        type="checkbox"
                        checked={formData.esEmpresario}
                        onChange={(e) => handleChange("esEmpresario", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7209B7]"></div>
                    </div>
                  </label>

                  {/* DESPLEGABLE CON CAMPOS DE EMPRESA Y CARGO SI ESTÁ ACTIVADO */}
                  {formData.esEmpresario && (
                    <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in">
                      <FormInput
                        label="Nombre de la Empresa / Organización"
                        required={formData.esEmpresario}
                        value={formData.empresa}
                        onChange={(e) => handleChange("empresa", e.target.value)}
                        placeholder="Ej: Litio Jujuy S.A. / Comercio Ejemplo"
                        error={errors.empresa}
                      />
                      <FormInput
                        label="Ocupación / Cargo"
                        required={formData.esEmpresario}
                        value={formData.cargo}
                        onChange={(e) => handleChange("cargo", e.target.value)}
                        placeholder="Ej: Gerente de Compras / Director / Técnico"
                        error={errors.cargo}
                      />
                    </div>
                  )}
                </div>

                {/* ROW 3: País, Código del país, Código de área, Celular */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                  <div className="sm:col-span-4">
                    <FormSelect
                      label="País"
                      value={formData.pais}
                      onChange={(e) => handleChange("pais", e.target.value)}
                      options={PAISES_OPTIONS}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <FormInput
                      label="Cód. País"
                      value={formData.codigoPais}
                      onChange={(e) => handleChange("codigoPais", e.target.value)}
                      placeholder="+54"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <FormInput
                      label="Código de área"
                      value={formData.codigoArea}
                      onChange={(e) => handleChange("codigoArea", e.target.value)}
                      placeholder="Código de área"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <FormInput
                      label="Celular"
                      required
                      value={formData.celular}
                      onChange={(e) => handleChange("celular", e.target.value)}
                      placeholder="Celular"
                      error={errors.celular}
                    />
                  </div>
                </div>

                {/* ROW 4: País (Residencia), Provincia / Estado, Localidad / Ciudad */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FormSelect
                    label="País (Residencia)"
                    value={formData.paisResidencia}
                    onChange={(e) => handleChange("paisResidencia", e.target.value)}
                    options={PAISES_OPTIONS}
                  />
                  <FormSelect
                    label="Provincia / Estado"
                    value={formData.provincia}
                    onChange={(e) => handleChange("provincia", e.target.value)}
                    options={PROVINCIAS_OPTIONS}
                  />
                  {formData.provincia === "Jujuy" ? (
                    <FormSelect
                      label="Localidad / Ciudad"
                      value={formData.localidad}
                      onChange={(e) => handleChange("localidad", e.target.value)}
                      options={LOCALIDADES_JUJUY}
                    />
                  ) : (
                    <FormInput
                      label="Localidad / Ciudad"
                      value={formData.localidad}
                      onChange={(e) => handleChange("localidad", e.target.value)}
                      placeholder="Seleccione o escriba una opción"
                    />
                  )}
                </div>

                {/* ROW 5: Correo electrónico, Rubro */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormInput
                    label="Correo electrónico"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Correo electrónico"
                    error={errors.email}
                  />
                  <FormSelect
                    label="Rubro"
                    value={formData.rubro}
                    onChange={(e) => handleChange("rubro", e.target.value)}
                    options={RUBROS_OPTIONS}
                  />
                </div>

                {/* BOTÓN SIGUIENTE PASO 1 */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span>Siguiente: Pago &amp; Transferencia</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* PASO 2: INFORMACIÓN DE PAGO Y TRANSFERENCIA */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#1DBECB] text-slate-950 font-bold text-xs">
                    2
                  </span>
                  <h3 className="text-base font-black uppercase tracking-wider text-[#0e8a95] dark:text-[#1DBECB] font-display">
                    Pago de la Entrada &amp; Carga de Comprobante
                  </h3>
                </div>

                {/* COMPONENTE GENÉRICO DE DATOS DE PAGO BANCARIO */}
                <DatosPagoCuenta />

                {/* ADJUNTAR COMPROBANTE Y NUMERO DE OPERACION */}
                <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-white/30 dark:bg-black/30 p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--t-text)]">
                    Comprobante de Transferencia
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormInput
                      label="N° de Operación / Comprobante"
                      required
                      value={formData.numeroTransaccion}
                      onChange={(e) => handleChange("numeroTransaccion", e.target.value)}
                      placeholder="Ej: TRX-884920491"
                      error={errors.numeroTransaccion}
                      hint="Código de referencia otorgado por tu banco o Mercado Pago"
                    />

                    {/* DROPZONE / CARGA DE ARCHIVO */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--t-text)]">
                        Adjuntar Comprobante (JPG, PNG, PDF) <span className="text-red-500">*</span>
                      </label>
                      <label
                        htmlFor="comprobante-input"
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                          errors.comprobanteUrl
                            ? "border-red-500 bg-red-500/5"
                            : formData.comprobanteNombre
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-[var(--t-card-border)] hover:border-[#1DBECB] bg-[var(--t-input-bg)]"
                        }`}
                      >
                        <input
                          id="comprobante-input"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        {formData.comprobanteNombre ? (
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <span>📄</span>
                            <span className="truncate max-w-[200px]">{formData.comprobanteNombre}</span>
                            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full">✓ Listo</span>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-[var(--t-text-muted)] space-y-0.5">
                            <span className="text-base block">📎</span>
                            <span className="font-semibold text-[var(--t-text)]">Hacé clic para subir tu comprobante</span>
                            <span className="text-[10px] block opacity-75">Soporta capturas de pantalla y PDFs</span>
                          </div>
                        )}
                      </label>
                      {errors.comprobanteUrl && (
                        <span className="text-xs text-red-500 font-medium">{errors.comprobanteUrl}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* BOTONES DE NAVEGACIÓN PASO 2 */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-6 py-3 text-xs font-bold text-[var(--t-text)] hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  >
                    <span>← Volver a Datos</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span>Siguiente: Revisar &amp; Enviar</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* PASO 3: REVISIÓN DE DATOS Y CONFIRMACIÓN */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center gap-2 border-b border-black/5 dark:border-white/10 pb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-xs">
                    3
                  </span>
                  <h3 className="text-base font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-display">
                    Revisión Final &amp; Confirmación
                  </h3>
                </div>

                {/* RESUMEN DE DATOS CARGADOS */}
                <div className="rounded-2xl border border-black/10 dark:border-white/15 bg-white/40 dark:bg-black/30 p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--t-text-muted)] block">
                        Nombre Completo
                      </span>
                      <span className="font-extrabold text-[var(--t-text)] text-sm">
                        {formData.nombre} {formData.apellido}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--t-text-muted)] block">
                        Documento / ID
                      </span>
                      <span className="font-bold text-[var(--t-text)]">{formData.documento}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--t-text-muted)] block">
                        Tipo de Visitante
                      </span>
                      <span className="font-bold text-[#7209B7] dark:text-[#A881FC]">
                        {formData.esEmpresario
                          ? `💼 Empresarial (${formData.empresa} - ${formData.cargo})`
                          : "👤 Visitante Particular / Público General"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--t-text-muted)] block">
                        Correo electrónico
                      </span>
                      <span className="font-bold text-[#1DBECB]">{formData.email}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--t-text-muted)] block">
                        Celular / Teléfono
                      </span>
                      <span className="font-bold text-[var(--t-text)]">
                        {formData.codigoPais} {formData.codigoArea} {formData.celular}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--t-text-muted)] block">
                        N° de Comprobante / Transacción
                      </span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {formData.numeroTransaccion} ({formData.comprobanteNombre || "Adjuntado"})
                      </span>
                    </div>
                  </div>
                </div>

                {/* TOGGLE / CHECKBOX */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aceptaNovedades}
                        onChange={(e) => handleChange("aceptaNovedades", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DBECB]"></div>
                    </div>
                    <span className="text-xs font-semibold text-[var(--t-text-muted)] group-hover:text-[var(--t-text)] transition-colors">
                      Acepto recibir información y novedades de ExpoJuy 2026
                    </span>
                  </label>
                </div>

                {/* BOTONES DE NAVEGACIÓN Y ENVÍO PASO 3 */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--t-card-border)] bg-[var(--t-surface)] px-6 py-3 text-xs font-bold text-[var(--t-text)] hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  >
                    <span>← Volver a Editar</span>
                  </button>

                  <button
                    type="submit"
                    className="group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <span>✓ CONFIRMAR Y SOLICITAR REVISIÓN</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
