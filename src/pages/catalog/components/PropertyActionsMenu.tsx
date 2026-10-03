import { useState } from "react";
import { Dropdown, type MenuProps } from "antd";
import { FiEdit2, FiEye, FiMoreHorizontal } from "react-icons/fi";
import { panel } from "../../../app/router";
import { Button } from "../../../components/ui";
import type { Role } from "../../../demo/types";
import { cn } from "../../../utils/helpers";
import { openPropertyEditor } from "../../../utils/navigation";
import { PROPERTY_ACTION_KEYS } from "../utils/constants";
import type { CatalogProperty } from "../utils/types";
import { ACTIONS_MENU, ACTIONS_TRIGGER, ACTIONS_TRIGGER_OPEN } from "../utils/styles";

export function PropertyActionsMenu({
  property,
  role,
}: {
  property: CatalogProperty;
  role: Role;
}) {
  const [open, setOpen] = useState(false);
  const editable = role !== "broker" && property.availability !== "sold";

  const items: MenuProps["items"] = [
    { key: PROPERTY_ACTION_KEYS.view, icon: <FiEye />, label: "Просмотр" },
    ...(editable
      ? [{ key: PROPERTY_ACTION_KEYS.edit, icon: <FiEdit2 />, label: "Редактировать" }]
      : []),
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setOpen(false);
    if (key === PROPERTY_ACTION_KEYS.view) panel("property", { object: property.id });
    else if (key === PROPERTY_ACTION_KEYS.edit) openPropertyEditor(role, property.id);
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={["click"]}
      placement="bottomRight"
      getPopupContainer={() => document.body}
      menu={{ items, onClick, className: ACTIONS_MENU }}
    >
      <Button
        variant="ghost"
        iconOnly
        className={cn(ACTIONS_TRIGGER, open && ACTIONS_TRIGGER_OPEN)}
        aria-label={`Действия с объектом ${property.id}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <FiMoreHorizontal className="size-18" />
      </Button>
    </Dropdown>
  );
}
