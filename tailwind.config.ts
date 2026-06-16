import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#ffffff",
          soft: "#f8fafc",
          card: "#ffffff",
          line: "#e5e7eb",
          border: "#e2e8f0",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#64748b",
          dim: "#94a3b8",
        },
        accent: {
          primary: "#2563eb",
          green: "#16a34a",
          cyan: "#0891b2",
          yellow: "#d97706",
          pink: "#db2777",
          red: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
    },
  },
  plugins: [],
};
export default config;
