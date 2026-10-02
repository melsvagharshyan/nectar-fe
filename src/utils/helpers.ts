import { twMerge, type ClassNameValue } from "tailwind-merge";
import { getStoredUser, sessionCompanyId } from "../api/session";
import type { Actor, DemoState, Role } from "../demo/types";
import { FALLBACK_IMAGE, THEME_STORAGE_KEY } from "./constants";
import type { Theme } from "./types";

export const cn = (...classes: ClassNameValue[]) => twMerge(...classes);

export const money = (n: number) =>
  "$" + Math.round(Number.isFinite(n) ? n : 0).toLocaleString("ru-RU");

export const asset = (path: string) =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");

/** Uploaded photos are absolute Cloudinary URLs; other paths are app assets. */
export const mediaUrl = (src: string) =>
  /^https?:\/\//.test(src) ? src : asset(src);

export const coverImage = (media: string[], index = 0) =>
  media[index] ? mediaUrl(media[index]) : asset(FALLBACK_IMAGE);

export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions,
) => new Date(date).toLocaleDateString("ru-RU", options);

export function numeric(value: string): number {
  return value.trim() === "" ? 0 : Number(value.replace(",", "."));
}

export const cleanNumber = (n: number | null | undefined) =>
  n === null || n === undefined || n === 0 ? "" : String(n);

export const toggleValue = (values: string[], value: string) =>
  values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];

export const uniqueValues = <T>(values: T[]) => [...new Set(values)];

export const matchesSearch = (haystack: string, query: string) =>
  haystack.toLowerCase().includes(query.toLowerCase());

/** Company of the signed-in broker/partner ("" for admins). */
export const currentCompanyId = () => sessionCompanyId() ?? "";

/** Brokers see their own company; admins fall back to the first Russian broker company. */
export const brokerCompanyIdFor = (state: DemoState) =>
  sessionCompanyId() ??
  state.companies.find((c) => c.kind === "rf")?.id ??
  "";

export const companyIdForRole = (role: Role) =>
  role === "admin" ? undefined : sessionCompanyId();

export const roleFromHash = (): Role => getStoredUser()?.role ?? "broker";

export const actorForRole = (role: Role): Actor => ({
  role,
  companyId: companyIdForRole(role),
});

export const companyRequestCount = (state: DemoState, companyId: string) =>
  state.requests.filter((r) =>
    state.clients.some((c) => c.id === r.clientId && c.companyId === companyId),
  ).length;

export const companyOfferCount = (state: DemoState, companyId: string) =>
  state.offers.filter((o) => o.companyId === companyId).length;

export const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this session.
  }
}

export const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
