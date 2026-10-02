import { Avatar, Button, Count, Icon, ThemeToggle } from "../../components/ui";
import type { Role } from "../../demo/types";
import { ROLE_NAMES } from "../../utils/constants";
import { panel } from "../router";
import { useCurrentUser, useUnreadCount } from "../utils/hooks";

const NAV_ICON =
  "relative rounded-[10px] text-nav-text hover:not-disabled:bg-nav-raised hover:not-disabled:text-white max-xs:min-w-30 max-xs:p-5";

export function HeaderTools({ role }: { role: Role }) {
  const unread = useUnreadCount(role);
  const user = useCurrentUser();
  const name = user?.name ?? ROLE_NAMES[role];
  return (
    <div className="ml-auto flex items-center gap-8 max-2xl:gap-5 max-lg:gap-6 max-xs:gap-2">
      <ThemeToggle className={NAV_ICON} />
      <Button
        iconOnly
        className={NAV_ICON}
        aria-label={`Уведомления (${unread})`}
        onClick={() => panel("notifications")}
      >
        <Icon name="bell" />
        {unread > 0 && (
          <Count className="absolute -top-2 -right-2 min-w-18 bg-accent px-4 py-1 text-[10px] text-white">
            {unread}
          </Count>
        )}
      </Button>
      <Button
        variant="ghost"
        className="ml-4 gap-10 border-0 border-l border-nav-line py-2 pr-0 pl-14 text-left hover:not-disabled:bg-transparent max-xs:ml-0 max-xs:pl-6"
        aria-label="Меню профиля"
        onClick={() => panel("profile")}
      >
        <Avatar name={name} className="size-36 ring-2 ring-nav-raised max-xs:size-28" />
        <span className="flex flex-col max-xl:hidden">
          <span className="text-[13px] font-semibold text-white">{name}</span>
          <span className="text-[11px] text-faint">
            {user?.companyName ?? ROLE_NAMES[role]}
          </span>
        </span>
      </Button>
    </div>
  );
}
