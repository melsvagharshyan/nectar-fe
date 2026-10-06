import type { SelectOption } from "../../../utils/types";
import type { OfferFilters } from "./types";

export const WORKSPACE_STEPS = ["Клиенты", "Объекты"];

export const STAGE_FILTER_OPTIONS: SelectOption[] = [
  { value: "attention", label: "Требует внимания" },
  { value: "created", label: "Создан" },
  { value: "pending_review", label: "На проверке" },
  { value: "rejected", label: "Отклонён" },
  { value: "in_progress", label: "В работе" },
  { value: "has_offers", label: "Есть предложения" },
  { value: "crm", label: "Зарезервировано" },
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

export const OFFER_TOASTS = {
  booked: {
    title: "Объект забронирован",
    description: "Его можно будет зарезервировать",
  },
  unbooked: {
    title: "Бронь снята",
    description: "Объект остался в списке предложений",
  },
  rejected: {
    title: "Объект отклонён",
    description: "Партнёр увидит, что вариант не подошёл",
  },
  restored: {
    title: "Объект возвращён",
    description: "Он снова в списке предложений",
  },
};
