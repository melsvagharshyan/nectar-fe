import { expect, test as base, type APIRequestContext, type Page } from "@playwright/test";

/** Backend the dev server talks to (VITE_API_URL). */
export const API_URL = process.env.E2E_API_URL ?? "http://localhost:4000/api";

export const ADMIN = { email: "admin.demo@example.com", password: "demo12345" };

/** Admins have their own sign-in page and endpoint. */
const isAdmin = (creds: { email: string }) => creds.email === ADMIN.email;

export type SignUpRole = "broker" | "partner";

export interface Applicant {
  role: SignUpRole;
  name: string;
  email: string;
  password: string;
  companyName: string;
}

export function makeApplicant(role: SignUpRole, label: string): Applicant {
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  return {
    role,
    name: `E2E ${label} ${id}`,
    email: `e2e.${label.toLowerCase()}.${id}@example.com`,
    password: `Pass-${id}`,
    companyName: `E2E Realty ${id}`,
  };
}

/**
 * The public auth routes are rate limited per IP. Each test gets its own
 * X-Forwarded-For so the suite doesn't trip the limit (backend needs TRUST_PROXY).
 */
const randomIp = () =>
  `10.${[0, 0, 0].map(() => Math.floor(Math.random() * 250) + 1).join(".")}`;

export const test = base.extend<{ clientIp: string; api: APIRequestContext }>({
  clientIp: async ({}, use) => use(randomIp()),
  extraHTTPHeaders: async ({ clientIp }, use) => use({ "X-Forwarded-For": clientIp }),
  api: async ({ playwright, clientIp }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: `${API_URL}/`,
      extraHTTPHeaders: { "X-Forwarded-For": clientIp },
    });
    await use(ctx);
    await ctx.dispose();
  },
});

export { expect };

/** A separate API session (own cookie jar), e.g. for an admin. */
export async function apiSession(
  playwright: { request: { newContext: (o: object) => Promise<APIRequestContext> } },
  creds: { email: string; password: string },
) {
  const ctx = await playwright.request.newContext({
    baseURL: `${API_URL}/`,
    extraHTTPHeaders: { "X-Forwarded-For": randomIp() },
  });
  const res = await ctx.post(isAdmin(creds) ? "auth/admin/sign-in" : "auth/sign-in", {
    data: { email: creds.email, password: creds.password },
  });
  expect(res.status(), await res.text()).toBe(200);
  return ctx;
}

export async function signUpViaApi(api: APIRequestContext, a: Applicant) {
  const { password, ...rest } = a;
  const res = await api.post("auth/sign-up", { data: { ...rest, password } });
  expect(res.status(), await res.text()).toBe(202);
}

export async function findRegistration(admin: APIRequestContext, email: string) {
  const res = await admin.get("registration-requests", {
    params: { status: "pending", search: email },
  });
  expect(res.ok()).toBeTruthy();
  const page = await res.json();
  const item = page.items.find((r: { email: string }) => r.email === email);
  expect(item, `registration for ${email}`).toBeTruthy();
  return item as { id: string; email: string };
}

export async function fillSignUp(page: Page, a: Applicant) {
  await page.goto("/sign-up");
  const title = a.role === "broker" ? "Брокер в России" : "Брокер в Армении";
  await page.getByRole("radio", { name: new RegExp(title) }).click();
  await page.getByRole("button", { name: /Продолжить|Далее/ }).click();
  await page.getByLabel("Имя и фамилия").fill(a.name);
  await page.getByLabel("Email").fill(a.email);
  await page.getByLabel("Название агентства").fill(a.companyName);
  await page.getByLabel("Пароль", { exact: true }).fill(a.password);
  await page.getByLabel("Повторите пароль").fill(a.password);
}

export async function signIn(page: Page, creds: { email: string; password: string }) {
  const path = isAdmin(creds) ? "/admin" : "/sign-in";
  if (new URL(page.url(), "http://x").pathname !== path) await page.goto(path);
  await page.getByLabel("Email").fill(creds.email);
  await page.getByLabel("Пароль").fill(creds.password);
  await page.getByRole("button", { name: "Войти", exact: true }).click();
}

/** Signed in = left the auth screens. */
export async function expectSignedIn(page: Page) {
  await expect(page).not.toHaveURL(/\/(sign-(in|up)|admin)(\?|$)/, { timeout: 10_000 });
}

export const registrationsMenu = (page: Page) =>
  page
    .getByRole("navigation", { name: "Основная навигация" })
    .getByRole("button", { name: /^Заявки/ });

/** The innermost element holding both the applicant's name and the detail rows. */
export const registrationCard = (page: Page, name: string) =>
  page
    .locator("div")
    .filter({ has: page.getByRole("heading", { name, exact: true }) })
    .filter({ hasText: "Компания" })
    .last();
