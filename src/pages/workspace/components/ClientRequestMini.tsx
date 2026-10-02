import { Button, Icon } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import { cn } from "../../../utils/helpers";
import { requestBudget } from "../utils/helpers";
import { MINI_REQUEST, MINI_REQUEST_ACTIVE } from "../utils/styles";

export function ClientRequestMini({
  request: r,
  active,
  offerCount,
  onSelect,
}: {
  request: Request;
  active: boolean;
  offerCount: number;
  onSelect: () => void;
}) {
  return (
    <Button
      className={cn(MINI_REQUEST, active && MINI_REQUEST_ACTIVE)}
      active={active}
      onClick={onSelect}
    >
      <span
        className={cn(
          "flex size-30 shrink-0 items-center justify-center rounded-[8px] bg-fill text-muted",
          active && "bg-accent text-white",
        )}
      >
        <Icon name="home" className="size-15" />
      </span>
      <span className="grid min-w-0 flex-1 gap-2">
        <strong className="truncate text-[12px] font-semibold">
          {r.rooms ? `${r.rooms}-комн.` : r.type} · {r.districts.join(" / ")}
        </strong>
        <small className="flex gap-6 text-[11px]">
          <span className="font-code text-faint">{r.id.replace("CR-", "")}</span>
          <span className={cn("font-semibold text-ink-soft", active && "text-accent-text")}>
            {requestBudget(r)}
          </span>
        </small>
      </span>
      <span
        className={cn(
          "grid size-20 shrink-0 place-items-center rounded-full bg-fill text-[10px] font-bold text-muted",
          active && "bg-accent-tint text-accent-text",
        )}
      >
        {offerCount}
      </span>
    </Button>
  );
}
