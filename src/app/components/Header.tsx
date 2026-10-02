import { Button, Logo } from "../../components/ui";
import type { Role } from "../../demo/types";
import { ROLE_HOMES } from "../../utils/constants";
import { navigate } from "../router";
import { HeaderNav } from "./HeaderNav";
import { HeaderTools } from "./HeaderTools";

export function Header({
  role,
  screen,
}: {
  role: Role;
  screen: string | undefined;
}) {
  return (
    <header className="z-20 flex h-64 shrink-0 items-center gap-28 bg-nav px-24 text-white max-2xl:px-16 lg:max-2xl:gap-14 max-lg:h-auto max-lg:min-h-62 max-lg:flex-wrap max-lg:gap-12 max-lg:py-10 max-xs:px-10">
      <Button
        variant="ghost"
        className="border-0 p-0 text-white hover:not-disabled:bg-transparent hover:not-disabled:text-white"
        aria-label="Главная кабинета"
        onClick={() => navigate(ROLE_HOMES[role])}
      >
        <Logo className="lg:max-xl:[&>span:last-child]:hidden max-xs:text-[15px]" />
      </Button>
      <HeaderNav role={role} screen={screen} />
      <HeaderTools role={role} />
    </header>
  );
}
