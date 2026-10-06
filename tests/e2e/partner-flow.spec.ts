import type { APIRequestContext, APIResponse, Page } from "@playwright/test";
import {
  ADMIN,
  API_URL,
  apiSession,
  expect,
  expectSignedIn,
  findRegistration,
  makeApplicant,
  signIn,
  signUpViaApi,
  test,
  type Applicant,
} from "./helpers";

/**
 * The Armenian broker ("partner") flow end to end: property base, selection for an
 * approved request, offer review (decline → resubmit → approve), re-review after an
 * edit, and the result once the Russian broker reserves and the admin sells.
 * Admin and broker reactions go through the API; everything the partner does is UI.
 */

/** Any Cloudinary delivery URL passes the backend's media check; nothing is uploaded. */
const PHOTO_URL = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
const PNG = { name: "flat.png", mimeType: "image/png", buffer: Buffer.from("89504e470d0a1a0a", "hex") };

const CLIENT = { name: "Секретный Клиентов", phone: "+7 900 111-22-33", email: "secret.client@example.ru" };
const DECLINE_REASON = "Добавьте фото кухни";

let admin: APIRequestContext;
let broker: APIRequestContext;
let partner: Applicant;
let requestId: string;
/** Matches the request (Кентрон, ≤ $200k), published through the UI. */
let offeredId: string;
/** Outside the request's districts; created through the API. */
let otherId: string;
let offerId: string;

test.describe.configure({ mode: "serial" });
// At 1280×720 the bottom-right toasts cover the property cards' buttons.
test.use({ viewport: { width: 1600, height: 1000 } });

test.beforeAll(async ({ playwright }) => {
  admin = await apiSession(playwright, ADMIN);
  const brokerAccount = makeApplicant("broker", "PFBroker");
  partner = makeApplicant("partner", "PFPartner");
  for (const a of [brokerAccount, partner]) {
    const anon = await playwright.request.newContext({
      baseURL: `${API_URL}/`,
      extraHTTPHeaders: { "X-Forwarded-For": `10.200.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250) + 1}` },
    });
    await signUpViaApi(anon, a);
    await anon.dispose();
    const reg = await findRegistration(admin, a.email);
    await ok(admin.post(`registration-requests/${reg.id}/approve`));
  }

  broker = await apiSession(playwright, brokerAccount);
  const boot = await json(broker.get("bootstrap"));
  await ok(broker.post("clients", { data: { ...CLIENT, employeeId: boot.employees[0].id } }));
  const clientId = (await json(broker.get("clients", { params: { limit: 5 } }))).items[0].id;
  await ok(
    broker.post(`clients/${clientId}/requests`, {
      data: { type: "Квартира", districts: ["Кентрон"], budgetMin: 50_000, budgetMax: 200_000, areaMin: 40, areaMax: 120, rooms: 2 },
    }),
  );
  requestId = (await json(broker.get("requests", { params: { clientId, limit: 5 } }))).items[0].id;
  await ok(broker.post(`requests/${requestId}/submit`));
  await ok(admin.post(`requests/${requestId}/approve`));
});

test.afterAll(async () => {
  await admin?.dispose();
  await broker?.dispose();
});

async function ok(res: Promise<APIResponse>) {
  const r = await res;
  expect(r.ok(), `${r.url()} → ${r.status()} ${await r.text()}`).toBeTruthy();
  return r;
}
const json = async (res: Promise<APIResponse>) => (await ok(res)).json();

