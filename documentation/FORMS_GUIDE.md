# Guía de Desarrollo de Formularios

## 📝 Estructura del Módulo de Formularios (`src/forms/`)

Todos los formularios de la aplicación deben ubicarse en `src/forms/<modulo>/` y utilizar los elementos atómicos reutilizables de `src/forms/common/`.

### Componentes de Formulario Disponibles:

- **`FormInput`**: Campo de texto, email, número o fecha.
- **`FormSelect`**: Selector desplegable con soporte para lista de opciones `{ value, label }`.
- **`FormTextArea`**: Campo multilínea para mensajes o descripciones largas.
- **`FormField`**: Wrapper genérico que agrega la etiqueta, el asterisco de campo obligatorio (`required`), sugerencias (`hint`) y mensajes de error estilizados (`error`).

---

## 🚀 Ejemplo: Cómo crear un nuevo formulario

```tsx
import { useState, FormEvent } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";

export default function MiNuevoFormulario() {
  const [formData, setFormData] = useState({ nombre: "", categoria: "General", detalle: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.nombre) {
      setError("El nombre es requerido");
      return;
    }
    // Procesar envío...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#1A1A2E] p-6 rounded-2xl">
      <FormInput
        label="Nombre"
        required
        error={error || undefined}
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />

      <FormSelect
        label="Categoría"
        value={formData.categoria}
        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        options={[
          { value: "General", label: "Consulta General" },
          { value: "Soporte", label: "Soporte Técnico" },
        ]}
      />

      <FormTextArea
        label="Detalle"
        value={formData.detalle}
        onChange={(e) => setFormData({ ...formData, detalle: e.target.value })}
      />

      <button type="submit" className="bg-[#1DBECB] text-white px-6 py-2 rounded-lg font-bold">
        Enviar
      </button>
    </form>
  );
}
```
