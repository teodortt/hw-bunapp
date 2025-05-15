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
  obj: Record<string, unknown>,
  excludeKeys: string[] = []
): boolean => {
  return Object.entries(obj)
    .filter(([key]) => !excludeKeys.includes(key))
    .every(([, value]) => {
      // Handle null or undefined
      if (value === null || value === undefined) return true;

      // Handle empty string or string "undefined"
      if (
        typeof value === "string" &&
        (value.trim() === "" || value === "undefined")
      )
        return true;

      // Handle arrays
      if (Array.isArray(value)) {
        return (
          value.length === 0 ||
          value.every(
            (item) =>
              item === "undefined" ||
              (typeof item === "string" && item.trim() === "") ||
              item === null ||
              item === undefined
          )
        );
      }

      // Handle empty object
      if (typeof value === "object" && !Array.isArray(value)) {
        return allKeysEmpty(value as Record<string, unknown>, excludeKeys);
      }

      // Handle false and other non-empty values
      return false;
    });
};
