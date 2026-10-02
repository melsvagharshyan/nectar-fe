import type { ReactNode } from "react";
import { FIELD } from "../../utils/styles";

export function FormField({
  id,
  label,
  error,
  className = FIELD,
  children,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <small id={`${id}-error`} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}
