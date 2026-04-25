import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      scrollbarWidth: {
        none: "none",
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    }) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".scrollbar-none::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
} satisfies Config;
