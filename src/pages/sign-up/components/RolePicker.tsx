import { Controller, useFormContext } from "react-hook-form";
import { SIGN_UP_ROLES } from "../utils/constants";
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
          {SIGN_UP_ROLES.map((role) => (
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
