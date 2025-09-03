import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60)
  );

  switch (true) {
    case diffInHours < 1:
      return "Just now";
    case diffInHours < 24:
      return `${diffInHours}h ago`;
    case diffInHours < 48:
      return "Yesterday";
    default:
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
