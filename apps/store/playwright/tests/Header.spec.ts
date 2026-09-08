import { expect, test } from "@playwright/test";

const HEADER_STORY = "components/layout/Header/Header/Default";

test("shows the user dropdown on desktop", async ({ mount, page }) => {
  await page.setViewportSize({
    width: 1024,
    height: 800,
  });

  const header = await mount(HEADER_STORY);

  await expect(
    header.getByRole("button", {
      name: "Open user menu",
    }),
  ).toBeVisible();
});

test("hides the user dropdown on mobile", async ({ mount, page }) => {
  await page.setViewportSize({
    width: 1023,
    height: 800,
  });

  const header = await mount(HEADER_STORY);

  const trigger = header.getByRole("button", {
    name: "Open user menu",
    includeHidden: true,
  });

  await expect(trigger).toBeHidden();
});
