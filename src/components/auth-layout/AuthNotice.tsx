import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";
import { Icon, type IconName } from "../ui";

export type AuthNoticeTone = "info" | "success" | "danger";

const TONES: Record<AuthNoticeTone, { box: string; icon: IconName }> = {
  info: { box: "border-info/30 bg-info-tint text-info", icon: "clock" },
  success: { box: "border-success/30 bg-success-tint text-success", icon: "check" },
  danger: { box: "border-danger/30 bg-danger-tint text-danger", icon: "close" },
};

/** Inline status message on the auth screens (application state, blocked account). */
export function AuthNotice({
  tone,
  title,
  children,
  className,
}: {
  tone: AuthNoticeTone;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  const { box, icon } = TONES[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex gap-12 rounded-[12px] border px-14 py-12", box, className)}
    >
      <span className="mt-1 grid size-20 shrink-0 place-items-center rounded-full bg-current/15">
        <Icon name={icon} className="size-12" />
      </span>
      <div className="min-w-0 flex-1">
        <strong className="block text-[14px] font-semibold">{title}</strong>
        {children && (
          <div className="mt-4 text-[13px] break-words whitespace-pre-line text-ink">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
