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

export const formatTime = (timeInMilliseconds: number) => {
  const hours = Math.floor(timeInMilliseconds / 3600000);
  const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor(timeInMilliseconds % 1000);
  const formattedTime = `${hours ? `${hours.toString().padStart(2, "0")}h:` : ""}${minutes ? `${minutes.toString().padStart(2, "0")}m:` : ""}${seconds.toString().padStart(2, "0")}s`;
  return { hours, minutes, seconds, milliseconds, formattedTime };
};
