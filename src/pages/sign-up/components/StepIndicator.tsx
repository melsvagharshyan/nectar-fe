import { cn } from "../../../utils/helpers";
import { SIGN_UP_STEP_ORDER } from "../utils/constants";
import type { SignUpStep } from "../utils/types";

export function StepIndicator({ step }: { step: SignUpStep }) {
  const current = SIGN_UP_STEP_ORDER.indexOf(step);
  return (
    <div className="mb-20 flex items-center gap-10">
      <div className="flex flex-1 gap-6">
        {SIGN_UP_STEP_ORDER.map((item, index) => (
          <span
            key={item}
            className={cn(
              "block h-4 flex-1 rounded-[2px] bg-line transition-colors",
              index <= current && "bg-[linear-gradient(90deg,#fdba74,#f97316)]",
            )}
          />
        ))}
      </div>
      <span className="text-[12px] font-medium whitespace-nowrap text-muted">
        Шаг {current + 1} из {SIGN_UP_STEP_ORDER.length}
      </span>
    </div>
  );
}
