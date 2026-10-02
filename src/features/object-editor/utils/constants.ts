import type { PropertyFormValues } from "./types";

export const EDITOR_TYPE_OPTIONS = ["Квартира", "Дом", "Участок", "Коммерция"];
export const EDITOR_MARKET_OPTIONS = ["Вторичный", "Новостройка"];
export const EDITOR_ROOM_OPTIONS = ["Студия", "1", "2", "3", "4", "5"];

export const EDITOR_REPAIR_OPTIONS = [
  "Евроремонт",
  "Дизайнерский",
  "Капитальный",
  "Косметический",
  "Черновая",
];
export const EDITOR_FURNITURE_OPTIONS = [
  "Без мебели",
  "С мебелью",
  "Частично",
  "Только кухня",
];
export const EDITOR_PARKING_OPTIONS = [
  "Подземная",
  "Наземная",
  "Гараж",
  "Во дворе",
  "Нет",
];
export const EDITOR_BATHROOM_OPTIONS = [
  "2 (совм.)",
  "1 совм.",
  "1 разд.",
  "2+ санузла",
];
export const EDITOR_BALCONY_OPTIONS = [
  "Балкон",
  "Лоджия",
  "2 балкона",
  "Французский",
  "Нет",
];
export const EDITOR_BUILDING_OPTIONS = [
  "Монолит",
  "Каменный",
  "Панельный",
  "Кирпичный",
];
export const EDITOR_AMENITIES = [
  "Лифт",
  "Кондиционер",
  "Балкон",
  "Панорамный вид",
  "Индивидуальное отопление",
  "Посудомойка",
  "Закрытая территория",
  "Охрана / Консьерж",
  "Кладовая",
  "Солнечная сторона",
];

export const PREVIEW_FALLBACK_ID = "BR-NEW";

export const NOT_SPECIFIED = "Не указано";

export const SAVED_MESSAGES = {
  draft: "Черновик сохранён",
  published: "Объект опубликован в базе",
};

export const PREVIEW_CARD = "w-full";

export const PREVIEW_CARD_EMBEDDED = "w-400 max-w-full";

export const EMPTY_PROPERTY_FORM_VALUES: PropertyFormValues = {
  type: "",
  market: "",
  district: "",
  price: "",
  area: "",
  rooms: "",
  floor: "",
  floors: "",
  ceiling: "",
  description: "",
  privateNotes: "",
  internalAddress: "",
  location: "",
  repair: "",
  furniture: "",
  parking: "",
  bathroom: "",
  balcony: "",
  building: "",
  media: [],
  amenities: [],
};
