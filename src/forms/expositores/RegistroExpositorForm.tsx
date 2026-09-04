import { useState, FormEvent } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";

export default function RegistroExpositorForm() {
  const [formData, setFormData] = useState({
    cuit: "",
    razonSocial: "",
    rubro: "Minería",
    region: "Puna",
    superficieM2: "16",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-2xl shadow-sm transition-colors"
      style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
    >
      <h3 className="font-display font-bold text-lg" style={{ color: "var(--t-text)" }}>
        Solicitud de Stand / Registro Expositor
      </h3>

      {submitted ? (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 dark:text-green-400 p-4 rounded-xl text-center text-sm font-semibold">
          ✓ Solicitud de pre-inscripción recibida. Nos pondremos en contacto a la brevedad.
        </div>
      ) : (
        <>
          <FormInput
            label="CUIT de la Empresa"
            required
            value={formData.cuit}
            onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
            placeholder="30-XXXXXXX-X"
          />

          <FormInput
            label="Razón Social"
            required
            value={formData.razonSocial}
            onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
            placeholder="Empresa Ejemplo S.A."
          />

          <FormSelect
            label="Rubro Productivo"
            required
            value={formData.rubro}
            onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
            options={[
              { value: "Minería", label: "Minería & Litio" },
              { value: "Agroindustria", label: "Agroindustria & Alimentos" },
              { value: "Turismo", label: "Turismo & Servicios" },
              { value: "Textil", label: "Textil & Indumentaria" },
              { value: "Biodiversidad", label: "Biodiversidad & Ecoturismo" },
              { value: "Industria", label: "Industria Metal-mecánica" },
            ]}
          />

          <FormSelect
            label="Superficie Requerida"
            required
            value={formData.superficieM2}
            onChange={(e) => setFormData({ ...formData, superficieM2: e.target.value })}
            options={[
              { value: "16", label: "Stand Estándar — 16 m² (4x4m)" },
              { value: "32", label: "Stand Doble — 32 m² (8x4m)" },
              { value: "64", label: "Isla Corporativa — 64 m² (8x8m)" },
              { value: "120", label: "Pabellón Especial — +100 m²" },
            ]}
          />

          <button
            type="submit"
            className="w-full bg-[#7209B7] hover:bg-[#4D0080] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
          >
            Enviar Pre-inscripción
          </button>
        </>
      )}
    </form>
  );
}
