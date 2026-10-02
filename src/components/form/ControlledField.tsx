import {
  Controller,
  type Control,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";
import type { SelectOption } from "../../utils/types";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { PasswordInput } from "./PasswordInput";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

export type ControlledFieldType =
  | "text"
  | "number"
  | "tel"
  | "email"
  | "password"
  | "textarea";

export function ControlledField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  options,
  placeholder,
  autoComplete,
}: {
  control: Control<T>;
  name: FieldPathByValue<T, string>;
  label: string;
  type?: ControlledFieldType;
  options?: (string | SelectOption)[];
  /** For selects: adds an empty-value option with this label. */
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const id = `form-${name}`;
        const error = fieldState.error?.message;
        const common = {
          id,
          ref: field.ref,
          name: field.name,
          value: String(field.value ?? ""),
          onBlur: field.onBlur,
          invalid: !!error,
          "aria-describedby": error ? `${id}-error` : undefined,
        };
        return (
          <FormField id={id} label={label} error={error}>
            {options ? (
              <Select
                {...common}
                options={options}
                placeholder={placeholder}
                onChange={field.onChange}
              />
            ) : type === "textarea" ? (
              <TextArea {...common} onChange={(e) => field.onChange(e.target.value)} />
            ) : type === "password" ? (
              <PasswordInput
                {...common}
                autoComplete={autoComplete}
                onChange={(e) => field.onChange(e.target.value)}
              />
            ) : (
              <Input
                {...common}
                type={type}
                autoComplete={autoComplete}
                step={type === "number" ? "any" : undefined}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          </FormField>
        );
      }}
    />
  );
}
