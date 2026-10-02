import { useId } from "react";
import { cn } from "../../utils/helpers";

/** "N" whose last stroke ends in a nectar drop, on a warm gradient tile. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const tile = `${id}-tile`;
  const gloss = `${id}-gloss`;
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("size-34 shrink-0 drop-shadow-[0_6px_14px_rgb(249_115_22/0.35)]", className)}
    >
      <defs>
        <linearGradient id={tile} x1="4" y1="2" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="0.45" stopColor="#F97316" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id={gloss} x1="20" y1="0" x2="20" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill={`url(#${tile})`} />
      <rect width="40" height="40" rx="12" fill={`url(#${gloss})`} />
      <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill="none" stroke="#fff" strokeOpacity="0.18" />
      <path
        d="M12.5 28.5V13.5L27.5 26.5V18.5"
        fill="none"
        stroke="#fff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.5 6.3c0 0-3.1 3.6-3.1 5.7a3.1 3.1 0 0 0 6.2 0c0-2.1-3.1-5.7-3.1-5.7Z"
        fill="#fff"
      />
    </svg>
  );
}
