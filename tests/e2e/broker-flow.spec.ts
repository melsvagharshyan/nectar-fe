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
 * The Russian broker flow end to end: client and request, request review
 * (reject → edit → resubmit → approve), offers appearing only after admin approval,
 * "Отказ"/"Вернуть", booking, reservation, the admin's return with a reason, and the sale.
 * Admin and partner reactions go through the API; everything the broker does is UI.
 */

/** Any Cloudinary delivery URL passes the backend's media check; nothing is uploaded. */
const PHOTO_URL = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

const CLIENT = { name: "Иван Петров", phone: "+7 900 111-22-33" };
const REJECT_REASON = "Уточните бюджет клиента";
const DECLINE_REASON = "Нет фото интерьера";
const RETURN_REASON = "Клиент не подтвердил задаток";

let admin: APIRequestContext;
let partner: APIRequestContext;
let broker: Applicant;
let clientId: string;
let requestId: string;
/** Approved for the broker; the one that gets sold. */
let approvedProperty: string;
/** Declined by the admin; the broker must never see it. */
let declinedProperty: string;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ playwright }) => {
  admin = await apiSession(playwright, ADMIN);
  broker = makeApplicant("broker", "BFBroker");
  const partnerAccount = makeApplicant("partner", "BFPartner");
  for (const a of [broker, partnerAccount]) {
    const anon = await playwright.request.newContext({
      baseURL: `${API_URL}/`,
      extraHTTPHeaders: { "X-Forwarded-For": `10.201.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250) + 1}` },
    });
    await signUpViaApi(anon, a);
    await anon.dispose();
    const reg = await findRegistration(admin, a.email);
    await ok(admin.post(`registration-requests/${reg.id}/approve`));
  }
  partner = await apiSession(playwright, partnerAccount);
});

test.afterAll(async () => {
  await admin?.dispose();
  await partner?.dispose();
});

async function ok(res: Promise<APIResponse>) {
  const r = await res;
  expect(r.ok(), `${r.url()} → ${r.status()} ${await r.text()}`).toBeTruthy();
  return r;
}
const json = async (res: Promise<APIResponse>) => (await ok(res)).json();

