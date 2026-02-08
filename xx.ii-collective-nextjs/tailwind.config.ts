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
        primary: {
          DEFAULT: "#c5a059",
          hover: "#a38241",
          light: "#e5c17e",
        },
        secondary: "#211d11",
        "off-white": "#f8f7f6",
        "light-bg": "#f8f7f6",
        "dark-text": "#1d1d20",
        "muted-text": "#666666",
        gold: {
          50: "#fbf8f1",
          100: "#f4eddb",
          200: "#e9dbba",
          300: "#d9c08d",
          400: "#c5a059",
          500: "#b48c47",
          600: "#9c713a",
          700: "#825a32",
          800: "#6b4a2d",
          900: "#5a3f29",
        },
        luxury: {
          cream: "#fdf8f4",
          black: "#050505",
          charcoal: "#0a0a0a",
          onyx: "#1a1a1b",
          "warm-grey": "#8e8e8e",
          "champagne-gold": "#d4af37",
          "slate-grey": "#4a4a4b",
          porcelain: "#f2f2f2",
        },
        // Dark Mode Color System
        "dark-bg": "#050505",
        "dark-card": "#0a0a0a",
        "dark-surface": "#000000",
        "dark-border": "rgba(255,255,255,0.05)",
        "dark-text-primary": "#fdf8f4",
        "dark-text-secondary": "#a3a3a3",
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
      boxShadow: {
        premium: "0 10px 50px -10px rgba(0, 0, 0, 0.05)",
        "premium-hover": "0 20px 70px -15px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
