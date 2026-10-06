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
  pending_review: "На проверке",
  rejected: "Отклонён",
  in_progress: "В работе",
  has_offers: "Есть предложения",
  crm: "Зарезервировано",
  sold: "Продано",
  active: "Активен",
  draft: "Черновик",
  sent: "Отправлено",
  interested: "Интерес",
  transferred: "Зарезервировано",
  closed: "Закрыто",
  unavailable: "Недоступно",
  returned: "Возвращено",
  demo_transferred: "Зарезервировано",
};

export const EVENT_NAMES: Record<string, string> = {
  offers_sent: "Предложение одобрено администратором",
  interest: "Изменён интерес к объекту",
  transferred: "Объекты зарезервированы",
  returned: "Резерв возвращён в работу",
  sold: "Сделка завершена",
  started: "Запрос одобрен, начат подбор",
  request_submitted: "Запрос отправлен на проверку",
  request_approved: "Запрос снова одобрен после изменений",
  request_rejected: "Запрос отклонён администратором",
  offer_submitted: "Предложение отправлено на проверку",
  offer_rejected: "Предложение отклонено администратором",
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
  "pending_review",
  "rejected",
  "in_progress",
  "has_offers",
  "crm",
  "sold",
];

export const OPEN_REQUEST_STAGES: string[] = ["in_progress", "has_offers"];

/** Stages a broker may send for admin review. */
export const SUBMITTABLE_REQUEST_STAGES: string[] = ["created", "rejected"];

export const ROOM_FILTER_OPTIONS = ["1", "2", "3", "4"];

export const SEARCH_DEBOUNCE_MS = 300;

export const SEARCH_KEYS = ["search", "query"] as const;

export const PAGE_SIZE = 20;