/** Signs the broker in and fails the test on any API error or page crash. */
async function openAsBroker(page: Page) {
  const failures: string[] = [];
  page.on("response", (r) => {
    if (r.url().includes("/api/") && r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
  });
  page.on("pageerror", (e) => failures.push(`pageerror: ${e.message}`));
  await signIn(page, broker);
  await expectSignedIn(page);
  await expect(page).toHaveURL(/\/broker\/workspace/);
  return failures;
}

async function openRequest(page: Page) {
  await page.goto(`/broker/workspace?client=${clientId}&request=${requestId}`);
  await expect(page.getByRole("heading", { name: `Подходящие объекты · ${requestId}` })).toBeVisible();
}

const main = (page: Page) => page.getByRole("main");
const requestCard = (page: Page) => main(page).getByRole("button", { name: new RegExp(`^${requestId} `) });
const offerCard = (page: Page, propertyId: string) =>
  main(page).getByRole("article").filter({ has: page.getByRole("button", { name: `Подробнее ${propertyId}` }) });
const tab = (page: Page, label: string, count: number) =>
  main(page).getByRole("button", { name: `${label} ${count}`, exact: true });
const reserveButton = (page: Page) => main(page).getByRole("button", { name: "Зарезервировать", exact: true });

async function openDetails(page: Page) {
  await main(page).getByRole("button", { name: "Подробнее", exact: true }).first().click();
  return page.getByRole("dialog", { name: `Запрос ${requestId}` });
}

/** Reserves the booked offers; returns the transfer ID shown in the panel. */
async function reserve(page: Page) {
  await reserveButton(page).click();
  const dialog = page.getByRole("dialog", { name: "Зарезервировать" });
  await expect(dialog.getByRole("heading", { name: `${requestId} · ${CLIENT.name}` })).toBeVisible();
  await dialog.getByRole("button", { name: "Зарезервировать" }).click();
  const heading = page.getByRole("dialog").getByRole("heading", { name: /^Резерв TR-\d+$/ });
  await expect(heading).toBeVisible();
  await expect(page.getByText("Объекты зарезервированы")).toBeVisible();
  return (await heading.textContent())!.replace("Резерв ", "");
}

async function createProperty(price: number, area: number) {
  await ok(
    partner.post("properties", {
      data: {
        publish: true,
        type: "Квартира",
        district: "Кентрон",
        price,
        area,
        rooms: 2,
        location: `ул. Туманяна ${price}`,
        description: "Светлая квартира в центре",
        media: [PHOTO_URL],
      },
    }),
  );
  const { items } = await json(partner.get("properties"));
  return items.find((p: { price: number }) => p.price === price).id as string;
}

async function offerFor(propertyId: string) {
  const { items } = await json(admin.get("offers/table", { params: { search: requestId } }));
  return items.find((o: { propertyId: string }) => o.propertyId === propertyId).id as string;
}

test("creates a client and a request, then sends it for review", async ({ page }) => {
  const failures = await openAsBroker(page);

  await main(page).getByRole("button", { name: "Новый клиент" }).click();
  const clientForm = page.getByRole("dialog", { name: "Создание клиента" });
  await clientForm.getByLabel("ФИО *").fill(CLIENT.name);
  await clientForm.getByLabel("Телефон *").fill(CLIENT.phone);
  await clientForm.getByRole("button", { name: "Сохранить" }).click();
  await expect(page.getByText("Клиент добавлен")).toBeVisible();
  await expect(
    main(page).getByRole("button").filter({ hasText: CLIENT.name }).filter({ hasText: CLIENT.phone }),
  ).toBeVisible();

  await main(page).getByRole("button", { name: "Новый запрос" }).click();
  const requestForm = page.getByRole("dialog", { name: "Создание запроса" });
  await expect(requestForm.getByText(`Запрос для ${CLIENT.name}`)).toBeVisible();
  await requestForm.getByText("Кентрон", { exact: true }).click();
  await requestForm.getByLabel("Бюджет до, USD *").fill("150000");
  await requestForm.getByLabel("Площадь от, м²").fill("60");
  await requestForm.getByLabel("Площадь до, м²").fill("90");
  await requestForm.getByRole("group", { name: "Комнаты" }).getByText("2", { exact: true }).click();
  await requestForm.getByRole("button", { name: "Сохранить" }).click();
  await expect(requestForm).toBeHidden();

  clientId = new URL(page.url()).searchParams.get("client")!;
  const card = main(page).getByRole("button", { name: /^CR-\d+ / });
  await expect(card).toContainText("Создан");
  await expect(card).toContainText("2-комн. Квартира");
  await expect(card).toContainText("$0–$150 000");
  requestId = (await card.textContent())!.match(/CR-\d+/)![0];

  await expect(page.getByText("Отправьте запрос на проверку, чтобы партнёры начали подбор")).toBeVisible();
  await expect(reserveButton(page)).toBeDisabled();
  await main(page).getByRole("button", { name: "Отправить на проверку" }).click();
  await expect(requestCard(page)).toContainText("На проверке");
  await expect(page.getByRole("heading", { name: "Запрос на проверке у администратора" })).toBeVisible();

  expect(failures).toEqual([]);
});

test("sees the rejection reason, edits the request and resubmits it", async ({ page }) => {
  await ok(admin.post(`requests/${requestId}/reject`, { data: { reason: REJECT_REASON } }));
  const failures = await openAsBroker(page);
  await openRequest(page);

  await expect(requestCard(page)).toContainText("Отклонён");
  await expect(page.getByRole("heading", { name: "Запрос отклонён — исправьте его и отправьте повторно" })).toBeVisible();
  const details = await openDetails(page);
  await expect(details.getByText("Запрос отклонён администратором", { exact: true })).toBeVisible();
  await expect(details.getByText(REJECT_REASON)).toBeVisible();
  await details.getByRole("button", { name: "Закрыть панель" }).click();

  await main(page).getByRole("button", { name: "Изменить" }).click();
  const form = page.getByRole("dialog", { name: "Изменение запроса" });
  await form.getByLabel("Бюджет до, USD *").fill("160000");
  await form.getByRole("button", { name: "Сохранить" }).click();
  await expect(form).toBeHidden();
  // Saving alone doesn't resubmit.
  await expect(requestCard(page)).toContainText("$0–$160 000");
  await expect(requestCard(page)).toContainText("Отклонён");

  await main(page).getByRole("button", { name: "Отправить на проверку" }).click();
  await expect(requestCard(page)).toContainText("На проверке");

  expect(failures).toEqual([]);
});

test("sees only the offers the admin approved", async ({ page }) => {
  await ok(admin.post(`requests/${requestId}/approve`));
  approvedProperty = await createProperty(135_000, 75);
  declinedProperty = await createProperty(140_000, 80);
  await ok(partner.post(`requests/${requestId}/offers`, { data: { propertyIds: [approvedProperty, declinedProperty] } }));

  const failures = await openAsBroker(page);
  await openRequest(page);
  await expect(requestCard(page)).toContainText("В работе");
  // Pending offers stay hidden.
  await expect(page.getByRole("heading", { name: "Предложения пока не получены" })).toBeVisible();
  await expect(tab(page, "Все предложения", 0)).toBeVisible();

  await ok(admin.post(`offers/${await offerFor(approvedProperty)}/approve`));
  await ok(admin.post(`offers/${await offerFor(declinedProperty)}/decline`, { data: { reason: DECLINE_REASON } }));
  await page.reload();

  await expect(requestCard(page)).toContainText("Есть предложения");
  await expect(tab(page, "Все предложения", 1)).toBeVisible();
  const card = offerCard(page, approvedProperty);
  await expect(card).toContainText("$135,000");
  await expect(card).toContainText("2-комн. квартира · 75 м²");
  await expect(card).toContainText("100% совпадение");
  await expect(offerCard(page, declinedProperty)).toHaveCount(0);
  await expect(page.getByText(DECLINE_REASON)).toHaveCount(0);

  expect(failures).toEqual([]);
});

test("rejects and restores an offer, then books it", async ({ page }) => {
  const failures = await openAsBroker(page);
  await openRequest(page);
  const card = offerCard(page, approvedProperty);

  await card.getByRole("button", { name: "Отказ" }).click();
  await expect(page.getByText("Объект отклонён")).toBeVisible();
  await expect(tab(page, "Не подходят", 1)).toBeVisible();
  await expect(tab(page, "Все предложения", 0)).toBeVisible();

  await tab(page, "Не подходят", 1).click();
  await expect(card.getByRole("button", { name: "Бронь" })).toBeDisabled();
  await card.getByRole("button", { name: "Вернуть" }).click();
  await expect(tab(page, "Не подходят", 0)).toBeVisible();

  await tab(page, "Все предложения", 1).click();
  await expect(reserveButton(page)).toBeDisabled();
  await card.getByRole("button", { name: "Бронь" }).click();
  await expect(page.getByText("Объект забронирован")).toBeVisible();
  await expect(card.getByRole("button", { name: "Бронь" })).toHaveAttribute("aria-pressed", "true");
  await expect(tab(page, "Выбранные", 1)).toBeVisible();
  await expect(main(page).getByText("Выбрано: 1")).toBeVisible();
  await expect(reserveButton(page)).toBeEnabled();

  expect(failures).toEqual([]);
});

test("reserves, sees the admin's return reason, and keeps the booking", async ({ page }) => {
  const failures = await openAsBroker(page);
  await openRequest(page);

  const transferId = await reserve(page);
  await page.getByRole("dialog").getByRole("button", { name: "Закрыть панель" }).click();
  await expect(requestCard(page)).toContainText("Зарезервировано");

  await ok(admin.post(`transfers/${transferId}/return`, { data: { reason: RETURN_REASON } }));
  await page.reload();

  await expect(requestCard(page)).toContainText("Есть предложения");
  await expect(main(page).getByText("Выбрано: 1")).toBeVisible();
  await expect(reserveButton(page)).toBeEnabled();
  const details = await openDetails(page);
  await expect(details.getByText(`Администратор вернул резерв ${transferId} в работу`)).toBeVisible();
  await expect(details.getByText(RETURN_REASON)).toBeVisible();
  await expect(details.getByText(`Резерв возвращён в работу · ${requestId}`)).toBeVisible();

  expect(failures).toEqual([]);
});

test("reserves again and sees the deal sold", async ({ page }) => {
  const failures = await openAsBroker(page);
  await openRequest(page);

  const transferId = await reserve(page);
  await ok(admin.post(`transfers/${transferId}/sell`, { data: { propertyId: approvedProperty } }));
  await openRequest(page);

  await expect(requestCard(page)).toContainText("Продано");
  await expect(offerCard(page, approvedProperty)).toContainText("Продано");
  await expect(offerCard(page, approvedProperty).getByRole("button", { name: "Бронь" })).toHaveCount(0);
  await expect(reserveButton(page)).toBeDisabled();

  const details = await openDetails(page);
  for (const step of [
    "Запрос отправлен на проверку",
    "Запрос отклонён администратором",
    "Запрос одобрен, начат подбор",
    "Предложение одобрено администратором",
    "Объекты зарезервированы",
    "Резерв возвращён в работу",
  ])
    await expect(details.getByRole("listitem").filter({ hasText: step }).first()).toBeVisible();

  expect(failures).toEqual([]);
});
