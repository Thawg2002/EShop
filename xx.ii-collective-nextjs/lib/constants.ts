export const SHINE_COLORS = ["#5e3a73", "#9c40ff"] as string[];

export const MAX_WIDTH_CLASSES = {
  sm: "max-w-[900px] mx-auto px-6 md:px-12",
  md: "max-w-[1200px] mx-auto px-6 md:px-12",
  lg: "max-w-[1400px] mx-auto px-6 md:px-12",
  xl: "max-w-[1600px] mx-auto px-6 md:px-12",
  full: "w-full px-6 md:px-12",
} as const;

export const ANIMATION = {
  BASE_DELAY: 0.1,
  INCREMENT: 0.05,
  STAGGER: 0.1,
} as const;

export const TYPOGRAPHY = {
  pageTitle: "text-5xl md:text-6xl font-serif-display italic",
  sectionTitle: "text-3xl md:text-4xl font-serif-display",
  subtitle: "text-xs uppercase tracking-widest",
  label: "text-[11px] uppercase tracking-[0.15em] font-bold",
} as const;
