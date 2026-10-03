import type { PropertyType, RequestStage, Role } from "../demo/types";

export const FALLBACK_IMAGE = "/assets/placeholders/property-fallback.svg";

/** Also read by the inline script in index.html to avoid a theme flash on load. */
export const THEME_STORAGE_KEY = "nectar-theme";

export const ROLES: Role[] = ["broker", "partner", "admin"];

export const ROLE_NAMES: Record<Role, string> = {
  broker: "Российский брокер",
  partner: "Армянский брокер",
  admin: "Администратор",
};

export const ROLE_HOMES: Record<Role, string> = {
  broker: "/broker/workspace",
  partner: "/partner/requests",
  admin: "/admin/overview",
};

export const STATUS_LABELS: Record<string, string> = {
  created: "Создан",
  in_progress: "В работе",
  has_offers: "Есть предложения",
  crm: "Передано в CRM",
  sold: "Продано",
  active: "Активен",
  draft: "Черновик",
  sent: "Отправлено",
  interested: "Интерес",
  transferred: "Передано в CRM",
  closed: "Закрыто",
  unavailable: "Недоступно",
  returned: "Возвращено",
  demo_transferred: "Передано в CRM",
};

export const EVENT_NAMES: Record<string, string> = {
  offers_sent: "Отправлены предложения",
  interest: "Изменён интерес к объекту",
  transferred: "Передано в CRM",
  returned: "Запрос возвращён в работу",
  sold: "Сделка завершена",
  started: "Начат подбор",
};

export const DISTRICTS = [
  "Аван",
  "Арабкир",
  "Ачапняк",
  "Давташен",
  "Канакер-Зейтун",
  "Кентрон",
  "Малатия-Себастия",
  "Нор-Норк",
  "Норк-Мараш",
  "Нубарашен",
  "Шенгавит",
  "Эребуни",
];

export const PROPERTY_TYPES: PropertyType[] = [
  "Квартира",
  "Дом",
  "Участок",
  "Коммерция",
  "Студия",
  "Пентхаус",
];

export const APARTMENT_TYPES: string[] = ["Квартира", "Студия", "Пентхаус"];

export const TYPES_WITHOUT_ROOMS: string[] = ["Участок", "Коммерция"];

export const REQUEST_STAGES: RequestStage[] = [
  "created",
  "in_progress",
  "has_offers",
  "crm",
  "sold",
];

export const OPEN_REQUEST_STAGES: string[] = ["in_progress", "has_offers"];

export const ROOM_FILTER_OPTIONS = ["1", "2", "3", "4"];

export const SEARCH_DEBOUNCE_MS = 300;

export const SEARCH_KEYS = ["search", "query"] as const;

export const PAGE_SIZE = 20;
