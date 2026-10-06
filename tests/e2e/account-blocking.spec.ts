import {
  ADMIN,
  apiSession,
  expect,
  expectSignedIn,
  findRegistration,
  makeApplicant,
  registrationCard,
  signIn,
  signUpViaApi,
  test,
} from "./helpers";

test.describe("admin blocks and unblocks a broker account", () => {
  test("blocked broker is signed out on their next action and sees the reason", async ({ page, api, browser, playwright }) => {
    // Approved broker, set up through the API.
    const broker = makeApplicant("broker", "Block");
    await signUpViaApi(api, broker);
    const adminApi = await apiSession(playwright, ADMIN);
    const reg = await findRegistration(adminApi, broker.email);
    const approved = await (await adminApi.post(`registration-requests/${reg.id}/approve`)).json();
    expect(approved).toMatchObject({ ok: true, companyId: expect.stringMatching(/^RF-\d+$/) });
    const { companyId, userId } = approved as { companyId: string; userId: string };

    // Broker is working in the cabinet.
    await signIn(page, broker);
    await expectSignedIn(page);
    const cabinetUrl = page.url();

    // Admin blocks the account from the company panel.
    const adminCtx = await browser.newContext({ extraHTTPHeaders: { "X-Forwarded-For": "10.250.0.2" } });
    const admin = await adminCtx.newPage();
    await signIn(admin, ADMIN);
    await expectSignedIn(admin);
    await admin.goto(`/admin/companies?panel=company&company=${companyId}`);
    await expect(admin.getByRole("heading", { name: "Аккаунты" })).toBeVisible();
    const row = admin.locator(".record").filter({ hasText: broker.email }).filter({ has: admin.getByRole("button") });
    await expect(row).toContainText("Активен");
    await row.getByRole("button", { name: "Заблокировать" }).click();

    const dialog = admin.getByRole("dialog", { name: "Заблокировать аккаунт" });
    await expect(dialog).toContainText("Пользователь увидит эту причину при попытке входа");
    const confirm = dialog.getByRole("button", { name: "Заблокировать" });
    await expect(confirm).toBeDisabled();
    const reason = "Жалобы клиентов на недостоверные объекты";
    await dialog.getByLabel("Причина блокировки").fill(reason);
    await confirm.click();
    await expect(admin.getByText("Пользователь потеряет доступ при следующем действии.")).toBeVisible();
    await expect(row).toContainText("Заблокирован");
    await expect(row).toContainText(reason);
    await expect(row.getByRole("button", { name: "Разблокировать" })).toBeVisible();

    // The approved application card reflects the block.
    await admin.goto(`/admin/registrations`);
    await admin.getByRole("button", { name: /^Одобренные/ }).click();
    await admin.getByLabel("Имя, email или компания").fill(broker.email);
    await expect(registrationCard(admin, broker.name)).toContainText(`Аккаунт заблокирован · ${reason}`);

    // Broker's existing session dies on the next request (no waiting for JWT expiry).
    await page.goto(cabinetUrl);
    await expect(page).toHaveURL(/\/sign-in/, { timeout: 10_000 });
    const notice = page.getByRole("alert").filter({ hasText: "Аккаунт заблокирован администратором" });
    await expect(notice).toBeVisible();

    // Signing in again: correct password → blocked notice with reason; wrong → generic error.
    await signIn(page, broker);
    await expect(notice).toContainText(`Причина: ${reason}`);
    await expect(page).toHaveURL(/\/sign-in/);
    await signIn(page, { email: broker.email, password: "wrong-password-1" });
    await expect(page.getByText("Неверный email или пароль")).toBeVisible();
    await expect(notice).toHaveCount(0);

    // Re-applying with the same email can't bypass the block: it's accepted
    // (so the form doesn't reveal the account) but nothing is filed.
    const again = await api.post("auth/sign-up", { data: broker });
    expect(again.status()).toBe(202);
    const pending = await (
      await adminApi.get("registration-requests", { params: { status: "pending", search: broker.email } })
    ).json();
    expect(pending.items).toHaveLength(0);

    // Admin unblocks.
    await admin.goto(`/admin/companies?panel=company&company=${companyId}`);
    await row.getByRole("button", { name: "Разблокировать" }).click();
    await admin.getByRole("dialog", { name: "Разблокировать аккаунт?" }).getByRole("button", { name: "Разблокировать" }).click();
    await expect(admin.getByText("Доступ восстановлен")).toBeVisible();
    await expect(row).toContainText("Активен");
    await adminCtx.close();

    // Broker can sign in again.
    await signIn(page, broker);
    await expectSignedIn(page);

    // API guards on block/unblock.
    const me = await (await adminApi.get("auth/me")).json();
    const adminId = (me.user ?? me).id as string;
    expect((await adminApi.post(`users/${adminId}/block`, { data: { reason: "self block" } })).status()).toBeGreaterThanOrEqual(400);
    expect((await adminApi.post(`users/${userId}/block`, { data: { reason: "  " } })).status()).toBe(400);

    const accounts = await (await adminApi.get(`companies/${companyId}/accounts`)).json();
    expect(JSON.stringify(accounts)).not.toMatch(/password/i);

    const brokerApi = await apiSession(playwright, broker);
    expect((await brokerApi.post(`users/${userId}/block`, { data: { reason: "not allowed" } })).status()).toBe(403);
    expect((await brokerApi.get(`companies/${companyId}/accounts`)).status()).toBe(403);

    await brokerApi.dispose();
    await adminApi.dispose();
  });
});
