import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utils.ts - Helper functions for the coffee app

/**
 * Format currency values with the proper symbol and decimal places
 * @param amount The amount in cents
 * @param currency The currency code (USD, EUR, etc.)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  // Convert from cents to dollars
  const value = amount / 100;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
};

/**
 * Get a human-readable date from ISO timestamp
 * @param timestamp ISO date string
 * @returns Formatted date string
 */
export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
