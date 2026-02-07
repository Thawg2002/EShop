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
        "dark-bg": "#0F1729",
        "dark-card": "#1a2332",
        "dark-surface": "#0a0f1a",
        "dark-border": "#2a3544",
        "dark-text-primary": "#e5e7eb",
        "dark-text-secondary": "#9ca3af",
      },
      fontFamily: {
        serif: ["var(--font-bodoni)", "serif"],
        "serif-display": ["var(--font-bodoni)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
      },
      letterSpacing: {
        "widest-xl": "0.2em",
      },
      // MagicUI Animations
      animation: {
        "shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        shine: "shine var(--duration) infinite linear",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        "shimmer-slide": {
          to: { transform: "translate(calc(100cqw - 100%), 0)" },
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        gradient: {
          to: { "background-position": "var(--bg-size) 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
