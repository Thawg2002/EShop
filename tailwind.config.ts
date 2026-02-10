import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0071e3",
          foreground: "#ffffff",
          hover: "#0077ed",
          light: "#47a1ff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "off-white": "#fcfcfc",
        "light-bg": "#fcfcfc",
        "dark-text": "#0a0a0b",
        "muted-text": "#737373",
        gold: {
          "50": "#fbf8f1",
          "100": "#f4eddb",
          "200": "#e9dbba",
          "300": "#d9c08d",
          "400": "#c5a059",
          "500": "#b48c47",
          "600": "#9c713a",
          "700": "#825a32",
          "800": "#6b4a2d",
          "900": "#5a3f29",
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
        "dark-border": "#1f1f21",
        "dark-bg": "#0a0a0b",
        "dark-card": "#141415",
        "dark-surface": "#0a0a0b",
        "dark-text-primary": "#fcfcfc",
        "dark-text-secondary": "#a1a1aa",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        premium: "0 10px 50px -10px rgba(0, 0, 0, 0.05)",
        "premium-hover": "0 20px 70px -15px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shine: "shine var(--duration) infinite linear",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
