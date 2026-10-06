import { ADMIN, expect, expectSignedIn, signIn, test } from "./helpers";

const ACCOUNTS = [
  { role: "broker", email: "nord.broker@example.com", password: "demo12345" },
  { role: "partner", email: "ararat.partner@example.com", password: "demo12345" },
  { role: "admin", ...ADMIN },
];

// The auth guard now re-reads the user on every request: every screen must still load.
for (const account of ACCOUNTS) {
  test(`${account.role} can open every main screen`, async ({ page }) => {
    const failures: string[] = [];
    page.on("response", (r) => {
      if (r.url().includes("/api/") && r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
    });
    page.on("pageerror", (e) => failures.push(`pageerror: ${e.message}`));

    await signIn(page, account);
    await expectSignedIn(page);

    const nav = page.getByRole("navigation", { name: "Основная навигация" });
    const items = nav.getByRole("button");
    await expect(items.first()).toBeVisible();
    const count = await items.count();
    expect(count).toBeGreaterThan(1);
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      if (await item.isDisabled()) continue;
      await item.click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByRole("main").getByRole("heading").first()).toBeVisible();
      // Some items open a drawer over the page instead of a screen.
      await page.keyboard.press("Escape");
    }

    await expect(page).not.toHaveURL(/\/sign-in/);
    expect(failures).toEqual([]);
  });
}
