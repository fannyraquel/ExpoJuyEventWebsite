import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}

export default function FormField({ label, error, required, children, hint }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--t-text)" }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && (
        <span className="text-xs" style={{ color: "var(--t-text-muted)" }}>
          {hint}
        </span>
      )}
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
}
