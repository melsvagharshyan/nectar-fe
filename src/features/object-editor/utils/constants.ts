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

export const PREVIEW_CARD_EMBEDDED =
  "w-520 max-w-full shadow-[0_20px_50px_-30px_rgb(15_23_42/0.25)]";

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

export const MAX_IMAGE_MB = 8;

export const MEDIA_UPLOAD_HINT = {
  empty: `Перетащите файлы сюда или нажмите, чтобы выбрать. JPG, PNG, WEBP · до ${MAX_IMAGE_MB} МБ. Первое фото станет обложкой`,
  more: `Перетащите сюда или нажмите · JPG, PNG, WEBP до ${MAX_IMAGE_MB} МБ`,
};
