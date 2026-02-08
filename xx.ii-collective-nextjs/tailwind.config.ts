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
          DEFAULT: "#c5a059", // Champagne Gold
          hover: "#a38241",
          light: "#e5c17e",
        },
        secondary: "#211d11",
        "off-white": "#fcfcfc", // Soft silk white
        "light-bg": "#fcfcfc",
        "dark-text": "#0a0a0b", // Midnight Black
        "muted-text": "#737373", // Zinc 500 equivalent but softer
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
          cream: "#f9f9f9",
          black: "#050505",
          charcoal: "#0a0a0b",
          onyx: "#111111",
          "warm-grey": "#8e8e8e",
          "champagne-gold": "#c5a059",
          "slate-grey": "#4a4a4b",
          porcelain: "#f2f2f2",
        },
        // Dark Mode Color System (Softer High-End Dark)
        "dark-bg": "#0a0a0b",
        "dark-card": "#141415",
        "dark-surface": "#0a0a0b",
        "dark-border": "#1f1f21",
        "dark-text-primary": "#fcfcfc",
        "dark-text-secondary": "#a1a1aa",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
        serif: ["var(--font-playfair)", "serif"],
        "serif-display": ["var(--font-playfair)", "serif"],
      },
      fontWeight: {
        tight: "tracking-tight",
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
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shine: "shine var(--duration) infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
