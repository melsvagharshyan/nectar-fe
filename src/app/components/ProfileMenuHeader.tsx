import type { UserDto } from "../../api/auth-api-ts/types";
import { Avatar } from "../../components/ui";
import { ROLE_NAMES } from "../../utils/constants";

export function ProfileMenuHeader({ user }: { user: UserDto }) {
  return (
    <div className="flex items-center gap-12 border-b border-line px-14 pt-14 pb-12">
      <Avatar
        name={user.name}
        src={user.avatarUrl ?? undefined}
        className="size-44 text-[14px]"
      />
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold text-ink">{user.name}</p>
        <p className="truncate text-[12px] text-muted">{user.email}</p>
        <span className="mt-6 inline-flex rounded-full bg-accent-tint px-8 py-2 text-[11px] font-medium text-accent-text">
          {ROLE_NAMES[user.role]}
        </span>
      </div>
    </div>
  );
}
