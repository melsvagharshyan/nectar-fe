import type { SelectOption } from "../../../utils/types";
import type { OfferFilters } from "./types";

export const WORKSPACE_STEPS = ["Клиенты", "Запросы", "Объекты"];

export const STAGE_FILTER_OPTIONS: SelectOption[] = [
  { value: "attention", label: "Требует внимания" },
  { value: "created", label: "Создан" },
  { value: "in_progress", label: "В работе" },
  { value: "has_offers", label: "Есть предложения" },
  { value: "crm", label: "Передано в CRM" },
  { value: "sold", label: "Продано" },
];

export const OFFER_SORT_OPTIONS: SelectOption[] = [
  { value: "match", label: "По совпадению" },
  { value: "asc", label: "Цена по возрастанию" },
  { value: "desc", label: "Цена по убыванию" },
];

export const EMPTY_CLIENT_FILTERS = { search: "", manager: "", stage: "" };

export const DEFAULT_OFFER_FILTERS: OfferFilters = {
  district: "",
  budget: "",
  rooms: "",
  sort: "match",
};
