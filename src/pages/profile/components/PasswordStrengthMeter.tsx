import { cn } from "../../../utils/helpers";
import { PASSWORD_STRENGTH_COLORS, PASSWORD_STRENGTH_LABELS } from "../utils/constants";
import { getPasswordStrength } from "../utils/helpers";

const SEGMENTS = [1, 2, 3, 4] as const;

export function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  if (!strength) return null;
  return (
    <div className="-mt-10 flex items-center gap-10" aria-live="polite">
      <div className="grid flex-1 grid-cols-4 gap-4">
        {SEGMENTS.map((segment) => (
          <span
            key={segment}
            className={cn(
              "block h-4 rounded-full transition-colors",
              segment <= strength ? PASSWORD_STRENGTH_COLORS[strength] : "bg-line",
            )}
          />
        ))}
      </div>
      <span className="w-110 text-right text-[11px] text-muted">
        {PASSWORD_STRENGTH_LABELS[strength]}
      </span>
    </div>
  );
}
