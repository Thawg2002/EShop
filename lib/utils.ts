import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function getStaggerDelay(
  index: number,
  baseDelay: number = 0,
  staggerAmount: number = 0.1,
): number {
  return baseDelay + index * staggerAmount;
}
