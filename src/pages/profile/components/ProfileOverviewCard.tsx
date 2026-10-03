import type { ReactNode } from "react";
import { FiBriefcase, FiCalendar, FiMail, FiPhone } from "react-icons/fi";
import type { UserDto } from "../../../api/auth-api-ts/types";
import { ROLE_NAMES } from "../../../utils/constants";
import { BOX } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";
import { formatMemberSince } from "../utils/helpers";
import { AvatarUploader } from "./AvatarUploader";

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-12 py-10">
      <span className="grid size-30 shrink-0 place-items-center rounded-[8px] bg-fill text-muted" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] text-faint">{label}</dt>
        <dd className="m-0 truncate text-[13px] font-medium text-ink" title={value}>
          {value}
        </dd>
      </div>
    </div>
  );
}

export function ProfileOverviewCard({ user }: { user: UserDto }) {
  const memberSince = formatMemberSince(user.createdAt);
  return (
    <section className={cn(BOX, "overflow-hidden p-0 lg:sticky lg:top-24")} aria-label="Обзор профиля">
      <div className="h-84 bg-[linear-gradient(120deg,#fff7ed_0%,#fed7aa_55%,#fdba74_100%)] dark:bg-[linear-gradient(120deg,#1e293b_0%,#7c2d12_100%)]" />
      <div className="-mt-56 px-22 pb-22">
        <AvatarUploader user={user}>
          <div className="text-center">
            <p className="text-[18px] font-semibold text-ink">{user.name}</p>
            <span className="mt-6 inline-flex rounded-full bg-accent-tint px-10 py-3 text-[11px] font-semibold text-accent-text">
              {ROLE_NAMES[user.role]}
            </span>
          </div>
        </AvatarUploader>
        <dl className="mt-18 divide-y divide-line border-t border-line">
          <DetailRow icon={<FiMail />} label="Email" value={user.email} />
          <DetailRow icon={<FiPhone />} label="Телефон" value={user.phone || "Не указан"} />
          {user.companyName && (
            <DetailRow icon={<FiBriefcase />} label="Компания" value={user.companyName} />
          )}
          {memberSince && (
            <DetailRow icon={<FiCalendar />} label="В Nectar с" value={memberSince} />
          )}
        </dl>
      </div>
    </section>
  );
}
