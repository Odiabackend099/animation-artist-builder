import { test, expect } from "@playwright/test";

test("nav links scroll to sections", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Developers/i }).click();
  await expect(page.locator("#how-it-works")).toBeVisible();
  await page.getByRole("link", { name: /Pricing/i }).click();
  await expect(page.locator("#pricing")).toBeVisible();
});
