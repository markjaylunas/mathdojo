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

export const formatTime = (milliseconds: number) => {
  // Convert milliseconds to hours, minutes, seconds, and milliseconds
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const remainingMilliseconds = milliseconds % 1000;

  // Format the time components
  const hoursStr = String(hours);
  const minutesStr = String(minutes);
  const secondsStr = String(seconds);

  // Construct the time string
  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hoursStr}h `;
  }

  if (minutes > 0 || hours > 0) {
    formattedTime += `${minutesStr}m `;
  }
  formattedTime += `${secondsStr}s`;

  return {
    formattedTime,
    hours,
    minutes,
    seconds,
    milliseconds: remainingMilliseconds,
  };
};
