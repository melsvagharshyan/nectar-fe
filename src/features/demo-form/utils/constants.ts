import type { SelectOption } from "../../../utils/types";
import type { DemoFormKind, DemoFormValues } from "./types";

export const KIND_TITLES: Record<DemoFormKind, string> = {
  client: "клиента",
  request: "запроса",
  company: "компании",
  employee: "сотрудника",
};

export const DEMO_FORM_ID = "record-form";

export const SAVED_MESSAGES: Record<DemoFormKind, [created: string, updated: string]> = {
  client: ["Клиент добавлен", "Клиент обновлён"],
  request: ["Запрос создан", "Запрос обновлён"],
  company: ["Компания добавлена", "Компания обновлена"],
  employee: ["Сотрудник добавлен", "Сотрудник обновлён"],
};

export const NOT_IMPORTANT = "Не важно";

export const REQUEST_ROOM_OPTIONS = ["Студия", "1", "2", "3", "4", "5+"];

export const REQUEST_GOALS = [
  "Проживание",
  "Для проживания",
  "Переезд семьи",
  "Аренда",
  "Рост стоимости",
  "Сохранение капитала",
  "Второе жильё",
  "Бизнес",
  "Инвестиции",
  "Другое",
];

export const REQUEST_TERMS = [
  "До месяца",
  "1–3 месяца",
  "В течение 3 месяцев",
  "3–6 месяцев",
  "Позже",
  "Не определён",
];

export const MARKET_OPTIONS = [NOT_IMPORTANT, "Новостройка", "Вторичный"];
export const REPAIR_OPTIONS = [NOT_IMPORTANT, "Готовый", "Без ремонта"];
export const FURNITURE_OPTIONS = [NOT_IMPORTANT, "С мебелью", "Без мебели"];
export const PARKING_OPTIONS = [NOT_IMPORTANT, "Нужна", "Не нужна"];
export const VIEW_OPTIONS = [NOT_IMPORTANT, "На город", "На горы", "Во двор"];

export const REQUEST_AMENITIES = [
  "Балкон",
  "Лифт",
  "Зелёный двор",
  "Рядом школа",
  "Тихая улица",
];

export const COMPANY_KIND_OPTIONS: SelectOption[] = [
  { value: "rf", label: "Российская компания" },
  { value: "am", label: "Армянская компания" },
];

export const EMPLOYEE_STATUS_OPTIONS = ["Активен", "Неактивен"];

export const EMPTY_DEMO_FORM_VALUES: DemoFormValues = {
  name: "",
  phone: "",
  email: "",
  employeeId: "",
  companyKind: "",
  website: "",
  active: "",
  type: "",
  budgetMin: "",
  budgetMax: "",
  areaMin: "",
  areaMax: "",
  rooms: "",
  goal: "",
  term: "",
  notes: "",
  market: "",
  repair: "",
  furniture: "",
  parking: "",
  view: "",
  districts: [],
  amenities: [],
};
