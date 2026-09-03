import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "components",

      testDir: "./playwright/tests",

      use: {
        ...devices["Desktop Chrome"],

        baseURL: "http://localhost:5173/playwright/gallery/index.html",

        serviceWorkers: "block",

        reuseContext: true,
      },
    },
  ],

  webServer: {
    command: "pnpm exec vite --config playwright/gallery/vite.config.ts",

    url: "http://localhost:5173/playwright/gallery/index.html",

    reuseExistingServer: !process.env.CI,
  },
});
