import { useState, FormEvent } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";
import { empresasService } from "../../api/services/empresasService";

interface SolicitudB2BFormProps {
  empresaNombre: string;
  onSuccess?: () => void;
}

export default function SolicitudB2BForm({ empresaNombre, onSuccess }: SolicitudB2BFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    horario: "10:00",
    mensaje: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await empresasService.conectar(empresaNombre, formData);
    setSubmitting(false);

    if (res.success) {
      setFeedback(res.data?.message || "Solicitud de reunión enviada con éxito.");
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-2xl shadow-sm transition-colors"
      style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
    >
      <h3 className="font-display font-bold text-lg" style={{ color: "var(--t-text)" }}>
        Solicitar Reunión B2B con {empresaNombre}
      </h3>

      {feedback && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 dark:text-green-400 p-3 rounded-lg text-xs font-semibold">
          ✓ {feedback}
        </div>
      )}

      <FormInput
        label="Nombre Completo"
        required
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Ej: Lic. Juan Pérez"
      />

      <FormInput
        label="Empresa u Organización"
        required
        value={formData.empresa}
        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
        placeholder="Ej: Andes Tech S.A."
      />

      <FormInput
        label="Correo Electrónico"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="juan.perez@empresa.com"
      />

      <FormSelect
        label="Horario de Preferencia"
        required
        value={formData.horario}
        onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
        options={[
          { value: "09:00", label: "09:00 HS — Primer Turno" },
          { value: "11:30", label: "11:30 HS — Turno Mañana" },
          { value: "15:00", label: "15:00 HS — Turno Tarde" },
          { value: "17:30", label: "17:30 HS — Cierre de Jornada" },
        ]}
      />

      <FormTextArea
        label="Propuesta u Objetivo de la Reunión"
        value={formData.mensaje}
        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
        placeholder="Describí brevemente los temas o alianzas que te gustaría tratar..."
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#1DBECB] hover:bg-[#7209B7] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-md disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Confirmar Solicitud de Reunión"}
      </button>
    </form>
  );
}
