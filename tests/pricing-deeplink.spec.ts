import { test, expect } from "@playwright/test";

test("pricing deep-link preselects plan", async ({ page }) => {
  await page.goto("/auth?plan=business");
  await expect(page).toHaveURL(/\/auth\?plan=business/);
});
