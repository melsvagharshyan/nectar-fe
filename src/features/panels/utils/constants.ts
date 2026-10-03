import type { TabItem } from "../../../components/ui";
import type { DirectoryTab, NotificationFilter } from "./types";

export const FORM_PANEL_SUFFIX = "-form";

export const NOTIFICATION_FILTERS: TabItem<NotificationFilter>[] = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "attention", label: "Требует внимания" },
  { id: "crm", label: "CRM / результат" },
];

export const DIRECTORY_TABS: TabItem<DirectoryTab>[] = [
  { id: "clients", label: "Клиенты" },
  { id: "requests", label: "Запросы" },
];

export const THUMBS = "my-12 flex gap-8";
export const THUMB_BUTTON = "overflow-hidden p-0";
export const THUMB = "h-58 w-84 object-cover";
