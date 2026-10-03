import { Button, Count, Icon, ThemeToggle } from "../../components/ui";
import type { Role } from "../../demo/types";
import { panel } from "../router";
import { useUnreadCount } from "../utils/hooks";
import { ProfileMenu } from "./ProfileMenu";

const NAV_ICON =
  "relative rounded-[10px] text-nav-text hover:not-disabled:bg-nav-raised hover:not-disabled:text-white max-xs:min-w-30 max-xs:p-5";

export function HeaderTools({ role }: { role: Role }) {
  const unread = useUnreadCount();
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
      <ProfileMenu role={role} />
    </div>
  );
}
