import { InputHTMLAttributes } from "react";
import FormField from "./FormField";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function FormInput({ label, error, hint, required, className = "", ...props }: FormInputProps) {
  return (
    <FormField label={label} error={error} required={required} hint={hint}>
      <input
        className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:border-[#1DBECB] ${
          error ? "border-red-500" : ""
        } ${className}`}
        style={{
          background: "var(--t-input-bg)",
          borderColor: error ? "#EF4444" : "var(--t-input-border)",
          color: "var(--t-text)",
        }}
        {...props}
      />
    </FormField>
  );
}
