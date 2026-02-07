import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5e3a73",
        "primary-hover": "#4a2c5c",
        secondary: "#211d11",
        "off-white": "#f8f7f6",
        "light-bg": "#f8f7f6",
        "dark-text": "#1a1a1a",
        "muted-text": "#666666",
        // Dark Mode Color System - Base: #0F1729
        "dark-bg": "#0F1729", // Main dark background
        "dark-card": "#1a2332", // Cards & containers (lighter than bg)
        "dark-surface": "#0a0f1a", // Deeper surfaces (darker than bg)
        "dark-border": "#2a3544", // Borders & dividers
        "dark-text-primary": "#e5e7eb", // Primary text color (dark mode)
        "dark-text-secondary": "#9ca3af", // Secondary text color (dark mode)
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        "serif-display": ["var(--font-serif)", "serif"],
        sans: ["var(--font-primary)", "sans-serif"],
        mono: ["var(--font-secondary)", "monospace"],
      },
      spacing: {
        "128": "32rem",
      },
      letterSpacing: {
        "widest-xl": "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
