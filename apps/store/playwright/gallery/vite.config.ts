import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  root: ".",

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(
        new URL("../../", import.meta.url),
      ),

      "next/link": fileURLToPath(
        new URL(
          "./mocks/next-link.tsx",
          import.meta.url,
        ),
      ),

      "@clerk/nextjs": fileURLToPath(
        new URL(
          "./mocks/clerk-nextjs.ts",
          import.meta.url,
        ),
      ),
    },
  },
});