import type { DemoEvent } from "../../demo/types";
import type { CursorPage } from "../pagination";

export type NotificationFilter = "all" | "new" | "crm" | "review";

export interface NotificationsArgs {
  filter?: NotificationFilter;
  limit?: number;
}

export type NotificationItem = DemoEvent & { read: boolean };

export type NotificationsPage = CursorPage<NotificationItem>;
