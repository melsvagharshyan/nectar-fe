import type { PropertyCardData } from "../../../components/property-card/types";
import type { TabItem } from "../../../components/ui";
import type { ColorGroup, KitFormValues, KitSectionLink, KitTab } from "./types";

export const KIT_SECTIONS: KitSectionLink[] = [
  { id: "colors", label: "Цвета" },
  { id: "typography", label: "Типографика" },
  { id: "buttons", label: "Кнопки" },
  { id: "forms", label: "Формы" },
  { id: "data", label: "Данные" },
  { id: "cards", label: "Карточки" },
  { id: "overlays", label: "Панели" },
  { id: "themes", label: "Темы" },
];

/** Swatch classes are literal so Tailwind can generate them. */
export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: "Поверхности",
    tokens: [
      { name: "page", variable: "--c-page", swatch: "bg-page" },
      { name: "surface", variable: "--c-surface", swatch: "bg-surface" },
      { name: "subtle", variable: "--c-subtle", swatch: "bg-subtle" },
      { name: "fill", variable: "--c-fill", swatch: "bg-fill" },
      { name: "line", variable: "--c-line", swatch: "bg-line" },
      { name: "nav", variable: "--c-nav", swatch: "bg-nav" },
    ],
  },
  {
    title: "Текст",
    tokens: [
      { name: "ink", variable: "--c-ink", swatch: "bg-ink" },
      { name: "ink-soft", variable: "--c-ink-soft", swatch: "bg-ink-soft" },
      { name: "muted", variable: "--c-muted", swatch: "bg-muted" },
      { name: "faint", variable: "--c-faint", swatch: "bg-faint" },
    ],
  },
  {
    title: "Акцент",
    tokens: [
      { name: "accent", variable: "--c-accent", swatch: "bg-accent" },
      { name: "accent-hover", variable: "--c-accent-hover", swatch: "bg-accent-hover" },
      { name: "accent-tint", variable: "--c-accent-tint", swatch: "bg-accent-tint" },
      { name: "accent-edge", variable: "--c-accent-edge", swatch: "bg-accent-edge" },
    ],
  },
  {
    title: "Статусы",
    tokens: [
      { name: "success", variable: "--c-success", swatch: "bg-success" },
      { name: "danger", variable: "--c-danger", swatch: "bg-danger" },
      { name: "warning", variable: "--c-warning", swatch: "bg-warning" },
      { name: "info", variable: "--c-info", swatch: "bg-info" },
    ],
  },
];

export const TYPE_SCALE = [
  { label: "H1 · 22 / Bold", className: "text-[22px] font-bold tracking-[-0.4px]" },
  { label: "H2 · 17 / Bold", className: "text-[17px] font-bold" },
  { label: "H3 · 15 / Semibold", className: "text-[15px] font-semibold" },
  { label: "Body · 14 / Regular", className: "text-[14px]" },
  { label: "Small · 12 / Muted", className: "text-[12px] text-muted" },
  { label: "Code · 12 / Mono", className: "font-code text-[12px] text-faint" },
];

export const BADGE_SAMPLES = [
  "active",
  "has_offers",
  "crm",
  "draft",
  "sold",
  "unavailable",
];

export const KIT_TABS: TabItem<KitTab>[] = [
  { id: "all", label: "Все предложения", count: 7 },
  { id: "selected", label: "Выбранные", count: 2 },
  { id: "rejected", label: "Не подходят", count: 0 },
];

export const PROPERTY_TYPE_OPTIONS = ["Квартира", "Дом", "Коммерция", "Участок"];

export const KIT_DISTRICTS = ["Арабкир", "Кентрон", "Давташен", "Аван"];

export const KIT_FORM_DEFAULTS: KitFormValues = {
  name: "",
  email: "",
  type: "",
  budget: "",
  districts: [],
  notes: "",
};

export const SAMPLE_PROPERTY: PropertyCardData = {
  id: "BR-4092",
  title: "3-комн. квартира",
  district: "Арабкир",
  price: 175000,
  area: 102,
  rooms: 3,
  floor: 11,
  floors: 16,
  availability: "active",
  description: "Чистая продажа, ключи на руках. Окна во двор.",
  media: ["/assets/source-offers/4092.jpg"],
  type: "Квартира",
};

export const SAMPLE_PROPERTY_ALT: PropertyCardData = {
  ...SAMPLE_PROPERTY,
  id: "BR-3810",
  title: "4-комн. квартира",
  district: "Центр",
  price: 210000,
  area: 120,
  rooms: 4,
  floor: 4,
  floors: 9,
  availability: "draft",
  media: ["/assets/source-offers/3810.jpg"],
};
