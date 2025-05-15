import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map the array of objects to unified structure
export const mapToUnifiedObjects = <T extends Record<string, any>, U>(
  input: T[],
  targetKeys: (keyof U)[]
): U[] => {
  return input.map((obj) => {
    const values = Object.values(obj);
    const unifiedObj: Partial<U> = {};
    targetKeys.forEach((key, index) => {
      unifiedObj[key as keyof U] = values[index];
    });
    return unifiedObj as U;
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const splitIntoRows = (data: any[], arrays?: number): string[][] => {
  const uniqueItems = Array.from(
    new Set(data.map((item) => item.toLowerCase()))
  );
  const rows: string[][] = [[], [], []];
  uniqueItems.forEach((item, index) => {
    rows[index % (arrays || 3)].push(item);
  });
  return rows;
};
export const allKeysEmpty = (
  obj: Record<string, unknown> | null | string | string[],
  excludeKeys: string[] = []
): boolean => {
  if (obj == null || typeof obj !== "object") return true;

  return Object.entries(obj)
    .filter(([key]) => !excludeKeys.includes(key))
    .every(([, value]) => {
      if (value === null || value === undefined) return true;

      if (typeof value === "string") {
        return value.trim() === "" || value === "undefined";
      }

      if (Array.isArray(value)) {
        return value.every(
          (item) =>
            item === null ||
            item === undefined ||
            (typeof item === "string" &&
              (item.trim() === "" || item === "undefined"))
        );
      }

      if (typeof value === "object") {
        return allKeysEmpty(value as Record<string, unknown>, excludeKeys);
      }

      return false; // value is a valid primitive (number, boolean, etc.)
    });
};
