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
