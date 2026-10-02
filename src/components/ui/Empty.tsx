import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";
import { Icon } from "./Icon";

export function Empty({
  text,
  className,
  children,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "empty flex flex-1 flex-col items-center justify-center gap-15 px-20 py-40 text-center text-muted",
        className,
      )}
    >
      <span className="flex size-56 items-center justify-center rounded-full bg-fill text-faint">
        <Icon name="search" className="size-26" />
      </span>
      <h3 className="text-[15px] font-semibold text-ink-soft">{text}</h3>
      {children}
    </div>
  );
}
