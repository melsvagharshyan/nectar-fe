import { theme as antdTheme, type ThemeConfig } from "antd";
import type { DemoAction, Role } from "../../demo/types";
import type { Theme } from "../../utils/types";
import type { MenuItem } from "./types";

const ANTD_BASE: ThemeConfig = {
  hashed: false,
  token: {
    colorPrimary: "#f97316",
    colorLink: "#ea580c",
    fontFamily: '"Inter Variable", Inter, system-ui, sans-serif',
    fontSize: 13,
    borderRadius: 10,
    controlHeight: 38,
  },
  components: {
    Table: { headerSplitColor: "transparent", cellPaddingBlock: 14, cellPaddingInline: 16 },
    Select: { optionSelectedFontWeight: 600 },
  },
};

export const ANTD_THEMES: Record<Theme, ThemeConfig> = {
  light: {
    ...ANTD_BASE,
    cssVar: { key: "nectar-light" },
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      ...ANTD_BASE.token,
      colorBgContainer: "#f8fafc",
      colorBgElevated: "#ffffff",
      colorBorder: "#e2e8f0",
      colorBorderSecondary: "#e2e8f0",
      colorText: "#0f172a",
      colorTextPlaceholder: "#94a3b8",
      colorError: "#dc2626",
    },
    components: {
      ...ANTD_BASE.components,
      Table: {
        ...ANTD_BASE.components?.Table,
        colorBgContainer: "#ffffff",
        headerBg: "#f8fafc",
        headerColor: "#64748b",
        rowHoverBg: "#f8fafc",
      },
    },
  },
  dark: {
    ...ANTD_BASE,
    cssVar: { key: "nectar-dark" },
    algorithm: antdTheme.darkAlgorithm,
    token: {
      ...ANTD_BASE.token,
      colorBgContainer: "#0f1729",
      colorBgElevated: "#111a2e",
      colorBorder: "#1f2a3d",
      colorBorderSecondary: "#1f2a3d",
      colorText: "#f1f5f9",
      colorTextPlaceholder: "#64748b",
      colorError: "#f87171",
      colorLink: "#fb923c",
    },
    components: {
      ...ANTD_BASE.components,
      Table: {
        ...ANTD_BASE.components?.Table,
        colorBgContainer: "#111a2e",
        headerBg: "#0f1729",
        headerColor: "#94a3b8",
        rowHoverBg: "#0f1729",
      },
    },
  },
};

export const ANTD_NAV_THEME: ThemeConfig = {
  ...ANTD_THEMES.dark,
  cssVar: { key: "nectar-nav" },
  token: {
    ...ANTD_THEMES.dark.token,
    colorBgContainer: "#1e293b",
    colorBorder: "#1e293b",
    controlHeightSM: 32,
    fontSize: 12,
  },
};

export const ROLE_MENUS: Record<Role, MenuItem[]> = {
  broker: [
    { id: "workspace", label: "Главная", icon: "home" },
    { id: "clients", label: "База клиентов", icon: "users" },
    { id: "objects", label: "Объекты из предложений", icon: "home" },
    { id: "knowledge", label: "База знаний", icon: "book" },
    { id: "analytics", label: "Аналитика", icon: "chart" },
  ],
  partner: [
    { id: "requests", label: "Запросы", icon: "users" },
    { id: "objects", label: "Мои объекты", icon: "home" },
    { id: "offers", label: "Предложения", icon: "list" },
  ],
  admin: [
    { id: "overview", label: "Обзор", icon: "chart" },
    { id: "registrations", label: "Заявки", icon: "users", badge: "pendingRegistrations" },
    { id: "companies", label: "Компании", icon: "users" },
    { id: "workspace", label: "Запросы и сделки", icon: "list" },
    { id: "objects", label: "Объекты", icon: "home" },
    { id: "analytics", label: "Аналитика", icon: "chart" },
  ],
};

export const DISABLED_MENU_ITEMS = ["knowledge"];

export const PROFILE_SCREEN = "profile";

export const PROFILE_MENU_KEYS = {
  profile: "profile",
  settings: "settings",
  signOut: "sign-out",
} as const;

export const SETTINGS_LABELS: Record<Role, string> = {
  broker: "Настройки компании",
  partner: "Настройки компании",
  admin: "Настройки",
};

export const ACTION_ERROR_TITLES: Record<DemoAction["type"], string> = {
  READ_EVENT: "Не удалось отметить уведомление",
  READ_ALL_EVENTS: "Не удалось отметить уведомления",
  INTEREST: "Не удалось изменить бронь",
  REJECT: "Не удалось отклонить объект",
  RESTORE: "Не удалось вернуть объект",
  DRAFT_TOGGLE: "Не удалось изменить подборку",
  SEND_OFFERS: "Не удалось отправить предложения",
  TRANSFER: "Не удалось зарезервировать объекты",
  RETURN: "Не удалось вернуть запрос в работу",
  SELL: "Не удалось завершить сделку",
  SUBMIT: "Не удалось отправить запрос на проверку",
  APPROVE_REQUEST: "Не удалось одобрить запрос",
  REJECT_REQUEST: "Не удалось отклонить запрос",
  APPROVE_OFFER: "Не удалось одобрить предложение",
  DECLINE_OFFER: "Не удалось отклонить предложение",
  RESUBMIT_OFFER: "Не удалось отправить предложение повторно",
};

export const AUTH_ROUTES = {
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

export const PUBLIC_ROUTES: string[] = [
  AUTH_ROUTES.signIn,
  AUTH_ROUTES.signUp,
  "/ui-kit",
];
