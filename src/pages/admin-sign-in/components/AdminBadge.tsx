import { FiShield } from "react-icons/fi";
import { HERO_ICON_CHIP } from "../../../components/auth-layout";
import { cn } from "../../../utils/helpers";
import { ADMIN_BADGE } from "../utils/constants";

export function AdminBadge() {
  return (
    <span className={ADMIN_BADGE}>
      <span className={cn(HERO_ICON_CHIP, "size-24 rounded-full")}>
        <FiShield className="size-13" />
      </span>
      Администратор
    </span>
  );
}
