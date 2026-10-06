import type { IconName } from "../../components/ui";
import type { Role } from "../../demo/types";
import type { readRoute } from "../router";

export type Route = ReturnType<typeof readRoute>;

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
  /** Bootstrap counter shown next to the label when above zero. */
  badge?: "pendingRegistrations";
}

export interface ShellLocation {
  role: Role;
  validRole: boolean;
  screen: string | undefined;
}