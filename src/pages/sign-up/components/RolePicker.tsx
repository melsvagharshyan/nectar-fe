import { Controller, useFormContext } from "react-hook-form";
import { ROLES } from "../../../utils/constants";
import type { SignUpFormValues } from "../utils/types";
import { RoleCard } from "./RoleCard";

export function RolePicker() {
  const { control } = useFormContext<SignUpFormValues>();
  return (
    <Controller
      control={control}
      name="role"
      render={({ field }) => (
        <div role="radiogroup" aria-label="Роль" className="flex flex-col gap-10">
          {ROLES.map((role) => (
            <RoleCard
              key={role}
              role={role}
              checked={field.value === role}
              onSelect={() => field.onChange(role)}
            />
          ))}
        </div>
      )}
    />
  );
}
