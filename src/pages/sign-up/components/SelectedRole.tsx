import { Button, Icon } from "../../../components/ui";
import type { Role } from "../../../demo/types";
import { ROLE_OPTIONS } from "../utils/constants";

export function SelectedRole({ role, onChange }: { role: Role; onChange: () => void }) {
  const { icon, title } = ROLE_OPTIONS[role];
  return (
    <div className="flex items-center gap-12 rounded-[12px] border border-accent-edge bg-accent-tint px-14 py-10">
      <span className="grid size-32 shrink-0 place-items-center rounded-[8px] bg-[linear-gradient(135deg,#fdba74_0%,#f97316_55%,#c2410c_100%)] text-white">
        <Icon name={icon} className="size-16" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] text-muted">Регистрируетесь как</span>
        <span className="block text-[14px] font-semibold text-ink">{title}</span>
      </span>
      <Button variant="link" className="text-[13px] font-semibold" onClick={onChange}>
        Изменить
      </Button>
    </div>
  );
}
