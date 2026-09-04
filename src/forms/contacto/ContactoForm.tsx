import { useState, FormEvent } from "react";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";

export default function ContactoForm() {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 shadow-sm space-y-3 transition-colors"
      style={{ background: "var(--t-surface)", border: "1px solid var(--t-card-border)" }}
    >
      <h3 className="font-display font-bold text-base" style={{ color: "var(--t-text)" }}>
        Contacto Institucional
      </h3>
      {sent ? (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 dark:text-green-400 p-3 rounded-lg text-xs font-semibold">
          ✓ Mensaje enviado. Gracias por comunicarte con la organización.
        </div>
      ) : (
        <>
          <FormInput
            label="Tu Nombre"
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="María González"
          />
          <FormInput
            label="Tu Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="maria@correo.com"
          />
          <FormTextArea
            label="Mensaje"
            required
            value={formData.mensaje}
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            placeholder="Escribí tu consulta..."
          />
          <button
            type="submit"
            className="w-full bg-[#1DBECB] hover:bg-[#7209B7] text-white py-2.5 rounded-xl font-bold text-xs transition-colors"
          >
            Enviar Consulta
          </button>
        </>
      )}
    </form>
  );
}
