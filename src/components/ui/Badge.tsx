import { STATUS_LABELS } from "../../utils/constants";
import { cn } from "../../utils/helpers";

const POSITIVE = "text-success bg-success-tint";
const TRANSFER = "text-accent-text bg-accent-tint";
const NEUTRAL = "text-muted bg-fill";

const BADGE_TONES: Record<string, string> = {
  has_offers: POSITIVE,
  interested: POSITIVE,
  active: POSITIVE,
  crm: TRANSFER,
  transferred: TRANSFER,
  demo_transferred: TRANSFER,
  sold: NEUTRAL,
  closed: NEUTRAL,
  unavailable: "text-danger bg-danger-tint",
};

export function Badge({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "badge inline-flex items-center rounded-full px-8 py-3 text-[11px] font-semibold whitespace-nowrap",
        BADGE_TONES[value] ?? "text-info bg-info-tint",
        className,
      )}
    >
      {STATUS_LABELS[value] || value}
    </span>
  );
}
