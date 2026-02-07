/**
 * Design constants/tokens for XX.II Collective
 * Centralized design values for consistency across the app
 */

// Shine Border colors - kept as mutable for ShineBorder component compatibility
export const SHINE_COLORS: string[] = ["#5e3a73", "#9c40ff"];
export const SHINE_COLORS_GRADIENT: string[] = [
  "#5e3a73",
  "#9c40ff",
  "#ffaa40",
];

// Primary background for ShimmerButton
export const PRIMARY_BG = "rgba(94, 58, 115, 1)";

// Max width classes for containers
export const MAX_WIDTH_CLASSES = {
  sm: "max-w-[900px] mx-auto px-6 md:px-12",
  md: "max-w-[1200px] mx-auto px-6 md:px-12",
  lg: "max-w-[1400px] mx-auto px-6 md:px-12",
  xl: "max-w-[1600px] mx-auto px-6 md:px-12",
  full: "w-full px-6 md:px-12",
} as const;

// Animation delays
export const ANIMATION = {
  BASE_DELAY: 0.1,
  INCREMENT: 0.05,
  STAGGER: 0.1,
} as const;

// Common breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Typography scale
export const TYPOGRAPHY = {
  pageTitle: "text-5xl md:text-6xl font-serif-display italic",
  sectionTitle: "text-3xl md:text-4xl font-serif-display",
  subtitle: "text-xs uppercase tracking-widest",
  label: "text-[11px] uppercase tracking-[0.15em] font-bold",
} as const;
