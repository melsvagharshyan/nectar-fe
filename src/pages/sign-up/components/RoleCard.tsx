import { Button, Icon } from "../../../components/ui";
import type { Role } from "../../../demo/types";
import { cn } from "../../../utils/helpers";
import { ROLE_OPTIONS } from "../utils/constants";

export function RoleCard({
  role,
  checked,
  onSelect,
}: {
  role: Role;
  checked: boolean;
  onSelect: () => void;
}) {
  const { icon, title, tag, description } = ROLE_OPTIONS[role];
  return (
    <Button
      role="radio"
      aria-checked={checked}
      selected={checked}
      className={cn(
        "h-auto w-full justify-start gap-14 rounded-[12px] border-line bg-surface p-14 text-left whitespace-normal hover:not-disabled:border-accent-edge",
        checked && "border-accent shadow-[0_8px_24px_-12px_rgb(249_115_22/0.5)]",
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          "grid size-40 shrink-0 place-items-center rounded-[10px] bg-accent-tint text-accent transition-colors",
          checked &&
            "bg-[linear-gradient(135deg,#fdba74_0%,#f97316_55%,#c2410c_100%)] text-white",
        )}
      >
        <Icon name={icon} className="size-18" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-8">
          <span className="text-[14px] font-semibold text-ink">{title}</span>
          <span className="rounded-[4px] bg-fill px-6 py-1 text-[10px] font-semibold tracking-[0.3px] text-muted">
            {tag}
          </span>
        </span>
        <span className="mt-2 block text-[12px] font-normal text-muted">{description}</span>
      </span>
      <span
        className={cn(
          "grid size-20 shrink-0 place-items-center rounded-full border-2 border-line-strong text-white transition-colors",
          checked && "border-accent bg-accent",
        )}
      >
        {checked && <Icon name="check" className="size-12" />}
      </span>
    </Button>
  );
}
