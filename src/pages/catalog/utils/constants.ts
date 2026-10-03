import type { Role } from "../../../demo/types";
import { ROOM_FILTER_OPTIONS } from "../../../utils/constants";
import type { CatalogFilters, CatalogStatus } from "./types";

export const CATALOG_STATUS_TABS: { id: CatalogStatus; label: string }[] = [
  { id: "", label: "Все объекты" },
  { id: "active", label: "Активные" },
  { id: "draft", label: "Черновики" },
  { id: "sold", label: "Продано / Архив" },
];

export const PROPERTY_ACTION_KEYS = {
  view: "view",
  edit: "edit",
} as const;

export const CATALOG_ROOM_OPTIONS = [
  { value: "", label: "Все" },
  ...ROOM_FILTER_OPTIONS.map((rooms) => ({
    value: rooms,
    label: rooms === "4" ? "4+" : rooms,
  })),
];

export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  search: "",
  district: "",
  company: "",
  price: "",
  area: "",
  rooms: "",
};

export const CATALOG_TITLES: Record<Role, string> = {
  broker: "База объектов",
  partner: "Управление базой объектов",
  admin: "Управление базой объектов",
};

export const CATALOG_SEARCH_LABELS: Record<Role, string> = {
  broker: "Поиск по ID, адресу...",
  partner: "Поиск по ID, адресу, собственнику...",
  admin: "Поиск по ID, адресу, собственнику...",
};
