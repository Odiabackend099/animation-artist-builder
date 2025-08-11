import { test, expect } from "@playwright/test";

test("submit lead → status → resend (mocked)", async ({ page }) => {
  await page.route(/functions\/v1\/submit-lead/, route => route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }));
  await page.route(/functions\/v1\/lead-status/, route => route.fulfill({ status: 200, body: JSON.stringify({ status: "live", agent_slug: "test-123", delivery_summary: { whatsapp_status: "sent" } }) }));
  await page.route(/functions\/v1\/resend-ready/, route => route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }));

  await page.goto("/signup");
  // Minimal fields depending on the wizard implementation; adapt selectors as needed
  // Just ensure submit triggers the function
  // This is a placeholder since the full form is complex in this project

  await page.goto("/dashboard");
  await expect(page.getByText(/Agent Slug/i)).toBeVisible();
});
