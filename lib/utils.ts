import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function getImageUrl(path: string | undefined): string {
  if (!path) return "/placeholder-image.png"; // Make sure this exists or use a better default
  if (path.startsWith("http")) return path;
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function getStaggerDelay(
  index: number,
  step: number = 0.1,
  base: number = 0,
) {
  return base + index * step;
}
