import { brandConfig } from "../../app/brandConfig";
import { cn } from "../../utils/helpers";
import { LogoMark } from "./LogoMark";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-10 text-[18px] font-bold tracking-[-0.4px] whitespace-nowrap",
        className,
      )}
    >
      <LogoMark />
      <span>{brandConfig.name}</span>
    </span>
  );
}
