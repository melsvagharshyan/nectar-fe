import { Button, Icon } from "../../components/ui";
import type { Role } from "../../demo/types";
import { cn } from "../../utils/helpers";
import { navigate, panel } from "../router";
import { DISABLED_MENU_ITEMS, ROLE_MENUS } from "../utils/constants";

const NAV_TAB =
  "h-38 rounded-[10px] border-0 bg-transparent px-14 py-0 text-[13px] whitespace-nowrap text-nav-text hover:not-disabled:bg-nav-raised hover:not-disabled:text-white disabled:opacity-40 lg:max-xl:text-[12px] lg:max-2xl:px-10 max-lg:text-[12px]";

const NAV_TAB_ACTIVE =
  "bg-nav-raised font-semibold text-white [&_.icon]:text-accent";

export function HeaderNav({
  role,
  screen,
}: {
  role: Role;
  screen: string | undefined;
}) {
  return (
    <nav
      className="flex items-center gap-4 max-lg:order-3 max-lg:w-full max-lg:overflow-x-auto"
      aria-label="Основная навигация"
    >
      {ROLE_MENUS[role].map(({ id, label, icon }) => (
        <Button
          key={id}
          className={cn(NAV_TAB, screen === id && NAV_TAB_ACTIVE)}
          aria-current={screen === id ? "page" : undefined}
          disabled={DISABLED_MENU_ITEMS.includes(id)}
          onClick={() =>
            id === "clients" ? panel("directory") : navigate(`/${role}/${id}`)
          }
        >
          <Icon name={icon} className="size-17 lg:max-xl:hidden" />
          {label}
        </Button>
      ))}
    </nav>
  );
}
