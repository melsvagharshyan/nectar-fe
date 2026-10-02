import type { Request } from "../demo/types";
import { cn, money } from "../utils/helpers";

const VARIANTS = {
  default: {
    root: "gap-9",
    line: "",
    budget: "text-[17px] font-bold text-ink",
  },
  partner: {
    root: "gap-4",
    line: "text-[12px]",
    budget: "text-[12px] font-bold text-accent-text",
  },
};

export function RequestSummary({
  request: r,
  variant = "default",
}: {
  request: Omit<Request, "clientId">;
  variant?: keyof typeof VARIANTS;
}) {
  const styles = VARIANTS[variant];
  return (
    <div className={cn("flex flex-col text-[13px]", styles.root)}>
      <strong className={styles.line}>
        {r.rooms ? `${r.rooms}-комн. ` : ""}
        {r.type}
      </strong>
      <span className={styles.line}>{r.districts.join(" / ")}</span>
      <span className={cn("tabular-nums", styles.budget)}>
        до {money(r.budgetMax)}
      </span>
      <small>
        {r.areaMin}–{r.areaMax || "∞"} м² · {r.term}
      </small>
    </div>
  );
}
