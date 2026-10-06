import {
  ADMIN,
  apiSession,
  expect,
  expectSignedIn,
  fillSignUp,
  findRegistration,
  makeApplicant,
  signIn,
  signUpViaApi,
  registrationCard,
  registrationsMenu,
  test,
} from "./helpers";

test.describe("broker sign-up with admin approval", () => {
  test("sign-up offers only broker roles", async ({ page }) => {
    await page.goto("/sign-up");
    const roles = page.getByRole("radio");
    await expect(roles).toHaveCount(2);
    await expect(roles.nth(0)).toContainText("Брокер в России");
    await expect(roles.nth(1)).toContainText("Брокер в Армении");
    await expect(page.getByText(/админ/i)).toHaveCount(0);
  });

  test("API refuses admin self-sign-up", async ({ api }) => {
    const a = makeApplicant("broker", "AdminTry");
    const res = await api.post("auth/sign-up", { data: { ...a, role: "admin" } });
    expect(res.status()).toBe(400);
  });

  test("sign-up → pending → admin approves → sign-in works", async ({ page, browser, playwright }) => {
    const applicant = makeApplicant("broker", "Approve");

    // 1. Sign up: success screen, no session.
    await fillSignUp(page, applicant);
    await expect(page.getByText("Доступ откроется после проверки заявки администратором")).toBeVisible();
    await page.getByRole("button", { name: "Отправить заявку" }).click();
    await expect(page.getByRole("heading", { name: "Заявка отправлена" })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("Мы получили вашу заявку");
    await expect(page.getByRole("status")).toContainText(applicant.email);
    await expect(page.getByText("Уже есть аккаунт?")).toHaveCount(0);
    expect((await page.context().cookies()).find((c) => c.name === "nectar_session")).toBeUndefined();

    // 2. Sign-in while pending: info notice, still on sign-in.
    await page.getByRole("button", { name: /Перейти ко входу/ }).click();
    await expect(page).toHaveURL(/\/sign-in/);
    await signIn(page, applicant);
    await expect(page.getByRole("status")).toContainText("Заявка на рассмотрении");
    await expect(page).toHaveURL(/\/sign-in/);

    // Wrong password must not reveal the application status.
    await signIn(page, { email: applicant.email, password: "wrong-password-1" });
    await expect(page.getByText("Неверный email или пароль")).toBeVisible();
    await expect(page.getByText("Заявка на рассмотрении")).toHaveCount(0);

    // 3. Admin approves in the "Заявки" screen.
    const adminCtx = await browser.newContext({
      extraHTTPHeaders: { "X-Forwarded-For": "10.250.0.1" },
    });
    const admin = await adminCtx.newPage();
    await signIn(admin, ADMIN);
    await expectSignedIn(admin);

    const menuItem = registrationsMenu(admin);
    await expect(menuItem).toBeVisible();
    await menuItem.click();
    await expect(admin.getByRole("heading", { name: "Заявки", exact: true })).toBeVisible();
    await admin.getByLabel("Имя, email или компания").fill(applicant.email);

    const card = registrationCard(admin, applicant.name);
    await expect(card).toBeVisible();
    await expect(card).toContainText(applicant.companyName);
    await expect(card).toContainText("RU");
    await card.getByRole("button", { name: "Одобрить" }).click();

    const dialog = admin.getByRole("dialog");
    await expect(dialog).toContainText(`Создать компанию «${applicant.companyName}» и открыть доступ ${applicant.email}?`);
    await dialog.getByRole("button", { name: "Одобрить" }).click();
    await expect(admin.getByText(/Заявка одобрена/)).toBeVisible();
    await expect(admin.getByRole("heading", { name: applicant.name })).toHaveCount(0);

    // Card moves to "Одобренные" with a link to the new RF company.
    await admin.getByRole("button", { name: /^Одобренные/ }).click();
    const approved = registrationCard(admin, applicant.name);
    await expect(approved).toContainText("Одобрил");
    await expect(approved.getByRole("button", { name: /Компания RF-\d+/ })).toBeVisible();
    await adminCtx.close();

    // 4. The applicant signs in with the password chosen at sign-up.
    await page.goto("/sign-in");
    await signIn(page, applicant);
    await expectSignedIn(page);
  });

  test("rejected application shows the admin message and allows re-applying", async ({ page, api, playwright }) => {
    const applicant = makeApplicant("partner", "Reject");
    await signUpViaApi(api, applicant);

    const admin = await apiSession(playwright, ADMIN);
    const reg = await findRegistration(admin, applicant.email);

    // Reason is required by the API.
    const blank = await admin.post(`registration-requests/${reg.id}/reject`, { data: { reason: "   " } });
    expect(blank.status()).toBe(400);

    // Reject through the UI dialog: confirm stays disabled until the message is valid.
    await signIn(page, ADMIN);
    await expectSignedIn(page);
    await registrationsMenu(page).click();
    await page.getByLabel("Имя, email или компания").fill(applicant.email);
    const card = registrationCard(page, applicant.name);
    await expect(card).toContainText("AM");
    await card.getByRole("button", { name: "Отклонить" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Этот текст увидит пользователь при попытке входа");
    const confirm = dialog.getByRole("button", { name: "Отклонить заявку" });
    await expect(confirm).toBeDisabled();
    await dialog.getByLabel("Сообщение заявителю").fill("  a ");
    await expect(confirm).toBeDisabled();
    const reason = "Не удалось проверить агентство <b>ИНН</b>";
    await dialog.getByLabel("Сообщение заявителю").fill(reason);
    await expect(confirm).toBeEnabled();
    await confirm.click();
    await expect(dialog).toHaveCount(0);

    await page.getByRole("button", { name: /^Отклонённые/ }).click();
    const rejected = registrationCard(page, applicant.name);
    await expect(rejected).toContainText(`Сообщение заявителю: ${reason}`);

    // Applicant sees the rejection (as plain text) when signing in.
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto("/sign-in");
    await signIn(page, applicant);
    const alert = page.getByRole("alert").filter({ hasText: "Заявка отклонена" });
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(`Комментарий администратора: ${reason}`);
    await expect(alert.locator("b")).toHaveCount(0);

    // ...and can apply again with the same email.
    await alert.getByRole("button", { name: "Подать новую заявку" }).click();
    await expect(page).toHaveURL(/\/sign-up/);
    await fillSignUp(page, applicant);
    await page.getByRole("button", { name: "Отправить заявку" }).click();
    await expect(page.getByRole("heading", { name: "Заявка отправлена" })).toBeVisible();

    await admin.dispose();
  });

  // The form must not reveal that the email is taken, so a duplicate looks like
  // a normal submission, but only the first application is filed.
  test("duplicate pending sign-up looks accepted but isn't filed twice", async ({ page, api, playwright }) => {
    const applicant = makeApplicant("broker", "Dup");
    await signUpViaApi(api, applicant);

    await fillSignUp(page, applicant);
    await page.getByRole("button", { name: "Отправить заявку" }).click();
    await expect(page.getByRole("heading", { name: "Заявка отправлена" })).toBeVisible();

    const admin = await apiSession(playwright, ADMIN);
    const pending = await (
      await admin.get("registration-requests", { params: { status: "pending", search: applicant.email } })
    ).json();
    expect(pending.items).toHaveLength(1);
    await admin.dispose();
  });

  test("admin menu shows the pending count and non-admins can't list applications", async ({ page, api, playwright }) => {
    await signUpViaApi(api, makeApplicant("broker", "Badge"));

    const admin = await apiSession(playwright, ADMIN);
    const boot = await (await admin.get("bootstrap")).json();
    expect(boot.pendingRegistrations).toBeGreaterThan(0);

    await signIn(page, ADMIN);
    await expectSignedIn(page);
    const item = registrationsMenu(page);
    await expect(item).toContainText(String(boot.pendingRegistrations));

    const broker = await apiSession(playwright, { email: "nord.broker@example.com", password: "demo12345" });
    expect((await broker.get("registration-requests")).status()).toBe(403);
    expect((await (await broker.get("bootstrap")).json()).pendingRegistrations).toBe(0);

    await admin.dispose();
    await broker.dispose();
  });
});
