import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const getErrorMessage = (error: any) => {
  let errorMessage;

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      errorMessage = errMsg;
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = "Unable to fetch the data. Please try again later.";
  }

  return errorMessage;
};

export const saveTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
};

export const getTheme = () => {
  const theme = localStorage.getItem("theme");
  return theme ? theme : "";
};

// Watchlist localStorage helpers
const WATCHLIST_KEY = "movie-app-watchlist";

export const saveWatchlist = (watchlist: any[]): void => {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error("Failed to save watchlist:", error);
  }
};

export const getWatchlist = (): any[] => {
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error("Failed to load watchlist:", error);
    return [];
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