/** Signs the partner in and fails the test on any API error or page crash. */
async function openAsPartner(page: Page) {
  const failures: string[] = [];
  page.on("response", (r) => {
    if (r.url().includes("/api/") && r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
  });
  page.on("pageerror", (e) => failures.push(`pageerror: ${e.message}`));
  await page.route("**/api/uploads", (route) => route.fulfill({ json: { url: PHOTO_URL } }));
  await signIn(page, partner);
  await expectSignedIn(page);
  await expect(page).toHaveURL(/\/partner\/requests/);
  return failures;
}

const nav = (page: Page, name: string) =>
  page.getByRole("navigation", { name: "Основная навигация" }).getByRole("button", { name, exact: true });

async function openRequest(page: Page) {
  await page.getByLabel("ID или район запроса").fill(requestId);
  await page.getByRole("button", { name: new RegExp(`^${requestId}`) }).click();
  await expect(page.getByRole("heading", { name: `Подборка по запросу ${requestId}` })).toBeVisible();
}

const propertyCard = (page: Page, id: string) =>
  page.getByRole("article").filter({ has: page.getByRole("button", { name: `Подробнее ${id}` }) });

const fieldError = (page: Page, text: string) => page.getByRole("alert").filter({ hasText: text });

const offerRow = (page: Page) => page.getByRole("row").filter({ hasText: requestId });

async function offersTab(page: Page, tab: string) {
  await nav(page, "Предложения").click();
  await expect(page.getByRole("heading", { name: "Предложения", level: 1 })).toBeVisible();
  await page.getByRole("main").getByRole("button", { name: tab, exact: true }).click();
}

async function pickDistrict(page: Page, district: string) {
  await page.getByRole("combobox", { name: "Район" }).click();
  await page.locator(`.ant-select-item-option[title="${district}"]`).click();
}

async function currentOffer() {
  const page = await json(admin.get("offers/table", { params: { search: requestId } }));
  return page.items.find((o: { propertyId: string }) => o.propertyId === offeredId);
}

test("sees the approved request but never the client's contacts", async ({ page }) => {
  const failures = await openAsPartner(page);
  await openRequest(page);
  const main = page.getByRole("main");
  await expect(main.getByRole("button", { name: new RegExp(`^${requestId}`) })).toContainText(/Клиент #\d+/);
  await expect(main).toContainText("Кентрон");
  await expect(main).toContainText("$50 000 — $200 000");
  for (const secret of Object.values(CLIENT)) await expect(main).not.toContainText(secret);

  // The request API slice is redacted too, not just the UI.
  const body = await (await ok(page.request.get(`${API_URL}/requests/${requestId}`))).text();
  for (const secret of Object.values(CLIENT)) expect(body).not.toContain(secret);

  // Empty property base: nothing to offer yet.
  await expect(page.getByRole("button", { name: "Отправить КП (0)" })).toBeDisabled();
  expect(failures).toEqual([]);
});

test("property editor validates, saves drafts and publishes", async ({ page }) => {
  const failures = await openAsPartner(page);
  await nav(page, "Мои объекты").click();
  await expect(page.getByRole("heading", { name: "Управление базой объектов" })).toBeVisible();
  await expect(page.getByText("Показано объектов: 0 из 0")).toBeVisible();

  // Publishing an empty form is blocked with field errors.
  await page.getByRole("button", { name: "Добавить объект" }).click();
  await expect(page).toHaveURL(/\/partner\/objects\/new/);
  await page.getByRole("button", { name: "Опубликовать в базу" }).click();
  await expect(fieldError(page, "Выберите район")).toBeVisible();
  await expect(fieldError(page, "Загрузите хотя бы одно фото")).toBeVisible();
  await expect(fieldError(page, "Добавьте краткое публичное описание")).toBeVisible();
  await expect(page).toHaveURL(/\/partner\/objects\/new/);

  // Floor above the building height is rejected.
  await page.getByLabel("Этаж", { exact: true }).fill("9");
  await page.getByLabel("Этажность").fill("5");
  await page.getByRole("button", { name: "Сохранить черновик" }).click();
  await expect(fieldError(page, "Этаж не может быть выше этажности")).toBeVisible();

  // A draft needs no photo or description.
  await page.getByLabel("Цена ($)").fill("90000");
  await page.getByLabel("Площадь (м²)").fill("50");
  await page.getByLabel("Этаж", { exact: true }).fill("3");
  await pickDistrict(page, "Кентрон");
  await page.getByRole("button", { name: "Сохранить черновик" }).click();
  await expect(page).toHaveURL(/\/partner\/objects(\?|$)/);
  await expect(page.getByRole("button", { name: "Черновики 1" })).toBeVisible();

  // Published listing that matches the request.
  await page.getByRole("button", { name: "Добавить объект" }).click();
  await page.getByLabel("Цена ($)").fill("150000");
  await page.getByLabel("Площадь (м²)").fill("75");
  await page.getByRole("radiogroup", { name: "Количество комнат" }).getByText("2", { exact: true }).click();
  await page.getByLabel("Этаж", { exact: true }).fill("5");
  await page.getByLabel("Этажность").fill("12");
  await pickDistrict(page, "Кентрон");
  await page.getByLabel("Ориентир").fill("Каскад");
  await page.getByLabel("Улица и номер дома").fill("Туманяна 99, кв. 7");
  await page.getByLabel("Полное описание для клиентов").fill("Светлая квартира в центре");
  await page.getByLabel("Внутреннее описание / Заметки").fill("Ключи у консьержа");
  await page.locator("input[type=file]").setInputFiles(PNG);
  await expect(page.getByText("1 фото")).toBeVisible();
  await page.getByRole("button", { name: "Опубликовать в базу" }).click();
  await expect(page).toHaveURL(/\/partner\/objects(\?|$)/);
  await expect(page.getByRole("button", { name: "Активные 1" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Все объекты 2" })).toBeVisible();

  const row = page.getByRole("row").filter({ hasText: "$150 000" });
  await expect(row).toContainText("2-комн. квартира • 75 м²");
  await expect(row).toContainText("Кентрон");
  await expect(row).toContainText("Активен");
  offeredId = (await row.getByRole("cell").first().innerText()).trim();
  expect(offeredId).toMatch(/^BR-\d+$/);
  expect(failures).toEqual([]);
});

test("builds a selection for the request and sends it for review", async ({ page }) => {
  // A second listing in another district: shown under "Все доступные", not under "Подходящие".
  const failures = await openAsPartner(page);
  // page.request shares the browser's session cookie.
  const partnerApi = page.request;
  await ok(
    partnerApi.post(`${API_URL}/properties`, {
      data: { publish: true, type: "Квартира", district: "Арабкир", price: 120_000, area: 60, rooms: 2, description: "Арабкир", media: [PHOTO_URL] },
    }),
  );
  const listed = await json(partnerApi.get(`${API_URL}/properties`, { params: { search: "Арабкир", limit: 5 } }));
  otherId = listed.items.find((p: { district: string }) => p.district === "Арабкир").id;
  await page.reload();

  await openRequest(page);
  await page.getByRole("button", { name: "Подходящие", exact: true }).click();
  await expect(propertyCard(page, offeredId)).toBeVisible();
  await expect(propertyCard(page, otherId)).toHaveCount(0);
  await page.getByRole("button", { name: "Все доступные", exact: true }).click();
  await expect(propertyCard(page, otherId)).toBeVisible();

  // Add, remove, add again.
  const card = propertyCard(page, offeredId);
  await card.getByRole("button", { name: "Добавить в предложение" }).click();
  await expect(page.getByText("Добавлено в подборку")).toBeVisible();
  await expect(page.getByRole("button", { name: "Отправить КП (1)" })).toBeEnabled();
  await card.getByRole("button", { name: "Убрать из подборки" }).click();
  await expect(page.getByRole("button", { name: "Отправить КП (0)" })).toBeDisabled();
  await card.getByRole("button", { name: "Добавить в предложение" }).click();

  // The selection is stored server-side: it survives a reload.
  await page.reload();
  await expect(page.getByRole("button", { name: "Отправить КП (1)" })).toBeEnabled();

  await page.getByRole("button", { name: "Отправить КП (1)" }).click();
  const dialog = page.getByRole("dialog", { name: "Отправить предложение" });
  await expect(dialog).toContainText("Предложения сначала проверит администратор");
  await expect(dialog).toContainText(`${offeredId} · Кентрон`);
  await expect(dialog).toContainText("$150 000");
  await expect(dialog).not.toContainText(otherId);
  await dialog.getByRole("button", { name: "Отправить предложение" }).click();
  await expect(page.getByText("Предложения отправлены на проверку")).toBeVisible();
  await expect(dialog).toBeHidden();

  await expect(page.getByRole("button", { name: "Отправить КП (0)" })).toBeDisabled();
  await expect(propertyCard(page, offeredId).getByRole("button", { name: "Уже предложен" })).toBeDisabled();

  await offersTab(page, "На проверке");
  await expect(offerRow(page)).toContainText(`${offeredId} · Кентрон`);
  await expect(offerRow(page)).toContainText("На проверке");

  // Brokers see nothing until the admin approves.
  const brokerView = await json(broker.get(`requests/${requestId}`));
  expect(brokerView.offers).toEqual([]);
  offerId = (await currentOffer()).id;
  expect(failures).toEqual([]);
});

test("declined offer shows the admin's reason and can be resubmitted", async ({ page }) => {
  await ok(admin.post(`offers/${offerId}/decline`, { data: { reason: DECLINE_REASON } }));
  const failures = await openAsPartner(page);

  await offersTab(page, "Отклонены");
  const row = offerRow(page);
  await expect(row).toContainText("Отклонено администратором");
  await expect(row).toContainText(`Причина: ${DECLINE_REASON}`);
  await expect(row.getByRole("button", { name: "Исправить объект" })).toBeVisible();

  // The notification centre has the decline.
  await page.getByRole("button", { name: /^Уведомления/ }).click();
  await expect(page.getByRole("dialog", { name: "Уведомления" })).toContainText("Предложение отклонено администратором");
  await page.keyboard.press("Escape");

  await row.getByRole("button", { name: "Отправить повторно" }).click();
  await expect(page.getByText("Предложение отправлено повторно")).toBeVisible();
  await expect(page.getByText("Предложений в этой категории нет")).toBeVisible();
  await page.getByRole("main").getByRole("button", { name: "На проверке", exact: true }).click();
  await expect(offerRow(page)).toContainText("На проверке");
  expect((await currentOffer()).review).toBe("pending");
  expect(failures).toEqual([]);
});

test("editing an approved offer's property sends it back to review", async ({ page }) => {
  await ok(admin.post(`offers/${offerId}/approve`));
  const failures = await openAsPartner(page);

  await offersTab(page, "Отправлены");
  await expect(offerRow(page)).toContainText("Предложено");

  await nav(page, "Мои объекты").click();
  await page.getByRole("button", { name: `Действия с объектом ${offeredId}` }).click();
  await page.getByRole("menuitem", { name: "Редактировать" }).click();
  await expect(page).toHaveURL(new RegExp(`object=${offeredId}`));
  await expect(page.getByLabel("Цена ($)")).toHaveValue("150000");
  await page.getByLabel("Цена ($)").fill("145000");
  await page.getByRole("button", { name: "Опубликовать в базу" }).click();
  await expect(page).toHaveURL(/\/partner\/objects(\?|$)/);
  await expect(page.getByRole("row").filter({ hasText: offeredId })).toContainText("$145 000");

  await offersTab(page, "На проверке");
  await expect(offerRow(page)).toContainText("$145 000");
  expect((await currentOffer()).review).toBe("pending");
  expect(failures).toEqual([]);
});

test("follows the offer through the broker's interest, reservation and sale", async ({ page }) => {
  await ok(admin.post(`offers/${offerId}/approve`));
  await ok(broker.post(`offers/${offerId}/interest`, { data: { selected: true } }));
  const failures = await openAsPartner(page);

  await offersTab(page, "Заинтересованы");
  await expect(offerRow(page)).toContainText("Интерес");

  await ok(broker.post(`requests/${requestId}/transfer`));
  await page.reload();
  await page.getByRole("main").getByRole("button", { name: "Зарезервировано", exact: true }).click();
  await expect(offerRow(page)).toContainText("Зарезервировано");

  // Reserved request no longer takes new offers.
  await nav(page, "Запросы").click();
  await page.getByRole("combobox", { name: "Фильтр запросов партнёра" }).click();
  await page.locator('.ant-select-item-option[title="Все доступные"]').click();
  await openRequest(page);
  await expect(page.getByText("Запрос недоступен для новых предложений")).toBeVisible();
  await expect(propertyCard(page, otherId).getByRole("button", { name: "Добавить в предложение" })).toBeDisabled();

  // Admin's final review: sold.
  const detail = await json(admin.get(`requests/${requestId}`));
  const transfer = detail.transfers.find((t: { requestId: string }) => t.requestId === requestId);
  await ok(admin.post(`transfers/${transfer.id}/sell`, { data: { propertyId: offeredId } }));

  await offersTab(page, "Закрыты / недоступны");
  await expect(offerRow(page)).toContainText("Продано");

  // A sold listing moves to the archive and can't be edited.
  await nav(page, "Мои объекты").click();
  await expect(page.getByRole("button", { name: "Продано / Архив 1" })).toBeVisible();
  await page.getByRole("button", { name: `Действия с объектом ${offeredId}` }).click();
  await expect(page.getByRole("menuitem", { name: "Просмотр" })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Редактировать" })).toHaveCount(0);
  expect(failures).toEqual([]);
});

test("is kept out of broker and admin screens and endpoints", async ({ page }) => {
  await openAsPartner(page);
  for (const path of ["/broker/workspace", "/broker/objects", "/admin/workspace"]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/partner\/requests/);
  }
  const menu = page.getByRole("navigation", { name: "Основная навигация" }).getByRole("button");
  await expect(menu).toHaveText(["Запросы", "Мои объекты", "Предложения"]);

  expect((await page.request.post(`${API_URL}/clients`, { data: { ...CLIENT, employeeId: "x" } })).status()).toBe(403);
  expect((await page.request.post(`${API_URL}/offers/${offerId}/approve`)).status()).toBe(403);
  expect((await page.request.get(`${API_URL}/registration-requests`)).status()).toBe(403);
});
