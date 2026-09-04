import { SelectHTMLAttributes } from "react";
import FormField from "./FormField";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  hint?: string;
}

export default function FormSelect({ label, options, error, hint, required, className = "", ...props }: FormSelectProps) {
  return (
    <FormField label={label} error={error} required={required} hint={hint}>
      <select
        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:border-[#1DBECB] ${
          error ? "border-red-500" : ""
        } ${className}`}
        style={{
          background: "var(--t-card)",
          borderColor: error ? "#EF4444" : "var(--t-input-border)",
          color: "var(--t-text)",
        }}
        {...props}
      >
        <option value="" disabled>
          Seleccionar opción...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: "var(--t-card)", color: "var(--t-text)" }}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
