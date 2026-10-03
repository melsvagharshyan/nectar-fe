import type { SelectOption } from "../../../utils/types";
import type { PartnerRequestFilter, PartnerRequestFilters } from "./types";

export const REQUEST_FILTER_PARAM: Record<PartnerRequestFilter, "open" | "mine" | "all"> = {
  active: "open",
  mine: "mine",
  all: "all",
};

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

export const DRAFT_TOASTS = {
  added: {
    title: "Добавлено в подборку",
    description: "Отправьте подборку брокеру, когда будете готовы",
  },
  removed: {
    title: "Убрано из подборки",
    description: "Объект можно добавить снова в любой момент",
  },
};
