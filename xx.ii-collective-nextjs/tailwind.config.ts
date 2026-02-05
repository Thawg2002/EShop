import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5e3a73',
                'primary-hover': '#4a2e5c',
                secondary: '#211d11',
                'light-bg': '#f8f7f6',
            },
            fontFamily: {
                serif: ['var(--font-cinzel)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
            },
        },
    },
    plugins: [],
};

export default config;
