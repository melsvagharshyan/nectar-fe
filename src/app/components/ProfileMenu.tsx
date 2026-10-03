import { useState } from "react";
import { Dropdown, type MenuProps } from "antd";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { Avatar, Button } from "../../components/ui";
import type { Role } from "../../demo/types";
import { ROLE_NAMES } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import { navigate } from "../router";
import { PROFILE_MENU_KEYS, PROFILE_SCREEN, SETTINGS_LABELS } from "../utils/constants";
import { useCurrentUser, useSignOut } from "../utils/hooks";
import { ProfileMenuHeader } from "./ProfileMenuHeader";

export function ProfileMenu({ role }: { role: Role }) {
  const user = useCurrentUser();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);
  const name = user?.name ?? ROLE_NAMES[role];

  const items: MenuProps["items"] = [
    { key: PROFILE_MENU_KEYS.profile, icon: <FiUser />, label: "Мой профиль" },
    { key: PROFILE_MENU_KEYS.settings, icon: <FiSettings />, label: SETTINGS_LABELS[role] },
    { type: "divider" },
    { key: PROFILE_MENU_KEYS.signOut, icon: <FiLogOut />, label: "Выйти", danger: true },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setOpen(false);
    if (key === PROFILE_MENU_KEYS.profile) navigate(`/${role}/${PROFILE_SCREEN}`);
    else if (key === PROFILE_MENU_KEYS.settings) navigate(`/${role}/settings`);
    else if (key === PROFILE_MENU_KEYS.signOut) void signOut();
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={["click"]}
      placement="bottomRight"
      getPopupContainer={() => document.body}
      menu={{ items, onClick, className: "!rounded-none !shadow-none !p-6 [&_.ant-dropdown-menu-item]:!py-9" }}
      popupRender={(menu) => (
        <div className="w-280 overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_18px_40px_-20px_rgb(15_23_42/0.35)]">
          {user && <ProfileMenuHeader user={user} />}
          {menu}
        </div>
      )}
    >
      <Button
        variant="ghost"
        className="ml-4 gap-10 border-0 border-l border-nav-line py-2 pr-0 pl-14 text-left hover:not-disabled:bg-transparent max-xs:ml-0 max-xs:pl-6"
        aria-label="Меню профиля"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar
          name={name}
          src={user?.avatarUrl ?? undefined}
          className="size-36 ring-2 ring-nav-raised max-xs:size-28"
        />
        <span className="flex flex-col max-xl:hidden">
          <span className="text-[13px] font-semibold text-white">{name}</span>
          <span className="text-[11px] text-faint">{user?.companyName ?? ROLE_NAMES[role]}</span>
        </span>
        <FiChevronDown
          aria-hidden
          className={cn("text-faint transition-transform max-xs:hidden", open && "rotate-180")}
        />
      </Button>
    </Dropdown>
  );
}
