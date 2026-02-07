import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Calculate staggered animation delay for list items
 * @param index - Item index in the list
 * @param base - Base delay in seconds (default: 0.1)
 * @param increment - Delay increment per item (default: 0.05)
 */
export function getStaggerDelay(
  index: number,
  base = 0.1,
  increment = 0.05,
): number {
  return base + index * increment;
}

/**
 * Format currency with locale support
 * @param amount - Amount to format
 * @param currency - Currency symbol (default: '$')
 */
export function formatCurrency(amount: number, currency = "$"): string {
  return `${currency}${amount.toLocaleString()}`;
}

/**
 * Generate a unique ID for client-side use
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
