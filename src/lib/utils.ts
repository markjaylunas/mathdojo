import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAspectRatio(width: number) {
  // Original width and height of the image
  const originalWidth = 190;
  const originalHeight = 76;

  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight;

  // Calculate new height based on the provided width
  const newHeight = width / aspectRatio;

  // Return the aspect ratio and new height
  return { aspectRatio: aspectRatio, newHeight: newHeight };
}
