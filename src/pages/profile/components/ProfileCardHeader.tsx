import type { ReactNode } from "react";
import { PROFILE_CARD_HEAD, PROFILE_CARD_ICON } from "../utils/constants";

export function ProfileCardHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className={PROFILE_CARD_HEAD}>
      <span className={PROFILE_CARD_ICON} aria-hidden>
        {icon}
      </span>
      <div>
        <h2 className="!mb-2 text-[15px] font-semibold">{title}</h2>
        <p className="text-[12px] text-muted">{description}</p>
      </div>
    </div>
  );
}
