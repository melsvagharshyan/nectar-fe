import type { HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

export const COUNT =
  "count min-w-22 rounded-full bg-fill px-7 py-2 text-center text-[11px] font-semibold text-muted";

export function Count({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn(COUNT, className)} {...props} />;
}
