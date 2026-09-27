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

test("scrolls hidden navbar links into view during keyboard navigation", async ({
  mount,
  page,
}) => {
  await page.setViewportSize({
    width: 1024,
    height: 700,
  });

  const component = await mount(HEADER_STORY);

  const navbar = component.getByRole("navigation");
  const categoriesTrigger = navbar.getByRole("button", {
    name: /^categories/i,
  });

  const categoryLinks = navbar.getByRole("link");
  const linkCount = await categoryLinks.count();
  const finalCategoryLink = categoryLinks.nth(linkCount - 1);

  const viewport = component.getByTestId("navbar-links-viewport");

  const leftScroller = navbar.getByRole("button", {
    name: /scroll categories left/i,
  });

  const rightScroller = navbar.getByRole("button", {
    name: /scroll categories right/i,
  });

  await expect
    .poll(() =>
      viewport.evaluate((element) => element.scrollWidth > element.clientWidth),
    )
    .toBe(true);

  await expect(leftScroller).toBeDisabled();
  await expect(rightScroller).toBeEnabled();

  await categoriesTrigger.focus();

  for (let index = 0; index < linkCount; index += 1) {
    await page.keyboard.press("Tab");
  }

  await expect(finalCategoryLink).toBeFocused();

  await expect
    .poll(() => viewport.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);

  await expect(finalCategoryLink).toBeInViewport();

  await expect(leftScroller).toBeEnabled();
  await expect(rightScroller).toBeDisabled();
});
