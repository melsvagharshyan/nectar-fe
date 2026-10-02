import type { SelectOption } from "../../../utils/types";
import type { PartnerRequestFilters } from "./types";

export const PARTNER_STEPS = ["Запросы", "Подборка", "Объекты"];

export const PARTNER_REQUEST_FILTER_OPTIONS: SelectOption[] = [
  { value: "active", label: "Активные" },
  { value: "mine", label: "С моим предложением" },
  { value: "all", label: "Все доступные" },
];

export const DEFAULT_PARTNER_FILTERS: PartnerRequestFilters = {
  search: "",
  filter: "active",
};

export const RESET_PARTNER_FILTERS: PartnerRequestFilters = {
  search: "",
  filter: "all",
};
