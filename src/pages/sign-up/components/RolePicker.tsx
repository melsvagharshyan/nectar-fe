import { Controller, type Control } from "react-hook-form";
import { Button, Icon } from "../../../components/ui";
import { ROLE_NAMES, ROLES } from "../../../utils/constants";
import { cn } from "../../../utils/helpers";
import { ROLE_OPTIONS } from "../utils/constants";
import type { SignUpFormValues } from "../utils/types";

export function RolePicker({ control }: { control: Control<SignUpFormValues> }) {
  return (
    <Controller
      control={control}
      name="role"
      render={({ field }) => (
        <div role="radiogroup" aria-label="Роль" className="grid grid-cols-3 gap-10 max-xs:grid-cols-1">
          {ROLES.map((role) => {
            const { icon, description } = ROLE_OPTIONS[role];
            const checked = field.value === role;
            return (
              <Button
                key={role}
                role="radio"
                aria-checked={checked}
                selected={checked}
                className={cn(
                  "h-auto flex-col items-start gap-6 whitespace-normal p-14 text-left",
                  checked && "border-accent",
                )}
                onClick={() => field.onChange(role)}
              >
                <Icon name={icon} className="size-20 text-accent" />
                <span className="text-[13px] font-semibold">{ROLE_NAMES[role]}</span>
                <span className="text-[11px] font-normal text-muted">{description}</span>
              </Button>
            );
          })}
        </div>
      )}
    />
  );
}
