import type { TabItem } from "../../../components/ui";
import type { AdminFilters } from "./types";

export const ADMIN_VIEW_TABS: TabItem<string>[] = [
  { id: "", label: "Запросы" },
  { id: "offers", label: "Предложения" },
  { id: "crm", label: "Передано в CRM" },
  { id: "sold", label: "Завершённые" },
];

export const DEFAULT_ADMIN_FILTERS: AdminFilters = {
  search: "",
  company: "",
  partner: "",
  attention: false,
};
