import type { TabItem } from "../../../components/ui";
import type { AdminFilters } from "./types";

/** Pending offers: the offers table filtered by `review`, not a server view. */
export const OFFER_REVIEW_VIEW = "offer-review";

export const ADMIN_VIEW_TABS: TabItem<string>[] = [
  { id: "review", label: "Запросы на проверке" },
  { id: OFFER_REVIEW_VIEW, label: "Предложения на проверке" },
  { id: "", label: "Запросы" },
  { id: "offers", label: "Предложения" },
  { id: "crm", label: "Резервы · финальная проверка" },
  { id: "sold", label: "Завершённые" },
];

export const DEFAULT_ADMIN_FILTERS: AdminFilters = {
  search: "",
  company: "",
  partner: "",
  attention: false,
};
